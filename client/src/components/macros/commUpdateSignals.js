import React from "react";
import { FormGroup } from "reactstrap";
import { SignalPicker } from "../views/CommShortRange/signalsCore";
export default ({ updateArgs, args }) => {
  const shortRangeComm = { signals: args.signals || [] };
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
