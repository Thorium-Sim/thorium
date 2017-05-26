import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import {Container, Row, Col, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import assetPath from '../../../helpers/assets';
import DamageOverlay from '../helpers/DamageOverlay';

/*const INTERNAL_SUB = gql`
subscription InternalCommUpdate($simulatorId: ID!) {

}`;*/

class CargoControl extends Component {
  constructor(props){
    super(props);
    this.internalSub = null;
    this.state = {
      toDeck: null,
      fromDeck: null,
      toRoom: null,
      fromRoom: null
    }
  }
  componentWillReceiveProps(nextProps) {
    /*if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ internalComm: subscriptionData.data.longRangeCommunicationsUpdate }).toJS();
        }
      });
    }*/
  }
  render(){
    if (this.props.data.loading) return null;
    const decks = this.props.data.decks;
    const {toDeck, toRoom} = this.state;
    return (
      <Container className="internal-comm">
      <Row>
      <Col sm={{size: 2, offset: 1}}>
      </Col>
      <Col sm={{size: 2}}>
      <UncontrolledDropdown>
      <DropdownToggle block caret>
      {toDeck ? `Deck ${decks.find(d => d.id === toDeck).number}` : 'Select Deck'}
      </DropdownToggle>
      <DropdownMenu>
      {
        decks.map(d => <DropdownItem key={d.id} onClick={() => {
          this.setState({toDeck: d.id, toRoom: null})
        }}>{`Deck ${d.number}`}</DropdownItem>)
      }
      </DropdownMenu>
      </UncontrolledDropdown>
      </Col>
      <Col sm={{size: 3}}>
      <UncontrolledDropdown>
      <DropdownToggle block caret>
      {toRoom ? decks.find(d => d.id === toDeck).rooms.find(r => r.id === toRoom).name : 'Select Room'}
      </DropdownToggle>
      { toDeck && 
        <DropdownMenu>
        <DropdownItem header>Deck {decks.find(d => d.id === toDeck).number}</DropdownItem>
        {
          decks.find(d => d.id === toDeck).rooms.map(r => <DropdownItem key={r.id} onClick={() => {
            this.setState({toRoom: r.id})
          }}>{r.name}</DropdownItem>)
        }
        </DropdownMenu>
      }
      </UncontrolledDropdown>
      </Col>
      <Col sm={{size: 2}}>
      </Col>
      </Row>
      </Container>)
  }
}

const INVENTORY_QUERY = gql`
query Inventory($simulatorId: ID!) {
  decks(simulatorId: $simulatorId) {
    id
    number
    rooms {
      id
      name
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