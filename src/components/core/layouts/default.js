import React from "react";
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
  "ProbeNetworkCore"
];
export default props => {
  return (
    <div>
      <div className="core-default">
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
      <div className="timeline-core">
        <Cores.TimelineCore {...props} />
      </div>
    </div>
  );
};
