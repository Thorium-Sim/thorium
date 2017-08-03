import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import './style.scss';

const SHORTRANGE_SUB = gql`
subscription ShortRangeCommSub($simulatorId: ID!){
  shortRangeCommUpdate(simulatorId:$simulatorId) {
    id
    simulatorId
    name
    arrows {
      id
      signal
      frequency
      connected
    }
    signals {
      id
      name
      image
      color
      range {
        lower
        upper
      }
    }
    state
    frequency
    amplitude
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
  }
}`;

class CommShortRange extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedCall: null,
      selectedArrow: null
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: SHORTRANGE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ shortRangeComm: subscriptionData.data.shortRangeCommUpdate }).toJS();
        }
      });
    }
  }
  _commHail(){
    const ShortRange = this.props.data.shortRangeComm[0];
    const mutation = gql`mutation CommAddArrow($id: ID!, $commArrowInput: CommArrowInput!){
      commAddArrow(id: $id, commArrowInput: $commArrowInput)
    }`;
    const variables = {
      id: ShortRange.id,
      commArrowInput: {
        signal: this.state.selectedCall,
      }
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  _commCancel(id){
    const ShortRange = this.props.data.shortRangeComm[0];
    const mutation = gql`mutation CommRemoveArrow($id: ID!, $arrowId: ID!){
      commRemoveArrow(id: $id, arrowId: $arrowId)
    }`;
    const variables = {
      id: ShortRange.id,
      arrowId: this.state.selectedArrow
    }
    this.props.client.mutate({
      mutation,
      variables
    })
    this.setState({
      selectedArrow: null
    })
  }
  _commConnect(){
    const ShortRange = this.props.data.shortRangeComm[0];
    const mutation = gql`mutation CommConnectHail($id: ID!){
      connectHail(id: $id)
    }`;
    const variables = {
      id: ShortRange.id,
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  getSignal(){
    const ShortRange = this.props.data.shortRangeComm[0];
    return ShortRange.signals.reduce((prev, next) => {
      if (next.range.upper > ShortRange.frequency && next.range.lower < ShortRange.frequency) return next;
      return prev;
    },{})
  }
  render(){
    if (this.props.data.loading) return null;
    const {selectedCall, selectedArrow} = this.state;
    const ShortRange = this.props.data.shortRangeComm[0];
    if (!ShortRange) return <p>No short range comm</p>;
    return (
      <Container fluid className="shortRangeComm-core">
      <p>Short Range Comm</p>
      <Row>
      <Col sm="12">
      <p>Freq: {Math.round(ShortRange.frequency * 37700 + 37700)/100} MHz - Amp: {Math.round(ShortRange.amplitude * 100)/100} - {this.getSignal().name}</p>
      <div>External Call 
      {ShortRange.state === 'hailing' ? <Button onClick={this._commConnect.bind(this)} size="sm" color="info">Hailing - Connect</Button> : null}</div>
      <select value={selectedCall || ''} onChange={(e) => {this.setState({selectedCall: e.target.value})}}>
      <option value={null}>---</option>
      {ShortRange.signals.map(s => {
        return <option key={s.id} value={s.id}>{s.name}</option>
      })}
      </select>
      <Button size="sm" color="default" disabled={!selectedCall} onClick={this._commHail.bind(this)}>Hail</Button>
      <p>Current Comms</p>
      <div className="commList">
      {
        ShortRange.arrows.map(a => {
          const signal = ShortRange.signals.find(s => s.id === a.signal);
          return <p key={a.id} onClick={() => {this.setState({selectedArrow: a.id})}} className={`${a.connected ? 'text-success' : ''} ${a.id === selectedArrow ? 'selected' : ''}`}>{signal.name} - {Math.round(a.frequency * 37700 + 37700)/100} MHz</p>
        })
      }
      </div>
      <Button disabled={!selectedArrow} onClick={this._commCancel.bind(this)} size="sm" block color="default">Cancel</Button>
      </Col>
      </Row>
      </Container>
      );
  }
}

const SHORTRANGE_QUERY = gql`
query ShortRangeComm($simulatorId: ID!){
  shortRangeComm(simulatorId:$simulatorId) {
    id
    simulatorId
    name
    arrows {
      id
      signal
      frequency
      connected
    }
    signals {
      id
      name
      image
      color
      range {
        lower
        upper
      }
    }
    state
    frequency
    amplitude
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
  }
}`;


export default graphql(SHORTRANGE_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(CommShortRange));