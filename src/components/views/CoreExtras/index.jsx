import React from "react";
import Dice from "./dice";
import Timer from "./timer";
import {Flash} from "components/generic/useFlash";
const ExtrasCore = props => {
  return (
    <Flash>
      {({flash, doFlash}) => (
        <div className={flash ? "flash" : ""}>
          <Timer {...props} doFlash={doFlash} />
          <Dice />
        </div>
      )}
    </Flash>
  );
};

export default ExtrasCore;
