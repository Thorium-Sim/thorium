import React, { Component } from "react";
import gql from "graphql-tag";
import { Container, Row, Col, Button, Input, Label } from "reactstrap";
import { graphql, withApollo } from "react-apollo";
import FontAwesome from "react-fontawesome";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import { parse, unparse } from "papaparse";
import "./style.scss";

const DECKS_SUB = gql`
  subscription DecksSub($simulatorId: ID!) {
    decksUpdate(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
        roles
      }
    }
  }
`;

class DecksCore extends Component {
  state = {
    selectedDeck: null,
    selectedRoom: null
  };

  _addDeck() {
    const number = window.prompt(
      "What is the deck number? ('6', not 'Deck 6')"
    );
    if (!number) return;
    if (isNaN(parseInt(number, 10)))
      window.alert("Deck number must be a number.");
    if (this.props.data.decks.find(d => d.number === number)) return;
    const mutation = gql`
      mutation AddDeck($simulatorId: ID!, $number: Int!) {
        addDeck(simulatorId: $simulatorId, number: $number)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      number
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _removeDeck() {
    if (!window.confirm("Are you sure you want to remove this deck?")) return;
    const mutation = gql`
      mutation RemoveDeck($id: ID!) {
        removeDeck(deckId: $id)
      }
    `;
    const variables = {
      id: this.state.selectedDeck
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedDeck: null,
      selectedRoom: null
    });
  }
  _addRoom() {
    const name = prompt("What is the room name?");
    if (!name) return;
    const mutation = gql`
      mutation AddRoom($simulatorId: ID!, $deckId: ID, $name: String!) {
        addRoom(simulatorId: $simulatorId, deckId: $deckId, name: $name)
      }
    `;
    const variables = {
      simulatorId: this.props.simulator.id,
      deckId: this.state.selectedDeck,
      name
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _removeRoom() {
    if (!window.confirm("Are you sure you want to remove this room?")) return;
    const mutation = gql`
      mutation RemoveRoom($id: ID!) {
        removeRoom(roomId: $id)
      }
    `;
    const variables = { id: this.state.selectedRoom };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedRoom: null
    });
  }
  _renameRoom() {
    const roomName = this.props.data.decks
      .find(d => d.id === this.state.selectedDeck)
      .rooms.find(r => r.id === this.state.selectedRoom).name;
    const name = prompt("What is the room's new name?", roomName);
    if (!name) return;
    const mutation = gql`
      mutation RenameRoom($id: ID!, $name: String!) {
        renameRoom(roomId: $id, name: $name)
      }
    `;
    const variables = { id: this.state.selectedRoom, name };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _exportDecks = () => {
    // Create an element to download with.
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const json = this.props.data.decks.reduce(
      (prev, next) =>
        prev.concat(
          next.rooms.map(({ id, __typename, ...r }) => ({
            deck: next.number,
            ...r
          }))
        ),
      []
    );

    const blob = new Blob([unparse(json)], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "deckExport.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  _importDecks = e => {
    const simulatorId = this.props.simulator.id;
    const [file] = e.target.files;
    const fields = ["deck", "name", "roles"];
    parse(file, {
      header: true,
      complete: results => {
        const { data, meta, errors } = results;
        if (JSON.stringify(meta.fields) !== JSON.stringify(fields)) {
          alert(
            `Header row mismatch. Make sure you have the correct headers in the correct order.`
          );
          return;
        }
        errors.forEach(err => {
          console.error(err);
        });
        const mutation = gql`
          mutation ImportRooms($simulatorId: ID!, $rooms: [RoomInput]!) {
            importRooms(simulatorId: $simulatorId, rooms: $rooms)
          }
        `;
        const variables = {
          simulatorId,
          rooms: data.map(d => ({
            ...d,
            roles: d.roles.split(",").filter(r => r)
          }))
        };
        this.props.client.mutate({ mutation, variables });
      }
    });
  };
  addRole = role => {
    const { decks } = this.props.data;
    const { selectedDeck, selectedRoom } = this.state;
    const roles = decks
      .find(d => d.id === selectedDeck)
      .rooms.find(r => r.id === selectedRoom).roles;
    const mutation = gql`
      mutation UpdateRoomRoles($roomId: ID!, $roles: [RoomRoles]) {
        updateRoomRoles(roomId: $roomId, roles: $roles)
      }
    `;
    const variables = {
      roomId: selectedRoom,
      roles: roles.concat(role).filter((r, i, a) => a.indexOf(r) === i)
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  removeRole = role => {
    const { decks } = this.props.data;
    const { selectedDeck, selectedRoom } = this.state;
    const roles = decks
      .find(d => d.id === selectedDeck)
      .rooms.find(r => r.id === selectedRoom).roles;
    const mutation = gql`
      mutation UpdateRoomRoles($roomId: ID!, $roles: [RoomRoles]) {
        updateRoomRoles(roomId: $roomId, roles: $roles)
      }
    `;
    const variables = {
      roomId: selectedRoom,
      roles: roles.filter(r => r !== role)
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.decks) return null;
    const { decks } = this.props.data;
    const { selectedDeck, selectedRoom } = this.state;
    return (
      <Container className="decks-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: DECKS_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  decks: subscriptionData.data.decksUpdate
                });
              }
            })
          }
        />
        <Row>
          <Col sm="4" className="decks-columns">
            <ul className="deckList">
              {decks
                .concat()
                .sort((a, b) => {
                  if (a.number > b.number) return 1;
                  if (b.number > a.number) return -1;
                  return 0;
                })
                .map(d => (
                  <li
                    key={d.id}
                    className={selectedDeck === d.id ? "selected" : ""}
                    onClick={() =>
                      this.setState({ selectedDeck: d.id, selectedRoom: null })
                    }
                  >
                    Deck {d.number}
                  </li>
                ))}
            </ul>
            <div className="buttons">
              <Button
                block
                size="sm"
                color="primary"
                onClick={this._addDeck.bind(this)}
              >
                Add Deck
              </Button>
              <Button
                disabled={!selectedDeck}
                block
                size="sm"
                color="danger"
                onClick={this._removeDeck.bind(this)}
              >
                Remove Deck
              </Button>
              <Button
                block
                size="sm"
                color="primary"
                onClick={this._exportDecks}
              >
                Export Decks
              </Button>
              <label>
                <div className="btn btn-info btn-block btn-sm">
                  Import Decks
                </div>
                <input
                  accept="text/csv"
                  hidden
                  value={""}
                  type="file"
                  onChange={this._importDecks}
                />
              </label>
            </div>
          </Col>
          <Col sm="4" className="decks-columns">
            <ul className="roomList">
              {selectedDeck &&
                decks
                  .find(d => d.id === selectedDeck)
                  .rooms.concat()
                  .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                  })
                  .map(r => (
                    <li
                      key={r.id}
                      className={selectedRoom === r.id ? "selected" : ""}
                      onClick={() => this.setState({ selectedRoom: r.id })}
                    >
                      {r.name}
                    </li>
                  ))}
            </ul>
            <div className="buttons">
              <Button
                block
                size="sm"
                color="primary"
                onClick={this._addRoom.bind(this)}
              >
                Add Room
              </Button>
              <Button
                disabled={!selectedRoom}
                block
                size="sm"
                color="info"
                onClick={this._renameRoom.bind(this)}
              >
                Rename Room
              </Button>
              <Button
                disabled={!selectedRoom}
                block
                size="sm"
                color="danger"
                onClick={this._removeRoom.bind(this)}
              >
                Remove Room
              </Button>
            </div>
          </Col>
          <Col sm={4}>
            <p>Config</p>
            {selectedDeck &&
              selectedRoom && (
                <div>
                  <Label>
                    Roles
                    <Input
                      type="select"
                      value="select"
                      onChange={e => this.addRole(e.target.value)}
                    >
                      <option value="select" disabled>
                        Select a role to add
                      </option>
                      {[
                        "probe",
                        "torpedo",
                        "damageTeam",
                        "securityTeam",
                        "medicalTeam"
                      ].map(r => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Input>
                  </Label>
                  {decks
                    .find(d => d.id === selectedDeck)
                    .rooms.find(r => r.id === selectedRoom)
                    .roles.map(r => (
                      <p key={`${selectedRoom}-${r}`}>
                        {r}{" "}
                        <FontAwesome
                          name="ban"
                          className="text-warning"
                          onClick={() => this.removeRole(r)}
                        />
                      </p>
                    ))}
                </div>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

const DECKS_QUERY = gql`
  query Decks($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
        roles
      }
    }
  }
`;

export default graphql(DECKS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",

    variables: {
      simulatorId: ownProps.simulator.id,
      names: ["Icons", "Pictures"]
    }
  })
})(withApollo(DecksCore));
