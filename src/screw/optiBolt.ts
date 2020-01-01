// Main file handling image capture and overall procedure
import * as dp from './display'
import * as other from './other'
import {minSize} from './constants'
import {getThreadCount, getLength, getDiameter} from './screwInfo'
import {cleanPoints, setCV} from './cleaner'

import {Point, Mat, Box} from './types'

export default function optiBolt(cv: any, frame: Mat) {
    dp.setCV(cv)
    other.setCV(cv)
    setCV(cv) // cleaner DEBUG

    let thresh = 80

    let mask = new cv.Mat()
    cv.cvtColor(frame, mask, cv.COLOR_RGBA2GRAY, 0) // to grayscale
    cv.threshold(mask, mask, thresh, 255, cv.THRESH_BINARY_INV) // to binary mask

    let contours = new cv.MatVector()
    let hierarchy = new cv.Mat()
    cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE) // grab contours

    let screws = [] //create list of screws found in frame
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
    
    dp.setFrame(mask) // set frame for use in display
    for(let screw of screws) {
        // clean up points: rotate to flat, remove head, split into top and bottom lists
        let [tops, bottoms] = cleanPoints(screw, frame)

        if(!tops || !bottoms) continue // invalid screw after cleaning

        for(let p of bottoms) {
            let color = new cv.Scalar(255, 0, 0)
            cv.circle(frame, {x: p.x + screw.box.x, y: p.y + screw.box.y}, 0, color, 0)
        }
        /*
        // grab screw info
        let length = getLength(tops, bottoms)
        let diameter = getDiameter(tops, bottoms)
        let threadCount = getThreadCount(tops, bottoms)

        dp.setBox(screw.box) // set box dimensions for use in display

        dp.outline() // outline the screw with rounded box
        let allInfo = true
        if(allInfo) {
            // label all measurment info for screw
            dp.labelAllInfo(length, diameter, threadCount)
        } else {
            // use color indicators for easy human sorting
            dp.quickColorInfo(length, diameter, threadCount)
        }
        */
    }

    // display final image
    cv.imshow('canvasOutput', frame)
    cv.imshow('canvasOutput2', mask)

    frame.delete()
    mask.delete()
    contours.delete()
    hierarchy.delete()
}
// when exited, release the capture
//cap.release()
//cv.destroyAllWindows()