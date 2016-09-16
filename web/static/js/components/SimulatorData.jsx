import React, { Component } from 'react';
import { Button, LoadingWidget, Row, Col, Container } from './generic';

class SimulatorLink extends Component {
	render(){
		let simulator = this.props.simulator || {};
		return (
			<Button
			type="primary"
			label={simulator.name}
			href={`/app/simulator/${simulator.id}`}
			/>
			);
	}
}

class Simulators extends Component {
	componentDidMount() {
	}
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
			<br /><br />
			<Row>
			<Col className="col-sm-12">
			<h4>First time here? Be sure to <a href="/reset">reset your database.</a></h4>
			</Col>
			</Row>
			</Container>
			);
	}
}

function select(state){
	return {
		data: {
			simulators: state.simulators
		}
	};
}
const SimulatorData = Simulators;

export default SimulatorData;