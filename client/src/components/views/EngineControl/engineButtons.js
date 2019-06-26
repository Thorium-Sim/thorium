import React from "react";
import { Button } from "helpers/reactstrap";

export default function EngineButtons({ engine, locked, engines, setSpeed }) {
  return engine.speeds.map((speed, speedIndex) => {
    let speedWord = speed;
    if (typeof speed === "object") {
      speedWord = speed.text;
    }
    const powerIndex = engine.power.powerLevels.reduce((acc, p, i) => {
      if (engine.power.power >= p) return i;
      return acc;
    }, -1);
    return (
      <Button
        disabled={locked || engine.damage.damaged || speedIndex > powerIndex}
        key={`speed-${speedIndex}`}
        color="primary"
        block
        className="speedBtn"
        onClick={() => {
          setSpeed(engine, speedIndex, engines, 0);
        }}
      >
        {speedWord}
      </Button>
    );
  });
}
