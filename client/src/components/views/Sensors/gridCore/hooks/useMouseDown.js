import React from "react";

export function useMouseDown({
  dimensions,
  selectedContacts = [],
  setSelectedContacts,
  draggingContacts,
  setDraggingContacts,
  triggerUpdate,
  askForSpeed,
  setSpeedAsking,
  speed
}) {
  const downMouseTime = React.useRef(Date.now());
  React.useEffect(() => {
    const mouseUp = evt => {
      const t = Date.now() - downMouseTime.current;
      if (downMouseTime.current && t < 200) {
        setSelectedContacts(draggingContacts);
        return;
      }
      if (askForSpeed) {
        setSpeedAsking({
          x: evt.clientX,
          y: evt.clientY
        });
      } else {
        triggerUpdate(speed);
      }
    };

    const mouseMove = e => {
      if (!draggingContacts || draggingContacts.length === 0) return;
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

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, [
    askForSpeed,
    dimensions,
    draggingContacts,
    setDraggingContacts,
    setSelectedContacts,
    setSpeedAsking,
    speed,
    triggerUpdate
  ]);
  function mouseDown(e, contact) {
    setDraggingContacts(selectedContacts.concat(contact));
  }
  return [mouseDown];
}
