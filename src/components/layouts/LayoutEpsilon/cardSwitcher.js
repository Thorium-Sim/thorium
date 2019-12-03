import React from "react";
import useOnClickOutside from "helpers/hooks/useClickOutside";

const spregex = /.*.{8}-.{4}-.{4}-.{4}-.{12}/gi;
const intregex = /interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi;

const CardSwitcher = ({cards, cardName, changeCard, hyperCard}) => {
  const [shown, setShown] = React.useState();
  const divRef = React.useRef();
  useOnClickOutside(divRef, () => setShown(false));
  const currentCard = cards.find(c => c.name === cardName) || cards[0];
  const iconName = currentCard.component.match(intregex)
    ? "Interface"
    : currentCard.component.match(spregex)
    ? "SoftwarePanels"
    : currentCard.component;
  const iconSrc = `/cardIcons/${iconName}.svg`;
  return (
    <div ref={divRef} className={`navigation ${hyperCard ? "hypercard" : ""}`}>
      <h1 className="card-name" onClick={() => setShown(s => !s)}>
        <img alt="card icon" className="card-icon" src={iconSrc} />
        {cardName}
      </h1>
      <div className="cards">
        <div
          className="cards-holder"
          style={{display: shown ? `block` : `none`}}
        >
          {(cards || []).map(c => {
            const cardName = c.component.match(spregex)
              ? "SoftwarePanels"
              : c.component.match(intregex)
              ? "Interface"
              : c.component;

            // Weird formatting here because of some strange
            // syntax hiliting
            const cardSrc = `/cardIcons/${cardName}.${"svg"}`;
            return (
              <div
                key={`card-${c.name}`}
                className={`navigation-card ${
                  currentCard.component === cardName ? " active" : ""
                }`}
                onClick={() => {
                  setShown(false);
                  changeCard(c.name);
                }}
              >
                <img alt="card icon" className="card-icon" src={cardSrc} />
                {c.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardSwitcher;
