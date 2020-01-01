// Utility functions
import { Point, Mat } from "./types"

let cv: any
export function setCV(c: any) {cv = c}

export function roundRect(frame: Mat, topLeft: Point, bottomRight: Point, lineColor: any,
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

export function imperialFrac(x: number, largest_denominator: number = 32) {
    // Converts decimal into 3 part tuple for fractional imperial measurement
    if(x < 0) throw new Error("x must be >= 0")
    /*
    let whole = parseInt
    whole, leftover = divmod(scaled, largest_denominator)
    if leftover:
        while leftover % 2 == 0:
            leftover >>= 1
            largest_denominator >>= 1
    return whole, leftover, largest_denominator
    */
   return {whole: x, num: 0, den: 0}
}