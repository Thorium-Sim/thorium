import React, { Component, Fragment } from "react";
import { Tooltip } from "reactstrap";

const spregex = /.*.{8}-.{4}-.{4}-.{4}-.{12}/gi;
const intregex = /interface-.{8}-.{4}-.{4}-.{4}-.{12}/gi;
class CardButton extends Component {
  state = {};
  card = React.createRef();
  componentDidMount() {
    this.setState({ mounted: true });
  }
  toggle = card => {
    this.setState({
      [card]: !this.state[card]
    });
  };
  render() {
    const { component, changeCard, currentCard, name } = this.props;
    const cardName = component.match(intregex)
      ? "Interface"
      : component.match(spregex)
      ? "SoftwarePanels"
      : component;

    return (
      <Fragment>
        <img
          onClick={() => changeCard(name)}
          alt="Card"
          ref={this.card}
          className={`card-icon ${name === currentCard ? "active" : ""}`}
          src={`/cardIcons/${cardName}.svg`}
          draggable="false"
        />
        {this.card.current && (
          <Tooltip
            placement="top"
            isOpen={this.state[name]}
            target={this.card.current}
            toggle={() => this.toggle(name)}
            delay={{ show: 0, hide: 0 }}
          >
            <h4>{name}</h4>
          </Tooltip>
        )}
      </Fragment>
    );
  }
}
const CardSwitcher = ({ cards, changeCard, currentCard }) => {
  return (
    <div className="card-switcher-holder">
      <div className="card-switcher">
        {(cards || []).map((card, index) => (
          <CardButton
            key={`${card.name}-${index}`}
            cardNum={index}
            name={card.name}
            changeCard={changeCard}
            currentCard={currentCard}
            component={card.component}
          />
        ))}
      </div>
    </div>
  );
};
export default CardSwitcher;
