import React from "react";
import {throttle} from "helpers/debounce";
import {beginPointerDrag, getEventCoords} from "helpers/hooks/usePointerDrag";

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

  const positionFromEvent = (e: any) => {
    const pad = padRef.current;
    if (!pad) {
      return null;
    }
    const rect = pad.getBoundingClientRect();
    const coords = getEventCoords(e);
    if (!coords) {
      return null;
    }
    const {clientX, clientY} = coords;
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

  const handleDrag = (e: any) => {
    const position = positionFromEvent(e);
    if (!position) {
      return;
    }
    setDragPosition(position);
    throttledChange.current(position.x, position.y);
  };

  const handleStop = (e: any) => {
    const position = positionFromEvent(e) || dragPosition || {x: 0, y: 0};
    setDragPosition(null);
    onChangeRef.current(position.x, position.y);
  };

  // Pointer events rather than react-draggable's DraggableCore. On a
  // multi-touch screen DraggableCore's `handleDragStop` bails before removing
  // its own document listeners whenever the `touchend` does not carry its
  // tracked touch identifier -- which is exactly what happens when a second
  // finger lifts first -- leaving the pad latched to every subsequent touch.
  // See helpers/hooks/usePointerDrag.
  const cancelDrag = React.useRef<(() => void) | null>(null);
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (cancelDrag.current) cancelDrag.current();
    handleDrag(e);
    cancelDrag.current = beginPointerDrag(e, {
      onMove: state => handleDrag(state.event),
      onEnd: state => {
        cancelDrag.current = null;
        handleStop(state.event);
      },
    });
  };
  React.useEffect(
    () => () => {
      if (cancelDrag.current) cancelDrag.current();
      cancelDrag.current = null;
    },
    [],
  );

  const shown = dragPosition || {x, y};
  // The whole pad is the drag target so a touch anywhere aims the focus —
  // much easier than grabbing the knob on a touch screen
  return (
    <div className="focus-pad" ref={padRef} onPointerDown={handlePointerDown}>
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
  );
};

export default FocusPad;
