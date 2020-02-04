import React from "react";
import gql from "graphql-tag.macro";
import {Row, Col, Container} from "helpers/reactstrap";
import {useMutation} from "@apollo/client";
import useLocalStorage from "helpers/hooks/useLocalStorage";
import useMeasure from "helpers/hooks/useMeasure";
import Grid from "../GridDom";
import SpeedAsker from "./speedAsker";
import {useDragStart} from "./hooks/useDragStart";
import {useSensorsData} from "./hooks/useSensorData";
import {useTargeting} from "./hooks/useTargeting";
import {speeds, SENSORS_OFFSET} from "./constants";
import {CoreSidebar} from "./CoreSidebar";

import "./gridCore.scss";
import {useMouseDown} from "./hooks/useMouseDown";
import {checkContactPosition} from "./hooks/checkContactPosition";
import uuid from "uuid";
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
const noOp = () => {};
const noOpArray = [];
const GridCore = ({
  simulator,
  lite = false,
  defaultSensors = {},
  updateContacts = noOp,
  contacts = noOpArray,
  ultraLite,
  flightId,
}) => {
  const sensors = useSensorsData(simulator.id) || defaultSensors;
  const [deleteContact] = useMutation(DELETE_CONTACT);
  const [moveContact] = useMutation(MOVE_CONTACT);
  const [measureRef, dimensions, node] = useMeasure();
  const targetingRange = useTargeting();
  const [askForSpeed, setAskForSpeed] = useLocalStorage(
    "thorium-core-sensors-askforspeed",
    false,
  );
  const [showLabels, setShowLabels] = useLocalStorage(
    "core_sensors_showLabels",
    false,
  );
  const [speed, setSpeed] = useLocalStorage(
    "thorium-core-sensors-speed",
    "0.6",
  );
  const [selectedContacts, setSelectedContacts] = React.useState([]);
  const [speedAsking, setSpeedAsking] = React.useState(false);
  const [draggingContacts, setDraggingContacts] = React.useState([]);

  const triggerUpdate = speed => {
    speed = Number(speed);
    // Delete any dragging contacts that are out of bounds
    const newContacts = draggingContacts
      .map(c => checkContactPosition(c, node, dimensions))
      .filter(c => {
        if (c.delete) {
          deleteContact({
            variables: {id: sensors.id, contact: {id: c.id}},
          });
          return false;
        }
        return true;
      });
    const updatedContacts = contacts
      .map(c => checkContactPosition(c, node, dimensions))
      .filter(c => !c.delete)
      .map(c => {
        return {...c, ...draggingContacts.find(d => d.id === c.id), speed};
      });
    // Now that the ones that need to be deleted are gone,
    // Update the rest
    updateContacts(updatedContacts);
    const moveContacts = newContacts
      .map(c => {
        const {x = 0, y = 0, z = 0} = c.destination;
        return {
          id: c.id,
          speed,
          destination: {x, y, z},
        };
      })
      .filter((c, i, arr) => arr.findIndex(cc => cc.id === c.id) === i);
    moveContact({
      variables: {
        id: sensors.id,
        contacts: moveContacts,
      },
    }).then(() => {
      setDraggingContacts([]);
      setSpeedAsking(false);
    });
  };

  const addContact = React.useCallback(
    function(c) {
      return updateContacts(contacts.concat({...c, id: uuid.v4()}));
    },
    [contacts, updateContacts],
  );

  const [dragStart, addingContact] = useDragStart(
    sensors,
    dimensions,
    addContact,
  );

  const [mouseDown] = useMouseDown({
    dimensions,
    selectedContacts,
    setSelectedContacts,
    draggingContacts,
    setDraggingContacts,
    triggerUpdate,
    askForSpeed,
    speedAsking,
    setSpeedAsking,
    speed,
  });

  const extraContacts = []
    .concat(addingContact && addingContact.location ? addingContact : null)
    .concat(draggingContacts)
    .concat(contacts)
    .filter(Boolean);

  if (!sensors.id) return <p>No Sensor Grid</p>;
  return (
    <Container className="sensorGridCore" fluid style={{height: "100%"}}>
      <Row style={{height: "100%"}}>
        {!ultraLite && (
          <Col
            sm={4}
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <CoreSidebar
              flightId={flightId}
              dragStart={dragStart}
              sensors={sensors}
              speed={speed}
              setSpeed={setSpeed}
              askForSpeed={askForSpeed}
              setAskForSpeed={setAskForSpeed}
              selectedContacts={selectedContacts}
              setSelectedContacts={setSelectedContacts}
              lite={lite}
              showLabels={showLabels}
              setShowLabels={setShowLabels}
            />
          </Col>
        )}
        <Col sm={ultraLite ? 12 : 8}>
          <div id="threeSensors" ref={measureRef} className="array">
            <Grid
              core
              dimensions={{
                width: dimensions.width - SENSORS_OFFSET,
                height: dimensions.height - SENSORS_OFFSET,
                left: dimensions.left + SENSORS_OFFSET,
                top: dimensions.top + SENSORS_OFFSET,
              }}
              offset={SENSORS_OFFSET}
              sensor={sensors.id}
              includeTypes={[
                "contact",
                "planet",
                "border",
                "ping",
                "projectile",
              ]}
              showLabels={showLabels}
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
                      color: "rgba(255,0,0,0.5)",
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
