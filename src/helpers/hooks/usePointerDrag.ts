import React from "react";

/**
 * Pointer-event helpers for controls that must work identically with a mouse
 * and with a Windows touchscreen.
 *
 * Why this exists
 * ---------------
 * Chrome synthesizes "compatibility" mouse events for touch, but only for a
 * clean tap, and only at the very end of the gesture:
 *
 *   touchstart -> touchend -> mousemove x1 -> mousedown -> mouseup -> click
 *
 * Two consequences break hand-rolled mouse drag code:
 *
 *  1. `mousedown` and `mouseup` arrive back to back in the same task. Any code
 *     that registers its `mouseup` listener from a React effect (i.e. after the
 *     next commit) misses the release entirely and latches "dragging" forever.
 *  2. Once a gesture accumulates enough `touchmove`s to stop being a tap, the
 *     compat mouse events are suppressed completely. There is no synthesized
 *     `mousemove` stream, so `mousemove`-driven dragging never happens at all.
 *
 * Pointer events sidestep both: they fire exactly once per input for mouse,
 * touch and pen alike, and `setPointerCapture` guarantees that the matching
 * `pointerup` is delivered even if the finger leaves the element. Wiring a
 * single `onPointerDown` also removes the double-fire you get from wiring
 * `onMouseDown` and `onTouchStart` to the same handler.
 *
 * Note that scroll/pan interference is handled with CSS `touch-action: none`
 * on the draggable element -- not `preventDefault()`. React 16 delegates events
 * to `document`, where Chrome forces `touchstart`/`touchmove` listeners passive,
 * so `preventDefault()` inside a React `onTouchStart` is a no-op.
 */

export interface PointerCoords {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

export interface PointerDragState extends PointerCoords {
  /**
   * Movement since the previous move. Computed here rather than read from
   * `movementX`/`movementY`, which are mouse-only and are always 0 on
   * synthesized events.
   */
  dx: number;
  dy: number;
  /** Movement since the drag started. */
  totalDx: number;
  totalDy: number;
  /** True once the pointer has travelled further than `threshold`. */
  moved: boolean;
  pointerType: string;
  event: PointerEvent;
}

type CoordSource = {
  clientX?: unknown;
  pageX?: unknown;
  clientY?: unknown;
  pageY?: unknown;
};

/**
 * Normalize a mouse, touch or pointer event -- native or React synthetic -- to
 * page/client coordinates. Returns null instead of throwing when the event
 * carries no usable coordinates.
 *
 * `changedTouches` is read before `touches` because `touches` is *empty* on
 * `touchend`; reading `touches[0]` there is what makes naive code throw on
 * every touch release.
 */
export function getEventCoords(event: any): PointerCoords | null {
  if (!event) return null;
  const e = event.nativeEvent || event;
  const touch =
    (e.changedTouches && e.changedTouches[0]) ||
    (e.touches && e.touches[0]) ||
    null;
  const source: CoordSource = touch || e;
  const {clientX, clientY} = source;
  if (typeof clientX !== "number" || typeof clientY !== "number") return null;
  const {pageX, pageY} = source;
  return {
    clientX,
    clientY,
    pageX: typeof pageX === "number" ? pageX : clientX + window.pageXOffset,
    pageY: typeof pageY === "number" ? pageY : clientY + window.pageYOffset,
  };
}

/** Distance in px a pointer may travel and still count as a tap. */
export const TAP_THRESHOLD = 3;

function capture(target: Element, pointerId: number) {
  try {
    if (typeof (target as any).setPointerCapture === "function") {
      target.setPointerCapture(pointerId);
    }
  } catch (err) {
    // Safe to ignore: the pointer may already be gone. Document-level
    // listeners still deliver the release.
  }
}

function releaseCapture(target: Element, pointerId: number) {
  try {
    if (
      typeof (target as any).hasPointerCapture === "function" &&
      target.hasPointerCapture(pointerId)
    ) {
      target.releasePointerCapture(pointerId);
    }
  } catch (err) {
    // Ignore -- capture was already released or the node is detached.
  }
}

export interface PointerDragHandlers {
  onMove?: (state: PointerDragState) => void;
  /** `cancelled` is true when the gesture ended via `pointercancel`. */
  onEnd?: (state: PointerDragState, cancelled: boolean) => void;
  /** Tap threshold in px. Defaults to {@link TAP_THRESHOLD}. */
  threshold?: number;
}

/**
 * Imperative drag core. Call this from inside a `pointerdown` handler; it
 * captures the pointer and wires move/up/cancel listeners *synchronously*, so
 * the immediate compat release that follows a touch tap can never be missed.
 *
 * Returns a function that tears the drag down without firing `onEnd`, for use
 * in unmount cleanup. Returns null when the event carries no coordinates.
 */
export function beginPointerDrag(
  event: any,
  {onMove, onEnd, threshold = TAP_THRESHOLD}: PointerDragHandlers,
): (() => void) | null {
  const coords = getEventCoords(event);
  if (!coords) return null;

  const native: PointerEvent = event.nativeEvent || event;
  const target: Element = (event.currentTarget || native.target) as Element;
  const pointerId = typeof native.pointerId === "number" ? native.pointerId : 1;
  const pointerType = native.pointerType || "mouse";

  let lastX = coords.clientX;
  let lastY = coords.clientY;
  let lastCoords = coords;
  let finished = false;

  const buildState = (
    next: PointerCoords,
    ev: PointerEvent,
  ): PointerDragState => {
    const totalDx = next.clientX - coords.clientX;
    const totalDy = next.clientY - coords.clientY;
    return {
      ...next,
      dx: next.clientX - lastX,
      dy: next.clientY - lastY,
      totalDx,
      totalDy,
      moved: Math.sqrt(totalDx * totalDx + totalDy * totalDy) > threshold,
      pointerType,
      event: ev,
    };
  };

  const detach = () => {
    document.removeEventListener("pointermove", handleMove);
    document.removeEventListener("pointerup", handleUp);
    document.removeEventListener("pointercancel", handleCancel);
    if (target) releaseCapture(target, pointerId);
  };

  const finish = (ev: PointerEvent, cancelled: boolean) => {
    if (finished) return;
    finished = true;
    detach();
    const next = getEventCoords(ev) || lastCoords;
    if (onEnd) onEnd(buildState(next, ev), cancelled);
  };

  function handleMove(ev: PointerEvent) {
    if (ev.pointerId !== pointerId) return;
    const next = getEventCoords(ev);
    if (!next) return;
    const state = buildState(next, ev);
    lastX = next.clientX;
    lastY = next.clientY;
    lastCoords = next;
    if (onMove) onMove(state);
  }
  function handleUp(ev: PointerEvent) {
    if (ev.pointerId !== pointerId) return;
    finish(ev, false);
  }
  function handleCancel(ev: PointerEvent) {
    if (ev.pointerId !== pointerId) return;
    finish(ev, true);
  }

  if (target) capture(target, pointerId);
  document.addEventListener("pointermove", handleMove);
  document.addEventListener("pointerup", handleUp);
  document.addEventListener("pointercancel", handleCancel);

  return () => {
    if (finished) return;
    finished = true;
    detach();
  };
}

export interface UsePointerDragOptions extends PointerDragHandlers {
  onStart?: (state: PointerDragState, event: React.PointerEvent) => void;
}

/**
 * Hook wrapper around {@link beginPointerDrag}. Spread the result onto the
 * draggable element and give that element `touch-action: none` in CSS.
 *
 * On unmount any in-flight drag is detached without firing `onEnd`, so an
 * unmounted component is never asked to update state.
 */
export function usePointerDrag(options: UsePointerDragOptions) {
  const optionsRef = React.useRef(options);
  optionsRef.current = options;
  const cancelRef = React.useRef<(() => void) | null>(null);

  const onPointerDown = React.useCallback((event: React.PointerEvent) => {
    // Primary button only -- right/middle click should not start a drag.
    if (event.button !== 0) return;
    if (event.isPrimary === false) return;
    if (cancelRef.current) return;

    const {onStart, onMove, onEnd, threshold} = optionsRef.current;
    const coords = getEventCoords(event);
    if (!coords) return;

    cancelRef.current = beginPointerDrag(event, {
      threshold,
      onMove: state => {
        const handler = optionsRef.current.onMove || onMove;
        if (handler) handler(state);
      },
      onEnd: (state, cancelled) => {
        cancelRef.current = null;
        const handler = optionsRef.current.onEnd || onEnd;
        if (handler) handler(state, cancelled);
      },
    });
    if (!cancelRef.current) return;

    if (onStart) {
      onStart(
        {
          ...coords,
          dx: 0,
          dy: 0,
          totalDx: 0,
          totalDy: 0,
          moved: false,
          pointerType:
            (event.nativeEvent as PointerEvent).pointerType || "mouse",
          event: event.nativeEvent as PointerEvent,
        },
        event,
      );
    }
  }, []);

  React.useEffect(
    () => () => {
      if (cancelRef.current) cancelRef.current();
      cancelRef.current = null;
    },
    [],
  );

  return {onPointerDown};
}

/**
 * Imperative press-and-hold core, for buttons that start something on press and
 * must stop it on release (hold-to-charge, hold-to-repeat).
 *
 * Call from a `pointerdown` handler. `onRelease` is invoked exactly once, on
 * `pointerup` *or* `pointercancel`. Returns a teardown function that suppresses
 * that call, for unmount cleanup.
 */
export function beginPointerHold(
  event: any,
  onRelease: () => void,
): () => void {
  const native: PointerEvent = event.nativeEvent || event;
  const target: Element = (event.currentTarget || native.target) as Element;
  const pointerId = typeof native.pointerId === "number" ? native.pointerId : 1;
  let finished = false;

  const detach = () => {
    document.removeEventListener("pointerup", handleUp);
    document.removeEventListener("pointercancel", handleUp);
    if (target) releaseCapture(target, pointerId);
  };

  function handleUp(ev: PointerEvent) {
    if (ev.pointerId !== pointerId) return;
    if (finished) return;
    finished = true;
    detach();
    onRelease();
  }

  if (target) capture(target, pointerId);
  document.addEventListener("pointerup", handleUp);
  document.addEventListener("pointercancel", handleUp);

  return () => {
    if (finished) return;
    finished = true;
    detach();
  };
}

/**
 * Hook wrapper around {@link beginPointerHold}. Spread the result onto the
 * button. `onStart` fires on press, `onEnd` exactly once on release.
 */
export function usePointerHold(
  onStart: (event: React.PointerEvent) => void,
  onEnd: () => void = () => {},
) {
  const handlersRef = React.useRef({onStart, onEnd});
  handlersRef.current = {onStart, onEnd};
  const cancelRef = React.useRef<(() => void) | null>(null);

  const onPointerDown = React.useCallback((event: React.PointerEvent) => {
    if (event.button !== 0) return;
    if (cancelRef.current) return;
    cancelRef.current = beginPointerHold(event, () => {
      cancelRef.current = null;
      handlersRef.current.onEnd();
    });
    handlersRef.current.onStart(event);
  }, []);

  React.useEffect(
    () => () => {
      if (cancelRef.current) cancelRef.current();
      cancelRef.current = null;
    },
    [],
  );

  return {onPointerDown};
}
