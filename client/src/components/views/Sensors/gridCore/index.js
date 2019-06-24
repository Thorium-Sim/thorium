import React from "react";
import gql from "graphql-tag.macro";
import { Row, Col, Container } from "helpers/reactstrap";
import { useMutation } from "@apollo/react-hooks";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import useMeasure from "helpers/hooks/useMeasure";
import Grid from "../GridDom";
import SpeedAsker from "./speedAsker";
import { useDragStart } from "./hooks/useDragStart";
import { useSensorsData } from "./hooks/useSensorData";
import { useTargeting } from "./hooks/useTargeting";
import { speeds, SENSORS_OFFSET } from "./constants";
import { CoreSidebar } from "./CoreSidebar";

import "./gridCore.scss";
import { useMouseDown } from "./hooks/useMouseDown";
import { checkContactPosition } from "./hooks/checkContactPosition";

const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!, $contact: SensorContactInput!) {
    removeSensorContact(id: $id, contact: $contact)
  }
`;
const MOVE_CONTACT = gql`
  mutation MoveSensorContact($id: ID!, $contacts: [SensorContactInput]!) {
    updateSensorContacts(id: $id, contacts: $contacts)
  }
`;

const GridCore = ({ simulator }) => {
  const sensors = useSensorsData(simulator.id) || {};
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [moveContact] = useMutation(MOVE_CONTACT);
  const [measureRef, dimensions, node] = useMeasure();
  const targetingRange = useTargeting();
  const [askForSpeedVal, setAskForSpeed] = useLocalStorage(
    "thorium-core-sensors-askforspeed",
    "no"
  );
  const askForSpeed = askForSpeedVal === "yes";
  const [speed, setSpeed] = useLocalStorage(
    "thorium-core-sensors-speed",
    "0.6"
  );
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [speedAsking, setSpeedAsking] = React.useState(false);
  const [draggingContacts, setDraggingContacts] = React.useState([]);

  const triggerUpdate = speed => {
    speed = Number(speed);
    // Delete any dragging contacts that are out of bounds
    const contacts = (draggingContacts || [])
      .map(c => checkContactPosition(c, node, dimensions))
      .filter(c => {
        if (c.delete) {
          deleteContact({
            variables: { id: sensors.id, contact: { id: c.id } }
          });
          return false;
        }
        return true;
      })
      // Now that the ones that need to be deleted are gone,
      // Update the rest
      .map(c => {
        const { x = 0, y = 0, z = 0 } = c.destination;
        return {
          id: c.id,
          speed,
          destination: { x, y, z }
        };
      });
    moveContact({
      variables: {
        id: sensors.id,
        contacts
      }
    }).then(() => {
      setDraggingContacts([]);
      setSpeedAsking(false);
    });
  };

  const [dragStart, addingContact] = useDragStart(sensors, dimensions);
  const [mouseDown] = useMouseDown({
    dimensions,
    selectedContacts,
    setSelectedContacts,
    draggingContacts,
    setDraggingContacts,
    triggerUpdate,
    askForSpeed,
    setSpeedAsking,
    speed
  });

  const extraContacts = []
    .concat(addingContact && addingContact.location ? addingContact : null)
    .concat(draggingContacts)
    .filter(Boolean);

  if (!sensors.id) return <p>No Sensor Grid</p>;
  return (
    <Container className="sensorGridCore" fluid style={{ height: "100%" }}>
      <Row style={{ height: "100%" }}>
        <Col
          sm={4}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column"
          }}
        >
          <CoreSidebar
            dragStart={dragStart}
            sensors={sensors}
            speed={speed}
            setSpeed={setSpeed}
            askForSpeed={askForSpeed}
            setAskForSpeed={setAskForSpeed}
            selectedContacts={selectedContacts}
            setSelectedContacts={setSelectedContacts}
          />
        </Col>
        <Col sm={8}>
          <div id="threeSensors" ref={measureRef} className="array">
            <Grid
              core
              dimensions={{
                width: dimensions.width - SENSORS_OFFSET,
                height: dimensions.height - SENSORS_OFFSET,
                left: dimensions.left + SENSORS_OFFSET,
                top: dimensions.top + SENSORS_OFFSET
              }}
              offset={SENSORS_OFFSET}
              sensor={sensors.id}
              includeTypes={[
                "contact",
                "planet",
                "border",
                "ping",
                "projectile"
              ]}
              movement={sensors.movement}
              speeds={speeds}
              askForSpeed={askForSpeed}
              extraContacts={extraContacts}
              segments={sensors.segments}
              selectedContacts={selectedContacts.map(c => c.id)}
              updateSelectedContacts={contacts => setSelectedContacts(contacts)}
              range={
                targetingRange
                  ? {
                      size: targetingRange,
                      color: "rgba(255,0,0,0.5)"
                    }
                  : null
              }
              mouseDown={mouseDown}
            />
            {speedAsking && (
              <SpeedAsker
                sensorsId={sensors.id}
                speeds={speeds}
                draggingContacts={draggingContacts}
                triggerUpdate={triggerUpdate}
                speedAsking={speedAsking}
                cancelMove={() => {
                  setDraggingContacts([]);
                  setSelectedContacts([]);
                  setSpeedAsking(false);
                }}
              />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GridCore;
