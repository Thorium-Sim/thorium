import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import actions from '../../../actions';
const {systems} = actions;
const {fetchSystems} = systems;
import './style.scss';

class NavigationContent extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSystems({name:'Navigation'}));
	}
	render(){
		return (
			<div className="cardNavigation">
			<Row>
			<Col className="col-sm-5">
			<div className="keypad">
			<div class="keypad">7</div>
			<div class="keypad">8</div>
			<div class="keypad">9</div>
			<div class="keypad">4</div>
			<div class="keypad">5</div>
			<div class="keypad">6</div>
			<div class="keypad">1</div>
			<div class="keypad">2</div>
			<div class="keypad">3</div>
			<div class="keypad">.</div>
			<div class="keypad">0</div>
			<div class="keypad clearButton">C</div>
			<div class=" btn-block enter">Enter</div>¨
			</div>
			</Col>
			<Col className="col-sm-2">

			</Col>
			<Col className="5">

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
