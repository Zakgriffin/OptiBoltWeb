import React, { useEffect, useRef } from 'react'
import Webcam from 'react-webcam'
import useScript from './useScript'
import optiBolt from './screw/optiBolt'

const videoConstraints = {
    width: 500,
    height: 200,
    facingMode: 'user'
}

export default function WebcamCapture() {
    const [loaded] = useScript('opencv.js')

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
        
            //let newFrame = new cv.Mat()
            let newFrame = optiBolt(cv, frame)
            
            //cv.cvtColor(frame, newFrame, cv.COLOR_RGBA2GRAY, 0)
            //cv.imshow(canvasRef.current, newFrame)

            //frame.delete()
            //newFrame.delete()
        }, 1)
    }, [loaded])
  
    return <>
        <canvas ref={canvasRef} id='canvasOutput'/>
        <Webcam id='video'
            audio={false}
            height={720}
            ref={webcamRef}
            screenshotFormat='image/jpeg'
            width={1280}
            videoConstraints={videoConstraints}
        />
    </>
}