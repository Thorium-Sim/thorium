import React, { Component } from "react";
import { Input, FormGroup, Label, Col, Row, Button } from "reactstrap";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  DeckDropdown,
  RoomDropdown
} from "../../../../../components/views/helpers/shipStructure";

const refetchQueries = [
  "System",
  "Engines",
  "ShortRangeComm",
  "Reactor",
  "Phasers",
  "Shields",
  "Torpedo",
  "Navigation"
];
const ops = {
  updatePowerLevels: gql`
    mutation UpdatePowerLevels($id: ID!, $levels: [Int]!) {
      changeSystemPowerLevels(systemId: $id, powerLevels: $levels)
    }
  `,
  updateName: gql`
    mutation UpdateName($id: ID!, $name: String, $displayName: String) {
      updateSystemName(systemId: $id, name: $name, displayName: $displayName)
    }
  `,
  updateRooms: gql`
    mutation UpdateSystemLocations($id: ID!, $locations: [ID]) {
      updateSystemRooms(systemId: $id, locations: $locations)
    }
  `
};

export class GenericSystemConfig extends Component {
  state = {};
  addPowerLevel = ({ id, power: { powerLevels = [] } }) => {
    const lastLevel = powerLevels[powerLevels.length - 1] || 4;
    const updatedPowerLevels = powerLevels.concat(lastLevel + 1);
    this.performMutation(updatedPowerLevels, id);
  };
  removePowerLevel = ({ id, power: { powerLevels = [] } }) => {
    const updatedPowerLevels = powerLevels.concat();
    updatedPowerLevels.pop();
    this.performMutation(updatedPowerLevels, id);
  };
  updatePowerLevel = ({ id, power: { powerLevels = [] } }, index, level) => {
    const updatedPowerLevels = powerLevels.concat();
    updatedPowerLevels[index] = parseInt(level, 10);
    this.performMutation(updatedPowerLevels, id);
  };
  performMutation = (levels, id) => {
    const variables = {
      levels,
      id
    };
    this.props.client.mutate({
      mutation: ops.updatePowerLevels,
      variables,
      refetchQueries
    });
  };
  updateName = ({ id }, name, displayName) => {
    const variables = {
      name,
      displayName,
      id
    };
    this.props.client.mutate({
      mutation: ops.updateName,
      variables,
      refetchQueries
    });
  };
  addRoom = ({ id, locations }, room) => {
    const roomId = room || this.state.room;
    const variables = {
      id,
      locations: locations.map(l => l.id).concat(roomId)
    };
    this.props.client.mutate({
      mutation: ops.updateRooms,
      variables,
      refetchQueries
    });
    this.setState({
      deck: null,
      room: null
    });
  };
  removeRoom = ({ id, locations }, roomId) => {
    const variables = {
      id,
      locations: locations.filter(l => l.id !== roomId).map(l => l.id)
    };
    this.props.client.mutate({
      mutation: ops.updateRooms,
      variables,
      refetchQueries
    });
  };
  render() {
    if (
      this.props.data.loading ||
      !this.props.data.systems ||
      !this.props.data.decks
    ) {
      return null;
    }
    const { systems, decks } = this.props.data;
    const { deck, room } = this.state;
    return (
      <div className="scroll">
        {systems.length === 0 && (
          <p>Click the checkbox to add a {this.props.type} system</p>
        )}
        {systems.map(s => (
          <div
            key={s.id}
            style={{ border: "solid 1px rgba(0,0,0,0.5)", padding: "2px" }}
          >
            <label>{s.type}</label>
            <FormGroup>
              <Label>
                Name
                <Input
                  type="text"
                  value={s.name}
                  onChange={e => {
                    this.updateName(s, e.target.value, null);
                  }}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                Display Name
                <Input
                  type="text"
                  value={s.displayName || ""}
                  onChange={e => {
                    this.updateName(s, null, e.target.value);
                  }}
                />
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>Rooms</Label>
              <small>
                This controls what rooms are used for storing inventory for this
                system (if applicable) and what room is used on damage reports.
              </small>
              <div
                className="room-list"
                style={{ maxHeight: "70px", overflowY: "scroll" }}
              >
                {s.locations && s.locations.length > 0 ? (
                  s.locations.map(
                    l =>
                      l && (
                        <p key={l.id}>
                          {l.name}, Deck {l.deck.number}{" "}
                          <FontAwesome
                            name="ban"
                            className="text-danger"
                            onClick={() => this.removeRoom(s, l.id)}
                          />
                        </p>
                      )
                  )
                ) : (
                  <p>No Rooms</p>
                )}
              </div>
              <Row>
                <Col sm={{ size: 6 }} className="room-select">
                  <DeckDropdown
                    selectedDeck={deck}
                    decks={decks}
                    setSelected={({ deck }) =>
                      this.setState({ deck, room: null })
                    }
                  />
                </Col>
                <Col sm={{ size: 6 }}>
                  <RoomDropdown
                    selectedDeck={deck}
                    selectedRoom={room}
                    decks={decks}
                    setSelected={({ room }) => this.setState({ room })}
                  />
                </Col>
              </Row>
              <Button color="success" onClick={() => this.addRoom(s)}>
                Add Room to System
              </Button>
            </FormGroup>
            <FormGroup>
              <Label>Required Power</Label>
              <FontAwesome
                onClick={() => {
                  this.addPowerLevel(s);
                }}
                name="plus-circle"
                className="text-success"
              />
              <FontAwesome
                onClick={() => {
                  this.removePowerLevel(s);
                }}
                name="minus-circle"
                className="text-danger"
              />
              {s.power.powerLevels &&
                s.power.powerLevels.map((p, i) => (
                  <div
                    key={`system-power-${i}`}
                    style={{ display: "inline-block" }}
                  >
                    <Input
                      style={{
                        width: "40px",
                        padding: "2px",
                        display: "inline-block"
                      }}
                      type="number"
                      name="power"
                      value={p || ""}
                      onChange={e =>
                        this.updatePowerLevel(s, i, e.target.value)
                      }
                    />
                  </div>
                ))}
            </FormGroup>
            <FormGroup>
              <Label>Isochip Config</Label>
            </FormGroup>
            {this.props.children}
            {this.props.render && this.props.render(s)}
          </div>
        ))}
      </div>
    );
  }
}

const SYSTEM_QUERY = gql`
  query System($id: ID, $deckId: ID!, $type: String) {
    systems(simulatorId: $id, type: $type) {
      id
      name
      displayName
      type
      power {
        power
        powerLevels
      }
      damage {
        damaged
        report
        requested
        reactivationCode
        neededReactivationCode
      }
      locations {
        id
        name
        deck {
          number
        }
      }
      displayName
    }
    decks(simulatorId: $deckId) {
      id
      number
      rooms {
        id
        name
      }
    }
  }
`;

export default graphql(SYSTEM_QUERY, {
  options: ownProps => ({
    variables: {
      id: ownProps.simulatorId,
      deckId: ownProps.simulatorId,
      type: ownProps.type
    }
  })
})(GenericSystemConfig);
