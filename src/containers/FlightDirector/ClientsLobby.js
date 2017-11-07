import React from "react";
import Clients from "./Clients";
import SetsPicker from "./SetsPicker";
import { Link, browserHistory } from "react-router";
import { Container, Button } from "reactstrap";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const ClientLobby = props => {
  const resetFlight = () => {
    const flightId = props.params.flightId;
    if (
      window.confirm(
        `Are you sure you want to reset this flight?
All information in all simulators in this flight will be reset.`
      )
    ) {
      const mutation = gql`
        mutation ResetFlight($flightId: ID!) {
          resetFlight(flightId: $flightId)
        }
      `;
      const variables = {
        flightId
      };
      props.client.mutate({
        mutation,
        variables
      });
    }
  };
  const deleteFlight = () => {
    const flightId = props.params.flightId;
    if (
      window.confirm(
        `Are you sure you want to delete this flight?
It will permenantly erase all simulators running in this flight.`
      )
    ) {
      browserHistory.push("/");
      const mutation = gql`
        mutation DeleteFlight($flightId: ID!) {
          deleteFlight(flightId: $flightId)
        }
      `;
      const variables = {
        flightId
      };
      props.client.mutate({
        mutation,
        variables
      });
    }
  };
  return (
    <Container className="asset-config">
      <span>
        <h4>
          Flight Lobby{" "}
          <small>
            <Link to="/">Return to Main</Link>
          </small>
        </h4>
        <Button color="danger" onClick={deleteFlight}>
          Delete Flight
        </Button>
        <Button color="warning" onClick={resetFlight}>
          Reset Flight
        </Button>
        <h5 className="text-right">
          <Link to={`/flight/${props.params.flightId}/core`}>Go to Core</Link>
        </h5>
      </span>
      <SetsPicker {...props} />
      <Clients {...props} />
    </Container>
  );
};

export default withApollo(ClientLobby);
