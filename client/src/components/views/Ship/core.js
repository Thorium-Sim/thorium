import React from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import { InputField, OutputField } from "../../generic/core";
import { Input, Button } from "reactstrap";
import LayoutList from "../../layouts/list";
import debounce from "helpers/debounce";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

const layouts = LayoutList;

const fragment = gql`
  fragment ShipData on Simulator {
    id
    name
    layout
    training
    stepDamage
    verifyStep
    bridgeOfficerMessaging
    triggersPaused
    ship {
      bridgeCrew
      radiation
    }
  }
`;
const SHIP_CORE_SUB = gql`
  subscription ShipUpdate($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      ...ShipData
    }
  }
  ${fragment}
`;

const POP_SUB = gql`
  subscription Population($simulatorId: ID) {
    crewCountUpdate(simulatorId: $simulatorId, killed: false)
  }
`;
const SHIP_CORE_QUERY = gql`
  query Ship($simulatorId: ID!) {
    simulators(id: $simulatorId) {
      ...ShipData
    }
    crewCount(simulatorId: $simulatorId)
  }
  ${fragment}
`;
const updateRadiation = debounce((radiation, simulator, client) => {
  const mutation = gql`
    mutation SetRadiation($simulatorId: ID!, $radiation: Float!) {
      changeSimulatorRadiation(simulatorId: $simulatorId, radiation: $radiation)
    }
  `;
  const variables = {
    simulatorId: simulator.id,
    radiation
  };
  client.mutate({
    mutation,
    variables
  });
}, 500);
const ShipCore = ({ simulator, client }) => {
  const renameSimulator = name => {
    if (name) {
      const mutation = gql`
        mutation ChangeSimulatorName($id: ID!, $name: String!) {
          renameSimulator(simulatorId: $id, name: $name)
        }
      `;
      const variables = {
        id: simulator.id,
        name
      };
      client.mutate({
        mutation,
        variables
      });
    }
  };
  const changeSimulatorLayout = layout => {
    if (layout) {
      const mutation = gql`
        mutation ChangeSimulatorLayout($id: ID!, $layout: String!) {
          changeSimulatorLayout(simulatorId: $id, layout: $layout)
        }
      `;
      const variables = {
        id: simulator.id,
        layout
      };
      client.mutate({
        mutation,
        variables
      });
    }
  };
  const updateBridgeCrew = crew => {
    const mutation = gql`
      mutation SetBridgeCrew($simulatorId: ID!, $crew: Int!) {
        changeSimulatorBridgeCrew(simulatorId: $simulatorId, crew: $crew)
      }
    `;
    const variables = {
      simulatorId: simulator.id,
      crew
    };
    client.mutate({
      mutation,
      variables
    });
  };

  const startTraining = () => {
    const mutation = gql`
      mutation StartTraining($simulatorId: ID!) {
        trainingMode(simulatorId: $simulatorId)
      }
    `;
    const variables = {
      simulatorId: simulator.id
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const setStepDamage = e => {
    const mutation = gql`
      mutation SetStepDamage($simulatorId: ID!, $stepDamage: Boolean!) {
        setStepDamage(simulatorId: $simulatorId, stepDamage: $stepDamage)
      }
    `;
    const variables = {
      simulatorId: simulator.id,
      stepDamage: e.target.checked
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const setStepValidation = e => {
    const mutation = gql`
      mutation SetStepVerify($simulatorId: ID!, $verifyStep: Boolean!) {
        setVerifyDamage(simulatorId: $simulatorId, verifyStep: $verifyStep)
      }
    `;
    const variables = {
      simulatorId: simulator.id,
      verifyStep: e.target.checked
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const setBridgeOfficerMessaging = e => {
    const mutation = gql`
      mutation SetBridgeOfficerMessaging($id: ID!, $messaging: Boolean!) {
        setBridgeMessaging(id: $id, messaging: $messaging)
      }
    `;
    const variables = {
      id: simulator.id,
      messaging: e.target.checked
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const setTriggersPaused = e => {
    const mutation = gql`
      mutation SetTriggersPaused($simulatorId: ID!, $paused: Boolean!) {
        setSimulatorTriggersPaused(simulatorId: $simulatorId, paused: $paused)
      }
    `;
    const variables = {
      simulatorId: simulator.id,
      paused: e.target.checked
    };
    client.mutate({
      mutation,
      variables
    });
  };

  const { loading, data, subscribeToMore } = useQuery(SHIP_CORE_QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, SHIP_CORE_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  useSubscribeToMore(subscribeToMore, POP_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      crewCount: subscriptionData.data.crewCountUpdate
    })
  });

  if (loading || !data.simulators) return null;
  if (!data.simulators[0]) return;
  const {
    name,
    layout,
    training,
    stepDamage,
    verifyStep,
    bridgeOfficerMessaging,
    triggersPaused,
    ship
  } = data.simulators[0];
  const { crewCount } = data;
  const { bridgeCrew, radiation } = ship;

  return (
    <div className="core-ship">
      <p>Simulator Name: </p>
      <InputField
        prompt={"What would you like to change the simulator name to?"}
        onClick={renameSimulator}
      >
        {name}
      </InputField>
      <p>Layout: </p>
      <Input
        bsSize="sm"
        type="select"
        value={layout}
        onChange={evt => changeSimulatorLayout(evt.target.value)}
      >
        {layouts.map(l => (
          <option key={`layout-${l}`} value={l}>
            {l}
          </option>
        ))}
      </Input>
      <div>
        <label>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative"
            }}
            type="checkbox"
            checked={stepDamage}
            onChange={setStepDamage}
          />
          Step Damage Reports
        </label>
      </div>
      <div>
        <label>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative"
            }}
            type="checkbox"
            checked={verifyStep}
            onChange={setStepValidation}
          />
          Verify Damage Steps
        </label>
      </div>
      <div>
        <label>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative"
            }}
            type="checkbox"
            checked={triggersPaused}
            onChange={setTriggersPaused}
          />
          Triggers Paused
        </label>
      </div>
      <div>
        <label>
          <Input
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              position: "relative"
            }}
            type="checkbox"
            checked={bridgeOfficerMessaging}
            onChange={setBridgeOfficerMessaging}
          />
          Bridge Officer Messaging
        </label>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p>Bridge Crew: </p>
          <InputField
            prompt={"What would you like to change the bridge crew to?"}
            onClick={updateBridgeCrew}
          >
            {bridgeCrew}
          </InputField>
        </div>
        <div style={{ flex: 1 }}>
          <p>Roster Crew: </p>
          <OutputField>{crewCount}</OutputField>
        </div>
        <div style={{ flex: 1 }}>
          <p>Total Crew: </p>
          <OutputField>{crewCount + bridgeCrew}</OutputField>
        </div>
      </div>

      <p>Radiation: </p>
      <input
        type="range"
        defaultValue={radiation}
        min={0}
        max={1}
        step={0.01}
        onChange={evt =>
          updateRadiation(parseFloat(evt.target.value), simulator, client)
        }
      />
      <Button
        size="sm"
        color="warning"
        disabled={training}
        onClick={startTraining}
      >
        Start Training
      </Button>
    </div>
  );
};

export default withApollo(ShipCore);
