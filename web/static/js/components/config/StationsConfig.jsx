import React, { Component } from 'react';
import { Col, Row, Container, Card, CardBlock, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import actions from '../../actions';
import uuid from '../../helpers/guid';
import viewList from '../views/list.js';
import FontAwesome from 'react-fontawesome';

const {stations} = actions;
const {fetchStations} = stations;

class StationsConfig extends Component {
	constructor(params){
		super(params);
		this.state = {
			selectedStationConfig:{},
			selectedStation:{},
		};
	}
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchStations({simulatorId: this.props.selectedSimulator.id}));
	}
	_setSelectedStationConfig(station){
		this.setState({
			selectedStationConfig: station
		});
	}
	_createStationSet(){
		let name  = prompt('What is the station set name? eg. 12-Standard, 8-School, etc.');
		if (name){
			let obj = {
				id: uuid(),
				name: name,
				simulatorId:this.props.selectedSimulator.id,
				stations:[]
			};
			this.setState({
				selectedStationConfig: obj
			});
			this.props.operationChannel.push("insert",{table:"stations",data:obj});
		}
	}
	_showImportModal(){

	}
	_removeStationSet(){
		let station = this.state.selectedStationConfig;
		if (confirm("Are you sure you want to delete that station set?")){
			//TODO: Delete all of the objects associated with the simulator;
			let obj = {
				id: station.id,
			};
			this.props.operationChannel.push("delete",{table:"stations",filter:obj});
		}
	}
	_addStation(){
		let name  = prompt('What is the station name?');
		if (name){
			let stationSet =  Object.assign({}, this.state.selectedStationConfig);
			let station = {
				name: name,
				cards: [],
			};
			let obj = {
				id: stationSet.id
			};
			stationSet.stations.push(station);
			this.props.operationChannel.push("update",{table:"stations",filter:obj,data:stationSet});
		}
	}
	_removeStation(station){
		if (confirm("Are you sure you want to delete that station?")){
			let stationSet =  Object.assign({}, this.state.selectedStationConfig);
			stationSet.stations = stationSet.stations.filter((e) => {
				if (e.name === station.name){
					return false;
				}
				return true;
			});
			let obj = {
				id: stationSet.id
			};
			this.setState({
				selectedStationConfig:stationSet,
			});
			this.props.operationChannel.push("update",{table:"stations",filter:obj,data:stationSet});
		}
	}
	_addCard(station,stationIndex,e){
		let component = e.target.value;
		let name  = prompt('What is the card name?');
		if (name){
			let card = {
				name: name,
				component: component,
				icon: null,
			};
			let stationSet = Object.assign({}, this.state.selectedStationConfig);
			station.cards.push(card);
			let obj = {
				id: stationSet.id
			};
			delete stationSet.id;
			stationSet.stations[stationIndex] = station;
			this.props.operationChannel.push("update",{table:"stations",filter:obj,data:stationSet});
		}
	}
	_removeCard(card,station){
		if (confirm("Are you sure you want to delete that card?")){
			let stationSet = Object.assign({}, this.state.selectedStationConfig);
			station.cards = station.cards.filter((e) => {
				if (card.name === e.name){
					return false;
				}
				return true;
			});
			stationSet.stations = stationSet.stations.map((e) => {
				if (station.name === e.name){
					return station;
				}
				return e;
			});
			this.setState({
				selectedStationConfig:stationSet,
			});
			this.props.operationChannel.push("update",{table:"stations",filter:obj,data:stationSet});
		}
	}
	render(){
		return (
			<Row>
			<Col sm="3">
			<h5>Station Configs</h5>
			<Card className="scroll">
			{this.props.data.stations.map((e) => {
				return <li key={e.id} onClick={this._setSelectedStationConfig.bind(this,e)} className={`${(e.id === this.state.selectedStationConfig.id) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
			})}
			</Card>
			<ButtonGroup>
			<Button onClick={this._createStationSet.bind(this)} size="sm" color="success">Add</Button>
			<Button onClick={this._showImportModal.bind(this)} size="sm" color="warning">Import</Button>
			<Button onClick={this._removeStationSet.bind(this)} size="sm" color="danger">Remove</Button>
			</ButtonGroup>
			</Col>
			<Col sm="9">
			{this.state.selectedStationConfig.id ?
				<div>
				<h5>Stations</h5>
				<div className="scroll">
				{this.state.selectedStationConfig.stations.map((station,stationIndex) => {
					return (
						<div key={station.name}>
						<table className="table table-sm table-striped table-hover">
						<thead className="thead-default">
						<tr>
						<th colSpan="3">{station.name}</th>
						<th><FontAwesome name="ban" className="text-danger" onClick={this._removeStation.bind(this,station)} /></th>
						</tr>
						</thead>
						<thead>
						<tr>
						<th>Name</th>
						<th>Component</th>
						<th>Icon</th>
						<th>Action</th>
						</tr>
						</thead>
						<tbody>
						{station.cards.map((card) => {
							return (
								<tr key={card.name}>
								<td>{card.name}</td>
								<td>{card.component}</td>
								<td>{card.icon}</td>
								<td><FontAwesome name="ban" className="text-danger" onClick={this._removeCard.bind(this,card,station)} /></td>
								</tr>
								);
						})}
						</tbody>
						</table>
						<label>Select a component to add a card</label>
						<select className="c-select form-control" onChange={this._addCard.bind(this,station,stationIndex)}>
						<option>Please Select A Card</option>
						{
							viewList.map((e) => {
								return <option key={e} value={e}>{e}</option>;
							})
						}
						</select>
						</div>
						);
				})}
				</div>
				<Button size="sm" color="success" onClick={this._addStation.bind(this)}>Add Station</Button>
				</div>
				: <div />
			}
			</Col>
			</Row>
			);
	}
}

function select(state){
	return {
		data: state
	};
}
const StationsContainer = connect(select)(StationsConfig);

export default StationsContainer;
