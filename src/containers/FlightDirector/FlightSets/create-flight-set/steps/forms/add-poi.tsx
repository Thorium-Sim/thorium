import React from "react";
import { PositionMap } from "containers/FlightDirector/FlightSets/Map";
import { FlightSet, PointOfInterest } from "containers/FlightDirector/FlightSets/types";
import { Input, Label, FormGroup, Button } from "reactstrap";
import FilePickerHelper from "../../file-picker-helper";
import EventPicker from "containers/FlightDirector/MissionConfig/EventPicker";
import MacroWrapper from "containers/FlightDirector/MissionConfig/MacroConfig";
import { ActionInput } from "generated/graphql";
import { v4 as uuidv4 } from "uuid";


export type CoreAdvancedNavigationAddPoiProps = {
    flightSet: FlightSet
    onAddPOI: (poi: PointOfInterest) => void;
    defaultStartingData?: PointOfInterest
}

export const CoreAdvancedNavigationAddPoi: React.FC<CoreAdvancedNavigationAddPoiProps> = (props) => {
    const [name, setName] = React.useState<string>(props.defaultStartingData?.name || '');
    const [location, setLocation] = React.useState<{ x: number, y: number }>(props.defaultStartingData?.location || { x: 0, y: 0 });
    const [iconUrl, setIconUrl] = React.useState<string>(props.defaultStartingData?.iconUrl || "");
    const [fullImageUrl, setFullImageUrl] = React.useState<string>(props.defaultStartingData?.fullImageUrl || "");
    const [showName, setShowName] = React.useState<boolean>(props.defaultStartingData?.showName || false);
    const [riskIndex, setRiskIndex] = React.useState<number>(props.defaultStartingData?.riskIndex || 0);
    const [speedIndex, setSpeedIndex] = React.useState<number>(props.defaultStartingData?.speedIndex || 1);
    const [basicInformation, setBasicInformation] = React.useState<string>(props.defaultStartingData?.information.basicInformation || '');
    const [hasBasicInformation, setHasBasicInformation] = React.useState<boolean>(props.defaultStartingData?.information.hasBasicInformation || false);
    const [detailedInformation, setDetailedInformation] = React.useState<string>(props.defaultStartingData?.information.detailedInformation || '');
    const [hasDetailedInformation, setHasDetailedInformation] = React.useState<boolean>(props.defaultStartingData?.information.hasDetailedInformation || false);
    const [secretInformation, setSecretInformation] = React.useState<string>(props.defaultStartingData?.information.secretInformation || '');
    const [hasSecretInformation, setHasSecretInformation] = React.useState<boolean>(props.defaultStartingData?.information.hasSecretInformation || false);

    // Local macro action state for POI events
    const [arrivalMacros, setArrivalMacros] = React.useState<ActionInput[]>(props.defaultStartingData?.arrivalMacros || []);
    const [leaveMacros, setLeaveMacros] = React.useState<ActionInput[]>(props.defaultStartingData?.leaveMacros || []);
    const [transitMacros, setTransitMacros] = React.useState<ActionInput[]>(props.defaultStartingData?.transitMacros || []);
    const [selectedList, setSelectedList] = React.useState<"arrival" | "leave" | "transit">("arrival");
    const [selectedActionId, setSelectedActionId] = React.useState<string | null>(null);

    const getActions = () => selectedList === "arrival" ? arrivalMacros : selectedList === "leave" ? leaveMacros : transitMacros;
    const getActionsFor = (cat: "arrival" | "leave" | "transit") => cat === "arrival" ? arrivalMacros : cat === "leave" ? leaveMacros : transitMacros;
    const setActionsFor = (cat: "arrival" | "leave" | "transit", arr: ActionInput[]) => {
        if (cat === "arrival") setArrivalMacros(arr);
        else if (cat === "leave") setLeaveMacros(arr);
        else setTransitMacros(arr);
    };
    const setActions = (arr: ActionInput[]) => setActionsFor(selectedList, arr);
    const addAction = (cat: "arrival" | "leave" | "transit", eventName: string) => {
        const newAction: ActionInput = { id: uuidv4(), event: eventName, args: "{}", delay: 0, noCancelOnReset: false };
        const current = getActionsFor(cat);
        const next = [...current, newAction];
        setActionsFor(cat, next);
        setSelectedList(cat);
        setSelectedActionId(newAction.id || null);
    };
    const removeAction = (id: string) => {
        const next = getActions().filter(a => a.id !== id);
        setActions(next);
        if (selectedActionId === id) setSelectedActionId(null);
    };
    const updateSelectedAction = (key: keyof ActionInput, value: any) => {
        const next = getActions().map(a => a.id === selectedActionId ? { ...a, [key]: value } : a);
        setActions(next);
    };
    const selectedAction = React.useMemo(() => getActions().find(a => a.id === selectedActionId), [selectedActionId, arrivalMacros, leaveMacros, transitMacros, selectedList]);

    const canAddPoi = React.useMemo(() => {
        return name && location && speedIndex && (basicInformation || detailedInformation || secretInformation) && iconUrl && fullImageUrl;
    }, [name, location, riskIndex, speedIndex, basicInformation, detailedInformation, secretInformation, iconUrl, fullImageUrl]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
            <FormGroup>
                <Label>Name *</Label>
                <Input type="text" id="poi-name" value={name} onChange={(event) => {
                    setName(event.target.value);
                }} />
            </FormGroup>
            <FormGroup style={{ height: '20rem' }}>
                <Label>Location * {'(Click the map to pick the location)'}</Label>
                <PositionMap
                    imageUrl={props.flightSet.backgroundImg}
                    primaryLocation={location}
                    onMapClick={(coord) => {
                        setLocation(coord);
                    }} />
            </FormGroup>
            <FormGroup>
                <Label>Icon *</Label>
                <div style={{ height: '200px', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                    <FilePickerHelper selectedImage={iconUrl} updateImage={(url) => { setIconUrl(url) }} />
                    {iconUrl ? <img src={iconUrl} style={{ height: '200px', width: '200px' }} /> : <div>No Image Selected</div>}
                </div>
            </FormGroup>
            <FormGroup>
                <Label>Full Image *</Label>
                <div style={{ height: '200px', display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                    <FilePickerHelper selectedImage={fullImageUrl} updateImage={(url) => { setFullImageUrl(url) }} />
                    {fullImageUrl ? <img src={fullImageUrl} style={{ height: '200px', width: '200px' }} /> : <div>No Image Selected</div>}
                </div>
            </FormGroup>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '4px', margin: '1.25rem' }}>
                <Label check>
                    <Input check type="checkbox" id="show-name" checked={showName} onChange={(event) => {
                        setShowName(event.target.checked);
                    }} />
                    Show Name on Map
                </Label>

            </div>
            <FormGroup>
                <Label>Risk Index * - 0 to 5{"(higher is riskier)"}</Label>
                <Input type="number" id="risk-index" value={riskIndex} onChange={(event) => {
                    if (isNaN(Number(event.target.value))) {
                        alert('Please enter a number');
                    }
                    else if (Number(event.target.value) < 0) {
                        alert('Please enter a number greater than or equal to 0');
                    }
                    else {
                        setRiskIndex(Number(event.target.value));
                    }
                }} />
            </FormGroup>
            <FormGroup>
                <Label>Speed Index * - 0.1 to 5 {"(higher is faster, < 1 is slower"}</Label>
                <Input type="number" id="speed-index" value={speedIndex} onChange={(event) => {
                    if (isNaN(Number(event.target.value))) {
                        alert('Please enter a number');
                    }
                    else if (Number(event.target.value) < 0) {
                        alert('Please enter a number greater than 0');
                    }
                    else {
                        setSpeedIndex(Number(event.target.value));
                    }

                }} onBlur={() => {
                    if (speedIndex <= 0) {
                        setSpeedIndex(0.1);
                    }
                }} />
            </FormGroup>
            <div style={{ width: '100%' }}>
                <Label>Information - You need at least one section</Label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '1rem' }}>
                    Basic Information
                    <Label style={{ marginLeft: '1.25rem' }}>
                        <Input type="checkbox" id="has-basic-information" checked={hasBasicInformation} onChange={(event) => {
                            setHasBasicInformation(event.target.checked);
                        }} />
                        Display Basic Information
                    </Label>

                </div>
                <textarea style={{ width: '100%' }} id="basic-information" value={basicInformation} onChange={(event) => {
                    setBasicInformation(event.target.value);
                }} />
            </div>
            <FormGroup style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '1rem' }}>
                    Detailed Information
                    <Label style={{ marginLeft: '1.25rem' }}>
                        <Input type="checkbox" id="has-detailed-information" checked={hasDetailedInformation} onChange={(event) => {
                            setHasDetailedInformation(event.target.checked);
                        }} />
                        Display Detailed Information
                    </Label>

                </div>
                <textarea style={{ width: '100%' }} id="detailed-information" value={detailedInformation} onChange={(event) => {
                    setDetailedInformation(event.target.value);
                }} />
            </FormGroup>
            <FormGroup>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '1rem' }}>
                    Secret Information
                    <Label style={{ marginLeft: '1.25rem' }}>
                        <Input type="checkbox" id="has-secret-information" checked={hasSecretInformation} onChange={(event) => {
                            setHasSecretInformation(event.target.checked);
                        }} />
                        Display Secret Information
                    </Label>

                </div>
                <textarea style={{ width: '100%' }} id="secret-information" value={secretInformation} onChange={(event) => {
                    setSecretInformation(event.target.value);
                }} />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <h5>On Arrival</h5>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <EventPicker className={"btn btn-sm btn-success"} handleChange={(e) => { addAction("arrival", e.target.value); }} />
                    </div>
                    <ul className="list-group" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
                        {arrivalMacros?.map(a => (
                            <li key={a.id || uuidv4()} className={`list-group-item ${selectedList === 'arrival' && selectedActionId === a.id ? 'active' : ''}`} onClick={() => { setSelectedList('arrival'); setSelectedActionId(a.id || null); }}>
                                <span>{a.event}</span>
                                <Button size="sm" color="danger" style={{ float: 'right' }} onClick={(e) => { e.stopPropagation(); setSelectedList('arrival'); removeAction(a.id as string); }}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    <h5>On Leave</h5>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <EventPicker className={"btn btn-sm btn-success"} handleChange={(e) => { addAction("leave", e.target.value); }} />
                    </div>
                    <ul className="list-group" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
                        {leaveMacros?.map(a => (
                            <li key={a.id || uuidv4()} className={`list-group-item ${selectedList === 'leave' && selectedActionId === a.id ? 'active' : ''}`} onClick={() => { setSelectedList('leave'); setSelectedActionId(a.id || null); }}>
                                <span>{a.event}</span>
                                <Button size="sm" color="danger" style={{ float: 'right' }} onClick={(e) => { e.stopPropagation(); setSelectedList('leave'); removeAction(a.id as string); }}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    <h5>On Transit</h5>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <EventPicker className={"btn btn-sm btn-success"} handleChange={(e) => { addAction("transit", e.target.value); }} />
                    </div>
                    <ul className="list-group" style={{ maxHeight: '22rem', overflowY: 'auto' }}>
                        {transitMacros?.map(a => (
                            <li key={a.id || uuidv4()} className={`list-group-item ${selectedList === 'transit' && selectedActionId === a.id ? 'active' : ''}`} onClick={() => { setSelectedList('transit'); setSelectedActionId(a.id || null); }}>
                                <span>{a.event}</span>
                                <Button size="sm" color="danger" style={{ float: 'right' }} onClick={(e) => { e.stopPropagation(); setSelectedList('transit'); removeAction(a.id as string); }}>Remove</Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1 }}>
                    <h5>Configure Selected Action</h5>
                    {selectedAction && (
                        <>
                            <FormGroup>
                                <Label>Item Delay (in milliseconds)</Label>
                                <Input
                                    type="number"
                                    value={selectedAction.delay || 0}
                                    onChange={(e) => updateSelectedAction('delay', parseInt(e.target.value || '0'))}
                                />
                            </FormGroup>
                            <FormGroup style={{ marginLeft: '5ch' }}>
                                <Label>
                                    <Input
                                        type="checkbox"
                                        checked={!!selectedAction.noCancelOnReset}
                                        onChange={(e) => updateSelectedAction('noCancelOnReset', e.target.checked)}
                                    />
                                    Don't Cancel Delay on Flight Reset
                                </Label>
                            </FormGroup>
                            <MacroWrapper
                                id={selectedAction.id}
                                delay={selectedAction.delay || 0}
                                noCancelOnReset={!!selectedAction.noCancelOnReset}
                                event={selectedAction.event || ""}
                                args={selectedAction.args || "{}"}
                                updateMacro={(key: string, val: any) => {
                                    if (key === 'args' || key === 'delay' || key === 'noCancelOnReset' || key === 'event') {
                                        updateSelectedAction(key as keyof ActionInput, val);
                                    }
                                }}
                            />
                        </>
                    )}
                </div>
            </div>

            <Button disabled={!canAddPoi} onClick={() => {
                props.onAddPOI({
                    location,
                    id: props.defaultStartingData?.id || Math.random().toString(),
                    name,
                    isVisible: false,
                    isFogOfWar: false,
                    speedIndex,
                    riskIndex,
                    type: {
                        category: 'category',
                        imageUri: iconUrl
                    },
                    information: {
                        basicInformation,
                        detailedInformation,
                        secretInformation,
                        hasBasicInformation,
                        hasDetailedInformation,
                        hasSecretInformation
                    },
                    iconUrl,
                    fullImageUrl,
                    showName: showName,
                    arrivalMacros,
                    leaveMacros,
                    transitMacros,
                });
            }}>{props.defaultStartingData ? "Save POI" : "Add POI"}</Button>
        </div>
    )
}