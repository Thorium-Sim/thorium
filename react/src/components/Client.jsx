import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Container } from 'reactstrap';
import CardContainer from '../containers/Card.jsx';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import './client.scss';

const clientId = localStorage.getItem('thorium_clientId');
const Credits = (props) => {
	let client = {};
	let flight = {};
	let simulator = {};
	let station = {};
	if (!props.data.loading) {
		client = props.data.clients.length > 0 ? props.data.clients[0] : {};
		simulator = client.simulator || {};
		flight = client.flight || {};
		station = client.station || {};
	}
	return (
		<div className="credit-bg">
		<Container>
		<img role="presentation" src="/js/images/logo.png" draggable="false" />
		<h1>Thorium</h1>
		<h4>{client.id}</h4>
		<h5>{flight.id}</h5>
		<h5>{simulator.name}</h5>
		<h5>{station.name}</h5>
		<h5>{client.loginName}</h5>
		</Container>
		</div>
		);
};

const CLIENT_SUB = gql`
subscription ClientChanged($client: ID!) {
	clientChanged(client: $client) {
		id
		flight {
			id
			name
			date
		}
		simulator {
			id
			name
			alertlevel
			layout
		}
		station {
			name
			cards{
				name
				component
				icon
			}
		}
		loginName
		loginState
	}
}`;

const PING_SUB = gql`
subscription ClientPing($client: ID!){
	clientPing(client: $client)
}`;

class ClientView extends Component {
	constructor(props){
		super(props);
		this.clientSubscription = null;
		this.clientPingSubscription = null;
		window.onbeforeunload = () => {
			props.client.mutate({
				mutation: gql`
				mutation RemoveClient($id: ID!){
					clientDisconnect(client: $id)
				}`,
				variables: {id: clientId}
			})
			return null;
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!this.clientSubscription && !nextProps.data.loading) {
			this.clientSubscription = nextProps.data.subscribeToMore({
				document: CLIENT_SUB,
				variables: {client: clientId}
			});
		}
		if (!this.clientPingSubscription && !nextProps.data.loading) {
			this.clientPingSubscription = nextProps.data.subscribeToMore({
				document: PING_SUB,
				variables: {client: clientId},
				updateQuery: (previousResult, {subscriptionData}) => {
					//Respond with the ping that was recieved
					this.props.client.mutate({
						mutation: gql`mutation pingRes($client: ID!, $ping: String!){
							clientPing(client: $client, ping: $ping)
						}`,
						variables: {
							client: clientId,
							ping: subscriptionData.data.clientPing
						}
					})
					return previousResult;
				},
			});
		}
	}
	componentDidMount(){
		this.props.client.mutate({
			mutation: gql`mutation RegisterClient ($client: ID!){
				clientConnect(client: $client)
			}`,
			variables: {client: clientId}
		})
	}
	render(){
		let flight, simulator, station, client = {};
		if (!this.props.data.loading) {
			 client = this.props.data.clients[0];
			flight = client.flight;
			simulator = client.simulator;
			station = client.station;
		}
		return (<div>
		{ (flight && simulator && station) ?
			<CardContainer flight={flight} simulator={simulator} station={station} client={client} />
			: <Credits  {...this.props} />
		}
		</div>);
	}
}

const ClientQuery = gql `
query Clients($clientId: ID) {
	clients(clientId: $clientId) {
		id
		flight {
			id
			name
			date
		}
		simulator {
			id
			name
			alertlevel
			layout
		}
		station {
			name
			cards{
				name
				component
				icon
			}
		}
		loginName
		loginState
	}
}`;


export default withRouter(graphql(ClientQuery, {
	options: {
		variables: {
			clientId: clientId
		}
	}
})(withApollo(ClientView)));
