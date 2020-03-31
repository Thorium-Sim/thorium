import React from "react";
import useInterval from "./useInterval";

export function useGamepadAxis(index: number | number[]) {
  const gamepads = navigator.getGamepads();
  const [value, setValue] = React.useState(() =>
    Array.isArray(index)
      ? index.map(i => (gamepads[0] ? gamepads[0].axes[i] : 0))
      : gamepads[0]
      ? gamepads[0].axes[index]
      : 0,
  );
  useInterval(() => {
    const gamepads = navigator.getGamepads();
    if (Array.isArray(index)) {
      let shouldSetValue = false;
      const output = index.map(i => {
        const newVal = gamepads[0]
          ? Math.round(gamepads[0].axes[i] * 20) / 20
          : 0;
        if (value !== newVal) shouldSetValue = true;
        return newVal;
      });
      if (shouldSetValue) {
        setValue(output);
      }
    } else {
      const newVal = gamepads[0]
        ? Math.round(gamepads[0].axes[index] * 20) / 20
        : 0;
      if (value !== newVal) setValue(newVal);
    }
  }, 1000 / 30);
  return value;
}

export function useGamepadButton(index: number | number[]) {
  const gamepads = navigator.getGamepads();
  const [value, setValue] = React.useState(
    Array.isArray(index)
      ? index.map(i => (gamepads[0] ? gamepads[0].buttons[i].pressed : false))
      : gamepads[0]
      ? gamepads[0].buttons[index].pressed
      : false,
  );
  useInterval(() => {
    const gamepads = navigator.getGamepads();
    if (Array.isArray(index)) {
      let shouldSetValue = false;
      const output = index.map(i => {
        const newVal = gamepads[0] ? gamepads[0].buttons[i].pressed : false;
        if (value !== newVal) shouldSetValue = true;
        return newVal;
      });
      if (shouldSetValue) {
        setValue(output);
      }
    } else {
      const newVal = gamepads[0] ? gamepads[0].buttons[index].pressed : false;
      if (value !== newVal) setValue(newVal);
    }
  }, 1000 / 30);
  return value;
}

export function useGamepadButtonPress(index: number, callback: Function) {
  const savedCallback = React.useRef<Function>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const value = useGamepadButton(index);
  React.useEffect(() => {
    if (value && savedCallback.current) savedCallback.current(index);
  }, [value, index]);
}
