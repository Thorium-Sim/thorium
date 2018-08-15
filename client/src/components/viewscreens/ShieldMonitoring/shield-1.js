import React from "react";
import { Asset } from "../../../helpers/assets";
import { shieldColor } from "../../views/ShieldControl/shieldStyle";

export default ({ simulator, shields }) => {
  const s = shields[0];
  const color = shieldColor(s);
  const { assets } = simulator;
  return (
    <div className="shieldMonitoring">
      <Asset asset={assets.top}>
        {({ src }) => (
          <img
            alt="ship"
            role="presentation"
            className="mw-100 ccw-90 shieldImage"
            style={{ filter: `drop-shadow(${color} 0px 0px 30px)` }}
            draggable="false"
            src={src}
          />
        )}
      </Asset>
    </div>
  );
};
