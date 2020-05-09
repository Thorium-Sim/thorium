import React from "react";
import {
  useEntitySetAppearanceMutation,
  AppearanceComponent,
  MeshTypeEnum,
} from "generated/graphql";
import {Label, Input, Button, Collapse} from "reactstrap";
import {throttle} from "helpers/debounce";
import {FaChevronDown, FaChevronRight} from "react-icons/fa";

interface AppearanceEditProps {
  id: string;
  appearance: AppearanceComponent;
  setAsset: (
    label: string,
    dir: string,
    current: string,
    callback: Function,
  ) => void;
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

const AssetButton: React.FC<{
  id: string;
  asset?: string;
  assetName: string;
  assetDir: string;
  assetKey: string;
  setAsset: Function;
  setAppearance: Function;
}> = ({id, asset, assetName, assetDir, assetKey, setAsset, setAppearance}) => {
  return (
    <Label>
      {assetName}: {asset || "Not Set"}
      <div>
        <Button
          size="sm"
          onClick={() =>
            setAsset(assetName, assetDir, asset || "", (value: string) =>
              setAppearance({variables: {id, [assetKey]: value}}),
            )
          }
        >
          Change {assetName}
        </Button>
        {asset && (
          <Button
            color="danger"
            size="sm"
            onClick={() => setAppearance({variables: {id, [assetKey]: ""}})}
          >
            Clear {assetName}
          </Button>
        )}
      </div>
    </Label>
  );
};
const Appearance: React.FC<AppearanceEditProps> = ({
  id,
  appearance,
  setAsset,
}) => {
  const [collapse, setCollapse] = React.useState<boolean>(false);

  const [color, setColor] = React.useState(appearance?.color);
  const [emissiveColor, setEmissiveColor] = React.useState(
    appearance?.emissiveColor,
  );
  const [emissiveIntensity, setEmissiveIntensity] = React.useState(
    appearance?.emissiveIntensity,
  );
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
  if (!appearance.meshType) return null;
  return (
    <>
      <h3 onClick={() => setCollapse(c => !c)}>
        {collapse ? <FaChevronDown /> : <FaChevronRight />} Appearance
      </h3>
      <Collapse isOpen={collapse} timeout={100}>
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
            type="text"
            value={scale ?? 1}
            min={1}
            max={695500000}
            step={0.01}
            onChange={e => {
              setScale(parseFloat(e.target.value));
              throttleSetAppearance({
                variables: {id, scale: parseFloat(e.target.value)},
              });
            }}
          />
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
        {[MeshTypeEnum.Sphere, MeshTypeEnum.Cube].includes(
          appearance.meshType,
        ) && (
          <>
            <AssetButton
              id={id}
              assetKey="materialMapAsset"
              asset={appearance.materialMapAsset || undefined}
              assetName="Map Asset"
              assetDir="/3D/Texture/Planets"
              setAsset={setAsset}
              setAppearance={setAppearance}
            />
            <AssetButton
              id={id}
              assetKey="cloudMapAsset"
              asset={appearance.cloudMapAsset || undefined}
              assetName="Cloud Asset"
              assetDir="/3D/Texture/Planets/Clouds"
              setAsset={setAsset}
              setAppearance={setAppearance}
            />
            <AssetButton
              id={id}
              assetKey="ringMapAsset"
              asset={appearance.ringMapAsset || undefined}
              assetName="Ring Asset"
              assetDir="/3D/Texture/Planets/Rings"
              setAsset={setAsset}
              setAppearance={setAppearance}
            />

            <Label>
              Emissive Color
              <Input
                type="color"
                value={emissiveColor || "#ffffff"}
                onChange={e => {
                  setEmissiveColor(e.target.value);
                  throttleSetAppearance({
                    variables: {id, emissiveColor: e.target.value},
                  });
                }}
              />
            </Label>
            <Label>
              Emissive Intensity
              <Input
                type="range"
                min={0}
                max={2}
                step={0.1}
                value={emissiveIntensity || 0}
                onChange={e => {
                  setEmissiveIntensity(parseFloat(e.target.value));
                  throttleSetAppearance({
                    variables: {
                      id,
                      emissiveIntensity: parseFloat(e.target.value),
                    },
                  });
                }}
              />
            </Label>
          </>
        )}
        {appearance.meshType === "model" && (
          <Label>
            <div>Model Asset: {appearance.modelAsset || "Not Set"}</div>
            <Button
              size="sm"
              onClick={() =>
                setAsset(
                  "Model Asset",
                  "/3D/Model",
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
      </Collapse>
    </>
  );
};

export default Appearance;
