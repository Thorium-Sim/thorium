import React, { Component } from 'react';
import { Col, Row, Container, Card, CardBlock, Button, ButtonGroup } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import {Link, withRouter} from 'react-router';
import uuid from '../helpers/guid';
import Configs from '../components/config';

import './config.scss';

class ConfigView extends Component {
	constructor(props){
		super(props);
		this.state = {
			selectedConfigObject: null,
		};
	}
	_setSelectedConfigObject(configObj) {
		this.setState({selectedConfigObject:configObj});
	}
	render(){
		const ConfigComponent = (this.state.selectedConfigObject ? Configs[`${this.state.selectedConfigObject}Config`] : "div") || "div";
		return (
			<Container className="ConfigView" fluid>
			<Row>
			{this.state.selectedConfigObject ?
				<Col sm="12">
				<a href="#back" onClick={this._setSelectedConfigObject.bind(this, null)}>Go Back</a>
				<ConfigComponent {...this.props} />
				</Col>
				:
				<Col sm="3">
				<h4>Configurations</h4>
				<Card className="scroll">
				<li className="list-group-item" onClick={this._setSelectedConfigObject.bind(this, 'Simulator')}>Template Simulators</li>
				<li className="list-group-item" onClick={this._setSelectedConfigObject.bind(this, 'Stations')}>Station Sets</li>
				<li className="list-group-item" onClick={this._setSelectedConfigObject.bind(this, 'Missions')}>Missions</li>
				</Card>
				</Col>
			}
			</Row>
			</Container>
			);
	}
}

export default ConfigView;

/*
	_setSelectedSimulator(sim) {
		this.setState({selectedSimulator:sim});
	}
	_createSimulator(){
		let name = prompt('What is the simulator\'s name?');
		if (name){
			let obj = {
				name: name,
				layout: 'LayoutDefault',
				alertLevel: 5,
				template: true
			};

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
			*/