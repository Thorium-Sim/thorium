import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Layouts from '../components/layouts';
import { Link } from 'react-router';
import actions from '../actions';
import socket from '../socket';

const {cards, stations, simulators} = actions;
const {fetchSimulators} = simulators;
const {fetchStations} = stations;
const {fetchCards} = cards;
const operationChannel = socket.channel('operations');
operationChannel.join();

class CardFrame extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSimulators({id:this.props.params.simulatorId}));
		dispatch(fetchStations({id:this.props.params.stationId}));
		dispatch(fetchCards({stationId:this.props.params.stationId}));
    }
    render() {
    	let {stationsData, simulatorsData} = this.props.data;
    	let currentStation = stationsData[0] || {};
    	let currentSimulator = simulatorsData[0] || {};
    	const layoutName = currentStation.layout || currentSimulator.layout || 'LayoutDefault';
    	let LayoutComponent = Layouts[layoutName];
    	if (!LayoutComponent) LayoutComponent = Layouts.LayoutDefault;
    	return <LayoutComponent {...this.props} operationChannel={operationChannel} />;
    }
}

function select(state,props){
	let cardsData = state.cards.filter((card) => (card.stationId === props.params.stationId));
	let stationsData = state.stations.filter((station) => (station.id === props.params.stationId));
	let simulatorsData = state.simulators.filter((simulator) => (simulator.id === props.params.simulatorId));
	return {
		data: {
			simulatorsData: simulatorsData,
			stationsData: stationsData,
			cardsData: cardsData,
		}
	};
}
const CardData = connect(select)(CardFrame);

export default CardData;
