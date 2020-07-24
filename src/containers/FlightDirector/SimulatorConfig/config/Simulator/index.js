import React from "react";
import {Button, ButtonGroup} from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import {withApollo} from "react-apollo";
import Misc from "./misc";
import Basic from "./basic";
import Damage from "./damage";
import {useNavigate, Routes, Route, useMatch} from "react-router-dom";
import {useApolloClient} from "@apollo/client";

const ops = {
  name: gql`
    mutation ChangeName($id: ID!, $value: String!) {
      renameSimulator(simulatorId: $id, name: $value)
    }
  `,
  layout: gql`
    mutation ChangeLayout($id: ID!, $value: String!) {
      changeSimulatorLayout(simulatorId: $id, layout: $value)
    }
  `,
  alertLevel: gql`
    mutation ChangeAlert($id: ID!, $value: String!) {
      changeSimulatorAlertLevel(simulatorId: $id, alertLevel: $value)
    }
  `,
  exocomps: gql`
    mutation ChangeExocomps($id: ID!, $value: Int!) {
      changeSimulatorExocomps(simulatorId: $id, exocomps: $value)
    }
  `,
  stepDamage: gql`
    mutation SetStepDamage($id: ID!, $value: Boolean!) {
      setStepDamage(simulatorId: $id, stepDamage: $value)
    }
  `,
  verifyStep: gql`
    mutation SetVerify($id: ID!, $value: Boolean!) {
      setVerifyDamage(simulatorId: $id, verifyStep: $value)
    }
  `,
  setBridgeMessaging: gql`
    mutation SetBridgeOfficerMessaging($id: ID!, $value: Boolean!) {
      setBridgeMessaging(id: $id, messaging: $value)
    }
  `,
  changeCaps: gql`
    mutation SetCaps($id: ID!, $value: Boolean!) {
      changeSimulatorCaps(simulatorId: $id, caps: $value)
    }
  `,
  hasPrinter: gql`
    mutation SetHasPrinter($id: ID!, $value: Boolean!) {
      setSimulatorHasPrinter(simulatorId: $id, hasPrinter: $value)
    }
  `,
  hasLegs: gql`
    mutation SetHasLegs($id: ID!, $value: Boolean!) {
      setSimulatorHasLegs(simulatorId: $id, hasLegs: $value)
    }
  `,
  spaceEdventures: gql`
    mutation SetSpaceEdventuresId($id: ID!, $value: String!) {
      setSimulatorSpaceEdventuresId(simulatorId: $id, spaceEdventuresId: $value)
    }
  `,
};
const SimulatorConfigView = ({selectedSimulator}) => {
  const {
    params: {selected},
  } = useMatch("/config/simulator/:simulatorId/Simulator/:selected/*") || {
    params: {},
  };

  const navigate = useNavigate();
  const client = useApolloClient();
  function select(prop) {
    navigate(prop);
  }
  const handleChange = e => {
    const variables = {
      id: selectedSimulator.id,
      value: e.target.value === "on" ? e.target.checked : e.target.value,
    };
    const mutation = ops[e.target.name];
    client.mutate({
      mutation,
      variables,
    });
  };
  return (
    <div>
      <ButtonGroup>
        <Button
          size="sm"
          active={selected === "default" || selected === ""}
          onClick={() => select("default")}
        >
          Basic
        </Button>
        <Button
          size="sm"
          active={selected === "misc"}
          onClick={() => select("misc")}
        >
          Misc.
        </Button>
        <Button
          size="sm"
          active={selected === "damage"}
          onClick={() => select("damage")}
        >
          Damage Reports
        </Button>
      </ButtonGroup>
      <Routes>
        <Route
          path="/"
          element={
            <Basic
              selectedSimulator={selectedSimulator}
              handleChange={handleChange}
            />
          }
        ></Route>
        <Route
          path="default"
          element={
            <Basic
              selectedSimulator={selectedSimulator}
              handleChange={handleChange}
            />
          }
        ></Route>
        <Route
          path="damage/*"
          element={
            <Damage
              selectedSimulator={selectedSimulator}
              handleChange={handleChange}
            />
          }
        />
        <Route
          path="misc"
          element={
            <Misc
              selectedSimulator={selectedSimulator}
              handleChange={handleChange}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default withApollo(SimulatorConfigView);
