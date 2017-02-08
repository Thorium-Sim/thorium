import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const SPEEDCHANGE_SUB = gql`
subscription SpeedChanged{
  speedChange{
    id
    speed
    on
  }
}`;

class EngineCoreView extends Component {
  constructor(props){
    super(props);
    this.setSpeedSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.setSpeedSubscription && !nextProps.data.loading) {
      this.setSpeedSubscription = nextProps.data.subscribeToMore({
        document: SPEEDCHANGE_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          previousResult.engines = previousResult.engines.map(engine => {
            if (engine.id === subscriptionData.data.speedChange.id){
              engine.speed = subscriptionData.data.speedChange.speed;
              engine.on = subscriptionData.data.speedChange.on;
            } 
            return engine;
          })
          return previousResult;
        },
      });
    }
  }
  updateSpeed(e){
    const id = e.target.value.split('$')[0];
    const speed = parseInt(e.target.value.split('$')[1],10) + 1;
    if (id === 'Full Stop'){
      //Pick the first engine
      this.props.setSpeed({id: this.props.data.engines[0].id, speed: -1, on: false})
    } else {
      this.props.setSpeed({id: id, speed:speed, on: true})
    }
  }
  render(){
    let speedList = [];
    let onEngine = "Full Stop";
    if (!this.props.data.loading){
      this.props.data.engines.forEach((engine) => {
        if (engine.on) onEngine = `${engine.id}$${engine.speed - 1}`;
        speedList.push({disabled: true, text: engine.name});
        engine.speeds.forEach((speed, index) => {
          speedList.push({text: speed.text, engineId: engine.id, index});
        })
      })
    }
    return (
      this.props.data.loading ? <span>"Loading..."</span> :
      <div>
      <p>Engine Control</p>
      { speedList.length > 0 ?
      <select value={onEngine} onChange={this.updateSpeed.bind(this)}>
      <option>Full Stop</option>
      { 
        speedList.map((output,index) => {
          return <option key={index} value={`${output.engineId}$${output.index}`} disabled={output.disabled}>{output.text}</option>;
        }) 
      }
      </select>
      : "No engines"
      }
      </div>
      )
  }
}

const ENGINE_QUERY = gql`
query getEngines($simulatorId: ID!){
  engines(simulatorId: $simulatorId) {
    id,
    name
    speeds {
      text
      number
    }
    heat
    speed
    on
  }
}
`;

const SET_SPEED = gql`
mutation setSpeed($id: ID!, $speed: Int!, $on: Boolean){
  setSpeed(id: $id, speed: $speed, on: $on)
}
`;

export default compose(
  graphql(ENGINE_QUERY, {
    options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
  }),
  graphql(SET_SPEED, {name: 'setSpeed',
    props: ({setSpeed}) => ({
      setSpeed: (props) => setSpeed({
        variables: Object.assign(props)
      })
    })
  })
  )(EngineCoreView);
