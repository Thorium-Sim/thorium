import React from "react";
import ContactContextMenu from "./contactContextMenu";
import gql from "graphql-tag.macro";
const ContactSelect = ({ id, clearSelection, contacts, client }) => {
  const mainContact = contacts[0];
  const updateContact = (contact, key, value) => {
    const variables = {
      id,
      contacts: contacts.map(c => ({ id: c.id, [key]: value }))
    };
    const mutation = gql`
      mutation MoveSensorContact($id: ID!, $contacts: [SensorContactInput]!) {
        updateSensorContacts(id: $id, contacts: $contacts)
      }
    `;
    client.mutate({
      mutation,
      variables
    });
  };
  const destroy = () => {
    const mutation = gql`
      mutation DestroySensorContact($id: ID!, $contacts: [ID]) {
        destroySensorContact(id: $id, contacts: $contacts)
      }
    `;
    const variables = {
      id,
      contacts: contacts.map(c => c.id)
    };
    client.mutate({
      mutation,
      variables
    });
    clearSelection();
  };
  return (
    <div style={{ height: "calc(100% - 84px)" }}>
      <div style={{ position: "relative", height: "100%" }}>
        <ContactContextMenu
          closeMenu={clearSelection}
          updateArmyContact={updateContact}
          contact={mainContact}
          destroy={destroy}
          x={0}
          y={0}
        />
      </div>
    </div>
  );
};

export default ContactSelect;
