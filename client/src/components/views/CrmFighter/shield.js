import React from "react";
import { shieldColor } from "../ShieldControl/shieldStyle";

const Shield = ({ fighterImage, hull, shield, shieldRaised }) => {
  return (
    <div className="fighter-shield">
      <img
        src={`/assets${fighterImage}`}
        draggable="false"
        alt="Fighter"
        style={{
          filter: `drop-shadow(0px 0px 10px ${shieldColor({
            state: shieldRaised,
            integrity: shield
          })})`
        }}
      />
      <div>Shield Strength: {Math.round(shield * 100)}%</div>
      <div>Hull Integrity: {Math.round(hull * 100)}%</div>
    </div>
  );
};
export default Shield;
