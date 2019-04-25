import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import { FormattedMessage } from "react-intl";
import Tour from "helpers/tourHelper";

const trainingSteps = [
  {
    selector: ".blank",
    content: (
      <FormattedMessage
        id="crm-training-1"
        defaultMessage="The CRM is an automated fighter system that can be controlled by any of the stations on the bridge. This screen allows you to activate the CRM system on those stations."
      />
    )
  },
  {
    selector: ".station-list",
    content: (
      <FormattedMessage
        id="crm-training-2"
        defaultMessage="To choose the stations you want to activate the CRM on, click on the name of the station in this list to toggle it on or off."
      />
    )
  },
  {
    selector: ".select-all-stations",
    content: (
      <FormattedMessage
        id="crm-training-3"
        defaultMessage="Click this button to select all of the stations."
      />
    )
  },
  {
    selector: ".activate-crm",
    content: (
      <FormattedMessage
        id="crm-training-4"
        defaultMessage="Click this button to activate the CRM on the selected stations."
      />
    )
  }
];

function lerp(v0, v1, t) {
  return v0 * (1 - t) + v1 * t;
}

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]); // eslint-disable-line react-hooks/exhaustive-deps

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = useRef();
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [loop]);
};
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef([value]);

  // Store current value in ref
  useEffect(() => {
    ref.current.unshift(value);
    ref.current = ref.current.slice(0, 2);
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current[1] || ref.current[0];
}

function useInterpolate(enemies, interval) {
  const [contacts, setContacts] = useState(enemies);
  const endTime = useRef(Date.now() + interval);
  const previousEnemies = usePrevious(enemies);
  const enemiesRef = useRef(enemies);
  useEffect(() => {
    endTime.current = Date.now() + interval;
    enemiesRef.current = enemies;
  }, [enemies, interval]); // eslint-disable-line react-hooks/exhaustive-deps

  useAnimationFrame(() => {
    let t = Math.max(
      0,
      Math.min(1, Math.abs(1 - (endTime.current - Date.now()) / interval))
    );
    const contactIds = contacts.map(c => c.id);
    const enemyObj = enemiesRef.current.reduce(
      (acc, c) => ({ ...acc, [c.id]: c }),
      {}
    );
    const previousEnemyObj = previousEnemies.reduce(
      (acc, c) => ({ ...acc, [c.id]: c }),
      {}
    );
    const enemyIds = Object.keys(enemyObj);
    const newContacts = enemiesRef.current.filter(
      ({ id }) => contactIds.indexOf(id) === -1
    );
    const filteredContacts = contacts
      .filter(({ id }) => enemyIds.indexOf(id) > -1)
      .map(c => {
        return {
          ...c,
          position: {
            x: lerp(
              previousEnemyObj[c.id].position.x,
              enemyObj[c.id].position.x,
              t
            ),
            y: lerp(
              previousEnemyObj[c.id].position.y,
              enemyObj[c.id].position.y,
              t
            )
          }
        };
      });
    setContacts(newContacts.concat(filteredContacts));
  });
  return contacts;
}
const Crm = ({ enemies, interval, clientObj }) => {
  const contacts = useInterpolate(enemies, interval);
  return (
    <div className="card-crm-fighter">
      <div className="fighter-canvas">
        {contacts.map(e => (
          <div
            key={e.id}
            className="enemy-outer"
            style={{
              transform: `translate(${e.position.x / (1000 / 50) + 50}%,${e
                .position.y /
                (1000 / 50) +
                50}%)`
            }}
          >
            <div className="enemy-inner" />
          </div>
        ))}
      </div>
      <Tour steps={trainingSteps} client={clientObj} />
    </div>
  );
};
export default Crm;
