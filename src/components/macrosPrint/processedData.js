import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args }) => {
  return (
    <FormGroup className="macro-setPresetAnswer">
      <div>
        <strong>Domain</strong>
        <div>
          <em>{args.domain}</em>
        </div>
      </div>
      <div>
        <strong>Data </strong>
        <p>{args.data}</p>
      </div>
    </FormGroup>
  );
};
