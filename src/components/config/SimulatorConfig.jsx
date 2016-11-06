import React, { Component } from 'react';
import { Col, Row, Card, Button, ButtonGroup } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import LayoutList from '../layouts';

const Layouts = Object.keys(LayoutList);

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
					Simulators:(previousQueryResults, {mutationResult}) => {
						previousQueryResults.simulators.push(mutationResult.data.addsimulator);
						return previousQueryResults;
					}
				}
			});
		}
	}
	_removeSimulator(){
		let station = this.state.selectedSimulator;
		if (station){
			if (confirm("Are you sure you want to delete that simulator?")){
				let obj = {
					id: station,
				};
				this.props.client.mutate({
					mutation: gql`
					mutation RemoveSimulator($id: String!) {
						removesimulator(id: $id) {
							id
						}
					}
					`,
					variables: obj,
					updateQueries: {
						Simulators:(previousQueryResults, {mutationResult}) => {
							previousQueryResults.simulators = previousQueryResults.simulators.filter((stationIt) => {
								return stationIt.id !== mutationResult.data.removesimulator.id;
							});
							return previousQueryResults;
						}
					}
				});
			}
		}
	}
	_showImportModal(){

	}
	_handleChange(e){
		let mutation;
		let obj = {
			id: this.state.selectedSimulator
		};
		switch (e.target.name){
			case 'name':
			mutation = gql`
			mutation UpdateName($id: String!, $name: String!) {
				simupdatename(id: $id, name: $name) {
					id
					name
				}
			}
			`;
			obj.name = e.target.value;
			break;
			case 'layout':
			mutation = gql`
			mutation UpdateLayout($id: String!, $layout: String!) {
				simupdatelayout(id: $id, layout: $layout) {
					id
					layout
				}
			}
			`;
			obj.layout = e.target.value;
			break;
			case 'alertLevel':
			mutation = gql`
			mutation UpdateAlertLevel($id: String!, $alertlevel: String!) {
				simupdatealertlevel(id: $id, alertlevel: $alertlevel) {
					id
					alertlevel
				}
			}
			`;
			obj.alertlevel = e.target.value;
			break;
			default:
			break;
		}
		this.props.client.mutate({
			mutation: mutation,
			variables: obj,
			updateQueries: {
				Simulators:(previousQueryResults, {mutationResult}) => {
					let returnData = Object.assign({}, previousQueryResults);
					Object.keys(mutationResult.data).forEach((mut) => {
						const data = mutationResult.data[mut];
						returnData.simulators = returnData.simulators.map((simulator) => {
							if (simulator.id === data.id){
								Object.keys(data).forEach((key) => {
									simulator[key] = data[key];
								});
							}
							return simulator;
						});
					});
					return returnData;
				}
			}
		});
	}
	render(){
		let selectedSimulator;
		if (this.state.selectedSimulator){
			selectedSimulator = this.props.data.simulators.reduce((prev, next) => {
				if (next.id === this.state.selectedSimulator){
					return next;
				}
				return prev;
			},{});
		}
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
			{
				this.state.selectedSimulator && <div>
				<small>These values represent the properties of the simulator itself.</small>
				<form>
				<fieldset className="form-group">
				<label>Name</label>
				<input onChange={this._handleChange.bind(this)} defaultValue={selectedSimulator.name} type="text" name="name" className="form-control" placeholder="USS Voyager" />
				</fieldset>
				<fieldset className="form-group">
				<label>Layout</label>
				<select onChange={this._handleChange.bind(this)} defaultValue={selectedSimulator.layout} name="layout" className="c-select form-control">
				{Layouts.map((e) => {
					return <option key={e} value={e}>{e}</option>;
				})}
				</select>
				</fieldset>
				<fieldset className="form-group">
				<label>Alert Level</label>
				<select onChange={this._handleChange.bind(this)} defaultValue={selectedSimulator.alertlevel} name="alertLevel" className="c-select form-control">
				<option value="5">5</option>
				<option value="4">4</option>
				<option value="3">3</option>
				<option value="2">2</option>
				<option value="2">1</option>
				<option value="p">P</option>
				</select>
				</fieldset>
				</form>
				</div>
			}
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
		alertlevel
		layout
		template
	}
}
`;

export default graphql(SimulatorConfigData, {})(withApollo(SimulatorConfig));
