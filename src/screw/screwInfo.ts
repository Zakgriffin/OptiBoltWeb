// Functions for pulling quantitative values from a cleaned set of points
import {pixelsPerInch, peakTolerance} from './constants'

import {ScrewHalf, Point} from './types'

function getLength(tops: ScrewHalf, bottoms: ScrewHalf) {
    // Returns estimated length of screw
    function length(half: ScrewHalf) {
        return half[half.length - 1].x - half[0].x
    }
    return ((length(tops) + length(bottoms)) / 2) / pixelsPerInch
}

function getDiameter(tops: ScrewHalf, bottoms: ScrewHalf) {
    // Returns estimated diameter of screw
    function averageHeight(half: ScrewHalf) {
        let average = 0
        half.map(p => average += p.y)
        return average / half.length
    }
    return (averageHeight(tops) + averageHeight(bottoms)) / pixelsPerInch
}

function getThreadCount(tops: ScrewHalf, bottoms: ScrewHalf): number {
    // Returns estimated thread count of screw
    function thread(half: ScrewHalf) {
        let k: Point[] = [] // DEBUG - for seeing some important points

        let amp = 0 // keeps track of most extreme recent amplitude
        let heading = false // boolean that alternates when a peak or valley is reached
        let peaks = 0
        for(let p of half) {
            let height = p.y // get y coord of p
            if((heading && (height - peakTolerance > amp)) || ((!heading && (height + peakTolerance < amp)))) {
                // reached either a peak or valley
                if(heading) {
                    peaks++
                    k.push(p) // peak
                }
                heading = !heading // invert heading boolean, going from peaks, to valleys, or vise versa
            } else {
                // not a peak of valley, continue searching
                amp = height
            }
        }
        return peaks
    }
    let t = thread(tops)
    let b = thread(bottoms)
    return Math.round((t + b) / 2)
}

export {getLength, getDiameter, getThreadCount}