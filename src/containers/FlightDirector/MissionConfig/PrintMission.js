import React from "react";
import * as Macros from "../../../components/macrosPrint";
import { Col, Row } from "reactstrap";
import "./printStyle.css";
const PrintMission = ({ mission }) => {
  return (
    <div className="printMission printable">
      <h1>{mission.name}</h1>
      <p>{mission.description}</p>
      {mission.timeline.map((m, key) => (
        <div key={m.id} className="mission-step">
          <h2>
            {key + 1}: {m.name}
          </h2>
          <p>{m.description}</p>
          <div className="mission-item-holder">
            {m.timelineItems.map(i => (
              <div key={i.id} className="mission-item">
                <h3>{i.event}</h3>
                {Macros[i.event] &&
                  (() => {
                    const MacroPreview = Macros[i.event];
                    let args = i.args;
                    if (typeof args === "string") {
                      args = JSON.parse(args);
                    }
                    return <MacroPreview args={args} />;
                  })()}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintMission;
