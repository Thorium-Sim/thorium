import React from "react";

export function useMouseDown({
  dimensions,
  selectedContacts = [],
  setSelectedContacts,
  draggingContacts,
  setDraggingContacts,
  triggerUpdate,
  askForSpeed,
  speedAsking,
  setSpeedAsking,
  speed
}) {
  const downMouseTime = React.useRef(Date.now());

  React.useLayoutEffect(() => {
    const mouseUp = evt => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      const t = Date.now() - downMouseTime.current;
      if (downMouseTime.current && t < 200) {
        setSelectedContacts(draggingContacts);
        setDraggingContacts([]);
        return;
      }
      if (askForSpeed) {
        setSpeedAsking({
          x: evt.clientX,
          y: evt.clientY
        });
      } else {
        triggerUpdate(speed);
        if (selectedContacts && selectedContacts.length) {
          setSelectedContacts(draggingContacts);
        }
      }
    };

    const mouseMove = e => {
      const { width: dimWidth, height: dimHeight } = dimensions;
      const width = Math.min(dimWidth, dimHeight);
      const destinationDiff = {
        x: (e.movementX / width) * 2,
        y: (e.movementY / width) * 2,
        z: 0
      };
      setDraggingContacts(contacts =>
        contacts.map(c => ({
          ...c,
          destination: {
            x: c.destination.x + destinationDiff.x,
            y: c.destination.y + destinationDiff.y
          }
        }))
      );
    };
    if (draggingContacts && draggingContacts.length && !speedAsking) {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [
    askForSpeed,
    dimensions,
    draggingContacts,
    selectedContacts,
    setDraggingContacts,
    setSelectedContacts,
    setSpeedAsking,
    speed,
    speedAsking,
    triggerUpdate
  ]);
  function mouseDown(e, contact) {
    downMouseTime.current = Date.now();
    setDraggingContacts(selectedContacts.concat(contact));
  }
  return [mouseDown];
}
