// Constants used for various purposes
export const pixelsPerInch = 300 // pixels per inch
export const minSize = 0.3 * pixelsPerInch // minimum area a "screw" can be without being ignored
export const screwHeadTolerance = 0.06 * pixelsPerInch // tolerance for discounting screw head points
export const peakTolerance = 0.7 // tolerance for discounting noise in peak recognition

// Identifiable Screw Measurements [for estimating and color indicators]
export const screwLengths = {
    [3/8]: [0, 0, 255], // tiny boi -> red
    [5/8]: [0, 255, 0], // normal boi -> green
    [3/4]: [255, 0, 0], // funky boi -> blue
    [1/1]: [255, 0, 255], // smol wood boi -> purple
    [2 + 1/4]: [255, 255, 0] // absolute lad - > cyan
} 

export const screwDiameters = {
    [3/16]: [0, 0, 255], // normal-ish chonk -> red
    [1/8]: [255, 0, 0] // thin wood -> blue
}

export const screwThreads = {
    13: [0, 0, 255], // tiny boi -> red
    17: [0, 255, 0], // normal boi AND funky boi -> green
    15: [255, 0, 255], // smol wood boi -> purple
    19: [255, 255, 0] // absolute lad - > cyan
}