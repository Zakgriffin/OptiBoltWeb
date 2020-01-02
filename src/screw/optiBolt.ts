// Main file handling image capture and overall procedure
import {minSize} from './constants'
import {getThreadCount, getLength, getDiameter} from './screwInfo'
import {cleanPoints} from './cleaner'

import {Point, Mat, Box, Screw, FracMeasure} from './types'

export default function optiBolt(cv: any, frame: Mat): Screw[] {
    let thresh = 80

    let mask = new cv.Mat()
    cv.cvtColor(frame, mask, cv.COLOR_RGBA2GRAY, 0) // to grayscale
    cv.threshold(mask, mask, thresh, 255, cv.THRESH_BINARY_INV) // to binary mask

    let contours = new cv.MatVector()
    let hierarchy = new cv.Mat()
    cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE) // grab contours

    let screws: Screw[] = [] //create list of screws found in frame
    // convert necessary data from contours into screw objects

    for(let i = 0; i < contours.size(); i++) {
        //let color = new cv.Scalar(255, 0, 0)
        //cv.drawContours(frame, contours, i, color, 1, cv.LINE_8, hierarchy, 100)
        
        let ctr = contours.get(i)
        
        let box: Box = cv.boundingRect(ctr) // bounding box of screw
        
        let wB = box.width
        let hB = box.height

        if(wB * hB < minSize) continue // too small to be valid screw

        // restructure points into list of length 2 lists (points)
        let points: Point[] = []
        for(let j = 0; j < ctr.rows; j++) {
            points.push({
                x: ctr.data32S[j*2],
                y: ctr.data32S[j*2+1]
            })
        }
        let line = new cv.Mat()
        cv.fitLine(ctr, line, cv.DIST_L2, 0, 0, 0)

        screws.push({points, box, line})
    }
    
    for(let screw of screws) {
        // clean up points: rotate to flat, remove head, split into top and bottom lists
        let [tops, bottoms] = cleanPoints(screw)

        if(!tops || !bottoms) continue // invalid screw after cleaning

        // grab screw info
        let length = imperialFrac(getLength(tops, bottoms))
        let diameter = imperialFrac(getDiameter(tops, bottoms))
        let threadCount = getThreadCount(tops, bottoms)

        let thread = threadCount
        Object.assign(screw, {length, diameter, thread})
    }

    frame.delete()
    mask.delete()
    contours.delete()
    hierarchy.delete()

    return screws
}
// when exited, release the capture
//cap.release()
//cv.destroyAllWindows()

export function imperialFrac(x: number, max: number = 32): FracMeasure {
    // Converts decimal into 3 part tuple for fractional imperial measurement
    if(x < 0) return {whole: 0, num: 0, den: 1}//throw new Error('x must be >= 0')
    
    let whole = Math.floor(x)
    let left = x - whole
    let den = 2

    while(Math.abs(Math.round(left * den) - left * den) > 0.1 && den !== max) {
        den *= 2
    }
    let num = Math.round(left * den)

    return {whole, num, den}
}