import React, {Component} from 'react';
import { Row, Col, Container, Media, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Measure from 'react-measure';
import Immutable from 'immutable';
import Grid from './grid';
import TorpedoLoading from '../TorpedoLoading';
import {/*PhaserArc, */PhaserBeam} from '../PhaserCharging';

const TARGETING_QUERY = gql`
query Targeting($simulatorId: ID){
  targeting(simulatorId: $simulatorId){
    id
    type
    name
    quadrants
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    contacts {
      id
      quadrant
      icon
      size
      name
      speed
      system
      iconUrl
      picture
      targeted
      pictureUrl
    }
  }
  phasers(simulatorId: $simulatorId){
    id
    simulatorId
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    name
    beams {
      id
      state
      charge
      heat
    }
    arc
    coolant
  }
}`;

const TARGETING_SUB = gql`
subscription TargetingUpdate($simulatorId: ID){
  targetingUpdate(simulatorId: $simulatorId){
    id
    type
    name
    quadrants
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    contacts {
      id
      quadrant
      icon
      size
      name
      speed
      system
      iconUrl
      picture
      targeted
      pictureUrl
    }
  }
}`;

const PHASERS_SUB = gql`
subscription PhasersUpdate($simulatorId: ID!){
  phasersUpdate(simulatorId: $simulatorId){
    id
    simulatorId
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    name
    beams {
      id
      state
      charge
      heat
    }
    arc
    coolant
  }
}`;

class Targeting extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.targetingSubscription = null;
    this.phasersSubscription = null;
    this.phaserLoopId = null;
    this.mouseup = () => {
      const phasers = this.props.data.phasers[0];
      const mutation = gql`
      mutation StopFiring($id: ID!){
        stopPhaserBeams(id: $id)
      }`;
      const variables = {
        id: phasers.id,
      }
      this.props.client.mutate({
        mutation,
        variables
      })
    }
    this.stopCoolant = () => {
      const phasers = this.props.data.phasers[0];
      const mutation = gql`
      mutation PhaserCool($id: ID!, $beamId: ID){
        coolPhaserBeam(id: $id, beamId:$beamId)
      }`;
      const variables = {
        id: phasers.id,
        beamId: null
      }
      this.props.client.mutate({
        mutation,
        variables
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if (!this.targetingSubscription && !nextProps.data.loading) {
      this.targetingSubscription = nextProps.data.subscribeToMore({
        document: TARGETING_SUB,
        variables:{simulatorId: nextProps.simulator.id},
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({targeting: subscriptionData.data.targetingUpdate}).toJS();
        }
      });
      this.phasersSubscription = nextProps.data.subscribeToMore({
        document: PHASERS_SUB,
        variables:{simulatorId: nextProps.simulator.id},
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({phasers: subscriptionData.data.phasersUpdate}).toJS();
        }
      });
    }
  }
  targetContact(targetId){
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation TargetingTarget($systemId: ID!, $targetId: ID!){
      targetTargetingContact(id: $systemId, targetId: $targetId)
    }`;
    const variables = {
      systemId: targeting.id,
      targetId
    }
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  untargetContact(targetId){
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation UntargetContact($systemId: ID!, $targetId: ID!){
      untargetTargetingContact(id: $systemId, targetId: $targetId)
    }`;
    const variables = {
      systemId: targeting.id,
      targetId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  targetSystem(targetId, system){
    const targeting = this.props.data.targeting[0];
    const mutation = gql`
    mutation TargetContact($systemId: ID!, $targetId: ID!, $system: String!){
      targetSystem(id: $systemId, targetId: $targetId, system: $system)
    }`;
    const variables = {
      systemId: targeting.id,
      targetId,
      system
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  chargePhasers(beamId){
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
    mutation ChargePhaserBeam ($id: ID!, $beamId: ID!){
      chargePhaserBeam(id:$id, beamId:$beamId)
    }`;
    const variables = {
      id: phasers.id,
      beamId
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  dischargePhasers(beamId){
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
    mutation DischargePhaserBeam ($id: ID!, $beamId: ID!){
      dischargePhaserBeam(id:$id, beamId:$beamId)
    }`;
    const variables = {
      id: phasers.id,
      beamId
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  coolPhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
    mutation PhaserCool($id: ID!, $beamId: ID){
      coolPhaserBeam(id: $id, beamId:$beamId)
    }`;
    const variables = {
      id: phasers.id,
      beamId
    }
    this.props.client.mutate({
      mutation,
      variables
    })
    document.addEventListener('mouseup', this.stopCoolant);
  }
  firePhasers(beamId) {
    const phasers = this.props.data.phasers[0];
    const mutation = gql`
    mutation FirePhasers($id: ID!, $beamId: ID!){
      firePhaserBeam(id: $id, beamId: $beamId)
    }`;
    const variables = {
      id: phasers.id,
      beamId
    }
    this.props.client.mutate({
      mutation,
      variables
    });
    document.addEventListener('mouseup', this.mouseup);
  }
  render(){
    if (this.props.data.loading) return null;
    const targeting = this.props.data.targeting[0];
    const phasers = this.props.data.phasers[0];
    if (!targeting) return <p>No Targeting</p>;
    const targetedContact = targeting.contacts.find(t => t.targeted);
    return <Container fluid className="targeting-control">
    <Row>
    <Col sm="5">
    <Measure>
    {dimensions => {
      return dimensions.width !== 0 ? 
      <Grid 
      dimensions={dimensions} 
      targetContact={this.targetContact.bind(this)}
      untargetContact={this.untargetContact.bind(this)}
      targetedContact={targetedContact}
      targets={targeting.contacts} /> 
      : <div></div>
    }}
    </Measure>
    </Col>
    <Col sm="7">
    {phasers.beams.map((p, i) => <PhaserBeam 
      key={p.id} 
      {...p}
      index={i + 1}
      chargePhasers={this.chargePhasers.bind(this)}
      dischargePhasers={this.dischargePhasers.bind(this)}
      coolPhasers={this.coolPhasers.bind(this)}
      firePhasers={this.firePhasers.bind(this)}
      targeting={true}
      />)}
    <Row>
    <Col sm="8">
    <PhaserCoolant coolant={phasers.coolant} />
    </Col>
    </Row>
  {/*<PhaserArc client={this.props.client} phaserId={phasers.id} arc={phasers.arc} />*/}
  </Col>
  </Row>
  <Row className="target-area">
  <Col sm={3}>
  {targetedContact && 
    <div>
    <h4>Targeted Contact</h4>
    <Media>
    <Media left href="#">
    <Media object src={targetedContact.pictureUrl} alt="Generic placeholder image" />
    </Media>
    <Media body>
    <Media heading>
    {targetedContact.name}
    </Media>
    </Media>
    </Media>
    <Button block color="warning" onClick={this.untargetContact.bind(this, targetedContact.id)}>Unlock Target</Button>
    </div>
  }
  </Col>
  <Col sm={4}>
  {targetedContact && 
    <Row>
    <Col sm={12}>
    <h4>Systems Targeting</h4>
    </Col>
    {
      ["General", "Engines", "Sensors", "Tractor Beam", "Communications", "Weapons", "Shields"].map(s => {
        return <Col key={`system-${s}`} sm={6}>
        <label className="custom-control custom-radio">
        <input id="radio1" name="system" type="radio" onChange={this.targetSystem.bind(this, targetedContact.id, s)} checked={targetedContact.system === s} className="custom-control-input" />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{s}</span>
        </label>
        </Col>
      })
    }
   {/* Uncomment for other targeting
    <Col sm={6}>
    <label className="custom-control custom-radio">
    <input id="radio1" name="system" type="radio" className="custom-control-input" />
    <span className="custom-control-indicator"></span>
    <span className="custom-control-description"><Input size="sm" /></span>
    </label>
  </Col>*/}
  </Row>
}
</Col>
<Col sm={4}>
<TorpedoLoading simulator={this.props.simulator} />
</Col>
</Row>
</Container>
}
}

const PhaserCoolant = ({coolant}) => {
  return <div>
  <p>Coolant</p>
  <div className="chargeHolder coolantHolder">
  <div className="coolant" style={{width: `${coolant * 100}%`}}></div>
  </div>
  </div>
}
export default graphql(TARGETING_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(Targeting));
