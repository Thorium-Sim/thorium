import React from "react";
import { PositionMap } from "containers/FlightDirector/FlightSets/Map";
import { FlightSet, PointOfInterest } from "containers/FlightDirector/FlightSets/types";
import { Input, Label, FormGroup, Button } from "reactstrap";
import FilePickerHelper from "../../file-picker-helper";


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
                    showName: showName
                });
            }}>{props.defaultStartingData ? "Save POI" : "Add POI"}</Button>
        </div>
    )
}