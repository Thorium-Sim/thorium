import React from "react";
import { Button } from "reactstrap";
import AnimatedNumber from "react-animated-number";

const PhaserBeam = ({
  coolPhasers,
  firePhasers,
  heat,
  index,
  id,
  charge,
  disabled
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
        onMouseDown={e => firePhasers(id, e)}
        onTouchStart={e => firePhasers(id, e)}
      >
        Fire
      </Button>
      <Button
        size="sm"
        color="info"
        onMouseDown={coolPhasers.bind(this, id)}
        onTouchStart={coolPhasers.bind(this, id)}
      >
        Cool
      </Button>
    </div>
  );
};

export default PhaserBeam;
