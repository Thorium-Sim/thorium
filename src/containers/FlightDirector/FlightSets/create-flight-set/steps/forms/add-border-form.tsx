import { MapBorderSide, MapBorder } from "containers/FlightDirector/FlightSets/types";
import { Input, Label, FormGroup, Button } from "reactstrap";
import React from "react";
import FilePickerHelper from "../../file-picker-helper";


export type CreateBorderFormProps = {
    availableBorderSides: MapBorderSide[];
    defaultBorder?: MapBorder;
    onCreateBorder: (border: MapBorder) => void;
}

export const CreateBorderForm = (props: CreateBorderFormProps) => {
    const [name, setName] = React.useState(props.defaultBorder?.name || '');
    const [iconUrl, setIconUrl] = React.useState(props.defaultBorder?.iconUrl || "");
    const [riskIndex, setRiskIndex] = React.useState(props.defaultBorder?.riskIndex || 0);
    const [side, setSide] = React.useState(props.defaultBorder?.location.side || props.availableBorderSides[0]);


    const canCreateBorder = React.useMemo(() => {
        return name && iconUrl && riskIndex !== undefined && side;
    }, [name, iconUrl, riskIndex, side]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
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


            <Label>Risk Index * {"(higher is riskier - 0 to 5)"}</Label>
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
            <Label>Side *</Label>
            <Input type="select" id="border-side" value={side} onChange={(event) => {
                setSide(event.target.value as MapBorderSide);
            }}>
                {props.availableBorderSides.map((each) => {
                    return <option key={each} value={each}>{each}</option>
                })}
            </Input>
            <Button disabled={!canCreateBorder} onClick={() => {
                props.onCreateBorder({
                    id: props.defaultBorder?.id || Math.random().toString(),
                    name,
                    iconUrl,
                    riskIndex,
                    location: {
                        side
                    }
                });
            }}>{props.defaultBorder ? "Save" : "Create"} Border</Button>
        </div>
    )
}