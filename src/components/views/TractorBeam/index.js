import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

const TRACTORBEAM_SUB = gql`
subscription TractorBeamUpdate($simulatorId: ID!) {
   tractorBeamUpdate(simulatorId: $simulatorId) {
    id
    state
    target
    strength
    stress
  }
}`;

class TractorBeam extends Component {
  constructor(props){
    super(props);
    this.tractorBeamSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.tractorBeamSub && !nextProps.data.loading) {
      this.tractorBeamSub = nextProps.data.subscribeToMore({
        document: TRACTORBEAM_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ tractorBeam: subscriptionData.data.tractorBeamUpdate }).toJS();
        }
      });
    }
  }
  render(){
    if (this.props.data.loading) return null;
    const tractorBeam = this.props.data.tractorBeam[0];
    if (!tractorBeam) return <p>No Tractor Beam</p>;
    return <div>This is a template</div>
  }
}

const TRACTORBEAM_QUERY = gql`
query TractorBeamInfo($simulatorId: ID!) {
  tractorBeam(simulatorId: $simulatorId) {
    id
    state
    target
    strength
    stress
  }
}
`;
export default graphql(TRACTORBEAM_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(TractorBeam));