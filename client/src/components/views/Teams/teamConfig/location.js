import React, { Fragment } from "react";
import { FormGroup, Label, Row, Col } from "reactstrap";
import { DeckDropdown, RoomDropdown } from "helpers/shipStructure";

const Location = ({ decks, deck, room, team = {}, update }) => {
  return (
    <Fragment>
      <FormGroup className="location-label" row>
        <Label size="lg">Location</Label>
      </FormGroup>
      <Row className="team-location">
        <Col sm={5}>
          <DeckDropdown
            selectedDeck={deck.id}
            decks={decks}
            disabled={!team.id}
            setSelected={a =>
              update(
                Object.assign({}, team, {
                  location: { id: a.deck }
                })
              )
            }
          />
        </Col>
        <Col sm={7}>
          <RoomDropdown
            selectedDeck={deck.id}
            selectedRoom={room.id}
            decks={decks}
            disabled={!team.id}
            setSelected={a =>
              update(
                Object.assign({}, team, {
                  location: {
                    deck: { id: team.location.id },
                    id: a.room
                  }
                })
              )
            }
          />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Location;
