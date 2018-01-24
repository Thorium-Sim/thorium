import React from "react";
import "./ripples.css";

const PlasmaRipples = ({
  level = 0,
  inputs = [],
  onMouseDown,
  id,
  connecting,
  page
}) => {
  const alpha = level || inputs[0] || 0;
  return (
    <div>
      {page &&
        connecting &&
        inputs.length === 0 && <div className="input" data-component={id} />}
      <div onMouseDown={onMouseDown} className="ripples">
        <div className="ball-container" style={{ opacity: alpha }}>
          {Array(16)
            .fill(0)
            .map((_, i) => <div key={`ball-${i}`} className="ball" />)}
        </div>
      </div>
    </div>
  );
};

export default PlasmaRipples;
