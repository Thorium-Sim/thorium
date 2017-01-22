import React, { Component } from 'react';
import { Col, Row, Card, Button, ButtonGroup } from 'reactstrap';
import viewList from '../views/list.js';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

class StationsConfig extends Component {
	constructor(params){
		super(params);
		this.state = {
			selectedStationConfig:{},
			selectedStation:{},
		};
	}
	componentDidMount() {
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
				name: name,
				stations:[]
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddStationSet($name: String!, $stations: [Stationsetinput]) {
					addstationset(name: $name, stations: []) {
						id
						name
						stations {
							name
							cards {
								name
								component
								icon
							}
						}
					}
				}
				`,
				variables: obj,
				updateQueries: {
					StationSets:(previousQueryResults, {mutationResult}) => {
						previousQueryResults.stations.push(mutationResult.data.addstationset);
						return previousQueryResults;
					}
				}
			});
		}
	}
	_showImportModal(){
	}
	_removeStationSet(){
		let station = this.state.selectedStationConfig;
		if (station.id){
			if (confirm("Are you sure you want to delete that station set?")){
				let obj = {
					id: station.id,
				};
				this.props.client.mutate({
					mutation: gql`
					mutation RemoveStationSet($id: String!) {
						removestationset(id: $id) {
							id
						}
					}
					`,
					variables: obj,
					updateQueries: {
						StationSets:(previousQueryResults, {mutationResult}) => {
							previousQueryResults.stations = previousQueryResults.stations.filter((stationIt) => {
								return stationIt.id !== mutationResult.data.removestationset.id;
							});
							return previousQueryResults;
						}
					}
				});
			}
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
				id: stationSet.id,
				station: station
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddStation($id: String!, $station: Stationinput!) {
					addstation(id: $id, station: $station) {
						id
						name
						stations {
							name
							cards {
								name
								component
								icon
							}
						}
					}
				}
				`,
				variables: obj,
				updateQueries: {
					StationSets:(previousQueryResults, {mutationResult}) => {
						let returnVal = JSON.parse(JSON.stringify(previousQueryResults));
						this.setState({
							selectedStationConfig: mutationResult.data.addstation
						});
						returnVal.stations = returnVal.stations.map((stationSet) => {
							if (stationSet.id === mutationResult.data.addstation.id){
								return mutationResult.data.addstation;
							}
							return stationSet;
						});
						return returnVal;
					}
				}
			});
		}
	}
	_removeStation(station){
		if (confirm("Are you sure you want to delete that station?")){
			let stationSet =  Object.assign({}, this.state.selectedStationConfig);
			let obj = {
				id: stationSet.id,
				station: station.name
			};
			this.props.client.mutate({
				mutation: gql`
				mutation RemoveStation($id: String!, $station: String!) {
					removestation(id: $id, station: $station) {
						id
						name
						stations {
							name
							cards {
								name
								component
								icon
							}
						}
					}
				}
				`,
				variables: obj,
				updateQueries: {
					StationSets:(previousQueryResults, {mutationResult}) => {
						let returnVal = Object.assign({}, previousQueryResults);
						this.setState({
							selectedStationConfig: mutationResult.data.removestation
						});
						returnVal.stations = returnVal.stations.map((station) => {
							if (station.id === mutationResult.data.removestation.id){
								return mutationResult.data.removestation;
							}
							return station;
						});
						return returnVal;
					}
				}
			});
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
			let obj = {
				id: stationSet.id,
				name: station.name,
				card: card
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddCard($id: String!, $name: String!, $card: Cardinput!) {
					addcard(id: $id, name: $name, card: $card) {
						id
						name
						stations {
							name
							cards {
								name
								component
								icon
							}
						}
					}
				}
				`,
				variables: obj,
				updateQueries: {
					StationSets:(previousQueryResults, {mutationResult}) => {
						let returnVal = Object.assign({}, previousQueryResults);
						this.setState({
							selectedStationConfig: mutationResult.data.addcard
						});
						returnVal.stations = returnVal.stations.map((station) => {
							if (station.id === mutationResult.data.addcard.id){
								return mutationResult.data.addcard;
							}
							return station;
						});
						return returnVal;
					}
				}
			});
		}
	}
	_removeCard(card,station){
		if (confirm("Are you sure you want to delete that card?")){
			let stationSet = Object.assign({}, this.state.selectedStationConfig);
			let obj = {
				id: stationSet.id,
				name: station.name,
				card: card.name
			};
			this.props.client.mutate({
				mutation: gql`
				mutation RemoveCard($id: String!, $name: String!, $card: String!) {
					removecard(id: $id, name: $name, cardname: $card) {
						id
						name
						stations {
							name
							cards {
								name
								component
								icon
							}
						}
					}
				}
				`,
				variables: obj,
				updateQueries: {
					StationSets:(previousQueryResults, {mutationResult}) => {
						let returnVal = Object.assign({}, previousQueryResults);
						this.setState({
							selectedStationConfig: mutationResult.data.removecard
						});
						returnVal.stations = returnVal.stations.map((station) => {
							if (station.id === mutationResult.data.removecard.id){
								return mutationResult.data.removecard;
							}
							return station;
						});
						return returnVal;
					}
				}
			});
		}
	}
	render(){
		return (
			<Row>
			<Col sm="3">
			<h5>Station Configs</h5>
			<Card className="scroll">
			{this.props.data.loading ? <li>Loading... </li> : this.props.data.stations.map((e) => {
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
			{this.state.selectedStationConfig.name ?
				<div>
				<h5>Stations</h5>
				<div className="scroll">
				{this.state.selectedStationConfig.stations.map((station,stationIndex) => {
					return (
						<div key={`${this.state.selectedStationConfig.id}-${station.name}-${stationIndex}`} style={{marginBottom: '15px'}}>
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
								<tr key={`${this.state.selectedStationConfig.id}-${station.name}-${card.name}`}>
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

const StationsConfigData = gql `
query StationSets{
	stations{
		id
		name
		stations {
			name
			cards {
				component
				icon
				name
			}
		}
	}
}
`;

export default graphql(StationsConfigData, {})(withApollo(StationsConfig));
