import React, { Component } from "react";
import CardFrame from "./cardFrame";
import Widgets from "../LayoutOdyssey/widgets";
import TransitionGroup from "react-addons-transition-group";
import renderCards from "../cardRenderer";
import CardSwitcher from "./cardSwitcher";
import "./style.scss";
//import "./buttons.scss";

class LayoutEpsilon extends Component {
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
      <div className={`epsilon-frame ${alertClass}`}>
        <CardFrame {...this.props} />
        <div className="card-area">
          <TransitionGroup>{renderCards(this.props)}</TransitionGroup>
        </div>
        <CardSwitcher
          cards={station.cards}
          cardName={cardName}
          changeCard={changeCard}
          hyperCard={hypercard}
        />
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
export default LayoutEpsilon;
