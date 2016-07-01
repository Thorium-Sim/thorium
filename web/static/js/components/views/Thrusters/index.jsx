import React, {Component} from 'react';
import actions from '../../../actions';
import { connect } from 'react-redux';

const {systems} = actions;
const {fetchSystems} = systems;

class Thrusters extends Component {
	constructor(props){
		super(props);
		this.state = {
			gamepad: null,
			lastTimeMsec: null,
			request: null,
		};
	}
	componentWillUnmount() {
		cancelAnimationFrame(this.state.request);
	}
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(fetchSystems({simulatorId:this.props.params.simulatorId,name:"Thrusters"}));
		this.setState({
			request: requestAnimationFrame(this.tick.bind(this))
		});
	}
	tick() {
		this.gamepadLoop();
		this.setState({
			lastTimeMsec: Date.now(),
			request: requestAnimationFrame(this.tick.bind(this))
		});
	}
	gamepadLoop(){
		const gamepad = navigator.getGamepads()[0];
		if (gamepad){
			//Create a custom object to store.
			let direction = {x:0,y:0,z:0};
			switch(Math.round(gamepad.axes[9] * 100) / 100) {
				case -1:
				direction.y = 1;
				break;
				case -0.71:
				direction.y = 1;
				direction.x = 1;
				break;
				case -0.43:
				direction.x = 1;
				break;
				case -0.14:
				direction.y = -1;
				direction.x = 1;
				break;
				case 0.14:
				direction.y = -1;
				break;
				case 0.43:
				direction.y = -1;
				direction.x = -1;
				break;
				case 0.71:
				direction.x = -1;
				break;
				case 1:
				direction.x = -1;
				direction.y = 1;
				default:
				break;
			}
			direction.z = Math.round((gamepad.axes[2] - 1) / 2 * -10) / 10;
			const obj = {
				attitudeAdjust:{
					roll:Math.round(gamepad.axes[0] * 100) / 100,
					pitch: Math.round(gamepad.axes[1] * 100) / 100,
					yaw: 0,
				},
				direction: direction,
			};
			const gamepadObj = this.state.gamepad;
			if (JSON.stringify(gamepadObj) !== JSON.stringify(obj)){
				this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:'Thrusters'},data:obj});
				this.setState({
					gamepad:obj
				});
			}
		}
	}
	render(){
		const thrusters = this.props.data.thrusters;

		return (
			<div>
			{(thrusters.id) ?
				<div>
				<div>Roll: {thrusters.attitudeAdjust.roll}</div>
				<div>Pitch: {thrusters.attitudeAdjust.pitch}</div>
				<div>Z: {thrusters.direction.z}</div>
				<div>X: {thrusters.direction.x}</div>
				<div>Y: {thrusters.direction.y}</div>
				<div>Trigger: </div>
				<div>Caution: </div>
				<div>Index: </div>
				<div>Right: </div>
				</div>
				: <div></div>
			}
				</div>
				);
	}
}

function select(state){
	let thrusters = state.systems.reduce((prev, next) => {
		if (prev.name === "Thrusters"){
			return prev;
		}
		if (next.name === "Thrusters"){
			return next;
		}
	},{});
	return {
		data: {
			thrusters: thrusters
		}
	};
}
const ThrustersData = connect(select)(Thrusters);

export default ThrustersData;
