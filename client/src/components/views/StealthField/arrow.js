import React from "react";

const Arrow = ({
  alertLevel,
  level = 1,
  mouseDown = () => {},
  dimensions,
  flop,
  connected
}) => {
  return (
    <div
      onMouseDown={() => mouseDown(dimensions)}
      onTouchStart={() => mouseDown(dimensions)}
      style={{
        transform: `translateY(${level * 97}%) ${flop ? "scaleX(-1)" : ""}`
      }}
      className="arrow"
    >
      <svg
        version="1.1"
        x="0px"
        y="0px"
        width="45px"
        height="20px"
        viewBox="0 0 45 20"
        enableBackground="new 0 0 45 20"
      >
        <polygon
          className={`alertFill-${alertLevel || "5"} ${
            connected ? "connected" : ""
          }`}
          points="45,11 45,20 10,20 0,11 "
        />
        <polygon
          className={`alertFill-${alertLevel || "5"} ${
            connected ? "connected" : ""
          }`}
          points="0,9 10,0 45,0 45,9 "
        />
      </svg>
    </div>
  );
};

export default Arrow;
