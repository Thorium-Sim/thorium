import React, { Fragment, Component } from "react";
import * as Macros from "../../macrosPrint";
import FontAwesome from "react-fontawesome";
import allowedMacros from "./allowedMacros";
import EventName from "../../../containers/FlightDirector/MissionConfig/EventName";

class TimelineItem extends Component {
  state = {};
  render() {
    let {
      id,
      event,
      name,
      args,
      executedTimelineSteps,
      actions,
      checkAction
    } = this.props;
    const { expanded } = this.state;

    return (
      <li>
        <input
          type="checkbox"
          checked={actions[id]}
          onChange={() => checkAction(id)}
        />
        <span
          className={
            executedTimelineSteps.indexOf(id) > -1 &&
            allowedMacros.indexOf(event) === -1
              ? "text-success"
              : ""
          }
        >
          <EventName id={event} label={name} />
        </span>

        {args && (
          <Fragment>
            <p onClick={() => this.setState({ expanded: !expanded })}>
              <FontAwesome name={expanded ? "arrow-down" : "arrow-right"} />{" "}
              Details
            </p>
            {expanded && (
              <div className="timeline-item">
                {Macros[event] &&
                  (() => {
                    const MacroPreview = Macros[event];
                    if (typeof args === "string") {
                      args = JSON.parse(args);
                    }
                    return <MacroPreview args={args} updateArgs={() => {}} />;
                  })()}
              </div>
            )}
          </Fragment>
        )}
      </li>
    );
  }
}

export default TimelineItem;
