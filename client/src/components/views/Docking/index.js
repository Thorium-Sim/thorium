import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import { Clamps, Ramps, Doors, Legs } from "./graphics";
import Tour from "helpers/tourHelper";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

import "./style.scss";

const DOCKING_QUERY = gql`
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

const DOCKING_SUB = gql`
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

const Docking = ({ simulator, client, clientObj }) => {
  const [graphic, setGraphic] = React.useState(null);
  const [disabled, setDisabled] = React.useState(null);
  React.useEffect(() => {
    let timeout;
    if (disabled) {
      timeout = setTimeout(() => setDisabled(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [disabled]);

  const { loading, data, subscribeToMore } = useQuery(DOCKING_QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, DOCKING_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  const { simulators } = data;
  if (loading || !simulators) return null;
  const { ship } = simulators[0];

  const clamps = () => {
    setGraphic("clamps");
    setDisabled(true);
    const variables = {
      simulatorId: simulator.id,
      which: "clamps",
      state: !ship.clamps
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const ramps = () => {
    setGraphic("ramps");
    setDisabled(true);
    const variables = {
      simulatorId: simulator.id,
      which: "ramps",
      state: !ship.ramps
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const doors = () => {
    setGraphic("doors");
    setDisabled(true);

    const variables = {
      simulatorId: simulator.id,
      which: "airlock",
      state: !ship.airlock
    };
    client.mutate({
      mutation,
      variables
    });
  };
  const legs = () => {
    setGraphic("legs");
    setDisabled(true);
    const variables = {
      simulatorId: simulator.id,
      which: "legs",
      state: !ship.legs
    };
    client.mutate({
      mutation,
      variables
    });
  };

  return (
    <Container fluid className="docking">
      <Row>
        <Col sm={5}>
          <div className="flex">
            <Button
              disabled={disabled}
              block
              size="lg"
              className="clamps-button"
              color="primary"
              onClick={clamps}
            >
              {ship.clamps ? "Detach" : "Attach"} Docking Clamps
            </Button>
            <Button
              disabled={disabled}
              block
              size="lg"
              className="ramps-button"
              color="primary"
              onClick={ramps}
            >
              {ship.ramps ? "Retract" : "Extend"} Boarding Ramps
            </Button>
            <Button
              disabled={disabled}
              block
              size="lg"
              className="doors-button"
              color="primary"
              onClick={doors}
            >
              {ship.airlock ? "Close" : "Open"} Airlock Doors
            </Button>
            {simulators[0].hasLegs && (
              <Button
                disabled={disabled}
                block
                size="lg"
                className="legs-button"
                color="primary"
                onClick={legs}
              >
                {ship.legs ? "Retract" : "Extend"} Landing Legs
              </Button>
            )}
          </div>
        </Col>
        <Col className="graphics" sm={{ size: 5, offset: 2 }}>
          {graphic === "clamps" && <Clamps transform={ship.clamps} />}
          {graphic === "ramps" && <Ramps transform={ship.ramps} />}
          {graphic === "doors" && <Doors transform={ship.airlock} />}
          {graphic === "legs" && <Legs transform={ship.legs} />}
        </Col>
      </Row>
      <Tour steps={trainingSteps} client={clientObj} />
    </Container>
  );
};

const trainingSteps = [
  {
    selector: ".clamps-button",
    content:
      "Use this button to attach or detach docking clamps when you dock with a space station. These clamps will stabilize your ship for safe disembarking."
  },
  {
    selector: ".ramps-button",
    content:
      "Use this button to extend and retract the boarding ramps to allow crew and other visitors to enter and exit the ship."
  },
  {
    selector: ".doors-button",
    content:
      "Use this button to open and close the airlock doors, effectively sealing off your ship from space. Because space is a vacuum - totally empty, even of oxygen and other gases - leaving these doors open when you launch may lead to deadly consequences. It also may cause precious oxygen to disappear into the vacuum of space."
  }
];

export default withApollo(Docking);
