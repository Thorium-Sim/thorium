import React, { Component } from 'react';
import { Col, Row, Container, Card, CardBlock, Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-apollo';

import uuid from '../helpers/guid';
import Configs from '../components/config';

import './config.scss';

class Config extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedSimObject: null,
			selectedSimulator: {},
		};
	}
	_setSelectedSimObject(simObj) {
		this.setState({selectedSimObject:simObj.name});
	}
	_setSelectedSimulator(sim) {
		this.setState({selectedSimulator:sim});
	}
	_createSimulator(){
		let name = prompt('What is the simulator\'s name?');
		if (name){
			let obj = {
				id: uuid(),
				name: name,
				layout: 'LayoutDefault',
				alertLevel: 5
			};
			operationChannel.push("insert",{table:"simulators",data:obj});
		}
	}
	_deleteSimulator(){
		let simulator = this.state.selectedSimulator;
		if (simulator){
			if (confirm("Are you sure you want to delete that simulator?")){
				//TODO: Delete all of the objects associated with the simulator;
				let obj = {
					id: simulator.id,
				};
				operationChannel.push("delete",{table:"simulators",filter:obj});
			}
		}
	}
	render(){
		let simObjs = [
		{
			name: "Simulator",
		},
		{
			name: "Stations",
		},
		{
			name: "Systems",
		},
		{
			name: "Decks",
		},
		{
			name: "Rooms",
		},
		{
			name: "Hallways",
		},
		{
			name: "Inventory",
		},
		{
			name: "Crew",
		},
		];
		const ConfigComponent = (this.state.selectedSimObject ? Configs[`${this.state.selectedSimObject}Config`] : "div") || "div";
		return (
			<Container className="ConfigView" fluid>
			<h2>Simulator Config</h2>
			<Row>
			<Col sm="2">
			<h4>Simulators</h4>
			<Card className="scroll">

			{this.props.data.loading ? <div /> : this.props.data.simulators.map((e) => {
				return <li key={e.id} onClick={this._setSelectedSimulator.bind(this,e)} className={`${(e.id === this.state.selectedSimulator.id) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
			})}
			</Card>
			<ButtonGroup>
			<Button onClick={this._createSimulator.bind(this)} size="sm" color="success">Add</Button>
			{this.state.selectedSimulator.id ?
				<Button onClick={this._deleteSimulator.bind(this)} size="sm" color="danger">Remove</Button>
				: <div></div>
			}
			</ButtonGroup>

			</Col>
			<Col sm="2">
			{(this.state.selectedSimulator.id) ?
				<div>
				<h4>Sim Objects</h4>
				<Card>
				<ul className="list-group list-group-flush">
				{simObjs.map((e) => {
					return <li key={e.name} onClick={this._setSelectedSimObject.bind(this,e)} className={`${(e.name === this.state.selectedSimObject) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
				})}
				</ul>
				</Card>
				</div>
				: <div />
			}
			</Col>
			<Col sm="8">
			<h4>Config</h4>
			{this.state.selectedSimObject ?
				<ConfigComponent {...this.props} selectedSimulator={this.state.selectedSimulator} />
				: <div />
			}
			</Col>
			</Row>
			</Container>
			);
	}
}

const ConfigData = connect({
	mapQueriesToProps: () => ({
		data: {
			query: gql`
			query simulators {
				simulators (template: "true"){
					id,
					name,
					alertLevel,
					layout
				},

			}`
		},
	}),
})(Config);

export default ConfigData;
