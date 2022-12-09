import React from "react";
import "./style.scss";
import base from "./base.svg";
import rotor from "./rotor.svg";
import inner from "./inner.svg";
import outer from "./outer.svg";

export default () => {
  return (
    <div className="collision">
      <img alt="base" className="base" src={base} />
      <img alt="rotor" className="rotor" src={rotor} />
      <img alt="inner" className="inner" src={inner} />
      <img alt="outer" className="outer" src={outer} />
      <p>Collision Alert</p>
    </div>
  );
};
