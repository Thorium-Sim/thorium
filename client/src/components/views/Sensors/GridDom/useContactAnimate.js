import { useState, useEffect, useRef, useLayoutEffect } from "react";

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  useLayoutEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback]
  );

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = useRef();
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

function usePrevious(value) {
  const ref = useRef([]);
  // Give it 1 second to lerp the values.
  const lerpTime = 1000;
  useEffect(
    () => {
      ref.current[0] = { value: ref.current[1], time: new Date() } || {
        value,
        time: new Date() + lerpTime
      };
      ref.current[1] = { value, time: new Date() + lerpTime };
    },
    [value]
  );
  return ref.current[0];
}

function lerp(v0, v1 = v0, t) {
  return v0 * (1 - t) + v1 * t;
}

const axes = ["x", "y", "z"];
const dimensions = ["destination", "location", "position"];

const handleServerLerp = ([
  { value: prevValue, time: prevTime },
  { value, time }
]) => {
  // If the times are the same, the values are the same. No need to interpolate.
  if (prevTime === time) return value;
  const t = (new Date() - prevTime) / (time - prevTime);
  return value.map(contact => {
    const prevContact = prevValue.find(c => c.id === contact.id);
    if (!prevContact) return contact;
    return {
      ...contact,
      ...dimensions.reduce((prev, d) => ({
        ...prev,
        [d]: axes.reduce(
          (aPrev, a) => ({
            ...aPrev,
            [a]: lerp(prevContact[d][a], contact[d][a], t)
          }),
          {}
        )
      }))
    };
  });
};

function handleMovement(c, movement = { x: 0, y: 0, z: 0 }) {
  const mConst = 100;
  const axesValue = axes.reduce(
    (prev, a) => ({ ...prev, [a]: c.locked ? 0 : movement[a] / mConst }),
    {}
  );
  const [destination, location, position] = dimensions.map(d => ({
    ...c[d],
    ...axes.reduce((prev, a) => ({ ...prev, [a]: c[d][a] + axesValue[a] }), {})
  }));
  return {
    ...c,
    destination,
    location,
    position
  };
}
function contactLocation(c, movement) {
  const movedC = handleMovement(c, movement);

  // Abort for certain speeds
  if (c.speed === 0) return movedC;

  const time = Date.now() + window.thorium.clockSync;
  const endTime = c.endTime || c.startTime + 1000;

  if (c.speed > 100 || endTime < time)
    return {
      ...movedC,
      location: movedC.destination,
      position: movedC.destination
    };

  const currentTime = time - c.startTime;
  const t = currentTime / (c.endTime - c.startTime);
  const position = axes.reduce(
    (prev, a) => ({
      ...prev,
      [a]: lerp(movedC.location[a], movedC.destination[a], t)
    }),
    {}
  );
  return { ...movedC, position };
}

// Takes in sensor contacts and properly animates them,
// including interpolating server values
export default function useContactAnimate(contacts = [], movement) {
  const [sContacts, setSContacts] = useState(contacts);
  // We have to have the last state to calculate the
  // interpolated state
  const allContacts = usePrevious(contacts);
  useAnimationFrame(() => {
    const lerpedContacts = handleServerLerp(allContacts);
    const contactLocations = lerpedContacts.map(c =>
      contactLocation(c, movement)
    );
    setSContacts(contactLocations);
  });
  return sContacts;
}
