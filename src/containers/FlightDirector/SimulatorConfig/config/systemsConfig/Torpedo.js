import React from "react";
import { Button } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const ops = {
  addSystem: gql`
    mutation AddSystemToSimulator($id: ID!) {
      addSystemToSimulator(simulatorId: $id, className: "Torpedo", params: "{}")
    }
  `,
  removeSystem: gql`
    mutation RemoveSystem($id: ID) {
      removeSystemFromSimulator(systemId: $id)
    }
  `
};

const Torpedo = ({ data, client, simulatorId, type }) => {
  const addTorpedo = () => {
    const mutation = ops.addSystem;
    const variables = {
      id: simulatorId
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Torpedo"]
    });
  };
  const removeTorpedo = id => {
    const mutation = ops.removeSystem;
    const variables = {
      id
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Torpedo"]
    });
  };
  if (data.loading) return null;
  const { torpedos } = data;
  return (
    <div className="torpedo scroll">
      {torpedos.map(e =>
        <div key={e.id}>
          <GenericSystemConfig
            client={client}
            simulatorId={simulatorId}
            type={type}
            data={{ systems: [e] }}
          >
            <div>
              <Button
                color="danger"
                onClick={() => {
                  removeTorpedo(e.id);
                }}
              >
                Remove Torpedo Launcher
              </Button>
            </div>
          </GenericSystemConfig>
        </div>
      )}
      <Button color="success" onClick={addTorpedo}>
        Add Torpedo Launcher
      </Button>
    </div>
  );
};

const SYSTEM_QUERY = gql`
  query Torpedo($id: ID) {
    torpedos(simulatorId: $id) {
      id
      name
      type
      power {
        power
        powerLevels
      }
    }
  }
`;

export default graphql(SYSTEM_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulatorId
    }
  })
})(Torpedo);
