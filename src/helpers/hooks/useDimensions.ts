import {useState, useCallback, useLayoutEffect} from "react";
interface Bounds {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}
type NodeSetter = (node: HTMLDivElement | any) => void;

export default function useDimensions() {
  const [dimensions, setDimensions] = useState<Bounds>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const ref = useCallback((node: HTMLDivElement | any) => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() => {
          const rect = node?.getBoundingClientRect();

          setDimensions({
            width: rect.width,
            height: rect.height,
            top: rect.top || rect.y,
            left: rect.left || rect.x,
            x: rect.x || rect.left,
            y: rect.y || rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        });
      measure();
    }
  }, [node]);
  const output: [NodeSetter, Bounds, HTMLDivElement | any] = [
    ref,
    dimensions,
    node,
  ];
  return output;
}
