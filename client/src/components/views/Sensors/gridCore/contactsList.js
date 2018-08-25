import React, { Component } from "react";
import { Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import ContactContextMenu from "./contactContextMenu";

const ADD_ARMY_CONTACT = gql`
  mutation(
    $id: ID!
    $name: String
    $size: Float
    $icon: String
    $picture: String
    $infrared: Boolean
    $cloaked: Boolean
  ) {
    createSensorArmyContact(
      id: $id
      contact: {
        name: $name
        size: $size
        icon: $icon
        picture: $picture
        infrared: $infrared
        cloaked: $cloaked
      }
    )
  }
`;

const REMOVE_ARMY_CONTACT = gql`
  mutation($id: ID!, $contact: ID!) {
    removeSensorArmyContact(id: $id, contact: $contact)
  }
`;

class ContactsList extends Component {
  state = {
    contextContact: null,
    selectedContact: null
  };
  addArmyContact = () => {
    const { armyContacts, id } = this.props.sensors || {
      armyContacts: []
    };
    const templateContact = armyContacts[armyContacts.length - 1] || {
      name: "Contact",
      size: 1,
      icon: "/Sensor Contacts/Icons/N.svg",
      picture: "/Sensor Contacts/Pictures/N.svg",
      infrared: false,
      cloaked: false
    };
    const defaultContact = {
      name: templateContact.name,
      size: templateContact.size,
      icon: templateContact.icon,
      picture: templateContact.picture,
      infrared: templateContact.infrared,
      cloaked: templateContact.cloaked
    };
    //Run the mutation to create the army contact
    this.props.client.mutate({
      mutation: ADD_ARMY_CONTACT,
      variables: Object.assign(
        {
          id: id
        },
        defaultContact
      )
    });
  };
  updateArmyContact = (contact, key, value) => {
    const { id } = this.props.sensors;
    const newContact = {
      id: contact.id,
      name: contact.name,
      size: contact.size,
      icon: contact.icon,
      picture: contact.picture,
      speed: contact.speed,
      infrared: contact.infrared,
      cloaked: contact.cloaked
    };
    newContact[key] = value;
    this.props.client.mutate({
      mutation: gql`
        mutation($id: ID!, $contact: SensorContactInput!) {
          updateSensorArmyContact(id: $id, contact: $contact)
        }
      `,
      variables: {
        id,
        contact: newContact
      }
    });
  };
  contextMenu = (contact, e) => {
    e.preventDefault();
    const { top: outerTop, left: outerLeft } = document
      .getElementsByClassName("sensorGridCore")[0]
      .getBoundingClientRect();
    const { top, left } = e.target.getBoundingClientRect();
    const obj = {
      left: left - outerLeft + 20,
      top: top - outerTop,
      contact: contact.id
    };
    this.setState({
      contextContact: obj
    });
  };
  removeArmyContact = contact => {
    const { id } = this.props.sensors || { armyContacts: [] };
    this.props.client.mutate({
      mutation: REMOVE_ARMY_CONTACT,
      variables: Object.assign({
        id: id,
        contact: contact.id
      })
    });
  };
  closeContext = () => {
    this.setState({
      contextContact: null,
      selectedContact: null
    });
  };
  render() {
    const { sensors, dragStart } = this.props;
    const { contextContact, removeContacts } = this.state;
    return (
      <div className="sensors-contact-list">
        <p>Contacts:</p>
        <div className="contact-scroll">
          {sensors.armyContacts.map(contact => {
            return (
              <Col key={contact.id} className={"flex-container"} sm={12}>
                <img
                  alt="contact"
                  onMouseDown={() => dragStart(contact)}
                  onContextMenu={e => this.contextMenu(contact, e)}
                  draggable="false"
                  role="presentation"
                  className="armyContact"
                  src={`/assets${contact.icon}`}
                />
                <label onContextMenu={e => this.contextMenu(contact, e)}>
                  {contact.name}
                </label>
                {removeContacts && (
                  <FontAwesome
                    name="ban"
                    className="text-danger pull-right clickable"
                    onClick={() => this.removeArmyContact(contact)}
                  />
                )}
              </Col>
            );
          })}
        </div>
        <Button size="sm" color="success" onClick={this.addArmyContact}>
          Add Contact
        </Button>
        <label>
          <input
            type="checkbox"
            checked={removeContacts}
            onChange={e => {
              this.setState({ removeContacts: e.target.checked });
            }}
          />{" "}
          Remove
        </label>
        {contextContact && (
          <ContactContextMenu
            closeMenu={this.closeContext}
            updateArmyContact={this.updateArmyContact}
            contact={sensors.armyContacts.find(
              c => c.id === contextContact.contact
            )}
            x={contextContact.left}
            y={0}
          />
        )}
      </div>
    );
  }
}

export default ContactsList;
