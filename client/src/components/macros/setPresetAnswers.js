import React from "react";
import { FormGroup, Label, Input } from "helpers/reactstrap";

export default ({ updateArgs = () => {}, args = {}, client, preview }) => {
  const answers = args ? args.presetAnswers || [] : [];
  const mapAnswers = answers
    .map(a => `${a.label || ""}${a.value && ";" + a.value}`)
    .join("\n");

  const processAnswers = text => {
    const results = text
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
    updateArgs("presetAnswers", results);
  };
  return (
    <FormGroup className="macro-setPresetAnswer">
      <Label>Domain</Label>
      <Input
        type="select"
        value={args ? args.domain : "External"}
        onChange={evt => updateArgs("domain", evt.target.value)}
      >
        <option value={null}>Pick a Domain</option>
        <option value="external">External</option>
        <option value="internal">Internal</option>
      </Input>
      <Label>
        Answers{" "}
        <div>
          <small>
            Place each scan answer on its own line. Separate labels from answers
            with a semicolon.
          </small>
        </div>
        <div>
          <small>
            Use #SIM in your scan answer for the name of the simulator
          </small>
        </div>
      </Label>
      <Input
        type="textarea"
        placeholder="Short Label;Longer scan answer that goes in the box"
        rows={8}
        defaultValue={mapAnswers}
        onBlur={evt => processAnswers(evt.target.value)}
      />
      <Label>Preview</Label>
      <Input type="select">
        {answers.map(a => (
          <option key={a.value}>
            {a.label} - {a.value}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};
