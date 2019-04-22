import React from "react";
import "./style.scss";

export default () => {
  return (
    <div className="collision">
      <img alt="base" className="base" src={require("./base.svg")} />
      <img alt="rotor" className="rotor" src={require("./rotor.svg")} />
      <img alt="inner" className="inner" src={require("./inner.svg")} />
      <img alt="outer" className="outer" src={require("./outer.svg")} />
      <p>Collision Alert</p>
    </div>
  );
};
