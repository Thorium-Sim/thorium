import React, { Component } from "react";
import { graphql, withApollo } from "react-apollo";
import { Container, Row, Col, Input, Button } from "reactstrap";
import gql from "graphql-tag";

const INTERNAL_SUB = gql`
  subscription InternalCommUpdate($simulatorId: ID!) {
    internalCommUpdate(simulatorId: $simulatorId) {
      id
      name
      state
      outgoing
      incoming
    }
  }
`;

class InternalCommCore extends Component {
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
          return Object.assign({}, previousResult, {
            internalComm: subscriptionData.internalCommUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.internalSub && this.internalSub();
  }
  call(e) {
    const internalComm = this.props.data.internalComm[0];
    const deck = this.props.data.decks.find(d => d.id === this.state.deck) || {
      rooms: []
    };
    const room = deck.rooms.find(r => r.id === this.state.room);
    const incoming = room
      ? `${room.name}, Deck ${deck.number}`
      : `Deck ${deck.number}`;
    const mutation = gql`
      mutation InitiateCall($id: ID!, $incoming: String) {
        internalCommCallIncoming(id: $id, incoming: $incoming)
      }
    `;
    const variables = {
      id: internalComm.id,
      incoming
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
        internalCommConnectOutgoing(id: $id)
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
        internalCommCancelIncoming(id: $id)
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
    if (this.props.data.loading || !this.props.data.internalComm) return null;
    const internalComm = this.props.data.internalComm[0];
    const decks = this.props.data.decks;
    const { deck, room } = this.state;
    const selectedDeck = decks.find(d => d.id === deck);
    const rooms = selectedDeck ? selectedDeck.rooms : [];
    const inputStyle = { height: "22px" };
    return (
      <div className="internal-comm-core">
        {this.props.data.internalComm.length > 0 ? (
          <Container>
            <Row>
              <Col sm={8}>
                <p
                  style={{
                    background: "lightgray",
                    height: "16px",
                    padding: "0 5px"
                  }}
                >
                  {internalComm.outgoing}
                  {internalComm.state === "connected" ? ` - Connected` : ""}
                </p>
              </Col>
              <Col sm={4}>
                {internalComm.state === "connected" ? (
                  <Button
                    block
                    size="sm"
                    color="danger"
                    onClick={this.cancelCall.bind(this)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    block
                    disabled={
                      !(
                        internalComm.state !== "connected" &&
                        internalComm.outgoing
                      )
                    }
                    size="sm"
                    color="info"
                    onClick={this.connect.bind(this)}
                  >
                    Connect
                  </Button>
                )}
              </Col>
            </Row>
            {internalComm.incoming ? (
              <Row>
                <Col sm={12}>
                  {internalComm.state === "connected" ? (
                    <Button
                      block
                      size="sm"
                      color="danger"
                      onClick={this.cancelCall.bind(this)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      block
                      size="sm"
                      color="warning"
                      onClick={this.cancelCall.bind(this)}
                    >
                      Cancel Call
                    </Button>
                  )}
                </Col>
              </Row>
            ) : (
              <Row>
                <Col sm={4}>
                  <Input
                    value={deck || ""}
                    style={inputStyle}
                    size="sm"
                    type="select"
                    onChange={e =>
                      this.setState({ deck: e.target.value, room: null })}
                  >
                    <option value={null}>Select Deck</option>
                    {decks
                      .concat()
                      .sort((a, b) => {
                        if (a.number > b.number) return 1;
                        if (b.number > a.number) return -1;
                        return 0;
                      })
                      .map(d => (
                        <option
                          key={d.id}
                          value={d.id}
                        >{`Deck ${d.number}`}</option>
                      ))}
                  </Input>
                </Col>
                <Col sm={6}>
                  <Input
                    value={room || ""}
                    style={inputStyle}
                    size="sm"
                    disabled={!deck || deck === "Select Deck"}
                    type="select"
                    onChange={e => this.setState({ room: e.target.value })}
                  >
                    <option value="">Select Room</option>
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col sm={2}>
                  <Button
                    block
                    disabled={
                      !deck ||
                      deck === "Select Deck" ||
                      internalComm.state === "connected"
                    }
                    size="sm"
                    color="success"
                    onClick={this.call.bind(this)}
                  >
                    Call
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        ) : (
          "No Internal Comm"
        )}
      </div>
    );
  }
}

const INTERNAL_QUERY = gql`
  query InternalComm($simulatorId: ID!) {
    internalComm(simulatorId: $simulatorId) {
      id
      name
      state
      outgoing
      incoming
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
  options: ownProps => ({ variables: { simulatorId: ownProps.simulator.id } })
})(withApollo(InternalCommCore));
