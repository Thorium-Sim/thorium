import React, { Component } from "react";
import uuid from "uuid";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Spark from "../views/Actions/spark";
const synth = window.speechSynthesis;

const ACTIONS_SUB = gql`
  subscription ActionsSub($simulatorId: ID!, $stationId: ID, $clientId: ID) {
    actionsUpdate(
      simulatorId: $simulatorId
      stationId: $stationId
      clientId: $clientId
    ) {
      action
      duration
      message
      voice
    }
  }
`;

class ActionsMixin extends Component {
  constructor(props) {
    super(props);
    this.subscription = null;
    this.state = {
      sparks: [],
      flash: false
    };
  }
  flash(duration) {
    if (duration <= 0) {
      this.setState({ flash: false });
      return;
    }
    this.setState({ flash: !this.state.flash });
    setTimeout(this.flash.bind(this, duration - 1), 100);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading && this.props.simulator) {
      this.subscription = nextProps.data.subscribeToMore({
        document: ACTIONS_SUB,
        variables: {
          simulatorId: this.props.simulator.id,
          stationId: this.props.station.name
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          let {
            action,
            message,
            voice,
            duration
          } = subscriptionData.data.actionsUpdate;
          switch (action) {
            case "flash":
              duration = duration || 10;
              this.flash(duration);
              break;
            case "spark":
              duration = duration || 5000;
              const id = uuid.v4();
              this.setState({
                sparks: [...this.state.sparks, id]
              });
              setTimeout(() => {
                this.setState(oldState => ({
                  sparks: oldState.sparks.filter(s => s !== id)
                }));
              }, duration);
              break;
            case "reload":
              window.location.reload();
              break;
            case "speak":
              const voices = synth.getVoices();
              const words = new SpeechSynthesisUtterance(message);
              if (voice) words.voice = voices.find(v => v.name === voice);
              synth.speak(words);
              break;
            case "shutdown":
            case "restart":
            case "sleep":
            case "quit":
            case "beep":
            case "freak":
              window.thorium.sendMessage({ action });
              break;
            case "changeCard":
              this.props.changeCard(message);
              break;
            default:
              return;
          }
        }
      });
    }
  }
  render() {
    return (
      <div className={`actionsContainer ${this.state.flash ? "flash" : ""}`}>
        {this.props.children}
        {this.state.sparks.map(s => <Spark key={s} />)}
      </div>
    );
  }
}

const ACTIONS_QUERY = gql`
  query ActionsQuery {
    actions {
      action
      duration
    }
  }
`;
export default graphql(ACTIONS_QUERY)(ActionsMixin);
