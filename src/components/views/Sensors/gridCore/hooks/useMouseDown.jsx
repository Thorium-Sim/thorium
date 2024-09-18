import React from "react";
import {SENSORS_OFFSET} from "../constants";

export function calculateDestination(
  clientPos,
  dimension,
  length,
  pageOffset,
  dimOffset,
) {
  const nonRelative = clientPos - dimension - dimOffset / 2;
  const zeroToOneScale = (nonRelative / length) * (length / pageOffset);
  const negativeOneToOne = (zeroToOneScale - 1 / 2) * 2;
  const offset = 0.24;

  return negativeOneToOne - offset;
}

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
  speed,
}) {
  const downMouseTime = React.useRef(Date.now());
  const [offset, setOffset] = React.useState(null);
  const immediateDragId = React.useRef();
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
          y: evt.clientY,
        });
      } else {
        triggerUpdate(speed);
        if (selectedContacts && selectedContacts.length) {
          setSelectedContacts(draggingContacts);
        }
      }
    };

    const mouseMove = e => {
      const {width: dimWidth, height: dimHeight} = dimensions;
      const {clientX, clientY} = e;
      const pageOffset = Math.min(dimWidth, dimHeight) - SENSORS_OFFSET;
      const dimOffset = Math.abs(dimWidth - dimHeight);
      const destination = {
        x:
          calculateDestination(
            clientX,
            dimensions.left,
            dimWidth,
            pageOffset,
            dimWidth > dimHeight ? dimOffset : 0,
          ) - offset.x,
        y:
          calculateDestination(
            clientY,
            dimensions.top,
            dimHeight,
            pageOffset,
            dimWidth < dimHeight ? dimOffset : 0,
          ) - offset.y,
        z: 0,
      };
      setDraggingContacts(contacts => {
        const contactDestination = contacts.find(
          c => c.id === immediateDragId.current,
        )?.destination;
        const destinationDiff = {
          x: destination.x - contactDestination.x,
          y: destination.y - contactDestination.y,
          z: destination.z - contactDestination.z,
        };
        return contacts.map(c => ({
          ...c,
          destination: {
            x: c.destination.x + destinationDiff.x,
            y: c.destination.y + destinationDiff.y,
            z: 0,
          },
        }));
      });
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
    triggerUpdate,
    offset,
  ]);
  function mouseDown(e, contact) {
    downMouseTime.current = Date.now();

    const {width: dimWidth, height: dimHeight} = dimensions;
    const {clientX, clientY} = e;
    setOffset({x: clientX, y: clientY});
    const pageOffset = Math.min(dimWidth, dimHeight) - SENSORS_OFFSET;
    const dimOffset = Math.abs(dimWidth - dimHeight);

    const destination = {
      x: calculateDestination(
        clientX,
        dimensions.left,
        dimWidth,
        pageOffset,
        dimWidth > dimHeight ? dimOffset : 0,
      ),
      y: calculateDestination(
        clientY,
        dimensions.top,
        dimHeight,
        pageOffset,
        dimWidth < dimHeight ? dimOffset : 0,
      ),
      z: 0,
    };

    const contactDestination = contact.destination;
    const destinationDiff = {
      x: destination.x - contactDestination.x,
      y: destination.y - contactDestination.y,
      z: destination.z - contactDestination.z,
    };
    setOffset(destinationDiff);
    setDraggingContacts(selectedContacts.concat(contact));
    immediateDragId.current = contact.id;
  }
  return [mouseDown];
}
