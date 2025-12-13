import React, {Component} from "react";
import Dynamic from "../dynamic";
import {Cores} from "components/views";
import Lighting from "components/views/Lighting";
import CoreError from "../coreError";
import "./next.scss";
import {Flash} from "components/generic/useFlash";
import Timer from "components/views/CoreExtras/timer";
import Dice from "components/views/CoreExtras/dice";

class Next extends Component {
  render() {
    const props = this.props;
    return (
      <div className="core core-next">
        <div className="next-sensors">
          <CoreError>
            <Cores.SensorsGridCore {...props} />
          </CoreError>
        </div>
        <div className="next-actions">
          <CoreError>
            <Cores.ActionsCore {...props} />
          </CoreError>
          <Flash>
            {({flash, doFlash}) => (
              <div className={`core-extra-grid ${flash ? "flash" : ""}`}>
                <CoreError>
                  <Timer {...props} doFlash={doFlash} />
                  <Dice />
                </CoreError>
                <CoreError>
                  <Cores.AlertConditionCore {...props} />
                </CoreError>
              </div>
            )}
          </Flash>
        </div>
        <CoreError>
          <div className="lighting-container">
            <Lighting {...props} />
          </div>
        </CoreError>
        <div className="next-coreFeed">
          <CoreError>
            <Cores.CoreFeed {...props} />
          </CoreError>
        </div>
        <div className="next-main">
          <Dynamic {...props} />
        </div>
        <div className="next-timeline">
          <CoreError>
            <Cores.TimelineCore {...props} />
          </CoreError>
        </div>
      </div>
    );
  }
}

export default Next;
