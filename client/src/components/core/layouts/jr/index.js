import React, { Component } from "react";
import { Cores } from "components/views";
import "./jr.scss";
const coreList = [
  "JrNavigationCore",
  "EngineControlCore",
  "SensorsGridCore",
  "SensorsCore",
  "ShieldControlCore",
  "CommShortRangeCore",
  "TargetingCore",
  "PhaserCore",
  "TorpedoCore",
  "ActionsCore",
  "ThrusterCore",
  "TractorBeamCore",
  "TransporterCore",
  "SystemsCore",
  "ReactivationCore"
];
export default class CoreJr extends Component {
  render() {
    return (
      <div className="core">
        <div className="core-jr">
          {coreList.map(c => {
            if (!Cores[c]) return null;
            const Core = Cores[c];
            const label = c.replace("Core", "");
            return (
              <div key={c} className={c}>
                <p>{label}</p>
                <Core {...this.props} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
