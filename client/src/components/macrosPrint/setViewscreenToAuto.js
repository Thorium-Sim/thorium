import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args = {} }) => {
  return (
    <FormGroup className="macro-template">
      <span>
        <strong>Secondary Screen? </strong>
        {args && args.secondary ? "Yes" : "No"}
      </span>
    </FormGroup>
  );
};
