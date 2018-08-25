import React from "react";

const AND = ({ page, connecting, onMouseDown, id, startConnecting, edit }) => {
  if (!edit) return null;
  return (
    <div>
      {page && connecting && <div className="input" data-component={id} />}

      <div className="and" onMouseDown={onMouseDown}>
        AND
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

export default AND;
