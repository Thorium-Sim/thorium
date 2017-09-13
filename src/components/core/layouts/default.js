import React, { Component } from "react";
import { Cores } from "../../views";
import "./default.scss";

const exceptions = [
  "TractorBeamCore",
  "TransporterCore",
  "StealthFieldCore",
  "CrewCore",
  "DecksCore",
  "TimelineCore",
  "SecurityTeamsCore",
  "DamageTeamsCore",
  "CargoCore",
  "ProbeControlCore",
  "ProbeNetworkCore",
  "SecurityDecksCore",
  "SelfDestructCore"
];
export default class CoreDefault extends Component {
  state = { timelineOpen: false };
  render() {
    const { props, state } = this;
    const { timelineOpen } = state;
    return (
      <div>
        <div className="core-default">
          {Object.keys(Cores)
            .filter(c => exceptions.indexOf(c) === -1)
            .map(c => {
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
        <div className={`timeline-core ${timelineOpen ? "open" : ""}`}>
          <div
            className="timeline-label"
            onClick={() => this.setState({ timelineOpen: !timelineOpen })}
          >
            Timeline
          </div>
          <Cores.TimelineCore {...props} />
        </div>
      </div>
    );
  }
}
