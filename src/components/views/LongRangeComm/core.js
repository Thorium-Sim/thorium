import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import gql from 'graphql-tag';
import './style.scss';

const MESSAGES_SUB = gql `
subscription LRDecoding($simulatorId: ID) {
  longRangeCommunicationsUpdate(simulatorId: $simulatorId, sent: true) {
    id
    simulatorId
    name
    messages {
      id
      a
      f
      ra
      rf
      sender
      message
      decodedMessage
      datestamp
    }
  }
}
`;

class LRCommCore extends Component {
  constructor(props) {
    super(props);
    this.decodeSubscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.decodeSubscription && !nextProps.data.loading) {
      this.decodeSubscription = nextProps.data.subscribeToMore({
        document: MESSAGES_SUB,
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
  render() {
    if (this.props.data.loading) return null;
    return (<div className="comm-core">
      <p>Long Range Messages - Receiving</p>
      {
        (this.props.data.longRangeCommunications.length > 0 ? <div className="comm-messages">
          {this.props.data.longRangeCommunications[0].messages.map(m => <pre>{`${m.datestamp}
            From: ${m.sender}
            ${m.message}`}</pre>)}
          </div>
          : "No Long Range Comm")
      }
      </div>);
  }
}


const MESSAGES_QUERY = gql `
query LRDecoding($simulatorId: ID){
  longRangeCommunications(simulatorId: $simulatorId, crew: false, sent: true){
    id
    simulatorId
    name
    messages {
      id
      a
      f
      ra
      rf
      sender
      message
      decodedMessage
      datestamp
    }
  }
}
`;

export default graphql(MESSAGES_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(LRCommCore));