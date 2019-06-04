import React from "react";
import { FormGroup, Input } from "reactstrap";
import LayoutList from "../layouts/list";

export default ({ updateArgs, args, client }) => {
  return (
    <FormGroup className="macro-template">
      <p>Layout: </p>
      <Input
        bsSize="sm"
        type="select"
        value={args.layout}
        onChange={evt => updateArgs("layout", evt.target.value)}
      >
        {LayoutList.map(l => (
          <option key={`layout-${l}`} value={l}>
            {l}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};
