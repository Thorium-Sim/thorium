import React from "react";
import "./pushbutton.css";

const PushButton = ({
  onMouseDown,
  edit,
  update = () => {},
  page,
  connecting,
  startConnecting,
  id
}) => {
  return (
    <div onMouseDown={onMouseDown}>
      <div
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
  );
};

export default PushButton;
