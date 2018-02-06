import React, { Component } from "react";
import Views from "../../views";
import Alerts from "../../generic/Alerts";
import ActionsMixin from "../../generic/Actions";
import TransitionGroup from "react-addons-transition-group";
import CardHolder from "./cardHolder";
import CardFrame from "./frame";
import Widgets from "../LayoutOdyssey/widgets";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import CardSwitcher from "../LayoutCorners/CardSwitcher";
import "./layout.css";

class LayoutGlass extends Component {
  state = {};
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
    const { login: stationLogin, name: stationName } = station;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    if (clientObj.loginState === "logout" && stationLogin === false) {
      cardName = "Login";
    }
    if (clientObj.offlineState) {
      cardName = "Offline";
    }
    return (
      <ActionsMixin {...this.props}>
        <div className={`layout-glass ${alertClass}`}>
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

          <div className="frame-text">
            <h1 className="simulator-name">{simulator.name}</h1>
            <h2 className="station-name">{stationName}</h2>
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
          <CardFrame simulator={simulator} />
          <Widgets
            clientObj={clientObj}
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

export default withApollo(LayoutGlass);
