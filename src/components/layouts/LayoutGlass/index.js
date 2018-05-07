import React, { Component } from "react";
import Alerts from "../../generic/Alerts";
import TransitionGroup from "react-addons-transition-group";
import CardFrame from "./frame";
import Widgets from "../LayoutOdyssey/widgets";
import { withApollo } from "react-apollo";
import CardSwitcher from "../LayoutCorners/CardSwitcher";
import renderCards from "../cardRenderer";
import "./layout.css";

class LayoutGlass extends Component {
  state = {};
  componentDidMount() {
    const self = this;
    window.addEventListener(
      "touchstart",
      function onFirstTouch() {
        self.setState({ touch: true });
        window.removeEventListener("touchstart", onFirstTouch);
      },
      false
    );
  }
  render() {
    let {
      simulator,
      station,
      cardName,
      changeCard,
      clientObj,
      flight
    } = this.props;
    const { hypercard } = clientObj;
    const { name: stationName } = station;
    const { touch } = this.state;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-glass ${alertClass}`}>
        <TransitionGroup>{renderCards(this.props)}</TransitionGroup>

        <div className="frame-text">
          <h1 className="simulator-name">{simulator.name}</h1>
          <h2 className="station-name">{stationName}</h2>
          <h2 className="login-name">{clientObj.loginName}</h2>
        </div>
        {!hypercard && (
          <CardSwitcher
            className={alertClass}
            clientObj={this.props.clientObj}
            cards={station.cards}
            currentCard={cardName}
            changeCard={changeCard}
            {...this.props}
          />
        )}
        <CardFrame simulator={simulator} />
        <Widgets
          clientObj={clientObj}
          simulator={simulator}
          station={station}
          flight={flight}
          touch={touch}
        />
        <Alerts ref="alert-widget" simulator={simulator} station={station} />
      </div>
    );
  }
}

export default withApollo(LayoutGlass);
