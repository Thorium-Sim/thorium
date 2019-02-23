import React, { Component } from "react";

const spregex = /software-panel-.{8}-.{4}-.{4}-.{4}-.{12}/gi;
const intregex = /interface-.{8}-.{4}-.{4}-.{4}-.{12}/gi;
class CardSwitcher extends Component {
  state = {};
  render() {
    const { cards, cardName, changeCard, hyperCard } = this.props;
    const currentCard = cards.find(c => c.name === cardName) || cards[0];
    const iconName = currentCard.component.match(spregex)
      ? "SoftwarePanels"
      : currentCard.component.match(intregex)
        ? "Interface"
        : currentCard.component;
    const { shown } = this.state;
    return (
      <div
        className={`navigation ${hyperCard ? "hypercard" : ""}`}
        onClick={() => this.setState({ shown: !shown })}
      >
        <h1 className="card-name">
          <img
            alt="card icon"
            className="card-icon"
            src={`/cardIcons/${iconName}.svg`}
          />
          {cardName}
        </h1>
        <div className="cards">
          <div
            className="cards-holder"
            style={{ display: shown ? `block` : `none` }}
          >
            {(cards || []).map(c => {
              const cardName = c.component.match(spregex)
                ? "SoftwarePanels"
                : c.component.match(intregex)
                  ? "Interface"
                  : c.component;
              return (
                <div
                  key={`card-${c.name}`}
                  className={
                    "navigation-card" + (cardName === c.name ? " active" : "")
                  }
                  onClick={() => {
                    this.setState({ shown: false });
                    changeCard(c.name);
                  }}
                >
                  <img
                    alt="card icon"
                    className="card-icon"
                    src={`/cardIcons/${cardName}.svg`}
                  />
                  {c.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default CardSwitcher;
