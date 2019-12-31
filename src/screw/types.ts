export interface Point {
    x: number
    y: number
}

export type ScrewHalf = Point[]

export type Mat = any

export interface Box {
    xB: number
    yB: number
    wB: number
    hB: number
}

export interface ScrewDimensions {
    whole: number
    num: number
    den: number
}

export interface ScrewPresetList {
    [key: number]: number[]
}

export interface Screw {
    points: Point[]
    box: Box
    line: any
}