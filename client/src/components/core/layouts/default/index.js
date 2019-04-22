import React, { Component } from "react";
import { Cores } from "components/views";
import CoreError from "../coreError";

import "./default.scss";
import "../sideCore.scss";

const allowed = [
  "EngineControlCore",
  "SensorsGridCore",
  "SensorsCore",
  "ShieldControlCore",
  "CommConvoCore",
  "InternalCommCore",
  "SystemsCore",
  "DockingCore",
  "NavigationCore",
  "CommShortRangeCore",
  "DamageReportsCore",
  "TargetingCore",
  "PhaserCore",
  "TorpedoCore",
  "ActionsCore",
  "ThrusterCore",
  "ReactorControlCore",
  "HeatCore",
  "ExtrasCore",
  "SignalJammerCore",
  "ExocompCore"
];
export default class CoreDefault extends Component {
  state = {};
  render() {
    return (
      <div className="core">
        <div className="core-default">
          {Object.keys(Cores)
            .filter(c => allowed.indexOf(c) > -1)
            .map(c => {
              const Core = Cores[c];
              const label = c.replace("Core", "");
              return (
                <div key={c} className={`inner-core-area ${c}`}>
                  <p>{label}</p>
                  <CoreError>
                    <Core {...this.props} />
                  </CoreError>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
