import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import useScript from './useScript'
import optiBolt from './screw/optiBolt'
import Screw from './Screw'

const v = {
    width: 1000,
    height: 720,
    facingMode: 'user'
}

const w = {
    //width: 750,
    //height: 540
    width: 1000,
    height: 720
}

export default function WebcamCapture() {
    const [loaded] = useScript('opencv.js')

    const [screws, setScews] = useState()

    const webcamRef = useRef()
    const canvasRef = useRef()

    useEffect(() => {
        if(!loaded) return

        const cv = global.cv

        let video = document.getElementById('video')
        let cap = new cv.VideoCapture(video)

        setInterval(() => {
            if(!cv.Mat) return
            let frame = new cv.Mat(video.height, video.width, cv.CV_8UC4)
            cap.read(frame)
            let newScrews = optiBolt(cv, frame)
            setScews(newScrews)
        }, 10)
    }, [loaded])
    
    return <>
        <div style={{
            border: 'solid red 0px',
            width: '500px',
            height: '360px',
        }}>
            <Webcam id='video'
                audio={false}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={v.width}
                height={v.height}
                videoConstraints={v}
                style={{
                    position: 'absolute',
                    width: w.width,
                    height: w.height
                }}
            />
            <svg viewBox={`0 0 ${v.width} ${v.height}`}
                style={{
                    position: 'absolute',
                    width: w.width,
                    height: w.height
                }}
            >
                {
                    screws ? screws.map((screw, i) =>
                        <Screw key={i} screw={screw}/>
                    ) : null
                }
            </svg>
        </div>

        <canvas id='canvasOutput'
            ref={canvasRef}
        />
        <canvas id='canvasOutput2'
            hidden
        />
    </>
}