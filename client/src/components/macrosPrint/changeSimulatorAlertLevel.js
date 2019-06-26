import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs, args: { alertLevel } }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <Label>Level</Label>{" "}
      <Input
        type="select"
        defaultValue={alertLevel}
        onChange={evt => updateArgs("alertLevel", evt.target.value)}
      >
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </Input>
    </FormGroup>
  );
};
