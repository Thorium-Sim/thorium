import React, {Component} from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import {Row, Col, Card} from 'reactstrap';
import Immutable from 'immutable';
import Measure from 'react-measure';
import Satellites from './Satellites';
import './style.scss';

const MESSAGES_SUB = gql `
subscription LRQueueingSub($simulatorId: ID) {
  longRangeCommunicationsUpdate(simulatorId: $simulatorId, crew: false, sent: false) {
    id
    simulatorId
    name
    messages {
      id
      sender
      message
      datestamp
      sent
    }
  }
}
`;

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedMessage: '',
      typedIndex: 0
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message){
      this.setState({
        typedMessage: '',
        typedIndex: 0
      })
      this.typeLoop();
    }
  }
  typeLoop(){
    const {message} = this.props;
    const {typedIndex} = this.state;
    this.setState({
      typedMessage: message.substr(0,typedIndex),
      typedIndex: typedIndex + 1
    })
    if (typedIndex + 1 < message.length){
      setTimeout(this.typeLoop.bind(this), 16);
    }
  }
  render(){
    return <div className="message-box">
    <pre>
    {this.state.typedMessage}
    </pre>
    </div>
  }
}
class LongRangeComm extends Component {
  constructor(props){
    super(props);
    this.lrsub = null;
    this.state = {
      selectedMessage: null
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.lrsub && !nextProps.data.loading) {
      this.lrsub = nextProps.data.subscribeToMore({
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
  render(){
    if (this.props.data.loading) return null;
    const messages = this.props.data.longRangeCommunications[0].messages;
    return (
      <Row className="long-range-comm">
      <Col sm={3}>
      <Card>
      {messages.map(m => <li onClick={() => {this.setState({selectedMessage: m.id})}} className={`message-list ${m.id === this.state.selectedMessage ? 'active' : ''}`} key={m.id}>
        {`${m.datestamp}: ${m.sender}`}
        </li>)}
      </Card>
      </Col>
      {
        this.state.selectedMessage &&
        <Col sm={9}>
        <div className="sat-container"> 
        <Measure
        includeMargin={true}>
        { dimensions => (
          <Satellites width={dimensions.width} height={dimensions.height} />
          ) }
        </Measure>
        </div>
        <MessageBox message={messages.find(m => m.id === this.state.selectedMessage).message}/>
        </Col>
      }
      </Row>
      );
  }
};

const QUEUING_QUERY = gql `
query LRQueuing($simulatorId: ID){
  longRangeCommunications(simulatorId: $simulatorId, crew: false, sent: false){
    id
    simulatorId
    name
    messages {
      id
      sender
      message
      datestamp
      sent
    }
  }
}
`;
export default graphql(QUEUING_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(LongRangeComm));
