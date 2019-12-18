import React from "react";
import gql from "graphql-tag.macro";
import {useMutation} from "@apollo/react-hooks";
import {SENSORS_OFFSET, distance3d} from "../constants";

const CREATE_CONTACT = gql`
  mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
    createSensorContact(id: $id, contact: $contact)
  }
`;
export function useDragStart({id}, dimensions, addContact) {
  const [createContact] = useMutation(CREATE_CONTACT);
  const [movingContact, setMovingContact] = React.useState(null);
  const hasMovingContact = Boolean(movingContact);
  React.useEffect(() => {
    function dragMove(evt) {
      const {clientX, clientY} = evt;
      if (!hasMovingContact) return;
      setMovingContact(c => {
        const {width: dimWidth, height: dimHeight} = dimensions;
        const width = Math.min(dimWidth, dimHeight);
        const destination = {
          x:
            (clientX -
              dimensions.left +
              SENSORS_OFFSET / 2 -
              (width + SENSORS_OFFSET) / 2) /
              (dimensions.width / 2) -
            0.08,
          y:
            (clientY -
              dimensions.top +
              SENSORS_OFFSET / 2 -
              (width + SENSORS_OFFSET) / 2) /
              (dimensions.height / 2) -
            0.08,
          z: 0,
        };
        return c ? {...c, location: destination, destination} : null;
      });
    }
    function dragUp() {
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragUp);
      if (!hasMovingContact) return;
      setMovingContact(c => {
        const {location, type, size} = c;
        if (!location) return c;
        const distance = distance3d({x: 0, y: 0, z: 0}, location);
        const maxDistance = type === "planet" ? 2 + size / 2 : 2;
        if (distance > maxDistance) {
          return c;
        }
        const {id: contactId, ...contactVariables} = c;
        addContact({
          ...contactVariables,
          size: parseFloat(size),
          destination: location,
        });
        createContact({
          variables: {
            id,
            contact: {
              ...contactVariables,
              size: parseFloat(size),
              destination: location,
            },
          },
        });
        return null;
      });
    }

    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragUp);
    return () => {
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragUp);
    };
  }, [addContact, createContact, dimensions, hasMovingContact, id]);
  function dragStart(movingContact) {
    setMovingContact({type: "contact", ...movingContact, location: null});
  }
  return [dragStart, movingContact];
}
