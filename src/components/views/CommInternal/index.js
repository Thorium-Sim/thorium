import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Immutable from "immutable";
import { Container, Row, Col, Button } from "reactstrap";
import assetPath from "../../../helpers/assets";
import DamageOverlay from "../helpers/DamageOverlay";
import { DeckDropdown, RoomDropdown } from "../helpers/shipStructure";

import Tour from "reactour";

const INTERNAL_SUB = gql`
  subscription InternalCommUpdate($simulatorId: ID!) {
    internalCommUpdate(simulatorId: $simulatorId) {
      id
      name
      state
      outgoing
      incoming
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

class InternalComm extends Component {
  constructor(props) {
    super(props);
    this.internalSub = null;
    this.state = {
      deck: null,
      room: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult
            .merge({
              internalComm: subscriptionData.data.longRangeCommunicationsUpdate
            })
            .toJS();
        }
      });
    }
  }
  call(e, all) {
    const internalComm = this.props.data.internalComm[0];
    const deck = this.props.data.decks.find(d => d.id === this.state.deck) || {
      rooms: []
    };
    const room = deck.rooms.find(r => r.id === this.state.room);
    const outgoing = all
      ? "All Decks"
      : room ? `${room.name}, Deck ${deck.number}` : `Deck ${deck.number}`;
    const mutation = gql`
      mutation InitiateCall($id: ID!, $outgoing: String) {
        internalCommCallOutgoing(id: $id, outgoing: $outgoing)
      }
    `;
    const variables = {
      id: internalComm.id,
      outgoing
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  connect() {
    const internalComm = this.props.data.internalComm[0];
    const mutation = gql`
      mutation ConnectCall($id: ID!) {
        internalCommConnectIncoming(id: $id)
      }
    `;
    const variables = {
      id: internalComm.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  cancelCall() {
    const internalComm = this.props.data.internalComm[0];
    const mutation = gql`
      mutation CancelCall($id: ID!) {
        internalCommCancelOutgoing(id: $id)
      }
    `;
    const variables = {
      id: internalComm.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render() {
    if (this.props.data.loading) return null;
    const internalComm = this.props.data.internalComm[0];
    const decks = this.props.data.decks;
    const { deck, room } = this.state;
    const buttonStyle = { width: "50%", margin: "0 auto" };
    return (
      <Container className="internal-comm">
        <DamageOverlay
          message="Internal Communications Offline"
          system={internalComm}
        />
        <Row>
          <Col sm={{ size: 2, offset: 1 }}>
            <Button
              block
              disabled={
                (internalComm.state !== "connected" && internalComm.outgoing) ||
                internalComm.state === "connected"
              }
              onClick={this.call.bind(this, true)}
              className="all-decks"
            >
              All Decks
            </Button>
          </Col>
          <Col sm={{ size: 2 }} className="room-select">
            <DeckDropdown
              selectedDeck={deck}
              decks={decks}
              disabled={
                (internalComm.state !== "connected" && internalComm.outgoing) ||
                internalComm.state === "connected"
              }
              setSelected={({ deck }) => this.setState({ deck, room: null })}
            />
          </Col>
          <Col sm={{ size: 3 }}>
            <RoomDropdown
              selectedDeck={deck}
              selectedRoom={room}
              decks={decks}
              disabled={
                deck === null ||
                (internalComm.state !== "connected" && internalComm.outgoing) ||
                internalComm.state === "connected"
              }
              setSelected={({ room }) => this.setState({ room })}
            />
          </Col>
          <Col sm={{ size: 2 }}>
            <Button
              color="success"
              className="call"
              block
              disabled={
                !deck ||
                (internalComm.state !== "connected" && internalComm.outgoing) ||
                internalComm.state === "connected"
              }
              onClick={this.call.bind(this)}
            >
              Call
            </Button>
          </Col>
        </Row>
        <Row
          style={{ height: "10vh", margin: "10vh 0" }}
          className="buttons-section"
        >
          <Col sm={{ size: 8, offset: 2 }}>
            {internalComm.state !== "connected" &&
              internalComm.incoming &&
              <div>
                <h1 className="text-center">
                  Incoming call from: {internalComm.incoming}
                </h1>
                <Button
                  style={buttonStyle}
                  color="info"
                  block
                  onClick={this.connect.bind(this)}
                >
                  Connect
                </Button>
              </div>}
            {internalComm.state !== "connected" &&
              internalComm.outgoing &&
              <div>
                <h1 className="text-center">
                  Calling: {internalComm.outgoing}
                </h1>
                <Button
                  style={buttonStyle}
                  color="warning"
                  block
                  onClick={this.cancelCall.bind(this)}
                >
                  Cancel Call
                </Button>
              </div>}
            {internalComm.state === "connected" &&
              <div>
                <h1 className="text-center">
                  Connected: {internalComm.incoming}
                </h1>
                <Button
                  style={buttonStyle}
                  color="danger"
                  block
                  onClick={this.cancelCall.bind(this)}
                >
                  Disconnect
                </Button>
              </div>}
            {!(internalComm.outgoing || internalComm.incoming) &&
              <h1 className="text-center">No Communications Line Connected</h1>}
          </Col>
        </Row>
        <Row>
          <Col sm={{ size: 8, offset: 2 }}>
            <img
              role="presentation"
              className="mw-100"
              draggable="false"
              src={assetPath("/Ship Views/Right", "default", "png", false)}
            />
          </Col>
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </Container>
    );
  }
}

const trainingSteps = [
  {
    selector: ".all-decks",
    content: "Click this button to start calling all decks in intercom mode."
  },
  {
    selector: ".room-select",
    content:
      "If you select a deck, you can talk to the entire deck over intercom mode. Selecting a room allows you to talk to an individual person inside of that room. If you are instructed to call a specific room, make sure you select both the deck and the room."
  },
  {
    selector: ".call",
    content:
      "After you select a deck and/or a room, click this button to initiate the call. Once the call is connected, you can use your communicator to talk to whoever you called."
  },
  {
    selector: ".buttons-section",
    content:
      "After you initiate a call, or if someone else calls you, buttons will appear in this area. You can use those buttons to cancel an outgoing call, connect an incoming call, or disconnect a connected call."
  }
];

const INTERNAL_QUERY = gql`
  query InternalComm($simulatorId: ID!) {
    internalComm(simulatorId: $simulatorId) {
      id
      name
      state
      outgoing
      incoming
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
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
  }
`;

export default graphql(INTERNAL_QUERY, {
  options: ownProps => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(InternalComm));
