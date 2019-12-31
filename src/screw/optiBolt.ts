// Main file handling image capture and overall procedure
//import dp from './display'

//from screwInfo import getThreadCount, getLength, getDiameter
//from constants import pixelsPerInch, minSize
//from cleaner import cleanPoints

//cv2.createTrackbar("thresh", "Frame", 80, 255, lambda _: None) # trackbar for threshhold

export default function optiBolt(cv: any, src: any) {
    /*()
    let thresh = 80

    let newFrame = new cv.Mat()
    cv.cvtColor(frame, newFrame, cv.COLOR_RGBA2GRAY, 0) // to grayscale

    let mask = new cv.Mat()
    cv.threshold(newFrame, mask, thresh, 255, cv.THRESH_BINARY_INV) // to binary mask
    newFrame.delete()

    let contours = new cv.MatVector()
    let hierarchy = new cv.Mat()
    cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_NONE) // grab contours

    for (let i = 0; i < contours.size(); ++i) {
        let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255))
        cv.drawContours(mask, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }

    return mask
    */

    let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(src, src, 120, 200, cv.THRESH_BINARY);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    // You can try more different parameters
    cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    // draw contours with random Scalar
    for(let i = 0; i < contours.size(); i++) {
        let color = new cv.Scalar(255, 0, 0);
        cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
    }

    let points = []
    //for(let i = 0; i < )

    cv.imshow('canvasOutput', dst);
    src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
    /*
    screws = [] # create list of screws found in frame
    # convert necessary data from contours into screw dicts
    for ctr in contours:
        box = cv2.boundingRect(ctr) # bounding box of screw
        _, _, wB, hB = box
        if wB * hB < minSize: continue # too small to be valid screw

        # restructure points into list of length 2 lists (points)
        points = []
        for i in range(0, len(ctr)): points.append(ctr[i][0])

        screws.append({
            'points': points,
            'box': box,
            'line': cv2.fitLine(ctr, cv2.DIST_WELSCH, 100, 0, 0)
        })

    dp.setFrame(frame) # set frame for use in display
    for screw in screws:
        # clean up points: rotate to flat, remove head, split into top and bottom lists
        tops, bottoms, invalid = cleanPoints(screw, frame)

        if invalid: continue # invalid screw after cleaning

        # grab screw info
        length = getLength(tops, bottoms)
        diameter = getDiameter(tops, bottoms)
        threadCount, points = getThreadCount(tops, bottoms)

        dp.setBox(screw['box']) # set box dimensions for use in display

        dp.outline() # outline the screw with rounded box
        allInfo = True
        if allInfo:
            # label all measurment info for screw
            dp.labelAllInfo(length, diameter, threadCount)
        else:
            # use color indicators for easy human sorting
            dp.quickColorInfo(length, diameter, threadCount)

        # DEBUG
        #for p in points:
        #    cv2.circle(frame, (int(p[0] * 2) + 375, int(p[1] * 2) + 246), 3, (0, 0, 255), -1)
        # DEBUG

    # display final image
    cv2.imshow("Frame", frame)
    cv2.imshow("Mask", mask)

# when exited, release the capture
cap.release()
cv2.destroyAllWindows()
*/
}