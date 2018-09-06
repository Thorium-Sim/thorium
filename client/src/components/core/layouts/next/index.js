import React, { Component } from "react";
import Dynamic from "../dynamic";
import { Cores } from "components/views";
import CoreFeed from "components/views/CoreFeed";
import Lighting from "components/views/Lighting";
import CoreError from "../coreError";
import "./next.scss";

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
          <CoreError>
            <Cores.ExtrasCore {...props} />
          </CoreError>
          <CoreError>
            <Cores.AlertConditionCore {...props} />
          </CoreError>
        </div>
        <CoreError>
          <Lighting {...props} />
        </CoreError>
        <div className="next-coreFeed">
          <CoreError>
            <CoreFeed {...props} />
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
