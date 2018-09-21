import React from "react";
import { FormGroup } from "reactstrap";

export default ({ args = `{"data":{}}` }) => {
  const data = args.data ? JSON.parse(args.data) : {};

  return (
    <FormGroup className="macro-template">
      <span>
        <strong>Secondary Screen? </strong>
        {args.secondary ? "Yes" : "No"}
      </span>
      <div>
        <strong>Viewscreen Component</strong>
      </div>
      <div>{args.component}</div>
      <strong>Config</strong>
      <ul>
        {Object.keys(data).map(
          k =>
            k === "asset" ? (
              <video muted style={{ width: "50%" }} src={`/assets${data[k]}`} />
            ) : (
              <li key={k}>
                <strong>{k}: </strong>
                {JSON.stringify(data[k])}
              </li>
            )
        )}
      </ul>
    </FormGroup>
  );
};
