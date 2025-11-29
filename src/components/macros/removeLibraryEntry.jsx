import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";

export default ({updateArgs, args: {slug = ""}}) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <Label>
        Slug <small>Use this identifier to remove the entry.</small>
      </Label>
      <Input
        type="text"
        defaultValue={slug}
        onBlur={evt =>
          updateArgs(
            "slug",
            evt.target.value ? evt.target.value : "",
          )
        }
      />
    </FormGroup>
  );
};
