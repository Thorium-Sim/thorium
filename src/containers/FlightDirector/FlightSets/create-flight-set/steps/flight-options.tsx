import React from "react";
import { CreateFlightSetStepProps } from "./types";
import './shared-styles.css'
import { Button, Modal, ModalBody, Table } from "reactstrap";
import { CreateStartOptionForm } from "./forms/add-start-option-form";
import { CreateSpeedOptionForm } from "./forms/add-speed-option-form";
import { CreateExitOptionForm } from "./forms/add-exit-option-form";
import { NavigationStartOptions, NavigationSpeedOptions, NavigationExitOptions, FlightSet } from "../../types";

export type FlightSetCreationFlightOptionsProps = {
    allStartOptions: NavigationStartOptions[];
    allSpeedOptions: NavigationSpeedOptions[];
    allExitOptions: NavigationExitOptions[];
} & CreateFlightSetStepProps<FlightSet>


const generateOptionsArray = (allOptions: (NavigationStartOptions | NavigationSpeedOptions | NavigationExitOptions)[], selectedOptions: (NavigationStartOptions | NavigationSpeedOptions | NavigationExitOptions)[]) => {
    let optionsArray = [...allOptions];
    selectedOptions.forEach(option => {
        if (!optionsArray.some(each => each.id === option.id)) {
            optionsArray.push(option);
        }
    });
    return optionsArray;
};

export const FlightSetCreationFlightOptions: React.FC<FlightSetCreationFlightOptionsProps> = ({ onBack, onNext, canNext, nextLabel, backLabel, state, setState, allStartOptions, allExitOptions, allSpeedOptions }) => {
    const [optionArray, setOptionArray] = React.useState<NavigationStartOptions[]>(generateOptionsArray(allStartOptions, state.startOptions) as NavigationStartOptions[]);
    const [speedOptionsArray, setSpeedOptionsArray] = React.useState<NavigationSpeedOptions[]>(generateOptionsArray(allSpeedOptions, state.speedOptions) as NavigationSpeedOptions[]);
    const [exitOptionsArray, setExitOptionsArray] = React.useState<NavigationExitOptions[]>(generateOptionsArray(allExitOptions, state.exitOptions) as NavigationExitOptions[]);
    const [addOptionDialogOpen, setAddOptionDialogOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState<NavigationStartOptions | undefined>(undefined);
    const [editOptionDialogOpen, setEditOptionDialogOpen] = React.useState(false);
    const [addSpeedOptionDialogOpen, setAddSpeedOptionDialogOpen] = React.useState(false);
    const [selectedSpeedOption, setSelectedSpeedOption] = React.useState<NavigationSpeedOptions | undefined>(undefined);
    const [editSpeedOptionDialogOpen, setEditSpeedOptionDialogOpen] = React.useState(false);
    const [addExitOptionDialogOpen, setAddExitOptionDialogOpen] = React.useState(false);
    const [selectedExitOption, setSelectedExitOption] = React.useState<NavigationExitOptions | undefined>(undefined);
    const [editExitOptionDialogOpen, setEditExitOptionDialogOpen] = React.useState(false);
    return (
        <div className="step-parent" style={{ height: '100%' }}>
            <div className={"step-title"}>
                <span>Flight Options</span>
                <div className="step-actions">
                    <Button onClick={onBack}>{backLabel}</Button>
                    <Button onClick={onNext} disabled={!canNext}>{nextLabel}</Button>
                </div>
            </div>
            <div className="step-content" style={{ height: 'calc(100% - 4rem)' }}>
                <div className="step-content-column" style={{ height: '100%', overflow: 'auto' }}>
                    <div className="step-content-column" style={{ width: '100%' }}>
                        <span className="step-subtitle">Start Options</span>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Included</th>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Risk Index</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {optionArray.map(startOption => <tr>
                                    <td><input type="checkbox" checked={state.startOptions.includes(startOption)} onChange={(event) => {
                                        const include = event.target.checked;
                                        if (include) {
                                            setState({
                                                ...state,
                                                startOptions: [...state.startOptions, startOption]
                                            });
                                        }
                                        else {
                                            setState({
                                                ...state,
                                                startOptions: state.startOptions.filter(each => each.id !== startOption.id)
                                            });
                                        }
                                    }} /></td>
                                    <td><img src={startOption.imgUrl} height={"30px"} draggable={false} alt={startOption.name} /></td>
                                    <td>{startOption.name}</td>
                                    <td>{startOption.riskModifier}</td>
                                    <td>
                                        <Button onClick={() => {
                                            setSelectedOption(startOption);
                                            setEditOptionDialogOpen(true);
                                        }}>Edit</Button>
                                        <Modal size="lg" isOpen={editOptionDialogOpen} toggle={() => setEditOptionDialogOpen(false)}>
                                            <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                                <CreateStartOptionForm
                                                    defaultStartOption={selectedOption}
                                                    onCreateOption={(option) => {
                                                        const indexOfOption = optionArray.findIndex(each => each.id === option.id);
                                                        const newOptionArray = [...optionArray];
                                                        newOptionArray[indexOfOption] = option;
                                                        setOptionArray(newOptionArray);
                                                        if (selectedOption && state.startOptions.includes(selectedOption)) {
                                                            const indexOfOption = state.startOptions.findIndex(each => each.id === selectedOption.id);
                                                            const newOptionArray = [...state.startOptions];
                                                            newOptionArray[indexOfOption] = option;
                                                            setState({
                                                                ...state,
                                                                startOptions: newOptionArray
                                                            });
                                                        }
                                                        setEditOptionDialogOpen(false);
                                                    }} />
                                            </ModalBody>
                                        </Modal>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <Button style={{ alignSelf: 'end' }} onClick={() => setAddOptionDialogOpen(true)}>Add Start Option</Button>
                        <Modal size="lg" isOpen={addOptionDialogOpen} toggle={() => setAddOptionDialogOpen(false)}>
                            <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                <CreateStartOptionForm
                                    onCreateOption={(option) => {
                                        setOptionArray([...optionArray, option]);
                                        setAddOptionDialogOpen(false);
                                    }} />
                            </ModalBody>
                        </Modal>
                    </div>
                    <div className="step-content-column" style={{ width: '100%' }}>
                        <span className="step-subtitle">Speed Options</span>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Included</th>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Risk Index</th>
                                    <th>Speed Index</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {speedOptionsArray.map(speedOption => <tr>
                                    <td><input type="checkbox" checked={state.speedOptions.includes(speedOption)} onChange={(event) => {
                                        const include = event.target.checked;
                                        if (include) {
                                            setState({
                                                ...state,
                                                speedOptions: [...state.speedOptions, speedOption]
                                            });
                                        }
                                        else {
                                            setState({
                                                ...state,
                                                speedOptions: state.speedOptions.filter(each => each.id !== speedOption.id)
                                            });
                                        }
                                    }} /></td>
                                    <td><img src={speedOption.imgUrl} height={"30px"} draggable={false} alt={speedOption.name} /></td>
                                    <td>{speedOption.name}</td>
                                    <td>{speedOption.riskModifier}</td>
                                    <td>{speedOption.speedModifier}</td>
                                    <td>
                                        <Button onClick={() => {
                                            setSelectedSpeedOption(speedOption);
                                            setEditSpeedOptionDialogOpen(true);
                                        }}>Edit</Button>
                                        <Modal size="lg" isOpen={editSpeedOptionDialogOpen} toggle={() => setEditSpeedOptionDialogOpen(false)}>
                                            <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                                <CreateSpeedOptionForm
                                                    defaultSpeedOption={selectedSpeedOption}
                                                    onCreateOption={(option) => {
                                                        console.log('Creating speed option');
                                                        const indexOfOption = speedOptionsArray.findIndex(each => each.id === option.id);
                                                        const newOptionArray = [...speedOptionsArray];
                                                        newOptionArray[indexOfOption] = option;
                                                        setSpeedOptionsArray(newOptionArray);
                                                        setEditSpeedOptionDialogOpen(false);
                                                    }} />
                                            </ModalBody>
                                        </Modal>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <Button style={{ alignSelf: 'end' }} onClick={() => setAddSpeedOptionDialogOpen(true)}>Add Speed Option</Button>
                        <Modal size="lg" isOpen={addSpeedOptionDialogOpen} toggle={() => setAddSpeedOptionDialogOpen(false)}>
                            <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                <CreateSpeedOptionForm
                                    onCreateOption={(option) => {
                                        setSpeedOptionsArray([...speedOptionsArray, option]);
                                        setAddSpeedOptionDialogOpen(false);
                                    }} />
                            </ModalBody>
                        </Modal>
                    </div>
                    <div className="step-content-column" style={{ width: '100%' }}>
                        <span className="step-subtitle">Exit Options</span>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Included</th>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Risk Index</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exitOptionsArray.map(exitOption => <tr>
                                    <td><input type="checkbox" checked={state.exitOptions.includes(exitOption)} onChange={(event) => {
                                        const include = event.target.checked;
                                        if (include) {
                                            setState({
                                                ...state,
                                                exitOptions: [...state.exitOptions, exitOption]
                                            });
                                        }
                                        else {
                                            setState({
                                                ...state,
                                                exitOptions: state.exitOptions.filter(each => each.id !== exitOption.id)
                                            });
                                        }
                                    }} /></td>
                                    <td><img src={exitOption.imgUrl} height={"30px"} draggable={false} alt={exitOption.name} /></td>
                                    <td>{exitOption.name}</td>
                                    <td>{exitOption.riskModifier}</td>
                                    <td>
                                        <Button onClick={() => {
                                            setSelectedExitOption(exitOption);
                                            setEditExitOptionDialogOpen(true);
                                        }}>Edit</Button>
                                        <Modal size="lg" isOpen={editExitOptionDialogOpen} toggle={() => setEditExitOptionDialogOpen(false)}>
                                            <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                                <CreateExitOptionForm
                                                    defaultExitOption={selectedExitOption}
                                                    onCreateOption={(option) => {
                                                        const indexOfOption = exitOptionsArray.findIndex(each => each.id === option.id);
                                                        const newOptionArray = [...exitOptionsArray];
                                                        newOptionArray[indexOfOption] = option;
                                                        setExitOptionsArray(newOptionArray);
                                                        setEditExitOptionDialogOpen(false);
                                                    }} />
                                            </ModalBody>
                                        </Modal>
                                    </td>
                                </tr>)}
                            </tbody>
                        </Table>
                        <Button style={{ alignSelf: 'end' }} onClick={() => setAddExitOptionDialogOpen(true)}>Add Exit Option</Button>
                        <Modal size="lg" isOpen={addExitOptionDialogOpen} toggle={() => setAddExitOptionDialogOpen(false)}>
                            <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                <CreateExitOptionForm
                                    onCreateOption={(option) => {
                                        setExitOptionsArray([...exitOptionsArray, option]);
                                        setAddExitOptionDialogOpen(false);
                                    }} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}