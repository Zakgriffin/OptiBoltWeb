// Contains function for cleaning contour points for later processing
import {screwHeadTolerance} from './constants'
import {Mat, Screw, Point, ScrewHalf} from './types'

export function cleanPoints(screw: Screw, frame: Mat): [ScrewHalf | null, ScrewHalf | null] {
    // Function Outline:
    // 1. Rotate all points of screw by opposite the angle of line of best fit (rotate points to have screw laying horizontally)
    // 2. Assign each point to tops or bottoms lists, splitting screw in half
    // 3. Flip x and y for necessary points so that screw head is on the right
    // 4. Reverse order of necessary lists so that first element is farthest left
    // 5. Find extraneous points to remove head of screw
    // 6. Return tuple of cleaned tops and bottoms

    let [dx, dy, x, y] = screw.line.data32F // unpack line best fit dy/dx, center at (x, y)
    let A = Math.atan2(dy, dx) // rotate all points by this angle

    //cv2.line(frame, (x, y), (20 * Math.cos(A) + x, 20 * Math.sin(A) + y), (255, 0, 255), 2) // DEBUG
    //cv2.circle(frame, (x, y), 3, (0, 0, 255), -1) // DEBUG

    let flatPoints: ScrewHalf = []
    // 1. Rotate all points of screw by opposite the angle of line of best fit
    for(let point of screw.points) {
        // coords relative to center of screw at (x, y)
        let xRel = x - point.x
        let yRel = y - point.y

        let r = Math.sqrt(xRel * xRel + yRel * yRel) // distance to point
        let aOff = Math.atan2(yRel, xRel) // angle to point
        
        // new rotated coords
        let xNew = r * Math.cos(aOff - A)
        let yNew = r * Math.sin(aOff - A)

        flatPoints.push({x: xNew, y: yNew}) // add to list
    }

    // 2. Assign each point to tops or bottoms lists, splitting screw in half
    let tops: ScrewHalf = []
    let bottoms: ScrewHalf = []
    let extra: Point[] = [] // to be appended to beginning of either tops or bottoms

    let onTops = flatPoints[0].y < 0 // whether or not on tops
    let crossed = 0 // counts number of times crossed
    for(let p of flatPoints) {
        if((p.y < 0) !== onTops) {
            // crossed
            crossed++
            onTops = !onTops
        }
        if(crossed >= 2) {
            extra.push(p)
        } else if(p.y < 0) {
            tops.push(p)
        } else {
            bottoms.push(p)
        }
    }
    // merge extra list with correct half in order
    if(onTops) tops = extra.concat(tops)
    else bottoms = extra.concat(bottoms)

    // now for the tricky bit...

    // find if highest point is to the left or right of center
    let highest = {x: 0, y: 0} // coord of heighest point (on head of screw)
    for(let p of bottoms) {
        if(p.y > highest.y) highest = p // found new highest
    }
    // 3. Flip x and y for necessary points so that screw head is on the right

    // y coords
    for(let p of tops) p.y = -p.y // always have to negate y coord of all in tops
    // never have to negate y coord of all in bottoms

    // x coords
    if(highest.x < 0) {
        // screw head was on left
        for(let p of tops) p.x = -p.x // negate x coord of all in tops
        for(let p of bottoms) p.x = -p.x // negate x coord of all in bottoms
        
    // 4. Reverse order of necessary lists so that first element is farthest left
        bottoms.reverse() // reverse list of bottoms
    } else {
        // screw head is on right
        tops.reverse() // reverse list of tops
    }

    // 5. Find extraneous points to remove head of screw
    const removeHead = (half: ScrewHalf) => {
        // sub function applied to tops and bottoms
        let average = 0
        if(half.length === 0) return []

        for(let p of half) average += p.y
        average /= half.length // average is now roughly radius of screw

        //cv2.line(frame, (0, average + y), (1000, average + y), (255, 0, 0)) // DEBUG

        for(let i = 0; i < half.length; i++) {
            if(half[i].y > average + screwHeadTolerance) {
                // found start of screw head, discard rest of list
                half = half.slice(0, i)
                break
            }
        }
        return half
    }
    tops = removeHead(tops)
    bottoms = removeHead(bottoms)

    // DEBUG - very important debug in fact...
    /*
    color = 255
    for point in tops:
        color -= 0.8
        cv2.circle(frame, (point[0] + x, point[1] + y), 1, (0, 0, color))
    color = 255
    for point in bottoms:
        color -= 0.8
        cv2.circle(frame, (point[0] + x, point[1] + y), 1, (0, color, 0))
    */
    // DEBUG

    // no points left on screw after cleaning, invalid screw
    if(!tops.length || !bottoms.length) return [null, null]

    // 6. Return tuple of cleaned tops and bottoms
    return [tops, bottoms]
}