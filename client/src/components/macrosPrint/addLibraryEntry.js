import React from "react";
import { FormGroup } from "reactstrap";
import { paramCase } from "change-case";

export default ({ args: { entry = {} } }) => {
  return (
    <FormGroup className="macro-addLibraryEntry">
      <strong>Title</strong>
      <div>{entry.title}</div>
      <strong>Slug</strong>
      <div>{paramCase(entry.title)}</div>
      <strong>
        Type <small>What stations does this entry show up on?</small>
      </strong>
      <div>{entry.type || ""}</div>

      <strong>Categories</strong>
      {(entry.categories || []).map(s => (
        <div key={`categories-list-${entry.id}-${s}`}>{s} </div>
      ))}
      <strong>Body</strong>
      <div>{entry.body || ""}</div>
      <strong>Image</strong>
      <div>{entry.image}</div>
    </FormGroup>
  );
};
