import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { TypingField, InputField } from '../../generic/core';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import gql from 'graphql-tag';
import './style.scss';

const DECODING_SUB = gql `
subscription LRDecoding($simulatorId: ID!) {
  longRangeCommunicationsUpdate(simulatorId: $simulatorId) {
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
    this.state = {
      messageSender: '',
      message: '',
      decoded: false
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.decodeSubscription && !nextProps.data.loading) {
      this.decodeSubscription = nextProps.data.subscribeToMore({
        document: DECODING_SUB,
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ longRangeCommunications: subscriptionData.data.longRangeCommunicationsUpdate }).toJS();
        }
      });
    }
  }
  _lrmText(e) {
    let value = e.target.value;
    const regex = /.*(?= out| out\.)/gi;
    const match = value.match(regex);
    if (match) {
      this.setState({
        messageSender: match[match.length - 2]
      });
    }
    this.setState({
      message: value
    });
  }
  _updateSender(e) {
    this.setState({
      messageSender: e
    })
  }
  _sendMessage() {
    const mutation = gql `mutation sendLRM ($id: ID!, $sender: String, $message: String!, $decoded: Boolean){
      sendLongRangeMessage(id: $id, crew: true, sender: $sender, message: $message, decoded: $decoded)
    }`;
    const variables = {
      id: this.props.data.longRangeCommunications[0].id,
      sender: this.state.messageSender,
      message: this.state.message,
      decoded: this.state.decoded
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  render() {
    if (this.props.data.loading) return null;
    return (<div className="comm-core">
      <p>Long Range Messages - Sending</p>
      {
        (this.props.data.longRangeCommunications.length > 0 ? <div>
        <InputField 
          prompt="What is the message sender? (eg. Starbase 74)"
          onClick={this._updateSender.bind(this)}
        >{this.state.messageSender}</InputField>
        <TypingField
          style={{height: 'calc(100% - 40px)'}}
          onChange={this._lrmText.bind(this)}
        />
        <div>
        <Button size="sm" onClick={this._sendMessage.bind(this)}>Send</Button>
        <Button size="sm">Clear</Button>
        <label><input type="checkbox" onClick={(e) => {this.setState({decoded: e.target.checked})}} /> Decoded</label>
        </div>
          </div>
          : "No shields")
      }
      </div>);
  }
}


const DECODING_QUERY = gql `
query LRDecoding($simulatorId: ID){
  longRangeCommunications(simulatorId: $simulatorId, crew: true){
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

export default graphql(DECODING_QUERY, {
  options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(LRCommCore));