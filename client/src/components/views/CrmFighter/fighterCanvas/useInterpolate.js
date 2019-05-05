import { useRef, useEffect, useState } from "react";
import usePrevious from "helpers/hooks/usePrevious";
import useAnimationFrame from "helpers/hooks/useAnimationFrame";

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

export default function useInterpolate(inputs, interval) {
  const [contacts, setContacts] = useState(inputs);
  const endTime = useRef(Date.now() + interval);
  const previousInputs = usePrevious(inputs);
  const inputsRef = useRef(inputs);
  useEffect(() => {
    endTime.current = Date.now() + interval;
    inputsRef.current = inputs;
  }, [inputs, interval]); // eslint-disable-line react-hooks/exhaustive-deps

  useAnimationFrame(() => {
    let t = Math.max(
      0,
      Math.min(1, Math.abs(1 - (endTime.current - Date.now()) / interval))
    );
    const contactIds = contacts.map(c => c.id);
    const inputObj = inputsRef.current.reduce(
      (acc, c) => ({ ...acc, [c.id]: c }),
      {}
    );
    const previousInputObj = previousInputs.reduce(
      (acc, c) => ({ ...acc, [c.id]: c }),
      {}
    );
    const inputIds = Object.keys(inputObj);
    const newContacts = inputsRef.current.filter(
      ({ id }) => contactIds.indexOf(id) === -1
    );
    const filteredContacts = contacts
      .filter(({ id }) => inputIds.indexOf(id) > -1)
      .map(c => {
        if (!previousInputObj[c.id] || !inputObj[c.id]) return null;
        return {
          ...c,
          ...inputObj[c.id],
          position: {
            x: lerp(
              previousInputObj[c.id].position.x,
              inputObj[c.id].position.x,
              t
            ),
            y: lerp(
              previousInputObj[c.id].position.y,
              inputObj[c.id].position.y,
              t
            )
          }
        };
      })
      .filter(Boolean);
    setContacts(newContacts.concat(filteredContacts));
  });
  return contacts;
}
