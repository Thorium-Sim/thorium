import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Input } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./setConfig.scss";

class SetConfig extends Component {
  subscription = null;
  state = {};
  addSet = () => {
    const name = prompt("What is the name of the set?");
    if (name) {
      const mutation = gql`
        mutation AddSet($name: String!) {
          createSet(name: $name)
        }
      `;
      const variables = {
        name
      };
      this.props.client.mutate({
        mutation,
        variables,
        refetchQueries: ["Sets"]
      });
    }
  };

  removeSet = () => {
    const mutation = gql`
      mutation RemoveSet($id: ID!) {
        removeSet(id: $id)
      }
    `;
    const variables = {
      id: this.state.selectedSet
    };
    this.setState({
      selectedSet: null
    });
    this.props.client.mutate({
      mutation,
      variables,
      refetchQueries: ["Sets"]
    });
  };
  renameSet = () => {
    const { data } = this.props;
    const { selectedSet } = this.state;
    const { sets } = data;
    const set = sets.find(s => s.id === selectedSet);
    const name = prompt("What is the name of the new set?", set.name);
    const mutation = gql`
      mutation RenameSet($id: ID!, $name: String!) {
        renameSet(id: $id, name: $name)
      }
    `;
    const variables = {
      id: this.state.selectedSet,
      name
    };
    this.props.client.mutate({
      mutation,
      variables,
      refetchQueries: ["Sets"]
    });
  };
  updateClient = ({ target: { checked } }, clientId) => {
    const {
      selectedSet,
      selectedSimulator,
      selectedStationSet,
      selectedStation
    } = this.state;
    let mutation;
    let variables = {
      id: selectedSet
    };
    if (checked) {
      mutation = gql`
        mutation AddClient($id: ID!, $client: SetClientInput!) {
          addClientToSet(id: $id, client: $client)
        }
      `;
      variables.client = {
        clientId,
        simulatorId: selectedSimulator,
        stationSet: selectedStationSet,
        station: selectedStation
      };
    } else {
      mutation = gql`
        mutation RemoveClient($id: ID!, $client: ID!) {
          removeClientFromSet(id: $id, clientId: $client)
        }
      `;
      // Gotta figure out if there is a setClient
      const client = this.getCurrentClient(clientId);
      variables.client = client.id;
    }
    this.props.client.mutate({
      mutation,
      variables,
      refetchQueries: ["Sets"]
    });
  };
  getCurrentClient = clientId => {
    const {
      selectedSet,
      selectedSimulator,
      selectedStationSet,
      selectedStation
    } = this.state;
    return (
      (this.props.data.sets.find(s => s.id === selectedSet) &&
        this.props.data.sets
          .find(s => s.id === selectedSet)
          .clients.find(
            c =>
              c.simulator &&
              c.simulator.id === selectedSimulator &&
              c.client &&
              c.client.id === clientId &&
              c.stationSet &&
              c.stationSet.id === selectedStationSet &&
              c.station &&
              c.station === selectedStation
          )) ||
      {}
    );
  };
  getClientAssignedStation = clientId => {
    const { selectedSet, selectedSimulator, selectedStationSet } = this.state;
    const clientSet =
      this.props.data.sets
        .find(s => s.id === selectedSet)
        .clients.find(
          c =>
            c.simulator.id === selectedSimulator &&
            c.client.id === clientId &&
            c.stationSet.id === selectedStationSet
        ) || {};
    return clientSet.station || true;
  };
  render() {
    const { data } = this.props;
    if (data.loading) return null;
    const {
      selectedSet,
      selectedSimulator,
      selectedStationSet,
      selectedStation
    } = this.state;
    const { clients, simulators, sets } = data;
    return (
      <Container fluid className="set-config">
        <h4>Set Config </h4>
        <small>
          Be sure to connect all of your clients before configuring this
        </small>
        <Row>
          <Col>
            <h5>Sets</h5>
            <Card>
              {sets.map(s => (
                <li
                  key={s.id}
                  className={`list-group-item ${
                    s.id === selectedSet ? "selected" : ""
                  }`}
                  onClick={() =>
                    this.setState({
                      selectedSet: s.id,
                      selectedSimulator: null,
                      selectedStationSet: null,
                      selectedStation: null
                    })
                  }
                >
                  {s.name}
                </li>
              ))}
            </Card>
            <Button block size="sm" color="primary" onClick={this.addSet}>
              Add Set
            </Button>
            <Button
              block
              size="sm"
              color="warning"
              onClick={this.renameSet}
              disabled={!selectedSet}
            >
              Rename Set
            </Button>
            <Button
              block
              size="sm"
              color="danger"
              onClick={this.removeSet}
              disabled={!selectedSet}
            >
              Remove Set
            </Button>
          </Col>
          <Col>
            <h5>Simulators</h5>
            {selectedSet && (
              <Card>
                {simulators.map(s => (
                  <li
                    key={s.id}
                    className={`list-group-item ${
                      s.id === selectedSimulator ? "selected" : ""
                    }`}
                    onClick={() =>
                      this.setState({
                        selectedSimulator: s.id,
                        selectedStationSet: null,
                        selectedStation: null
                      })
                    }
                  >
                    {s.name}
                  </li>
                ))}
              </Card>
            )}
          </Col>
          <Col>
            <h5>Station Sets</h5>
            {selectedSimulator && (
              <Card>
                {simulators
                  .find(s => s.id === selectedSimulator)
                  .stationSets.map(s => (
                    <li
                      key={s.id}
                      className={`list-group-item ${
                        s.id === selectedStationSet ? "selected" : ""
                      }`}
                      onClick={() =>
                        this.setState({
                          selectedStationSet: s.id,
                          selectedStation: null
                        })
                      }
                    >
                      {s.name}
                    </li>
                  ))}
              </Card>
            )}
          </Col>
          <Col>
            <h5>Station</h5>
            {selectedSimulator &&
              selectedStationSet && (
                <Card>
                  {simulators
                    .find(s => s.id === selectedSimulator)
                    .stationSets.find(s => s.id === selectedStationSet)
                    .stations.map(s => (
                      <li
                        key={`station-${s.name}`}
                        className={`list-group-item ${
                          s.name === selectedStation ? "selected" : ""
                        }`}
                        onClick={() =>
                          this.setState({ selectedStation: s.name })
                        }
                      >
                        {s.name}
                      </li>
                    ))}
                  <li
                    key={`station-viewscreen`}
                    className={`list-group-item ${
                      selectedStation === "Viewscreen" ? "selected" : ""
                    }`}
                    onClick={() =>
                      this.setState({ selectedStation: "Viewscreen" })
                    }
                  >
                    Viewscreen
                  </li>
                  <li
                    key={`station-blackout`}
                    className={`list-group-item ${
                      selectedStation === "Blackout" ? "selected" : ""
                    }`}
                    onClick={() =>
                      this.setState({ selectedStation: "Blackout" })
                    }
                  >
                    Blackout
                  </li>
                </Card>
              )}
          </Col>
          <Col>
            <h5>Clients</h5>
            {selectedSimulator &&
              selectedStationSet &&
              selectedStation && (
                <Card style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                  <ul style={{ padding: 0 }}>
                    {clients.map(s => (
                      <li key={s.id} className={`list-group-item`}>
                        <label>
                          <Input
                            checked={this.getCurrentClient(s.id).id}
                            onChange={e => this.updateClient(e, s.id)}
                            disabled={
                              this.getClientAssignedStation(s.id) !==
                                selectedStation &&
                              this.getClientAssignedStation(s.id) !== true
                            }
                            type="checkbox"
                          />
                          {s.id}
                        </label>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const SIMULATOR_QUERY = gql`
  query Sets {
    simulators(template: true) {
      id
      name
      layout
      systems {
        id
        type
      }
      stationSets {
        id
        name
        stations {
          name
        }
      }
    }
    sets {
      id
      name
      clients {
        id
        client {
          id
        }
        simulator {
          id
          name
        }
        stationSet {
          id
          name
        }
        station
      }
    }
    clients {
      id
    }
  }
`;

export default graphql(SIMULATOR_QUERY)(withApollo(SetConfig));
