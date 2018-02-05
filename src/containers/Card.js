import React, { Component } from "react";
import Layouts from "../components/layouts";

const Blackout = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: "black"
      }}
    />
  );
};

export default class CardFrame extends Component {
  constructor(props) {
    super(props);
    if (props.test) {
      this.state = {
        card: "Test"
      };
    } else {
      this.state = {
        card: this.props.station.cards[0].name
      };
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // Check everything
    if (
      nextProps.client.id !== this.props.client.id ||
      nextProps.client.loginName !== this.props.client.loginName ||
      nextProps.client.loginState !== this.props.client.loginState ||
      nextProps.client.offlineState !== this.props.client.offlineState ||
      nextProps.client.training !== this.props.client.training ||
      nextProps.flight.id !== this.props.flight.id ||
      nextProps.simulator.id !== this.props.simulator.id ||
      nextProps.simulator.name !== this.props.simulator.name ||
      nextProps.simulator.alertlevel !== this.props.simulator.alertlevel ||
      nextProps.simulator.layout !== this.props.simulator.layout ||
      nextProps.station.name !== this.props.station.name ||
      nextProps.station.login !== this.props.station.login ||
      nextState.card !== this.state.card
    ) {
      return true;
    }
    return false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.station.name !== this.props.station.name) {
      this.setState({
        card: nextProps.station.cards[0].name
      });
    }
  }
  _changeCard(name) {
    this.setState({
      card: name
    });
  }
  render() {
    const { simulator, station, flight, client } = this.props.test
      ? {
          simulator: {
            id: "test",
            name: "Test",
            alertLevel: "5",
            layout: "LayoutGlass"
          },
          station: {
            name: "Test",
            widgets: [
              "keyboard",
              "composer",
              "calculator",
              "remote",
              "messages",
              "officerLog",
              "damageReport"
            ],
            cards: [
              {
                id: "test",
                name: "Test",
                component: this.props.component || "Navigation"
              }
            ]
          },
          flight: { id: "test" },
          client: { loginState: "login", loginName: "Test", id: "test" }
        }
      : this.props;
    const layoutName = station.layout || simulator.layout || "LayoutCorners";

    let LayoutComponent = Layouts[layoutName] || Layouts.LayoutDefault;
    if (station.name === "Viewscreen") {
      LayoutComponent = Layouts[layoutName + "Viewscreen"] || LayoutComponent;
    }
    if (client.offlineState === "blackout" || station.name === "Blackout") {
      return <Blackout />;
    }
    return (
      <LayoutComponent
        clientObj={client}
        flight={flight}
        simulator={simulator}
        station={station}
        cardName={this.state.card}
        changeCard={this._changeCard.bind(this)}
      />
    );
  }
}
