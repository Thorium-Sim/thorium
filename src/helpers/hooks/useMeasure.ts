import {useState, useCallback, useLayoutEffect} from "react";

export interface Dimensions {
  width: number;
  height: number;
  top: number;
  left: number;
  x: number;
  y: number;
  right: number;
  bottom: number;
}
function getDimensionObject<T>(node: T): Dimensions {
  const rect = ((node as unknown) as HTMLElement).getBoundingClientRect();

  if (rect.toJSON) {
    return rect.toJSON();
  } else {
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top || rect.y,
      left: rect.left || rect.x,
      x: rect.x || rect.left,
      y: rect.y || rect.top,
      right: rect.right,
      bottom: rect.bottom,
    };
  }
}

function useMeasure<Element = HTMLElement>(): [
  (node: Element) => void,
  Dimensions,
  Element | undefined,
] {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    x: 0,
    y: 0,
    right: 0,
    bottom: 0,
  });
  const [node, setNode] = useState<Element>();

  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() =>
          setDimensions(getDimensionObject<Element>(node)),
        );
      measure();

      window.addEventListener("resize", measure);
      window.addEventListener("scroll", measure);

      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure);
      };
    }
  }, [node]);

  return [ref, dimensions, node];
}

export default useMeasure;
