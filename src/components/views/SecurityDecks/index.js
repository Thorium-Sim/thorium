import React, {Component} from 'react';
import { graphql, withApollo } from 'react-apollo';
import { Row, Col, ListGroup, ListGroupItem, Button, Card, CardBlock, Input } from 'reactstrap';
import gql from 'graphql-tag';
import './style.scss';

const DECK_SUB = gql`
subscription DeckSubscribe($simulatorId: ID!) {
  decksUpdate(simulatorId: $simulatorId){
    id
    evac
    doors
    rooms {
      name
      id
      gas
    }
  }
}`;

class SecurityTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDeck: null,
      selectedRoom: null
    }
    this.deckSubscription = null
  }
  componentWillReceiveProps(nextProps) {
    if (!this.deckSubscription && !nextProps.data.loading) {
      this.deckSubscription = nextProps.data.subscribeToMore({
        document: DECK_SUB,
        /*updateQuery: (previousResult, {subscriptionData}) => {
          let returnResult = Object.assign(previousResult);
          returnResult.decks = subscriptionData.data.decksUpdate
          return returnResult;
        },*/
        variables: {
          simulatorId: this.props.simulator.id
        }
      });
    }
  }
  _selectDeck(deck) {
    this.setState({
      selectedDeck: deck,
      selectedRoom: null
    });
  }
  _selectRoom(e) {
    this.setState({
      selectedRoom: e.target.value
    });
  }
  _toggleDoors() {
    const mutation = gql`
    mutation ToggleDoors($deckId: ID!, $doors: Boolean!){
      deckDoors(deckId: $deckId, doors: $doors)
    }`;
    const variables = {
      deckId: this.state.selectedDeck,
      doors: !this.props.data.decks.find(d => d.id === this.state.selectedDeck).doors
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _toggleEvac() {
    const mutation = gql`
    mutation ToggleEvac($deckId: ID!, $evac: Boolean!){
      deckEvac(deckId: $deckId, evac: $evac)
    }`;
    const variables = {
      deckId: this.state.selectedDeck,
      evac: !this.props.data.decks.find(d => d.id === this.state.selectedDeck).evac
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _toggleGas() {
    const mutation = gql`
    mutation ToggleGas($roomId: ID!, $gas: Boolean!) {
      roomGas(roomId: $roomId, gas: $gas)
    }
    `;
    const deck = this.props.data.decks.find(d => d.id === this.state.selectedDeck);
    const variables = {
      roomId: this.state.selectedRoom,
      gas: !deck.rooms.find(r => r.id === this.state.selectedRoom).gas
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const decks = this.props.data.decks;
    let deck;
    let room = {};
    if (this.state.selectedDeck) {
      deck = decks.find(d => d.id === this.state.selectedDeck);
    }
    if (this.state.selectedRoom){
      room = deck.rooms.find(r => r.id === this.state.selectedRoom);
    }
    return (<Row className="security-decks">
      <Col sm={2}>
      <ListGroup>
      {
        decks.map(d => (
          <ListGroupItem 
          key={d.id} 
          onClick={this._selectDeck.bind(this, d.id)}
          className={`${this.state.selectedDeck === d.id ? 'selected' : ''}`}
          >Deck {d.number}</ListGroupItem>))
      }
      </ListGroup>
      </Col>
      { this.state.selectedDeck && 
        <Col sm={{size: 6, offset: 2}}>
        <h1>Deck {deck.number} Status:</h1>
        <h2>Bulkhead Doors: {deck.doors ? 'Closed' : 'Open'}</h2>
        <h2>Crew Status: {deck.evac ? 'Evacuated' : 'On Duty'}</h2>
        <Row>
        <Col sm={6}>
        <Button color="warning" block size="lg" onClick={this._toggleDoors.bind(this)}>{deck.doors ? 'Open Doors' : 'Close Doors'}</Button>
        </Col>
        <Col sm={6}>
        <Button color="warning" block size="lg" onClick={this._toggleEvac.bind(this)}>{deck.evac ? 'Sound All-Clear' : 'Evacuate Deck'}</Button>
        </Col>
        </Row>
        <Row>
        <Col sm={12}>
        <Card>
        <CardBlock>
        <h4>Tranzine Gas</h4>
        <Input onChange={this._selectRoom.bind(this)} type="select">
        <option value={false}>Select A Room:</option>
        {
          deck.rooms.map(r => (<option key={r.id} value={r.id}>{r.name}</option>))
        }
        </Input>
        <Button color="warning" block disabled={!this.state.selectedRoom} onClick={this._toggleGas.bind(this)}>{`${room.gas ? 'Siphon' : 'Release'} Tranzine Gas`}</Button>
        <p><em>Warning: The release of tranzine gas will cause unconsiousness to anyone who inhales the gas. Use with caution. Access to tranzine gas is limited to security personnel only. Access is restricted.</em></p> 
        </CardBlock>
        </Card>
        </Col>
        </Row>
        </Col>
      }
      </Row>)
  }
}

const DECK_QUERY = gql`
query SimulatorDecks($simulatorId: ID!){
  decks(simulatorId: $simulatorId) {
    id
    number
    evac
    doors
    rooms {
      id
      name
      gas
    }
  }
}`;


export default graphql(DECK_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(SecurityTeams));
