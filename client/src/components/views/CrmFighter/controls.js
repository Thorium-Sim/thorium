import React from "react";
import { Button } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";

const Controls = ({ id, clientId, phaserLevel, shieldRaised }) => {
  return (
    <div className="controls">
      <Button block color="warning" disabled={phaserLevel < 0.05}>
        Fire Phaser
      </Button>
      <Button block color="warning">
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
          <Button block color="info" onClick={action}>
            {shieldRaised ? "Lower" : "Raise"} Shields
          </Button>
        )}
      </Mutation>
      <Button block color="danger">
        Dock Viper
      </Button>
    </div>
  );
};
export default Controls;
