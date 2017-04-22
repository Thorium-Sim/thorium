import React, {Component} from 'react';
import { Row, Col, Container, Media, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Measure from 'react-measure';
import Immutable from 'immutable';
import Grid from './grid';

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


class Targeting extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps){
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: TARGETING_SUB,
        updateQuery: (previousResult, {subscriptionData}) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({targeting: subscriptionData.data.targetingUpdate}).toJS();
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
  render(){
    if (this.props.data.loading) return null;
    const targeting = this.props.data.targeting[0];
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
    </Row>
    {targetedContact && 
    <Row className="target-area">
    <Col sm={3}>
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
    </Col>
    <Col sm={4}>
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
    </Col>
    </Row>
  }
    </Container>
  }
}

export default graphql(TARGETING_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(Targeting));
