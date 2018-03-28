import React, { Component } from "react";
import { FormGroup, Col } from "reactstrap";
import { Asset } from "../../helpers/assets";

export default class SetArmyContacts extends Component {
  render() {
    const { args /*client*/ } = this.props;
    const { armyContacts = [] } = args;
    return (
      <FormGroup className="macro-setArmyContacts">
        <div>
          <strong>Domain</strong>
          <div>{args.domain}</div>
        </div>
        <p>Contacts:</p>
        <div className="contact-scroll">
          {armyContacts.map(contact => {
            return (
              <Col key={contact.id} className={"flex-container"}>
                <Asset asset={contact.icon}>
                  {({ src }) => (
                    <img
                      alt="armyContact"
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
                      draggable="false"
                      role="presentation"
                      style={{ width: "30px" }}
                      className="armyContact"
                      src={src}
                    />
                  )}
                </Asset>
                <label>{contact.name}</label>
              </Col>
            );
          })}
        </div>
      </FormGroup>
    );
  }
}
