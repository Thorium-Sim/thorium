import React, {Component} from 'react';
import { Container, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import assetPath from '../../../helpers/assets';
import Beam from './beam';
import Target from './target';
import Bars from './bars';
import DamageOverlay from '../helpers/DamageOverlay';
import './style.scss';

const TRACTORBEAM_SUB = gql`
subscription TractorBeamUpdate($simulatorId: ID!) {
 tractorBeamUpdate(simulatorId: $simulatorId) {
  id
  state
  target
  strength
  stress
  damage {
    damaged
    report
  }
  power {
    power
    powerLevels
  }
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
  toggleBeam = () => {
    const tractorBeam = this.props.data.tractorBeam[0];
    const mutation = gql`
    mutation TractorBeamState ($id: ID!, $state: Boolean!) {
      setTractorBeamState(id: $id, state: $state)
    }`;
    const variables = {
      id: tractorBeam.id,
      state: !tractorBeam.state
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const tractorBeam = this.props.data.tractorBeam[0];
    if (!tractorBeam) return <p>No Tractor Beam</p>;
    return <Container className="tractor-beam">
    <DamageOverlay system={tractorBeam} message="Tractor Beam Offline" />
    <Beam shown={tractorBeam.state} />
    <img className="ship-side" src={assetPath('/Ship Views/Right', 'default', 'png', false)} draggable="false" />
    <Target shown={tractorBeam.target} />
    <Bars
    className="stressBar"
    flop
    label="Stress"
    active={tractorBeam.state}
    simulator={this.props.simulator}
    level={Math.abs(tractorBeam.stress - 1)}
    />
    <Bars
    className="strengthBar"
    label="Strength"
    arrow
    color={'blue'}
    active={tractorBeam.state}
    simulator={this.props.simulator}
    level={Math.abs(tractorBeam.strength - 1)}
    id={tractorBeam.id}
    />
    <Button size="lg" onClick={this.toggleBeam} className="activate" disabled={!tractorBeam.target}>{tractorBeam.state ? 'Deactivate' : 'Activate'} Tractor Beam</Button>
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
    damage {
      damaged
      report
    }
    power {
      power
      powerLevels
    }
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