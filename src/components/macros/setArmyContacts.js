import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import ContactContextMenu from "../views/Sensors/contactContextMenu";
export default class SetArmyContacts extends Component {
  render() {
    const { updateArgs, args, client } = this.props;
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
        <ContactContextMenu contact={{}} />
      </FormGroup>
    );
  }
}
