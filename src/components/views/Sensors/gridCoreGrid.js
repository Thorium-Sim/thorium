import React, { Component } from 'react';
import ReactKonva from 'react-konva';
import SensorContact from './SensorContact';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

function degtorad(deg){
  return deg *(Math.PI/180);
}

// Implement The following:
// weaponsRange
// hoverContact

const {
  Layer,
  Line,
  Stage,
  Rect,
  Circle
} = ReactKonva;

const SENSORCONTACT_SUB = gql`
subscription SensorContactsChanged($sensorId: ID) {
  sensorContactUpdate(sensorId: $sensorId){
    id
    name
    size
    iconUrl
    pictureUrl
    speed 
    velocity {
      x
      y
      z
    }
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    infrared
    cloaked
    destroyed
  }
}`;

class GridCoreGrid extends Component { 
  sensorContactsSubscription = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sensorsSubscription && !nextProps.data.loading) {
      this.sensorsSubscription = nextProps.data.subscribeToMore({
        document: SENSORCONTACT_SUB,
        variables: {sensorId: this.props.sensor},
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.mergeDeep({sensorContacts: subscriptionData.data.sensorContactUpdate}).toJS();
        },
      });
    }
  }
  render(){
    if (this.props.data.loading) return null;
    const {dimensions, data, core} = this.props;
    const {sensorContacts: contacts} = data;
    const {width} = dimensions;
    const radius = width / 2;
    return <div id="sensorGrid">
    <Stage width={width} height={width}>
    <Layer>
    <Circle
    radius={radius} 
    x={radius}
    y={radius}
    stroke={'gray'}
    fill={'black'}
    strokeWidth={2}/>
    <Circle
    radius={radius * 0.66} 
    x={radius}
    y={radius}
    stroke={'gray'}
    strokeWidth={1}/>
    <Circle
    radius={radius * 0.33} 
    x={radius}
    y={radius}
    stroke={'gray'}
    strokeWidth={1}/>
    {
      Array(12).fill(1).map((a, i) => {
        return (<Line key={`line-${i}`}
          stroke={'gray'}
          strokeWidth={1}
          points={[radius, radius, Math.cos(degtorad(i * 30 + 15)) * radius + radius, Math.sin(degtorad(i * 30 + 15)) * radius + radius]} />
          )
      })
    }
    </Layer>
    <Layer>
    {
      contacts.map(contact => <SensorContact key={contact.id} core={core} sensor={this.props.sensor} {...contact} dimensions={dimensions} radius={radius} />)
    }
    <Rect fill={"red"} x={200} y={14} width={10} height={10} />
    </Layer>
    </Stage>
    </div>
  }
}

const CONTACTS_QUERY = gql`
query Contacts($sensorsId: ID) {
  sensorContacts(sensorsId: $sensorsId) {
    id
    name
    size
    iconUrl
    pictureUrl
    speed 
    velocity {
      x
      y
      z
    }
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    infrared
    cloaked
    destroyed
  }
}`;

export default graphql(CONTACTS_QUERY, {
  options: ({sensor}) => ({variables:{sensorsId: sensor}})
})(withApollo(GridCoreGrid));
