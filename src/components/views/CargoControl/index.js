import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import {Container, Row, Col, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBlock} from 'reactstrap';

import './style.scss';

const INVENTORY_SUB = gql`
subscription InventoryUpdate($simulatorId: ID!) {
  inventoryUpdate(simulatorId:$simulatorId) {
    id
    name
    roomCount {
      room {
        name
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
         const returnResult = Immutable.Map(previousResult);
         return returnResult.merge({ inventory: subscriptionData.data.inventoryUpdate }).toJS();
       }
     });
    }
  }
  setSelected(which, {deck, room}) {
    const {decks} = this.props.data;
    if (decks.length === 1) deck = decks[0].id;
    const obj = {};
    obj[which + 'Deck'] = deck;
    obj[which + 'Room'] = room;
    this.setState(obj)
  }
  transfer(which, {id}){
    const mutation = gql`
    mutation MoveInventory($id: ID!, $fromRoom: ID!, $toRoom: ID!, $count: Int!) {
      moveInventory(id: $id, fromRoom: $fromRoom, toRoom: $toRoom, count: $count)
    }`;
    let toRoom;
    let fromRoom;
    if (which === 'to') {
      toRoom = this.state.fromRoom;
      fromRoom = this.state.toRoom;
    } else {
      toRoom = this.state.toRoom;
      fromRoom = this.state.fromRoom;
    }
    if (!toRoom || !fromRoom) return;
    const variables = {
      id,
      toRoom,
      fromRoom,
      count: 1
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  findInv(e) {
    const variables = {
      name: e.target.value,
      simulatorId: this.props.simulator.id
    }
    const query = gql`query InventorySearch($name: String, $simulatorId: ID) {
      inventory(name: $name, simulatorId: $simulatorId) {
        name
        id
        roomCount {
          room {
            deck {
              number
            }
            id
            name
          }
          count
        }
      }
    }`
    if (variables.name) {
      this.props.client.query({
        query,
        variables
      }).then((res) => {
        if (res.data && res.data.inventory) {
          this.setState({
            findInventory: res.data.inventory.map(i => ({
              id: i.id,
              name: i.name,
              locations: i.roomCount.filter(rc => rc.count > 0)
              .map(rc => `${rc.room.name}, Deck ${rc.room.deck.number} (${rc.count})`)
            }))
          })
        }
      })
    } else {
      this.setState({
        findInventory: null
      })
    }
  }
  render(){
    if (this.props.data.loading) return null;
    const {decks, inventory} = this.props.data;
    let {toDeck, toRoom, fromDeck, fromRoom} = this.state;
    if (decks.length <= 1){
      toDeck = decks[0].id
      fromDeck = decks[0].id
    };
    return (
      <Container className="cargo-control">
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
        <Col sm={{size: 2}}>
        <DeckDropdown
        selectedDeck={fromDeck}
        decks={decks}
        setSelected={this.setSelected.bind(this, 'from')} />
        </Col>
      }
      <Col sm={{size: decks.length > 1 ? 2 : 4}}>
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
        toRoom && inventory.map(i => {
          const roomCount = i.roomCount.find(r => r.room.id === toRoom);
          if (!roomCount) return null;
          if (roomCount.count === 0) return null;
          return {id: i.id, name: i.name, count: roomCount.count}
        }).filter(i => i)
        .map(i => <p key={`to-${i.id}`}
          onClick={this.transfer.bind(this, 'to', i)}>
          {i.name} ({i.count})
          </p>)
      }
      </CardBlock>
      </Card>
      </Col>
      
      <Col sm={{size: 4}}>
      <Card>
      <CardBlock>
      {
        fromRoom && inventory.map(i => {
          const roomCount = i.roomCount.find(r => r.room.id === fromRoom);
          if (!roomCount) return null;
          if (roomCount.count === 0) return null;
          return {id: i.id, name: i.name, count: roomCount.count}
        }).filter(i => i)
        .map(i => <p key={`to-${i.id}`}
          onClick={this.transfer.bind(this, 'from', i)}>
          {i.name} ({i.count})
          </p>)
      }
      </CardBlock>
      </Card>
      </Col>
      <Col sm={{size: 4}}>
      <h3>Find Inventory: </h3>
      <Input size="sm" onChange={this.findInv.bind(this)}/>
      {this.state.findInventory &&
        <Card className="search-container">
        <CardBlock>
        {
          this.state.findInventory.map(i => <div key={`find-${i.id}`}>
            {i.name}
            <ul>
            {i.locations.map((l, index) => <li key={`loc-${index}`}>{l}</li>)}
            </ul>
            </div>)
        }
        </CardBlock>
        </Card>
      }
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
    }
  }
  inventory(simulatorId:$simulatorId) {
    id
    name
    roomCount {
      room {
        name
        id
      }
      count
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