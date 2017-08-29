import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default ({ updateArgs, args, client }) => {
  let answers = args.presetAnswers || [];
  answers = answers
    .map(a => `${a.label || ""}${a.value && ";" + a.value}`)
    .join("\n");

  const processAnswers = text => {
    const answers = text
      .split("\n")
      .map(a =>
        a
          .split(";")
          .reduce(
            (prev, next, index) =>
              index === 0
                ? Object.assign(prev, { label: next })
                : Object.assign(prev, { value: next }),
            {}
          )
      );
    updateArgs("presetAnswers", answers);
  };
  return (
    <FormGroup className="macro-setPresetAnswer">
      <Label>Domain</Label>
      <Input
        type="select"
        value={args.domain}
        onChange={evt => updateArgs("domain", evt.target.value)}
      >
        <option value={null}>Pick a Domain</option>
        <option value="external">External</option>
        <option value="internal">Internal</option>
      </Input>
      <Label>
        Answers <small>Separate labels from answers with a semicolon</small>
      </Label>
      <Input
        type="textarea"
        placeholder="Short Label;Longer scan answer that goes in the box"
        rows={8}
        defaultValue={answers}
        onBlur={evt => processAnswers(evt.target.value)}
      />
      <Label>Preview</Label>
      <Input type="select">
        {(args.presetAnswers || []).map(a =>
          <option key={a.value}>
            {a.label} - {a.value}
          </option>
        )}
      </Input>
    </FormGroup>
  );
};
