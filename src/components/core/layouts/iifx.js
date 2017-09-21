import React from "react";
import { Cores } from "../../views";
import "./iifx.scss";

const exceptions = [
  "EngineControlCore",
  "SensorsGridCore",
  "ShieldControlCore",
  "DockingCore",
  "NavigationCore",
  "TargetingCore",
  "PhaserCore",
  "TorpedoCore",
  "SelfDestructCore",
  //"TimelineCore",
  "HeatCore",
  "DecksCore",
  "ShipCore",
  "ReactivationCore",
  "MessagingCore"
];
export default props => {
  return (
    <div className="core-iifx">
      {Object.keys(Cores).filter(c => exceptions.indexOf(c) === -1).map(c => {
        const Core = Cores[c];
        const label = c.replace("Core", "");
        return (
          <div key={c} className={c}>
            <p>
              {label}
            </p>
            <Core {...props} />
          </div>
        );
      })}
    </div>
  );
};
