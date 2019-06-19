import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args: { entry = {} }, client }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <Label>
        Slug <small>Use this identifier to remove the entry.</small>
      </Label>
      <Input
        type="text"
        defaultValue={entry.slug}
        onBlur={evt =>
          updateArgs(
            "entry",
            Object.assign({}, entry, { slug: evt.target.value })
          )
        }
      />
    </FormGroup>
  );
};
