import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';
import actions from '../actions';
import './client.scss';
const {presence} = actions;
const {fetchPresence} = presence;

const Credits = () => {
	return (
		<div className="credit-bg">
		<Container>
		<img src="/js/images/logo.png" draggable="false" />
		<h1>Thorium</h1>
		</Container>
		</div>
		);
};

class Client extends Component {
	componentDidMount(){
		let {dispatch} = this.props;
		dispatch(fetchPresence());
	}
	componentWillUpdate(props){
		if (props.data){
			if (props.data.flight && props.data.simulator && props.data.station){
				location = (`/app/simulator/${props.data.simulator}/station/${props.data.station}/card/0`);
			}
		}
	}
	render(){
		console.log(this.props.data);
		return <Credits />;
	}
}
/*
function select(state){
	const clientId = localStorage.getItem('thorium_clientId');
	return {
		data: state.clients[clientId]
	};
}
const ClientData = connect(select)(Client);
*/
export default Credits;
