import React, { Component } from "react";
import { Cores } from "../../../views";
import CoreFeed from "../../../views/CoreFeed";

import "./iifx.scss";
import "../sideCore.scss";

const allowed = [
  "SensorsCore",
  "DecodingCore",
  "LRCommCore",
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
        <div className="core-iifx">
          {Object.keys(Cores)
            .filter(c => allowed.indexOf(c) > -1)
            .map(c => {
              const Core = Cores[c];
              const label = c.replace("Core", "");
              return (
                <div key={c} className={c}>
                  <p>{label}</p>
                  <Core {...props} />
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
          <Cores.TimelineCore {...props} />
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
            <Cores.TractorBeamCore {...props} />
            <p>Transporters</p>
            <Cores.TransporterCore {...props} />
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
            <Cores.ShipCore {...props} />
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
            <CoreFeed {...props} />
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
            <Cores.MessagingCore {...props} />
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
            <Cores.ClientsCore {...props} />
          </div>
        </div>
      </div>
    );
  }
}
