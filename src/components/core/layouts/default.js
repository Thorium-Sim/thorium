import React, { Component } from "react";
import { Cores } from "../../views";
import CoreFeed from "../../views/CoreFeed";

import "./default.scss";
import "./sideCore.scss";

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
  "SelfDestructCore",
  "ShuttlesCore",
  "ShipCore",
  "ReactivationCore",
  "MessagingCore",
  "ClientsCore"
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
          className={`side-core coreMessaging-core ${messagingOpen
            ? "open"
            : ""}`}
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
