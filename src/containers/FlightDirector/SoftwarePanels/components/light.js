import React from "react";
import colormod from "tinycolor2";

const Light = ({
  level = 0,
  color = "#00ff00",
  inputs = [],
  onMouseDown,
  id,
  connecting,
  page
}) => {
  const c = colormod(color);
  const alpha = level || inputs[0] || 0;
  c.setAlpha(alpha);
  return (
    <div>
      {page &&
        connecting &&
        inputs.length === 0 && <div className="input" data-component={id} />}
      <div
        onMouseDown={onMouseDown}
        className="light"
        style={{ backgroundColor: c.toRgbString() }}
      />
    </div>
  );
};

export default Light;
