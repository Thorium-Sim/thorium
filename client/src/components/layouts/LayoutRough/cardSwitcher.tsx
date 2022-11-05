import React, {Fragment} from "react";
import {Tooltip} from "helpers/reactstrap";

const spregex = /.*.{8}-.{4}-.{4}-.{4}-.{12}/gi;
const intregex = /interface-id:.{8}-.{4}-.{4}-.{4}-.{12}/gi;
const CardButton: React.FC<{
  component: string;
  changeCard: (name: string) => void;
  currentCard: string;
  name: string;
  assigned: boolean;
}> = ({component, changeCard, currentCard, name, assigned}) => {
  const card = React.useRef<HTMLImageElement>(null);
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const cardName = component.match(intregex)
    ? "Interface"
    : component.match(spregex)
    ? "SoftwarePanels"
    : component;

  const cardImage = `/cardIcons/${cardName}.svg`;
  return (
    <Fragment>
      <img
        onClick={() => changeCard(name)}
        alt="Card"
        ref={card}
        className={`card-icon ${name === currentCard ? "active" : ""} ${
          assigned ? "card-icon-assigned" : ""
        }`}
        src={cardImage}
        draggable="false"
      />
      {card.current && (
        <Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target={card.current}
          toggle={() => setTooltipOpen(o => !o)}
          delay={{show: 0, hide: 0}}
        >
          <h4>{name}</h4>
        </Tooltip>
      )}
    </Fragment>
  );
};

const CardSwitcher: React.FC<{
  cards: {
    name: string;
    component: string;
    assigned: boolean;
    newStation: boolean;
  }[];
  changeCard: (name: string) => void;
  currentCard: string;
}> = ({cards, changeCard, currentCard}) => {
  return (
    <div className="card-switcher-holder">
      <div className="card-switcher">
        {(cards || []).map((card, index) => (
          <CardButton
            key={`${card.name}-${index}`}
            name={card.name}
            changeCard={changeCard}
            currentCard={currentCard}
            component={card.component}
            assigned={card.assigned || card.newStation}
          />
        ))}
      </div>
    </div>
  );
};
export default CardSwitcher;
