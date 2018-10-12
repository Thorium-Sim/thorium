import React from "react";
import Clients from "./Clients";
import SetsPicker from "./SetsPicker";
import { Link } from "react-router-dom";
import { Container, Button, ButtonGroup } from "reactstrap";
import { withApollo, Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import Tour from "helpers/tourHelper";

const FlightQuery = gql`
  query Flight {
    flights {
      id
      running
    }
  }
`;

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
          resetFlight(flightId: $flightId, full: true)
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
      },
      {
        selector: ".pause-flight",
        content: (
          <span>
            Flights can be paused. This causes all of the background processes
            for the flight, such as reactor and engine heat, to stop so things
            don't overheat while the crew is taking a break.
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
    <Query
      query={FlightQuery}
      variables={{ flightId: props.match.params.flightId }}
    >
      {({ loading, data }) => {
        if (loading) return null;
        const flight = data.flights.find(
          f => f.id === props.match.params.flightId
        );
        if (!flight) return <div>Error loading flight...</div>;
        return (
          <Container className="flight-lobby">
            <span>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>
                  Flight Lobby{" "}
                  <small>
                    <Link to="/">Return to Main</Link>
                  </small>
                </h4>
                {!flight.running && (
                  <h3 className="text-warning text-center">Flight is paused</h3>
                )}
              </div>
              <ButtonGroup>
                <Button
                  className="delete-flight"
                  color="danger"
                  onClick={deleteFlight}
                >
                  Delete Flight
                </Button>
                <Button
                  className="reset-flight"
                  color="warning"
                  onClick={resetFlight}
                >
                  Reset Flight
                </Button>
                {flight.running ? (
                  <Mutation
                    mutation={gql`
                      mutation PauseFlight($flightId: ID!) {
                        pauseFlight(flightId: $flightId)
                      }
                    `}
                    variables={{ flightId: flight.id }}
                    refetchQueries={[
                      {
                        query: FlightQuery
                      }
                    ]}
                  >
                    {action => (
                      <Button
                        className="pause-flight"
                        color="info"
                        onClick={action}
                      >
                        Pause Flight
                      </Button>
                    )}
                  </Mutation>
                ) : (
                  <Mutation
                    mutation={gql`
                      mutation ResumeFlight($flightId: ID!) {
                        resumeFlight(flightId: $flightId)
                      }
                    `}
                    variables={{ flightId: flight.id }}
                    refetchQueries={[
                      {
                        query: FlightQuery
                      }
                    ]}
                  >
                    {action => (
                      <Button
                        className="pause-flight"
                        color="success"
                        onClick={action}
                      >
                        Resume Flight
                      </Button>
                    )}
                  </Mutation>
                )}
              </ButtonGroup>
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
            <Clients {...props} flightId={props.match.params.flightId} />
            <Tour
              steps={trainingSteps()}
              training={props.training}
              onRequestClose={props.stopTraining}
            />
          </Container>
        );
      }}
    </Query>
  );
};

export default withApollo(ClientLobby);
