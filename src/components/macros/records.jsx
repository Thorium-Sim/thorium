import React from "react";
import {FormGroup, Label, Input} from "helpers/reactstrap";

export const recordsCreate = ({updateArgs, args}) => {
  return (
    <FormGroup>
      <div>
        <Label>
          Contents
          <Input
            type="textarea"
            value={args.contents}
            onChange={e => updateArgs("contents", e.target.value)}
          />
        </Label>
      </div>
      <div>
        <Label>
          Category
          <Input
            type="text"
            value={args.category}
            onChange={e => updateArgs("category", e.target.value)}
          />
        </Label>
      </div>
    </FormGroup>
  );
};
export const recordsGenerateRecords = ({updateArgs, args}) => {
  return (
    <FormGroup>
      <div>
        <Label>
          External Snippet Name
          <Input
            type="text"
            value={args.name}
            onChange={e => updateArgs("name", e.target.value)}
          />
        </Label>
      </div>
      <div>
        <Label>
          Record Count
          <Input
            type="number"
            min="0"
            value={args.count || 30}
            onChange={e => updateArgs("count", parseInt(e.target.value, 10))}
          />
        </Label>
      </div>
      <div>
        <Label>
          Snippet Visible to Crew immediately?
          <Input
            type="checkbox"
            checked={args.visible}
            onChange={e => updateArgs("visible", e.target.checked)}
          />
        </Label>
      </div>
    </FormGroup>
  );
};
export const recordsCreateOnSnippet = ({updateArgs, args}) => {
  return (
    <FormGroup>
      <div>
        <Label>
          Snippet Name (Must exactly match existing snippet)
          <Input
            type="text"
            value={args.snippetName}
            onChange={e => updateArgs("snippetName", e.target.value)}
          />
        </Label>
      </div>
      <div>
        <Label>
          Contents
          <Input
            type="textarea"
            value={args.contents}
            onChange={e => updateArgs("contents", e.target.value)}
          />
        </Label>
      </div>
      <div>
        <Label>
          Category
          <Input
            type="text"
            value={args.category}
            onChange={e => updateArgs("category", e.target.value)}
          />
        </Label>
      </div>
      <div>
        <Label>
          Timestamp Offset in Seconds
          <Input
            type="text"
            defaultValue={(args.timestamp || 0) / 1000}
            onBlur={e => updateArgs("timestamp", Number(e.target.value * 1000))}
          />
          <small>
            This changes the timestamp of the record based on other records in
            the snippet. Use a negative number to place the record that number
            of seconds before the latest record in the snippet; use a positive
            number to place the new records that many seconds after the latest
            record in the snippet.
          </small>
        </Label>
      </div>
    </FormGroup>
  );
};
