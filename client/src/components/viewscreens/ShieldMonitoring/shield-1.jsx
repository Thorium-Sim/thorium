import React from "react";
import {shieldColor} from "@client/cards/ShieldControl/shieldStyle";

export default ({simulator, shields}) => {
  const s = shields[0];
  const color = shieldColor(s);
  const {assets} = simulator;
  return (
    <div className="shieldMonitoring">
      <img
        alt="ship"
        role="presentation"
        className="mw-100 ccw-90 shieldImage"
        style={{filter: `drop-shadow(${color} 0px 0px 30px)`}}
        draggable="false"
        src={`/assets${assets.top}`}
      />
    </div>
  );
};
