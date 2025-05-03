/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import "./styles.scss"

export type HexButtonProps = {
    id?: string;
    hover?: boolean;
    children?: any
    selected?: boolean;
    onClick?: () => void;
    size?: 'small' | 'large' | 'xlarge'
}

export const HexButton: React.FC<HexButtonProps> = (props) => {
    const radialBackground = { background: 'radial-gradient(#000000 80%,  #00000000 100%)' }
    return <div id={props.id} onClick={(e) => {
        e.preventDefault();
        props.onClick && props.onClick();
    }} className={`${props.hover ? 'hover-' : ''}button ${props.size || ''} ${props.selected ? 'selected' : ''}`}>
        <div className={`hex ${props.size || ''}`}>
            <div className="edge" />
            <div className="edge" />
            <div className="edge" />
        </div>
        <div className={`hex ${props.size || ''}`}>
            <div style={radialBackground} className="edge" />
            <div style={radialBackground} className="edge" />
            <div style={radialBackground} className="edge" />
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: 'white' }}>{props.children}</div>
    </div>
}