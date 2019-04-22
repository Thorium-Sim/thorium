import React, { Component } from "react";
import { FormGroup, Label, Row, Col, Button } from "reactstrap";
import { Mutation } from "react-apollo";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag.macro";
import { GENERIC_QUERY } from "./index";
import { DeckDropdown, RoomDropdown } from "helpers/shipStructure";

const UPDATE_LOCATION = gql`
  mutation UpdateSystemLocations($id: ID!, $locations: [ID]) {
    updateSystemRooms(systemId: $id, locations: $locations)
  }
`;

class Location extends Component {
  state = {};
  render() {
    const { id, simulatorId, decks, locations } = this.props;
    const { deck, room } = this.state;
    return (
      <Mutation
        mutation={UPDATE_LOCATION}
        refetchQueries={[
          { query: GENERIC_QUERY, variables: { id, simulatorId } }
        ]}
      >
        {action => (
          <FormGroup>
            <Label>Rooms</Label>
            <small>
              This controls what rooms are used for storing inventory for this
              system (if applicable) and what room is used on damage reports.
            </small>
            <div
              className="room-list"
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              {locations && locations.length > 0 ? (
                locations.map(
                  l =>
                    l && (
                      <p key={l.id}>
                        {l.name}, Deck {l.deck && l.deck.number}{" "}
                        <FontAwesome
                          name="ban"
                          className="text-danger"
                          onClick={() => {
                            const variables = {
                              id,
                              locations: locations
                                .filter(loc => loc.id !== l.id)
                                .map(loc => loc.id)
                            };
                            action({ variables });
                          }}
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
            <Button
              color="success"
              disabled={!this.state.room}
              onClick={() => {
                const roomId = room || this.state.room;
                if (!roomId) return;
                const variables = {
                  id,
                  locations: locations
                    .filter(Boolean)
                    .map(l => l.id)
                    .concat(roomId)
                };
                action({ variables });
                this.setState({
                  deck: null,
                  room: null
                });
              }}
            >
              Add Room to System
            </Button>
          </FormGroup>
        )}
      </Mutation>
    );
  }
}
export default Location;
