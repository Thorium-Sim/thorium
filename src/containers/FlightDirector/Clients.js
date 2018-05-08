import React, { Component, Fragment } from "react";
import { Col, Row, Container } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo, Query } from "react-apollo";
import moment from "moment";
import FontAwesome from "react-fontawesome";
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

const ClientRow = ({ p, index, removeClient, select, flights }) => {
  return (
    <tr key={`flight-${p.id}-${index}`}>
      <td>
        <FontAwesome
          name="ban"
          className="text-danger"
          onClick={() => removeClient(p.id)}
        />{" "}
        {`${p.id}`}
      </td>
      <td>
        <select
          value={(p.flight && p.flight.id) || ""}
          onChange={e => select(p, "flight", e)}
          className="form-control-sm c-select"
        >
          <option value="">Select a flight</option>
          {flights ? (
            flights.map(f => {
              return (
                <option key={`flight-${p.id}-${f.id}`} value={f.id}>
                  {`${f.name}: ${moment(f.date).format("MM/DD/YY hh:mma")}`}
                </option>
              );
            })
          ) : (
            <option disabled>No Flights</option>
          )}
        </select>
      </td>
      <td>
        <select
          value={(p.simulator && p.simulator.id) || ""}
          onChange={e => select(p, "simulator", e)}
          className="form-control-sm c-select"
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
          className="form-control-sm c-select"
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
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: CLIENT_CHANGE_QUERY,
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Object.assign({}, previousResult);
          returnResult.clients = subscriptionData.data.clientChanged;
          return returnResult;
        }
      });
    }
    if (!this.flightsSub && !nextProps.data.loading) {
      this.flightsSub = nextProps.data.subscribeToMore({
        document: FLIGHTS_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            flights: subscriptionData.data.flightsUpdate
          });
        }
      });
    }
  }
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
        <Row className="justify-content-md-center">
          <Col
            xs="12"
            style={{
              height: "60vh",
              overflowY: "scroll"
            }}
          >
            <h4>Clients</h4>
            <table className="table table-striped table-hover table-sm">
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
                        .filter(
                          p =>
                            p.flight !== "" &&
                            p.flight !== null &&
                            p.flight.id !== this.props.match.params.flightId
                        )
                        .map((p, index) => (
                          <ClientRow
                            p={p}
                            index={index}
                            removeClient={this.removeClient}
                            select={this.select}
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
