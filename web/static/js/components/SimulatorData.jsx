import React, { Component } from 'react';
import { connect } from 'react-apollo';
import { Button, LoadingWidget, Row, Col, Container } from './generic';

class SimulatorLink extends Component {
	render(){
		let simulator = this.props.simulator || {};
		return (
			<Button
			type="primary"
			label={simulator.name}
			href={`/simulator/${simulator.id}`}
			/>
			);
	}
}

class Simulators extends Component {
	render() {
		let simulators = this.props.data.simulators || [];
		let loading = this.props.data.loading;
		return (
			<Container>
			<Row>
			<Col className="col-sm-12">
			<h1>Station Picker</h1>
			<h2>Select Simulator</h2>
			<div className="btn-group">
			{(loading) ? <LoadingWidget /> :
				simulators.map((simulator)=>{
					return <SimulatorLink key={simulator.id} simulator={simulator} />;
				})
			}
			</div>
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<a className="btn btn-info btn-sm" href="/graphql">GraphQL Console</a>
			</Col>
			</Row>
			</Container>
			);
	}
}
const SimulatorData = connect({
	mapQueriesToProps: () => ({
		data: {
			query: gql`
			query Simulators {
				simulators {
					id
					name
				}
			}
			`,
		},
	}),
})(Simulators);

export default SimulatorData;
