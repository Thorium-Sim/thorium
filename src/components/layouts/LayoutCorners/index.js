import React, { Component } from "react";
import TransitionGroup from "react-addons-transition-group";
import { withApollo } from "react-apollo";
import CardSwitcher from "./CardSwitcher";
import Widgets from "./Widgets";
import Alerts from "../../generic/Alerts";
import ActionsMixin from "../../generic/Actions";
import renderCards from "../cardRenderer";
import Settings from "./settings";

import "./layout.css";
import "./theme.css";

class LayoutCorners extends Component {
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
    const { touch } = this.state;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <ActionsMixin {...this.props}>
        <div className={`layout-corners card-area ${alertClass}`}>
          <TransitionGroup>{renderCards(this.props)}</TransitionGroup>
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
          {!hypercard && (
            <Settings
              client={this.props.client}
              clientObj={this.props.clientObj}
              station={this.props.station}
              className={alertClass}
            />
          )}
          <Widgets
            clientObj={this.props.clientObj}
            simulator={simulator}
            station={station}
            flight={flight}
            touch={touch}
          />
          <Alerts ref="alert-widget" simulator={simulator} station={station} />
        </div>
      </ActionsMixin>
    );
  }
}

export default withApollo(LayoutCorners);
