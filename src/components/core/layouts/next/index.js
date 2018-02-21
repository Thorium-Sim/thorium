import React, { Component } from "react";
import Dynamic from "../dynamic";
import { Cores } from "../../../views";
import CoreFeed from "../../../views/CoreFeed";

import "./next.css";

class Next extends Component {
  render() {
    const props = this.props;
    return (
      <div className="core core-next">
        <div className="next-sensors">
          <Cores.SensorsGridCore {...props} />
        </div>
        <div className="next-actions">
          <Cores.ActionsCore {...props} />
          <Cores.ExtrasCore {...props} />
          <Cores.AlertConditionCore {...props} />
        </div>
        <div className="next-coreFeed">
          <CoreFeed {...props} />
        </div>
        <div className="next-main">
          <Dynamic {...props} />
        </div>
        <div className="next-timeline">
          <Cores.TimelineCore {...props} />
        </div>
      </div>
    );
  }
}

export default Next;
