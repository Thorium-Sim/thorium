import React from "react";
import { Input, Label, FormGroup, Button } from "reactstrap";
import FilePickerHelper from "../../file-picker-helper";
import { NavigationExitOptions } from "containers/FlightDirector/FlightSets/types";
export type CreateExitOptionFormProps = {
    defaultExitOption?: NavigationExitOptions;
    onCreateOption: (border: NavigationExitOptions) => void;
}

export const CreateExitOptionForm = (props: CreateExitOptionFormProps) => {
    const [name, setName] = React.useState(props.defaultExitOption?.name || '');
    const [iconUrl, setIconUrl] = React.useState(props.defaultExitOption?.imgUrl || "");
    const [riskIndex, setRiskIndex] = React.useState(props.defaultExitOption?.riskModifier || 0);
    const canCreateOption = React.useMemo(() => {
        return name && iconUrl && riskIndex !== undefined;
    }, [name, iconUrl, riskIndex]);

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
                <Label>Risk Index - 0 to 5 {"(higher is riskier)"}</Label>
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

            <Button disabled={!canCreateOption} onClick={() => {
                props.onCreateOption({
                    id: props.defaultExitOption?.id || Math.random().toString(),
                    name,
                    imgUrl: iconUrl,
                    riskModifier: riskIndex,
                });
            }}>{props.defaultExitOption ? 'Edit' : 'Create'} Exit Option</Button>
        </div>
    )
}