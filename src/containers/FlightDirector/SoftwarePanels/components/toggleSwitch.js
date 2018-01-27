import React from "react";
import "./toggleSwitch.css";

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
  scale = 1
}) => {
  return (
    <div style={{ transform: `scale(${scale})` }}>
      <div onMouseDown={onMouseDown}>
        <div
          className="switch no-inline"
          onClick={() => update(level === 1 ? 0 : 1)}
        >
          <div className={`toggle ${level === 1 ? "on" : "off"}`} />
        </div>
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

export default ToggleSwitch;
