import React, {Component} from "react";

import {withApollo} from "react-apollo";
import CardFrame from "./cardFrame";
import Widgets from "../LayoutOdyssey/widgets";
import CardSwitcher from "./cardSwitcher";
import CardHolder from "../cardRenderer";
import "./style.scss";
import {css} from "@emotion/core";

class LayoutCautionTape extends Component {
  state = {};
  componentDidMount() {
    const self = this;
    window.addEventListener(
      "touchstart",
      function onFirstTouch() {
        self.setState({touch: true});
        window.removeEventListener("touchstart", onFirstTouch);
      },
      false,
    );
  }
  render() {
    let {
      simulator,
      station,
      cardName,
      changeCard,
      clientObj,
      flight,
    } = this.props;
    const {hypercard} = clientObj;
    const {name: stationName} = station;
    const viewscreen = stationName === "Viewscreen";
    const {touch} = this.state;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div className={`layout-cautiontape ${alertClass}`}>
        <div className="frame-text">
          <h1 className="simulator-name">{simulator.name}</h1>
          <h2 className="station-name">{stationName}</h2>
          {!viewscreen && (
            <h2
              className="card-name"
              css={css`
                left: calc(${stationName.length}ch + 166px);
              `}
            >
              {cardName}
            </h2>
          )}
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
        <CardFrame {...this.props} viewscreen={viewscreen}>
          <CardHolder {...this.props} />
        </CardFrame>
        {!viewscreen && (
          <Widgets
            clientObj={clientObj}
            simulator={simulator}
            station={station}
            flight={flight}
            touch={touch}
            placement="right-end"
          />
        )}
      </div>
    );
  }
}

export default withApollo(LayoutCautionTape);
