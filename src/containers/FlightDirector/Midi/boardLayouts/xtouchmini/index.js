import React from "react";

import {ReactComponent as Xtouchmini} from "./xtouchmini.svg";

const XTouchMini = ({setSelectedComponent}) => {
  return <Xtouchmini onClick={e => setSelectedComponent(e.target.id)} />;
};

export default XTouchMini;
