import React, { Component, Fragment } from "react";
import SoundController from "./soundController";
import Caching from "./caching";
import CardContainer from "./Card";
import Credits from "./credits";

const excludedStations = ["Sound", "Blackout", "Viewscreen", "Keyboard"];

class Client extends Component {
  componentDidMount() {
    if (
      !this.props.station ||
      excludedStations.indexOf(this.props.station.name) > -1 ||
      this.props.station.cards.find(
        c => excludedStations.indexOf(c.component) > -1
      )
    )
      return;
    this.props.playSound({ url: "/sciences.ogg" });
  }
  render() {
    const {
      clientId,
      client,
      flight,
      simulator,
      station,
      updateClientId
    } = this.props;
    return (
      <Fragment>
        <SoundController clientId={clientId} />
        <Caching client={client} />
        {flight && simulator && station ? (
          <CardContainer
            flight={flight}
            simulator={simulator}
            station={station}
            client={client}
          />
        ) : (
          <Credits
            flight={flight}
            simulator={simulator}
            station={station}
            client={client}
            clientId={clientId}
            updateClientId={updateClientId}
          />
        )}
      </Fragment>
    );
  }
}
export default Client;
