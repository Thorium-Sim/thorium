import React from "react";
import { CreateFlightSetStepProps } from "./types";
import './shared-styles.css'
import { Button, ButtonGroup, Table } from "reactstrap";
import { SelectablePositionMap, PositionMap } from "../../Map";
import { FlightSet } from "../../types";

export const FlightSetCreationSummary: React.FC<CreateFlightSetStepProps<FlightSet>> = ({ onBack, onNext, canNext, nextLabel, backLabel, state, setState }) => {
    return (
        <div className="step-parent" style={{ height: 'calc(100% - 1rem)' }}>
            <div className={"step-title"}>
                <span>Summary for {state.name}</span>
                <ButtonGroup>
                    <Button onClick={onBack}>{backLabel}</Button>
                    <Button onClick={onNext} disabled={!canNext}>{nextLabel}</Button>
                </ButtonGroup>
            </div>
            <div className="step-content" style={{ height: '100%' }}>
                <div className="step-content-row">
                    <div className="step-content-column" style={{ alignItems: 'start' }}>
                        <div className="step-content-row">
                            <label htmlFor="flight-set-name">Flight Set Name: </label>
                            <span>{state.name}</span>
                        </div>
                        <div className="step-content-row">
                            <label htmlFor="flight-set-label">Flight Set Label: </label>
                            <span>{state.label ? state.label : 'None'}</span>
                        </div>
                        <div className="step-content-row">
                            <label htmlFor="add-on-training">Add on Training: </label>
                            <span>{state.addOnTraining ? ' Yes' : ' No'}</span>
                        </div>
                    </div>
                    <div className="step-content-row" style={{ height: '13rem', flexGrow: 1 }}>
                        <SelectablePositionMap
                            imageUrl={state.backgroundImg}
                            locations={state.pointsOfInterest.map(poi => {
                                return {
                                    ...poi.location,
                                    id: poi.id,
                                    name: poi.name,
                                }
                            })}
                            onClick={() => { }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '24px' }}>
                    <div className="step-content-column">
                        <label className="step-subtitle" htmlFor="poi-table">Points of Interest</label>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Show</th>
                                    <th>Info Bas/Det/Sec</th>
                                    <th>Speed Index</th>
                                    <th>Risk Index</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.pointsOfInterest.map(poi => <tr>
                                    <td><img src={poi.iconUrl} height={"30px"} draggable={false} alt={poi.name} /></td>
                                    <td>{poi.name}</td>
                                    <td>
                                        <input type="checkbox" checked={poi.isVisible} readOnly />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                            <label style={{ marginBottom: 0 }} title={poi.information.basicInformation} htmlFor="show-basic">B</label>
                                            <input type="checkbox" id="show-basic" checked={poi.information.hasBasicInformation} readOnly />
                                            <label style={{ marginBottom: 0 }} title={poi.information.detailedInformation} htmlFor="show-detailed">D</label>
                                            <input type="checkbox" id="show-detailed" checked={poi.information.hasDetailedInformation} readOnly />
                                            <label style={{ marginBottom: 0 }} title={poi.information.secretInformation} htmlFor="show-secret">S</label>
                                            <input type="checkbox" id="show-secret" checked={poi.information.hasSecretInformation} readOnly />
                                        </div>
                                    </td>
                                    <td>{poi.speedIndex}</td>
                                    <td>{poi.riskIndex}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <div className="step-content-column">
                        <label className="step-subtitle" htmlFor="poi-table">Borders</label>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Side</th>
                                    <th>Risk Index</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.borders.map(border => <tr>
                                    <td><img src={border.iconUrl} height={"30px"} draggable={false} alt={border.name} /></td>
                                    <td>{border.name}</td>
                                    <td>{border.location.side}</td>
                                    <td>{border.riskIndex}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <div className="step-content-column">
                        <label htmlFor="defaultStartLocation">Default Start Location</label>
                        <PositionMap
                            imageUrl={state.backgroundImg}
                            primaryLocation={state.defaultStartingLocation}
                            onMapClick={() => { }} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '24px' }}>
                    <div className="step-content-column">
                        <label className="step-subtitle" htmlFor="start-options">Start Options</label>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Risk Index</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.startOptions.map(startOption => <tr>
                                    <td><img src={startOption.imgUrl} height={"30px"} draggable={false} alt={startOption.name} /></td>
                                    <td>{startOption.name}</td>
                                    <td>{startOption.riskModifier}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <div className="step-content-column">
                        <label className="step-subtitle" htmlFor="speed-options">Speed Options</label>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Risk Index</th>
                                    <th>Speed Index</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.speedOptions.map(speedOption => <tr>
                                    <td><img src={speedOption.imgUrl} height={"30px"} draggable={false} alt={speedOption.name} /></td>
                                    <td>{speedOption.name}</td>
                                    <td>{speedOption.riskModifier}</td>
                                    <td>{speedOption.speedModifier}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <div className="step-content-column">
                        <label className="step-subtitle" htmlFor="end-options">Exit Options</label>
                        <Table >
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Risk Index</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.exitOptions.map(endOption => <tr>
                                    <td><img src={endOption.imgUrl} height={"30px"} draggable={false} alt={endOption.name} /></td>
                                    <td>{endOption.name}</td>
                                    <td>{endOption.riskModifier}</td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}