import React from "react";
import { useMemo } from "react";
import { RatingBar } from ".";

export type RiskIndexProps = {
    width: string;
    rating: number;
    disabled?: boolean;
    noTxt?: boolean;
    txtOverride?: any;
}

export const RiskIndex: React.FC<RiskIndexProps> = (props) => {

    const color = useMemo(() => {
        if (props.rating > 3.5) {
            return 'danger'
        }
        else if (props.rating > 2) {
            return 'warning'
        }
        else {
            return 'success'
        }
    }, [props.rating])

    return <div style={{ width: props.width, display: 'flex', flexDirection: "column", textAlign: 'left', gap: '0.25rem' }}>
        {props.txtOverride && props.txtOverride}
        {!props.noTxt && !props.txtOverride && <span style={{ fontSize: 'smaller' }}>Projected risk</span>}
        <RatingBar disabled={props.disabled} rating={props.rating} color={color} />
    </div>
}