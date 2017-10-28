import React from "react";
import { Button } from "reactstrap";

const PhaserBeam = ({
  coolPhasers,
  firePhasers,
  heat,
  index,
  id,
  charge,
  state,
  selectedBank = null,
  disabled,
  selectPhaserBank = () => {}
}) => {
  return (
    <div className="phaser-fire">
      <p>
        <strong>
          Bank {index}
        </strong>
      </p>
      <p>
        Charge: {Math.round(charge * 100)}%
      </p>
      <p className="text-danger">
        Heat: {Math.round(heat * 100)}%
      </p>
      <Button
        size="sm"
        color="danger"
        disabled={disabled}
        onMouseDown={firePhasers.bind(this, id)}
      >
        Fire
      </Button>
      <Button size="sm" color="info" onMouseDown={coolPhasers.bind(this, id)}>
        Cool
      </Button>
    </div>
  );
};

export default PhaserBeam;
