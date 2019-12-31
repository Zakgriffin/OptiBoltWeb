// Functions for displaying retrieved measurements in a human readable way

import {roundRect, imperialFrac} from './other'
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
    xB = b.xB
    yB = b.yB
    wB = b.wB
    hB = b.hB
}

export function labelMeasure(dimensions: ScrewDimensions, descriptor = '',
        coord: Point = {x: 0, y: 0}, color = new cv.Scaler(255, 255, 255)) {
    // Labels fractional measurements on frame
    let {whole, num, den} = dimensions
    let {x, y} = coord

    cv.putText(frame, whole + ' in', {x, y}, cv.FONT_HERSHEY_SIMPLEX, 1, color, 1) // whole
    cv.putText(frame, num, {x: x + 20, y}, cv.FONT_HERSHEY_SIMPLEX, 0.4, color, 1) // numerator
    cv.putText(frame, den, {x: x + 20, y}, cv.FONT_HERSHEY_SIMPLEX, 0.4, color, 1) // denominator
    cv.putText(frame, descriptor, {x: x + 65, y}, cv.FONT_HERSHEY_SIMPLEX, 0.3, color, 1) // descriptor

    cv.line(frame, {x: x + 20, y: y - 12}, {x: x + 35, y: y - 12}, color, 1) // fraction bar
}

export function labelMeasureSimple(text: string, descriptor = '',
        start: Point = {x: 0, y: 0}, color = new cv.Scaler(255, 255, 255)) {
    // Labels simple measurements on frame
    let {x, y} = start
    cv.putText(frame, text, {x, y}, cv.FONT_HERSHEY_SIMPLEX, 1, color, 1)
    cv.putText(frame, descriptor, {x: x + 65, y}, cv.FONT_HERSHEY_SIMPLEX, 0.3, color, 1) // descriptor
}

export function outline() {
    // Outlines screw with round rectangle
    roundRect(frame, {x: xB - pad, y: yB - pad}, {x: xB + wB + pad, y: yB + hB + pad},
        new cv.Scaler(255, 255, 255), 2, 8, 10)
}
    

export function labelAllInfo(length: number, diameter: number, thread: number) {
    // Labels all information about a screw (length, diameter, thread) on frame
    labelMeasure(imperialFrac(length), 'Length', {x: xB + wB + 15, y: yB})
    labelMeasure(imperialFrac(diameter), 'Diam', {x: xB + wB + 15, y: yB + 35})
    labelMeasureSimple(thread.toString(), 'Threads', {x: xB + wB + 15, y: yB + 70},
        new cv.Scaler(255, 255, 255))
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
        {x: xI + iSize, y: yI + 3 * iSize}, new cv.Scaler(255, 255, 255), 1)
}