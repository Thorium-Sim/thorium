import React, { Fragment, Component } from "react";
import * as MacrosPrint from "../../macrosPrint";
import * as Macros from "../../macros";
import { Button, Input, Label } from "reactstrap";
import FontAwesome from "react-fontawesome";
import allowedMacros from "./allowedMacros";
import EventName from "../../../containers/FlightDirector/MissionConfig/EventName";

class ActionPreview extends Component {
  state = {};
  setArg = (key, value) => {
    const { values, updateValues } = this.props;
    updateValues({ ...values, [key]: value });
  };
  render() {
    const { edit } = this.state;
    let {
      event,
      args,
      simulatorId,
      values,
      delay,
      updateDelay,
      updateValues
    } = this.props;
    return (
      <div className="timeline-item">
        {edit ? (
          <Button
            size="sm"
            style={{ height: "16px", lineHeight: 1 }}
            color="warning"
            onClick={() => {
              const restore =
                typeof args === "string" ? JSON.parse(args) : args;
              updateValues(restore || {});
            }}
          >
            Restore Values
          </Button>
        ) : (
          <Button
            size="sm"
            style={{ height: "16px", lineHeight: 1 }}
            color="info"
            onClick={() => this.setState({ edit: true })}
          >
            Edit
          </Button>
        )}
        <div>
          <Label>
            Delay
            <Input
              bsSize="sm"
              defaultValue={delay}
              type="number"
              min="0"
              onChange={e => updateDelay(e.target.value)}
            />
          </Label>
        </div>
        {Macros[event] &&
          (() => {
            const MacroPreview = edit
              ? Macros[event]
              : MacrosPrint[event] || Macros[event];
            if (typeof args === "string") {
              args = JSON.parse(args);
            }
            return (
              <MacroPreview
                simulatorId={simulatorId}
                args={edit ? { ...args, ...values } : args}
                updateArgs={edit ? this.setArg : () => {}}
                lite
              />
            );
          })()}
      </div>
    );
  }
}
class TimelineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.showDescription
    };
  }
  state = {};
  render() {
    let {
      id,
      event,
      name,
      args,
      executedTimelineSteps,
      actions,
      checkAction,
      simulatorId,
      values,
      updateValues,
      delay,
      updateDelay
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
              <ActionPreview
                simulatorId={simulatorId}
                event={event}
                args={args}
                values={values}
                updateValues={updateValues}
                delay={delay}
                updateDelay={updateDelay}
              />
            )}
          </Fragment>
        )}
      </li>
    );
  }
}

export default TimelineItem;
