import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { FormGroup, Col, Button } from "helpers/reactstrap";
import FontAwesome from "react-fontawesome";
import ContactContextMenu from "components/views/Sensors/gridCore/contactContextMenu";
import uuid from "uuid";

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
const SetArmyContacts = ({ args, updateArgs }) => {
  const [dims, ref] = useClientRect();
  const [selectedContact, setSelectedContact] = useState(null);
  const selectContact = contact => {
    setSelectedContact(contact);
  };
  const removeContact = contact => {
    updateArgs(
      "armyContacts",
      args.armyContacts.filter(c => c.id !== contact.id)
    );
  };
  const addArmyContact = () => {
    const contact = {
      id: uuid.v4(),
      name: "Army Contact",
      icon: "/Sensor Contacts/Icons/Default.svg",
      picture: "/Sensor Contacts/Pictures/N.svg",
      size: 1,
      color: "#0f0",
      infrared: false,
      cloaked: false,
      destroyed: false,
      hostile: false
    };
    updateArgs("armyContacts", (args.armyContacts || []).concat(contact));
  };
  const updateArmyContact = (contact, name, value) => {
    updateArgs(
      "armyContacts",
      args.armyContacts.map(c => {
        if (c.id === contact.id) {
          return Object.assign({}, c, { [name]: value });
        }
        return c;
      })
    );
  };
  const { armyContacts = [] } = args;
  const contactObj = armyContacts.find(c => c.id === selectedContact);
  return (
    <FormGroup className="macro-setArmyContacts">
      <p ref={ref}>Contacts:</p>
      <div className="contact-scroll">
        {armyContacts.map(contact => {
          return (
            <Col key={contact.id} className={"flex-container"}>
              <img
                alt="armyContact"
                onClick={() => selectContact(contact.id)}
                draggable="false"
                role="presentation"
                className="armyContact clickable"
                src={`/assets${contact.icon}`}
              />
              <img
                alt="armyContactPicture"
                onClick={() => selectContact(contact)}
                draggable="false"
                role="presentation"
                className="armyContact clickable"
                src={`/assets${contact.picture}`}
              />
              <label onClick={() => selectContact(contact)}>
                {contact.name}
              </label>
              <FontAwesome
                name="ban"
                className="text-danger pull-right clickable"
                onClick={() => removeContact(contact)}
              />
            </Col>
          );
        })}
      </div>
      <Button size="sm" color="success" onClick={addArmyContact}>
        Add Contact
      </Button>
      {dims &&
        contactObj &&
        ReactDOM.createPortal(
          <div
            style={{
              zIndex: 100,
              position: "fixed",
              left: `${dims.left}px`,
              top: `${dims.top}px`,
              maxWidth: "400px",
              height: "50%",
              border: "solid 1px rgba(255,255,255,0.5)",
              background: "black",
              color: "white",
              overflowY: "auto"
            }}
          >
            <ContactContextMenu
              contact={contactObj}
              closeMenu={() => setSelectedContact(null)}
              updateArmyContact={updateArmyContact}
            />
          </div>,
          document.body
        )}
    </FormGroup>
  );
};

export default SetArmyContacts;
