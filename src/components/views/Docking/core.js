import React from "react";
import gql from "graphql-tag.macro";
import {Container, Row, Col, Button} from "helpers/reactstrap";
import {withApollo} from "react-apollo";
import "./style.scss";
import {useQuery} from "@apollo/client";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";

export const DOCKING_CORE_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      hasLegs
      ship {
        clamps
        ramps
        airlock
        legs
      }
    }
  }
`;

const mutation = gql`
  mutation DockingChange($simulatorId: ID!, $which: String!, $state: Boolean!) {
    shipDockingChange(simulatorId: $simulatorId, which: $which, state: $state)
  }
`;
export const DOCKING_CORE_QUERY = gql`
  query Simulator($simulatorId: ID) {
    simulators(id: $simulatorId) {
      id
      hasLegs
      ship {
        clamps
        ramps
        airlock
        legs
      }
    }
  }
`;

const DockingCore = ({simulator, client}) => {
  const {loading, data, subscribeToMore} = useQuery(DOCKING_CORE_QUERY, {
    variables: {simulatorId: simulator.id},
  });
  const config = React.useMemo(
    () => ({
      variables: {simulatorId: simulator.id},
      updateQuery: (previousResult, {subscriptionData}) => ({
        ...previousResult,
        simulators: subscriptionData.data.simulatorsUpdate,
      }),
    }),
    [simulator.id],
  );
  useSubscribeToMore(subscribeToMore, DOCKING_CORE_SUB, config);
  if (loading || !data) return null;
  const {simulators} = data;
  const {ship} = simulators[0];

  const toggle = which => {
    const variables = {
      simulatorId: simulator.id,
      which: which,
      state: !ship[which],
    };
    client.mutate({
      mutation,
      variables,
    });
  };
  let colSize;
  if (simulators[0].hasLegs) {
    colSize = 3;
  } else {
    colSize = 4;
  }
  return (
    <Container className="docking-core">
      <Row>
        <Col sm={colSize}>
          <Button
            onClick={() => toggle("clamps")}
            size="sm"
            color={ship.clamps ? "danger" : "success"}
          >
            Clamps
          </Button>
        </Col>
        <Col sm={colSize}>
          <Button
            onClick={() => toggle("ramps")}
            size="sm"
            color={ship.ramps ? "danger" : "success"}
          >
            Ramps
          </Button>
        </Col>
        <Col sm={colSize}>
          <Button
            onClick={() => toggle("airlock")}
            size="sm"
            color={ship.airlock ? "danger" : "success"}
          >
            Doors
          </Button>
        </Col>
        {simulators[0].hasLegs && (
          <Col sm={colSize}>
            <Button
              onClick={() => toggle("legs")}
              size="sm"
              color={ship.legs ? "danger" : "success"}
            >
              Legs
            </Button>
          </Col>
        )}
      </Row>
      <small>
        Red means attached and docked; Green means detached and ready for space
        travel
      </small>
    </Container>
  );
};

export default withApollo(DockingCore);
