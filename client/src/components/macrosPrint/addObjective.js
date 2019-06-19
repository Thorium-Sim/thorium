import React from "react";
import { FormGroup } from "helpers/reactstrap";
export default ({ args = {} }) => {
  const { objective = {} } = args || {};
  return (
    <FormGroup className="macro-addObjective">
      <strong>Title</strong> <div>{objective.title}</div>
      <strong>Description</strong> <div>{objective.description}</div>
    </FormGroup>
  );
};
