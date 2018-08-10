import React, { Component } from "react";
import TransitionGroup from "react-addons-transition-group";
import { withApollo } from "react-apollo";
import CardFrame from "./cardFrame";
import Widgets from "../LayoutOdyssey/widgets";
import CardSwitcher from "./cardSwitcher";
import renderCards from "../cardRenderer";
import "./style.scss";

class LayoutLine extends Component {
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
    const { touch } = this.state;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-line ${alertClass}`}>
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
        <CardFrame {...this.props}>
          <TransitionGroup>{renderCards(this.props)}</TransitionGroup>
        </CardFrame>
        <Widgets
          clientObj={clientObj}
          simulator={simulator}
          station={station}
          flight={flight}
          touch={touch}
        />
      </div>
    );
  }
}

export default withApollo(LayoutLine);
