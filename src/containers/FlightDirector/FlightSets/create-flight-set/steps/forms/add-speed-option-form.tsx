import React from "react";
import { NavigationSpeedOptions } from "containers/FlightDirector/FlightSets/types";
import { Input, Label, FormGroup, Button } from "reactstrap";
import FilePickerHelper from "../../file-picker-helper";

export type CreateSpeedOptionFormProps = {
    defaultSpeedOption?: NavigationSpeedOptions;
    onCreateOption: (border: NavigationSpeedOptions) => void;
}

export const CreateSpeedOptionForm = (props: CreateSpeedOptionFormProps) => {
    const [name, setName] = React.useState(props.defaultSpeedOption?.name || '');
    const [iconUrl, setIconUrl] = React.useState(props.defaultSpeedOption?.imgUrl || "");
    const [riskIndex, setRiskIndex] = React.useState(props.defaultSpeedOption?.riskModifier || 0);
    const [speedIndex, setSpeedIndex] = React.useState(props.defaultSpeedOption?.speedModifier || 0);
    const [requiresMaxEngines, setRequiresMaxEngines] = React.useState(props.defaultSpeedOption?.requiresMaxEngines || false);
    const canCreateOption = React.useMemo(() => {
        return name && iconUrl && riskIndex !== undefined && speedIndex;
    }, [name, iconUrl, riskIndex, speedIndex]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', color: 'black' }}>
            <FormGroup>
                <Label>Name *</Label>
                <Input type="text" id="border-name" value={name} onChange={(event) => {
                    setName(event.target.value);
                }} />
            </FormGroup>
            <FormGroup>
                <Label>Icon *</Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', height: '300px' }}>
                    <FilePickerHelper selectedImage={iconUrl} updateImage={(url) => { setIconUrl(url) }} />
                    {iconUrl ? <img src={iconUrl} style={{ height: '300px', width: '300px' }} /> : <div>No Image Selected</div>}
                </div>
            </FormGroup>
            <FormGroup>
                <Label>Risk Index * - 0 to 5 {"(higher is riskier)"}</Label>
                <Input type="number" id="border-risk-index" value={riskIndex} onChange={(event) => {
                    if (Number(event.target.value) < 0) {
                        alert("Risk index cannot be negative");
                    }
                    else if (isNaN(Number(event.target.value))) {
                        alert("Risk index must be a number");
                    }
                    else {
                        setRiskIndex(Number(event.target.value));
                    }
                }} />
            </FormGroup>
            <FormGroup>
                <Label>Speed Modifier</Label>
                <Input type="number" id="border-speed-index" value={speedIndex} onChange={(event) => {
                    if (Number(event.target.value) < 0) {
                        alert("Speed modifier cannot be negative");
                    }
                    else if (isNaN(Number(event.target.value))) {
                        alert("Speed modifier must be a number");
                    }
                    else {
                        setSpeedIndex(Number(event.target.value));
                    }
                }} />
            </FormGroup>
            <Label style={{ margin: '1.25rem' }} check>
                <Input check type="checkbox" id="show-name" checked={requiresMaxEngines} onChange={(event) => {
                    setRequiresMaxEngines(event.target.checked);
                }} />
                Requires Max Engines
            </Label>
            <Button disabled={!canCreateOption} onClick={() => {
                console.log('Creating speed option');
                props.onCreateOption({
                    id: props.defaultSpeedOption?.id || Math.random().toString(),
                    name,
                    imgUrl: iconUrl,
                    riskModifier: riskIndex,
                    speedModifier: speedIndex,
                    requiresMaxEngines
                });
            }}>{props.defaultSpeedOption ? 'Save' : "Create"} Speed Option</Button>
        </div>
    )
}