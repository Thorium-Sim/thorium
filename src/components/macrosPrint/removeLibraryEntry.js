import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args: { entry = {} } }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <strong>Slug</strong>
      <div>{entry.slug}</div>
    </FormGroup>
  );
};
