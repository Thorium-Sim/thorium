import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import {Input} from 'reactstrap';

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

class CargoControlCore extends Component {
  constructor(props){
    super(props);
    this.inventorySub = null;
    this.state = {
      findInventory: null,
      deck: null,
      room: null,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.inventorySub && !nextProps.data.loading) {
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
  setSelected(which, e) {
    const {decks} = this.props.data;
    let deck, room;
    if (which === 'deck') deck = e.target.value;
    else {
      deck = this.state.deck;
      room = e.target.value;
    }
    if (decks.length === 1) deck = decks[0].id;
    this.setState({
      deck,
      room
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
    let {deck, room} = this.state;
    return <div className="cargo-core">
    <p>Cargo</p>
    <Input size="sm" onChange={this.findInv.bind(this)} />
    { this.state.findInventory && 
      <div className="find-overlay">
      {
        this.state.findInventory.map(i => <div key={`find-${i.id}`}>
          {i.name}
          <ul>
          {i.locations.map((l, index) => <li key={`loc-${index}`}>{l}</li>)}
          </ul>
          </div>)
      }
      </div>
    }
    <select onChange={this.setSelected.bind(this, 'deck')}>
    <option disabled selected>Select Deck</option>
    {decks.map(d => <option key={d.id} value={d.id}>Deck {d.number}</option>)}
    </select>
    <select disabled={!deck} onChange={this.setSelected.bind(this, 'room')}>
    <option disabled selected>Select Room</option>
    {deck && decks.find(d => d.id === deck).rooms
      .map(r => <option key={r.id} value={r.id}>{r.name}</option>)
    }
    </select>
    {
      room && inventory.map(i => {
        const roomCount = i.roomCount.find(r => r.room.id === room);
        if (!roomCount) return null;
        if (roomCount.count === 0) return null;
        return {id: i.id, name: i.name, count: roomCount.count}
      }).filter(i => i)
      .map(i => <p key={`to-${i.id}`}>
        {i.name} ({i.count})
        </p>)
    }
    </div>
  }
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
})(withApollo(CargoControlCore));