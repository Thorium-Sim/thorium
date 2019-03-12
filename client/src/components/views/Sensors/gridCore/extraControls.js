import React, { Component, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "reactstrap";
import { ChromePicker } from "react-color";
import tinycolor from "tinycolor2";
import gql from "graphql-tag.macro";
import { TypingField } from "../../../generic/core";
import Nudge from "./nudge";

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}

const ColorPicker = ({ color, onChangeComplete }) => {
  const ref = useRef();

  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));
  return (
    <>
      <div
        style={{
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer"
        }}
        onClick={e => setIsOpen({ x: e.clientX, y: e.clientY })}
      >
        <div
          style={{
            width: "36px",
            height: "14px",
            borderRadius: "2px",
            background: color.a
              ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
              : color
          }}
        />
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={ref}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${isOpen.x}px, ${isOpen.y}px)`,
              zIndex: 1
            }}
          >
            <ChromePicker color={color} onChangeComplete={onChangeComplete} />
          </div>,
          document.body
        )}
    </>
  );
};

class ExtraControls extends Component {
  state = {
    planetSize: 1,
    planetColor: "#663399",
    planetLabel: "",
    borderColor: "#663399",
    borderSize: 3,
    borderLabel: "",
    pingColor: "#663399",
    pingSize: 1
  };
  autoTarget = e => {
    const mutation = gql`
      mutation SensorsAutoTarget($id: ID!, $target: Boolean!) {
        toggleSensorsAutoTarget(id: $id, target: $target)
      }
    `;
    const sensors = this.props.sensors;
    const variables = {
      id: sensors.id,
      target: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  autoThrusters = e => {
    const mutation = gql`
      mutation SensorsAutoThrusters($id: ID!, $thrusters: Boolean!) {
        toggleSensorsAutoThrusters(id: $id, thrusters: $thrusters)
      }
    `;
    const sensors = this.props.sensors;
    const variables = {
      id: sensors.id,
      thrusters: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateInterference = e => {
    const mutation = gql`
      mutation SensorsInterference($id: ID!, $interference: Float!) {
        setSensorsInterference(id: $id, interference: $interference)
      }
    `;
    const sensors = this.props.sensors;
    const variables = {
      id: sensors.id,
      interference: e.target.value
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      sensors,
      askForSpeed,
      updateAskForSpeed,
      client,
      speed,
      dragStart
    } = this.props;

    return (
      <div className="sensors-extras">
        <Nudge sensor={sensors.id} client={client} speed={speed} />
        <div>
          <label>
            Ask for speed{" "}
            <input
              type="checkbox"
              checked={askForSpeed}
              onChange={evt => {
                updateAskForSpeed(evt.target.checked);
                localStorage.setItem(
                  "thorium-core-sensors-askforspeed",
                  evt.target.checked ? "yes" : "no"
                );
              }}
            />
          </label>
        </div>
        <label>
          Add to targeting{" "}
          <input
            type="checkbox"
            checked={sensors.autoTarget}
            onChange={this.autoTarget}
          />
        </label>
        <label>
          Auto Thrusters{" "}
          <input
            type="checkbox"
            checked={sensors.autoThrusters}
            onChange={this.autoThrusters}
          />
        </label>
        <small>Option-click grid segments to black out</small>
        <Row>
          <Col sm={10}>
            <label>Planet</label>
            <TypingField
              input
              controlled
              value={this.state.planetLabel}
              onChange={e => this.setState({ planetLabel: e.target.value })}
            />
            <input
              type="range"
              min={0.01}
              max={2}
              step={0.01}
              value={this.state.planetSize}
              onChange={e => this.setState({ planetSize: e.target.value })}
            />

            <ColorPicker
              color={this.state.planetColor}
              onChangeComplete={color =>
                this.setState({ planetColor: color.hex })
              }
            />
          </Col>
          <Col sm={2}>
            <div
              className="planet-dragger"
              onMouseDown={() =>
                dragStart({
                  color: this.state.planetColor,
                  type: "planet",
                  size: this.state.planetSize,
                  name: this.state.planetLabel
                })
              }
              style={{
                borderColor: tinycolor(this.state.planetColor)
                  .darken(10)
                  .toString(),
                backgroundColor: tinycolor(this.state.planetColor).toString()
              }}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={10}>
            <label>Border</label>
            <TypingField
              input
              controlled
              value={this.state.borderLabel}
              onChange={e => this.setState({ borderLabel: e.target.value })}
            />
            <input
              type="range"
              min={0.01}
              max={15}
              step={0.01}
              value={this.state.borderSize}
              onChange={e => this.setState({ borderSize: e.target.value })}
            />
            <ColorPicker
              color={this.state.borderColor}
              onChangeComplete={color =>
                this.setState({ borderColor: color.hex })
              }
            />
          </Col>
          <Col sm={2}>
            <div
              className="border-dragger"
              onMouseDown={() =>
                dragStart({
                  color: this.state.borderColor,
                  type: "border",
                  size: this.state.borderSize,
                  name: this.state.borderLabel
                })
              }
              style={{
                borderColor: tinycolor(this.state.borderColor)
                  .darken(10)
                  .toString(),
                backgroundColor: tinycolor(this.state.borderColor).toString()
              }}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={10}>
            <label>Pings</label>
            <input
              type="range"
              min={0.01}
              max={2}
              step={0.01}
              value={this.state.pingSize}
              onChange={e => this.setState({ pingSize: e.target.value })}
            />
            <ColorPicker
              color={this.state.pingColor}
              onChangeComplete={color =>
                this.setState({ pingColor: color.hex })
              }
            />
          </Col>
          <Col sm={2}>
            <div
              className="pings-dragger"
              onMouseDown={() =>
                dragStart({
                  color: this.state.pingColor,
                  type: "ping",
                  size: this.state.pingSize
                })
              }
              style={{
                borderColor: tinycolor(this.state.pingColor).toString(),
                boxShadow: `inset 0px 0px 10px ${tinycolor(
                  this.state.pingColor
                ).toString()}`
              }}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={12}>
            <label>Interference</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              defaultValue={sensors.interference}
              onMouseUp={this.updateInterference}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default ExtraControls;
