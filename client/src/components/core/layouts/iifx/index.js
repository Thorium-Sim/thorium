import React, { Component } from "react";
import { Cores } from "components/views";
import CoreError from "../coreError";

import "./iifx.scss";
import "../sideCore.scss";

const allowed = [
  "SensorsCore",
  "CommConvoCore",
  "InternalCommCore",
  "SystemsCore",
  "CommShortRangeCore",
  "DamageReportsCore",
  "StealthFieldCore",
  "CargoCore",
  "ActionsCore",
  "ThrusterCore",
  "CrewCore",
  "SecurityTeamsCore",
  "DamageTeamsCore",
  "ProbeNetworkCore",
  "ProbeControlCore",
  "ReactorControlCore",
  "ShuttlesCore",
  "SecurityDecksCore",
  "ExtrasCore"
];
export default class CoreIIFX extends Component {
  state = {};
  render() {
    return (
      <div className="core">
        <div className="core-iifx">
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
