import React, {Component} from 'react';
import { Row, Col, Container } from 'reactstrap';
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
    mutation UntargetContact($systemId: ID!, $targetId: ID!, $system: String!){
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
    const targetedContact = targeting.targets.find(t => t.targeted);
    return <Container fluid>
    <Row>
    <Col sm="5">
    <Measure>
    {dimensions => {
      return dimensions.width !== 0 ? 
      <Grid 
      dimensions={dimensions} 
      targetContact={this.targetContact.bind(this)}
      targets={targeting.targets} /> 
      : <div></div>
    }}
    </Measure>
    </Col>
    </Row>
    </Container>
  }
}

export default graphql(TARGETING_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(Targeting));
