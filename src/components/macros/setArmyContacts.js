import React, { Component } from "react";
import { FormGroup, Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import ContactContextMenu from "../views/Sensors/gridCore/contactContextMenu";
import uuid from "uuid";
import { Asset } from "../../helpers/assets";

export default class SetArmyContacts extends Component {
  state = { removeContacts: false };
  selectContact = contact => {
    this.setState({ selectedContact: contact });
  };
  removeContact = contact => {
    this.props.updateArgs(
      "armyContacts",
      this.props.args.armyContacts.filter(c => c.id !== contact.id)
    );
  };
  addArmyContact = () => {
    const contact = {
      id: uuid.v4(),
      name: "Army Contact",
      icon: "/Sensor Contacts/Icons/Default",
      picture: "/Sensor Contacts/Pictures/Default",
      size: 1,
      color: "#0f0",
      infrared: false,
      cloaked: false,
      destroyed: false
    };
    this.props.updateArgs(
      "armyContacts",
      (this.props.args.armyContacts || []).concat(contact)
    );
  };
  updateArmyContact = (contact, name, value) => {
    this.props.updateArgs(
      "armyContacts",
      this.props.args.armyContacts.map(c => {
        if (c.id === contact.id) {
          return Object.assign({}, c, { [name]: value });
        }
        return c;
      })
    );
  };
  render() {
    const { args /*client*/ } = this.props;
    const { removeContacts, selectedContact } = this.state;
    const { armyContacts = [] } = args;
    return (
      <FormGroup className="macro-setArmyContacts">
        <p>Contacts:</p>
        <div className="contact-scroll">
          {armyContacts.map(contact => {
            return (
              <Col key={contact.id} className={"flex-container"}>
                <Asset asset={contact.icon}>
                  {({ src }) => (
                    <img
                      alt="armyContact"
                      onClick={() => this.selectContact(contact)}
                      draggable="false"
                      role="presentation"
                      style={{ width: "30px" }}
                      className="armyContact"
                      src={src}
                    />
                  )}
                </Asset>
                <Asset asset={contact.picture}>
                  {({ src }) => (
                    <img
                      alt="armyContactPicture"
                      onClick={() => this.selectContact(contact)}
                      draggable="false"
                      role="presentation"
                      style={{ width: "30px" }}
                      className="armyContact"
                      src={src}
                    />
                  )}
                </Asset>
                <label onClick={() => this.selectContact(contact)}>
                  {contact.name}
                </label>
                {removeContacts && (
                  <FontAwesome
                    name="ban"
                    className="text-danger pull-right clickable"
                    onClick={() => this.removeContact(contact)}
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
            onChange={e => {
              this.setState({ removeContacts: e.target.checked });
            }}
          />{" "}
          Remove
        </label>
        {selectedContact && (
          <div
            style={{
              position: "fixed",
              right: "40%",
              bottom: "10%",
              width: "25%",
              height: "50%",
              overflowY: "scroll"
            }}
          >
            <ContactContextMenu
              contact={selectedContact}
              closeMenu={() => this.setState({ selectedContact: null })}
              updateArmyContact={this.updateArmyContact}
            />
          </div>
        )}
      </FormGroup>
    );
  }
}
