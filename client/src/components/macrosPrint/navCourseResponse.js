import React from "react";
import { FormGroup } from "helpers/reactstrap";

export default ({ args }) => {
  return (
    <div>
      <FormGroup className="macro-navCourse">
        <div>
          <strong>X</strong> {args ? args.x : ""}
        </div>
        <div>
          <strong>Y</strong> {args ? args.y : ""}
        </div>
        <div>
          <strong>Z</strong> {args ? args.z : ""}
        </div>
      </FormGroup>
    </div>
  );
};
