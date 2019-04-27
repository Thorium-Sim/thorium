import React, { useState, useRef, useEffect } from "react";
import distance from "helpers/distance";
import { throttle } from "helpers/debounce";
import gql from "graphql-tag.macro";
function useDraggable(callback, upCallback = () => {}) {
  function mouseup() {
    document.removeEventListener("mouseup", mouseup);
    document.removeEventListener("mousemove", callback);
    upCallback();
  }
  function mousedown() {
    document.addEventListener("mouseup", mouseup);
    document.addEventListener("mousemove", callback);
  }
  useEffect(() => {
    return () => {
      document.removeEventListener("mouseup", mouseup);
      document.removeEventListener("mousemove", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return mousedown;
}
const Joystick = ({ client, id, clientId }) => {
  const radius = 200;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const updateVelocity = throttle(function updateVelocity(x, y) {
    const mutation = gql`
      mutation UpdateVelocity(
        $id: ID!
        $clientId: ID!
        $velocity: CoordinatesInput!
      ) {
        crmSetVelocity(id: $id, clientId: $clientId, velocity: $velocity)
      }
    `;
    const variables = {
      id,
      clientId,
      velocity: { x, y, z: 0 }
    };
    client.mutate({ mutation, variables });
  }, 1000 / 10);
  const [returning, setReturning] = useState(false);
  const parentRef = useRef();
  const mousedown = useDraggable(
    e => {
      const { clientX, clientY } = e;
      const {
        left,
        top,
        width,
        height
      } = parentRef.current.getBoundingClientRect();
      let x = clientX - left - width / 2;
      let y = clientY - top - height / 2;
      if (distance(undefined, { x, y }) > radius / 2) {
        const theta = Math.abs(Math.atan(y / x));
        if (x > 0) {
          x = (Math.cos(theta) * radius) / 2;
        } else {
          x = (Math.cos(theta) * -1 * radius) / 2;
        }
        if (y > 0) {
          y = (Math.sin(theta) * radius) / 2;
        } else {
          y = (Math.sin(theta) * -1 * radius) / 2;
        }
      }
      setPosition({
        x,
        y
      });
      updateVelocity((x / radius) * 10, (y / radius) * 10);
    },
    () => {
      setReturning(true);
      updateVelocity(0, 0);
    }
  );
  useEffect(() => {
    if (returning === true) {
      setPosition({ x: 0, y: 0 });
    }
  }, [returning]);
  return (
    <div className="joystick">
      <div className="inner-circle" ref={parentRef}>
        <div
          className={`joystick-handle ${returning ? "returning" : ""}`}
          onTransitionEnd={() => setReturning(false)}
          onMouseDown={mousedown}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        />
      </div>
    </div>
  );
};
export default Joystick;
