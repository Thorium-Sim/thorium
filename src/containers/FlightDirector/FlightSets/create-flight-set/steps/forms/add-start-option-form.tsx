import React from "react";
import { NavigationStartOptions } from "containers/FlightDirector/FlightSets/types";
import { Input, Label, FormGroup, Button } from "reactstrap";
import FilePickerHelper from "../../file-picker-helper";

export type CreateStartOptionFormProps = {
    defaultStartOption?: NavigationStartOptions;
    onCreateOption: (border: NavigationStartOptions) => void;
}

export const CreateStartOptionForm = (props: CreateStartOptionFormProps) => {
    const [name, setName] = React.useState(props.defaultStartOption?.name || '');
    const [iconUrl, setIconUrl] = React.useState(props.defaultStartOption?.imgUrl || "");
    const [riskIndex, setRiskIndex] = React.useState(props.defaultStartOption?.riskModifier || 0);
    const [startSeconds, setStartSeconds] = React.useState(props.defaultStartOption?.secondsForStartup || 0);

    const canCreateBorder = React.useMemo(() => {
        return name && iconUrl && riskIndex !== undefined && startSeconds;
    }, [name, iconUrl, riskIndex, startSeconds]);

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
                <Label>Seconds for Startup *</Label>
                <Input type="number" id="border-start-seconds" value={startSeconds} onChange={(event) => {
                    if (Number(event.target.value) < 0) {
                        alert("Seconds for startup cannot be negative");
                    }
                    else if (isNaN(Number(event.target.value))) {
                        alert("Seconds for startup must be a number");
                    }
                    else {
                        setStartSeconds(Number(event.target.value));
                    }
                }} />
            </FormGroup>

            <Button disabled={!canCreateBorder} onClick={() => {
                props.onCreateOption({
                    name,
                    imgUrl: iconUrl,
                    riskModifier: riskIndex,
                    secondsForStartup: startSeconds,
                    id: props.defaultStartOption?.id || Math.random().toString()
                });
            }}>{props.defaultStartOption ? "Save" : "Create"} Create Start Option</Button>
        </div>
    )
}