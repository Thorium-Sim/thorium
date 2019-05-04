import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

const Controls = ({
  id,
  clientId,
  phaserLevel,
  torpedoLoaded,
  shield,
  shieldRaised,
  targeted,
  center
}) => {
  const firePhaserBeam = (fire, stop) => () => {
    fire();
    function stopPhaser() {
      stop();
      document.removeEventListener("mouseup", stopPhaser);
    }
    document.addEventListener("mouseup", stopPhaser);
  };
  return (
    <div className="controls">
      <Mutation
        mutation={gql`
          mutation FirePhaser($id: ID!, $clientId: ID!, $targetId: ID!) {
            crmFirePhaser(id: $id, clientId: $clientId, target: $targetId)
          }
        `}
        variables={{ id, clientId, targetId: targeted }}
      >
        {fire => (
          <Mutation
            mutation={gql`
              mutation StopPhaser($id: ID!, $clientId: ID!) {
                crmStopPhaser(id: $id, clientId: $clientId)
              }
            `}
            variables={{ id, clientId }}
          >
            {stop => (
              <Button
                block
                color="warning"
                disabled={phaserLevel < 0.05 || !targeted}
                onMouseDown={firePhaserBeam(fire, stop)}
              >
                Fire Phaser
              </Button>
            )}
          </Mutation>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation FireTorpedo($id: ID!, $clientId: ID!, $target: ID!) {
            crmFireTorpedo(id: $id, clientId: $clientId, target: $target)
          }
        `}
        variables={{ id, clientId, target: targeted }}
      >
        {action => (
          <Button
            block
            color="warning"
            disabled={!torpedoLoaded || !targeted}
            onClick={action}
          >
            Fire Torpedo
          </Button>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation SetShields($id: ID!, $clientId: ID!, $shield: Boolean!) {
            crmSetShieldState(id: $id, clientId: $clientId, shield: $shield)
          }
        `}
        variables={{ id, clientId, shield: !shieldRaised }}
      >
        {action => (
          <Button block color="info" onClick={action} disabled={shield === 0}>
            {shieldRaised ? "Lower" : "Raise"} Shields
          </Button>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation Dock($id: ID!, $clientId: ID!) {
            crmSetFighterDocked(id: $id, clientId: $clientId, docked: true)
          }
        `}
        variables={{
          id,
          clientId
        }}
      >
        {action => (
          <Button
            block
            color="danger"
            disabled={
              distance3d({ x: 0, y: 0, z: 0 }, { ...center, z: 0 }) > 25
            }
            onClick={action}
          >
            Dock Fighter
          </Button>
        )}
      </Mutation>
    </div>
  );
};
export default Controls;
