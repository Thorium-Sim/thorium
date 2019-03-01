import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { graphql, withApollo } from "react-apollo";
import { TypingField, InputField } from "../../generic/core";
import { Container, Row, Col, Button } from "reactstrap";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";

const INVENTORY_SUB = gql`
  subscription InventoryUpdate($simulatorId: ID!) {
    inventoryUpdate(simulatorId: $simulatorId) {
      id
      name
      roomCount {
        room {
          name
          id
        }
        count
      }
    }
  }
`;

const LOG_SUB = gql`
  subscription SimulatorSub($simulatorId: ID) {
    simulatorsUpdate(simulatorId: $simulatorId) {
      id
      ship {
        inventoryLogs {
          timestamp
          log
        }
      }
    }
  }
`;

class CargoControlCore extends Component {
  constructor(props) {
    super(props);
    this.inventorySub = null;
    this.state = {
      findInventory: null,
      deck: null,
      room: null
    };
  }
  setSelected = (which, e) => {
    const { decks } = this.props.data;
    let deck;
    let room;
    if (which === "deck") deck = e.target.value;
    else {
      deck = this.state.deck;
      room = e.target.value;
    }
    if (decks.length === 1) deck = decks[0].id;
    this.setState({
      deck,
      room
    });
  };
  findInv = e => {
    const variables = {
      name: e.target.value,
      simulatorId: this.props.simulator.id
    };
    const query = gql`
      query InventorySearch($name: String, $simulatorId: ID) {
        inventory(name: $name, simulatorId: $simulatorId) {
          name
          id
          roomCount {
            room {
              deck {
                id
                number
              }
              id
              name
            }
            count
          }
        }
      }
    `;
    if (variables.name) {
      this.props.client
        .query({
          query,
          variables
        })
        .then(res => {
          if (res.data && res.data.inventory) {
            this.setState({
              findInventory: res.data.inventory.map(i => ({
                id: i.id,
                name: i.name,
                locations: i.roomCount
                  .filter(rc => rc.count > 0)
                  .map(rc => ({
                    label: (
                      <span>
                        {rc.room.name}, Deck {rc.room.deck.number} ({rc.count})
                      </span>
                    ),
                    deck: rc.room.deck.id,
                    room: rc.room.id
                  }))
              }))
            });
          }
        });
    } else {
      this.setState({
        findInventory: null
      });
    }
  };
  updateInventoryQuantity = ({ id, room }, count) => {
    const mutation = gql`
      mutation UpdateInventoryCount($id: ID!, $room: ID!, $count: Int!) {
        updateInventoryCount(id: $id, room: $room, count: $count)
      }
    `;
    const variables = {
      id,
      room,
      count
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  addInventory = () => {
    const mutation = gql`
      mutation AddInventory($inventory: InventoryItemInput) {
        addInventory(inventory: $inventory)
      }
    `;
    const { room } = this.state;
    const name = window.prompt("What is the name of the inventory?");
    if (name) {
      const count = window.prompt("How many do you want to add?");
      if (count && !isNaN(parseInt(count, 10))) {
        const variables = {
          inventory: {
            simulatorId: this.props.simulator.id,
            name,
            metadata: {},
            roomCount: [{ room, count }]
          }
        };
        this.props.client.mutate({
          mutation,
          variables
        });
      }
    }
  };
  render() {
    if (this.props.data.loading) return null;
    const { decks, inventory, simulators } = this.props.data;
    if (!decks || !inventory || !simulators) return null;
    let { deck, room } = this.state;
    const simulator = simulators[0];
    const deckObj = decks.find(d => d.id === deck);
    return (
      <Container className="cargo-core">
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
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: LOG_SUB,
              variables: {
                simulatorId: this.props.simulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />
        <Row style={{ height: "100%" }}>
          <Col sm={8}>
            <TypingField
              placeholder="Search for Inventory"
              input
              onChange={this.findInv}
            />
            {this.state.findInventory && (
              <div className="find-overlay">
                {this.state.findInventory.map(i => (
                  <div key={`find-${i.id}`}>
                    <strong>{i.name}</strong>
                    <ul>
                      {i.locations.map((l, index) => (
                        <li
                          key={`loc-${index}`}
                          onClick={() =>
                            this.setState({
                              deck: l.deck,
                              room: l.room,
                              findInventory: null
                            })
                          }
                        >
                          {l.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <select
              style={{ height: "24px" }}
              value={this.state.deck || "select"}
              onChange={e => this.setSelected("deck", e)}
            >
              <option disabled value="select">
                Select Deck
              </option>
              {decks.map(d => (
                <option key={d.id} value={d.id}>
                  Deck {d.number}
                </option>
              ))}
            </select>
            <select
              style={{ height: "24px" }}
              value={this.state.room || "select"}
              disabled={!deck}
              onChange={e => this.setSelected("room", e)}
            >
              <option disabled value="select">
                Select Room
              </option>
              {deckObj &&
                deckObj.rooms.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
            </select>
            <Button
              size="sm"
              color="primary"
              disabled={!room}
              onClick={this.addInventory}
            >
              Add Inventory
            </Button>
            {room &&
              inventory
                .map(i => {
                  const roomCount = i.roomCount.find(r => r.room.id === room);
                  if (!roomCount) return null;
                  if (roomCount.count === 0) return null;
                  return {
                    id: i.id,
                    name: i.name,
                    count: roomCount.count,
                    room
                  };
                })
                .filter(i => i)
                .map(i => (
                  <div key={`to-${i.id}`}>
                    {i.name}{" "}
                    <InputField
                      style={{
                        display: "inline-block",
                        minWidth: "20px"
                      }}
                      prompt={`What is the new quantity of ${i.name}?`}
                      onClick={val => this.updateInventoryQuantity(i, val)}
                    >
                      {i.count}
                    </InputField>
                  </div>
                ))}
          </Col>
          <Col sm={4} style={{ height: "100%", overflowY: "auto" }}>
            <div>
              <strong>Logs</strong>
              <div style={{ whiteSpace: "pre-wrap" }}>
                {simulator.ship.inventoryLogs
                  .concat()
                  .sort((a, b) => {
                    if (a.timestamp > b.timestamp) return -1;
                    if (a.timestamp < b.timestamp) return 1;
                    return 0;
                  })
                  .map(
                    ({ timestamp, log }) =>
                      `${new Date(timestamp).toLocaleTimeString()}: ${log}`
                  )
                  .join("\n\n")}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const INVENTORY_QUERY = gql`
  query InventoryQ($simulatorId: ID!, $simId: String) {
    simulators(id: $simId) {
      id
      ship {
        inventoryLogs {
          timestamp
          log
        }
      }
    }
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
      simulatorId: ownProps.simulator.id,
      simId: ownProps.simulator.id
    }
  })
})(withApollo(CargoControlCore));
