import React, { Component } from 'react';
import LayoutList from '../layouts';
const Layouts = Object.keys(LayoutList);

class SimulatorConfig extends Component {
	_handleChange(e){
		let obj = {};
		obj[e.target.name] = e.target.value;
		this.props.operationChannel.push("update",{table:"simulators",filter:{id:this.props.selectedSimulator.id}, data:obj});
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
			<select onChange={this._handleChange} defaultValue={this.props.selectedSimulator.alertLevel} name="alertLevel" className="c-select form-control">
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

export default SimulatorConfig;
