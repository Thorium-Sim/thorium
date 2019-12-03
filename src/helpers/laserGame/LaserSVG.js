import React from "react";

const LaserSVG = ({laserSegments, cellSize, blurred}) => {
  return (
    <svg className={blurred ? "blurred" : "pulse"}>
      {laserSegments &&
        laserSegments.map(({color, start, end}, i) => (
          <line
            key={`segment-${i}-${blurred ? "blurred" : ""}`}
            x1={start.x * cellSize + cellSize / 2}
            y1={start.y * cellSize + cellSize / 2}
            x2={end.x * cellSize + cellSize / 2}
            y2={end.y * cellSize + cellSize / 2}
            style={{stroke: color, strokeWidth: cellSize / 15}}
          />
        ))}
    </svg>
  );
};

export default LaserSVG;
