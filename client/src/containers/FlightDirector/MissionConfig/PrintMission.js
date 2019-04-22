import React from "react";
import * as Macros from "../../../components/macrosPrint";
import { Button } from "reactstrap";
import Printable from "helpers/printable";

import "./printStyle.scss";

export const macroNames = {
  addTractorTarget: "Add Tractor Target",
  removeTractorTarget: "Remove Tractor Target",
  hitShields: "Hit Shields",
  setPresetAnswers: "Set Preset Scan Answers",
  setArmyContacts: "Set Army Contacts",
  sendLongRangeMessage: "Send Long Range Message",
  processedData: "Send Processed Sensors Data",
  probeProcessedData: "Send Processed Probe Network Data",
  updateViewscreenComponent: "Show On Viewscreen",
  showViewscreenTactical: "Show Tactical on Viewscreen",
  navSetPresets: "Set Navigation Presets",
  setViewscreenToAuto: "Set Viewscreen to Auto",
  addShortRangeComm: "Add Short Range Comm Hail",
  removeShortRangeComm: "Remove Short Range Comm Hail",
  breakSystem: "Break System",
  fixSystem: "Fix System",
  addLibraryEntry: "Add Library Entry",
  removeLibraryEntry: "Remove Library Entry",
  triggerAction: "Trigger Action",
  signalJammerSignals: "Set Signal Jammer Signals",
  setTransporterTargets: "Set Transporter Targets",
  navCourseResponse: "Send Nav Course Response",
  addObjective: "Add Mission Objective",
  completeObjective: "Complete Mission Objective",
  autoAdvance: "Auto Advance Timeline",
  syncTimer: "Set Core Timer",
  sendMessage: "Send Inter-ship Message"
};
const PrintMission = ({ mission, clearMission }) => {
  return (
    <div className="printMission-holder">
      <div className="hider">
        <h4>
          Mission Printing{" "}
          <small>
            <Button color="link" onClick={clearMission}>
              Go back
            </Button>
          </small>
          <div>
            <small>
              {" "}
              Copy and paste into a word processor, or print this page
            </small>
          </div>
        </h4>
      </div>
      <Printable preview>
        <div className="print-mission">
          <h1>{mission.name}</h1>
          <p className="description">{mission.description}</p>
          {mission.timeline.map((m, key) => (
            <div key={m.id} className="mission-step">
              <h2>
                {key + 1}: {m.name}
              </h2>
              <p className="description">{m.description}</p>
              <div className="mission-item-holder">
                {m.timelineItems
                  .concat()
                  .sort((a, b) => {
                    if (a.delay > b.delay) return 1;
                    if (a.delay < b.delay) return -1;
                    return 0;
                  })
                  .map(i => (
                    <div key={i.id} className="mission-item">
                      <h3>{macroNames[i.event]}</h3>
                      {i.delay ? (
                        <span>
                          <strong>Delay: </strong>
                          {i.delay}
                          ms
                        </span>
                      ) : (
                        ""
                      )}
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
      </Printable>
    </div>
  );
};

export default PrintMission;
