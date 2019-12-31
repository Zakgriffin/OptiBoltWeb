declare type MatType = any;

declare class OpenCV {

    CV_8U: MatType;
    CV_8UC1: MatType;
    CV_8UC2: MatType;
    CV_8UC3: MatType;
    CV_8UC4: MatType;
    CV_8S: MatType;
    CV_8SC1: MatType;
    CV_8SC2: MatType;
    CV_8SC3: MatType;
    CV_8SC4: MatType;
    CV_16U: MatType;
    CV_16UC1: MatType;
    CV_16UC2: MatType;
    CV_16UC3: MatType;
    CV_16UC4: MatType;
    CV_16S: MatType;
    CV_16SC1: MatType;
    CV_16SC2: MatType;
    CV_16SC3: MatType;
    CV_16SC4: MatType;
    CV_32S: MatType;
    CV_32SC1: MatType;
    CV_32SC2: MatType;
    CV_32SC3: MatType;
    CV_32SC4: MatType;
    CV_32F: MatType;
    CV_32FC1: MatType;
    CV_32FC2: MatType;
    CV_32FC3: MatType;
    CV_32FC4: MatType;
    CV_64F: MatType;
    CV_64FC1: MatType;
    CV_64FC2: MatType;
    CV_64FC3: MatType;
    CV_64FC4: MatType;

    static then: (callback: (mod: typeof OpenCV) => void) => void;
    static imshow(cvs: HTMLCanvasElement | string, dst: OpenCV.Mat): void;
    static matFromImageData(imgData: ImageData): OpenCV.Mat;
    static matFromArray(rows: number, cols: number, type: MatType, array: ArrayBuffer): OpenCV.Mat;
    static imshow(cvs: HTMLCanvasElement | string, mat: OpenCV.Mat): void;
    static imread(source: string | HTMLCanvasElement | HTMLImageElement): OpenCV.Mat;
}

declare namespace OpenCV {

    class NativeObject {
        delete: () => void;
    }

    class MatData {
        set: (data: ArrayBuffer) => void;
    }

    class Mat extends NativeObject {
        data: MatData;
        constructor(width: number, height: number, type: number);
    }

    class VideoCapture {
        video: HTMLVideoElement;
        constructor(fimreadsrc: string | HTMLVideoElement);
        read: (frame: OpenCV.Mat) => void
    }

    class Range {
        start: number;
        end: number;
        constructor(start: number, end: number);
    }

    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }

    class Size {
        width: number;
        height: number;
        constructor(width: number, height: number);
    }

    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor();
        constructor(rect: Rect);
        constructor(point: Point, size: Size);
        constructor(x: number, y: number, width: number, height: number);
    }

    class RotateRect {
        center: Point;
        size: Size;
        angle: number;
        constructor();
        constructor(center: Point, size: Size, angle: number);
        static points: (obj: any) => any;
        static boundingRect: (obj: any) => any;
        static boundingRect2f: (obj: any) => any;
    }

    class Scalar extends Array {
        static all(v: number): Scalar;
        constructor(v0: number, v1: number, v2: number, v3: number);
    }

    class MinMaxLoc {
        minVal: number;
        maxVal: number;
        minLoc: Point;
        maxLoc: Point;
        constructor();
        constructor(minVal: number, maxVal: number, minLoc: Point, maxLoc: Point);
    }

    class Circle {
        center: Point;
        radius: number;
        constructor();
        constructor(center: Point, radius: number);
    }

    class TermCriteria {
        type: number;
        maxCount: number;
        epsilon: number;
        constructor();
        constructor(type: number, maxCount: number, epsilon: number);
    }
}

export default OpenCV;