import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag.macro";
import { withApollo } from "react-apollo";
import { subscribe, publish } from "helpers/pubsub";
import uuid from "uuid";
import { playSound } from "./SoundPlayer";
import { randomFromList } from "helpers/randomFromList";

// Speech Handling
const synth = window.speechSynthesis;
const holderStyle = {
  position: "absolute",
  right: "20px",
  top: "40px",
  width: "30vw",
  zIndex: "100000"
};
const NOTIFY_SUB = gql`
  subscription Notifications($simulatorId: ID!, $station: String) {
    notify(simulatorId: $simulatorId, station: $station) {
      id
      title
      body
      type
      color
      duration
      relevantCards
    }
  }
`;

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: []
    };
    const self = this;
    if (!this.props.simulator || !this.props.station) return;
    this.subscription = this.props.client
      .subscribe({
        query: NOTIFY_SUB,
        variables: {
          simulatorId: this.props.simulator.id,
          station: this.props.station.name
        }
      })
      .subscribe({
        next({ data: { notify } }) {
          // ... call updateQuery to integrate the new comment
          // into the existing list of comments
          const storedAllowed = localStorage.getItem("allowed_notifications");
          const storedSpeech = localStorage.getItem("allowed_speech");
          const allowed = storedAllowed ? JSON.parse(storedAllowed) : {};
          const speech = storedSpeech ? JSON.parse(storedSpeech) : {};
          const alerts = self.state.alerts;
          if (notify && notify.id) {
            if (allowed[notify.type] !== false) {
              if (!self.props.disabled) {
                const { soundEffects } = self.props.simulator;

                if (soundEffects && soundEffects.notification) {
                  playSound({
                    url: `/assets${randomFromList(soundEffects.notification)}`
                  });
                }
                alerts.push(Object.assign(notify, { visible: true }));
                self.setState({
                  alerts
                });

                const duration = notify.duration ? notify.duration : 5000;
                setTimeout(() => {
                  self.onDismiss(notify.id);
                }, duration);
              }
            }
            if (speech[notify.type] !== false) {
              if (self.props.station.name === "Core" && self.props.speech) {
                synth && synth.cancel();
                synth &&
                  synth.speak(new SpeechSynthesisUtterance(notify.title));
              }
            }
          }
        },
        error(err) {
          console.error("err", err);
        }
      });
  }
  componentDidMount() {
    this.sub = subscribe("clearNotifications", () => {
      this.setState({
        alerts: []
      });
    });
    this.addSub = subscribe("triggerNotification", notification => {
      this.trigger(notification);
    });
  }
  componentWillUnmount() {
    this.sub && this.sub();
    this.subscription && this.subscription.unsubscribe();
    this.addSub && this.addSub();
  }
  trigger({ title, body, color, duration = 5000, id = uuid.v4() }) {
    const { soundEffects } = this.props.simulator;
    if (soundEffects && soundEffects.notification) {
      playSound({ url: `/assets${randomFromList(soundEffects.notification)}` });
    }
    this.setState(state => ({
      alerts: state.alerts.concat({ id, title, body, color, visible: true })
    }));
    setTimeout(() => {
      this.onDismiss(id);
    }, duration);
  }
  onDismiss = (id, changeToCard) => {
    this.setState(state => ({
      alerts: state.alerts.map(a => {
        if (a.id === id) a.visible = false;
        return a;
      })
    }));
    setTimeout(() => {
      this.setState(state => ({
        alerts: state.alerts.filter(a => a.id !== id)
      }));
    }, 2000);
    if (changeToCard) {
      publish("cardChangeRequest", { changeToCard });
    }
  };
  render() {
    return <AlertsHolder alerts={this.state.alerts} dismiss={this.onDismiss} />;
  }
}

export const AlertsHolder = ({ alerts, dismiss }) => (
  <div style={holderStyle} className="alertsHolder">
    {alerts
      .filter(a => a.visible)
      .map(a => (
        <AlertItem key={a.id} notify={a} dismiss={dismiss} />
      ))}
  </div>
);

const AlertItem = ({ dismiss, notify }) => {
  return (
    <div onClick={() => dismiss(notify.id, notify.relevantCards)}>
      <div className={`alert alert-${notify.color}`}>
        <h5 className="alert-heading">
          {notify.title}{" "}
          <FontAwesome name="times" onClick={() => dismiss(notify.id)} />
        </h5>
        {notify.body}
      </div>
    </div>
  );
};
export default withApollo(Alerts);
