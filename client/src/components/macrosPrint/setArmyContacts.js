import React, { Component } from "react";
import { FormGroup, Col } from "reactstrap";

export default class SetArmyContacts extends Component {
  render() {
    const { args /*client*/ } = this.props;
    const { armyContacts = [] } = args;
    return (
      <FormGroup className="macro-setArmyContacts">
        <p>Contacts:</p>
        <div className="contact-scroll">
          {armyContacts.map(contact => {
            return (
              <Col key={contact.id} className={"flex-container"}>
                <img
                  alt="armyContact"
                  draggable="false"
                  role="presentation"
                  style={{ width: "30px" }}
                  className="armyContact"
                  src={`/assets${contact.icon}`}
                />

                <img
                  alt="armyContactPicture"
                  draggable="false"
                  role="presentation"
                  style={{ width: "30px" }}
                  className="armyContact"
                  src={`/assets${contact.picture}`}
                />
                <label>{contact.name}</label>
              </Col>
            );
          })}
        </div>
      </FormGroup>
    );
  }
}
