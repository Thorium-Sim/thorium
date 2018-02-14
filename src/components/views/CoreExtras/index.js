import React from "react";
import Dice from "./dice";
import Timer from "./timer";
const ExtrasCore = props => {
  return (
    <div>
      <Timer {...props} />
      <Dice />
    </div>
  );
};

export default ExtrasCore;
