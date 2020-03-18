import React from "react";
import {
  useEntitySetAppearanceMutation,
  AppearanceComponent,
  MeshTypeEnum,
} from "generated/graphql";
import {Label, Input, Button} from "reactstrap";
import {throttle} from "helpers/debounce";

interface AppearanceEditProps {
  id: string;
  appearance: AppearanceComponent;
  setAsset: (label: string, current: string, callback: Function) => void;
}

// position will be between 0 and 100
var minp = 1;
var maxp = 100;

// The result should be between 100 an 10000000
var minv = Math.log(1);
var maxv = Math.log(695500000);

// calculate adjustment factor
var logScale = (maxv - minv) / (maxp - minp);
function logSlider(position: number) {
  return Math.exp(minv + logScale * (position - minp));
}
function logPosition(value: number) {
  return (Math.log(value) - minv) / logScale + minp;
}

const Appearance: React.FC<AppearanceEditProps> = ({
  id,
  appearance,
  setAsset,
}) => {
  const [color, setColor] = React.useState(appearance?.color);
  const [scale, setScale] = React.useState(appearance?.scale);

  React.useEffect(() => {
    setColor(appearance?.color || "");
    setScale(appearance?.scale);
  }, [appearance]);

  const [setAppearance] = useEntitySetAppearanceMutation();
  const throttleSetAppearance = React.useCallback(
    throttle(setAppearance, 250),
    [],
  );
  return (
    <>
      <h3>Appearance</h3>
      <Label>
        Mesh Type
        <Input
          type="select"
          value={appearance.meshType as string}
          onChange={e =>
            setAppearance({
              variables: {id, meshType: e.target.value as MeshTypeEnum},
            })
          }
        >
          {Object.entries(MeshTypeEnum).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </Input>
      </Label>
      {appearance.meshType !== "model" && (
        <Label>
          Color
          <Input
            type="color"
            value={color || "#ffffff"}
            onChange={e => {
              setColor(e.target.value);
              throttleSetAppearance({
                variables: {id, color: e.target.value},
              });
            }}
          />
        </Label>
      )}
      <Label>
        Scale ({Math.round(scale || 1)})
        <Input
          style={{width: "100%"}}
          type="range"
          value={logPosition(scale ?? 1)}
          min={1}
          max={100}
          step={0.01}
          onChange={e => {
            setScale(logSlider(parseFloat(e.target.value)));
            throttleSetAppearance({
              variables: {id, scale: logSlider(parseFloat(e.target.value))},
            });
          }}
        />
      </Label>
      {appearance.meshType === "model" && (
        <Label>
          Model Asset: {appearance.modelAsset || "Not Set"}
          <Button
            size="sm"
            onClick={() =>
              setAsset(
                "Model Asset",
                appearance.modelAsset || "",
                (value: string) =>
                  setAppearance({variables: {id, modelAsset: value}}),
              )
            }
          >
            Change Model Asset
          </Button>{" "}
        </Label>
      )}
    </>
  );
};

export default Appearance;
