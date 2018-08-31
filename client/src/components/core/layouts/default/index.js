import React, { Component } from "react";
import { Cores } from "../../../views";
import CoreFeed from "../../../views/CoreFeed";
import CoreError from "../coreError";

import "./default.scss";
import "../sideCore.scss";

const allowed = [
  "EngineControlCore",
  "SensorsGridCore",
  "SensorsCore",
  "ShieldControlCore",
  "DecodingCore",
  "LRCommCore",
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
    const { props, state } = this;
    const {
      timelineOpen,
      tractOpen,
      shipOpen,
      coreFeedOpen,
      messagingOpen,
      clientsOpen
    } = state;
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
                    <Core {...props} />
                  </CoreError>
                </div>
              );
            })}
        </div>
        <div
          className={`side-core timeline-core ${timelineOpen ? "open" : ""}`}
        >
          <div
            className="timeline-label side-label"
            onClick={() => this.setState({ timelineOpen: !timelineOpen })}
          >
            Timeline
          </div>
          <CoreError>
            <Cores.TimelineCore {...props} />
          </CoreError>
        </div>
        <div className={`side-core tract-core ${tractOpen ? "open" : ""}`}>
          <div
            className="tract-label side-label"
            onClick={() => this.setState({ tractOpen: !tractOpen })}
          >
            Tractor Beam/Transporters
          </div>
          <div className="inner-cores">
            <p>Tractor Beam</p>
            <CoreError>
              <Cores.TractorBeamCore {...props} />
            </CoreError>
            <p>Transporters</p>
            <CoreError>
              <Cores.TransporterCore {...props} />
            </CoreError>
          </div>
        </div>
        <div className={`side-core ship-core ${shipOpen ? "open" : ""}`}>
          <div
            className="ship-label side-label"
            onClick={() => this.setState({ shipOpen: !shipOpen })}
          >
            Ship
          </div>
          <div className="inner-cores">
            <CoreError>
              <Cores.ShipCore {...props} />
            </CoreError>
          </div>
        </div>
        <div
          className={`side-core coreFeeds-core ${coreFeedOpen ? "open" : ""}`}
        >
          <div
            className="coreFeed-label side-label"
            onClick={() => this.setState({ coreFeedOpen: !coreFeedOpen })}
          >
            Core Feed
          </div>
          <div className="inner-cores">
            <CoreError>
              <CoreFeed {...props} />
            </CoreError>
          </div>
        </div>
        <div
          className={`side-core coreMessaging-core ${
            messagingOpen ? "open" : ""
          }`}
        >
          <div
            className="coreMessaging-label side-label"
            onClick={() => this.setState({ messagingOpen: !messagingOpen })}
          >
            Messaging
          </div>
          <div className="inner-cores">
            <CoreError>
              <Cores.MessagingCore {...props} />
            </CoreError>
          </div>
        </div>
        <div className={`side-core clients-core ${clientsOpen ? "open" : ""}`}>
          <div
            className="clients-label side-label"
            onClick={() => this.setState({ clientsOpen: !clientsOpen })}
          >
            Login Names
          </div>
          <div className="inner-cores">
            <CoreError>
              <Cores.LoginNameCore {...props} />
            </CoreError>
          </div>
        </div>
      </div>
    );
  }
}
