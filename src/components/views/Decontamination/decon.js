import React, { Component } from "react";
import DeconProgram from "./program";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";
import { DeckDropdown, RoomDropdown } from "../helpers/shipStructure";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

const programs = {
  "Life Form": "Used for decontaminating life forms.",
  Cargo: "Used for decontaminating cargo and non-organic matter.",
  "Return Crew":
    "Used for decontaminating crew members that have been off the ship.",
  "Anti-Radiation":
    "Uses reverse-polarity radiation to decrease radiation exposure.",
  "Anti-Inflamation":
    "Uses electro-magnetic waves to decrease inflamation in organic life forms.",
  Exposure:
    "Uses extreme heat and cold to kill all virii and bacteria in room. Evacuate room before use."
};

class Sickbay extends Component {
  state = {};
  render() {
    const { program, deck, room } = this.state;
    const { deconActive, decks } = this.props;
    if (deconActive) {
      return <DeconProgram {...this.props} />;
    }
    return (
      <Container>
        <h1>Decontamination</h1>
        <FormGroup>
          <Label>Program</Label>
          <Input
            type="select"
            value={program || ""}
            onChange={e => this.setState({ program: e.target.value })}
          >
            <option disabled="true" value="">
              Select a program
            </option>
            {Object.keys(programs).map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </Input>
          <p>{programs[program]}</p>
        </FormGroup>
        <Row>
          <Col sm={{ size: 2 }} className="room-select">
            <DeckDropdown
              selectedDeck={deck}
              decks={decks}
              setSelected={({ deck: deckD }) =>
                this.setState({ deck: deckD, room: null })
              }
            />
          </Col>
          <Col sm={{ size: 3 }}>
            <RoomDropdown
              selectedDeck={deck}
              selectedRoom={room}
              decks={decks}
              setSelected={({ room: roomD }) => this.setState({ room: roomD })}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Sickbay;
