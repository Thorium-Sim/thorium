import React, { useMemo, useState } from 'react'
import { Button } from 'reactstrap';
import './sidebar.css'
import { ProbeInfoChild } from './ProbeInfo';
import { Probe, ProbeAssignment } from 'containers/FlightDirector/FlightSets/types';
import { countProbeFuelCells, PROBE_TYPE_MAP } from '../../helpers';
import { formatSecondsToTime } from 'containers/FlightDirector/FlightSets/Time';


export type ProbeOverviewSidebarProps = {
    onAssignProbe: (probeId: string) => void;
    onShowRange: (probeId: string) => void;
    onRemoveRange: () => void;
    availableProbes: Probe[];
    probeAssignments: ProbeAssignment[];
}

export const ProbeOverviewSidebar: React.FC<ProbeOverviewSidebarProps> = (props) => {
    const [selectedProbe, setSelectedProbe] = useState<Probe | undefined>(undefined);

    const currentProbeAssignment = useMemo(() => {

        if (selectedProbe) {
            return props.probeAssignments.find(assignment => assignment.probeId === selectedProbe.id)
        }
        return undefined
    }, [selectedProbe, props])

    const probeStatus = useMemo(() => {
        if (selectedProbe) {

            if (currentProbeAssignment) {
                if (currentProbeAssignment.completed) {
                    return `Scanning ${currentProbeAssignment.targetLocationName}`
                }
                else {
                    return `In transit to ${currentProbeAssignment.targetLocationName}`
                }
            }
            return "Ready for assignment"
        }
        return ""


    }, [selectedProbe, currentProbeAssignment]);

    const probeFuelCellsRemaining = React.useMemo(() => {
        if (selectedProbe) {
            return countProbeFuelCells(selectedProbe, currentProbeAssignment)
        }
        return 1
    }, [selectedProbe, currentProbeAssignment])
    const parentStyle: React.CSSProperties = {
        flexGrow: 1,
    }

    const eta = React.useMemo(() => {
        if (currentProbeAssignment) {
            return currentProbeAssignment.currentEta
        }
        return 0
    }, [currentProbeAssignment, props])

    return <div className='sidebar-parent'>
        <div className='group-parent height-animation' style={{ height: selectedProbe ? '45%' : 'auto' }}>
            <div className='grouping' style={{ flexGrow: 1, overflow: 'auto' }}>
                {props.availableProbes.length === 0 && <span>No available probes, please launch more probes</span>}
                {props.availableProbes.length > 0 && props.availableProbes.map(probe => {
                    return <ProbeInfoChild
                        key={probe.id}
                        probe={probe}
                        onClick={() => probe === selectedProbe ? setSelectedProbe(undefined) : setSelectedProbe(probe)}
                        selected={selectedProbe?.id === probe.id}
                        probeAssignment={props.probeAssignments.find(assignment => assignment.probeId === probe.id)}
                    />

                })}
            </div>
        </div>
        {<div className='group-parent height-animation' style={{ height: selectedProbe ? '45%' : 'auto' }}>
            <div className='grouping' style={{ flexGrow: 1 }}>
                {selectedProbe ? <React.Fragment>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{`Name: ${selectedProbe.name}`}</span>
                        <span>{`Type: ${PROBE_TYPE_MAP[selectedProbe.type]}`}</span>
                        <span>{`Status: ${probeStatus}`}</span>
                        <span>{`Fuel Cells Remaining: ${probeFuelCellsRemaining}`}</span>
                        {currentProbeAssignment && <span>{`Remaining ETA: ${currentProbeAssignment.completed ? 'Arrived' : formatSecondsToTime(eta)}`}</span>}
                    </div>
                    <label className='label'>Data</label>
                    <div className='grouping' style={{ flexGrow: 1, overflow: 'auto' }}>
                        {currentProbeAssignment ? currentProbeAssignment.data.map((data, index) => {
                            return <span key={index}>{data}</span>
                        }) : <span>No data, probe has not been assigned</span>}
                    </div>
                    {(!currentProbeAssignment || currentProbeAssignment.completed) && <Button onMouseUp={() => props.onRemoveRange()} onMouseDown={() => props.onShowRange(selectedProbe.id)}>Show Range</Button>}
                    {!currentProbeAssignment && <Button onClick={() => props.onAssignProbe(selectedProbe.id)}>Assign Probe</Button>}
                    {currentProbeAssignment && currentProbeAssignment.completed && currentProbeAssignment.remainingFuelCellCount > 0 && <Button onClick={() => props.onAssignProbe(selectedProbe.id)}>Reassign Probe</Button>}
                </React.Fragment> :

                    <span>Please select a probe</span>}


            </div>

        </div>}

    </div >
}
