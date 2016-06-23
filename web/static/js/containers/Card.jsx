import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Cards from '../components/views';
import { Link } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';
import {TweenMax} from 'gsap';
import actions from '../actions';

const {cards, stations, simulators} = actions;
const {fetchSimulators} = simulators;
const {fetchStations} = stations;
const {fetchCards} = cards;

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
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSimulators(this.props.params.simulatorId));
		dispatch(fetchStations(this.props.params.stationId));
		dispatch(fetchCards(this.props.params.stationId));
	}
	render() {
		let {cards} = this.props.data;
		const {simulatorId, stationId, cardIndex} = this.props.params;
		let componentName;
		cards = cards || [];
		let loading = cards.length === 0;
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

function select(state,props){
	let cardsData = state.cards.filter((card) => (card.stationId === props.params.stationId));
	let stationsData = state.stations.filter((station) => (station.id === props.params.stationId));
	let simulatorsData = state.simulators.filter((simulator) => (simulator.simulatorId === props.params.simulatorId));
	return {
		data: {
			simulators: simulatorsData,
			stations: stationsData,
			cards: cardsData,
		}
	};
}
const CardData = connect(select)(CardFrame);

export default CardData;
