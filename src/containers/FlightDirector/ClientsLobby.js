import React from "react";
import Clients from "./Clients";
import SetsPicker from "./SetsPicker";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Tour from "reactour";

const ClientLobby = props => {
  const resetFlight = () => {
    const flightId = props.match.params.flightId;
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
    const flightId = props.match.params.flightId;
    if (
      window.confirm(
        `Are you sure you want to delete this flight?
It will permenantly erase all simulators running in this flight.`
      )
    ) {
      const mutation = gql`
        mutation DeleteFlight($flightId: ID!) {
          deleteFlight(flightId: $flightId)
        }
      `;
      const variables = {
        flightId
      };
      props.client
        .mutate({
          mutation,
          variables
        })
        .then(() => {
          props.history.push(`/`);
        });
    }
  };
  const trainingSteps = () => {
    return [
      {
        selector: ".nothing",
        content: (
          <span>
            This is the client lobby. Here, you can see all connected clients
            and assign them to their corresponding flight, simulator, and
            station.
          </span>
        )
      },
      {
        selector: ".delete-flight",
        content: (
          <span>
            When a flight is complete, click this button to delete the flight.
            All record of the flight will be eliminated.
          </span>
        )
      },
      {
        selector: ".reset-flight",
        content: (
          <span>
            This button will reset the flight to the state it was in when it was
            first created. This is helpful for resetting all of the controls
            after training mode.
          </span>
        )
      }
    ]
      .concat(SetsPicker.trainingSteps)
      .concat(Clients.trainingSteps)
      .concat({
        selector: ".move-on",
        content: (
          <span>
            Click this link to go to the core, where you can control the flight.
          </span>
        )
      });
  };
  return (
    <Container className="flight-lobby">
      <span>
        <h4>
          Flight Lobby{" "}
          <small>
            <Link to="/">Return to Main</Link>
          </small>
        </h4>
        <Button className="delete-flight" color="danger" onClick={deleteFlight}>
          Delete Flight
        </Button>
        <Button className="reset-flight" color="warning" onClick={resetFlight}>
          Reset Flight
        </Button>
        <h5 className="text-right">
          <Link
            to={`/config/flight/${props.match.params.flightId}/core`}
            className="move-on"
          >
            Go to Core
          </Link>
        </h5>
      </span>
      <SetsPicker {...props} />
      <Clients {...props} />
      <Tour
        steps={trainingSteps()}
        isOpen={props.training}
        onRequestClose={props.stopTraining}
      />
    </Container>
  );
};

export default withApollo(ClientLobby);
