import React from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const EngineCoreView = (props) => {
  let speedList = [];
  if (!props.data.loading){
    props.data.engines.forEach((engine) => {
      speedList.push({disabled: true, text: engine.name});
      engine.speeds.forEach((speed) => {
        speedList.push({text: speed.text});
      })
    })
  }
  return (
    props.data.loading ? <span>"Loading..."</span> :
    <div>
    <p>Engine Control</p>
    <select>
    { 
      speedList.map(output => {
        return <option disabled={output.disabled}>{output.text}</option>;
      }) 
    }
    </select>
    </div>
    )
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
    coolant
    speed
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
    options: (props) => ({ variables: { simulatorId: 'test' } }),
  }),
  graphql(SET_SPEED, {name: 'setSpeed',
    props: ({setSpeed}) => ({
      setSpeed: (props) => setSpeed({
        variables: Object.assign(props)
      })
    })
  })
  )(EngineCoreView);
