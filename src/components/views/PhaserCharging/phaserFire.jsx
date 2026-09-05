import React from "react";
import {Button} from "helpers/reactstrap";
import AnimatedNumber from "react-animated-number";

// Fire/Cool wire a single `onPointerDown` rather than the old
// `onMouseDown` + `onTouchStart` pair. Chrome fires the compat `mousedown`
// after `touchstart`, so on a touchscreen every tap ran these twice -- which is
// what the 2-second `interactionTime` guard in Targeting/index.jsx exists to
// swallow. Pointer events fire exactly once for mouse and touch alike.
const PhaserBeam = ({
  coolPhasers,
  firePhasers,
  heat,
  index,
  id,
  charge,
  disabled,
}) => {
  return (
    <div className="phaser-fire">
      <p>
        <strong>Bank {index}</strong>
      </p>
      <p>
        Charge:
        <AnimatedNumber
          value={charge}
          duration={300}
          formatValue={n => `${Math.round(n * 100)}%`}
        />
      </p>
      <p className="text-danger">
        Heat:{" "}
        <AnimatedNumber
          value={heat}
          duration={300}
          formatValue={n => `${Math.round(n * 100)}%`}
        />
      </p>
      <Button
        size="sm"
        color="danger"
        disabled={disabled}
        onPointerDown={e => firePhasers(id, e)}
      >
        Fire
      </Button>
      <Button size="sm" color="info" onPointerDown={e => coolPhasers(id, e)}>
        Cool
      </Button>
    </div>
  );
};

export default PhaserBeam;
