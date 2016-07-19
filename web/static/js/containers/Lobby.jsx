import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, LoadingWidget, Row, Col, Container } from '../components/generic';
import { Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import socket from '../socket';
import guid from '../helpers/guid.js';
import './style.scss';

import actions from '../actions';
const {presence, missions, flights} = actions;
const {fetchPresence} = presence;
const {fetchMissions} = missions;
const {fetchFlights} = flights;
const operationChannel = socket.channel('operations');

class Lobby extends Component {
	constructor(props){
		super(props);
		this.state = {
			modal: false,
			selectedMission: undefined,
		};
		this.toggle = this.toggle.bind(this);
	}
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchPresence());
		dispatch(fetchMissions());
		dispatch(fetchFlights());
		operationChannel.join();
	}
	loadFlight(){
		//Use the operation channel to insert the new flight into the database.
		let mission = this.props.data.missions.filter((e) => {
			if (e.id === this.state.selectedMission){
				return true;
			}
			return false;
		})[0];
		mission.mission = {
			id: mission.id,
			name: mission.name,
		};
		mission.timestamp = Date.now();
		delete mission.id;
		mission.id = guid();

		let insertObj = {
			table:"flights",
			data: mission
		};
		operationChannel.push("insert",insertObj);
		this.setState({
			modal: false,
			selectedMission: undefined,
		});
	}
	toggle(){
		this.setState({
			modal: !this.state.modal
		});
	}
	selectMission(mission){
		if (this.state.selectedMission === mission.id){
			this.setState({
				selectedMission: undefined,
			});
		} else {
			this.setState({
				selectedMission: mission.id,
			});
		}
	}
	render(){
		console.log('State',this.props.data);
		return (
			<Container className="lobby">
			<Row>
			<h2>Lobby</h2>
			<table className="table table-striped table-hover table-sm">
			<thead>
			<tr>
			<th>Client Name</th>
			<th>Flight</th>
			<th>Simulator</th>
			<th>Station</th>
			<th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{this.props.data.presence.map((p) => (
				<tr key={p}>
				<td>{`${p}`}</td>
				<td>
				<select className="form-control-sm c-select">
				<option>Open this select menu</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
				</select>
				</td>
				<td>
				<select className="form-control-sm c-select">
				<option>Open this select menu</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
				</select>
				</td>
				<td>
				<select className="form-control-sm c-select">
				<option>Open this select menu</option>
				<option value="1">One</option>
				<option value="2">Two</option>
				<option value="3">Three</option>
				</select>
				</td>
				<td>
				<Button type="primary" title="This saves the current simulator and station setting and persists it for future flights." className="btn-sm" label="Save" />
				<Button type="danger" title="This removes the saved state." className="btn-sm" label="Reset" />
				</td>
				</tr>
				))}
			</tbody>
			</table>
			</Row>
			<Row>
			<h2>Flights Manager <Button type="success" label="Create Flight" onClick={this.toggle} /></h2>
			</Row>
			<Modal isOpen={this.state.modal} toggle={this.toggle} size="large">
			<ModalHeader toggle={this.toggle}>Create A New Flight</ModalHeader>
			<ModalBody>
			<Row>
			<Col className="col-sm-6">
			<h4>Choose a mission</h4>
			<table className="table table-striped table-hover table-sm">
			<thead>
			<tr>
			<th>Name</th>
			<th>Simulators</th>
			</tr>
			</thead>
			<tbody>
			{this.props.data.missions.map((mission) => {
				return (<tr onClick={this.selectMission.bind(this,mission)} className={this.state.selectedMission === mission.id ? 'table-success' : ''} key={mission.id}>
					<td>{mission.name}</td>
					<td>{mission.simulators.map((simulator) => {
						return <p key={`${mission.id}-${simulator.id}`}>{simulator.id}</p>;
					})}</td>
					</tr>);
			})}
			</tbody>
			</table>
			</Col>
			<Col className="col-sm-6">
			<h4>Or reload a saved flight</h4>
			<table className="table table-striped table-hover table-sm">
			<thead>
			<tr>
			<th>Date</th>
			<th>Mission</th>
			<th>Simulators</th>
			</tr>
			</thead>
			<tbody>

			</tbody>
			</table>
			</Col>
			</Row>
			</ModalBody>
			<ModalFooter>
			<Button type="secondary" onClick={this.toggle} label="Cancel" />
			<Button type="primary" onClick={this.loadFlight.bind(this)} label="Load Flight" />
			</ModalFooter>
			</Modal>
			</Container>
			);
	}
}

function select(state){
	return {
		data: state
	};
}
const LobbyContainer = connect(select)(Lobby);

export default LobbyContainer;
