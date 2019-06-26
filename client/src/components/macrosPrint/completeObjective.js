import React from "react";
import { FormGroup } from "helpers/reactstrap";
export default ({ args: { title } }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <strong>Title</strong> <div>{title}</div>
    </FormGroup>
  );
};
