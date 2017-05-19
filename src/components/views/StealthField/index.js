import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import './style.scss';

const STEALTH_SUB = gql`
subscription SimulatorSub($simulatorId: ID){
  simulatorsUpdate(simulatorId: $simulatorId){
    id
    ship {
      clamps
      ramps
      airlock
    }
  }
}`;


const limit = 0.05;
const factor = 0.005;
class StealthField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: props.systems || []
    }
    this.subscription = null;
    this.loop = this.loop.bind(this);
    window.requestAnimationFrame(this.loop);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: STEALTH_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ stealthField: subscriptionData.data.stealthFieldUpdate }).toJS();
        }
      });
    }
  }
  loop(currentTime) {
    window.requestAnimationFrame(this.loop);
    if (Math.round(currentTime) % 2 !== 0) return;
    const systemsState = this.state.systems;
    const systemsProps = this.props.systems;
    this.setState({
      systems: systemsState.map(s => {
        const propSys = systemsProps.find(ps => ps.id === s.id);
        let sign = Math.sign(Math.random() - 0.5);
        if (Math.abs(s.stealthFactor - propSys.stealthFactor) > limit) {
          sign = -1 * Math.sign(s.stealthFactor - propSys.stealthFactor);
        }
        let stealthFactor = Math.min(1, Math.max(0, s.stealthFactor + (sign * Math.random() * factor)));
        
        return {
          id: s.id,
          name: s.name,
          stealthFactor
        }
      })
    })
  }
  render() {
    if (this.props.data.loading) return null;
    const stealthField = this.props.data.stealthField;
    if (!stealthField) return <p>No Stealth Field</p>;
    const {systems} = this.state;
    return (
      <Container fluid className="card-stealthField">
      {stealthField.state && systems.map(s => {
        return <Row key={s.id}>
        <Col sm="3">{s.name}</Col>
        <Col sm="9">
        <div className="bar-container">
        <div className="bar" style={{
          width: `${s.stealthFactor * 100}%`,
          backgroundSize: `${100 / s.stealthFactor}%`
        }}></div>
        </div>
        </Col>
        </Row>;
      })
    }
    </Container>
    )
  }
}

const STEALTH_QUERY = gql`
query StealthField($simulatorId: ID!) {
  stealthField(simulatorId: $simulatorId) {
    id
    name
    state
    charge
    activated
    quadrants {
     fore
     aft
     port
     starboard
   }
  }
}`;

export default graphql(STEALTH_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(StealthField));
