import React, { Component } from "react";
import { Button } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";

import "./style.css";

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
      actionName: "flash",
      actionDest: "all"
    };
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
          return Object.assign({}, previousResult, {
            simulators: subscriptionData.data.simulatorsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.subscription && this.subscription();
  }
  handleNameChange = e => {
    this.setState({
      actionName: e.target.value
    });
  };
  handleDestChange = e => {
    this.setState({
      actionDest: e.target.value
    });
  };
  triggerAction = () => {
    let { actionName, actionDest } = this.state;
    if (actionDest === "random") {
      const index = Math.floor(
        Math.random() * this.props.data.simulators[0].stations
      );
      actionDest = this.props.data.simulators[0].stations[index].name;
    }
    const mutation = gql`
      mutation TriggerAction(
        $action: String!
        $simulatorId: ID!
        $stationName: String
      ) {
        triggerAction(
          action: $action
          simulatorId: $simulatorId
          stationId: $stationName
        )
      }
    `;
    const variables = {
      action: actionName,
      simulatorId: this.props.simulator.id,
      stationName: actionDest
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    return (
      <div className="core-action">
        <div className="flex-container">
          <select onChange={this.handleNameChange} ref="actionName">
            <option value="flash">Flash</option>
            <option value="spark">Spark</option>
            <option value="freak">Freak</option>
            <option value="sound" disabled>
              Sound
            </option>
            <option value="beep">Beep</option>
            <option value="speak" disabled>
              Speak
            </option>
            <option value="message" disabled>
              Message
            </option>
            <option value="-" disabled>
              -
            </option>
            <option value="blackout">Blackout</option>
            <option value="-" disabled>
              -
            </option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="power">Power Loss</option>
            <option value="lockdown">Lockdown</option>
            <option value="maintenance">Maintenance</option>
            <option value="borg" disabled>
              Borg
            </option>
            <option value="soviet" disabled>
              Soviet
            </option>
            <option value="-" disabled>
              -
            </option>
            <option value="crm" disabled>
              Crm
            </option>
            <option value="thx" disabled>
              Thx
            </option>
            <option value="-" disabled>
              -
            </option>
            <option value="shutdown">Shutdown</option>
            <option value="restart">Restart</option>
            <option value="sleep">Sleep</option>
            <option value="quit">Quit</option>
          </select>
          <select onChange={this.handleDestChange} ref="actionDest">
            <option value="all">All Stations</option>
            <option value="random">Random Station</option>
            {!this.props.data.loading &&
              this.props.data.simulators[0] &&
              this.props.data.simulators[0].stations &&
              this.props.data.simulators[0].stations.map(s => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
        <Button block color="primary" size="sm" onClick={this.triggerAction}>
          {this.state.actionName} {this.state.actionDest}
        </Button>
      </div>
    );
  }
}

const STATION_QUERY = gql`
  query Stations($simulatorId: String) {
    simulators(id: $simulatorId) {
      id
      stations {
        name
      }
    }
  }
`;

export default graphql(STATION_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(ActionsCore));
