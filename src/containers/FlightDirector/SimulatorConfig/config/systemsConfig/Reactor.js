import React from "react";
import { Button } from "reactstrap";
import { GenericSystemConfig } from "./Generic";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Input, FormGroup, Label } from "reactstrap";

const ops = {
  addSystem: gql`
    mutation AddSystemToSimulator($id: ID!, $params: String = "{}") {
      addSystemToSimulator(
        simulatorId: $id
        className: "Reactor"
        params: $params
      )
    }
  `,
  removeSystem: gql`
    mutation RemoveSystem($id: ID) {
      removeSystemFromSimulator(systemId: $id)
    }
  `,
  updateOutput: gql`
    mutation UpdateReactorOutput($id: ID!, $output: Int!) {
      reactorChangeOutput(id: $id, output: $output)
    }
  `
};

const Reactor = ({ data, client, simulatorId, type }) => {
  const addReactor = model => {
    const mutation = ops.addSystem;
    const variables = {
      id: simulatorId,
      params: JSON.stringify({ model })
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Reactor"]
    });
  };
  const removeReactor = id => {
    const mutation = ops.removeSystem;
    const variables = {
      id
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Reactor"]
    });
  };
  const updateOutput = ({ id }, value) => {
    const mutation = ops.updateOutput;
    const variables = {
      id,
      output: value
    };
    client.mutate({
      mutation,
      variables,
      refetchQueries: ["Reactor"]
    });
  };
  if (data.loading) return null;
  const { reactors, decks } = data;
  return (
    <div className="reactor scroll">
      {reactors.map(e => (
        <div key={e.id}>
          <GenericSystemConfig
            client={client}
            simulatorId={simulatorId}
            type={type}
            data={{ systems: [e], decks }}
          >
            <div>
              <p>Model: {e.model}</p>
              {e.model === "reactor" && (
                <FormGroup>
                  <Label>
                    Reactor Output
                    <Input
                      type="number"
                      value={e.powerOutput}
                      onChange={evt => {
                        updateOutput(e, evt.target.value);
                      }}
                    />
                  </Label>
                </FormGroup>
              )}
              <Button
                color="danger"
                onClick={() => {
                  removeReactor(e.id);
                }}
              >
                Remove Reactor
              </Button>
            </div>
          </GenericSystemConfig>
        </div>
      ))}
      <Input
        color="primary"
        type="select"
        value="label"
        onChange={e => addReactor(e.target.value)}
      >
        <option value="label" disabled>
          Add Reactor
        </option>
        <option value="battery">Battery</option>
        <option value="reactor">Reactor</option>
      </Input>
    </div>
  );
};

const SYSTEM_QUERY = gql`
  query Reactor($id: ID, $deckId: ID!) {
    reactors(simulatorId: $id) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      model
      powerOutput
    }
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
      }
    }
  }
`;

export default graphql(SYSTEM_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulatorId,
      deckId: ownProps.simulatorId
    }
  })
})(Reactor);
