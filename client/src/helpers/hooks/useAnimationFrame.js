import { useRef, useLayoutEffect } from "react";

const useAnimationFrame = (callback, active = true) => {
  const callbackRef = useRef(callback);
  const time = useRef(performance.now());

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]); // eslint-disable-line react-hooks/exhaustive-deps

  const frameRef = useRef();

  useLayoutEffect(() => {
    const loop = now => {
      const diff = now - (time.current || now - 16);
      time.current = now;
      frameRef.current = requestAnimationFrame(loop);
      const cb = callbackRef.current;
      cb(diff);
    };
    if (active) {
      time.current = performance.now();
      frameRef.current = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(frameRef.current);
    }
    return () => cancelAnimationFrame(frameRef.current);
  }, [active]);
};

export default useAnimationFrame;
