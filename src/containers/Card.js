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
            widgets: ["composer", "calculator", "remote", "messages"],
            cards: [
              {
                id: "test",
                name: "Test",
                component: this.props.component || "Navigation"
              }
            ]
          },
          flight: {},
          client: { loginState: "login", loginName: "Test" }
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
