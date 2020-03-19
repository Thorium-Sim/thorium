import React from "react";
import {
  useEntitySetLightMutation,
  useEntityRemoveLightMutation,
  LightComponent,
} from "generated/graphql";
import {Label, Input} from "reactstrap";
import {throttle} from "helpers/debounce";

interface LightEditProps {
  id: string;
  light?: LightComponent;
}

const Light: React.FC<LightEditProps> = ({id, light}) => {
  const [color, setColor] = React.useState(light?.color);
  const [intensity, setIntensity] = React.useState(light?.intensity);
  const [decay, setDecay] = React.useState(light?.decay);

  React.useEffect(() => {
    setColor(light?.color || "");
  }, [light]);

  const [setLight] = useEntitySetLightMutation();
  const [removeLight] = useEntityRemoveLightMutation();
  const throttleSetLight = React.useCallback(throttle(setLight, 250), []);
  return (
    <>
      <Label style={{paddingLeft: "1rem"}}>
        <h3>
          <Input
            type="checkbox"
            checked={Boolean(light)}
            onChange={e => {
              if (e.target.checked) {
                setLight({variables: {id}});
              } else {
                removeLight({variables: {id}});
              }
            }}
          />{" "}
          Light
        </h3>
      </Label>
      {light && (
        <>
          <Label>
            Color
            <Input
              type="color"
              value={color || "#ffffff"}
              onChange={e => {
                setColor(e.target.value);
                throttleSetLight({
                  variables: {id, color: e.target.value},
                });
              }}
            />
          </Label>
          <Label>
            Intensity: {intensity}
            <Input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={intensity ?? 1}
              onChange={e => {
                setIntensity(parseFloat(e.target.value));
                throttleSetLight({
                  variables: {
                    id,
                    intensity: parseFloat(e.target.value),
                  },
                });
              }}
            />
          </Label>
          <Label>
            Decay: {decay}
            <Input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={decay ?? 2}
              onChange={e => {
                setDecay(parseFloat(e.target.value));
                throttleSetLight({
                  variables: {
                    id,
                    decay: parseFloat(e.target.value),
                  },
                });
              }}
            />
          </Label>
        </>
      )}
    </>
  );
};

export default Light;
