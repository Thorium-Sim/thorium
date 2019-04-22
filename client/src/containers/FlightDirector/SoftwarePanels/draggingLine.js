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
  const offset = 5;
  return (
    <path
      className="drag-line"
      onClick={() => {
        onClick(id);
      }}
      d={`M${comp.x * width + offset} ${comp.y * height + offset} L ${x +
        offset} ${y + offset}`}
      fill="transparent"
      stroke={color || "white"}
      strokeWidth={selected ? 7 : stroke || 3}
    />
  );
};

export default DraggingLine;
