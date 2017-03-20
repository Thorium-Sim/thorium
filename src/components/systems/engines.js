import React, {Component} from 'react';
import { Card, CardBlock, Button } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

class Engines extends Component {

	defaultObject(){
		return {
			component: 'Engines',
			name:'Engines',
			type:'Engine',
			heat:0,
			coolant:100,
			heatRate:1,
			speed:0,
			speeds:[]
		};
	}
	_handleChange(e){
		this.props.updateSystem(e.target.name, e.target.value);
	}
	_addSpeed(e){
		e.preventDefault();
		let speeds = this.props.system.speeds ? this.props.system.speeds.slice(0) : [];
		speeds.push({
			number:null,
			text: null,
		});
		this.props.updateSystem('speeds',speeds);
	}
	_removeSpeed(index){
		let speeds = this.props.system.speeds.slice(0);
		speeds.slice(index,1);
		this.props.updateSystem('speeds',speeds);
	}
	_handleSpeedsChange(index,e){
		let speeds = this.props.system.speeds.slice(0);
		speeds[index][e.target.name] = e.target.value;
		this.props.updateSystem('speeds',speeds);
	}
	render(){
		const system = this.props.system || {}
		const speeds = system.speeds || [];
		return (
			<div>
			<form style={{maxHeight: '80vh', overflow: 'scroll'}}>
			<fieldset className="form-group">
			<label>Name</label>
			<input onChange={this._handleChange.bind(this)} defaultValue={system.name} type="text" name="name" className="form-control" placeholder="Warp" />
			</fieldset>
			<fieldset className="form-group">
			<label>Type</label>
			<input readOnly value="Engine" type="text" name="type" className="form-control" />
			</fieldset>
			<fieldset className="form-group">
			<label>Heat</label>
			<input type="number" onChange={this._handleChange.bind(this)} defaultValue={system.heat} name="heat" className="form-control" placeholder="0" />
			</fieldset>
			<fieldset className="form-group">
			<label>Coolant</label>
			<input type="number" onChange={this._handleChange.bind(this)} defaultValue={system.coolant} name="coolant" className="form-control" placeholder="0" />
			</fieldset>
			<fieldset className="form-group">
			<label>Heatrate</label>
			<input type="number" onChange={this._handleChange.bind(this)} defaultValue={system.heatRate} name="heatRate" className="form-control" placeholder="1" />
			</fieldset>
			<fieldset className="form-group">
			<label>Speed</label>
			<input type="number" onChange={this._handleChange.bind(this)} defaultValue={system.speed} name="speed" className="form-control" placeholder="0" />
			</fieldset>
			<fieldset className="form-group">
			<label>Speeds</label>
			<Card>
			{speeds.map((e, index) => {
				return (
					<CardBlock key={index}>
					<fieldset className="form-group">
					<label>Number <FontAwesome name="ban" className="text-danger" onClick={this._removeSpeed.bind(this,index)} /></label>
					<input type="number" onChange={this._handleSpeedsChange.bind(this,index)} defaultValue={e.number} name="number" className="form-control" placeholder="1" />
					</fieldset>
					<fieldset className="form-group">
					<label>Name</label>
					<input type="text" onChange={this._handleSpeedsChange.bind(this,index)} defaultValue={e.text} name="text" className="form-control" placeholder="Warp 1" />
					</fieldset>
					</CardBlock>
					);
			})}
			</Card>
			<Button size="sm" color="success" onClick={this._addSpeed.bind(this)}>Add Speed</Button>
			</fieldset>
			</form>
			</div>
			);
	}
}

export default Engines;
