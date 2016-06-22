import React, { Component } from 'react';
import { connect } from 'react-apollo';
import { Button, LoadingWidget, Row, Col, Container } from './generic';
import { Link } from 'react-router';

class StationLink extends Component {
	render(){
		let station = this.props.station || {};
		return (
			<Button
			type="primary"
			label={station.name}
			href={`/simulator/${station.simulatorId}/station/${station.id}/card/0`}
			/>
			);
	}
}

class Stations extends Component {
	render() {
		let stations = this.props.data.stations || [];
		let loading = this.props.data.loading;
		return (
			<Container>
			<Row>
			<Col className="col-sm-12">
			<h1>Station Picker</h1>
			<Link to="/">&laquo; Go Back</Link>
			<h2>Select Station</h2>
			<div className="btn-group">			
			{(loading) ? <LoadingWidget /> :
				stations.map((station)=>{
					return <StationLink key={station.id} station={station} />;
				})
			}
			</div>
			</Col>
			</Row>
			</Container>
			);
	}
}

export const StationData = connect({
	mapQueriesToProps: (arg) => ({
		data: {
			query: gql`
			query Stations {
				stations (simulatorId: "${arg.ownProps.params.simulatorId}"){
					id
					name
					simulatorId
				}
			}
			`,
		},
	}),
})(Stations);


