import React from "react";
import {Aegis_Mode, Aegis_Relay_Target} from "generated/graphql";
import {Button, ButtonGroup} from "helpers/reactstrap";
import FocusPad from "./FocusPad";
import ThrottledSlider from "./ThrottledSlider";
import {relayTargets} from "./modeInfo";

interface SecondaryControlsProps {
  mode: Aegis_Mode;
  screenFocusX: number;
  screenFocusY: number;
  ecmIntensity: number;
  relayTarget: Aegis_Relay_Target;
  repairEffort: number;
  onScreenFocus: (x: number, y: number) => void;
  onEcmIntensity: (value: number) => void;
  onRelayTarget: (target: Aegis_Relay_Target) => void;
  onRepairEffort: (value: number) => void;
}

// The fine control that swaps in below the mode buttons for the active mode:
// a focus pad for the screen, intensity/effort sliders for ECM/repair, and a
// boost-target picker for the relay.
const SecondaryControls: React.FC<SecondaryControlsProps> = props => {
  const {mode} = props;

  if (mode === Aegis_Mode.Screen) {
    return (
      <div className="aegis-secondary">
        <h4>Screen Focus</h4>
        <FocusPad
          x={props.screenFocusX}
          y={props.screenFocusY}
          onChange={props.onScreenFocus}
        />
      </div>
    );
  }

  if (mode === Aegis_Mode.Ecm) {
    return (
      <div className="aegis-secondary">
        <ThrottledSlider
          label="Jamming Intensity"
          value={props.ecmIntensity}
          warning="High output accelerates drone wear"
          onChange={props.onEcmIntensity}
        />
      </div>
    );
  }

  if (mode === Aegis_Mode.Relay) {
    return (
      <div className="aegis-secondary">
        <h4>Boost Target</h4>
        <ButtonGroup className="aegis-relay-target">
          {relayTargets.map(({target, label}) => (
            <Button
              key={target}
              color="info"
              active={props.relayTarget === target}
              onClick={() => props.onRelayTarget(target)}
            >
              {label}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    );
  }

  return (
    <div className="aegis-secondary">
      <ThrottledSlider
        label="Repair Effort"
        value={props.repairEffort}
        warning="Hard-working drones wear out faster"
        onChange={props.onRepairEffort}
      />
    </div>
  );
};

export default SecondaryControls;
