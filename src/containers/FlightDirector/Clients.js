import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo, Query } from "react-apollo";
import moment from "moment";
import FontAwesome from "react-fontawesome";
import SubscriptionHelper from "../../helpers/subscriptionHelper";

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
    }
  }
`;

const ClientRow = ({ p, index, removeClient, select, flights, flightId }) => {
  const thisFlight = flights.find(f => f.id === flightId);
  return (
    <tr key={`flight-${p.id}-${index}`}>
      <td>
        <FontAwesome
          name="ban"
          className="text-danger remove-client"
          onClick={() => removeClient(p.id)}
        />{" "}
        {`${p.id}`}
      </td>
      <td>
        <select
          value={(p.flight && p.flight.id) || ""}
          onChange={e => select(p, "flight", e)}
          className="form-control-sm c-select flight-picker"
        >
          <option value="">Select a flight</option>
          {flights && (
            <optgroup label="This Flight">
              <option value={flightId}>
                {thisFlight.name}:{" "}
                {moment(thisFlight.date).format("MM/DD/YY hh:mma")}
              </option>
            </optgroup>
          )}
          <optgroup label="Other Flights">
            {flights ? (
              flights.filter(f => f.id !== flightId).map(f => {
                return (
                  <option key={`flight-${p.id}-${f.id}`} value={f.id}>
                    {`${f.name}: ${moment(f.date).format("MM/DD/YY hh:mma")}`}
                  </option>
                );
              })
            ) : (
              <option disabled>No Flights</option>
            )}
          </optgroup>
        </select>
      </td>
      <td>
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
      <td>
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
              <Query
                query={gql`
                  query Keyboards {
                    keyboard {
                      id
                      name
                    }
                  }
                `}
              >
                {({ loading, data: { keyboard } }) => {
                  if (loading || keyboard.length === 0) {
                    return null;
                  }
                  return (
                    <Fragment>
                      <option disabled>──────────</option>
                      <optgroup label="Keyboards">
                        {keyboard.map(k => (
                          <option key={k.id} value={`keyboard:${k.id}`}>
                            {k.name}
                          </option>
                        ))}
                        }}
                      </optgroup>
                    </Fragment>
                  );
                }}
              </Query>
            </Fragment>
          )}
        </select>
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
    let m = null;
    if (type === "flight") {
      m = "clientSetFlight(client: $client, flightId: $id)";
    }
    if (type === "simulator") {
      m = "clientSetSimulator(client: $client, simulatorId: $id)";
    }
    if (type === "station") {
      m = "clientSetStation(client: $client, stationName: $id)";
    }
    const mutation = gql`mutation UpdateClient($client: ID!, $id: ID!) {
    ${m} 
    }`;
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
            <table className="table table-striped table-hover table-sm client-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Flight</th>
                  <th>Simulator</th>
                  <th>Station</th>
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
                          />
                        ))}
                      <tr>
                        <td colSpan="4">
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
