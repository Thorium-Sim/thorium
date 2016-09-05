import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import actions from '../../../actions';
const {systems} = actions;
const {fetchSystems} = systems;
import './style.scss';

class NavigationContent extends Component {
	constructor(props){
		super(props);
		this.state = {
			lineX:50,
			lineY:50,
			backX:0,
			backY:0,
		};
	}
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSystems({name:'Navigation'}));
		setInterval(() => {
			this.setState({
				lineX:Math.random() * 100,
				lineY:Math.random() * 100,
				backX:(Math.random() - 0.5) * 1000,
				backY:(Math.random() - 0.5) * 1000,
			});
		},5000);
	}
	render(){
		return (
			<div className="cardNavigation">
			<Row>
			<Col className="col-sm-3">
			<div className="keypadButtons card">
			<div className="keypad alertBack">7</div>
			<div className="keypad alertBack">8</div>
			<div className="keypad alertBack">9</div>
			<div className="keypad alertBack">4</div>
			<div className="keypad alertBack">5</div>
			<div className="keypad alertBack">6</div>
			<div className="keypad alertBack">1</div>
			<div className="keypad alertBack">2</div>
			<div className="keypad alertBack">3</div>
			<div className="keypad alertBack">.</div>
			<div className="keypad alertBack">0</div>
			<div className="keypad alertBack clearButton">C</div>
			<div className=" btn-block alertBack enter">Enter</div>
			</div>
			</Col>
			<Col className="col-sm-3">
			<div className="currentCourse card">
			<label>Current Course</label>
			<Row>
			<Col className="col-sm-3">
			X:
			</Col>
			<Col className="col-sm-8 numBox">

			</Col>
			</Row>
			<Row>
			<Col className="col-sm-3">
			Y:
			</Col>
			<Col className="col-sm-8 numBox">

			</Col>
			</Row>
			<Row>
			<Col className="col-sm-3">
			Z:
			</Col>
			<Col className="col-sm-8 numBox">

			</Col>
			</Row>
			</div>
			</Col>
			<Col className="col-sm-6">
			<div className="starsBox" style={{backgroundPosition:`${this.state.backX}px ${this.state.backY}px`}}>
			<div className="barVert" style={{left:`${this.state.lineX}%`}}></div>
			<div className="barHoriz" style={{top:`${this.state.lineY}%`}}>></div>
			<div className="crosshair" style={{left:`calc(${this.state.lineX}% - 18px)`,top:`calc(${this.state.lineY}% - 18px)`}}>>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			</div>
			</div>
			</Col>
			</Row>
			</div>);
	}
}

function select(state,props){
	const systems = state.systems || [];
	let navigation = systems.filter((system) => {
		return system.name === 'Navigation';
	});
	return {
		data: {
			navigation: navigation,
		}
	};
}
const Navigation = connect(select)(NavigationContent);

export default Navigation;
