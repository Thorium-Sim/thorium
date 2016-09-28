import React, { Component } from 'react';
import { Col, Row, Container, Card, CardBlock, Button, ButtonGroup } from 'reactstrap';
import uuid from '../../helpers/guid';
import viewList from '../views/list.js';
import FontAwesome from 'react-fontawesome';
import gql from 'graphql-tag';
import update from 'react-addons-update';
import { graphql, withApollo } from 'react-apollo';

class SimulatorConfig extends Component {
	constructor(params){
		super(params);
		this.state = {
			selectedSimulator: null
		};
	}
	_setSelectedSimulator(e){
		this.setState({
			selectedSimulator: e.id
		});
	}
	_createSimulator(){
		let name  = prompt('What is the simulator name? eg. Voyager');
		if (name){
			let obj = {
				name: name,
				alertlevel: 5,
				layout: 'LayoutDefault',
				template: true,
				timeline: []
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddSimulator($name: String!, $alertlevel: String, $layout: String, $template: Boolean, $timeline: [Timelinestepinput]) {
					addsimulator(name: $name, alertlevel: $alertlevel, layout: $layout, template:$template, timeline:$timeline){
						id
						name
						alertlevel
						layout
						template
						timeline {
							description
							name
							order
						}
					}
				}
				`,
				variables: obj,
				updateQueries: {
					StationSets:(previousQueryResults, {mutationResult, queryVariables}) => {
						previousQueryResults.simulators.push(mutationResult.data.addsimulator);
						return previousQueryResults;
					}
				}
			});
		}
	}
	_removeSimulator(){

	}
	_showImportModal(){

	}
	render(){
		return (
			<Row>
			<Col sm="3">
			<h5>Simulator Configs</h5>
			<Card className="scroll">
			{this.props.data.loading ? <li>Loading... </li> : this.props.data.simulators.map((e) => {
				return <li key={e.id} onClick={this._setSelectedSimulator.bind(this,e)} className={`${(e.id === this.state.selectedSimulator) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
			})}
			</Card>
			<ButtonGroup>
			<Button onClick={this._createSimulator.bind(this)} size="sm" color="success">Add</Button>
			<Button onClick={this._showImportModal.bind(this)} size="sm" color="warning">Import</Button>
			<Button onClick={this._removeSimulator.bind(this)} size="sm" color="danger">Remove</Button>
			</ButtonGroup>
			</Col>
			<Col sm="9">
			
			</Col>
			</Row>
			);
	}
}
const SimulatorConfigData = gql `
query Simulators{
	simulators(template: true){
		id
		name
		alertLevel
		layout
		template
	}
}
`;

export default graphql(SimulatorConfigData, {})(withApollo(SimulatorConfig));
