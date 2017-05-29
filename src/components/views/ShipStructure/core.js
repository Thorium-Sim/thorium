import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Container, Row, Col, Button } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

import './style.scss';

const DECKS_SUB = gql`
subscription DecksSub($simulatorId: ID!) {
  decksUpdate(simulatorId: $simulatorId) {
    id
    number
    rooms {
      id
      name
    }
  }
}`;


class DecksCore extends Component {
  constructor(props){
    super(props);
    this.subscription = null;
    this.state = {
      selectedDeck: null,
      selectedRoom: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: DECKS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ decks: subscriptionData.data.decksUpdate }).toJS();
        }
      });
    }
  }
  _addDeck() {
    const number = prompt('What is the deck number?');
    if (!number) return;
    if (this.props.data.decks.find(d => d.number === number)) return;
    const mutation = gql`
    mutation AddDeck ($simulatorId: ID!, $number: Int!){
      addDeck(simulatorId: $simulatorId, number: $number)
    }`;
    const variables = {
      simulatorId: this.props.simulator.id,
      number
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _removeDeck() {
    if (!confirm('Are you sure you want to remove this deck?')) return;
    const mutation = gql`
    mutation RemoveDeck($id: ID!){
      removeDeck(deckId: $id)
    }`;
    const variables = {
      id: this.state.selectedDeck
    };
    this.props.client.mutate({
      mutation,
      variables
    });
    this.setState({
      selectedDeck: null,
      selectedRoom: null
    })
  }
  _addRoom() {
    const name = prompt("What is the room name?");
    if (!name) return;
    const mutation = gql`
    mutation AddRoom($simulatorId: ID!, $deckId: ID!, $name: String!){
      addRoom(simulatorId: $simulatorId, deckId: $deckId, name: $name)
    }`;
    const variables = {
      simulatorId: this.props.simulator.id,
      deckId: this.state.selectedDeck,
      name
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _removeRoom() {
    if (!confirm('Are you sure you want to remove this room?')) return;
    const mutation = gql`
    mutation RemoveRoom($id: ID!) {
      removeRoom(roomId: $id)
    }`;
    const variables = {id: this.state.selectedRoom};
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  _renameRoom() {
    const roomName = this.props.data.decks
    .find(d => d.id === this.state.selectedDeck)
    .rooms.find(r => r.id === this.state.selectedRoom).name;
    const name = prompt("What is the room's new name?", roomName);
    if (!name) return;
    const mutation = gql`
    mutation RenameRoom($id: ID!, $name: String!) {
      renameRoom(roomId: $id, name: $name)
    }`;
    const variables = {id: this.state.selectedRoom, name};
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render(){
    if (this.props.data.loading) return null;
    const {decks} = this.props.data;
    const {selectedDeck, selectedRoom} = this.state;
    return <Container className="decks-core">
    <p>Decks</p>
    <Row>
    <Col sm="6" className="decks-columns">
    <ul className="deckList">
    {
      decks.concat().sort((a, b) => {
        if (a.number > b.number) return 1;
        if (b.number > a.number) return -1;
        return 0;
      })
      .map(d => <li 
        key={d.id}
        className={selectedDeck === d.id ? 'selected' : ''}
        onClick={() => this.setState({selectedDeck: d.id, selectedRoom: null})}>
        Deck {d.number}
        </li>
        )
    }
    </ul>
    <div className="buttons">
    <Button block size="sm" color="primary" onClick={this._addDeck.bind(this)}>Add Deck</Button>
    <Button disabled={!selectedDeck} block size="sm" color="danger" onClick={this._removeDeck.bind(this)}>Remove Deck</Button>
    </div>
    </Col>
    <Col sm="6" className="decks-columns">
    <ul className="roomList">
    {
      selectedDeck && decks.find(d => d.id === selectedDeck)
      .rooms.concat()
      .sort((a, b) => {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      })
      .map(r => <li 
        key={r.id}
        className={selectedRoom === r.id ? 'selected' : ''}
        onClick={() => this.setState({selectedRoom: r.id})}>
        {r.name}
        </li>
        )
    }
    </ul>
    <div className="buttons">
    <Button block size="sm" color="primary" onClick={this._addRoom.bind(this)}>Add Room</Button>
    <Button disabled={!selectedRoom} block size="sm" color="info" onClick={this._renameRoom.bind(this)}>Rename Room</Button>
    <Button disabled={!selectedRoom} block size="sm" color="danger" onClick={this._removeRoom.bind(this)}>Remove Room</Button>
    </div>
    </Col>
    </Row>
    </Container>
  }
}

const DECKS_QUERY = gql`
query Decks($simulatorId: ID!) {
  decks(simulatorId: $simulatorId) {
    id
    number
    rooms {
      id
      name
    }
  }
}`;

export default graphql(DECKS_QUERY, {
  options: (ownProps) => ({variables: {simulatorId: ownProps.simulator.id, names: ['Icons', 'Pictures']}})
})(withApollo(DecksCore));
