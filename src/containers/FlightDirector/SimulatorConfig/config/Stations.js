import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ButtonGroup,
  Button,
  Input
} from "reactstrap";
import gql from "graphql-tag";
import { withApollo, graphql } from "react-apollo";
import FontAwesome from "react-fontawesome";
import Views, { Widgets } from "../../../../components/views/index";

const viewList = Object.keys(Views)
  .filter(v => {
    return v !== "Offline" && v !== "Login" && v !== "Viewscreen";
  })
  .sort();

const ops = {
  create: gql`
    mutation CreateStationSet($id: ID!, $name: String!) {
      createStationSet(name: $name, simulatorId: $id)
    }
  `,
  rename: gql`
    mutation RenameStationSet($id: ID!, $name: String!) {
      renameStationSet(stationSetID: $id, name: $name)
    }
  `,
  remove: gql`
    mutation RemoveStationSet($id: ID!) {
      removeStationSet(stationSetID: $id)
    }
  `,
  renameStation: gql`
    mutation RenameStation($id: ID!, $name: String!, $newName: String!) {
      editStationInStationSet(
        stationSetID: $id
        stationName: $name
        newStationName: $newName
      )
    }
  `,
  addStation: gql`
    mutation AddStation($id: ID!, $name: String!) {
      addStationToStationSet(stationSetID: $id, stationName: $name)
    }
  `,
  removeStation: gql`
    mutation RemoveStation($id: ID!, $stationName: String!) {
      removeStationFromStationSet(stationSetID: $id, stationName: $stationName)
    }
  `,
  addCard: gql`
    mutation AddCard(
      $id: ID!
      $name: String!
      $cardName: String!
      $cardComponent: String!
      $cardIcon: String
    ) {
      addCardToStation(
        stationSetID: $id
        stationName: $name
        cardName: $cardName
        cardComponent: $cardComponent
        cardIcon: $cardIcon
      )
    }
  `,
  removeCard: gql`
    mutation RemoveCard($id: ID!, $stationName: String!, $cardName: String!) {
      removeCardFromStation(
        stationSetID: $id
        stationName: $stationName
        cardName: $cardName
      )
    }
  `,
  updateStationCard: gql`
    mutation EditCard(
      $stationSetId: ID!
      $stationName: String!
      $cardName: String!
      $name: String
      $component: String
      $icon: String
    ) {
      editCardInStationSet(
        stationSetID: $stationSetId
        stationName: $stationName
        cardName: $cardName
        newCardName: $name
        cardComponent: $component
        cardIcon: $icon
      )
    }
  `,
  toggleStationMessageGroup: gql`
    mutation ToggleMessageGroup(
      $stationSetId: ID!
      $station: String!
      $group: MESSAGE_GROUP!
      $state: Boolean!
    ) {
      toggleStationMessageGroup(
        stationSetId: $stationSetId
        station: $station
        group: $group
        state: $state
      )
    }
  `,
  toggleStationLogin: gql`
    mutation ToggleStationLogin(
      $stationSetID: ID!
      $stationName: String!
      $login: Boolean!
    ) {
      setStationLogin(
        stationSetID: $stationSetID
        stationName: $stationName
        login: $login
      )
    }
  `,
  toggleStationWidget: gql`
    mutation AddWidgetsToStation(
      $stationSetID: ID!
      $stationName: String!
      $widget: String!
      $state: Boolean!
    ) {
      toggleStationWidgets(
        stationSetID: $stationSetID
        stationName: $stationName
        widget: $widget
        state: $state
      )
    }
  `
};
class SimulatorConfigView extends Component {
  state = {};
  _handleChange = e => {
    const variables = {
      id: this.props.selectedSimulator.id,
      value: e.target.value
    };
    const mutation = ops[e.target.name];
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  createStationSet = () => {
    let name = prompt(
      "What is the station set name? eg. 12-Standard, 8-School, etc."
    );
    if (name) {
      const variables = {
        id: this.props.selectedSimulator.id,
        name
      };
      this.props.client.mutate({
        mutation: ops.create,
        variables
      });
    }
  };
  showImportModal = () => {};
  renameStationSet = () => {
    let name = prompt(
      "What is the new station set name? eg. 12-Standard, 8-School, etc."
    );
    if (name) {
      const variables = {
        id: this.state.selectedStationSet,
        name
      };
      this.props.client.mutate({
        mutation: ops.rename,
        variables
      });
    }
  };
  removeStationSet = () => {
    const variables = {
      id: this.state.selectedStationSet
    };
    this.props.client.mutate({
      mutation: ops.remove,
      variables
    });
  };
  render() {
    const { selectedStationSet } = this.state;
    const { selectedSimulator: sim } = this.props;
    const { stationSets } = sim;
    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            <Card>
              {stationSets.map(s => (
                <li
                  key={s.id}
                  className={`list-group-item ${
                    selectedStationSet === s.id ? "selected" : ""
                  }`}
                  onClick={() => this.setState({ selectedStationSet: s.id })}
                >
                  {s.name}
                </li>
              ))}
            </Card>
            <ButtonGroup>
              <Button onClick={this.createStationSet} size="sm" color="success">
                Add
              </Button>
              <Button onClick={this.showImportModal} size="sm" color="info">
                Import
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              {selectedStationSet && (
                <Button
                  onClick={this.renameStationSet}
                  size="sm"
                  color="warning"
                >
                  Rename
                </Button>
              )}
              {selectedStationSet && (
                <Button
                  onClick={this.removeStationSet}
                  size="sm"
                  color="danger"
                >
                  Remove
                </Button>
              )}
            </ButtonGroup>
          </Col>
          <Col sm={9}>
            {selectedStationSet && (
              <ConfigStationSet
                data={this.props.data}
                client={this.props.client}
                simulator={sim}
                selectedStationSet={stationSets.find(
                  s => s.id === selectedStationSet
                )}
              />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const ConfigStationSet = props => {
  const {
    client,
    selectedStationSet,
    simulator,
    data: { loading, softwarePanels }
  } = props;
  const addStation = () => {
    let name = prompt("What is the station name?");
    if (name) {
      const variables = {
        id: selectedStationSet.id,
        name
      };
      client.mutate({
        mutation: ops.addStation,
        variables
      });
    }
  };
  const renameStation = station => {
    const name = prompt("What is the new name of the station?");
    if (name) {
      const variables = {
        id: selectedStationSet.id,
        name: station.name,
        newName: name
      };
      client.mutate({
        mutation: ops.renameStation,
        variables
      });
    }
  };
  const removeStation = station => {
    if (window.confirm("Are you sure you want to delete that station?")) {
      const variables = {
        id: selectedStationSet.id,
        stationName: station.name
      };
      client.mutate({
        mutation: ops.removeStation,
        variables
      });
    }
  };
  const updateStationCard = (type, card, station, e) => {
    const variables = {
      stationSetId: selectedStationSet.id,
      stationName: station.name,
      cardName: card.name
    };
    variables[type] = e.target.value;
    client.mutate({
      mutation: ops.updateStationCard,
      variables
    });
  };
  const removeCard = (card, station) => {
    if (window.confirm("Are you sure you want to delete that card?")) {
      const variables = {
        id: selectedStationSet.id,
        stationName: station.name,
        cardName: card.name
      };
      client.mutate({
        mutation: ops.removeCard,
        variables
      });
    }
  };
  const addCard = (station, e) => {
    let name = prompt("What is the card name?", e.target.value);
    if (name) {
      const variables = {
        id: selectedStationSet.id,
        name: station.name,
        cardName: name,
        cardComponent: e.target.value
      };
      client.mutate({
        mutation: ops.addCard,
        variables
      });
    }
  };
  const toggleStationMessageGroup = (evt, station, group) => {
    const variables = {
      stationSetId: selectedStationSet.id,
      station: station.name,
      group,
      state: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationMessageGroup,
      variables
    });
  };
  const toggleStationWidget = (evt, station, widget) => {
    const variables = {
      stationSetID: selectedStationSet.id,
      stationName: station.name,
      widget,
      state: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationWidget,
      variables
    });
  };
  const setStationLogin = (evt, station) => {
    const variables = {
      stationSetID: selectedStationSet.id,
      stationName: station.name,
      login: evt.target.checked
    };
    client.mutate({
      mutation: ops.toggleStationLogin,
      variables
    });
  };
  return (
    <div>
      <h5>Stations</h5>
      <div className="scroll">
        {selectedStationSet.stations.map((station, stationIndex) => {
          return (
            <div
              key={`${selectedStationSet.id}-${station.name}-${stationIndex}`}
              style={{
                marginBottom: "15px",
                border: "solid 1px rgba(0,0,0,0.5)"
              }}
            >
              <table className="table table-sm table-striped table-hover">
                <thead className="thead-default">
                  <tr>
                    <th colSpan="3">
                      <span>
                        {station.name} |{" "}
                        <label style={{ display: "inline" }}>
                          <input
                            checked={station.login}
                            onChange={evt => setStationLogin(evt, station)}
                            type="checkbox"
                          />{" "}
                          Auto-Login
                        </label>
                      </span>
                    </th>
                    <th>
                      <FontAwesome
                        name="pencil-square-o"
                        className="text-warning"
                        onClick={() => renameStation(station)}
                      />
                      <FontAwesome
                        name="ban"
                        className="text-danger"
                        onClick={() => removeStation(station)}
                      />
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Component</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {station.cards.map((card, index) => {
                    return (
                      <tr
                        key={`${selectedStationSet.id}-${
                          station.name
                        }-${index}`}
                      >
                        <td>
                          <Input
                            type="text"
                            value={card.name}
                            onChange={e =>
                              updateStationCard("name", card, station, e)
                            }
                          />
                        </td>
                        <td>
                          <Input
                            type="select"
                            value={card.component}
                            onChange={e =>
                              updateStationCard("component", card, station, e)
                            }
                          >
                            {viewList.map(e => {
                              return (
                                <option key={e} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                            <option disabled>-----------</option>
                            {!loading &&
                              simulator.panels.map(p => (
                                <option key={p} value={p}>
                                  {softwarePanels.find(s => s.id === p) &&
                                    softwarePanels.find(s => s.id === p).name}
                                </option>
                              ))}
                          </Input>
                        </td>
                        <td>
                          <FontAwesome
                            name="ban"
                            className="text-danger"
                            onClick={() => removeCard(card, station)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <label>Select a component to add a card</label>
              <select
                className="c-select form-control"
                onChange={e => addCard(station, e)}
              >
                <option>Please Select A Card</option>
                {viewList.map(e => {
                  return (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  );
                })}
                <option disabled>-----------</option>
                {!loading &&
                  simulator.panels.map(p => (
                    <option key={p} value={p}>
                      {softwarePanels.find(s => s.id === p) &&
                        softwarePanels.find(s => s.id === p).name}
                    </option>
                  ))}
              </select>
              <label>Message Groups:</label>
              {["SecurityTeams", "DamageTeams", "MedicalTeams"].map(group => (
                <label
                  key={`messageGroup-${group}`}
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    checked={station.messageGroups.indexOf(group) > -1}
                    onChange={evt =>
                      toggleStationMessageGroup(evt, station, group)
                    }
                  />{" "}
                  {group}
                </label>
              ))}
              <label>Widgets:</label>
              {Object.keys(Widgets).map(widget => (
                <label
                  key={`widgets-${widget}`}
                  style={{ display: "inline-block" }}
                >
                  <input
                    type="checkbox"
                    checked={station.widgets.indexOf(widget) > -1}
                    onChange={evt => toggleStationWidget(evt, station, widget)}
                  />{" "}
                  {widget}
                </label>
              ))}
            </div>
          );
        })}
      </div>
      <Button size="sm" color="success" onClick={addStation}>
        Add Station
      </Button>
    </div>
  );
};

const QUERY = gql`
  query Panels {
    softwarePanels {
      id
      name
    }
  }
`;

export default withApollo(graphql(QUERY)(SimulatorConfigView));
