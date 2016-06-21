import React, { Component } from 'react';
import { connect } from 'react-apollo';
import { Button, LoadingWidget } from './generic';

class SimulatorLink extends Component {
	render(){
		let simulator = this.props.simulator || {};
		return (<div>
			<Button
			type="default"
			label={simulator.name}
			/>
			</div>
			);
	}
}

class Simulators extends Component {
	render() {
		let simulators = this.props.data.simulators || [];
		let loading = this.props.data.loading;
		return (
			<div>
			{(loading) ? <LoadingWidget /> :
				simulators.map((simulator)=>{
					return <SimulatorLink key={simulator.id} simulator={simulator} />;
				})
			}
			</div>);
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
