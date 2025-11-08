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
    onUpsertDraftStartOption?: (opt: NavigationStartOptions) => void;
    onUpsertDraftSpeedOption?: (opt: NavigationSpeedOptions) => void;
    onUpsertDraftExitOption?: (opt: NavigationExitOptions) => void;
} & CreateFlightSetStepProps<FlightSet>


const generateOptionsArray = (allOptions: (NavigationStartOptions | NavigationSpeedOptions | NavigationExitOptions)[], selectedOptions: (NavigationStartOptions | NavigationSpeedOptions | NavigationExitOptions)[]) => {
    // Merge, keeping unique by name
    const byName: Record<string, NavigationStartOptions | NavigationSpeedOptions | NavigationExitOptions> = {};
    [...allOptions, ...selectedOptions].forEach(opt => {
        byName[opt.name] = opt;
    });
    return Object.values(byName);
};

export const FlightSetCreationFlightOptions: React.FC<FlightSetCreationFlightOptionsProps> = ({ onBack, onNext, canNext, nextLabel, backLabel, state, setState, allStartOptions, allExitOptions, allSpeedOptions, onUpsertDraftStartOption, onUpsertDraftSpeedOption, onUpsertDraftExitOption }) => {
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
                                    <td><input type="checkbox" checked={state.startOptions.some(o => o.id === startOption.id)} onChange={(event) => {
                                        const include = event.target.checked;
                                        if (include) {
                                            setState({
                                                ...state,
                                                startOptions: [...state.startOptions.filter(o => o.name !== startOption.name), startOption]
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
                                                        // Replace by name in chooser list
                                                        const updated = [...optionArray.filter(o => o.name !== option.name), option];
                                                        setOptionArray(updated);
                                                        onUpsertDraftStartOption && onUpsertDraftStartOption(option as NavigationStartOptions);
                                                        // Update included list by id if present
                                                        if (selectedOption) {
                                                            const included = state.startOptions.some(o => o.id === selectedOption.id);
                                                            const newIncluded = included
                                                                ? state.startOptions.map(o => o.id === selectedOption.id ? (option as NavigationStartOptions) : o)
                                                                : state.startOptions;
                                                            setState({
                                                                ...state,
                                                                startOptions: newIncluded,
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
                                        // Insert/replace by name
                                        const updated = [...optionArray.filter(o => o.name !== option.name), option];
                                        setOptionArray(updated);
                                        onUpsertDraftStartOption && onUpsertDraftStartOption(option as NavigationStartOptions);
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
                                    <td><input type="checkbox" checked={state.speedOptions.some(o => o.id === speedOption.id)} onChange={(event) => {
                                        const include = event.target.checked;
                                        if (include) {
                                            setState({
                                                ...state,
                                                speedOptions: [...state.speedOptions.filter(o => o.name !== speedOption.name), speedOption]
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
                                                        const updated = [...speedOptionsArray.filter(o => o.name !== option.name), option];
                                                        setSpeedOptionsArray(updated);
                                                        onUpsertDraftSpeedOption && onUpsertDraftSpeedOption(option as NavigationSpeedOptions);
                                                        if (selectedSpeedOption) {
                                                            const included = state.speedOptions.some(o => o.id === selectedSpeedOption.id);
                                                            const newIncluded = included
                                                                ? state.speedOptions.map(o => o.id === selectedSpeedOption.id ? (option as NavigationSpeedOptions) : o)
                                                                : state.speedOptions;
                                                            setState({
                                                                ...state,
                                                                speedOptions: newIncluded,
                                                            });
                                                        }
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
                                        const updated = [...speedOptionsArray.filter(o => o.name !== option.name), option];
                                        setSpeedOptionsArray(updated);
                                        onUpsertDraftSpeedOption && onUpsertDraftSpeedOption(option as NavigationSpeedOptions);
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
                                    <td><input type="checkbox" checked={state.exitOptions.some(o => o.id === exitOption.id)} onChange={(event) => {
                                        const include = event.target.checked;
                                        if (include) {
                                            setState({
                                                ...state,
                                                exitOptions: [...state.exitOptions.filter(o => o.name !== exitOption.name), exitOption]
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
                                                        const updated = [...exitOptionsArray.filter(o => o.name !== option.name), option];
                                                        setExitOptionsArray(updated);
                                                        onUpsertDraftExitOption && onUpsertDraftExitOption(option as NavigationExitOptions);
                                                        if (selectedExitOption) {
                                                            const included = state.exitOptions.some(o => o.id === selectedExitOption.id);
                                                            const newIncluded = included
                                                                ? state.exitOptions.map(o => o.id === selectedExitOption.id ? (option as NavigationExitOptions) : o)
                                                                : state.exitOptions;
                                                            setState({
                                                                ...state,
                                                                exitOptions: newIncluded,
                                                            });
                                                        }
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
                                        const updated = [...exitOptionsArray.filter(o => o.name !== option.name), option];
                                        setExitOptionsArray(updated);
                                        onUpsertDraftExitOption && onUpsertDraftExitOption(option as NavigationExitOptions);
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