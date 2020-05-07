import React from "react";
import {MacroConfigProps} from "helpers/genericTypes";
import styled from "@emotion/styled/macro";
import {useMacroDmxConfigsQuery} from "generated/graphql";
import {Input, Button, ButtonGroup} from "reactstrap";
import {LightingOptions} from "components/views/Lighting";

const FormWrapper = styled.div`
  label {
    display: block;
  }
`;
const DmxSetSimulatorConfig: React.FC<MacroConfigProps> = ({
  simulatorId,
  updateArgs,
  args,
}) => {
  const {data} = useMacroDmxConfigsQuery();
  return (
    <FormWrapper>
      <label>
        DMX Config
        <Input
          type="select"
          value={args.dmxConfigId || ""}
          onChange={e => updateArgs("dmxConfigId", e.target.value)}
        >
          <option value={""}>Default</option>
          {data?.dmxConfigs.map(d => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </Input>
      </label>
    </FormWrapper>
  );
};
const LightingSetIntensity: React.FC<MacroConfigProps> = ({
  simulatorId,
  updateArgs,
  args,
}) => {
  const [intensityValue, setIntensityValue] = React.useState(
    args.intensity || 0,
  );
  return (
    <FormWrapper>
      <label>
        Intensity: {intensityValue}
        <Input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={intensityValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIntensityValue(parseFloat(e.target.value));
            updateArgs("intensity", parseFloat(e.target.value));
          }}
        />
      </label>
    </FormWrapper>
  );
};
const LightingShakeLights: React.FC<MacroConfigProps> = ({
  simulatorId,
  updateArgs,
  args,
}) => {
  const [durationValue, setDurationValue] = React.useState(args.duration || 0);
  return (
    <FormWrapper>
      <label>
        Duration (Optional): {Math.round(durationValue / 100) / 10}s
        <Input
          type="range"
          min="500"
          max={20 * 1000}
          step="1"
          value={durationValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDurationValue(parseFloat(e.target.value));
            updateArgs("duration", parseFloat(e.target.value));
          }}
        />
      </label>

      <label>
        Effect Strength (Optional)
        <ButtonGroup>
          <Button
            size="sm"
            color="info"
            active={args.strength === 0.2}
            onClick={e => updateArgs("strength", 0.2)}
          >
            Low
          </Button>
          <Button
            size="sm"
            color="warning"
            active={args.strength === 0.5}
            onClick={e => updateArgs("strength", 0.5)}
          >
            Mid
          </Button>
          <Button
            size="sm"
            color="danger"
            active={args.strength === 1}
            onClick={e => updateArgs("strength", 1)}
          >
            High
          </Button>
        </ButtonGroup>
      </label>
    </FormWrapper>
  );
};
const LightingFadeLights: React.FC<MacroConfigProps> = ({
  simulatorId,
  updateArgs,
  args,
}) => {
  const [durationValue, setDurationValue] = React.useState(args.duration || 0);
  const [startIntensity, setStartIntensity] = React.useState(
    args.startIntensity || 0,
  );
  const [endIntensity, setEndIntensity] = React.useState(
    args.endIntensity || 0,
  );
  return (
    <FormWrapper>
      <label>
        End Intensity: {endIntensity}
        <Input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={endIntensity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEndIntensity(parseFloat(e.target.value));
            updateArgs("endIntensity", parseFloat(e.target.value));
          }}
        />
      </label>
      <label>
        Duration: {Math.round(durationValue / 100) / 10}s
        <Input
          type="range"
          min="500"
          max={20 * 1000}
          step="1"
          value={durationValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDurationValue(parseFloat(e.target.value));
            updateArgs("duration", parseFloat(e.target.value));
          }}
        />
      </label>

      <label>
        Start Intensity (Optional): {startIntensity}
        <Input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={startIntensity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setStartIntensity(parseFloat(e.target.value));
            updateArgs("startIntensity", parseFloat(e.target.value));
          }}
        />
      </label>
    </FormWrapper>
  );
};
const LightingSetEffect: React.FC<MacroConfigProps> = ({
  simulatorId,
  updateArgs,
  args,
}) => {
  const [durationValue, setDurationValue] = React.useState(args.duration || 0);

  return (
    <FormWrapper>
      <label>
        Effect
        <Input
          type="select"
          value={args.effect}
          onChange={e => updateArgs("effect", e.target.value)}
        >
          <LightingOptions />
        </Input>
      </label>
      <label>
        Duration (Optional): {Math.round(durationValue / 100) / 10}s
        <Input
          type="range"
          min="500"
          max={20 * 1000}
          step="1"
          value={durationValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDurationValue(parseFloat(e.target.value));
            updateArgs("duration", parseFloat(e.target.value));
          }}
        />
      </label>
      <small>
        Duration affects how long looping effects, like strobe and oscillate,
        take to complete 1 loop. To return back to normal lights after a delay,
        add another "Set Effect" macro with a delay.
      </small>
      <label>
        Effect Strength (Optional)
        <ButtonGroup>
          <Button
            size="sm"
            color="info"
            active={args.strength === 0.2}
            onClick={e => updateArgs("strength", 0.2)}
          >
            Low
          </Button>
          <Button
            size="sm"
            color="warning"
            active={args.strength === 0.5}
            onClick={e => updateArgs("strength", 0.5)}
          >
            Mid
          </Button>
          <Button
            size="sm"
            color="danger"
            active={args.strength === 1}
            onClick={e => updateArgs("strength", 1)}
          >
            High
          </Button>
        </ButtonGroup>
      </label>
    </FormWrapper>
  );
};

export const dmxSetSimulatorConfig = DmxSetSimulatorConfig;
export const lightingSetIntensity = LightingSetIntensity;
export const lightingShakeLights = LightingShakeLights;
export const lightingFadeLights = LightingFadeLights;
export const lightingSetEffect = LightingSetEffect;
