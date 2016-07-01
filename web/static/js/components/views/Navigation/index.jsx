import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';

class NavigationContent extends Component {
	render(){
		return (

			<div>

			</div>)
	}
}

function select(state,props){
	let navigtion = state.systems.filter((system) => {
		return system.name === 'Navigation';
	});
	return {
		data: {
			navigation: navigation,
		}
	};
}
const EngineControl = connect(select)(EngineControlContent);

export default EngineControl;
