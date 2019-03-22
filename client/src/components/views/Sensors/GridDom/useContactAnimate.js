import { useState, useEffect, useRef, useLayoutEffect } from "react";

// function useAnimationFrame(callback, delay = 1000) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

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
  useEffect(() => {
    ref.current[0] = ref.current[1]
      ? { value: ref.current[1].value, time: new Date() }
      : {
          value,
          time: new Date(Date.now() + lerpTime)
        };
    ref.current[1] = { value, time: new Date(Date.now() + lerpTime) };
  }, [value]);
  return ref.current;
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
    const contactDimensions = dimensions.reduce(
      (prev, d) => ({
        ...prev,
        [d]:
          contact[d] && prevContact[d]
            ? axes.reduce(
                (aPrev, a) => ({
                  ...aPrev,
                  [a]: lerp(prevContact[d][a], contact[d][a], t)
                }),
                {}
              )
            : null
      }),
      {}
    );
    return {
      ...contact,
      ...contactDimensions
    };
  });
};

function contactLocation(c) {
  // Abort for certain speeds
  if (c.speed === 0) return c;

  const time = Date.now() + window.thorium.clockSync;
  const endTime = c.endTime || c.startTime + 1000;

  if (c.speed > 100 || endTime < time)
    return {
      ...c,
      location: c.destination,
      position: c.destination
    };

  const currentTime = time - c.startTime;
  const t = currentTime / (c.endTime - c.startTime);
  const position = axes.reduce(
    (prev, a) => ({
      ...prev,
      [a]: lerp(c.location[a], c.destination[a], t)
    }),
    {}
  );
  return { ...c, position };
}

function handleMovement(
  contacts,
  movement = { x: 0, y: 0, z: 0 },
  totalMovement = {}
) {
  const mConst = 100;
  return contacts.reduce((prev, c) => {
    const axesValue = axes.reduce(
      (prev, a) => ({ ...prev, [a]: c.locked ? 0 : movement[a] / mConst }),
      {}
    );
    return {
      ...prev,
      [c.id]: axesValue + (totalMovement[c.id] || 0)
    };
  }, {});
}

function contactMovement({ position, location, destination }, movement) {
  if (!movement) return null;
  return {
    position: position + movement,
    location: location + movement,
    destination: destination + movement
  };
}
// Takes in sensor contacts and properly animates them,
// including interpolating server values
export default function useContactAnimate(contacts = [], movement) {
  const [sContacts, setSContacts] = useState(contacts);
  // const [totalMovement, setTotalMovement] = useState({});
  // We have to have the last state to calculate the
  // interpolated state
  // If contacts updates, reset our movement state
  // useEffect(() => {
  //   console.log("resetting");
  //   setTotalMovement({});
  // }, [contacts]);

  const allContacts = usePrevious(contacts);
  useAnimationFrame(() => {
    const lerpedContacts = handleServerLerp(allContacts);
    // setTotalMovement(handleMovement(lerpedContacts, movement, totalMovement));
    const contactLocations = lerpedContacts.map(c => contactLocation(c));
    setSContacts(contactLocations);
  });
  return sContacts;
}
