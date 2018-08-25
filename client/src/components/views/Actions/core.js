import React, { Component } from "react";
import { Row, Col, Button, Input, ButtonGroup } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo, Query } from "react-apollo";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";
import "./style.scss";

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
      objects {
        id
        name
        fullPath
      }
    }
  }
`;

const MOVIE_QUERY = gql`
  query Movies {
    assetFolders(name: "Movies") {
      id
      name
      objects {
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
    this.voices = window.speechSynthesis.getVoices() || [];

    this.state = {
      actionName: "flash",
      actionDest: "all",
      selectedSound: "nothing",
      selectedVoice: null,
      selectedCard: null
    };
  }
  componentDidMount() {
    this.setState({
      selectedVoice: this.voices[0] ? this.voices[0].name : ""
    });
  }
  handleNameChange = e => {
    this.setState({
      actionName: e.target.value
    });
  };
  handleDestChange = e => {
    this.setState({
      actionDest: e.target.value,
      selectedCard: null
    });
  };
  triggerAction = () => {
    let {
      actionName,
      actionDest,
      selectedMovie,
      selectedCard,
      selectedVoice
    } = this.state;
    let message;
    if (actionName === "speak" || actionName === "message") {
      message = prompt("What do you want to say?");
      if (!message) return;
    }
    if (actionName === "changeCard") message = selectedCard;
    if (actionName === "movie") message = selectedMovie;
    if (actionDest === "random") {
      const index = Math.floor(
        Math.random() * this.props.data.simulators[0].stations.length
      );
      actionDest = this.props.data.simulators[0].stations[index].name;
    }
    const mutation = gql`
      mutation TriggerAction(
        $action: String!
        $simulatorId: ID!
        $stationName: String
        $message: String
        $voice: String
      ) {
        triggerAction(
          action: $action
          simulatorId: $simulatorId
          stationId: $stationName
          message: $message
          voice: $voice
        )
      }
    `;
    const variables = {
      action: actionName,
      simulatorId: this.props.simulator.id,
      stationName: actionDest,
      message,
      voice: selectedVoice
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
  renderButtons = () => {
    const {
      actionName,
      actionDest,
      selectedSound,
      selectedVoice,
      selectedCard,
      selectedMovie
    } = this.state;
    if (actionName === "sound")
      return (
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
                      ? assetFolders[0].objects
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
      );
    if (actionName === "movie")
      return (
        <Row>
          <Col sm={8}>
            <Query query={MOVIE_QUERY}>
              {({ loading, data: { assetFolders } }) =>
                loading ? (
                  <p>Loading</p>
                ) : (
                  <Input
                    style={{ height: "20px" }}
                    type="select"
                    value={selectedMovie || "nothing"}
                    onChange={e =>
                      this.setState({ selectedMovie: e.target.value })
                    }
                  >
                    <option value="nothing" disabled>
                      Select a Movie
                    </option>
                    {assetFolders[0]
                      ? assetFolders[0].objects
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
            <Button
              block
              disabled={!selectedMovie}
              color="primary"
              size="sm"
              onClick={this.triggerAction}
            >
              Play
            </Button>
          </Col>
        </Row>
      );
    if (actionName === "speak")
      return (
        <Row>
          <Col sm={8}>
            <Input
              style={{ height: "20px" }}
              type="select"
              value={selectedVoice}
              onChange={e => this.setState({ selectedVoice: e.target.value })}
            >
              {this.voices.map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Input>
          </Col>
          <Col sm={4}>
            <Button
              block
              color="primary"
              size="sm"
              onClick={this.triggerAction}
            >
              Speak
            </Button>
          </Col>
        </Row>
      );
    if (actionName === "changeCard") {
      const station = this.props.simulator.stations.find(
        s => s.name === actionDest
      );
      return (
        <Row>
          <Col sm={8}>
            <Input
              disabled={!station}
              style={{ height: "20px" }}
              type="select"
              value={selectedCard || "nothing"}
              onChange={e => this.setState({ selectedCard: e.target.value })}
            >
              <option value="nothing" disabled>
                Select a card
              </option>
              {station &&
                station.cards.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </Input>
          </Col>
          <Col sm={4}>
            <Button
              block
              color="primary"
              size="sm"
              disabled={!station}
              onClick={this.triggerAction}
            >
              Change Card
            </Button>
          </Col>
        </Row>
      );
    }
    return (
      <Button block color="primary" size="sm" onClick={this.triggerAction}>
        {this.state.actionName} {this.state.actionDest}
      </Button>
    );
  };
  render() {
    const { actionName } = this.state;
    return (
      <div className="core-action">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: STATION_CHANGE_QUERY,
              variables: { simulatorId: this.props.simulator.id },
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  simulators: subscriptionData.data.simulatorsUpdate
                });
              }
            })
          }
        />

        <div className="flex-container">
          <ButtonGroup>
            <Button
              size="sm"
              color="warning"
              onClick={() => this.setState({ actionName: "flash" })}
            >
              F
            </Button>
            <Button
              size="sm"
              color="info"
              onClick={() => this.setState({ actionName: "spark" })}
            >
              S
            </Button>
            <Button
              size="sm"
              color="success"
              onClick={() => this.setState({ actionName: "online" })}
            >
              O
            </Button>
            <Button
              size="sm"
              color="dark"
              onClick={() => this.setState({ actionName: "blackout" })}
            >
              B
            </Button>
          </ButtonGroup>
          <select
            onChange={this.handleNameChange}
            value={actionName}
            ref="actionName"
          >
            <optgroup>
              <option value="flash">Flash</option>
              <option value="spark">Spark</option>
              <option value="freak">Freak</option>
              <option value="sound">Sound</option>
              <option value="movie">Movie</option>
              <option value="beep">Beep</option>
              <option value="speak">Speak</option>
              <option value="message">Message</option>
              <option value="changeCard">Change Card</option>
            </optgroup>
            <optgroup>
              <option value="blackout">Blackout</option>
            </optgroup>
            <optgroup>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="power">Power Loss</option>
              <option value="lockdown">Lockdown</option>
              <option value="maintenance">Maintenance</option>
              <option value="soviet">Soviet</option>
            </optgroup>
            <optgroup>
              <option value="reload">Reload Browser</option>
              <option value="shutdown">Shutdown</option>
              <option value="restart">Restart</option>
              <option value="sleep">Sleep</option>
              <option value="quit">Quit</option>
            </optgroup>
          </select>
          <select onChange={this.handleDestChange} ref="actionDest">
            <optgroup>
              <option value="all">All Stations</option>
              <option value="random">Random Station</option>
            </optgroup>
            <optgroup>
              {!this.props.data.loading &&
                this.props.data.simulators[0] &&
                this.props.data.simulators[0].stations &&
                this.props.data.simulators[0].stations.map(s => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
            </optgroup>
          </select>
        </div>
        {this.renderButtons()}
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
