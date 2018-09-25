import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SpeedAsker = ({
  speedAsking,
  speeds,
  cancelMove,
  sensorsId,
  draggingContacts,
  remove,
  destroy,
  triggerUpdate
}) => {
  const contacts = draggingContacts
    .map(c => c.id)
    .filter((a, i, arr) => arr.indexOf(a) === i);
  return (
    <div
      className="speed-container"
      style={{
        transform: `translate(${speedAsking.x}px, ${speedAsking.y}px)`
      }}
    >
      {speeds.map(s => (
        <p key={s.value} onClick={() => triggerUpdate(s.value)}>
          {s.label}
        </p>
      ))}
      <p onClick={cancelMove}>Cancel</p>
      <Mutation
        mutation={gql`
          mutation DeleteContact($id: ID!, $contact: SensorContactInput!) {
            removeSensorContact(id: $id, contact: $contact)
          }
        `}
      >
        {action => (
          <p
            onClick={() => {
              contacts.forEach(c =>
                action({ variables: { id: sensorsId, contact: { id: c } } })
              );
              cancelMove();
            }}
          >
            Remove
          </p>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation DestroySensorContact($id: ID!, $contacts: [ID]) {
            destroySensorContact(id: $id, contacts: $contacts)
          }
        `}
        variables={{ id: sensorsId, contacts }}
      >
        {action => (
          <p
            onClick={() => {
              action();
              cancelMove();
            }}
          >
            Destroy
          </p>
        )}
      </Mutation>
    </div>
  );
};
export default SpeedAsker;
