import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import {Container, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBlock, CardTitle} from 'reactstrap';
import assetPath from '../../../helpers/assets';
import DamageOverlay from '../helpers/DamageOverlay';
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
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ inventory: subscriptionData.data.inventoryUpdate }).toJS();
        }
      });
    }
  }
  setSelectedTo({deck, room}) {
    this.setState({
      toDeck: deck,
      toRoom: room
    })
  }
  setSelectedFrom({deck, room}) {
    this.setState({
      fromDeck: deck,
      fromRoom: room
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const {decks, inventory} = this.props.data;
    let {toDeck, toRoom, fromDeck, fromRoom} = this.state;
    if (decks.length <= 1) toDeck = decks[0].id;
    if (decks.length <= 1) fromDeck = decks[0].id;
    return (
      <Container fluid className="cargo-control">
      <Row>
      {decks.length > 1 &&
        <Col sm="2">
        <DeckDropdown
        selectedDeck={toDeck}
        decks={decks}
        setSelected={this.setSelectedTo.bind(this)} />
        </Col>
      }
      <Col sm={decks.length > 1 ? 2 : 4}>
      <RoomDropdown
      selectedDeck={toDeck}
      selectedRoom={toRoom}
      decks={decks}
      setSelected={this.setSelectedTo.bind(this)} />
      </Col>

      {decks.length > 1 &&
        <Col sm={{size: 2, offset: 4}}>
        <DeckDropdown
        selectedDeck={fromDeck}
        decks={decks}
        setSelected={this.setSelectedTo.bind(this)} />
        </Col>
      }
      <Col sm={{size: decks.length > 1 ? 2 : 4, offset: 4}}>
      <RoomDropdown
      selectedDeck={fromDeck}
      selectedRoom={fromRoom}
      decks={decks}
      setSelected={this.setSelectedFrom.bind(this)} />
      </Col>
      </Row>
      <Row className="inventoryRow">
      <Col sm={4}>
      <Card>
      <CardBlock>
      {
        toRoom && inventory.filter(i => i.roomCount.find(r => r.room.id === toRoom))
        .map(i => <p key={i.id}>
          {i.name} ({i.roomCount.find(r => r.room.id === toRoom).count})
          </p>)
      }
      </CardBlock>
      </Card>
      </Col>
      <Col sm={4}>
      <h4>Ready Cargo</h4>
      <Card className="readyCargo">
      <CardBlock>

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
        fromRoom && inventory.filter(i => i.roomCount.find(r => r.room.id === fromRoom))
        .map(i => <p key={i.id}>
          {i.name} ({i.roomCount.find(r => r.room.id === fromRoom).count})
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

const RoomDropdown = ({selectedDeck, selectedRoom, decks, setSelected}) => {
  return <UncontrolledDropdown>
  <DropdownToggle block caret>
  {selectedRoom ? decks.find(d => d.id === selectedDeck).rooms.find(r => r.id === selectedRoom).name : 'Select Room'}
  </DropdownToggle>
  { selectedDeck && 
    <DropdownMenu>
    <DropdownItem header>Deck {decks.find(d => d.id === selectedDeck).number}</DropdownItem>
    {
      decks.find(d => d.id === selectedDeck).rooms.map(r => <DropdownItem key={r.id} onClick={() => {
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
  inventory(simulatorId: $simulatorId) {
    name
    roomCount {
      room {
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