import React, {Component} from 'react';
import { Link } from 'react-router';

const CardButton = (props) => {
	return(
		<div className="card-icon-item">
		<Link to={`/simulator/${props.params.simulatorId}/station/${props.params.stationId}/card/${props.cardNum}`} className={(props.cardNum === props.params.cardIndex) ? "active" : ""}>
		<div className="card-button-mask">
		<div className="card-button-background">
		<div className="card-button">{props.name}</div>
		</div>
		</div>
		<div className="card-icon-color"></div>
		<img className="card-icon" src="http://www.iconsplace.com/download/lime-phone-128.png" draggable="false" />
		<div className="card-icon-background"></div>
		</Link>
		</div>
		);
};


class CardSwitcher extends Component {
	render(){
		return (<div className="card-icon-container">
		{
			this.props.cards.map((card,index) => {
				return <CardButton key={index} cardNum={index} name={card.name} {...this.props} />;
			})
		}
		</div>);
	}
}

export default CardSwitcher;
