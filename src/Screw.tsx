import React from 'react'

interface IProps {
    screw: any
}

export default function Screw(props: IProps) {
    
    return <>
        <rect
            strokeWidth='3'
            stroke='lime'
            fill={'none'}
            rx='15'
            {...props.screw.box}
        />
    </>
}