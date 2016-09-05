import React, {Component} from 'react';
import { Col, Row, Container, Card, CardBlock, Button, ButtonGroup } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Range from 'react-range';

class Thrusters extends Component {
	constructor(props){
		super(props);
		this.state = {
			direction: props.direction,
			attitude: props.attitude,
		}
	}
	defaultObject(){
		return {
			component:"Thrusters",
			name:"Thrusters",
			type:"Thrusters",
			direction:{
				x:0,
				y:0,
				z:0,
			},
			attitudeAdjust:{
				yaw:0,
				pitch:0,
				roll:0,
			},
			attitude:{
				yaw:0,
				pitch:0,
				roll:0,
			}
		};
	}
	_handleChange(object,prop,e){
		let updateVal = this.state[object];
		updateVal[prop] = e.target.value;
		this.props.updateSystem(object,updateVal);
		let obj = {};
		obj[object] = updateVal;
		console.log(obj);
		this.setState(obj);
	}
	render(){
		const directions = Object.keys(this.state.direction);
		const attitudes = Object.keys(this.state.attitude);
		return (
			<div className="scroll">
			<form>
			<fieldset className="form-group">
			<label>Name</label>
			<input onChange={this._handleChange.bind(this)} defaultValue={this.props.name} type="text" name="name" className="form-control" placeholder="Thrusters" />
			</fieldset>
			<fieldset className="form-group">
			<label>Direction</label>
			{directions.map((e) => {
				return (<Row key={e}>
					<Col sm="2">{e}</Col>
					<Col sm="8">
					<Range
					className='slider'
					onChange={this._handleChange.bind(this,'direction',e)}
					type='range'
					value={this.state.direction[e]}
					min={-1}
					max={1}
					step={0.01} />
					</Col>
					<Col sm="2">
					<input readOnly value={this.state.direction[e]} type="text" name="name" className="form-control" placeholder="0" />
					</Col>
					</Row>);
			})}
			</fieldset>
			<fieldset className="form-group">
			<label>Attitude</label>
			{attitudes.map((e) => {
				return (<Row key={e}>
					<Col sm="2">{e}</Col>
					<Col sm="8">
					<Range
					className='slider'
					onChange={this._handleChange.bind(this,'attitude',e)}
					type='range'
					value={this.state.attitude[e]}
					min={0}
					max={359}
					step={1} />
					</Col>
					<Col sm="2">
					<input readOnly value={this.state.attitude[e]} type="text" name="name" className="form-control" placeholder="0" />
					</Col>
					</Row>);
			})}
			</fieldset>
			</form>
			</div>
			);
	}
}

export default Thrusters;

