import React, { useMemo } from 'react';
import './StatusBar.scss';

export type StatusBarProps = {
    percent: number;
    color: string;
    horizontal?: boolean
    size: number
}

export const StatusBar: React.FC<StatusBarProps> = (props) => {
    const topStyles = useMemo(() => {
        return { height: props.horizontal ? `${props.size}px` : "100%", width: props.horizontal ? "100%" : `${props.size}px` }
    }, [props])

    const childStyles = useMemo(() => {
        let value: any = { backgroundColor: props.color };
        props.horizontal && (value['width'] = props.percent + "%") && (value["height"] = "100%")
        !props.horizontal && (value['height'] = props.percent + "%") && (value["width"] = "100%")
        return value
    }, [props])

    return <div style={topStyles} className={`stressHolder`}>
        <div style={childStyles} className={`stressBar ${props.horizontal ? "stressBarHorizontal" : "stressBarVertical"}`} />
    </div>
}