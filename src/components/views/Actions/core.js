import React, {Component} from 'react';
import {Button} from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';

import './style.scss';

const STATION_CHANGE_QUERY = gql`
subscription StationsUpdate($simulatorId: ID) {
  simulatorsUpdate(simulatorId: $simulatorId) {
    id
    stations {
      name
    }
  }
}
`;

class ActionsCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionName: 'flash',
      actionDest: 'all'
    }
    this.subscription = null;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: STATION_CHANGE_QUERY,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
         const returnResult = Immutable.Map(previousResult);
         return returnResult.merge({ simulators: subscriptionData.data.simulatorsUpdate }).toJS();
       }
     });
    }
  }
  handleNameChange = (e) => {
    this.setState({
      actionName:e.target.value
    });
  }
  handleDestChange = (e) => {
    this.setState({
      actionDest:e.target.value
    });
  }
  triggerAction = () => {
    const {actionName, actionDest} = this.state;
    const mutation = gql`
    mutation TriggerAction($action: String!, $simulatorId: ID!, $stationName: String){
      triggerAction(action: $action, simulatorId: $simulatorId, stationId: $stationName)
    }`;
    const variables = {
      action: actionName,
      simulatorId: this.props.simulator.id,
      stationName: actionDest
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  }
  render(){
    return <div className="core-action">
    <div className="flex-container">
    <select onChange={this.handleNameChange} ref="actionName">
    <option value="flash">Flash</option>
    <option value="spark">Spark</option>
    <option value="freak" disabled>Freak</option>
    <option value="sound" disabled>Sound</option>
    <option value="beep" disabled>Beep</option>
    <option value="speak" disabled>Speak</option>
    <option value="message" disabled>Message</option>
    <option value="reset" disabled>Reset</option>
    <option value="trainingmode" disabled>Training Mode</option>
    <option value="save" disabled>Save</option>
    <option value="-" disabled>-</option>
    <option value="blackout">Blackout</option>
    <option value="-" disabled>-</option>
    <option value="online">Online</option>
    <option value="offline">Offline</option>
    <option value="power">Power Loss</option>
    <option value="lockdown">Lockdown</option>
    <option value="maintenance">Maintenance</option>
    <option value="borg" disabled>Borg</option>
    <option value="soviet" disabled>Soviet</option>
    <option value="-" disabled>-</option>
    <option value="crm" disabled>Crm</option>
    <option value="thx" disabled>Thx</option>
    <option value="-" disabled>-</option>
    <option value="shutdown" disabled>Shutdown</option>
    <option value="restart" disabled>Restart</option>
    <option value="quit" disabled>Quit</option>
    </select>
    <select onChange={this.handleDestChange} ref="actionDest">
    <option value="all">All Stations</option>
    {!this.props.data.loading && this.props.data.simulators[0].stations
      .map(s => <option key={s.name} value={s.name}>{s.name}</option>)
    }
    </select>
    </div>
    <Button block color="primary" size="sm" onClick={this.triggerAction}>{this.state.actionName} {this.state.actionDest}</Button>
    </div>;
  }
}

const STATION_QUERY = gql`
query Stations($simulatorId: String) {
  simulators(id:$simulatorId) {
    id
    stations {
      name
    }
  }
}`;

export default graphql(STATION_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ActionsCore));
