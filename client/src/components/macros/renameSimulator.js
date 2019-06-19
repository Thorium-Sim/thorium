import React from "react";
import { FormGroup, Input } from "helpers/reactstrap";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-template">
      <p>Name</p>
      <Input
        value={args.name}
        onChange={e => updateArgs("name", e.target.value)}
      />
    </FormGroup>
  );
};
