import React, { Component } from 'react';
import { Col, Row, Card, Button, ButtonGroup, FormGroup, Label, Input } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import TimelineConfig from './MissionsConfig/TimelineConfig';

const SIMULATOR_SUB = gql`
subscription SimulatorSub {
	simulatorsUpdate(template: true) {
		id
		name
		template
		timeline {
			id
			name
			description
			order
			timelineItems {
				id
				name
				type
				event
				args
				delay
			}
		}
	}
}`;

class SimulatorConfig extends Component {
	constructor(params){
		super(params);
		this.state = {
			selectedSimulator: null
		};
		this.simulatorSubscription = null;

	}
	componentWillReceiveProps(nextProps) {
		if (!this.simulatorSubscription && !nextProps.data.loading) {
			this.simulatorSubscription = nextProps.data.subscribeToMore({
				document: SIMULATOR_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					previousResult.simulators = subscriptionData.data.simulatorsUpdate
					return previousResult;
				},
			});
		}
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
				template: true,
			};
			this.props.client.mutate({
				mutation: gql`
				mutation AddSimulator($name: String!, $template: Boolean) {
					createSimulator(name: $name, template:$template)
				}`,
				variables: obj
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
					mutation: gql`mutation RemoveSimulator($id: String!) {
						removesimulator(simulatorId: $id)
					}`,
					variables: obj
				});
			}
		}
	}
	_showImportModal(){

	}
	_updateSimulator(type, e) {

	}
	render(){
		return (
			<Row>
			{ !this.state.selectedSimulator ?
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
				:
				<Col sm="12">
				<a href="#" onClick={() => {this.setState({selectedSimulator: null})}}>Go Back To Simulator list</a>
				{
					(() => {
						if (this.state.selectedSimulator){
							const sim = this.props.data.simulators.find(s => s.id === this.state.selectedSimulator);
							return (<div>
								<FormGroup>
								<Label>Simulator Name</Label>
								<Input type="text" value={ sim.name } onChange={ this._updateSimulator.bind(this, 'name') } />
								</FormGroup>
								<TimelineConfig
								type="simulator"
								object={sim}
								client={this.props.client}
								/>
								</div>);
						}
					})()
				}
				</Col>
			}
			</Row>
			);
	}
}
const SimulatorConfigData = gql `
query Simulators{
	simulators(template: true){
		id
		name
		template
		timeline {
			id
			name
			description
			order
			timelineItems {
				id
				name
				type
				event
				args
				delay
			}
		}
	}
}
`;

export default graphql(SimulatorConfigData, {})(withApollo(SimulatorConfig));
