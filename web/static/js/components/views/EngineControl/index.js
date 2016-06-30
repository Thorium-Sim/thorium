import React, {Component} from 'react';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import actions from '../../../actions';
const {systems} = actions;
const {fetchSystems} = systems;
import { connect } from 'react-redux';

import './style.scss';

class EngineControlContent extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSystems({type:"Engine"}));
	}
	speedBarStyle(array,speed){
		let width = speed / array.length * 100;
		return ({
			width: `calc(${width}% - ${40/array.length * speed}px)`
		})
	}
	setSpeed(engine,speed,engines,index){
		let obj = {speed:speed + 1};
		this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:engine.name},data:obj});
		if (index >= 1){
			//More than one engine, update the previous;
			for (let i = 0; i < index; i++){
				let newObj = {speed: engines[i].speeds.length};
				let newEngine = engines[i];
				this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:newEngine.name},data:newObj});
			}
		}
		if (index < engines.length - 1){
			debugger;
			//More than one engine, update the next ones to be zero
			for (let i = index + 1; i <= engines.length - 1; i++){
				let newObj = {speed: -1};
				let newEngine = engines[i];
				this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:newEngine.name},data:newObj});
			}
		}
	}
	render(){
		const engines = this.props.data.engines;
		return (
			<div className="EngineControl">
			<Row>
			<Col className="col-sm-12 enginesBar">
			{(() => {
				//if (engines.length === 1){
					return engines.map((engine, index, array) => {
						return (
							<div className="engineGroup">
							<h4>{engine.name}</h4>
							<ul className="engine">
							{ engine.speeds.map((speed, speedIndex) => {
								return (
									<li className="speedNums speedBtn" onClick={() => {this.setSpeed(engine,speedIndex,engines,index)}}>{speed}</li>
									);
							})}
							</ul>
							<div className="speedBar" style={this.speedBarStyle(engine.speeds,engine.speed)}></div>
							</div>
							);
					});
				//}
				//if (engines.length > 1){

				//}
			})()}
			</Col>
			</Row>
			</div>
			);
	}
}

function select(state,props){
	let engines = state.systems.filter((system) => {
		return system.type === 'Engine';
	});
	return {
		data: {
			engines: engines,
		}
	};
}
const EngineControl = connect(select)(EngineControlContent);

export default EngineControl;
