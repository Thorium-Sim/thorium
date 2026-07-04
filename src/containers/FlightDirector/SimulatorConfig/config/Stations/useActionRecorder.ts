import React, {useState, useEffect, useRef, useCallback} from "react";
import {subscribe} from "helpers/pubsub";

interface UseActionRecorderParams {
  isOpen: boolean;
  existingActions: any[];
}

// How long the "Captured: …" flash stays on screen, in ms.
const FLASH_DURATION = 1500;

// Owns the list of recorded required actions for the Record Actions modal.
// Captures actions two ways: by subscribing to every server mutation-event
// while open, and via captureClick for direct clicks on the card preview.
// Exposes manual add/remove plus a transient "lastCaptured" flash value.
export function useActionRecorder({
  isOpen,
  existingActions,
}: UseActionRecorderParams) {
  const [recordedActions, setRecordedActions] =
    useState<any[]>(existingActions);
  const [lastCaptured, setLastCaptured] = useState<string | null>(null);
  const lastCapturedTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // Flash the just-captured action, replacing any pending flash.
  const flash = useCallback((eventName: string) => {
    setLastCaptured(eventName);
    if (lastCapturedTimeout.current) {
      clearTimeout(lastCapturedTimeout.current);
    }
    lastCapturedTimeout.current = setTimeout(
      () => setLastCaptured(null),
      FLASH_DURATION,
    );
  }, []);

  // Append an action unless one with the same eventName is already recorded.
  const recordUnique = useCallback((eventName: string, args: any) => {
    setRecordedActions(prev => {
      if (prev.find((a: any) => a.eventName === eventName)) {
        return prev;
      }
      return [...prev, {id: `ra-${Date.now()}`, eventName, args: args || null}];
    });
  }, []);

  // Reset to the chapter's existing actions each time the modal opens.
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setRecordedActions(existingActions);
    setLastCaptured(null);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Capture every server mutation-event as a recordable action while open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const unsubscribe = subscribe(
      "mutation-event",
      ({event, args}: {event: string; args: any}) => {
        if (
          event === "clockSync" ||
          event === "startFlight" ||
          event === "deleteFlight"
        ) {
          return;
        }
        recordUnique(event, args);
        flash(event);
      },
    );

    return () => {
      unsubscribe();
      if (lastCapturedTimeout.current) {
        clearTimeout(lastCapturedTimeout.current);
      }
    };
  }, [isOpen, recordUnique, flash]);

  // Capture a click on the card preview as a recordable action.
  const captureClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;

      // Walk up to find the closest interactive element
      const interactive = target.closest(
        "button, a, [role='button'], input, select, .btn",
      ) as HTMLElement | null;
      const el = interactive || target;

      const tag = el.tagName.toLowerCase();
      // Ignore clicks on generic containers
      if (
        ["div", "span", "col", "row", "container", "section"].includes(tag) &&
        !interactive
      ) {
        return;
      }

      const text =
        el.textContent?.trim().replace(/\s+/g, " ").substring(0, 60) ||
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        "";

      if (!text) {
        return;
      }

      const clickEventName = `click:${text}`;
      const clickArgs = {
        text,
        tag,
        className: el.className
          ? String(el.className)
              .split(" ")
              .filter(Boolean)
              .slice(0, 3)
              .join(" ")
          : null,
      };

      recordUnique(clickEventName, clickArgs);
      flash(clickEventName);
    },
    [recordUnique, flash],
  );

  const addAction = useCallback(
    (eventName: string) => {
      recordUnique(eventName, null);
    },
    [recordUnique],
  );

  const removeAction = useCallback((actionId: string) => {
    setRecordedActions(prev => prev.filter((a: any) => a.id !== actionId));
  }, []);

  return {
    recordedActions,
    lastCaptured,
    captureClick,
    addAction,
    removeAction,
  };
}
