import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { SliderPicker } from "react-color";
import tinycolor from "tinycolor2";
import gql from "graphql-tag";
import { TypingField } from "../../../generic/core";
import Nudge from "./nudge";

class ExtraControls extends Component {
  state = {
    planetSize: 1,
    planetColor: "#663399",
    planetLabel: "",
    borderColor: "#663399",
    borderSize: 3,
    borderLabel: ""
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
              onClick={evt => {
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
            onClick={this.autoTarget}
          />
        </label>
        <label>
          Auto Thrusters{" "}
          <input
            type="checkbox"
            checked={sensors.autoThrusters}
            onClick={this.autoThrusters}
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

            <label>Color</label>
            <SliderPicker
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
            <SliderPicker
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
