import React, { Component } from 'react';
import LayoutList from '../layouts';
import gql from 'graphql-tag';
import { connect } from 'react-apollo';

const Layouts = Object.keys(LayoutList);

class SimulatorConfig extends Component {
	_handleChange(e){
		let obj = this.props.selectedSimulator;
		obj[e.target.name] = e.target.value;
		this.props.mutations.updateSimulator(obj);
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
			<select onChange={this._handleChange.bind(this)} defaultValue={this.props.selectedSimulator.alertLevel} name="alertLevel" className="c-select form-control">
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

function mapMutationsToProps({ ownProps, state }) {
	return {
		updateSimulator: (args) => ({
			mutation: gql`
			mutation updateSimulator($id: String!, $name: String, $alertLevel: String, $layout: String) {
				simulator_update(id: $id, name: $name, layout: $layout, alertLevel: $alertLevel){
					id
					name,
					alertLevel,
					layout
				}
			}
			`,
			variables: args,
			updateQueries: {
				simulators: (previousQueryResult, { mutationResult, queryVariables }) => {
					debugger;
				}
			},
			optimisticResponse: ownProps.selectedSimulator
		}),
	};
}
const SimulatorData = connect({
	mapMutationsToProps
})(SimulatorConfig);

export default SimulatorData;
