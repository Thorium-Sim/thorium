import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo, Mutation } from "react-apollo";
import { Container, Row, Col, Input, Card, CardBody, Button } from "reactstrap";
import { DeckDropdown, RoomDropdown } from "helpers/shipStructure";
import { FormattedMessage } from "react-intl";
import escapeRegex from "escape-string-regexp";

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
      fromRoom: null,
      ready: {}
    };
  }
  setSelected(which, { deck, room }) {
    deck = deck || this.state[which + "Deck"];
    const { decks } = this.props.data;
    if (decks.length === 1) deck = decks[0].id;
    this.setState(state => ({
      [which + "Deck"]: deck,
      [which + "Room"]: room,
      ready: which === "from" ? {} : state.ready
    }));
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
  addReady(i) {
    this.setState(state => ({
      ready: {
        ...state.ready,
        [i.id]: state.ready[i.id] ? state.ready[i.id] + 1 : 1
      }
    }));
  }
  removeReady(id) {
    this.setState(state => ({
      ready: {
        ...state.ready,
        [id]: state.ready[id] > 0 ? state.ready[id] - 1 : 0
      }
    }));
  }
  render() {
    if (this.props.data.loading) return null;
    const { decks, inventory } = this.props.data;
    if (!decks || !inventory) return null;
    let { toDeck, toRoom, fromDeck, fromRoom, ready } = this.state;
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
          <Col sm={4}>
            <h3>
              <FormattedMessage
                id="transfer-cargo-location"
                description="The location where cargo will be sent from."
                defaultMessage="Transfer Cargo"
              />
            </h3>
            <Row>
              {decks.length > 1 && (
                <Col sm="6">
                  <DeckDropdown
                    selectedDeck={fromDeck}
                    decks={decks}
                    setSelected={this.setSelected.bind(this, "from")}
                  />
                </Col>
              )}
              <Col className="from-room" sm={decks.length > 1 ? 6 : 12}>
                <RoomDropdown
                  selectedDeck={fromDeck}
                  selectedRoom={fromRoom}
                  otherSelected={toRoom}
                  decks={decks}
                  setSelected={this.setSelected.bind(this, "from")}
                />
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <h3>
              <FormattedMessage
                id="receive-cargo-location"
                description="The location where cargo will be sent to, or which will receive the cargo."
                defaultMessage="Receive Cargo"
              />
            </h3>
            <Row>
              {decks.length > 1 && (
                <Col sm={{ size: 6 }}>
                  <DeckDropdown
                    selectedDeck={toDeck}
                    decks={decks}
                    setSelected={this.setSelected.bind(this, "to")}
                  />
                </Col>
              )}
              <Col className="to-room" sm={{ size: decks.length > 1 ? 6 : 12 }}>
                <RoomDropdown
                  selectedDeck={toDeck}
                  selectedRoom={toRoom}
                  otherSelected={fromRoom}
                  decks={decks}
                  setSelected={this.setSelected.bind(this, "to")}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="inventoryRow flex-max">
          <Col sm={4} className="to-cargo">
            <Card>
              <CardBody>
                {fromRoom &&
                  inventory
                    .map(i => {
                      const roomCount = i.roomCount.find(
                        r => r.room.id === fromRoom
                      );
                      const reduceValue = ready[i.id] || 0;
                      if (!roomCount) return null;
                      const count = roomCount.count - reduceValue;
                      if (count === 0) return null;
                      return { id: i.id, name: i.name, count };
                    })
                    .filter(i => i)
                    .map(i => (
                      <p key={`to-${i.id}`} onClick={() => this.addReady(i)}>
                        {i.name} ({i.count})
                      </p>
                    ))}
              </CardBody>
            </Card>
          </Col>

          <Col sm={{ size: 4 }}>
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
                      <p key={`to-${i.id}`}>
                        {i.name} ({i.count})
                      </p>
                    ))}
              </CardBody>
            </Card>
          </Col>
          <Col sm={{ size: 4 }}>
            <h3>
              <FormattedMessage id="find-cargo" defaultMessage="Find Cargo" />:{" "}
            </h3>
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
                      i.name.match(
                        new RegExp(escapeRegex(this.state.findInventory), "gi")
                      )
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
        <Row className="readyRow flex-max">
          <Col sm={{ size: 4, offset: 2 }}>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                height: "100%"
              }}
            >
              <h2>
                <FormattedMessage
                  id="ready-cargo"
                  description="A holding area for cargo which is being transferred."
                  defaultMessage="Ready Cargo"
                />
              </h2>
              <Card style={{ flex: 1 }} className="ready-cargo">
                <CardBody>
                  {Object.entries(ready)
                    .map(([id, count]) => {
                      const item = inventory.find(i => i.id === id);
                      return { id, name: item.name, count };
                    })
                    .filter(i => i.count > 0)
                    .map(i => (
                      <p
                        key={`ready-${i.id}`}
                        onClick={() => this.removeReady(i.id)}
                      >
                        {i.name} ({i.count})
                      </p>
                    ))}
                </CardBody>
              </Card>
              <Mutation
                mutation={gql`
                  mutation TransferCargo(
                    $inventory: [InventoryCountInput]
                    $toRoom: ID!
                    $fromRoom: ID!
                  ) {
                    transferCargo(
                      inventory: $inventory
                      toRoom: $toRoom
                      fromRoom: $fromRoom
                    )
                  }
                `}
                variables={{
                  inventory: Object.entries(ready).map(([id, count]) => ({
                    id,
                    count
                  })),
                  toRoom,
                  fromRoom
                }}
              >
                {action => (
                  <Button
                    block
                    color="success"
                    className="transfer-cargo"
                    disabled={
                      !toRoom ||
                      Object.entries(ready).filter(([id, count]) => count > 0)
                        .length === 0
                    }
                    onClick={() => {
                      action().then(() => {
                        this.setState({ ready: {} });
                      });
                    }}
                  >
                    <FormattedMessage
                      id="transfer-cargo"
                      defaultMessage="Transfer Cargo"
                    />
                  </Button>
                )}
              </Mutation>
            </div>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <FormattedMessage
        id="cargo-training-1"
        defaultMessage="This screen allows you to move cargo between the rooms on the ship."
      />
    )
  },
  {
    selector: ".find-inventory",
    content: (
      <FormattedMessage
        id="cargo-training-2"
        defaultMessage="Use this search box to locate an item of cargo that you need from anywhere on the ship."
      />
    )
  },
  {
    selector: ".from-room",
    content: (
      <FormattedMessage
        id="cargo-training-3"
        defaultMessage="Use these dropdowns to select choose a deck and room that you want to transfer cargo from."
      />
    )
  },
  {
    selector: ".from-cargo",
    content: (
      <FormattedMessage
        id="cargo-training-4"
        defaultMessage="The items that are available in that part of the ship will show up here. Click on the inventory that you would like to move. The inventory will move into the ready cargo area. Click multiple times to move multiple items of the same type of cargo."
      />
    )
  },
  {
    selector: ".to-room",
    content: (
      <FormattedMessage
        id="cargo-training-5"
        defaultMessage="Use these dropdowns to select the part of the ship you want to move the inventory to."
      />
    )
  },
  {
    selector: ".ready-cargo",
    content: (
      <FormattedMessage
        id="cargo-training-6"
        defaultMessage="Ready cargo is cargo which is being prepared to move to another place. Before transferring cargo, make sure you have put all of the cargo you want to move into the ready cargo area. You can click on items here to remove them from ready cargo."
      />
    )
  },
  {
    selector: ".transfer-cargo",
    content: (
      <FormattedMessage
        id="cargo-training-7"
        defaultMessage="Click this button to transfer the items in the ready cargo to the room which you have selected to move the cargo into."
      />
    )
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
