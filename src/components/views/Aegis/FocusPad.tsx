import React from "react";
import {DraggableCore, DraggableEvent} from "react-draggable";
import {throttle} from "helpers/debounce";

interface FocusPadProps {
  x: number;
  y: number;
  onChange: (x: number, y: number) => void;
}

// 2D focus pad, modeled on the Thrusters direction pad: drag the knob to a
// point in the unit circle. Unlike thrusters, the knob stays where it is
// released — the focus persists until the crew moves it again.
const FocusPad: React.FC<FocusPadProps> = ({x, y, onChange}) => {
  const padRef = React.useRef<HTMLDivElement>(null);
  const [dragPosition, setDragPosition] = React.useState<{
    x: number;
    y: number;
  } | null>(null);
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  const throttledChange = React.useRef(
    throttle((nx: number, ny: number) => onChangeRef.current(nx, ny), 100),
  );

  const positionFromEvent = (e: DraggableEvent) => {
    const pad = padRef.current;
    if (!pad) {
      return null;
    }
    const rect = pad.getBoundingClientRect();
    const clientX =
      "clientX" in e ? e.clientX : e.touches && e.touches[0]?.clientX;
    const clientY =
      "clientY" in e ? e.clientY : e.touches && e.touches[0]?.clientY;
    if (typeof clientX !== "number" || typeof clientY !== "number") {
      return null;
    }
    let nx = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
    let ny = (clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const magnitude = Math.hypot(nx, ny);
    if (magnitude > 1) {
      nx /= magnitude;
      ny /= magnitude;
    }
    // Snap a small dead zone around each axis to zero so it's easy to pick a
    // clean cardinal direction
    if (Math.abs(nx) < 0.1) {
      nx = 0;
    }
    if (Math.abs(ny) < 0.1) {
      ny = 0;
    }
    return {x: nx, y: ny};
  };

  const handleDrag = (e: DraggableEvent) => {
    const position = positionFromEvent(e);
    if (!position) {
      return;
    }
    setDragPosition(position);
    throttledChange.current(position.x, position.y);
  };

  const handleStop = (e: DraggableEvent) => {
    const position = positionFromEvent(e) || dragPosition || {x: 0, y: 0};
    setDragPosition(null);
    onChangeRef.current(position.x, position.y);
  };

  const shown = dragPosition || {x, y};
  // The whole pad is the drag target so a touch anywhere aims the focus —
  // much easier than grabbing the knob on a touch screen
  return (
    <DraggableCore onStart={handleDrag} onDrag={handleDrag} onStop={handleStop}>
      <div className="focus-pad" ref={padRef}>
        <div className="focus-pad-label focus-pad-fore"></div>
        <div className="focus-pad-label focus-pad-aft"></div>
        <div className="focus-pad-label focus-pad-port"></div>
        <div className="focus-pad-label focus-pad-starboard"></div>
        <div
          className="focus-pad-knob"
          style={{
            left: `${50 + shown.x * 42}%`,
            top: `${50 + shown.y * 42}%`,
          }}
        />
      </div>
    </DraggableCore>
  );
};

export default FocusPad;
