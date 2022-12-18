import React from "react";

const Arrow: React.FC<{
  alertLevel: string;
  level?: number;
  flop?: boolean;
  connected?: boolean;
}> = ({alertLevel, level = 1, flop, connected, ...props}) => {
  return (
    <div
      style={{
        height: "100%",
        transform: `translateY(calc(${level * 100}% - 10px)) ${
          flop ? "" : "scaleX(-1)"
        }`,
      }}
      {...props}
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
