import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

const INTERNAL_SUB = gql``;

class InternalComm extends Component {
  constructor(props){
    super(props);
    this.internalSub = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.internalSub && !nextProps.data.loading) {
      this.internalSub = nextProps.data.subscribeToMore({
        document: INTERNAL_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ longRangeCommunications: subscriptionData.data.longRangeCommunicationsUpdate }).toJS();
        }
      });
    }
  }
  render(){
    return <div>This is a template</div>
  }
}

const INTERNAL_QUERY = gql`
`;
export default graphql(INTERNAL_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(InternalComm));