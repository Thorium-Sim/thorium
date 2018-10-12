import React, { Component } from "react";

class CardSwitcher extends Component {
  state = {};
  render() {
    const { cards, cardName, changeCard, hyperCard } = this.props;
    const { shown } = this.state;
    return (
      <div
        className={`navigation ${hyperCard ? "hypercard" : ""}`}
        onMouseEnter={() => this.setState({ shown: true })}
        onMouseLeave={() => this.setState({ shown: false })}
        onClick={() => this.setState({ shown: true })}
      >
        <h1 className="card-name">{cardName}</h1>

        <div className="cards" style={{ height: cards.length * 36 + 30 }}>
          <div
            className="cards-holder"
            style={{ transform: shown ? null : `translateY(-110%)` }}
          >
            {(cards || []).map(c => (
              <div
                key={`card-${c.name}`}
                className="navigation-card"
                onClick={() => {
                  this.setState({ shown: false });
                  changeCard(c.name);
                }}
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>
        <div
          className="navigator"
          style={{
            transform: `translateY(${shown ? cards.length * 36 + 20 : 0}px)`
          }}
        />
      </div>
    );
  }
}
export default CardSwitcher;
