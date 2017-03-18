import React, { Component } from 'react';
import LayoutList from '../../layouts';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

const Layouts = Object.keys(LayoutList);

const ops = {
	name:gql`mutation ChangeName($id: ID!, $value: String!){
		renameSimulator(simulatorId: $id, name:$value)
	}`,
	layout:gql`mutation ChangeLayout($id: ID!, $value: String!){
		changeSimulatorLayout(simulatorId: $id, layout:$value)
	}`,
	alertLevel:gql`mutation ChangeAlert($id: ID!, $value: String!){
		changeSimulatorAlertLevel(simulatorId: $id, alertLevel:$value)
	}`,
}
class SimulatorConfigView extends Component {
	_handleChange(e){
		const variables = {
			id: this.props.selectedSimulator.id,
			value: e.target.value
		};
		const mutation = ops[e.target.name]
		this.props.client.mutate({
			mutation,
			variables
		})
	}
	render(){
		return(
			<div>
			<small>These values represent the properties of the simulator itself.</small>
			<form>
			<fieldset className="form-group">
			<label>Name</label>
			<input onChange={this._handleChange.bind(this)} defaultValue={this.props.selectedSimulator.name} type="text" name="name" className="form-control" placeholder="USS Voyager" />
			</fieldset>
			<fieldset className="form-group">
			<label>Layout</label>
			<select onChange={this._handleChange.bind(this)} defaultValue={this.props.selectedSimulator.layout} name="layout" className="c-select form-control">
			{Layouts.map((e) => {
				return <option key={e} value={e}>{e}</option>;
			})}
			</select>
			</fieldset>
			<fieldset className="form-group">
			<label>Alert Level</label>
			<select onChange={this._handleChange.bind(this)} defaultValue={this.props.selectedSimulator.alertlevel} name="alertLevel" className="c-select form-control">
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
			);
	}
}

export default  withApollo(SimulatorConfigView)
