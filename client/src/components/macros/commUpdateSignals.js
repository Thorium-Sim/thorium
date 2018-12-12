import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import { SignalPicker } from "../views/CommShortRange/signalsCore";
export default ({ updateArgs, args, client }) => {
  console.log(args);
  const shortRangeComm = { signals: args.signals || [] };
  console.log(shortRangeComm);
  return (
    <FormGroup
      className="macro-commUpdateSignals"
      style={{ minHeight: "50vh", height: "100%" }}
    >
      <SignalPicker
        shortRangeComm={shortRangeComm}
        saveSignals={signals => updateArgs("signals", signals)}
      />
    </FormGroup>
  );
};
