import React from "react";

const Checkbox = ({
  update,
  level,
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
        <input
          type="checkbox"
          checked={level === 1}
          onChange={evt => update(evt.target.checked === true ? 1 : 0)}
        />
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

export default Checkbox;
