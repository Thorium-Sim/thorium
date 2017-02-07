import React, { Component } from 'react';
import { Col, Row, Card, Button, ButtonGroup } from 'reactstrap';
import systemsList from '../systems';
import uuid from 'uuid';

const systemsKeys = Object.keys(systemsList);
class SystemsConfig extends Component {
	constructor(params){
		super(params);
		this.state = {
			selectedSystemConfig: {},
			selectedSystemComponent: {},
		};
	}
	componentDidMount() {
	}
	_setSelectedSystemConfig(system){
		const systemsList2 = systemsList;
		const systemComp = systemsList2[system.component];
		this.setState({
			selectedSystemConfig: system,
			selectedSystemComponent: systemComp
		});
	}
	_addSystem(e){
		const systemName = e.target.value;
		const systemsList2 = systemsList;
		const system = new systemsList2(systemName);
		let defaultObject = system.defaultObject();
		let name  = prompt('What is the station set name? eg. 12-Standard, 8-School, etc.');
		if (name){
			defaultObject.id = uuid.v4();
			defaultObject.simulatorId = this.props.selectedSimulator.id;
			defaultObject.name = name;
			this.setState({
				selectedSystemConfig: defaultObject,
				selectedSystemComponent: systemsList2[systemName]
			});
			this.props.operationChannel.push("insert",{table:"systems",data:defaultObject});
		}
	}
	_showImportModal(){

	}
	_removeSystem(){
		let system = this.state.selectedSystemConfig;
		if (confirm("Are you sure you want to delete that station set?")){
			//TODO: Delete all of the objects associated with the simulator;
			let obj = {
				id: system.id,
			};
			this.props.operationChannel.push("delete",{table:"systems",filter:obj});
		}
	}
	_updateSystem(system,prop,params){
		system[prop] = params;
		let obj = {
			id: system.id,
		};
		this.props.operationChannel.push("update",{table:"systems",filter:obj,data:system});
	}
	render(){
		const SelectedSystemComponent = this.state.selectedSystemComponent;
		return (
			<Row>
			<Col sm="3">
			<h5>System Configs</h5>
			<Card className="scroll">
			{this.props.data.systems.map((e) => {
				return <li key={e.id} onClick={this._setSelectedSystemConfig.bind(this,e)} className={`${(e.id === this.state.selectedSystemConfig.id) ? 'selected' : ''} list-group-item`}>{e.name}</li>;
			})}
			</Card>
			<select onChange={this._addSystem.bind(this)} className="form-control c-select">
			<option>Add Card</option>
			{systemsKeys.map((e) => {
				return <option key={e}>{e}</option>;
			})}
			</select>
			<ButtonGroup>
			<Button onClick={this._showImportModal.bind(this)} size="sm" color="warning">Import</Button>
			<Button onClick={this._removeSystem.bind(this)} size="sm" color="danger">Remove</Button>
			</ButtonGroup>
			</Col>
			<Col sm="9">
			{this.state.selectedSystemConfig.id ?
				<SelectedSystemComponent {...this.state.selectedSystemConfig} updateSystem={this._updateSystem.bind(this,this.state.selectedSystemConfig)} />
				: <div />
			}
			</Col>
			</Row>
			);
	}
}

function select(state){
	return {
		data: state
	};
}
const SystemsContainer = SystemsConfig;

export default SystemsContainer;