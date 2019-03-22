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
      !this.props.station.cards ||
      excludedStations.indexOf(this.props.station.name) > -1 ||
      this.props.station.cards.find(
        c => excludedStations.indexOf(c.component) > -1
      )
    )
      return;
    setTimeout(() => {
      this.props.playSound({ url: "/sciences.ogg" });
    }, 1000);
    // Start up any ambiance
    if (this.props.station.ambiance) {
      this.props.playSound({
        url: `/assets${this.props.station.ambiance}`,
        looping: true,
        ambiance: true
      });
    }
    if (process.env.NODE_ENV === "production") {
      document.addEventListener("keydown", e => {
        const forbiddenKeys = ["q", "w", "s", "i", "f"];
        if ((e.metaKey || e.ctrlKey) && forbiddenKeys.includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
        }
      });
      // Go to fullscreen on load
      if (document.body.requestFullscreen) {
        document.body.requestFullscreen().catch(() => {});
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.station.name !== prevProps.station.name) {
      this.props.removeAllSounds(true);
      // Start up any ambiance
      if (this.props.station.ambiance) {
        this.props.playSound({
          url: `/assets${this.props.station.ambiance}`,
          looping: true,
          ambiance: true
        });
      }
    }
  }
  componentWillUnmount() {
    this.props.removeAllSounds(true);
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
