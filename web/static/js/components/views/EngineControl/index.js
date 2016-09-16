import React, {Component} from 'react';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import './style.scss';

const HeatBar = (props) => {
	return (<div>
		<label className="heatBox-Label">{props.label}</label>
		<div className="heatBox">
		<div className="heatBar" style={{height:`${props.level}%`,backgroundImage:props.background}}></div>
		</div>
		</div>);
};

class EngineControlContent extends Component {
	componentDidMount() {
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
				return engines.map((engine, index, array) => {
					return (
						<div className="engineGroup">
						<h4>{engine.name}</h4>
						<ul className="engine">
						{ engine.speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.number;
							}
							return (
								<li className="speedNums speedBtn" onClick={() => {this.setSpeed(engine,speedIndex,engines,index);}}>{speedWord}</li>
								);
						})}
						</ul>
						<div className="speedBar" style={this.speedBarStyle(engine.speeds,engine.speed)}></div>
						</div>
						);
				});
			})()}
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			{(() => {
				if (engines.length === 1){
					return (
						<div>
						<Col className="col-sm-4">
						{engines[0].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <button class="btn btn-primary speedBtn">{speedWord}</button>;
						})}
						</Col>
						<Col className="col-sm-2">
						<Col className="col-sm-6">
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[0].heat}/>
						</Col>
						<Col className="col-sm-6">
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[0].coolant}/>
						</Col>
						</Col>
						<Col className="col-sm-6">

						</Col>
						</div>
						);
				}
				if (engines.length === 2){
					return (
						<div>
						<Col className="col-sm-2">
						{engines[0].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button type="primary" className="btn-block speedBtn" onClick={() => {this.setSpeed(engines[0],speedIndex,engines,0);}} label={speedWord} />;
						})}
						</Col>
						<Col className="col-sm-2">
						<Col className="col-sm-6">
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[0].heat}/>
						</Col>
						<Col className="col-sm-6">
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[0].coolant}/>
						</Col>
						</Col>
						<Col className="col-sm-4">

						</Col>
						<Col className="col-sm-2">
						<Col className="col-sm-6">
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[1].heat}/>
						</Col>
						<Col className="col-sm-6">
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[1].coolant}/>
						</Col>
						</Col>
						<Col className="col-sm-2">
						{engines[1].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button type="primary" className="btn-block speedBtn" onClick={() => {this.setSpeed(engines[1],speedIndex,engines,1);}} label={speedWord} />;
						})}
						</Col>
						</div>
						);
				}
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
const EngineControl = EngineControlContent;

export default EngineControl;
