import React from 'react'

interface IProps {
    screw: any
}

export default function Screw(props: IProps) {
    return <rect
        strokeWidth='3'
        stroke='#444'
        fill={'none'}
        strokeDasharray='10'
        rx='15'
        {...props.screw.box}
    />
}