import React from "react";

const OR = ({ page, edit, connecting, onMouseDown, id, startConnecting }) => {
  if (!edit) return null;
  return (
    <div>
      {page && connecting && <div className="input" data-component={id} />}
      <div className="and" onMouseDown={onMouseDown}>
        NOR
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

export default OR;
