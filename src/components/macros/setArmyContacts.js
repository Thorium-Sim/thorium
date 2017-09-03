import React, { Component } from "react";
import { FormGroup, Label, Input, Col, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import ContactContextMenu from "../views/Sensors/contactContextMenu";

export default class SetArmyContacts extends Component {
  state = { removeContacts: false };
  selectContact = contact => {};
  removeContact = contact => {};
  addArmyContact = () => {};
  render() {
    const { updateArgs, args /*client*/ } = this.props;
    const { removeContacts } = this.state;
    const armyContacts = [];
    return (
      <FormGroup className="macro-setArmyContacts">
        <Label>Domain</Label>
        <Input
          type="select"
          value={args.domain}
          onChange={evt => updateArgs("domain", evt.target.value)}
        >
          <option value={null}>Pick a Domain</option>
          <option value="external">External</option>
          <option value="internal">Internal</option>
        </Input>
        <p>Contacts:</p>
        <div className="contact-scroll">
          {armyContacts.map(contact => {
            return (
              <Col key={contact.id} className={"flex-container"}>
                <img
                  OnClick={() => this.selectContact(contact)}
                  draggable="false"
                  role="presentation"
                  className="armyContact"
                  src={contact.iconUrl}
                />
                <label onClick={() => this.selectContact(contact)}>
                  {contact.name}
                </label>
                {removeContacts &&
                  <FontAwesome
                    name="ban"
                    className="text-danger pull-right clickable"
                    onClick={() => this.removeContact(contact)}
                  />}
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
        <ContactContextMenu contact={{}} />
      </FormGroup>
    );
  }
}
