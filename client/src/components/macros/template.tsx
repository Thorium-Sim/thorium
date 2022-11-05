import React from "react";
import {FormGroup} from "helpers/reactstrap";

export default ({
  updateArgs,
  args,
}: {
  updateArgs: (key: string, value: any) => void;
  args: {[key: string]: any};
}) => {
  return <FormGroup className="macro-template" />;
};
