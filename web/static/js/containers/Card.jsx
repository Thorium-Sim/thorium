import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-apollo';
import Cards from '../components/views';
import { Link } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';
import {TweenMax} from 'gsap';

class CardContainer extends Component {
	componentWillEnter (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 0.5, {z: 100, rotationY:0, opacity: 0, transformPerspective:200}, {z: 0, rotationY:0, opacity: 1, transformPerspective:200, onComplete: callback});
	}

	componentWillLeave (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 0.5, {z: 0, rotationY:0, opacity: 1, transformPerspective:200}, {z: -100, rotationY:0, opacity: 0, transformPerspective:200, onComplete: callback});
	}
	render(){
		return (
		<div className="cardContainer" style={{position:'absolute'}}>
		{this.props.component(this.props)}
		</div>
		);
	}
}

class CardFrame extends Component {
	render() {
		const {cards,loading} = this.props.data;
		const {simulatorId, stationId, cardIndex} = this.props.params;
		let componentName;
		if (!loading){
			componentName = cards[cardIndex].component;
		}
		return (
			<div>
			<ul>
			{(loading) ? <div></div> : cards.map((card,index) => (
				<li key={card.id}>
				<Link to={`/simulator/${simulatorId}/station/${stationId}/card/${index}`}>
				{card.name}
				</Link>
				</li>
				))}
			</ul>
			Hello! {simulatorId} {stationId} {cardIndex}
			<TransitionGroup>
			{(loading) ? <div></div> :
				cards.map((card, index) => {
					return ((index === parseInt(cardIndex,10)) && <CardContainer key={card.id} component={Cards[componentName]} params={this.props.params} data={this.props.data} />);
				})
			}
			</TransitionGroup>
			</div>
			);
	}
}

const CardData = connect({
	mapQueriesToProps: (arg) => ({
		data: {
			query: gql`
			query Simulators {
				simulators(id: "${arg.ownProps.params.simulatorId}") {
					id
					name
				}
				stations(id: "${arg.ownProps.params.stationId}") {
					id
					name
				}
				cards(stationId: "${arg.ownProps.params.stationId}") {
					id
					name
					component
					order
				}
			}
			`,
		},
	}),
})(CardFrame);

export default CardData;
