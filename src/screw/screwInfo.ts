// Functions for pulling quantitative values from a cleaned set of points
import { pixelsPerInch, peakTolerance } from './constants'

function getLength(tops: [], bottoms: []) {
    // Returns estimated length of screw
    function length(half: []) {
        return half[half.length - 1][0] - half[0][0]
    }
    return ((length(tops) + length(bottoms)) / 2) / pixelsPerInch
}

function getDiameter(tops: [], bottoms: []) {
    // Returns estimated diameter of screw
    function averageHeight(half: []) {
        let average = 0
        half.map(p => average += p.y)
        average /= half.length
        return average
    }
    return (averageHeight(tops) + averageHeight(bottoms)) / pixelsPerInch
}

function getThreadCount(tops: [], bottoms: []) {
    // Returns estimated thread count of screw
    function thread(half: []) {
        let k: [] = [] // DEBUG - for seeing some important points

        let amp = 0 // keeps track of most extreme recent amplitude
        let heading = false // boolean that alternates when a peak or valley is reached
        let peaks = 0
        for(let p of half) {
            let height = p.y // get y coord of p
            if(heading and (height - peakTolerance > amp)) or (not heading and (height + peakTolerance < amp)):
                // reached either a peak or valley
                if heading: peaks += 1; k.append(p) // peak
                heading = not heading // invert heading boolean, going from peaks, to valleys, or vise versa
            else:
                // not a peak of valley, continue searching
                amp = height
        }
        return peaks, k
    }
    t = thread(tops)
    b = thread(bottoms)
    return (t[0] + b[0]) // 2, t[1] + b[1]
    // return peaks <-- after debug stuffs is removed
}