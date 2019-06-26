import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Container, Row, Col, Button, Input, Label } from "helpers/reactstrap";
import { graphql, withApollo } from "react-apollo";
import SubscriptionHelper from "helpers/subscriptionHelper";
const INVENTORY_SUB = gql`
  subscription InventoryUpdate($simulatorId: ID!) {
    inventoryUpdate(simulatorId: $simulatorId) {
      id
      name
      count
      metadata {
        type
        size
        description
        image
        science
        defense
      }
      roomCount {
        count
        room {
          id
        }
      }
      simulatorId
    }
  }
`;

const inventoryConfig = {
  probe: ({ inventoryItem, updateInventory }) => (
    <div>
      <Label>Description</Label>
      <Input
        type="text"
        value={inventoryItem.metadata.description}
        onChange={evt => updateInventory("description", evt.target.value)}
      />
      <Label>Size</Label>
      <Input
        type="number"
        value={inventoryItem.metadata.size}
        onChange={evt => updateInventory("size", evt.target.value)}
      />
      <Label>Image</Label>
      {/* TODO: Change to a select dropdown */}
      <Input
        type="text"
        value={inventoryItem.metadata.image}
        onChange={evt => updateInventory("image", evt.target.value)}
      />
      <Label>Probe Type</Label>
      <Label>
        <Input
          type="checkbox"
          checked={inventoryItem.metadata.science}
          onChange={evt => updateInventory("science", evt.target.checked)}
        />{" "}
        Science
      </Label>
      <Label>
        <Input
          type="checkbox"
          checked={inventoryItem.metadata.defense}
          onChange={evt => updateInventory("defense", evt.target.checked)}
        />{" "}
        Defense
      </Label>
    </div>
  ),
  probeEquipment: ({ inventoryItem, updateInventory }) => (
    <div>
      <Label>Description</Label>
      <Input type="text" />
      <Label>Size</Label>
      <Input type="number" />
      <Label>Image</Label>
      {/* TODO: Change to a select dropdown */}
      <Input type="text" />
      <Label>Probe Type</Label>
      <Label>
        <Input type="checkbox" /> Science
      </Label>
      <Label>
        <Input type="checkbox" /> Defense
      </Label>
    </div>
  )
};
class Inventory extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      selectedDeck: null,
      selectedRoom: null,
      inventoryItem: null
    };
  }
  addInventory = () => {
    this.setState({
      inventoryItem: {}
    });
  };
  saveInventory = () => {
    const { inventoryItem } = this.state;
    const { name, metadata = {}, roomCount } = inventoryItem;
    const mutation = gql`
      mutation UpdateInventory(
        $simulatorId: ID
        $name: String
        $metadata: InventoryMetadataInput
        $roomCount: [RoomCountInput]
      ) {
        addInventory(
          inventory: {
            simulatorId: $simulatorId
            name: $name
            metadata: $metadata
            roomCount: $roomCount
          }
        )
      }
    `;
    const variables = {
      simulatorId: this.props.selectedSimulator.id,
      name,
      metadata: {
        type: metadata.type,
        size: metadata.size,
        description: metadata.description,
        image: metadata.image,
        science: metadata.science,
        defense: metadata.defense
      },
      roomCount: roomCount
        ? roomCount
            .map(
              r =>
                r.room && {
                  room: r.room.id || r.room,
                  count: parseInt(r.count, 10)
                }
            )
            .filter(Boolean)
        : []
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    // this.setState({
    //   inventoryItem: null
    // });
  };
  updateInventory = (key, value) => {
    this.setState({
      inventoryItem: Object.assign({}, this.state.inventoryItem, {
        [key]: value
      })
    });
  };
  removeInventory = () => {
    const variables = {
      id: this.state.inventoryItem.id
    };
    const mutation = gql`
      mutation RemoveInventory($id: ID) {
        removeInventory(id: $id)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      inventoryItem: null,
      selectedDeck: null,
      selectedRoom: null
    });
  };
  roomCountValue = r => {
    if (this.state.inventoryItem.roomCount) {
      if (
        this.state.inventoryItem.roomCount.find(
          c => c.room && (c.room.id || c.room) === r.id
        )
      ) {
        return (
          this.state.inventoryItem.roomCount.find(
            c => (c.room.id || c.room) === r.id
          ).count || 0
        );
      }
      return 0;
    }
    return 0;
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.decks ||
      !this.props.data.inventory
    )
      return null;
    const { decks, inventory } = this.props.data;
    const { selectedDeck, selectedRoom, inventoryItem } = this.state;
    return (
      <Container className="decks-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: INVENTORY_SUB,
              variables: {
                simulatorId: this.props.selectedSimulator.id
              },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  inventory: subscriptionData.data.inventoryUpdate
                });
              }
            })
          }
        />
        <p>
          Make sure you configure decks and rooms before configuring inventory
        </p>
        <Row>
          <Col sm={4}>
            <ul style={{ padding: 0, maxHeight: "75vh", overflowY: "scroll" }}>
              {inventory.map(i => (
                <li
                  key={i.id}
                  onClick={() =>
                    this.setState({
                      inventoryItem: i,
                      selectedDeck: null,
                      selectedRoom: null
                    })
                  }
                  className={
                    inventoryItem && inventoryItem.id === i.id ? "selected" : ""
                  }
                >
                  {i.name}
                </li>
              ))}
            </ul>
            <Button color="info" onClick={this.addInventory}>
              Add Inventory
            </Button>
          </Col>
          {inventoryItem && (
            <Col sm={8}>
              <Row>
                <Col sm={5}>
                  <Label>Name</Label>
                  <Input
                    autoFocus="autofocus"
                    type="text"
                    value={inventoryItem.name || ""}
                    onChange={evt =>
                      this.updateInventory("name", evt.target.value)
                    }
                  />
                  <Label>Total Count</Label>
                  <Input
                    type="text"
                    readOnly
                    value={(inventoryItem.roomCount || []).reduce(
                      (prev, next) => prev + (parseInt(next.count, 10) || 0),
                      0
                    )}
                  />
                  <Label>
                    <strong>Metadata</strong>
                  </Label>
                  <Label>Type</Label>
                  <Input
                    type="select"
                    value={
                      this.state.inventoryItem.metadata
                        ? this.state.inventoryItem.metadata.type || ""
                        : ""
                    }
                    onChange={evt =>
                      this.updateInventory(
                        "metadata",
                        Object.assign({}, this.state.inventoryItem.metadata, {
                          type: evt.target.value
                        })
                      )
                    }
                  >
                    <option value="">Pick a type</option>
                    <option value="repair">Repair</option>
                    <option value="probe">Probe</option>
                    <option value="probeEquipment">Probe Equipment</option>
                    <option value="coolant">Coolant</option>
                    <option value="torpedo">Torpedo</option>
                  </Input>
                  {this.state.inventoryItem.metadata &&
                    this.state.inventoryItem.metadata.type &&
                    (() => {
                      const ConfigComp =
                        inventoryConfig[this.state.inventoryItem.metadata.type];
                      if (!ConfigComp) return null;
                      return (
                        <ConfigComp
                          {...this.props}
                          inventoryItem={inventoryItem}
                          updateInventory={(key, value) => {
                            this.updateInventory(
                              "metadata",
                              Object.assign(
                                {},
                                this.state.inventoryItem.metadata,
                                {
                                  [key]: value
                                }
                              )
                            );
                          }}
                        />
                      );
                    })()}
                  <Button
                    color="success"
                    disabled={!this.state.inventoryItem.name}
                    onClick={this.saveInventory}
                  >
                    Save
                  </Button>
                  <Button
                    color="danger"
                    disabled={!this.state.inventoryItem.id}
                    onClick={this.removeInventory}
                  >
                    Remove
                  </Button>
                </Col>
                <Col sm="2" className="decks-columns">
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
                            this.setState({
                              selectedDeck: d.id,
                              selectedRoom: null
                            })
                          }
                        >
                          Deck {d.number}
                        </li>
                      ))}
                  </ul>
                </Col>
                <Col sm="5" className="decks-columns">
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
                            onClick={() =>
                              this.setState({ selectedRoom: r.id })
                            }
                          >
                            <input
                              type="text"
                              defaultValue={this.roomCountValue(r)}
                              onChange={evt => {
                                let roomCount =
                                  this.state.inventoryItem.roomCount || [];
                                const room = roomCount.find(
                                  ro => (ro.room.id || ro.room) === r.id
                                );
                                if (room) {
                                  roomCount = roomCount.map(room => {
                                    if ((room.room.id || room.room) === r.id) {
                                      return {
                                        room: r.id,
                                        count: evt.target.value
                                      };
                                    }
                                    return room;
                                  });
                                } else {
                                  roomCount = roomCount.concat({
                                    room: r.id,
                                    count: evt.target.value
                                  });
                                }
                                this.updateInventory("roomCount", roomCount);
                              }}
                              style={{ width: "30px", display: "inline-block" }}
                            />
                            {r.name}
                          </li>
                        ))}
                  </ul>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const DECKS_QUERY = gql`
  query Inventory($simulatorId: ID!) {
    decks(simulatorId: $simulatorId) {
      id
      number
      rooms {
        id
        name
        inventory {
          id
          name
          count
          metadata {
            type
            size
            description
            image
            science
            defense
          }
          roomCount {
            count
          }
        }
      }
    }
    inventory(simulatorId: $simulatorId) {
      id
      name
      count
      metadata {
        type
        size
        description
        image
        science
        defense
      }
      roomCount {
        count
        room {
          id
        }
      }
      simulatorId
    }
  }
`;

export default graphql(DECKS_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.selectedSimulator.id
    }
  })
})(withApollo(Inventory));
