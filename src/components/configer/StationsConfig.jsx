import React, { Component } from 'react';
import { Col, Row, Card, Button, ButtonGroup, Input } from 'reactstrap';
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
			selectedStationConfig:null,
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
			selectedStationConfig: station.id
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
					variables: {id: station},
				});
			}
			this.setState({
				selectedStationConfig: null
			});
		}
	}
	_renameStationSet(){
		const name = prompt('What is the new name of the station set?');
		let station = this.state.selectedStationConfig;
		if (name){
			this.props.client.mutate({
				mutation: gql`
				mutation RenameStationSet($id: ID!, $name: String!) {
					renameStationSet(stationSetID: $id, name: $name)
				}
				`,
				variables: {id: station, name},
			});
		}
	}
	_renameStation(station) {
		const name = prompt('What is the new name of the station?');
		let stationId = this.state.selectedStationConfig;
		const mutation = gql`mutation RenameStation($id: ID!, $name: String!, $newName: String!){
			editStationInStationSet(stationSetID: $id, stationName: $name, newStationName: $newName)
		}`;
		if (name) {
			this.props.client.mutate({
				mutation: mutation,
				variables: {id: stationId, name: station.name, newName: name},
			});
		}
	}
	_editCard(){
		// TODO
	}
	_addStation(){
		let name  = prompt('What is the station name?');
		if (name){
			let obj = {
				id: this.state.selectedStationConfig,
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
			let obj = {
				id: this.state.selectedStationConfig,
				stationName: station.name
			};
			this.props.client.mutate({
				mutation: gql`
				mutation RemoveStation($id: ID!, $stationName: String!) {
					removeStationFromStationSet(stationSetID: $id, stationName: $stationName)
				}`,
				variables: obj,
			});
		}
	}
	_addCard(station,stationIndex,e){
		let component = e.target.value;
		let name  = prompt('What is the card name?');
		if (name){
			let obj = {
				id: this.state.selectedStationConfig,
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
			let obj = {
				id: this.state.selectedStationConfig,
				stationName: station.name,
				cardName: card.name
			};
			this.props.client.mutate({
				mutation: gql`
				mutation RemoveCard($id: ID!, $stationName: String!, $cardName: String!) {
					removeCardFromStation(stationSetID: $id, stationName: $stationName, cardName: $cardName) 
				}`,
				variables: obj,
			});
		}
	}
	_updateStationCard(type, card, station, e) {
		const mutation = gql`mutation EditCard($stationSetId: ID!, $stationName: String!, $cardName: String!, $name: String, $component: String, $icon: String){
			editCardInStationSet(stationSetID: $stationSetId, stationName: $stationName, cardName: $cardName, newCardName: $name, cardComponent: $component, cardIcon: $icon)
		}`;
		const obj = {
			stationSetId: this.state.selectedStationConfig,
			stationName: station.name,
			cardName: card.name,
		}
		obj[type] = e.target.value;
		this.props.client.mutate({
			mutation: mutation,
			variables: obj,
		});
	}
	render(){
		const selectedStation = this.props.data.loading ? {} : (this.props.data.stations.find(s => s.id === this.state.selectedStationConfig) || {});
		console.log(selectedStation)
		return (
			<Row>
			<Col sm="3">
			<h5>Station Configs</h5>
			<Card className="scroll">
			{this.props.data.loading ? <li>Loading... </li> : this.props.data.stations.map((e) => {
				return <li key={e.id} onClick={this._setSelectedStationConfig.bind(this,e)} className={`${(e.id === this.state.selectedStationConfig) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
			})}
			</Card>
			<ButtonGroup>
			<Button onClick={this._createStationSet.bind(this)} size="sm" color="success">Add</Button>
			<Button onClick={this._showImportModal.bind(this)} size="sm" color="info">Import</Button>
			{this.state.selectedStationConfig && <Button onClick={this._renameStationSet.bind(this)} size="sm" color="warning">Rename</Button>}
			{this.state.selectedStationConfig && <Button onClick={this._removeStationSet.bind(this)} size="sm" color="danger">Remove</Button>}
			</ButtonGroup>
			</Col>
			<Col sm="9">
			{selectedStation.name ?
				<div>
				<h5>Stations</h5>
				<div className="scroll">
				{selectedStation.stations.map((station,stationIndex) => {
					return (
						<div key={`${this.state.selectedStationConfig}-${station.name}-${stationIndex}`} style={{marginBottom: '15px', border: 'solid 1px rgba(0,0,0,0.5)'}}>
						<table className="table table-sm table-striped table-hover">
						<thead className="thead-default">
						<tr>
						<th colSpan="2">{station.name}</th>
						<th><FontAwesome name="pencil-square-o" className="text-warning" onClick={this._renameStation.bind(this,station)} /> <FontAwesome name="ban" className="text-danger" onClick={this._removeStation.bind(this,station)} /></th>
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
						{station.cards.map((card, index) => {
							return (
								<tr key={`${this.state.selectedStationConfig}-${station.name}-${index}`}>
								<td><Input type="text" value={card.name} onChange={this._updateStationCard.bind(this, 'name', card, station)} /></td>
								<td>
								<Input type="select" value={card.component} onChange={this._updateStationCard.bind(this, 'component', card, station)}>
								{
									viewList.map((e) => {
										return <option key={e} value={e}>{e}</option>;
									})
								}
								</Input>
								</td>
								<td>
								<Input type="select" value={card.icon} onChange={this._updateStationCard.bind(this, 'icon', card, station)}>
								<option>Select an icon</option>
								{
									this.props.data.assetFolders[0].containers.map((e) => {
										return <option key={e.name} value={e.name}>{e.name}</option>;
									})
								}
								</Input>
								</td>
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
	assetFolders(name: "Card Icons") {
		containers {
			name
		}
	}
}
`;

export default graphql(StationsConfigData, {})(withApollo(StationsConfig));
