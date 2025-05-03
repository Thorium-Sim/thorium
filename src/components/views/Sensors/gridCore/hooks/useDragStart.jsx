import React from "react";
import gql from "graphql-tag.macro";
import {useMutation} from "@apollo/client";
import {distance3d, SENSORS_OFFSET} from "../constants";
import useEventListener from "helpers/hooks/useEventListener";
import {calculateDestination} from "./useMouseDown";

const CREATE_CONTACT = gql`
  mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
    createSensorContact(id: $id, contact: $contact)
  }
`;
export function useDragStart({id}, dimensions, addContact) {
  const [createContact] = useMutation(CREATE_CONTACT);
  const [movingContact, setMovingContact] = React.useState(null);
  const hasMovingContact = Boolean(movingContact);
  const mover = React.useRef({});

  const dragMove = React.useCallback(
    function dragMove(evt) {
      const {clientX, clientY} = evt;
      if (!hasMovingContact) return;
      setMovingContact(c => {
        const {width: dimWidth, height: dimHeight} = dimensions;
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
        mover.current = c
          ? {...c, location: destination, destination: destination}
          : null;
        return c
          ? {...c, location: destination, destination: destination}
          : null;
      });
    },
    [dimensions, hasMovingContact],
  );

  const dragUp = React.useCallback(
    function dragUp() {
      if (!hasMovingContact || Object.entries(mover.current).length === 0)
        return;

      setMovingContact(c => {
        const {location, type, size} = c;
        if (!location) return c;
        const distance = distance3d({x: 0, y: 0, z: 0}, location);
        const maxDistance = type === "planet" ? 2 + size / 2 : 2;
        if (distance > maxDistance) {
          return c;
        }
        return null;
      });
      // Remove contact ID so we don't create duplicates
      const {
        id: contactId,
        size,
        location,
        ...contactVariables
      } = mover.current;
      addContact({
        ...contactVariables,
        size: parseFloat(size),
        destination: location,
        location,
      });
      createContact({
        variables: {
          id,
          contact: {
            ...contactVariables,
            size: parseFloat(size),
            destination: location,
            location,
          },
        },
      });
    },
    [addContact, createContact, hasMovingContact, id],
  );

  useEventListener("mousemove", dragMove);
  useEventListener("mouseup", dragUp);

  function dragStart(movingContact) {
    setMovingContact({type: "contact", ...movingContact, location: null});
  }
  return [dragStart, movingContact];
}
