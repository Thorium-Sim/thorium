import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-setPresetAnswer">
      <div>
        <strong>Data </strong>
        <pre>{args && args.data}</pre>
      </div>
    </FormGroup>
  );
};
