import React from "react";

const DraggingLine = ({
  id,
  width,
  height,
  components,
  connectingFrom,
  connectingTo,
  selected,
  loc = {},
  onClick = () => {},
  color,
  stroke
}) => {
  const comp = components.find(c => c.id === connectingFrom);
  const toComp = components.find(c => c.id === connectingTo);
  let { x, y } = loc;
  if (toComp) {
    x = toComp.x * width;
    y = toComp.y * height;
  }
  return (
    <path
      onClick={() => {
        onClick(id);
      }}
      d={`M${comp.x * width + 10} ${comp.y * height + 10} L ${x + 10} ${y +
        10}`}
      fill="orange"
      stroke={color || "white"}
      strokeWidth={selected ? 3 : stroke || 2}
    />
  );
};

export default DraggingLine;
