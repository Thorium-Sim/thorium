import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { InputField } from "../../generic/core";
import { Input, Button } from "reactstrap";
import LayoutList from "../../layouts/list";

const layouts = LayoutList;

const SHIP_CORE_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      name
      layout
      training
      stepDamage
      verifyStep
      ship {
        bridgeCrew
        radiation
      }
    }
  }
`;

class ShipCore extends Component {
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: SHIP_CORE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  renameSimulator = name => {
    if (name) {
      const mutation = gql`
        mutation ChangeSimulatorName($id: ID!, $name: String!) {
          renameSimulator(simulatorId: $id, name: $name)
        }
      `;
      const variables = {
        id: this.props.simulator.id,
        name
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  changeSimulatorLayout = layout => {
    if (layout) {
      const mutation = gql`
        mutation ChangeSimulatorLayout($id: ID!, $layout: String!) {
          changeSimulatorLayout(simulatorId: $id, layout: $layout)
        }
      `;
      const variables = {
        id: this.props.simulator.id,
        layout
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
  };
  updateBridgeCrew = crew => {
    const mutation = gql`
      mutation SetBridgeCrew($simulatorId: ID!, $crew: Int!) {
        changeSimulatorBridgeCrew(simulatorId: $simulatorId, crew: $crew)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      crew
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateRadiation = radiation => {
    const mutation = gql`
      mutation SetRadiation($simulatorId: ID!, $radiation: Float!) {
        changeSimulatorRadiation(
          simulatorId: $simulatorId
          radiation: $radiation
        )
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      radiation
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  startTraining = () => {
    const mutation = gql`
      mutation StartTraining($simulatorId: ID!) {
        trainingMode(simulatorId: $simulatorId)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setStepDamage = e => {
    const mutation = gql`
      mutation SetStepDamage($simulatorId: ID!, $stepDamage: Boolean!) {
        setStepDamage(simulatorId: $simulatorId, stepDamage: $stepDamage)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      stepDamage: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  setStepValidation = e => {
    const mutation = gql`
      mutation SetStepVerify($simulatorId: ID!, $verifyStep: Boolean!) {
        setVerifyDamage(simulatorId: $simulatorId, verifyStep: $verifyStep)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      verifyStep: e.target.checked
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.simulators) return null;
    const simulator = this.props.data.simulators[0];
    const { name, layout, training, stepDamage, verifyStep } = simulator;
    const { bridgeCrew, radiation } = simulator.ship;
    return (
      <div className="core-ship">
        <p>Simulator Name: </p>
        <InputField
          prompt={"What would you like to change the simulator name to?"}
          onClick={this.renameSimulator}
        >
          {name}
        </InputField>
        <p>Layout: </p>
        <Input
          bsSize="sm"
          type="select"
          value={layout}
          onChange={evt => this.changeSimulatorLayout(evt.target.value)}
        >
          {layouts.map(l => (
            <option key={`layout-${l}`} value={l}>
              {l}
            </option>
          ))}
        </Input>
        <div>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative"
            }}
            type="checkbox"
            checked={stepDamage}
            onChange={this.setStepDamage}
          />
          Step Damage Reports{" "}
        </div>
        <div>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative"
            }}
            type="checkbox"
            checked={verifyStep}
            onChange={this.setStepValidation}
          />
          Verify Damage Steps
        </div>
        <p>Bridge Crew: </p>
        <InputField
          prompt={"What would you like to change the bridge crew to?"}
          onClick={this.updateBridgeCrew}
        >
          {bridgeCrew}
        </InputField>

        <p>Radiation: </p>
        <input
          type="range"
          value={radiation}
          min={0}
          max={1}
          step={0.01}
          onChange={evt => this.updateRadiation(evt.target.value)}
        />
        <Button
          size="sm"
          color="warning"
          disabled={training}
          onClick={this.startTraining}
        >
          Start Training
        </Button>
      </div>
    );
  }
}

const SHIP_CORE_QUERY = gql`
  query Ship($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      name
      layout
      training
      stepDamage
      verifyStep
      ship {
        bridgeCrew
        radiation
      }
    }
  }
`;
export default graphql(SHIP_CORE_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ShipCore));
