import React from "react";
import { FormGroup, Label } from "reactstrap";

export default ({ args = {} }) => {
  let answers = args ? args.presetAnswers : [];
  answers = answers
    .map(a => `${a.label || ""}${a.value && ";" + a.value}`)
    .join("\n");
  return (
    <FormGroup className="macro-setPresetAnswer">
      <strong>Domain</strong>
      <div>{args ? args.domain : "External"}</div>
      <Label>
        Answers{" "}
        <small>Use of #SIM in the message is the name of simulator</small>
      </Label>
      <pre>
        {answers
          .split("\n")
          .map(a => a.split(";"))
          .map(a => (
            <p>
              <strong>{a[0]}: </strong>
              {a[1]}
            </p>
          ))}
      </pre>
    </FormGroup>
  );
};
