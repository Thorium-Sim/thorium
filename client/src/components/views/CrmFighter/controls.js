import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const Controls = ({
  id,
  clientId,
  phaserLevel,
  torpedoLoaded,
  shield,
  shieldRaised,
  targeted
}) => {
  return (
    <div className="controls">
      <Button block color="warning" disabled={phaserLevel < 0.05 || !targeted}>
        Fire Phaser
      </Button>
      <Button block color="warning" disabled={!torpedoLoaded || !targeted}>
        Fire Torpedo
      </Button>
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
      <Button block color="danger">
        Dock Fighter
      </Button>
    </div>
  );
};
export default Controls;
