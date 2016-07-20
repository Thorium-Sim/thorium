import React, { Component } from 'react';
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
	render(){
		console.log(this.props.data);
		return <Credits />;
	}
}

function select(state){
	return {
		data: state.flights
	};
}
const ClientData = connect(select)(Client);

export default ClientData;
