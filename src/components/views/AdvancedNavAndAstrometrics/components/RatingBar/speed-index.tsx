import React from "react";
import { useMemo } from "react";
import { RatingBar } from ".";

export type SpeedIndexProps = {
    width: string;
    rating: number;
    disabled?: boolean;
    noTxt?: boolean;
    txtOverride?: any;
}

export const SpeedIndex: React.FC<SpeedIndexProps> = (props) => {

    const color = useMemo(() => {
        if (props.rating * 2.5 < 1) {
            return 'warning'
        }
        else if (props.rating * 2.5 < 2.6) {
            return 'info'
        }
        else {
            return 'success'
        }
    }, [props.rating])

    return <div style={{ width: props.width, display: 'flex', flexDirection: "column", textAlign: 'left', gap: '0.25rem' }}>
        {props.txtOverride && props.txtOverride}
        {!props.noTxt && !props.txtOverride && <span style={{ fontSize: 'smaller' }}>Speed rating</span>}
        <RatingBar disabled={props.disabled} rating={props.rating * 2.5} color={color} />
    </div>
}