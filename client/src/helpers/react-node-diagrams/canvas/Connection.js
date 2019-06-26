import React from "react";
import PropTypes from "prop-types";
const Connection = ({
  id,
  from,
  to,
  nodes,
  position,
  remove,
  dragging,
  view: { x, y, scale }
}) => {
  const fromNode =
    nodes[`output-${from.id}-${from.nodeId}`] ||
    nodes[`input-${from.id}-${from.nodeId}`];
  const toNode = position || nodes[`input-${to.id}-${to.nodeId}`];
  if (!fromNode || !toNode) return null;
  return (
    <line
      style={dragging ? { pointerEvents: "none" } : null}
      onClick={() => remove(id)}
      x1={(fromNode.x - x) / scale}
      y1={(fromNode.y - y) / scale}
      x2={(toNode.x - x) / scale}
      y2={(toNode.y - y) / scale}
      stroke="orange"
    />
  );
};

Connection.propTypes = {
  id: PropTypes.string,
  from: PropTypes.object,
  to: PropTypes.object,
  nodes: PropTypes.object,
  position: PropTypes.object,
  remove: PropTypes.func,
  dragging: PropTypes.bool,
  view: PropTypes.object
};

export default Connection;
