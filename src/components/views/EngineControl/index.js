import React, {Component} from 'react';
import { Button, Row, Col, Container } from 'reactstrap';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import './style.scss';

const HeatBar = (props) => {
	return (<div>
		<label className="heatBox-Label">{props.label}</label>
		<div className="heatBox">
		<div className="heatBar" style={{height:`${props.level}%`,backgroundImage:props.background}}></div>
		</div>
		</div>);
};

const SPEEDCHANGE_SUB = gql`
subscription SpeedChanged{
	speedChange{
		id
		speed
	}
}`;

const HEATCHANGE_SUB = gql`
subscription HeatChanged{
	heatChange{
		id
		heat
	}
}`;
class EngineControl extends Component {
	constructor(props){
		super(props);
		this.setSpeedSubscription = null;
		this.heatChangeSubscription = null;
	}

	componentWillReceiveProps(nextProps) {
		if (!this.setSpeedSubscription && !nextProps.data.loading) {
			this.setSpeedSubscription = nextProps.data.subscribeToMore({
				document: SPEEDCHANGE_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					previousResult.engines = previousResult.engines.map(engine => {
						if (engine.id === subscriptionData.data.speedChange.id){
							engine.speed = subscriptionData.data.speedChange.speed
						} 
						return engine;
					})
					return previousResult;
				},
			});
		}
		if (!this.heatChangeSubscription && !nextProps.data.loading) {
			this.heatChangeSubscription = nextProps.data.subscribeToMore({
				document: HEATCHANGE_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					previousResult.engines = previousResult.engines.map(engine => {
						if (engine.id === subscriptionData.data.heatChange.id){
							engine.heat = subscriptionData.data.heatChange.heat
						} 
						return engine;
					})
					return previousResult;
				},
			});
		}
	}
	speedBarStyle(array,speed){
		let width = speed / array.length * 100;
		return ({
			width: `calc(${width}% - ${40/array.length * speed}px)`
		})
	}
	setSpeed(engine,speed){
		this.props.setSpeed({id: engine.id, speed:speed + 1, on: true})
	}
	fullStop(){
		this.props.data.engines.forEach((engine) => {
			this.props.setSpeed({id: engine.id, speed: -1, on: false});
		});
	}
	render(){
		const engines = this.props.data.engines || [];
		return (
			<Container fluid className="EngineControl">
			<Row>
			<Col className="col-sm-12 enginesBar">
			{(() => {
				return engines.map((engine, index) => {
					return (
						<div key={engine.id} className="engineGroup">
						<h4>{engine.name}</h4>
						<ul className="engine">
						{ engine.speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.number;
							}
							return (
								<li key={`${engine.id}-${speedWord}`} className="speedNums speedBtn" onClick={() => {this.setSpeed(engine,speedIndex,engines,index);}}>{speedWord}</li>
								);
						})}
						</ul>
						<div className="speedBar" style={this.speedBarStyle(engine.speeds,engine.speed)}></div>
						</div>
						);
				});
			})()}
			</Col>
			<Col className="col-sm-4 offset-sm-4">
			<Button color="warning" block onClick={this.fullStop.bind(this)}>Full Stop</Button>
			</Col>

			</Row>
			<Row>
			<Col>
			{(() => {
				if (engines.length === 1){
					return (
						<div>
						<Col>
						{engines[0].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button key={`${speed.text}-${speedIndex}`} block color="primary" className="speedBtn">{speedWord}</Button>;
						})}
						</Col>
						<Col>
						<Col>
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[0].heat}/>
						</Col>
						<Col>
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[0].coolant}/>
						</Col>
						</Col>
						<Col>

						</Col>
						</div>
						);
				}
				if (engines.length === 2){
					return (
						<Row>
						<Col>
						{engines[0].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button key={`speed-${speedIndex}`} color="primary" block className="speedBtn" onClick={() => {this.setSpeed(engines[0],speedIndex,engines,0);}}>{speedWord}</Button>;
						})}
						</Col>
						<Col sm={2}>
						<Row>
						<Col sm={6}>
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[0].heat}/>
						</Col>
						<Col sm={6}>
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[0].coolant}/>
						</Col>
						</Row>
						</Col>
						<Col>

						</Col>
						<Col sm={2}>
						<Row>
						<Col sm={6}>
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[1].heat}/>
						</Col>
						<Col sm={6}>
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[1].coolant}/>
						</Col>
						</Row>
						</Col>
						<Col>
						{engines[1].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button key={`speed-${speedIndex}`} color="primary" block className="speedBtn" onClick={() => {this.setSpeed(engines[1],speedIndex,engines,1);}}>{speedWord}</Button>;
						})}
						</Col>
						</Row>
						);
				}
			})()}
			</Col>
			</Row>
			</Container>
			);
	}
}

const ENGINE_QUERY = gql`
query getEngines($simulatorId: ID!){
	engines(simulatorId: $simulatorId) {
		id,
		name
		speeds {
			text
			number
		}
		heat
		speed
	}
}
`;

const SET_SPEED = gql`
mutation setSpeed($id: ID!, $speed: Int!, $on: Boolean){
	setSpeed(id: $id, speed: $speed, on: $on)
}
`;
export default compose(
	graphql(ENGINE_QUERY, {
		options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
	}),
	graphql(SET_SPEED, {name: 'setSpeed',
		props: ({setSpeed}) => ({
			setSpeed: (props) => setSpeed({
				variables: Object.assign(props)
			})
		})
  })
  )(EngineControl);
