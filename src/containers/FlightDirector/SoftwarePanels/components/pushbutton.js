import React from "react";
import "./pushbutton.css";

const PushButton = ({
  onMouseDown,
  edit,
  update = () => {},
  page,
  connecting,
  startConnecting,
  id,
  scaleComp = () => {},
  scale = 1
}) => {
  return (
    <div style={{ transform: `scale(${scale})` }}>
      <div onMouseDown={onMouseDown}>
        <div
          style={{ display: "flex" }}
          className="pushbutton"
          onMouseDown={() => update(1)}
          onMouseUp={() => update(0)}
        />
        {page &&
          edit &&
          !connecting && (
            <div
              className="output"
              onMouseDown={evt => startConnecting(evt, id)}
            />
          )}
      </div>
      {page && edit && <div className="scale" onMouseDown={scaleComp} />}
    </div>
  );
};

export default PushButton;
