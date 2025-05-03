import React from "react";
import "./pushbutton.scss";

const PushButton = ({
  onMouseDown,
  edit,
  update = () => {},
  page,
  connecting,
  startConnecting,
  id,
  scaleComp = () => {},
  scale = 1,
}) => {
  return (
    <div style={{transform: `scale(${scale})`}}>
      <div onMouseDown={onMouseDown}>
        <div
          style={{display: "flex"}}
          className="pushbutton"
          onPointerDown={() => update(1)}
          onPointerUp={() => update(0)}
        />
        {page && edit && !connecting && (
          <div
            className="output"
            onPointerDown={evt => startConnecting(evt, id)}
          />
        )}
      </div>
      {page && edit && <div className="scale" onPointerDown={scaleComp} />}
    </div>
  );
};

export default PushButton;
