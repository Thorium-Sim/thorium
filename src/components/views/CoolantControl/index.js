import React, {Component} from 'react';
import gql from 'graphql-tag';
import { Container, Row } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

import Tank from './tank';

import './style.scss';

const COOLANT_SUB = gql`
subscription CoolantUpdate($simulatorId: ID!){
  coolantUpdate(simulatorId: $simulatorId) {
    id
    name
    coolant
    coolantRate
  }
}`;

class CoolantControl extends Component {
  constructor(props){
    super(props);
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: COOLANT_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ coolant: subscriptionData.data.coolantUpdate }).toJS();
        }
      });
    }
  }
  render(){
    if (this.props.data.loading) return null;
    const coolant = this.props.data.coolant[0];
    const {systemCoolant} = this.props.data;
    return <Container fluid className="card-coolant">
    <Row >
    <Tank {...coolant}/>
    <div className="coolant-containers">
    {
      systemCoolant.map(s => {
        return <CoolantBar {...s} />
      })
    }
    </div>
    </Row>
    </Container>
  }
}

const CoolantBar = ({name, coolant}) => {
  return <div className="coolant-bar">
  <p>{name}</p>
  <CoolantLeftBracket />
  <CoolantMiddleBar />
  <div className="coolant-fill" style={{width: `calc(${coolant * 100}% - 15px)`}}></div>
  <CoolantRightBracket />
  </div>
};

const CoolantLeftBracket = () => {
  return <div className="coolant-bracket">
  <svg height="100%" style={{"fillRule":"evenodd","clipRule":"evenodd","strokeLinejoin":"round","strokeMiterlimit":"1.41421"}} width="100%" version="1.1" viewBox="0 0 7 37" xmlSpace="preserve">
  <path style={{"fill":"#2f2f2f"}} d="M2,0.009l0,-0.009l5,0l0,37l-5,0l0,-1.991l1,0l0,-1l-1,0l0,-10l-1,0l-1,0l0,-3l2,0l0,-5l-2,0l0,-1l0,-1l0,-1l2,0l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l0,-1l1,0l0,-1l-1,0l0,-2l0,0ZM4,35.009l0,0.991l2,0l0,-0.991l-2,0ZM6,3.009l-2,0l0,31l2,0l0,-6.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-2.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991l0,-0.009l0,-1.991ZM6,1l-2,0l0,1.009l0,-0.009l2,0l0,-0.991l0,-0.009l0,0Z"/>
  </svg>
  </div>
}
const CoolantRightBracket = () => {
  return <div className="coolant-bracket right">
  <svg height="100%" style={{"fillRule":"evenodd","clipRule":"evenodd","strokeLinejoin":"round","strokeMiterlimit":"1.41421"}} width="100%" version="1.1" viewBox="0 0 5 35" xmlSpace="preserve">
  <path style={{"fill":"#2f2f2f"}} d="M1,35l0,-2l2,0l0,-31l-3,0l0,-2l5,0l0,35l-4,0Z"/>
  </svg>
  </div>
}
const CoolantMiddleBar = () => {
  return <div className="coolant-bracket center"></div>
}
const COOLANT_QUERY = gql`
query Coolant($simulatorId: ID!){
  coolant(simulatorId: $simulatorId){
    id
    name
    coolant
    coolantRate
  }
  systemCoolant(simulatorId: $simulatorId) {
    systemId
    simulatorId
    subId
    subKey
    name
    coolant
    coolantRate
  }
}
`;
export default graphql(COOLANT_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CoolantControl));