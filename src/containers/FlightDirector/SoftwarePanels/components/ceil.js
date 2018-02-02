import React from "react";

const Ceil = ({
  page,
  connecting,
  onMouseDown,
  id,
  startConnecting,
  inputs,
  edit
}) => {
  if (!edit) return null;
  return (
    <div>
      {page &&
        connecting &&
        inputs.length === 0 && <div className="input" data-component={id} />}
      <div className="and" onMouseDown={onMouseDown}>
        Ceil
      </div>
      {page &&
        !connecting && (
          <div
            className="output"
            onMouseDown={evt => startConnecting(evt, id)}
          />
        )}
    </div>
  );
};

export default Ceil;
