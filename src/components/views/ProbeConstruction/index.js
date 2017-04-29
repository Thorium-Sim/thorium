import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Container, Button, Row, Col } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

import './style.scss';

const PROBES_SUB = gql`
subscription ProbesUpdate($simulatorId: ID!) {
  probesUpdate (simulatorId: $simulatorId){
    id
    simulatorId
    type
    types {
      id
      name
      size
      count
      description
      availableEquipment {
        id
        name
        size
        count
        description
      }
    }
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    torpedo
  }
}`;

class ProbeConstruction extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedProbeType: null
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: PROBES_SUB,
        variables: {simulatorId: this.props.simulator.id},
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ probes: subscriptionData.data.probesUpdate }).toJS();
        },
      });
    }
  }
  selectProbe(id) {
    this.setState({
      selectedProbeType: this.state.selectedProbeType ? null : id
    });
  }
  render(){
    if (this.props.data.loading) return null;
    const probes = this.props.data.probes[0];
    const {selectedProbeType} = this.state;
    if (!probes) return <p>No Probe Launcher</p>;
    return <Container fluid className="probe-construction">
    <ProbeSelector 
    types={probes.types} 
    selectedProbeType={selectedProbeType}
    selectProbe={this.selectProbe.bind(this)} />
    </Container>
  }
}

const ProbeSelector = ({types, selectedProbeType, selectProbe}) => {
  return <Row>
  <Col sm={12} className="probe-container">
  {types.map((t, i) => {
    const probeImage = require(`./probes/${t.id}.svg`);
    const transformX = (i * 10) * (100/types.length); 
    return <div 
    className={`probe-type ${selectedProbeType ? 'probeSelected' : ''} ${selectedProbeType === t.id ? 'selected' : ''}`}
    onClick={selectProbe.bind(this, t.id)}
    style={{transform: selectedProbeType === t.id ? `translateX(500%)` : `translateX(${transformX}%)`}}
    >
    <p>{t.name}: {t.count}</p>
    <img draggable="false" src={probeImage} role="presentation" />
    </div>
  })}
  </Col>
  </Row>
}

const PROBES_QUERY = gql`
query Probes($simulatorId: ID!){
  probes(simulatorId: $simulatorId){
    id
    simulatorId
    type
    types {
      id
      name
      size
      count
      description
      availableEquipment {
        id
        name
        size
        count
        description
      }
    }
    name
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    torpedo
  }
}`;

export default  graphql(PROBES_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(ProbeConstruction));