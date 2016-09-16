import React, { Component } from 'react';
import { browserHistory, withRouter } from 'react-router';
import { Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, ButtonGroup } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import './client.scss';

const Credits = (props) => {
	return (
		<div className="credit-bg">
		<Container>
		<img src="/js/images/logo.png" draggable="false" />
		<h1>Thorium</h1>
		{
			props.data.loading ? <span /> :
			<h4>{props.data.sessions.id}</h4>
		}
		</Container>
		</div>
		);
};

class ClientView extends Component {
	componentDidMount(){

	}
	componentWillUpdate(props){
		if (props.data){
			if (props.data.flight && props.data.simulator && props.data.station){
				const location = (`/app/simulator/${props.data.simulator}/station/${props.data.station}/card/0`);
			}
		}
	}
	render(){
		return <Credits  {...this.props} />;
	}
}

const ClientQuery = gql `
query Sessions($ClientId: String) {
	sessions(id: $ClientId) {
		id
	}
	flights{
		name
		id
		date
	}
}`;

export default withRouter(graphql(ClientQuery, {
	options: {
		variables: {
			ClientId: localStorage.getItem('thorium_clientId')
		}
	}
})(ClientView));
