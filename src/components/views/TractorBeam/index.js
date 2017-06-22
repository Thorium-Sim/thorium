import React, {Component} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import assetPath from '../../../helpers/assets';
import Beam from './beam';
import Target from './target';
import Bars from './bars';
import './style.scss';

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
    return <Container className="tractor-beam">
    <Beam shown={tractorBeam.state} />
    <img className="ship-side" src={assetPath('/Ship Views/Right', 'default', 'png', false)} draggable="false" />
    <Target shown={tractorBeam.target} />
    <Bars
    color={'blue'}
    simulator={this.props.simulator}
    level={0.5}
    />
    <Bars
    arrow
    simulator={this.props.simulator}
    level={0.5}
    />
    <Button size="lg" className="activate" disabled={!tractorBeam.target}>{tractorBeam.state ? 'Deactivate' : 'Activate'} Tractor Beam</Button>
    </Container>
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