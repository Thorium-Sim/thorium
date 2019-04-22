import React, { Component } from "react";
import DeconProgram from "./program";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag.macro";
import Tour from "helpers/tourHelper";
import { DeckDropdown, RoomDropdown } from "helpers/shipStructure";

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
    "Uses extreme heat and cold to kill all viruses and bacteria in room. Evacuate room before use."
};

const trainingSteps = [
  {
    selector: ".nothing",
    content: (
      <span>
        This screen is used to perform decontamination programs. Decontamination
        programs use electromagnetic radiation, heat, cold, chemicals, and other
        means to eliminate viruses and bacteria. These programs can be run
        inside of a deck or room on the ship, or on a sickbay bunk, if
        available.
      </span>
    )
  },
  {
    selector: ".program-select",
    content: (
      <span>
        Use this dropdown to select the program you would like to run. Be sure
        to check the description of the program to make sure it is the one you
        want to use.
      </span>
    )
  },
  {
    selector: ".location-select",
    content: (
      <span>
        Use this to choose which location you would like to decontaminate. You
        can also choose to decontaminate a bunk in the sickbay, if applicable.
      </span>
    )
  },
  {
    selector: ".begin-button",
    content: (
      <span>Click this button to begin the decontamination program.</span>
    )
  }
];
const programTraining = [
  {
    selector: ".nothing",
    content: (
      <span>
        You have to monitor the decontamination program to ensure it is running
        smoothly and correctly. If the levels get out of balance, the
        decontamination program could have harmful effects!
      </span>
    )
  },
  {
    selector: ".bars-holder",
    content: (
      <span>
        Drag the two arrows up and down to find the correct power level. You
        will have to continually adjust the arrows to keep the level balanced.
        Make sure that the red bar is as low as possible to avoid any problems.
      </span>
    )
  }
];
class Sickbay extends Component {
  state = {};
  getLocation = () => {
    const { deck, room } = this.state;
    const { decks } = this.props;
    const deckObj = decks.find(d => d.id === deck);
    if (!deckObj) return deck;
    if (room) {
      const roomObj = deckObj.rooms.find(r => r.id === room);
      return `${roomObj.name}, Deck ${deckObj.number}`;
    }
    return `Deck ${deckObj.number}`;
  };
  render() {
    const { program, deck, room } = this.state;
    const { deconActive, decks, bunks, id } = this.props;
    if (deconActive) {
      return [
        <DeconProgram key={"program"} {...this.props} />,
        <Tour
          key="program-tour"
          steps={programTraining}
          client={this.props.clientObj}
        />
      ];
    }
    return (
      <Container className="card-decon">
        <h1>Decontamination</h1>
        <Row>
          <Col sm={5}>
            <FormGroup className="program-select">
              <Label>Program</Label>
              <UncontrolledDropdown>
                <DropdownToggle block caret>
                  {program ? program : "Select a program"}
                </DropdownToggle>
                <DropdownMenu style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {Object.keys(programs).map(p => (
                    <DropdownItem
                      key={p}
                      onClick={() => this.setState({ program: p })}
                    >
                      {p}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>

              <p>{programs[program]}</p>
            </FormGroup>
          </Col>
        </Row>
        <Row className="location-select">
          <Col sm={{ size: 2 }} className="room-select">
            <DeckDropdown
              selectedDeck={deck}
              decks={decks}
              setSelected={({ deck: deckD }) =>
                this.setState({ deck: deckD, room: null })
              }
            >
              {bunks.length > 0 && [
                <DropdownItem key={"bunk-header"} header>
                  Bunks
                </DropdownItem>,
                bunks.map((b, i) => (
                  <DropdownItem
                    key={b}
                    onClick={() =>
                      this.setState({ deck: `Bunk ${i + 1}`, room: null })
                    }
                  >
                    Bunk {i + 1}
                  </DropdownItem>
                ))
              ]}
            </DeckDropdown>
          </Col>
          <Col sm={{ size: 3 }}>
            <RoomDropdown
              selectedDeck={deck}
              selectedRoom={room}
              decks={decks}
              disabled={!decks}
              setSelected={({ room: roomD }) => this.setState({ room: roomD })}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Mutation
              mutation={gql`
                mutation StartDecon(
                  $id: ID!
                  $program: String!
                  $location: String!
                ) {
                  startDeconProgram(
                    id: $id
                    program: $program
                    location: $location
                  )
                }
              `}
              variables={{ id, program, location: this.getLocation() }}
            >
              {action => (
                <Button
                  block
                  size="lg"
                  color="success"
                  className="begin-button"
                  disabled={!program || !deck}
                  onClick={action}
                >
                  Begin Program
                </Button>
              )}
            </Mutation>
          </Col>
        </Row>
        <Tour steps={trainingSteps} client={this.props.clientObj} />
      </Container>
    );
  }
}

export default Sickbay;
