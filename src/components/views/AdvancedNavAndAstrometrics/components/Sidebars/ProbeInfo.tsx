import { Probe, ProbeAssignment } from "containers/FlightDirector/FlightSets/types";
import React from "react";
import { PROBE_IMAGE_MAP } from "../../helpers";
export type ProbeInfoChildProps = {
    probe: Probe;
    probeAssignment?: ProbeAssignment;
    onClick: () => void;
    selected?: boolean;
}

export const ProbeInfoChild: React.FC<ProbeInfoChildProps> = (props: ProbeInfoChildProps) => {

    const status = React.useMemo(() => {
        if (props.probeAssignment !== undefined) {
            if (props.probeAssignment.completed) {
                return "Scanning " + props.probeAssignment.targetLocationName
            }
            return "In transit to " + props.probeAssignment.targetLocationName
        }
        else {
            return "Ready for assignment"
        }

    }, [props.probeAssignment])

    return <div onClick={() => props.onClick()} className={`item ${props.selected && "selected"} item-row`}>
        <img style={{ height: '50px', width: '50px' }} src={PROBE_IMAGE_MAP[props.probe.type]} alt="probe icon" />
        <div className="item-column">
            <div>{props.probe.name}</div>
            <div>{status}</div>
        </div>
    </div>
}