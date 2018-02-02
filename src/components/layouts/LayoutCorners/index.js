import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import TransitionGroup from "react-addons-transition-group";
import { Button } from "reactstrap";
import { TweenMax } from "gsap";
import Views from "../../views";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import CardSwitcher from "./CardSwitcher";
import Widgets from "./Widgets";
import Alerts from "../../generic/Alerts";
import ActionsMixin from "../../generic/Actions";
import ErrorBoundary from "../../../helpers/errorBoundary";

import "./layout.css";
import "./theme.css";

class CardHolder extends Component {
  componentWillEnter(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { opacity: 0 },
      {
        opacity: 1,
        onComplete: callback
      }
    );
  }

  componentWillLeave(callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(
      el,
      0.5,
      { z: 0, rotationY: 0, opacity: 1, transformPerspective: 200 },
      {
        z: -100,
        rotationY: 0,
        opacity: 0,
        transformPerspective: 200,
        onComplete: callback
      }
    );
  }
  render() {
    return (
      <div
        className="cardContainer"
        style={{ width: "100%", position: "absolute", alignSelf: "center" }}
      >
        <ErrorBoundary
          render={
            <div className={"card-error"}>
              <p className="offline-title">Station Error</p>
              <p className="offline-message" style={{ fontSize: "40px" }}>
                Your station has experienced an error. A diagnostic must be
                performed to restore this station to functionality. If you
                continue to see this screen after performing the diagnostic,
                please contact a computer specialist.
              </p>
              <Button
                block
                color="primary"
                size="lg"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Perform Diagnostic
              </Button>
            </div>
          }
        >
          <this.props.component {...this.props} />
        </ErrorBoundary>
      </div>
    );
  }
}

const Settings = props => {
  const logout = () => {
    const client = props.clientObj.id;
    const obj = {
      client
    };
    const mutation = gql`
      mutation LogoutClient($client: ID!) {
        clientLogout(client: $client)
      }
    `;
    props.client.mutate({
      mutation: mutation,
      variables: obj
    });
  };
  const startTraining = () => {
    const client = props.clientObj.id;
    const variables = {
      client,
      training: true
    };
    const mutation = gql`
      mutation ClientSetTraining($client: ID!, $training: Boolean!) {
        clientSetTraining(client: $client, training: $training)
      }
    `;
    props.client.mutate({
      mutation,
      variables
    });
  };
  return (
    <div
      className={`settingsBall ${
        props.station.login ? "" : props.clientObj.loginState
      } ${props.clientObj.offlineState ? "offline" : ""}`}
    >
      <div className={`icon ${props.className}`} />
      <ul className="options">
        <li onClick={startTraining}>Help</li>
        {/*<li>Lock Screen</li>
        <li>Reset Terminal</li>
        <li>Diagnostic</li>*/}
        {!props.station.login && <li onClick={logout}>Logout</li>}
      </ul>
    </div>
  );
};

class LayoutCorners extends Component {
  stopTraining = () => {
    const client = this.props.clientObj.id;
    const variables = {
      client,
      training: false
    };
    const mutation = gql`
      mutation ClientSetTraining($client: ID!, $training: Boolean!) {
        clientSetTraining(client: $client, training: $training)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    let {
      simulator,
      station,
      cardName,
      changeCard,
      clientObj,
      flight
    } = this.props;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    if (clientObj.loginState === "logout" && station.login === false) {
      cardName = "Login";
    }
    if (clientObj.offlineState) {
      cardName = "Offline";
    }
    return (
      <ActionsMixin {...this.props}>
        <div className={`layout-corners card-area ${alertClass}`}>
          <TransitionGroup>
            {station.cards
              .concat({ name: "Login", component: "Login", icon: "Login" })
              .concat({
                name: "Offline",
                component: "Offline",
                icon: "Offline"
              })
              .map(card => {
                if (card.name === cardName) {
                  const component = Views[card.component];
                  if (card.component.match(/.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
                    // Software Panel
                    return (
                      <CardHolder
                        component={Views.SoftwarePanels}
                        panel={card.component}
                        {...this.props}
                        stopTraining={this.stopTraining}
                        key={card.name}
                      />
                    );
                  }
                  return (
                    <CardHolder
                      component={component}
                      {...this.props}
                      stopTraining={this.stopTraining}
                      key={card.name}
                    />
                  );
                }
                return null;
              })
              .filter(card => card)}
          </TransitionGroup>
        </div>
        <div id="curve-frame" className={alertClass}>
          <div className="frame-color">
            <div className="part-1-1" />
            <div className="part-c" />
            <div className="part-1-2" />
            <div className="part-1-3" />
            <div className="part-2" />
            <div className="part-3" />
          </div>
          <div className="frame-image">
            <div className="frame-1" />
            <div className="frame-2" />
            <div className="frame-3" />
            <div className="frame-4" />
            <div className="frame-5" />
          </div>
          <div className="frame-text">
            <h1 className="simulator-name">{simulator.name}</h1>
            <h2 className="station-name">{station.name}</h2>
            <h2 className="login-name">{clientObj.loginName}</h2>
          </div>
          <CardSwitcher
            className={alertClass}
            clientObj={this.props.clientObj}
            cards={station.cards}
            currentCard={cardName}
            changeCard={changeCard}
            {...this.props}
          />
          <Settings
            client={this.props.client}
            clientObj={this.props.clientObj}
            station={this.props.station}
            className={alertClass}
          />
          <Widgets
            clientObj={this.props.clientObj}
            simulator={simulator}
            station={station}
            flight={flight}
          />
          <Alerts ref="alert-widget" simulator={simulator} station={station} />
        </div>
      </ActionsMixin>
    );
  }
}

export default withApollo(LayoutCorners);
