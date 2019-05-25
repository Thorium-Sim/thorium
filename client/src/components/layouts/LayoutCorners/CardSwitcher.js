import React, { Component } from "react";
import { Button } from "reactstrap";
import "./cardSwitcher.scss";

class CardSwitcher extends Component {
  render() {
    return (
      <div
        className={`card-icon-container card-switcher ${
          this.props.clientObj.offlineState ? "offline" : ""
        } ${this.props.station.login ? "" : this.props.clientObj.loginState}`}
      >
        {(this.props.cards || []).map((card, index) => {
          return (
            <CardButton
              key={index}
              cardNum={index}
              name={card.name}
              component={card.component}
              {...this.props}
            />
          );
        })}
      </div>
    );
  }
}

const intregex = /interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi;
const spregex = /.*.{8}-.{4}-.{4}-.{4}-.{12}/gi;

const CardButton = props => {
  const cardName = props.component.match(intregex)
    ? "Interface"
    : props.component.match(spregex)
    ? "SoftwarePanels"
    : props.component;
  return (
    <div className="card-icon-item">
      <div
        onClick={props.changeCard && props.changeCard.bind(this, props.name)}
        className={props.name === props.currentCard ? "active" : ""}
      >
        <div className="card-button-mask">
          <Button size="lg">{props.name}</Button>
        </div>
        <div className={`card-icon-color ${props.className}`} />
        <img
          alt="Card"
          className="card-icon"
          src={`/cardIcons/${cardName}.svg`}
          draggable="false"
        />
        <div className="card-icon-background" />
      </div>
    </div>
  );
};

export default CardSwitcher;
