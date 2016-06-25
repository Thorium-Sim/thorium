import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Views from '../components/views';
import { Link } from 'react-router';
import TransitionGroup from 'react-addons-transition-group';
import {TweenMax} from 'gsap';
import actions from '../actions';
import socket from '../socket';

const {cards, stations, simulators} = actions;
const {fetchSimulators} = simulators;
const {fetchStations} = stations;
const {fetchCards} = cards;
const operationChannel = socket.channel('operations');
operationChannel.join();

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
			<div className="cardContainer container" style={{width: '100%', position:'absolute', alignSelf:'center'}}>
			<this.props.component {...this.props} />
			</div>
			);
	}
}

class CardFrame extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSimulators({id:this.props.params.simulatorId}));
		dispatch(fetchStations({id:this.props.params.stationId}));
		dispatch(fetchCards({stationId:this.props.params.stationId}));
	}
	render() {
		let {cardsData} = this.props.data;
		const {simulatorId, stationId, cardIndex} = this.props.params;
		let componentName;
		cardsData = cardsData || [];
		let loading = cardsData.length === 0;
		if (!loading){
			componentName = cardsData[cardIndex].component;
		}
		return (
			<div style={{display:'flex'}}>
			<ul>
			{(loading) ? <div></div> : cardsData.map((card,index) => (
				<li key={card.id}>
				<Link to={`/simulator/${simulatorId}/station/${stationId}/card/${index}`}>
				{card.name}
				</Link>
				</li>
				))}
			</ul>
			<TransitionGroup>
			{
				cardsData.map((card, index) => {
					return <CardContainer key={card.id} component={Views[componentName]} params={this.props.params} data={this.props.data} operationChannel={operationChannel} />;
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
			cardsData: cardsData,
		}
	};
}
const CardData = connect(select)(CardFrame);

export default CardData;
