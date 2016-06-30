import React, {Component} from 'react';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import './style.scss';

class EngineControlContent extends Component {
	componentDidMount() {
		let { dispatch } = this.props;
		dispatch(fetchSystems({type:"Engine"}));
	}
	render(){
		const engines = this.props.data.engines;
		return (
			<div className="EngineControl">
			<Row>
			<Col className="col-sm-12">
			{(() => {
				//if (engines.length === 1){
					return engines.map((engine) => {
						return (
							<h4>{engine.name}</h4>
							<ul className="engine">
							{ engine.speeds.map((speed) => {
								return (
									<li className="speedNums speedBtn" onClick={() => {console.log(speed)}}>{speed}</li>
									);
							})}
							</ul>
							);
					});
				//}
				//if (engines.length > 1){

				//}
			})()}
			</Col>
			</Row>
			</div>
			);
	}
}

function select(state,props){
	let engines = state.systems.filter((system) => {
		return system.type === 'Engine';
	});
	return {
		data: {
			engines: engines,
		}
	};
}
const EngineControl = connect(select)(EngineControlContent);

export default EngineControl;
