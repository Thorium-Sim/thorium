import React from "react";
import { FormGroup } from "helpers/reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-setPresetAnswer">
      <div>
        <strong>Data </strong>
        <pre>{args.data}</pre>
      </div>
    </FormGroup>
  );
};
