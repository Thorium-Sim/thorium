import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "reactstrap";
import gql from "graphql-tag.macro";
import { graphql, withApollo, Mutation } from "react-apollo";
import { DateTime } from "luxon";
import { titleCase } from "change-case";
import FontAwesome from "react-fontawesome";
import SubscriptionHelper from "helpers/subscriptionHelper";

const FLIGHTS_SUB = gql`
  subscription FlightsSub {
    flightsUpdate {
      id
      name
      date
      running
      simulators {
        id
        name
        stations {
          name
        }
      }
    }
  }
`;

const CLIENT_CHANGE_QUERY = gql`
  subscription ClientChanged {
    clientChanged {
      id
      label
      mobile
      cards
      flight {
        id
        name
        date
        simulators {
          id
          name
        }
      }
      simulator {
        id
        name
        alertlevel
        layout
        interfaces
        stations {
          name
        }
      }
      station {
        name
      }
      loginName
      loginState
      training
      soundPlayer
    }
  }
`;
const Keyboards = ({ keyboards = [] }) => {
  if (keyboards.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <option disabled>──────────</option>
      <optgroup label="Keyboards">
        {keyboards.map(k => (
          <option key={k.id} value={`keyboard:${k.id}`}>
            {k.name}
          </option>
        ))}
      </optgroup>
    </Fragment>
  );
};
const Interfaces = ({ p, interfaces = [] }) => {
  if (!p.simulator) return null;
  const simInterfaces = p.simulator.interfaces
    .map(i => interfaces.find(ii => ii.id === i))
    .filter(Boolean);
  if (simInterfaces.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <option disabled>──────────</option>
      <optgroup label="Interfaces">
        {simInterfaces.map(i => (
          <option key={i.id} value={`interface-id:${i.id}`}>
            {i.name}
          </option>
        ))}
      </optgroup>
    </Fragment>
  );
};

const ClientRow = ({
  p,
  index,
  removeClient,
  select,
  flights,
  flightId,
  interfaces,
  keyboards
}) => {
  const thisFlight = flights.find(f => f.id === flightId);
  return (
    <tr key={`flight-${p.id}-${index}`}>
      <td>
        <FontAwesome
          name="ban"
          className="text-danger remove-client"
          onClick={() => removeClient(p.id)}
        />{" "}
        {p.label}
      </td>
      <td data-testid="flight-picker-cell">
        <select
          value={(p.flight && p.flight.id) || ""}
          onChange={e => select(p, "flight", e)}
          className="form-control-sm c-select flight-picker"
        >
          <option value="">Select a flight</option>
          {flights && (
            <optgroup label="This Flight">
              <option value={flightId}>{thisFlight.name}</option>
            </optgroup>
          )}
          <optgroup label="Other Flights">
            {flights ? (
              flights
                .filter(f => f.id !== flightId)
                .map(f => {
                  return (
                    <option key={`flight-${p.id}-${f.id}`} value={f.id}>
                      {`${f.name}: ${DateTime.fromJSDate(
                        new Date(f.date)
                      ).toFormat("M/d/y hh:mma")}`}
                    </option>
                  );
                })
            ) : (
              <option disabled>No Flights</option>
            )}
          </optgroup>
        </select>
      </td>
      <td data-testid="simulator-picker-cell">
        <select
          value={(p.simulator && p.simulator.id) || ""}
          onChange={e => select(p, "simulator", e)}
          className="form-control-sm c-select sim-picker"
        >
          <option value="">Select a simulator</option>
          {p.flight ? (
            p.flight.simulators.map(s => (
              <option key={`${p.id}-simulator-${s.id}`} value={s.id}>
                {s.name}
              </option>
            ))
          ) : (
            <option disabled>No Simulators</option>
          )}
        </select>
      </td>
      <td data-testid="station-picker-cell">
        {p.mobile ? (
          <select
            value={p.station && p.station.name}
            onChange={e => select(p, "station", e)}
            className="form-control-sm c-select station-picker"
          >
            <option value="">Select a screen</option>
            {p.cards
              .filter(c => c !== "Interfaces")
              .map(c => (
                <option key={`${p.id}-station-${c}`} value={c}>
                  {titleCase(c)}
                </option>
              ))}
            {p.cards.includes("Interfaces") && (
              <Interfaces p={p} interfaces={interfaces} />
            )}
          </select>
        ) : (
          <select
            value={(p.station && p.station.name) || ""}
            onChange={e => select(p, "station", e)}
            className="form-control-sm c-select station-picker"
          >
            <option value="">Select a station</option>
            {p.simulator ? (
              p.simulator.stations.map(s => (
                <option key={`${p.id}-station-${s.name}`} value={s.name}>
                  {s.name}
                </option>
              ))
            ) : (
              <option disabled>No Stations</option>
            )}
            {p.simulator && (
              <Fragment>
                <option disabled>──────────</option>
                <option value={"Viewscreen"}>Viewscreen</option>
                <option value={"Sound"}>Sound</option>
                <option value={"Blackout"}>Blackout</option>
                <Keyboards p={p} keyboards={keyboards} />
                <Interfaces p={p} interfaces={interfaces} />
              </Fragment>
            )}
          </select>
        )}
      </td>
      <td>
        {p.station &&
          (p.station.name.indexOf("keyboard") > -1 ||
            p.station.name === "Viewscreen") && (
            <Mutation
              mutation={gql`
                mutation SetSoundPlayer($id: ID!, $soundPlayer: Boolean!) {
                  clientSetSoundPlayer(client: $id, soundPlayer: $soundPlayer)
                }
              `}
            >
              {action => (
                <input
                  type="checkbox"
                  checked={p.soundPlayer}
                  onChange={e =>
                    action({
                      variables: { id: p.id, soundPlayer: e.target.checked }
                    })
                  }
                />
              )}
            </Mutation>
          )}
      </td>
    </tr>
  );
};
class Clients extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.flightsSub = null;
  }
  static trainingSteps = [
    {
      selector: ".client-table",
      content: (
        <span>
          This is the client table. All currently connected clients appear here.
          Clients that are either unassigned or assigned to this flight appear
          at the top. Clients assigned to another flight appear at the bottom.
          Be careful not to change clients assigned to other flights. That might
          cause problems for whoever is using that client.
        </span>
      )
    },
    {
      selector: ".remove-client",
      content: (
        <span>
          Click this button to remove a client. The client will always come back
          if it reconnects. To reconnect a client, just reopen the client or
          navigate the web browser to the client page.
        </span>
      )
    },
    {
      selector: ".flight-picker",
      content: (
        <span>
          Choose the flight you want to assign this client to with this
          dropdown. If the flight only has one simulator, the simulator dropdown
          will automatically be filled.
        </span>
      )
    },
    {
      selector: ".sim-picker",
      content: (
        <span>
          Choose the simulator you want to assign this client to with this
          dropdown.
        </span>
      )
    },
    {
      selector: ".station-picker",
      content: (
        <span>
          Choose the station you want to assign this client to with this
          dropdown. It is populated with the stations in the current station set
          of the selected simulator. It also has some special stations:{" "}
          <ul>
            <li>
              <strong>Viewscreen</strong> creates a viewscreen for this
              simulator.
            </li>
            <li>
              <strong>Sound</strong> turns the station into a dedicated sound
              player.
            </li>
            <li>
              <strong>Blackout</strong> blacks out the station - useful for when
              you don't want a client to be used during a flight.
            </li>
            <li>
              <strong>Keyboards</strong> make the station's keyboard activate
              keyboard macros.
            </li>
          </ul>
        </span>
      )
    }
  ];
  select = (p, type, e) => {
    let mutation = null;
    if (type === "flight") {
      mutation = gql`
        mutation UpdateClient($client: ID!, $id: ID!) {
          clientSetFlight(client: $client, flightId: $id)
        }
      `;
    }
    if (type === "simulator") {
      mutation = gql`
        mutation UpdateClient($client: ID!, $id: ID!) {
          clientSetSimulator(client: $client, simulatorId: $id)
        }
      `;
    }
    if (type === "station") {
      mutation = gql`
        mutation UpdateClient($client: ID!, $id: ID!) {
          clientSetStation(client: $client, stationName: $id)
        }
      `;
    }
    const obj = {
      client: p.id,
      id: e.target.value
    };
    this.props.client.mutate({
      mutation: mutation,
      variables: obj
    });
  };
  removeClient = id => {
    const mutation = gql`
      mutation DisconnectClient($client: ID!) {
        clientDisconnect(client: $client)
      }
    `;
    const variables = {
      client: id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading) return null;
    if (
      this.props.data.flights
        .map(f => f.id)
        .indexOf(this.props.match.params.flightId) === -1
    ) {
      this.props.history.push("/");
      return null;
    }
    const { keyboard, interfaces } = this.props.data;
    return (
      <Container>
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: CLIENT_CHANGE_QUERY,
              updateQuery: (previousResult, { subscriptionData }) => {
                const returnResult = Object.assign({}, previousResult);
                returnResult.clients = subscriptionData.data.clientChanged;
                return returnResult;
              }
            })
          }
        />
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: FLIGHTS_SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  flights: subscriptionData.data.flightsUpdate
                });
              }
            })
          }
        />
        <Row className="justify-content-md-center">
          <Col
            xs="12"
            style={{
              height: "60vh",
              overflowY: "scroll"
            }}
          >
            <h4>Clients</h4>
            <table className="table table-striped table-sm client-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Flight</th>
                  <th>Simulator</th>
                  <th>Station</th>
                  <th>Sound Player</th>
                </tr>
              </thead>
              <tbody>
                {!this.props.data.loading ? (
                  this.props.data.clients && (
                    <Fragment>
                      {this.props.data.clients
                        .filter(
                          p =>
                            p.flight === "" ||
                            p.flight === null ||
                            p.flight.id === this.props.match.params.flightId
                        )
                        .map((p, index) => (
                          <ClientRow
                            p={p}
                            key={p.id}
                            flightId={this.props.flightId}
                            index={index}
                            removeClient={this.removeClient}
                            select={this.select}
                            flights={this.props.data.flights}
                            interfaces={interfaces}
                            keyboards={keyboard}
                          />
                        ))}
                      <tr>
                        <td colSpan="5">
                          <strong>Clients Assigned to Other Flights</strong>
                        </td>
                      </tr>
                      {this.props.data.clients
                        .filter(p => {
                          return (
                            p.flight !== "" &&
                            p.flight !== null &&
                            p.flight.id !== this.props.match.params.flightId
                          );
                        })
                        .map((p, index) => (
                          <ClientRow
                            p={p}
                            key={p.id}
                            index={index}
                            removeClient={this.removeClient}
                            select={this.select}
                            flightId={this.props.flightId}
                            flights={this.props.data.flights}
                            interfaces={interfaces}
                            keyboards={keyboard}
                          />
                        ))}
                    </Fragment>
                  )
                ) : (
                  <tr />
                )}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    );
  }
}

const CLIENTS_QUERY = gql`
  query Clients {
    clients {
      id
      label
      mobile
      cards
      flight {
        id
        name
        date
        simulators {
          id
          name
        }
      }
      simulator {
        id
        name
        alertlevel
        layout
        interfaces
        stations {
          name
        }
      }
      station {
        name
      }
      loginName
      loginState
      training
      soundPlayer
    }
    interfaces {
      id
      name
    }
    keyboard {
      id
      name
    }
    flights {
      id
      name
      date
      running
      simulators {
        id
        name
        stations {
          name
        }
      }
    }
  }
`;

export default graphql(CLIENTS_QUERY)(withApollo(Clients));
