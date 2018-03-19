import React from "react";
import "./style.css";

export default () => {
  return (
    <div className="collision">
      <img className="base" src={require("./base.svg")} />
      <img className="rotor" src={require("./rotor.svg")} />
      <img className="inner" src={require("./inner.svg")} />
      <img className="outer" src={require("./outer.svg")} />
      <p>Collision Alert</p>
    </div>
  );
};
