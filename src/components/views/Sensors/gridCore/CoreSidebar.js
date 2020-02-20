import React from "react";
import gql from "graphql-tag.macro";
import {Button, Input, ButtonGroup} from "helpers/reactstrap";
import {useMutation, useApolloClient} from "@apollo/client";
import ContactSelect from "./contactSelect";
import ExtraControls from "./extraControls";
import ContactsList from "./contactsList";
import MovementCore from "./movementCore";
import {speeds} from "./constants";

const CLEAR_CONTACTS = gql`
  mutation DeleteContact($id: ID!) {
    removeAllSensorContacts(
      id: $id
      type: ["contact", "planet", "border", "ping"]
    )
  }
`;
const STOP_CONTACTS = gql`
  mutation StopContacts($id: ID!) {
    stopAllSensorContacts(id: $id)
  }
`;

export const CoreSidebar = ({
  flightId,
  sensors,
  speed,
  setSpeed,
  askForSpeed,
  setAskForSpeed,
  selectedContacts,
  setSelectedContacts,
  dragStart,
  lite,
  showLabels,
  setShowLabels,
}) => {
  const [clearContacts] = useMutation(CLEAR_CONTACTS, {
    variables: {id: sensors.id},
  });
  const [stopContacts] = useMutation(STOP_CONTACTS, {
    variables: {id: sensors.id},
  });
  const [currentControl, setCurrentControl] = React.useState("contacts");
  const client = useApolloClient();
  return (
    <>
      <small>Speed</small>
      <Input
        type="select"
        name="select"
        onChange={e => setSpeed(e.target.value)}
        defaultValue={speed}
      >
        {speeds.map(s => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
        <option disabled>─────────</option>
        <option disabled>Timed</option>
      </Input>
      <Button size="sm" color="danger" block onClick={clearContacts}>
        Clear
      </Button>
      {!lite && (
        <Button size="sm" color="warning" block onClick={stopContacts}>
          Stop
        </Button>
      )}
      {selectedContacts.length > 0 ? (
        <ContactSelect
          id={sensors.id}
          clearSelection={() => setSelectedContacts([])}
          contacts={selectedContacts}
          client={client}
        />
      ) : (
        <>
          <ButtonGroup>
            <Button
              active={currentControl === "contacts"}
              size="sm"
              color="success"
              onClick={() => setCurrentControl("contacts")}
            >
              Icons
            </Button>
            <Button
              active={currentControl === "extras"}
              size="sm"
              color="info"
              onClick={() => setCurrentControl("extras")}
            >
              Extras
            </Button>
            {!lite && (
              <Button
                active={currentControl === "movement"}
                size="sm"
                color="primary"
                onClick={() => setCurrentControl("movement")}
              >
                Move
              </Button>
            )}
          </ButtonGroup>
          {currentControl === "extras" && (
            <ExtraControls
              flightId={flightId}
              sensors={sensors}
              askForSpeed={askForSpeed}
              updateAskForSpeed={e => setAskForSpeed(e)}
              client={client}
              speed={speed}
              dragStart={dragStart}
              showLabels={showLabels}
              setShowLabels={setShowLabels}
            />
          )}
          {currentControl === "contacts" && (
            <ContactsList sensors={sensors} dragStart={dragStart} lite={lite} />
          )}
          {currentControl === "movement" && (
            <MovementCore sensors={sensors} client={client} />
          )}
        </>
      )}
    </>
  );
};
