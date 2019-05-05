import { useState, useCallback, useLayoutEffect } from "react";

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0
  });
  const [node, setNode] = useState(null);

  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() => {
          const rect = node.getBoundingClientRect();

          setDimensions({
            width: rect.width,
            height: rect.height,
            top: rect.top || rect.y,
            left: rect.left || rect.x,
            x: rect.x || rect.left,
            y: rect.y || rect.top,
            right: rect.right,
            bottom: rect.bottom
          });
        });
      measure();
    }
  }, [node]);

  return [ref, dimensions, node];
}
