import React, { Component } from 'react';
import { Button, LoadingWidget, Row, Col, Container } from './generic';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../actions';

const {stations, cards} = actions;
const {fetchStations} = stations;
const {flushCards} = cards;
class StationLink extends Component {
	render(){
		let station = this.props.station || {};
		return (
			<Button
			type="primary"
			label={station.name}
			href={`/simulator/${station.simulatorId}/station/${station.id}/card/0`}
			/>
			);
	}
}

class Stations extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchStations({simulatorId:this.props.params.simulatorId}));
		//dispatch(flushCards());
	}
	render() {
		let stationsData = this.props.data.stations || [];
		let loading = this.props.data.loading;
		return (
			<Container>
			<Row>
			<Col className="col-sm-12">
			<h1>Station Picker</h1>
			<Link to="/">&laquo; Go Back</Link>
			<h2>Select Station</h2>
			<div className="btn-group">		
			{(loading) ? <LoadingWidget /> :
				stationsData.map((station)=>{
					return <StationLink key={station.id} station={station} />;
				})
			}
			</div>
			</Col>
			</Row>
			</Container>
			);
	}
}

function select(state, props){
	let stationsData = state.stations.filter((station) => (station.simulatorId === props.params.simulatorId));
	return {
		data: {
			stations: stationsData
		}
	};
}
const StationData = connect(select)(Stations);

export default StationData;
