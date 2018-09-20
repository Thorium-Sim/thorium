import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import { subscribe } from "helpers/pubsub";
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
            if (!allowed[notify.type] === false) {
              if (!self.props.disabled) {
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
            if (!speech[notify.type] === false) {
              if (self.props.station.name === "Core" && self.props.speech) {
                synth.cancel();
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
  }
  componentWillUnmount() {
    this.sub && this.sub();
    this.subscription && this.subscription.unsubscribe();
  }
  trigger({ title, body, color, duration, id }) {
    const alerts = this.state.alerts;
    alerts.push(Object.assign({ title, body, color }, { visible: true }));
    this.setState({
      alerts
    });
    const timeoutDuration = duration ? duration : 5000;
    setTimeout(() => {
      this.onDismiss(id);
    }, timeoutDuration);
  }
  onDismiss = id => {
    const alerts = this.state.alerts;
    this.setState({
      alerts: alerts.map(a => {
        if (a.id === id) a.visible = false;
        return a;
      })
    });
    setTimeout(() => {
      this.setState({
        alerts: this.state.alerts.filter(a => a.id !== id)
      });
    }, 2000);
  };
  render() {
    return <AlertsHolder alerts={this.state.alerts} dismiss={this.onDismiss} />;
  }
}

export const AlertsHolder = ({ alerts, dismiss }) => (
  <div style={holderStyle} className="alertsHolder">
    {alerts.filter(a => a.visible).map(a => (
      <AlertItem key={a.id} notify={a} dismiss={dismiss} />
    ))}
  </div>
);

const AlertItem = ({ dismiss, notify }) => {
  return (
    <div onClick={() => dismiss(notify.id)}>
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
