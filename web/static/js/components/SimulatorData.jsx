import React, { Component } from 'react';
import { Button, LoadingWidget, Row, Col, Container } from './generic';
import { connect } from 'react-redux';
import actions from '../actions';
const {simulators} = actions;
const {fetchSimulators} = simulators;

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
	componentDidMount() {
		let { dispatch } = this.props;

		dispatch(fetchSimulators());
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
const SimulatorData = connect(select)(Simulators);

export default SimulatorData;