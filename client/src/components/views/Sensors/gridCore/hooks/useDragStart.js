import React from "react";
import gql from "graphql-tag.macro";
import { useMutation } from "@apollo/react-hooks";
import { SENSORS_OFFSET, distance3d } from "../constants";

const CREATE_CONTACT = gql`
  mutation CreateContact($id: ID!, $contact: SensorContactInput!) {
    createSensorContact(id: $id, contact: $contact)
  }
`;
export function useDragStart({ id }, dimensions, addContact) {
  const [createContact] = useMutation(CREATE_CONTACT);
  const [movingContact, setMovingContact] = React.useState(null);
  React.useEffect(() => {
    function dragMove(evt) {
      if (!movingContact) return;
      const { width: dimWidth, height: dimHeight } = dimensions;
      const width = Math.min(dimWidth, dimHeight);
      const destination = {
        x:
          (evt.clientX -
            dimensions.left +
            SENSORS_OFFSET / 2 -
            (width + SENSORS_OFFSET) / 2) /
            (dimensions.width / 2) -
          0.08,
        y:
          (evt.clientY -
            dimensions.top +
            SENSORS_OFFSET / 2 -
            (width + SENSORS_OFFSET) / 2) /
            (dimensions.height / 2) -
          0.08,
        z: 0
      };
      setMovingContact(c => ({ ...c, location: destination, destination }));
    }
    function dragUp() {
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragUp);
      setMovingContact(null);
      if (!movingContact) return;
      const { location, type, size } = movingContact;
      if (!location) return;
      const distance = distance3d({ x: 0, y: 0, z: 0 }, location);
      const maxDistance = type === "planet" ? 2 + size / 2 : 2;
      if (distance > maxDistance) {
        return;
      }
      const { id: contactId, ...contactVariables } = movingContact;
      addContact({
        ...contactVariables,
        size: parseFloat(size),
        destination: location
      });
      createContact({
        variables: {
          id,
          contact: {
            ...contactVariables,
            size: parseFloat(size),
            destination: location
          }
        }
      });
    }

    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragUp);
    return () => {
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragUp);
    };
  }, [addContact, createContact, dimensions, id, movingContact]);
  function dragStart(movingContact) {
    setMovingContact({ type: "contact", ...movingContact, location: null });
  }
  return [dragStart, movingContact];
}
