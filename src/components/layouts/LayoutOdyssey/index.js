import React, { Component } from "react";
import Alerts from "../../generic/Alerts";
import ActionsMixin from "../../generic/Actions";
import CardFrame from "./frame";
import Widgets from "./widgets";
import { withApollo } from "react-apollo";
import renderCards from "../cardRenderer";
import "./layout.css";

class LayoutOdyssey extends Component {
  state = {};
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
    const { changingCard } = this.state;
    let alertClass = `alertColor${simulator.alertlevel || 5}`;
    return (
      <ActionsMixin {...this.props}>
        <div id="layout-odyssey" className={alertClass}>
          <div
            className="backdrop"
            onClick={() => this.setState({ changingCard: false })}
          >
            {cards.map(c => (
              <div
                className="cardName"
                key={c.name}
                onClick={() => changeCard(c.name)}
              >
                {c.name}
              </div>
            ))}
          </div>
          <div
            className={`perspectiveContainer ${changingCard ? "active" : ""}`}
          >
            {renderCards(this.props)}
            <div className="frame-text">
              <h1 className="simulator-name">{simulator.name}</h1>
              <h2 className="station-name">{stationName}</h2>
              <h2
                className="card-name card-switcher"
                onClick={() => this.setState({ changingCard: !changingCard })}
              >
                {cardName} <span style={{ float: "right" }}>&#9660;</span>
              </h2>
            </div>
            <CardFrame simulator={simulator} />
            <Widgets
              clientObj={clientObj}
              simulator={simulator}
              station={station}
              flight={flight}
            />
            <Alerts
              ref="alert-widget"
              simulator={simulator}
              station={station}
            />
          </div>
        </div>
      </ActionsMixin>
    );
  }
}

export default withApollo(LayoutOdyssey);
