import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import {Container, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBlock} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

import './style.scss';

const INVENTORY_SUB = gql`
subscription InventoryUpdate($simulatorId: ID!) {
  inventoryUpdate(simulatorId: $simulatorId){
    name
    roomCount {
      room {
        id
      }
      count
    }
  }
}`;

class CargoControl extends Component {
  constructor(props){
    super(props);
    this.inventorySub = null;
    this.state = {
      toDeck: null,
      fromDeck: null,
      toRoom: null,
      fromRoom: null,
      toInventory: [],
      fromInventory: [],
      readyInventory: [],
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.inventorySub = nextProps.data.subscribeToMore({
        document: INVENTORY_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          // TODO: Needs to be updated
         // const returnResult = Immutable.Map(previousResult);
         // return returnResult.merge({ inventory: subscriptionData.data.inventoryUpdate }).toJS();
       }
     });
    }
  }
  setSelected(which, {deck, room}) {
    let setInventory = [];
    const {decks} = this.props.data;
    if (decks.length === 1) deck = decks[0].id;
    if (deck && room) {
      // Set the inventory
      setInventory = decks.find(d => d.id === deck).rooms.find(r => r.id === room).inventory;

    }
    const obj = {};
    obj[which + 'Deck'] = deck;
    obj[which + 'Room'] = room;
    obj[which + 'Inventory'] = setInventory
    this.setState(obj)
  }
  toReady(which, {id, name}){
    const inventory = this.state[which + 'Inventory'].map(i => {
      if (i.count - 1 <= 0) return null;
      if (i.id === id) return {
        id: i.id,
        name: i.name,
        count: i.count - 1
      }
      return i;
    }).filter(i => i);
    const {readyInventory} = this.state;
    if (readyInventory.find(i => i.id === id)) {
      readyInventory.find(i => i.id === id).count += 1;
    } else {
      readyInventory.push({
        id,
        name,
        count: 1
      })
    }
    const obj = {readyInventory};
    obj[which + 'Inventory'] = inventory;
    this.setState(obj);
  }
  render(){
    if (this.props.data.loading) return null;
    const {decks} = this.props.data;
    let {toDeck, toRoom, fromDeck, fromRoom, toInventory, fromInventory, readyInventory} = this.state;
    if (decks.length <= 1){
      toDeck = decks[0].id
      fromDeck = decks[0].id
    };
    return (
      <Container fluid className="cargo-control">
      <Row>
      {decks.length > 1 &&
        <Col sm="2">
        <DeckDropdown
        selectedDeck={toDeck}
        decks={decks}
        setSelected={this.setSelected.bind(this, 'to')} />
        </Col>
      }
      <Col sm={decks.length > 1 ? 2 : 4}>
      <RoomDropdown
      selectedDeck={toDeck}
      selectedRoom={toRoom}
      otherSelected={fromRoom}
      decks={decks}
      setSelected={this.setSelected.bind(this, 'to')} />
      </Col>

      {decks.length > 1 &&
        <Col sm={{size: 2, offset: 4}}>
        <DeckDropdown
        selectedDeck={fromDeck}
        decks={decks}
        setSelected={this.setSelected.bind(this, 'from')} />
        </Col>
      }
      <Col sm={{size: decks.length > 1 ? 2 : 4, offset: 4}}>
      <RoomDropdown
      selectedDeck={fromDeck}
      selectedRoom={fromRoom}
      otherSelected={toRoom}
      decks={decks}
      setSelected={this.setSelected.bind(this, 'from')} />
      </Col>
      </Row>
      <Row className="inventoryRow">
      <Col sm={4}>
      <Card>
      <CardBlock>
      {
        toRoom && toInventory
        .map(i => <p key={i.id}
          onClick={this.toReady.bind(this, 'to', i)}>
          {i.name} ({i.count})
          </p>)
      }
      </CardBlock>
      </Card>
      </Col>
      <Col sm={4}>
      <h4>Ready Cargo</h4>
      <Card className="readyCargo">
      <CardBlock>
      {
        readyInventory
        .map(i => <p key={i.id}>
          {i.name} ({i.count})
          </p>)
      }
      </CardBlock>
      </Card>
      <Button block color="primary">Transfer <FontAwesome name="arrow-right" /></Button>
      <Button block color="primary"><FontAwesome name="arrow-left" /> Transfer</Button>
      <Button block color="warning">Reset</Button>
      </Col>
      <Col sm={4}>
      <Card>
      <CardBlock>
      {
        fromRoom && fromInventory
        .map(i => <p key={i.id}
          onClick={this.toReady.bind(this, 'from', i)}>
          {i.name} ({i.count})
          </p>)
      }
      </CardBlock>
      </Card>
      </Col>
      </Row>
      </Container>)
  }
}

const DeckDropdown = ({selectedDeck, decks, setSelected}) => {
  return <UncontrolledDropdown>
  <DropdownToggle block caret>
  {selectedDeck ? `Deck ${decks.find(d => d.id === selectedDeck).number}` : 'Select Deck'}
  </DropdownToggle>
  <DropdownMenu>
  {
    decks.map(d => <DropdownItem key={d.id} onClick={() => {
      setSelected({deck: d.id, room: null})
    }}>{`Deck ${d.number}`}</DropdownItem>)
  }
  </DropdownMenu>
  </UncontrolledDropdown>
}

const RoomDropdown = ({selectedDeck, otherSelected, selectedRoom, decks, setSelected}) => {
  return <UncontrolledDropdown>
  <DropdownToggle block caret>
  {selectedRoom ? decks.find(d => d.id === selectedDeck).rooms.find(r => r.id === selectedRoom).name : 'Select Room'}
  </DropdownToggle>
  { selectedDeck && 
    <DropdownMenu>
    <DropdownItem header>Deck {decks.find(d => d.id === selectedDeck).number}</DropdownItem>
    {
      decks.find(d => d.id === selectedDeck).rooms.map(r => <DropdownItem key={r.id} disabled={r.id === otherSelected} onClick={() => {
        setSelected({room: r.id})
      }}>{r.name}</DropdownItem>)
    }
    </DropdownMenu>
  }
  </UncontrolledDropdown>
}
const INVENTORY_QUERY = gql`
query InventoryQ($simulatorId: ID!) {
  decks(simulatorId: $simulatorId) {
    id
    number
    rooms {
      id
      name
      inventory {
        id
        name
        count
      }
    }
  }
}`;

export default graphql(INVENTORY_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CargoControl));