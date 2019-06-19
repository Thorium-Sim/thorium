import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";
export default ({ updateArgs, args: { title } }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <Label>Title</Label>{" "}
      <small>Make sure you type in the title of the objective exactly.</small>
      <Input
        type="text"
        defaultValue={title}
        onBlur={evt => updateArgs("title", evt.target.value)}
      />
    </FormGroup>
  );
};
