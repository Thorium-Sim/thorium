import React from "react";
import "./style.css";

const DamageOverlay = ({ message = "", system, style }) => {
  let reason = null;
  if (
    system.power &&
    system.power.powerLevels &&
    system.power.power < system.power.powerLevels[0]
  ) {
    reason = "Insufficient Power";
  }
  if (system.damage && system.damage.damaged) {
    reason = "System Damaged";
  }
  return (
    <div
      className="damageOverlay"
      style={Object.assign(
        {
          display: reason ? "flex" : "none",
          opacity: reason ? 1 : 0
        },
        style
      )}
    >
      <h1>{`${message}\n${reason}`}</h1>
    </div>
  );
};

export default DamageOverlay;
