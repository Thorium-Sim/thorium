import React, { Fragment } from "react";

const PathLine = ({
  id,
  start,
  end,
  c1,
  c2,
  width = 5,
  color = "white",
  // arrow = true,
  selected,
  onMouseDown
}) => {
  const arrow = true;
  return (
    <g className="path-line">
      <defs>
        <marker
          id={id}
          viewBox="0 0 10 10"
          refX="1"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
        </marker>
      </defs>
      <path
        d={`M${start.x} ${start.y} C${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${
          end.x
        } ${end.y}`}
        strokeWidth={width}
        stroke={color}
        fill="transparent"
        markerEnd={arrow ? `url(#${id})` : null}
      />

      {selected && (
        <Fragment>
          <circle
            cx={start.x}
            cy={start.y}
            r="10"
            fill="rgba(255,255,255,0.25)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            onMouseDown={() => onMouseDown(id, "start")}
          />
          <circle
            cx={end.x}
            cy={end.y}
            r="10"
            fill="rgba(255,255,255,0.25)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            onMouseDown={() => onMouseDown(id, "end")}
          />
          <circle
            cx={c1.x}
            cy={c1.y}
            r="10"
            fill="rgba(255,255,255,0.25)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            onMouseDown={() => onMouseDown(id, "c1")}
          />
          <circle
            cx={c2.x}
            cy={c2.y}
            r="10"
            fill="rgba(255,255,255,0.25)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            onMouseDown={() => onMouseDown(id, "c2")}
          />
          <line
            x1={start.x}
            y1={start.y}
            x2={c1.x}
            y2={c1.y}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          />
          <line
            x1={end.x}
            y1={end.y}
            x2={c2.x}
            y2={c2.y}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          />
        </Fragment>
      )}
    </g>
  );
};

export default PathLine;
