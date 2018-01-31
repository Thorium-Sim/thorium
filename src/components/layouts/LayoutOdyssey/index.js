import React, { Component } from "react";
import Views from "../../views";
import Alerts from "../../generic/Alerts";
import ActionsMixin from "../../generic/Actions";
import ErrorBoundary from "../../../helpers/errorBoundary";
import CardFrame from "./frame";
import Widgets from "./widgets";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Button } from "reactstrap";
import "./layout.css";

class LayoutOdyssey extends Component {
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
    const {
      login: stationLogin,
      name: stationName,
      cards = [
        {
          component: "Viewscreen",
          name: "Viewscreen"
        }
      ]
    } = station;
    const { changingCard } = this.state;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    if (clientObj.loginState === "logout" && stationLogin === false) {
      cardName = "Login";
    }
    if (clientObj.offlineState) {
      cardName = "Offline";
    }
    return (
      <ActionsMixin {...this.props}>
        <div id="layout-odyssey" className={alertClass}>
          <div
            className="backdrop"
            onClick={() => this.setState({ changingCard: false })}
          >
            {cards.map(c => (
              <div
                className="cardName"
                key={c.name}
                onClick={() => changeCard(c.name)}
              >
                {c.name}
              </div>
            ))}
          </div>
          <div
            className={`perspectiveContainer ${changingCard ? "active" : ""}`}
          >
            <div className="cardContainer">
              <ErrorBoundary
                render={
                  <div className={"card-error"}>
                    <p className="offline-title">Station Error</p>
                    <p className="offline-message" style={{ fontSize: "40px" }}>
                      Your station has experienced an error. A diagnostic must
                      be performed to restore this station to functionality. If
                      you continue to see this screen after performing the
                      diagnostic, please contact a computer specialist.
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
                {cards
                  .concat({ name: "Login", component: "Login", icon: "Login" })
                  .concat({
                    name: "Offline",
                    component: "Offline",
                    icon: "Offline"
                  })
                  .map(card => {
                    if (card.name === cardName) {
                      if (card.component.match(/.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
                        // Software Panel
                        return (
                          <Views.SoftwarePanelSingle
                            panel={card.component}
                            {...this.props}
                            stopTraining={this.stopTraining}
                            key={card.name}
                          />
                        );
                      }
                      const Card = Views[card.component];
                      return (
                        <Card
                          {...this.props}
                          stopTraining={this.stopTraining}
                          key={card.name}
                        />
                      );
                    }
                    return null;
                  })
                  .filter(card => card)}
              </ErrorBoundary>
            </div>
            <div className="frame-text">
              <h1 className="simulator-name">{simulator.name}</h1>
              <h2 className="station-name">{stationName}</h2>
              <h2
                className="card-name"
                onClick={() => this.setState({ changingCard: !changingCard })}
              >
                {cardName} <span style={{ float: "right" }}>&#9660;</span>
              </h2>
            </div>
            <CardFrame simulator={simulator} />
            <Widgets
              clientObj={clientObj}
              simulator={simulator}
              station={station}
              flight={flight}
            />
            <Alerts
              ref="alert-widget"
              simulator={simulator}
              station={station}
            />
          </div>
        </div>
      </ActionsMixin>
    );
  }
}

export default withApollo(LayoutOdyssey);
