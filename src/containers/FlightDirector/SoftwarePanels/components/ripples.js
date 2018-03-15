import React from "react";
import "./ripples.css";

const PlasmaRipples = ({
  level = 0,
  inputs = [],
  onMouseDown,
  id,
  connecting,
  page,
  scaleComp = () => {},
  scale = 1,
  edit,
  color = "blue"
}) => {
  const alpha = level || (level === 0 ? 0 : inputs[0]) || 0;
  return (
    <div style={{ transform: `scale(${scale})` }}>
      {page &&
        connecting &&
        inputs.length === 0 && <div className="input" data-component={id} />}
      <div onMouseDown={onMouseDown} className="ripples">
        <div className="ball-container" style={{ height: `${alpha * 100}%` }}>
          {Array(16)
            .fill(0)
            .map((_, i) => (
              <div key={`ball-${i}`} className="ball">
                <div className="color" style={{ backgroundColor: color }} />
              </div>
            ))}
        </div>
      </div>
      {page && edit && <div className="scale" onMouseDown={scaleComp} />}
    </div>
  );
};

export default PlasmaRipples;
