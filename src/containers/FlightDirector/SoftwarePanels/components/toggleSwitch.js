import React from "react";
import "./toggleSwitch.scss";

const ToggleSwitch = ({
  update,
  level,
  connecting,
  startConnecting,
  id,
  page,
  onMouseDown,
  edit,
  scaleComp = () => {},
  scale = 1,
}) => {
  return (
    <div style={{transform: `scale(${scale})`}}>
      <div onPointerDown={onMouseDown}>
        <div
          className="switch no-inline"
          onPointerUp={() => update(level === 1 ? 0 : 1)}
        >
          <div className={`toggle ${level === 1 ? "on" : "off"}`} />
        </div>
      </div>
      {page && edit && !connecting && (
        <div
          className="output"
          onPointerDown={evt => startConnecting(evt, id)}
        />
      )}
      {page && edit && <div className="scale" onPointerDown={scaleComp} />}
    </div>
  );
};

export default ToggleSwitch;
