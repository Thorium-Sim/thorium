import React from "react";
import {ReactComponent as Bcf} from "./bcf2000.svg";

const BCF = ({setSelectedComponent}) => {
  return (
    <Bcf
      onClick={e => {
        setSelectedComponent(e.target.id);
      }}
    />
  );
};

export default BCF;
