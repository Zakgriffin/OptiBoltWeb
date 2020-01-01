// Functions for displaying retrieved measurements in a human readable way

import {screwLengths, screwDiameters, screwThreads} from './constants'
import {Mat, Box, ScrewDimensions, Point, ScrewPresetList} from './types'

const lengthKeys = Object.keys(screwLengths).map(k => parseFloat(k))
const diameterKeys = Object.keys(screwDiameters).map(k => parseFloat(k))
const threadKeys = Object.keys(screwThreads).map(k => parseFloat(k))

const pad = 10
let frame: Mat
let xB: number, yB: number, wB: number, hB: number

let cv: any
export function setCV(c: any) {cv = c}

export function setFrame(f: Mat) {
    // Sets the frame for drawing images
    frame = f
}

export function setBox(b: Box) {
    // Sets coords for box outline
    xB = b.x
    yB = b.y
    wB = b.width
    hB = b.height
}

export function labelMeasure(dimensions: ScrewDimensions, descriptor = '',
        coord: Point = {x: 0, y: 0}, color = new cv.Scalar(255, 255, 255)) {
    // Labels fractional measurements on frame
    let {whole, num, den} = dimensions
    let {x, y} = coord

    cv.putText(frame, whole + ' in', {x, y}, cv.FONT_HERSHEY_SIMPLEX, 1, color, 1) // whole
    cv.putText(frame, num.toString(), {x: x + 20, y: y - 15}, cv.FONT_HERSHEY_SIMPLEX, 0.4, color, 1) // numerator
    cv.putText(frame, den.toString(), {x: x + 20, y}, cv.FONT_HERSHEY_SIMPLEX, 0.4, color, 1) // denominator
    cv.putText(frame, descriptor, {x: x + 65, y}, cv.FONT_HERSHEY_SIMPLEX, 0.3, color, 1) // descriptor

    cv.line(frame, {x: x + 20, y: y - 12}, {x: x + 35, y: y - 12}, color, 1) // fraction bar
}

export function labelMeasureSimple(text: string, descriptor = '',
        start: Point = {x: 0, y: 0}, color = new cv.Scalar(255, 255, 255)) {
    // Labels simple measurements on frame
    let {x, y} = start
    cv.putText(frame, text, {x, y}, cv.FONT_HERSHEY_SIMPLEX, 1, color, 1)
    cv.putText(frame, descriptor, {x: x + 65, y}, cv.FONT_HERSHEY_SIMPLEX, 0.3, color, 1) // descriptor
}

export function outline() {
    // Outlines screw with round rectangle
    roundRect(frame, {x: xB - pad, y: yB - pad}, {x: xB + wB + pad, y: yB + hB + pad},
        new cv.Scalar(255, 255, 255), 2, 8, 10)
}
    

export function labelAllInfo(length: number, diameter: number, thread: number) {
    // Labels all information about a screw (length, diameter, thread) on frame
    //labelMeasure(imperialFrac(length), 'Length', {x: xB + wB + 15, y: yB})
    labelMeasure(imperialFrac(diameter), 'Diam', {x: xB + wB + 15, y: yB + 35})
    labelMeasureSimple(thread.toString(), 'Threads', {x: xB + wB + 15, y: yB + 70},
        new cv.Scalar(255, 255, 255))
}

export function quickColorInfo(length: number, diameter: number, thread: number) {
    // Marks screw with color indicators for easy human sorting
    function getClosest(val: number, screwList: ScrewPresetList, keysList: number[]) {
        return screwList[keysList.reduce((accum, curr) =>
            Math.abs(accum - val) < Math.abs(curr - val) ? accum : curr
        )]
    }
    let lengthColor = getClosest(length, screwLengths, lengthKeys)
    let diamColor = getClosest(diameter, screwDiameters, diameterKeys)
    let threadColor = getClosest(thread, screwThreads, threadKeys)

    let iSize = 6 // size of an indicator square
    let xI = xB + wB + pad
    let yI = yB + hB // 2
    cv.rectangle(frame, {x: xI - iSize, y: yI - 3 * iSize},
        {x: xI + iSize, y: yI - iSize}, lengthColor, cv.FILLED)
    cv.rectangle(frame, {x: xI - iSize, y: yI - iSize},
        {x: xI + iSize, y: yI + iSize}, diamColor, cv.FILLED)
    cv.rectangle(frame, {x: xI - iSize, y: yI + iSize},
        {x: xI + iSize, y: yI + 3 * iSize}, threadColor, cv.FILLED)

    cv.rectangle(frame, {x: xI - iSize, y: yI - 3 * iSize},
        {x: xI + iSize, y: yI + 3 * iSize}, new cv.Scalar(255, 255, 255), 1)
}

function roundRect(frame: Mat, topLeft: Point, bottomRight: Point, lineColor: any,
        thickness: number, lineType: any, cornerRadius: number) {
    // Draws a rect with rounded corners
    /*
    corners:
    p1 - p2
    |     |
    p4 - p3
    */
    let tlx = topLeft.x
    let tly = topLeft.y
    let brx = bottomRight.x
    let bry = bottomRight.y

    let p1 = {x: tlx, y: tly}
    let p2 = {x: brx, y: tly}
    let p3 = {x: brx, y: bry}
    let p4 = {x: tlx, y: bry}

    // draw straight lines
    cv.line(frame, {x: p1.x + cornerRadius, y: p1.y}, {x: p2.x - cornerRadius, y: p2.y}, lineColor, thickness, lineType)
    cv.line(frame, {x: p2.x, y: p2.y + cornerRadius}, {x: p3.x, y: p3.y - cornerRadius}, lineColor, thickness, lineType)
    cv.line(frame, {x: p4.x + cornerRadius, y: p4.y}, {x: p3.x - cornerRadius, y: p3.y}, lineColor, thickness, lineType)
    cv.line(frame, {x: p1.x, y: p1.y + cornerRadius}, {x: p4.x, y: p4.y - cornerRadius}, lineColor, thickness, lineType)

    // draw arcs
    //cv.ellipse(frame, {x: p1.x + cornerRadius, y: p1.y + cornerRadius}, {x: cornerRadius, y: cornerRadius}, 180, 0, 90, lineColor, thickness, lineType)
    //cv.ellipse(frame, {x: p2.x - cornerRadius, y: p2.y + cornerRadius}, {x: cornerRadius, y: cornerRadius}, 270, 0, 90, lineColor, thickness, lineType)
    //cv.ellipse(frame, {x: p3.x - cornerRadius, y: p3.y - cornerRadius}, {x: cornerRadius, y: cornerRadius}, 0.0, 0, 90, lineColor, thickness, lineType)
    //cv.ellipse(frame, {x: p4.x + cornerRadius, y: p4.y - cornerRadius}, {x: cornerRadius, y: cornerRadius}, 90, 0, 90, lineColor, thickness, lineType)
    // DEBUG ^
}

function imperialFrac(x: number, max: number = 32) {
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