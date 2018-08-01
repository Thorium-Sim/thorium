import React, { Component } from "react";
import Alerts from "../../generic/Alerts";
import CardFrame from "./frame";
import Widgets from "./widgets";
import { withApollo } from "react-apollo";
import renderCards from "../cardRenderer";
import "./layout.scss";

class LayoutOdyssey extends Component {
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
    const {
      name: stationName,
      cards = [
        {
          component: "Viewscreen",
          name: "Viewscreen"
        }
      ]
    } = station;
    const { changingCard, touch } = this.state;
    const { hypercard } = clientObj;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <div id="layout-odyssey" className={alertClass}>
        <div className={`perspectiveContainer`}>
          {renderCards(this.props)}
          <div className="frame-text">
            <h1 className="simulator-name">{simulator.name}</h1>
            <h2 className="station-name">{stationName}</h2>
            {!hypercard && (
              <h2
                className="card-name card-switcher"
                onClick={() => this.setState({ changingCard: !changingCard })}
              >
                {cardName} <span style={{ float: "right" }}>&#9660;</span>
              </h2>
            )}
            <div className={`card-holder ${changingCard ? "active" : ""}`}>
              {cards.map(c => (
                <div
                  className="cardName"
                  key={c.name}
                  onClick={() => {
                    changeCard(c.name);
                    this.setState({ changingCard: false });
                  }}
                >
                  {c.name}
                </div>
              ))}
              <div
                className="backdrop"
                onClick={() => this.setState({ changingCard: false })}
              />
            </div>
          </div>
          <CardFrame simulator={simulator} />
          <Widgets
            clientObj={clientObj}
            simulator={simulator}
            station={station}
            flight={flight}
            touch={touch}
          />
        </div>
      </div>
    );
  }
}

export default withApollo(LayoutOdyssey);
