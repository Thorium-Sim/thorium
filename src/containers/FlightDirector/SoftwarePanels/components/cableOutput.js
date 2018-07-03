import React from "react";
import "./cable.scss";
// Output true if connected to another cable of any kind
const CableOutput = ({
  connecting,
  startConnecting,
  id,
  page,
  onMouseDown,
  edit,
  draggingCable,
  cables = [],
  scaleComp = () => {},
  scale = 1
}) => {
  const cableComponents = cables.reduce((prev, next) => {
    return prev.concat(next.components);
  }, []);
  return (
    <div style={{ transform: `scale(${scale})` }}>
      <div onMouseDown={onMouseDown}>
        <div
          data-component={id}
          className={`cable ${
            draggingCable && cableComponents.indexOf(id) === -1 ? "hilite" : ""
          }`}
        />
      </div>
      {page &&
        edit &&
        !connecting && (
          <div
            className="output"
            onMouseDown={evt => startConnecting(evt, id)}
          />
        )}
      {page && edit && <div className="scale" onMouseDown={scaleComp} />}
    </div>
  );
};

export default CableOutput;
