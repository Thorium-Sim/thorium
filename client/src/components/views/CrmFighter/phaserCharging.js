import React, { useRef, useEffect, useState } from "react";
import { Button } from "reactstrap";
import useAnimationFrame from "helpers/hooks/useAnimationFrame";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

function useMouseHold(callback) {
  const activeRef = useRef(false);
  function mousedown(e) {
    activeRef.current = true;
  }
  function mouseup(e) {
    activeRef.current = false;
  }
  useAnimationFrame(() => {
    callback();
  }, activeRef.current);
  return { mousedown, mouseup };
}
const PhaserCharging = ({ id, clientId, phaserLevel = 0 }) => {
  const [phasers, setPhasers] = useState(phaserLevel);
  useEffect(() => {
    setPhasers(phaserLevel);
  }, [phaserLevel]);
  const { mousedown, mouseup } = useMouseHold(() => {
    setPhasers(p => Math.min(1, p + 0.003));
  });
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
      <Mutation
        mutation={gql`
          mutation PhaserCharge($id: ID!, $clientId: ID!, $phaser: Float!) {
            crmSetPhaserCharge(id: $id, clientId: $clientId, phaser: $phaser)
          }
        `}
      >
        {action => (
          <Button
            color="warning"
            onMouseDown={mousedown}
            onMouseUp={e => {
              mouseup(e);
              action({
                variables: {
                  id,
                  clientId,
                  phaser: phasers
                }
              });
            }}
          >
            Charge
          </Button>
        )}
      </Mutation>
    </div>
  );
};

export default PhaserCharging;
