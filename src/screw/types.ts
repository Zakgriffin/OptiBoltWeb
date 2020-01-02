export interface Point {
    x: number
    y: number
}

export type ScrewHalf = Point[]

export type Mat = any

export interface Box {
    x: number
    y: number
    width: number
    height: number
}

export interface FracMeasure {
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

    length?: FracMeasure
    diameter?: FracMeasure
    thread?: number
}