import React from "react";
import { FormGroup } from "reactstrap";
import { Asset } from "../../helpers/assets";
export default ({ args }) => {
  const data = JSON.parse(args.data || "{}");
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
              <Asset asset={data[k]}>
                {({ src }) => (
                  <video muted style={{ width: "50%" }} src={src} />
                )}
              </Asset>
            ) : (
              <li key={k}>
                <strong>{k}: </strong>
                {data[k]}
              </li>
            )
        )}
      </ul>
    </FormGroup>
  );
};
