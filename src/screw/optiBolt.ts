// Main file handling image capture and overall procedure
import * as dp from './display'
import * as other from './other'
import {minSize} from './constants'
import {getThreadCount, getLength, getDiameter} from './screwInfo'
import {cleanPoints} from './cleaner'

import {Point} from './types'

export default function optiBolt(cv: any, frame: any) {
    dp.setCV(cv)
    other.setCV(cv)

    let thresh = 80

    let dst = cv.Mat.zeros(frame.rows, frame.cols, cv.CV_8UC3)

    cv.cvtColor(frame, frame, cv.COLOR_RGBA2GRAY, 0) // to grayscale
    cv.threshold(frame, frame, thresh, 255, cv.THRESH_BINARY) // to binary mask

    let contours = new cv.MatVector()
    let hierarchy = new cv.Mat()
    cv.findContours(frame, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE) // grab contours

    // draw contours with random Scalar
    // for(let i = 0; i < contours.size(); i++) {
    //     let ctr = contours.get(i)
    //     let points = []
    //     for(let j = 0; j < ctr.rows; j++) {
    //         points.push({
    //             x:ctr.data32S[j*2],
    //             y:ctr.data32S[j*2+1]
    //         })
    //         if(i === 1) {
    //             let color = new cv.Scalar(255, 0, 255)
    //             cv.circle(dst, points[j], 5, color)
    //         }
    //     }
    //     //console.log(points)
    //     let color = new cv.Scalar(255, 0, 0)
    //     if(i === 1) color = new cv.Scalar(0, 255, 0)
    //     cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100)
    // }

    let screws = [] //create list of screws found in frame
    // convert necessary data from contours into screw objects

    for(let i = 0; i < contours.size(); i++) {
        let ctr = contours.get(i)
        
        let box = cv.boundingRect(ctr) // bounding box of screw
        
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
        cv.fitLine(ctr, line, cv.DIST_L2, 0, 0.01, 0.01)

        screws.push({points, box, line})
    }
    
    dp.setFrame(frame) // set frame for use in display
    for(let screw of screws) {
        // clean up points: rotate to flat, remove head, split into top and bottom lists
        let [tops, bottoms] = cleanPoints(screw, frame)

        if(!tops || !bottoms) continue // invalid screw after cleaning

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

        // DEBUG
        //for p in points:
        //    cv2.circle(frame, (int(p[0] * 2) + 375, int(p[1] * 2) + 246), 3, (0, 0, 255), -1)
        // DEBUG
    }

    // display final image
    cv.imshow('canvasOutput', frame)
    frame.delete(); dst.delete(); contours.delete(); hierarchy.delete()
}
// when exited, release the capture
//cap.release()
//cv.destroyAllWindows()