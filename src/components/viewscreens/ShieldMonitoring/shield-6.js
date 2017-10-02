import React from "react";
import { Asset } from "../../../helpers/assets";
import shieldStyle from "../../views/ShieldControl/shieldStyle";

export default ({ simulator, shields }) =>
  <div className="shieldMonitoring">
    <div className="shieldBubble" style={{ boxShadow: shieldStyle(shields) }}>
      <Asset asset={"/Ship Views/Top"} simulatorId={simulator.id}>
        {({ src }) =>
          <img
            role="presentation"
            className="mw-100 shieldImage"
            draggable="false"
            src={src}
          />}
      </Asset>
    </div>
    <div
      className="shieldBubble"
      style={{ boxShadow: shieldStyle(shields, true) }}
    >
      <Asset asset={"/Ship Views/Right"} simulatorId={simulator.id}>
        {({ src }) =>
          <img
            role="presentation"
            className="mw-100 shieldImage"
            draggable="false"
            src={src}
          />}
      </Asset>
    </div>
  </div>;
