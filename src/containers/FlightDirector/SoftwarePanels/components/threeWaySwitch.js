import React from "react";
import "./toggleSwitch.css";

const ToggleSwitch = ({
  update,
  level = 0,
  connecting,
  startConnecting,
  id,
  page,
  onMouseDown,
  edit
}) => {
  return (
    <div>
      <div onMouseDown={onMouseDown}>
        <div
          className="switch no-inline"
          onClick={() => {
            if (level === 1) update(0.5);
            if (level === 0.5) update(0);
            if (level === 0) update(1);
          }}
        >
          <div
            className={`toggle ${level === 1 ? "on" : ""} ${
              level === 0.5 ? "middle" : ""
            } ${level === 0 ? "off" : ""}`}
          />
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
    </div>
  );
};

export default ToggleSwitch;
