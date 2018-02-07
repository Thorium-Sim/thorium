import React, { Component } from "react";
import Views from "../../views";
import ActionsMixin from "../../generic/Actions";
import CardFrame from "./frame";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
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
    let { simulator, station, clientObj } = this.props;
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
        <div className={`layout-glass glass-viewscreen ${alertClass}`}>
          <Views.Viewscreen {...this.props} />
          <div className="frame-text">
            <h1 className="simulator-name">{simulator.name}</h1>
            <h2 className="station-name">{stationName}</h2>
          </div>
          <CardFrame simulator={simulator} viewscreen />
        </div>
      </ActionsMixin>
    );
  }
}

export default withApollo(LayoutGlass);
