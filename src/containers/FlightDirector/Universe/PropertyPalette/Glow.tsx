import React from "react";
import {
  useEntitySetGlowMutation,
  useEntityRemoveGlowMutation,
  GlowComponent,
  GlowModeEnum,
} from "generated/graphql";
import {Label, Input} from "reactstrap";
import {throttle} from "helpers/debounce";

interface GlowEditProps {
  id: string;
  glow?: GlowComponent;
}

const Glow: React.FC<GlowEditProps> = ({id, glow}) => {
  const [color, setColor] = React.useState(glow?.color);

  React.useEffect(() => {
    setColor(glow?.color || "");
  }, [glow]);

  const [setGlow] = useEntitySetGlowMutation();
  const [removeGlow] = useEntityRemoveGlowMutation();
  const throttleSetGlow = React.useCallback(throttle(setGlow, 250), []);
  return (
    <>
      <Label style={{paddingLeft: "1rem"}}>
        <h3>
          <Input
            type="checkbox"
            checked={Boolean(glow)}
            onChange={e => {
              if (e.target.checked) {
                setGlow({variables: {id}});
              } else {
                removeGlow({variables: {id}});
              }
            }}
          />{" "}
          Glow
        </h3>
      </Label>
      {glow && (
        <>
          <Label>
            Glow Mode
            <Input
              type="select"
              value={glow.glowMode as string}
              onChange={e =>
                setGlow({
                  variables: {id, glowMode: e.target.value as GlowModeEnum},
                })
              }
            >
              {Object.entries(GlowModeEnum).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </Input>
          </Label>
          <Label>
            Color
            <Input
              type="color"
              value={color || "#ffffff"}
              onChange={e => {
                setColor(e.target.value);
                throttleSetGlow({
                  variables: {id, color: e.target.value},
                });
              }}
            />
          </Label>
        </>
      )}
    </>
  );
};

export default Glow;
