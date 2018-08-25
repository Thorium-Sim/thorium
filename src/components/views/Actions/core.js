import React, { Component } from "react";
import { Row, Col, Button, Input } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo, Query } from "react-apollo";
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

const SOUNDS_QUERY = gql`
  query Sounds {
    assetFolders(name: "Sounds") {
      id
      name
      containers {
        id
        name
        fullPath
      }
    }
  }
`;
class ActionsCore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionName: "flash",
      actionDest: "all",
      selectedSound: "nothing"
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
  playSound = () => {
    let { selectedSound, actionDest } = this.state;
    if (actionDest === "random") {
      const index = Math.floor(
        Math.random() * this.props.data.simulators[0].stations
      );
      actionDest = this.props.data.simulators[0].stations[index].name;
    }
    const mutation = gql`
      mutation PlaySound($asset: String!, $station: String, $simulatorId: ID) {
        playSound(
          sound: { asset: $asset }
          station: $station
          simulatorId: $simulatorId
        )
      }
    `;
    const variables = {
      asset: selectedSound,
      station: actionDest,
      simulatorId: this.props.simulator.id
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const { actionName, selectedSound } = this.state;
    return (
      <div className="core-action">
        <div className="flex-container">
          <select onChange={this.handleNameChange} ref="actionName">
            <option value="flash">Flash</option>
            <option value="spark">Spark</option>
            <option value="freak">Freak</option>
            <option value="sound">Sound</option>
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
            <option value="reload">Reload Browser</option>
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
        {actionName === "sound" ? (
          <Row>
            <Col sm={8}>
              <Query query={SOUNDS_QUERY}>
                {({ loading, data: { assetFolders } }) =>
                  loading ? (
                    <p>Loading</p>
                  ) : (
                    <Input
                      style={{ height: "20px" }}
                      type="select"
                      value={selectedSound}
                      onChange={e =>
                        this.setState({ selectedSound: e.target.value })
                      }
                    >
                      <option value="nothing" disabled>
                        Select a Sound
                      </option>
                      {assetFolders[0]
                        ? assetFolders[0].containers
                            .concat()
                            .sort((a, b) => {
                              if (a.name > b.name) return 1;
                              if (a.name < b.name) return -1;
                              return 0;
                            })
                            .map(c => (
                              <option key={c.id} value={c.fullPath}>
                                {c.name}
                              </option>
                            ))
                        : null}
                    </Input>
                  )
                }
              </Query>
            </Col>
            <Col sm={4}>
              <Button block color="primary" size="sm" onClick={this.playSound}>
                Play
              </Button>
            </Col>
          </Row>
        ) : (
          <Button block color="primary" size="sm" onClick={this.triggerAction}>
            {this.state.actionName} {this.state.actionDest}
          </Button>
        )}
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
