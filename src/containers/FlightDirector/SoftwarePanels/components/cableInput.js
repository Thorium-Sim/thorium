import React from "react";
import "./cable.scss";
// Output true if connected to another cable of any kind
const CableInput = ({
  connecting,
  id,
  page,
  onMouseDown,
  inputs,
  draggingCable,
  cables = [],
  scaleComp = () => {},
  scale = 1,
  edit
}) => {
  const cableComponents = cables.reduce((prev, next) => {
    return prev.concat(next.components);
  }, []);
  return (
    <div style={{ transform: `scale(${scale})` }}>
      <div onMouseDown={onMouseDown}>
        {page &&
          connecting &&
          inputs.length === 0 && <div className="input" data-component={id} />}
        <div
          data-component={id}
          className={`cable ${
            draggingCable && cableComponents.indexOf(id) === -1 ? "hilite" : ""
          }`}
        />
      </div>
      {page && edit && <div className="scale" onMouseDown={scaleComp} />}
    </div>
  );
};

export default CableInput;
