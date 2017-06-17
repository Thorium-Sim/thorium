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
  Circle
} = ReactKonva;

const SENSORCONTACT_SUB = gql`
subscription SensorContactsChanged($sensorId: ID) {
  sensorContactUpdate(sensorId: $sensorId){
    id
    name
    size
    color
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
    const {dimensions, data, core, speed, setSelectedContact, selectedContact} = this.props;
    const {sensorContacts: contacts} = data;
    const {width} = dimensions;
    const padding = core ? 15 : 0;
    const radius = width / 2 - padding;
    return <div id="sensorGrid">
    <Stage width={width} height={width}>
    <Layer>
    {core && <Circle
      radius={radius * 1.08} 
      x={radius + padding}
      y={radius + padding}
      stroke={'gray'}
      fill={'gray'}
      strokeWidth={1}/>
    }
    <Circle
    radius={radius} 
    x={radius + padding}
    y={radius + padding}
    fillRadialGradientStartPoint={{
      x: 0,
      y: 0,
    }}
    fillRadialGradientStartRadius={radius / 2}
    fillRadialGradientEndPoint={{
      x: 0,
      y: 0,
    }}
    fillRadialGradientEndRadius={radius}
    fillRadialGradientColorStops={[0, 'rgba(0,0,0,0.6)', 1, '#000']}
    fill={core ? 'black' : null}
    stroke={'gray'}
    strokeWidth={2}/>
    <Circle
    radius={radius * 0.66} 
    x={radius + padding}
    y={radius + padding}
    stroke={'gray'}
    strokeWidth={1}/>
    <Circle
    radius={radius * 0.33} 
    x={radius + padding}
    y={radius + padding}
    stroke={'gray'}
    strokeWidth={1}/>
    {
      Array(12).fill(1).map((a, i) => {
        return (<Line key={`line-${i}`}
          stroke={'gray'}
          strokeWidth={1}
          points={[radius + padding, radius + padding, Math.cos(degtorad(i * 30 + 15)) * radius + radius + padding, Math.sin(degtorad(i * 30 + 15)) * radius + radius + padding]} />
          )
      })
    }
    </Layer>
    <Layer>
    {
      contacts.map(contact => <SensorContact
        key={contact.id}
      core={core}
      sensor={this.props.sensor}
      {...contact}
      speed={speed}
      dimensions={dimensions}
      radius={radius}
      padding={padding}
      mouseover={this.props.hoverContact}
      setSelectedContact={setSelectedContact}
      selectedContact={selectedContact} />)
    }
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
    color
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
