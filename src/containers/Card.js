import React, { Component } from "react";
import Layouts from "../components/layouts";
import Keyboard from "../components/views/Keyboard";
import ActionsMixin from "../components/generic/Actions";

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

const CardRenderer = props => {
  const { simulator, station, flight, client, card, changeCard } = props.test
    ? {
        simulator: {
          id: "test",
          name: "Test",
          alertLevel: "5",
          layout: "LayoutCorners"
        },
        station: {
          name: "Test",
          widgets: [
            "keyboard",
            "composer",
            "objectives",
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
              component: props.component || "Navigation"
            }
          ]
        },
        flight: { id: "test" },
        client: { loginState: "login", loginName: "Test", id: "test" }
      }
    : props;
  const layoutName = station.layout || simulator.layout || "LayoutCorners";

  let LayoutComponent = Layouts[layoutName] || Layouts.LayoutDefault;
  if (station.name === "Viewscreen") {
    LayoutComponent = Layouts[layoutName + "Viewscreen"] || LayoutComponent;
  }
  if (client.offlineState === "blackout" || station.name === "Blackout") {
    return (
      <Blackout clientObj={client} station={station} simulator={simulator} />
    );
  }
  if (station.name.match(/keyboard:.{8}-.{4}-.{4}-.{4}-.{12}/gi)) {
    return (
      <Keyboard
        keyboard={station.name.replace("keyboard:", "")}
        simulator={simulator}
      />
    );
  }
  if (station.name === "Sound") {
    return <div className="keyboard-holder">Sound Player</div>;
  }
  return (
    <LayoutComponent
      clientObj={client}
      flight={flight}
      simulator={simulator}
      station={station}
      cardName={card}
      changeCard={changeCard}
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
    if (this.props.test) return true;
    if (
      nextProps.client.id !== this.props.client.id ||
      nextProps.client.loginName !== this.props.client.loginName ||
      nextProps.client.loginState !== this.props.client.loginState ||
      nextProps.client.offlineState !== this.props.client.offlineState ||
      nextProps.client.training !== this.props.client.training ||
      nextProps.client.hypercard !== this.props.client.hypercard ||
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
  changeCard = name => {
    this.setState({
      card: name
    });
  };
  render() {
    return (
      <ActionsMixin {...this.props}>
        <CardRenderer
          {...this.props}
          card={this.state.card}
          changeCard={this.changeCard}
        />
      </ActionsMixin>
    );
  }
}
