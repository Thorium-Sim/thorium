import React from "react";
import { Asset } from "../../../helpers/assets";
import shieldStyle from "../../views/ShieldControl/shieldStyle";

export default ({ simulator, shields }) => {
  const { assets } = simulator;
  return (
    <div className="shieldMonitoring">
      <div className="shieldBubble" style={{ boxShadow: shieldStyle(shields) }}>
        <Asset asset={assets.top}>
          {({ src }) => (
            <img
              alt="ship"
              role="presentation"
              className="mw-100 shieldImage"
              draggable="false"
              src={src}
            />
          )}
        </Asset>
      </div>
      <div
        className="shieldBubble"
        style={{ boxShadow: shieldStyle(shields, true) }}
      >
        <Asset asset={assets.side}>
          {({ src }) => (
            <img
              alt="ship"
              role="presentation"
              className="mw-100 shieldImage"
              draggable="false"
              src={src}
            />
          )}
        </Asset>
      </div>
    </div>
  );
};
