import { useRef, useLayoutEffect } from "react";

const useAnimationFrame = (callback, active = true) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]); // eslint-disable-line react-hooks/exhaustive-deps

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = useRef();

  useLayoutEffect(() => {
    if (active) {
      frameRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(frameRef.current);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [loop, active]);
};

export default useAnimationFrame;
