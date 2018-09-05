import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, Card, CardBody } from "reactstrap";
import { DeckDropdown, RoomDropdown } from "helpers/shipStructure";
import Tour from "helpers/tourHelper";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";

const INVENTORY_SUB = gql`
  subscription InventoryUpdate($simulatorId: ID!) {
    inventoryUpdate(simulatorId: $simulatorId) {
      id
      name
      roomCount {
        room {
          deck {
            number
          }
          name
          id
        }
        count
      }
    }
  }
`;

class CargoControl extends Component {
  constructor(props) {
    super(props);
    this.inventorySub = null;
    this.state = {
      toDeck: null,
      fromDeck: null,
      toRoom: null,
      fromRoom: null
    };
  }
  setSelected(which, { deck, room }) {
    deck = deck || this.state[which + "Deck"];
    const { decks } = this.props.data;
    if (decks.length === 1) deck = decks[0].id;
    const obj = {};
    obj[which + "Deck"] = deck;
    obj[which + "Room"] = room;
    this.setState(obj);
  }
  transfer(which, { id }) {
    const mutation = gql`
      mutation MoveInventory(
        $id: ID!
        $fromRoom: ID!
        $toRoom: ID!
        $count: Int!
      ) {
        moveInventory(
          id: $id
          fromRoom: $fromRoom
          toRoom: $toRoom
          count: $count
        )
      }
    `;
    let toRoom;
    let fromRoom;
    if (which === "to") {
      toRoom = this.state.fromRoom;
      fromRoom = this.state.toRoom;
    } else {
      toRoom = this.state.toRoom;
      fromRoom = this.state.fromRoom;
    }
    if (!toRoom || !fromRoom) return;
    const variables = {
      id,
      toRoom,
      fromRoom,
      count: 1
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  findInv(e) {
    this.setState({ findInventory: e.target.value });
  }
  render() {
    if (this.props.data.loading) return null;
    const { decks, inventory } = this.props.data;
    if (!decks || !inventory) return null;
    let { toDeck, toRoom, fromDeck, fromRoom } = this.state;
    if (decks.length === 0) return <p>No Cargo control</p>;
    if (decks.length <= 1) {
      toDeck = decks[0].id;
      fromDeck = decks[0].id;
    }
    return (
      <Container className="cargo-control flex-column">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: INVENTORY_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  inventory: subscriptionData.data.inventoryUpdate
                });
              }
            })
          }
        />
        <Row>
          {decks.length > 1 && (
            <Col sm="2">
              <DeckDropdown
                selectedDeck={toDeck}
                decks={decks}
                setSelected={this.setSelected.bind(this, "to")}
              />
            </Col>
          )}
          <Col className="to-room" sm={decks.length > 1 ? 2 : 4}>
            <RoomDropdown
              selectedDeck={toDeck}
              selectedRoom={toRoom}
              otherSelected={fromRoom}
              decks={decks}
              setSelected={this.setSelected.bind(this, "to")}
            />
          </Col>

          {decks.length > 1 && (
            <Col sm={{ size: 2 }}>
              <DeckDropdown
                selectedDeck={fromDeck}
                decks={decks}
                setSelected={this.setSelected.bind(this, "from")}
              />
            </Col>
          )}
          <Col className="from-room" sm={{ size: decks.length > 1 ? 2 : 4 }}>
            <RoomDropdown
              selectedDeck={fromDeck}
              selectedRoom={fromRoom}
              otherSelected={toRoom}
              decks={decks}
              setSelected={this.setSelected.bind(this, "from")}
            />
          </Col>
        </Row>
        <Row className="inventoryRow flex-max">
          <Col sm={4} className="to-cargo">
            <Card>
              <CardBody>
                {toRoom &&
                  inventory
                    .map(i => {
                      const roomCount = i.roomCount.find(
                        r => r.room.id === toRoom
                      );
                      if (!roomCount) return null;
                      if (roomCount.count === 0) return null;
                      return { id: i.id, name: i.name, count: roomCount.count };
                    })
                    .filter(i => i)
                    .map(i => (
                      <p
                        key={`to-${i.id}`}
                        onClick={this.transfer.bind(this, "to", i)}
                      >
                        {i.name} ({i.count})
                      </p>
                    ))}
              </CardBody>
            </Card>
          </Col>

          <Col sm={{ size: 4 }}>
            <Card>
              <CardBody>
                {fromRoom &&
                  inventory
                    .map(i => {
                      const roomCount = i.roomCount.find(
                        r => r.room.id === fromRoom
                      );
                      if (!roomCount) return null;
                      if (roomCount.count === 0) return null;
                      return { id: i.id, name: i.name, count: roomCount.count };
                    })
                    .filter(i => i)
                    .map(i => (
                      <p
                        key={`to-${i.id}`}
                        onClick={this.transfer.bind(this, "from", i)}
                      >
                        {i.name} ({i.count})
                      </p>
                    ))}
              </CardBody>
            </Card>
          </Col>
          <Col sm={{ size: 4 }}>
            <h3>Find Inventory: </h3>
            <Input
              className="find-inventory"
              size="sm"
              value={this.state.findInventory}
              onChange={this.findInv.bind(this)}
            />
            {this.state.findInventory && (
              <Card className="search-container">
                <CardBody>
                  {inventory
                    .filter(i =>
                      i.name.match(new RegExp(this.state.findInventory, "gi"))
                    )
                    .map(i => (
                      <div key={`find-${i.id}`}>
                        {i.name}
                        <ul>
                          {i.roomCount
                            .filter(r => r.count > 0)
                            .map((r, index) => (
                              <li key={`loc-${index}`}>
                                {r.room.name}, Deck {r.room.deck.number} (
                                {r.count})
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const trainingSteps = [
  {
    selector: ".find-inventory",
    content:
      "Use this search box to locate an object that you need from anywhere on the ship."
  },
  {
    selector: ".to-room",
    content:
      "Use these dropdowns to select the part of the ship you want to search in."
  },
  {
    selector: ".to-cargo",
    content:
      "The items that are available in that part of the ship will show up here. Select the inventory that you would like to move."
  },
  {
    selector: ".from-room",
    content:
      "Use these dropdowns to select the part of the ship you want to move the inventory to."
  }
];

const INVENTORY_QUERY = gql`
  query InventoryQ($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
      }
    }
    inventory(simulatorId: $simulatorId) {
      id
      name
      roomCount {
        room {
          deck {
            number
          }
          name
          id
        }
        count
      }
    }
  }
`;

export default graphql(INVENTORY_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CargoControl));
