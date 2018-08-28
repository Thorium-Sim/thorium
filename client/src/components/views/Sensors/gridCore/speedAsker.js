import React from "react";

const SpeedAsker = ({ speedAsking, speeds, cancelMove, triggerUpdate }) => {
  return (
    <div
      className="speed-container"
      style={{
        transform: `translate(${speedAsking.x}px, ${speedAsking.y}px)`
      }}
    >
      {speeds.map(s => (
        <p key={s.value} onClick={() => triggerUpdate(s.value)}>
          {s.label}
        </p>
      ))}
      <p onClick={cancelMove}>Cancel</p>
    </div>
  );
};
export default SpeedAsker;
