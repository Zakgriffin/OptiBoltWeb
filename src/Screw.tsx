import React from 'react'

interface IProps {
    screw: any
}

export default function Screw(props: IProps) {
    let {x, y, width, height} = props.screw.box
    const h = 100

    return <>
        <rect
            strokeWidth='3'
            stroke='#444'
            fill={'none'}
            strokeDasharray='10'
            rx='15'
            {...props.screw.box}
        />
        <svg x={x + width} y={y + height / 2 - h/2}>
            <rect
                x='-10'
                fill={'#444'}
                rx='15'
                width={210} //160
                height={h}
            />
            <Detail label='Length' value={props.screw.length || {}} color='red' y={20}/>
            <line x1='10' y1='35' x2='140' y2='35' stroke='#666'/>
            <Detail label='Diameter' value={props.screw.diameter || {}} color='lime' y={50}/>
            <line x1='10' y1='65' x2='140' y2='65' stroke='#666'/>
            <Detail label='Thread' value={props.screw.thread || {}} color='blue' y={80} frac/>

            <line x1='110' y1='10' x2='110' y2='90' stroke='#666'/>
        </svg>
    </>
}

interface IDetailProps {
    label: string
    value: number | {whole: number, num: number, den: number}
    frac?: boolean
    color: string
    y: number
} 
function Detail(props: IDetailProps) {
    return <>
        <circle cx='20' cy={props.y} r='9' fill={props.color}/>
        <LabelText text={props.label} x={40} y={props.y}/>
        {
        typeof props.value === 'number' ?
            <LabelText text={props.value} x={120} y={props.y}/>
            :
            <LabelText text={`${props.value.whole} + ${props.value.num}/${props.value.den} in`} x={120} y={props.y}/>
        }
    </>
}

function LabelText(props: {text: string | number, x: number, y: number}) {
    return <text x={props.x} y={props.y + 1} fill='white' alignmentBaseline='middle' fontSize='16'>
        {props.text}
    </text>
}