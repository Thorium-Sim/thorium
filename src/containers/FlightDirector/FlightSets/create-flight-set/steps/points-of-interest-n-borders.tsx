import React from "react";
import { CreateFlightSetStepProps } from "./types";
import './shared-styles.css'
import { Button, Modal, ModalBody, Table } from "reactstrap";
import { CoreAdvancedNavigationAddPoi } from "./forms/add-poi";
import { CreateBorderForm } from "./forms/add-border-form";
import { SelectablePositionMap } from "../../Map";
import { FlightSet, MapBorder, PointOfInterest, MapBorderSide } from "../../types";


export const FlightSetCreationPointsOfInterestNBorders: React.FC<CreateFlightSetStepProps<FlightSet>> = ({ onBack, onNext, canNext, nextLabel, backLabel, state, setState }) => {
    const [addPOIDialogOpen, setAddPOIDialogOpen] = React.useState(false);
    const [editPOIDialogOpen, setEditPOIDialogOpen] = React.useState(false);
    const [addBorderDialogOpen, setAddBorderDialogOpen] = React.useState(false);
    const [editBorderDialogOpen, setEditBorderDialogOpen] = React.useState(false);
    const [selectedBorder, setSelectedBorder] = React.useState<MapBorder | undefined>(undefined);
    const [selectedPOI, setSelectedPOI] = React.useState<PointOfInterest | undefined>(undefined);
    const allBorderSides: MapBorderSide[] = ['top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left'];

    return (
        <div className="step-parent" style={{ height: '100%' }}>
            <div className={"step-title"}>
                <span>Points of Interest + Border Configuration</span>
                <div className="step-actions">
                    <Button onClick={onBack}>{backLabel}</Button>
                    <Button onClick={onNext} disabled={!canNext}>{nextLabel}</Button>
                </div>
            </div>
            <div className="step-content" style={{ height: '100%' }}>
                <div className="step-content-row" style={{ height: '100%', gap: '2rem' }}>
                    <div className="step-content-column" style={{ height: '100%' }}>
                        <SelectablePositionMap
                            imageUrl={state.backgroundImg}
                            onClick={(coord) => { console.log(coord) }}
                            locations={state.pointsOfInterest.map(poi => {
                                return {
                                    id: poi.id,
                                    ...poi.location,
                                    name: poi.name,
                                    showName: true
                                }
                            })} />
                        <span>All points of interest will be labeled on this map during configuration</span>
                    </div>
                    <div className="step-content-column" style={{ height: '100%', paddingLeft: '2rem' }}>

                        <div style={{ height: "50%", width: '100%', overflow: 'auto' }}>
                            <span>Points of Interest</span>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Name</th>
                                        <th>Show</th>
                                        <th>Info Bas/Det/Sec</th>
                                        <th>Speed Index</th>
                                        <th>Risk Index</th>
                                        <th>Edit</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.pointsOfInterest.map(poi => <tr>
                                        <td><img src={poi.iconUrl} height={"30px"} draggable={false} alt={poi.name} /></td>
                                        <td>{poi.name}</td>
                                        <td><input type="checkbox" checked={poi.isVisible} onChange={(event) => {
                                            const indexOfPointOfInterest = state.pointsOfInterest.findIndex(each => each.id === poi.id);
                                            const currentlySelectedFlightSet = { ...state };
                                            currentlySelectedFlightSet.pointsOfInterest[indexOfPointOfInterest].isVisible = event.target.checked;
                                            setState(currentlySelectedFlightSet);
                                        }} /></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                                                <label style={{ marginBottom: 0 }} title={poi.information.basicInformation} htmlFor="show-basic">B</label>
                                                <input title={poi.information.basicInformation} type="checkbox" id="show-basic" checked={poi.information.hasBasicInformation} onChange={(event) => {
                                                    const indexOfPointOfInterest = state.pointsOfInterest.findIndex(each => each.id === poi.id);
                                                    const currentlySelectedFlightSet = { ...state };
                                                    currentlySelectedFlightSet.pointsOfInterest[indexOfPointOfInterest].information.hasBasicInformation = event.target.checked;
                                                    setState(currentlySelectedFlightSet);
                                                }} />
                                                <label style={{ marginBottom: 0 }} title={poi.information.detailedInformation} htmlFor="show-detailed">D</label>
                                                <input title={poi.information.detailedInformation} type="checkbox" id="show-detailed" checked={poi.information.hasDetailedInformation} onChange={(event) => {
                                                    const indexOfPointOfInterest = state.pointsOfInterest.findIndex(each => each.id === poi.id);
                                                    const currentlySelectedFlightSet = { ...state };
                                                    currentlySelectedFlightSet.pointsOfInterest[indexOfPointOfInterest].information.hasDetailedInformation = event.target.checked;
                                                    setState(currentlySelectedFlightSet);
                                                }} />
                                                <label style={{ marginBottom: 0 }} title={poi.information.secretInformation} htmlFor="show-secret">S</label>
                                                <input title={poi.information.secretInformation} type="checkbox" id="show-secret" checked={poi.information.hasSecretInformation} onChange={(event) => {
                                                    const indexOfPointOfInterest = state.pointsOfInterest.findIndex(each => each.id === poi.id);
                                                    const currentlySelectedFlightSet = { ...state };
                                                    currentlySelectedFlightSet.pointsOfInterest[indexOfPointOfInterest].information.hasSecretInformation = event.target.checked;
                                                    setState(currentlySelectedFlightSet);
                                                }} />
                                            </div>
                                        </td>
                                        <td>{poi.speedIndex}</td>
                                        <td>{poi.riskIndex}</td>
                                        <td><Button onClick={() => {
                                            setSelectedPOI(poi);
                                            setEditPOIDialogOpen(true);
                                        }}>Edit</Button>
                                            <Modal size="lg" isOpen={editPOIDialogOpen} toggle={() => setEditPOIDialogOpen(!editPOIDialogOpen)}>
                                                <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                                    <CoreAdvancedNavigationAddPoi
                                                        flightSet={state}
                                                        defaultStartingData={selectedPOI}
                                                        onAddPOI={(poi) => {
                                                            const flightSet = { ...state };
                                                            const indexOfPointOfInterest = state.pointsOfInterest.findIndex(each => each.id === poi.id);
                                                            flightSet.pointsOfInterest[indexOfPointOfInterest] = poi;
                                                            setState(flightSet);
                                                            setEditPOIDialogOpen(false);
                                                        }}
                                                    />
                                                </ModalBody>
                                            </Modal>
                                        </td>
                                        <td><Button onClick={() => {
                                            const indexOfPointOfInterest = state.pointsOfInterest.findIndex(each => each.id === poi.id);
                                            const currentlySelectedFlightSet = { ...state };
                                            currentlySelectedFlightSet.pointsOfInterest.splice(indexOfPointOfInterest, 1);
                                            setState(currentlySelectedFlightSet);
                                        }}>Remove</Button></td>
                                    </tr>)}

                                </tbody>
                            </Table>
                            <Button onClick={() => setAddPOIDialogOpen(true)}>Add Point of Interest</Button>
                            <Modal size="lg" isOpen={addPOIDialogOpen} toggle={() => setAddPOIDialogOpen(!addPOIDialogOpen)}>
                                <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                    <CoreAdvancedNavigationAddPoi
                                        flightSet={state}
                                        onAddPOI={(poi) => {
                                            const flightSet = { ...state };
                                            flightSet.pointsOfInterest.push(poi);
                                            setState(flightSet);
                                            setAddPOIDialogOpen(false);
                                        }}
                                    />
                                </ModalBody>
                            </Modal>
                        </div>
                        <div style={{ height: "50%", width: '100%', overflow: 'auto' }}>
                            <span>Borders</span>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Name</th>
                                        <th>Side</th>
                                        <th>Risk Index</th>
                                        <th>Edit</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.borders.map(border => <tr>
                                        <td><img src={border.iconUrl} height={"30px"} draggable={false} alt={border.name} /></td>
                                        <td>{border.name}</td>
                                        <td>{border.location.side}</td>
                                        <td>{border.riskIndex}</td>
                                        <td><Button onClick={() => {
                                            setSelectedBorder(border);
                                            setEditBorderDialogOpen(true);
                                        }}>Edit</Button>
                                            <Modal size="lg" isOpen={editBorderDialogOpen} toggle={() => setEditBorderDialogOpen(!editBorderDialogOpen)}>
                                                <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                                    <CreateBorderForm
                                                        availableBorderSides={
                                                            selectedBorder ?
                                                                allBorderSides.filter(each => {
                                                                    return state.borders.every(border => border.location.side !== each);
                                                                }).concat([(selectedBorder as MapBorder).location.side]) : allBorderSides.filter(each => {
                                                                    return state.borders.every(border => border.location.side !== each);
                                                                }
                                                                )}
                                                        onCreateBorder={(border) => {
                                                            const indexOfBorder = state.borders.findIndex(each => each.id === selectedBorder?.id);
                                                            const currentlySelectedFlightSet = { ...state };
                                                            currentlySelectedFlightSet.borders[indexOfBorder] = border;
                                                            setState(currentlySelectedFlightSet);
                                                            setEditBorderDialogOpen(false);
                                                        }}
                                                        defaultBorder={selectedBorder}
                                                    />
                                                </ModalBody>
                                            </Modal>
                                        </td>
                                        <td><Button onClick={() => {
                                            const indexOfBorder = state.borders.findIndex(each => each.id === border.id);
                                            const currentlySelectedFlightSet = { ...state };
                                            currentlySelectedFlightSet.borders.splice(indexOfBorder, 1);
                                            setState(currentlySelectedFlightSet);
                                        }}>Remove</Button></td>
                                    </tr>)}

                                </tbody>
                            </Table>
                            <Button disabled={allBorderSides.filter((each) => {
                                return state.borders.every(border => border.location.side !== each);
                            }).length === 0}
                                onClick={() => setAddBorderDialogOpen(true)}>Add Border</Button>
                            <Modal size="lg" isOpen={addBorderDialogOpen} toggle={() => setAddBorderDialogOpen(!addBorderDialogOpen)}>
                                <ModalBody style={{ backgroundColor: '#F5F5F5', borderRadius: '5px' }}>
                                    <CreateBorderForm
                                        availableBorderSides={allBorderSides.filter(each => {
                                            return state.borders.every(border => border.location.side !== each);
                                        })}
                                        onCreateBorder={(border) => {
                                            const currentlySelectedFlightSet = { ...state };
                                            currentlySelectedFlightSet.borders.push(border);
                                            setState(currentlySelectedFlightSet);
                                            setAddBorderDialogOpen(false);
                                        }}
                                    />
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}