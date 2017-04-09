import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Row, Col, Container, Card } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Measure from 'react-measure';
import Immutable from 'immutable';
import './style.scss';
/* TODO

Some improvements:
- Make it so you can just click on a box or a yellow line to set the power level
- Make it so the names show up better (add a display name to the system class)
- Change the types of the systems to make it easier to sort the systems by name.
*/

const mutation = gql`
mutation ChangePower($id: ID!, $level: Int!){
  changePower(systemId: $id, power: $level)
}`;

const SYSTEMS_SUB = gql`
subscription SystemsUpdate($simulatorId: ID){
  systemsUpdate(simulatorId: $simulatorId) {
    name
    type
    id
    power {
      power
      powerLevels
    }
  }
}`;

class PowerDistribution extends Component {
  constructor(props){
    super(props);
    this.state = {
      systems: [],
      offset:null,
      sysId: null
    };
    this.mouseMove = (e) => {
      const mouseX = e.pageX;
      const level = Math.max(0,Math.min(40,(Math.round((mouseX - this.state.offset - 10)/14))));
      const {systems, sysId} = this.state;
      const newSystems = systems.map(s => {
        if (s.id === sysId){
          const newSys = JSON.parse(JSON.stringify(s));
          newSys.power.power = level;
          return newSys;
        }
        return s;
      })
      this.setState({
        systems: newSystems
      })
    }
    this.mouseUp = () => {
      document.removeEventListener('mousemove', this.mouseMove);
      document.removeEventListener('mouseup', this.mouseUp);
      const system = this.state.systems.find(s => s.id === this.state.sysId);
      const variables = {
        id: system.id,
        level: system.power.power
      }
      this.props.client.mutate({
        mutation,
        variables
      })
      this.setState({
        offset:null,
        sysId: null
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      this.setState({
        systems: nextProps.data.systems
      });
    }
    if (!this.systemSub && !nextProps.data.loading) {
      this.systemSub = nextProps.data.subscribeToMore({
        document: SYSTEMS_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ systems: subscriptionData.data.systemsUpdate }).toJS();
        }
      });
    }
  }
  mouseDown(sysId, dimensions, e){
    this.setState({
      sysId,
      offset: dimensions.left,
    })
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  }
  render() {
    if (this.props.data.loading) return null;
    const powerTotal = this.state.systems.reduce((prev, next) => {
      return next.power.power + prev;
    },0);
    return <Container fluid className="powerLevels">
    <Row>
    <Col sm="8" className="powerlevel-containers">
    {
      this.state.systems.slice(0).sort((a,b) => {
        if (a.type > b.type) return 1;
        if (a.type < b.type) return -1;
        return 0;
      }).map(sys => <SystemPower {...sys} mouseDown={this.mouseDown.bind(this)} />)
    }
    <h4 className="totalPowerText">Total Power Used: {powerTotal}</h4>
    </Col>
    <Col sm="4">
    <Card>
    <div className="battery-container">
    <Battery />
    <Battery />
    <Battery />
    <Battery />
    </div>
    </Card>
    </Col>
    </Row>
    </Container>
  }
}

const SystemPower = ({ id,name, power:{power, powerLevels}, mouseDown}) => {
  return <Row>
  <Col sm="4">
  <h5>{name}: {power}</h5>
  </Col>
  <Col sm="8">
  <Measure>
  {dimensions => (
    <div className="powerLine">
    {
      powerLevels.map((n) => {
        return <div className="powerLevel" key={`${id}-powerLine-${n}`} style={{left: `${(n+1)*(14) - 7}px`}}></div>
      })
    }
    <div className="powerBox zero" onMouseDown={mouseDown.bind(this, id, dimensions)} key={`${id}-${-1}`}></div>
    {     
      Array(40).fill(0).map((n, i) => {
        return <div className={`powerBox ${i >= power ? 'hidden' : ''}`} onMouseDown={mouseDown.bind(this, id, dimensions)} key={`${id}-${i}`}></div>
      })
    }
    </div>
    )}
  </Measure>
  </Col>
  </Row>
}

const Battery = ({level = 1}) => {
 return <div className="battery">
 <div className="battery-bar" style={{height: `${level * 100}%`}}></div>
 <div className="battery-level">{level * 100}</div>
 </div>
}
const SYSTEMS_QUERY = gql`
query Systems($simulatorId: ID) {
  systems(simulatorId: $simulatorId) {
    name
    type
    id
    power {
      power
      powerLevels
    }
  }
}`;

export default graphql(SYSTEMS_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(PowerDistribution))



