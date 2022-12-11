import React from "react";
import shieldStyle from "components/cards/ShieldControl/shieldStyle";

export default ({simulator, shields}) => {
  const {assets} = simulator;
  return (
    <div className="shieldMonitoring">
      <div className="shieldBubble" style={{boxShadow: shieldStyle(shields)}}>
        <img
          alt="ship"
          role="presentation"
          className="mw-100 shieldImage"
          draggable="false"
          src={`/assets${assets.top}`}
        />
      </div>
      <div
        className="shieldBubble"
        style={{boxShadow: shieldStyle(shields, true)}}
      >
        <img
          alt="ship"
          role="presentation"
          className="mw-100 shieldImage"
          draggable="false"
          src={`/assets${assets.side}`}
        />
      </div>
    </div>
  );
};
