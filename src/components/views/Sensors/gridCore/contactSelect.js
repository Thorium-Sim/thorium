import React from "react";
import ContactContextMenu from "./contactContextMenu";
import gql from "graphql-tag";
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
  return (
    <div>
      <div style={{ position: "relative" }}>
        <ContactContextMenu
          closeMenu={clearSelection}
          updateArmyContact={updateContact}
          contact={mainContact}
          x={0}
          y={0}
        />
      </div>
    </div>
  );
};

export default ContactSelect;
