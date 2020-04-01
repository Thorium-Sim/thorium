import React from "react";
import useInterval from "./useInterval";

export function useGamepadAxis(index: number[], callback: Function) {
  const savedCallback = React.useRef<Function>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const value = React.useRef<(number | null)[]>([]);
  useInterval(() => {
    const gamepads = navigator.getGamepads();
    let shouldSetValue = false;
    const output = index.map((i, index) => {
      const newVal = gamepads[0]
        ? Math.round(gamepads[0].axes[i] * 20) / 20
        : null;
      if (value.current[index] !== newVal) shouldSetValue = true;
      return newVal;
    });
    if (shouldSetValue) {
      savedCallback.current?.(output, value.current);
      value.current = output;
    }
  }, 1000 / 30);
  return value;
}

export function useGamepadButton(index: number[], callback: Function) {
  const savedCallback = React.useRef<Function>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const value = React.useRef<boolean[]>([]);
  useInterval(() => {
    const gamepads = navigator.getGamepads();
    let shouldSetValue = false;
    const output = index.map((i, index) => {
      const newVal = gamepads[0] ? gamepads[0].buttons[i].pressed : false;
      if (value.current[index] !== newVal) shouldSetValue = true;
      return newVal;
    });
    if (shouldSetValue) {
      savedCallback.current?.(output, value.current);
      value.current = output;
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

  useGamepadButton([index], ([value]: [boolean]) => {
    if (value && savedCallback.current) savedCallback.current(index);
  });
}
