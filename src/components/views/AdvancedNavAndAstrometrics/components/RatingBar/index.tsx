import React from "react";
import { Progress } from "reactstrap";

export type RatingBarProps = {
    rating: number;
    color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    disabled?: boolean;
}

const getPercentage = (rating: number, min: number, max: number, isDisabled?: boolean) => {
    if (isDisabled) {
        return 100;
    }
    if (rating < min) {
        return 0;
    }
    if (rating > max) {
        return 100;
    }
    return (rating - min) * 100;
}

export const RatingBar: React.FC<RatingBarProps> = (props) => {
    return (
        <div style={{ width: "100%", display: 'flex', gap: '2px' }}>
            <Progress striped={props.disabled} color={props.disabled ? 'secondary' : props.color} value={getPercentage(props.rating, 0, 1, props.disabled)} max={100} style={{ width: "20%", height: '10px' }} />
            <Progress striped={props.disabled} color={props.disabled ? 'secondary' : props.color} value={getPercentage(props.rating, 1, 2, props.disabled)} max={100} style={{ width: "20%", height: '10px' }} />
            <Progress striped={props.disabled} color={props.disabled ? 'secondary' : props.color} value={getPercentage(props.rating, 2, 3, props.disabled)} max={100} style={{ width: "20%", height: '10px' }} />
            <Progress striped={props.disabled} color={props.disabled ? 'secondary' : props.color} value={getPercentage(props.rating, 3, 4, props.disabled)} max={100} style={{ width: "20%", height: '10px' }} />
            <Progress striped={props.disabled} color={props.disabled ? 'secondary' : props.color} value={getPercentage(props.rating, 4, 5, props.disabled)} max={100} style={{ width: "20%", height: '10px' }} />
        </div>
    )
}