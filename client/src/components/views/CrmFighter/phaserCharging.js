import React, { useRef, useEffect, useState } from "react";
import { Button } from "helpers/reactstrap";
import useAnimationFrame from "helpers/hooks/useAnimationFrame";
import { withApollo } from "react-apollo";
import gql from "graphql-tag.macro";

function useMouseHold(callback, mouseupCallback = () => {}) {
  const activeRef = useRef(false);
  function mouseup(e) {
    activeRef.current = false;
    document.removeEventListener("mouseup", mouseup);
    mouseupCallback();
  }

  function mousedown(e) {
    activeRef.current = true;
    document.addEventListener("mouseup", mouseup);
  }
  useAnimationFrame(delta => {
    callback(delta);
  }, activeRef.current);

  return { mousedown };
}
const PhaserCharging = ({ id, clientId, client, phaserLevel = 0 }) => {
  const [phasers, setPhasers] = useState(phaserLevel);
  const phaserRef = useRef(phaserLevel);
  useEffect(() => {
    setPhasers(phaserLevel);
    phaserRef.current = phaserLevel;
  }, [phaserLevel]);

  function updatePhasers() {
    client.mutate({
      mutation: gql`
        mutation PhaserCharge($id: ID!, $clientId: ID!, $phaser: Float!) {
          crmSetPhaserCharge(id: $id, clientId: $clientId, phaser: $phaser)
        }
      `,
      variables: {
        id,
        clientId,
        phaser: phaserRef.current
      }
    });
  }
  const { mousedown } = useMouseHold(delta => {
    setPhasers(p => {
      phaserRef.current = Math.min(1, p + delta / (5 * 1000));
      return Math.min(1, p + delta / (5 * 1000));
    });
  }, updatePhasers);
  return (
    <div className="phaser-charging">
      <p>Phaser Charging</p>
      <div className="charge-holder">
        <div
          className="charge-bar"
          style={{
            height: `${phasers * 100}%`,
            top: `${(1 - phasers) * 100}%`
          }}
        />
      </div>

      <Button color="warning" onMouseDown={mousedown}>
        Charge
      </Button>
    </div>
  );
};

export default withApollo(PhaserCharging);
