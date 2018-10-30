import React, { Component } from "react";

class CardSwitcher extends Component {
  state = {};
  render() {
    const { cards, cardName, changeCard, hyperCard } = this.props;
    //const iconName ="";
    const currentCard = cards.find(c => c.name === cardName);
   // const iconName = currentCard.component;
   const iconName = currentCard.component.match(/.{8}-.{4}-.{4}-.{4}-.{12}/gi) ? "SoftwarePanels" : currentCard.component;
    const { shown } = this.state;
    return (
      <div
        className={`navigation ${hyperCard ? "hypercard" : ""}`}
        onClick={() => this.setState({ shown: !shown })}
      >
        <h1 className="card-name">
              <img 
              src={`/cardIcons/${iconName}.svg`}
              />
        {cardName}</h1>
        <div className="cards">
          <div
            className="cards-holder"
            style={{ display: shown ? `block` : `none` }}
          >
            {(cards || []).map(c => (
              <div
                key={`card-${c.name}`}
                className={"navigation-card" + (cardName === c.name ? ' active' : '')}
                onClick={() => {
                  this.setState({ shown: false });
                  changeCard(c.name);
                }}
              >
              
              <img 
              src={`/cardIcons/${( c.component.match(/.{8}-.{4}-.{4}-.{4}-.{12}/gi) ? "SoftwarePanels" : c.component)}.svg`}
              />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
              
export default CardSwitcher;
/*
              tried to insert this at line 29:
              <img 
              src={`/cardIcons/${c.name}.svg`}
              />
*/
