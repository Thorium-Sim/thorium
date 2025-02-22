import { formatSecondsToTime } from 'containers/FlightDirector/FlightSets/Time';
import { Probe, ProbeAssignment } from 'containers/FlightDirector/FlightSets/types';
import React from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';


export type AstrometricsCoreComponentProps = {
    probes: Probe[];
    probeAssignments: ProbeAssignment[];
    onUpdateProbeAssignments: (probeAssignments: ProbeAssignment[]) => void;
}

export const AstrometricsCoreComponent: React.FC<AstrometricsCoreComponentProps> = (props) => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [selectedAssignment, setSelectedAssignment] = React.useState<ProbeAssignment | null>(null);
    const handleAddData = () => {
        if (selectedAssignment) {
            const data = prompt('Enter new data', '');
            if (data) {
                props.onUpdateProbeAssignments(props.probeAssignments.map((assignment) => {
                    if (assignment.probeId === selectedAssignment.probeId) {
                        return {
                            ...assignment,
                            data: [...assignment.data, data]
                        }
                    }
                    return assignment;
                }));
            }
        }
    }
    return <div>
        <table>
            <thead>
                <tr>
                    <th>Probe</th>
                    <th>Target Destination</th>
                    <th>ETA</th>
                    <th>Probe data</th>

                </tr>
            </thead>
            <tbody>
                {props.probeAssignments.map((probeAssignment, index) => {
                    const probe = props.probes.find(probe => probe.id === probeAssignment.probeId);
                    return <tr key={index}>
                        <td>{probe?.name}</td>
                        <td>{probeAssignment.targetLocationName}</td>
                        <td>{formatSecondsToTime(probeAssignment.currentEta)}</td>
                        <td>

                            <Button onClick={() => {
                                setSelectedAssignment(probeAssignment);
                                setModal(true);
                            }}>View</Button>

                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Probe Data for {props.probes.find((probe) => probe.id === selectedAssignment?.probeId)?.name}</ModalHeader>
            <ModalBody>
                <ul>
                    <li><button onClick={handleAddData}>Add new data</button></li>
                    {selectedAssignment?.data.map((data, index) => {
                        return <li key={index}>{data} <button onClick={() => {
                            const newData = selectedAssignment.data.filter((_, i) => i !== index);
                            props.onUpdateProbeAssignments(props.probeAssignments.map((assignment) => {
                                if (assignment.probeId === selectedAssignment?.probeId) {
                                    return {
                                        ...assignment,
                                        data: newData
                                    }
                                }
                                return assignment;
                            }));
                        }}>X</button></li>
                    })}

                </ul>
            </ModalBody>
        </Modal>
    </div>
}