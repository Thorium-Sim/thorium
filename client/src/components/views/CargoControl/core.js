import React from "react";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import { TypingField, InputField } from "../../generic/core";
import { Container, Row, Col, Button } from "helpers/reactstrap";
import "./style.scss";
import { useQuery } from "@apollo/react-hooks";
import { useSubscribeToMore } from "helpers/hooks/useQueryAndSubscribe";

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

const INVENTORY_QUERY = gql`
  query InventoryQ($simulatorId: ID!) {
    simulators(id: $simulatorId) {
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

const INVENTORY_SEARCH = gql`
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

function reducer(state, { deck, room, which, value }) {
  let newState = {};
  if (which) {
    return { deck: state.deck, room: null, [which]: value };
  }
  if (deck) {
    newState.deck = deck;
  }
  if (room) {
    newState.room = room;
  }
  return newState;
}
const CargoControlCore = ({ simulator, client }) => {
  const [findInventory, setFindInventory] = React.useState(null);
  const [{ deck, room }, dispatch] = React.useReducer(reducer, {});
  const { loading, data, subscribeToMore } = useQuery(INVENTORY_QUERY, {
    variables: { simulatorId: simulator.id }
  });
  useSubscribeToMore(subscribeToMore, LOG_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => ({
      ...previousResult,
      simulators: subscriptionData.data.simulatorsUpdate
    })
  });
  useSubscribeToMore(subscribeToMore, INVENTORY_SUB, {
    variables: { simulatorId: simulator.id },
    updateQuery: (previousResult, { subscriptionData }) => {
      return Object.assign({}, previousResult, {
        inventory: subscriptionData.data.inventoryUpdate
      });
    }
  });
  const { simulators, decks, inventory } = data;
  if (loading || !simulators) return null;
  const { ship } = simulators[0];

  const findInv = e => {
    const variables = {
      name: e.target.value,
      simulatorId: simulator.id
    };

    if (variables.name) {
      client
        .query({
          query: INVENTORY_SEARCH,
          variables
        })
        .then(res => {
          if (res.data && res.data.inventory) {
            const inventoryData = res.data.inventory.map(i => ({
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
            }));

            setFindInventory(inventoryData);
          }
        });
    } else {
      setFindInventory(null);
    }
  };
  const updateInventoryQuantity = ({ id, room }, count) => {
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
    client.mutate({
      mutation,
      variables
    });
  };
  const addInventory = () => {
    const mutation = gql`
      mutation AddInventory($inventory: InventoryItemInput) {
        addInventory(inventory: $inventory)
      }
    `;
    const name = window.prompt("What is the name of the inventory?");
    if (name) {
      const count = window.prompt("How many do you want to add?");
      if (count && !isNaN(parseInt(count, 10))) {
        const variables = {
          inventory: {
            simulatorId: simulator.id,
            name,
            metadata: {},
            roomCount: [{ room, count: parseInt(count, 10) }]
          }
        };
        client.mutate({
          mutation,
          variables
        });
      }
    }
  };

  const deckObj = decks.find(d => d.id === deck);
  return (
    <Container className="cargo-core">
      <Row style={{ height: "100%" }}>
        <Col sm={8}>
          <TypingField
            placeholder="Search for Inventory"
            input
            onChange={findInv}
          />
          {findInventory && (
            <div className="find-overlay">
              {findInventory.map(i => (
                <div key={`find-${i.id}`}>
                  <strong>{i.name}</strong>
                  <ul>
                    {i.locations.map((l, index) => (
                      <li
                        key={`loc-${index}`}
                        onClick={() => {
                          setFindInventory(null);
                          dispatch({ deck: l.deck, room: l.room });
                        }}
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
            value={deck || "select"}
            onChange={e => dispatch({ which: "deck", value: e.target.value })}
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
            value={room || "select"}
            disabled={!deck}
            onChange={e => dispatch({ which: "room", value: e.target.value })}
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
            onClick={addInventory}
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
                    onClick={val => updateInventoryQuantity(i, val)}
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
              {ship.inventoryLogs
                .concat()
                .sort((a, b) => {
                  if (a.timestamp > b.timestamp) return -1;
                  if (a.timestamp < b.timestamp) return 1;
                  return 0;
                })
                .map(
                  ({ timestamp, log }) =>
                    `${new Date(
                      parseInt(timestamp)
                    ).toLocaleTimeString()}: ${log}`
                )
                .join("\n\n")}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withApollo(CargoControlCore);
