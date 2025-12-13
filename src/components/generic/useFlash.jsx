import React, {useState, useRef, useEffect} from "react";

export const useFlash = () => {
  const [flash, setFlash] = useState(false);
  const timeoutRef = useRef(null);
  const doFlash = React.useCallback(duration => {
    clearTimeout(timeoutRef.current);
    duration = duration || duration === 0 ? duration : 10;
    if (duration <= 0) {
      return setFlash(false);
    }
    setFlash(oldFlash => !oldFlash);
    timeoutRef.current = setTimeout(() => doFlash(duration - 1), 150);
  }, []);
  useEffect(() => () => clearTimeout(timeoutRef.current), []);
  return {flash, doFlash};
};

export function Flash({children}) {
  const {flash, doFlash} = useFlash();

  return children({flash, doFlash});
}
