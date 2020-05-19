import React from "react";
import {Col, Row} from "helpers/reactstrap";
import tinycolor from "tinycolor2";
import gql from "graphql-tag.macro";
import {TypingField} from "../../../generic/core";
import Nudge from "./nudge";
import useFlightLocalStorage from "helpers/hooks/useFlightLocalStorage";
import {useSensorsSetPingsMutation} from "generated/graphql";
import ColorPicker from "helpers/colorPicker";

const ExtraControls = ({
  flightId,
  sensors,
  askForSpeed,
  updateAskForSpeed,
  client,
  speed,
  dragStart,
  showLabels,
  setShowLabels,
}) => {
  const [planetSize, setPlanetSize] = useFlightLocalStorage(
    flightId,
    "core_sensors_planetSize",
    1,
  );
  const [planetColor, setPlanetColor] = useFlightLocalStorage(
    flightId,
    "core_sensors_planetColor",
    "#663399",
  );
  const [planetLabel, setPlanetLabel] = useFlightLocalStorage(
    flightId,
    "core_sensors_planetLabel",
    "",
  );
  const [borderColor, setBorderColor] = useFlightLocalStorage(
    flightId,
    "core_sensors_borderColor",
    "#663399",
  );
  const [borderSize, setBorderSize] = useFlightLocalStorage(
    flightId,
    "core_sensors_borderSize",
    3,
  );
  const [borderLabel, setBorderLabel] = useFlightLocalStorage(
    flightId,
    "core_sensors_borderLabel",
    "",
  );
  const [pingColor, setPingColor] = useFlightLocalStorage(
    flightId,
    "core_sensors_pingColor",
    "#663399",
  );
  const [pingSize, setPingSize] = useFlightLocalStorage(
    flightId,
    "core_sensors_pingSize",
    1,
  );
  const [setPing] = useSensorsSetPingsMutation();

  const autoTarget = e => {
    const mutation = gql`
      mutation SensorsAutoTarget($id: ID!, $target: Boolean!) {
        toggleSensorsAutoTarget(id: $id, target: $target)
      }
    `;
    const variables = {
      id: sensors.id,
      target: e.target.checked,
    };
    client.mutate({
      mutation,
      variables,
    });
  };
  const autoThrusters = e => {
    const mutation = gql`
      mutation SensorsAutoThrusters($id: ID!, $thrusters: Boolean!) {
        toggleSensorsAutoThrusters(id: $id, thrusters: $thrusters)
      }
    `;
    const variables = {
      id: sensors.id,
      thrusters: e.target.checked,
    };
    client.mutate({
      mutation,
      variables,
    });
  };
  const updateInterference = e => {
    const mutation = gql`
      mutation SensorsInterference($id: ID!, $interference: Float!) {
        setSensorsInterference(id: $id, interference: $interference)
      }
    `;
    const variables = {
      id: sensors.id,
      interference: parseFloat(e.target.value),
    };
    client.mutate({
      mutation,
      variables,
    });
  };

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
            }}
          />
        </label>
      </div>
      <label>
        Add to targeting{" "}
        <input
          type="checkbox"
          checked={sensors.autoTarget}
          onChange={autoTarget}
        />
      </label>
      <label>
        Use Sonar Ping{" "}
        <input
          type="checkbox"
          checked={sensors.pings}
          onClick={e => {
            setPing({
              variables: {id: sensors.id, ping: e.target.checked},
            });
          }}
        />
      </label>
      <label>
        Show contact labels{" "}
        <input
          type="checkbox"
          checked={showLabels}
          onChange={e => setShowLabels(e.target.checked)}
        />
      </label>
      <label>
        Auto Thrusters{" "}
        <input
          type="checkbox"
          checked={sensors.autoThrusters}
          onChange={autoThrusters}
        />
      </label>
      <small>Option-click grid segments to black out</small>
      <Row>
        <Col sm={10}>
          <label>Planet</label>
          <TypingField
            input
            controlled
            value={planetLabel}
            onChange={e => setPlanetLabel(e.target.value)}
          />
          <input
            type="range"
            min={0.01}
            max={2}
            step={0.01}
            value={planetSize}
            onChange={e => setPlanetSize(e.target.value)}
          />

          <ColorPicker
            color={planetColor}
            onChangeComplete={color =>
              setPlanetColor(tinycolor(color).toString())
            }
          />
        </Col>
        <Col sm={2}>
          <div
            className="planet-dragger"
            onMouseDown={() =>
              dragStart({
                color: planetColor,
                type: "planet",
                size: planetSize,
                name: planetLabel,
              })
            }
            style={{
              borderColor: tinycolor(planetColor).darken(10).toString(),
              backgroundColor: tinycolor(planetColor).toString(),
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
            value={borderLabel}
            onChange={e => setBorderLabel(e.target.value)}
          />
          <input
            type="range"
            min={0.01}
            max={15}
            step={0.01}
            value={borderSize}
            onChange={e => setBorderSize(e.target.value)}
          />
          <ColorPicker
            color={borderColor}
            onChangeComplete={color =>
              setBorderColor(tinycolor(color).toString())
            }
          />
        </Col>
        <Col sm={2}>
          <div
            className="border-dragger"
            onMouseDown={() =>
              dragStart({
                color: borderColor,
                type: "border",
                size: borderSize,
                name: borderLabel,
              })
            }
            style={{
              borderColor: tinycolor(borderColor).darken(10).toString(),
              backgroundColor: tinycolor(borderColor).toString(),
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
            value={pingSize}
            onChange={e => setPingSize(e.target.value)}
          />
          <ColorPicker
            color={pingColor}
            onChangeComplete={color =>
              setPingColor(tinycolor(color).toString())
            }
          />
        </Col>
        <Col sm={2}>
          <div
            className="pings-dragger"
            onMouseDown={() =>
              dragStart({
                color: pingColor,
                type: "ping",
                size: pingSize,
              })
            }
            style={{
              borderColor: tinycolor(pingColor).toString(),
              boxShadow: `inset 0px 0px 10px ${tinycolor(
                pingColor,
              ).toString()}`,
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
            onMouseUp={updateInterference}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ExtraControls;
