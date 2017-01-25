import React, { Component } from 'react';
import { Col, Row, Card, Button, ButtonGroup } from 'reactstrap';
import viewList from '../views/list.js';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

const STATION_SUB = gql`
subscription StationSub {
	stationSetUpdate {
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
}`;

class StationsConfig extends Component {
	constructor(params){
		super(params);
		this.state = {
			selectedStationConfig:{},
			selectedStation:{},
		};
		this.stationSubscription = null;
	}
	componentWillReceiveProps(nextProps) {
		if (!this.stationSubscription && !nextProps.data.loading) {
			this.stationSubscription = nextProps.data.subscribeToMore({
				document: STATION_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					previousResult.stations = subscriptionData.data.stationSetUpdate
					return previousResult;
				},
			});
		}
	}
	_setSelectedStationConfig(station){
		this.setState({
			selectedStationConfig: station
		});
	}
	_createStationSet(){
		let name  = prompt('What is the station set name? eg. 12-Standard, 8-School, etc.');
		if (name){
			this.props.client.mutate({
				mutation: gql`
				mutation AddStationSet($name: String!) {
					createStationSet(name: $name)
				}`,
				variables: {name},
			});
		}
	}
	_showImportModal(){
	}
	_removeStationSet(){
		let station = this.state.selectedStationConfig;
		if (station.id){
			if (confirm("Are you sure you want to delete that station set?")){
				this.props.client.mutate({
					mutation: gql`
					mutation RemoveStationSet($id: ID!) {
						removeStationSet(stationSetID: $id)
					}
					`,
					variables: {id: station.id},
				});
			}
			this.setState({
				selectedStationConfig: {}
			});
		}
	}
	_renameStationSet(){
		// TODO
	}
	_addStation(){
		let name  = prompt('What is the station name?');
		if (name){
			let stationSet =  Object.assign({}, this.state.selectedStationConfig);
			let obj = {
				id: stationSet.id,
				station: name
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddStation($id: ID!, $station: String!) {
					addStationToStationSet(stationSetID: $id, stationName: $station)
				}`,
				variables: obj,
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
				mutation RemoveStation($id: ID!, $station: String!) {
					removeStationFromStationSet(stationSetID: $id, stationName: $station)
				}`,
				variables: obj,
			});
		}
	}
	_addCard(station,stationIndex,e){
		let component = e.target.value;
		let name  = prompt('What is the card name?');
		if (name){
			let stationSet = Object.assign({}, this.state.selectedStationConfig);
			let obj = {
				id: stationSet.id,
				name: station.name,
				cardName: name,
				cardComponent: component,
				cardIcon: null
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddCard($id: ID!, $name: String!, $cardName: String!, $cardComponent: String!, $cardIcon: String) {
					addCardToStation(stationSetID: $id, stationName: $name, cardName: $cardName, cardComponent: $cardComponent, cardIcon: $cardIcon) 
				}`,
				variables: obj,
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
				mutation RemoveCard($stationSetID: ID!, $stationName: String!, $cardName: String!) {
					removeCardFromStation(stationSetID: $stationSetID, stationName: $stationName, cardName: $cardName) 
				}`,
				variables: obj,
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
			<Button onClick={this._showImportModal.bind(this)} size="sm" color="info">Import</Button>
			{this.state.selectedStationConfig.id && <Button onClick={this._renameStationSet.bind(this)} size="sm" color="warning">Rename</Button>}
			{this.state.selectedStationConfig.id && <Button onClick={this._removeStationSet.bind(this)} size="sm" color="danger">Remove</Button>}
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
