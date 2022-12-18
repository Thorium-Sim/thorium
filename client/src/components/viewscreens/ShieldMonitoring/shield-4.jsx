import React from "react";
import shieldStyle from "@client/cards/ShieldControl/shieldStyle";

export default ({simulator, shields}) => {
  const {assets} = simulator;
  return (
    <div className="shieldMonitoring">
      <div className="shieldBubble" style={{boxShadow: shieldStyle(shields)}}>
        <img
          alt="ship"
          role="presentation"
          className="shieldImage"
          draggable="false"
          src={`/assets${assets.top}`}
        />
      </div>
    </div>
  );
};
