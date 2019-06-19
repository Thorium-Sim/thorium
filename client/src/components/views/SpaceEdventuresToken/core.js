import React, { useRef, useEffect } from "react";
import { Query, Mutation } from "react-apollo";
import { Table, Button } from "reactstrap";
import gql from "graphql-tag.macro";
import "./style.scss";
import Printable from "helpers/printable";
import useQrCode from "react-qrcode-hook";
import { ReactComponent as Logo } from "./logo-black.svg";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Flyer = ({ station: { name, token, userId }, simulator, loginName }) => {
  const qrCode = useQrCode(`https://spaceedventures.org/redeem?token=${token}`);
  // If there is a UserId already, no need to print a flyer.
  if (userId) return null;
  return (
    <div className="space-edventures-flyer">
      <Logo style={{ height: "100px" }} />
      <h2>{loginName}</h2>

      <p>
        This signifies that on {new Date().toLocaleDateString()} you completed a
        flight on the following simulator and station:
      </p>
      <h2>
        {simulator.name}: {name}
      </h2>
      <p>
        Add this flight to your rank by going to{" "}
        <u>https://spaceedventures.org/redeem</u> and typing in the following
        redemption code or scanning the QR code:
      </p>
      <div className="token">
        <h2>{token}</h2>
        <img src={qrCode} alt="qr code" />
      </div>
    </div>
  );
};

const FLIGHT_QUERY = gql`
  query Flight($flightId: ID!, $simulatorId: ID!) {
    flights(id: $flightId) {
      id
      flightType
      clients {
        id
        name
        token
        email
      }
    }
    clients(simulatorId: $simulatorId) {
      id
      loginName
      station {
        name
      }
      token
      email
    }
  }
`;
const Refetch = ({ refetch }) => {
  useInterval(refetch, 1000);
  return null;
};
const SpaceEdventuresTokenCore = ({ flightId, simulator }) => {
  const transmit = action => () => {
    if (
      window.confirm(`Are you sure you want to transmit this flight's information to SpaceEdVentures.org? 
This can only be done once per flight and should only be done when the flight is complete.`)
    ) {
      action();
    }
  };
  const addCrew = action => () => {
    const name = window.prompt(
      "What is the name of the extra crew member?",
      "Captain"
    );
    if (name) {
      action({ variables: { flightId, simulatorId: simulator.id, name } });
    }
  };
  return (
    <Query
      query={FLIGHT_QUERY}
      variables={{ flightId, simulatorId: simulator.id }}
    >
      {({ loading, data, refetch }) => {
        if (loading || !data) return null;
        const clients = data.clients;
        const flight = data.flights[0];
        if (!flight.flightType && !flight.clients)
          return (
            <p>
              This flight has either been transmitted without any crew records
              or it is not a Space EdVentures flight. Make sure your Space
              EdVentures token is valid and you select a flight type when
              starting the flight. Also make sure you let the crew log into
              their stations before transmitting data.
            </p>
          );
        return (
          <div>
            <Refetch refetch={refetch} />
            <Mutation
              mutation={gql`
                mutation TriggerAction(
                  $action: String!
                  $simulatorId: ID!
                  $stationName: String
                  $message: String
                  $voice: String
                ) {
                  triggerAction(
                    action: $action
                    simulatorId: $simulatorId
                    stationId: $stationName
                    message: $message
                    voice: $voice
                  )
                }
              `}
              variables={{
                action: "spaceEdventuresToken",
                simulatorId: simulator.id,
                stationName: "all"
              }}
            >
              {action => (
                <Button color="warning" size="sm" onClick={action}>
                  Go to Token Screen
                </Button>
              )}
            </Mutation>
            {flight.flightType ? (
              <Mutation
                mutation={gql`
                  mutation TransmitFlight($flightId: ID!) {
                    assignSpaceEdventuresFlightRecord(flightId: $flightId)
                  }
                `}
                variables={{ flightId }}
                refetchQueries={[
                  {
                    query: FLIGHT_QUERY
                  }
                ]}
              >
                {(action, { loading }) =>
                  !loading && (
                    <Button color="dark" size="sm" onClick={transmit(action)}>
                      Transmit to Space EdVentures
                    </Button>
                  )
                }
              </Mutation>
            ) : (
              "Transmitted"
            )}
            <Button size="sm" color="info" onClick={() => window.print()}>
              Print Crew Flyers
            </Button>
            <Table size="sm" responsive>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Station</th>
                  <th>Token</th>
                  <th>Email Added</th>
                </tr>
              </thead>
              <tbody>
                {flight.clients
                  .map(c => clients.find(cc => cc.id === c.id) || c)
                  .map(c => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.name || c.station.name}</td>
                      <td>{c.token}</td>
                      <td>{c.email ? "✅" : "🚫"}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <p>
              <small>
                Clients must be logged in to be included in Space EdVentures
              </small>
            </p>
            <Mutation
              mutation={gql`
                mutation AddExtraCrew(
                  $flightId: ID!
                  $simulatorId: ID!
                  $name: String!
                ) {
                  clientAddExtra(
                    flightId: $flightId
                    simulatorId: $simulatorId
                    name: $name
                  )
                }
              `}
            >
              {action => (
                <Button size="sm" color="success" onClick={addCrew(action)}>
                  Add Extra Crew Member
                </Button>
              )}
            </Mutation>
            <Printable>
              <div className="flyer-container">
                {flight.clients
                  .map(c => clients.find(cc => cc.id === c.id) || c)
                  .map(c => (
                    <Flyer
                      key={c.id}
                      simulator={simulator}
                      loginName={c.loginName}
                      station={c.station ? { ...c.station, ...c } : c}
                    />
                  ))}
              </div>
            </Printable>
          </div>
        );
      }}
    </Query>
  );
};

export default SpaceEdventuresTokenCore;
