import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Row, Col, Card } from '../../generic';
import dragula from 'react-dragula';
import viewList from '../list.js';
import './style.css';

class AdminStationsContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedStation: {},
			selectedCard: {},
			selectedComponent: "",
		};
	}
	componentDidMount() {
		let container = findDOMNode(this.refs.cardSort);
		dragula([container]);
	}
	_addStation(){
		let stationName = prompt("What is the name of the station?");
		let stationObj = {
			simulatorId: this.props.params.simulatorId,
			name: stationName,
			id: `${this.props.params.simulatorId}-${stationName.toLowerCase()}`
		};
		this.props.operationChannel.push("insert",{table:"stations",data:stationObj});
	}
	_renameStation(){
		let stationName = prompt("What would you like to rename this station to?");
		let updateObj = {
			table:"stations",
			data:{
				name: stationName
			},
			filter: {
				id:this.state.selectedStation.id
			}
		};
		this.props.operationChannel.push("update",updateObj);
	}
	_deleteStation(){
		if (window.confirm("Are you sure you want to delete this station? It will delete all the cards too.")){
			//Delete the station
			let deleteObj = {
				table:"stations",
				filter: {
					id:this.state.selectedStation.id
				}
			};
			this.props.operationChannel.push("delete",deleteObj);
			//Probably should delete all of the cards attached to that station too
			deleteObj = {
				table:"cards",
				filter: {
					stationId:this.state.selectedStation.id
				}
			};
			this.props.operationChannel.push("delete",deleteObj);
			this.setState({selectedStation:{}})
		}
	}
	_addCard(){
		let cardName = prompt("What is the name of the card?");
		let cardCount = this.props.cardData.cards.map((card) => {
			if (this.state.selectedStation.id === card.stationId){
				return "here";
			}
			return false;
		}).filter((card) => (card)).length;
		let insertObj = {
			table:"cards",
			data: {
				stationId: this.state.selectedStation.id,
				name: cardName,
				component: this.state.selectedComponent,
				order: cardCount + 1
			}
		};
		this.props.operationChannel.push("insert",insertObj);
	}
	_deleteCard(){
		if (window.confirm("Are you sure you want to delete this card?")){
			//Delete the station
			let deleteObj = {
				table:"cards",
				filter: {
					id:this.state.selectedCard.id
				}
			};
			this.props.operationChannel.push("delete",deleteObj);
			this.setState({selectedCard:{}})
		}
	}
	render(){
		return (
			<div id="adminStations">
			<Row>
			<Col className="col-sm-3 stations">
			<Card title="Stations">
			{this.props.cardData.stations.map((station) => (
				<p key={station.id} className={this.state.selectedStation.id === station.id ? "selected" : ""} onClick={() => {this.setState({selectedStation:station});}}>{station.name}</p>
				))}
			</Card>
			<Button type="primary" className="btn-block" label="Add" onClick={this._addStation.bind(this)} />
			{this.state.selectedStation.id ?
				(<div>
					<Button type="default" className="btn-block" label="Rename" onClick={this._renameStation.bind(this)} />
					<Button type="danger" className="btn-block" label="Delete" onClick={this._deleteStation.bind(this)} />
					</div>) : <div />
			}
			</Col>
			<Col className="col-sm-4 cardList">
			<Card title="Cards">
			<table className="table table-sm">
			<thead>
			<tr>
			<th>Name</th>
			<th>Component</th>
			</tr>
			</thead>
			<tbody ref="cardSort">
			{this.props.cardData.cards.map((card) => {
				if (this.state.selectedStation.id === card.stationId){
					return(
						<tr key={card.id} className={this.state.selectedCard.id === card.id ? "table-active" : ""} onClick={() => {this.setState({selectedCard:card});}}>
						<td>{card.name}</td>
						<td>{card.component}</td>
						</tr>
						);
				}
				return false;
			}).filter((card) => (card))}
			</tbody>
			</table>
			</Card>
			</Col>
			<Col className="col-sm-2">
			{(this.state.selectedComponent && this.state.selectedStation.id) ?
				<Button type="default" className="btn-block" label="&#8647; Add" onClick={this._addCard.bind(this)} /> : <div />
			}
			{this.state.selectedCard.id ?
				<Button type="danger" className="btn-block" label="Remove &#8649;" onClick={this._deleteCard.bind(this)} /> : <div />
			}
			</Col>
			<Col className="col-sm-3">
			<Card title="Components">
			{viewList.map((view) => (
				<p key={view} className={this.state.selectedComponent === view ? "selected" : ""} onClick={() => {this.setState({selectedComponent:view});}}>{view}</p>
				))}
			</Card>
			</Col>
			</Row>
			</div>
			);
	}
}

const AdminStations = AdminStationsContent;

export default AdminStations;
