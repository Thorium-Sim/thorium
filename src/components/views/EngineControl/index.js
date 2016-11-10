import React, {Component} from 'react';
import { Button, Row, Col } from 'reactstrap';
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
	setSpeed(engine,speed,engines,index){
		this.props.setSpeed({id: engine.id, speed:speed + 1, on: true})
		if (index >= 1){
			//More than one engine, update the previous;
			for (let i = 0; i < index; i++){
				let newEngine = engines[i];
				this.props.setSpeed({id: newEngine.id, speed:engines[i].speeds.length, on: false})
			}
		}
		if (index < engines.length - 1){
			//More than one engine, update the next ones to be zero
			for (let i = index + 1; i <= engines.length - 1; i++){
				this.props.setSpeed({id: engines[i].id, speed:-1, on: false})
			}
		}
	}
	fullStop(){
		this.props.data.engines.forEach((engine) => {
			this.props.setSpeed({id: engine.id, speed: -1, on: false});
		});
	}
	render(){
		const engines = this.props.data.engines || [];
		return (
			<div className="EngineControl">
			<Row>
			<Col className="col-sm-12 enginesBar">
			{(() => {
				return engines.map((engine, index, array) => {
					return (
						<div className="engineGroup">
						<h4>{engine.name}</h4>
						<ul className="engine">
						{ engine.speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.number;
							}
							return (
								<li className="speedNums speedBtn" onClick={() => {this.setSpeed(engine,speedIndex,engines,index);}}>{speedWord}</li>
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
			<Col className="col-sm-12">
			{(() => {
				if (engines.length === 1){
					return (
						<div>
						<Col className="col-sm-4">
						{engines[0].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button color="primary" className="speedBtn">{speedWord}</Button>;
						})}
						</Col>
						<Col className="col-sm-2">
						<Col className="col-sm-6">
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[0].heat}/>
						</Col>
						<Col className="col-sm-6">
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[0].coolant}/>
						</Col>
						</Col>
						<Col className="col-sm-6">

						</Col>
						</div>
						);
				}
				if (engines.length === 2){
					return (
						<div>
						<Col className="col-sm-2">
						{engines[0].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button key={`speed-${speedIndex}`} color="primary" block className="speedBtn" onClick={() => {this.setSpeed(engines[0],speedIndex,engines,0);}}>{speedWord}</Button>;
						})}
						</Col>
						<Col className="col-sm-2">
						<Col className="col-sm-6">
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[0].heat}/>
						</Col>
						<Col className="col-sm-6">
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[0].coolant}/>
						</Col>
						</Col>
						<Col className="col-sm-4">

						</Col>
						<Col className="col-sm-2">
						<Col className="col-sm-6">
						<HeatBar label="Heat" background="linear-gradient(to bottom, #440000 0%,#ff0000 50%,#440000 100%)" level={engines[1].heat}/>
						</Col>
						<Col className="col-sm-6">
						<HeatBar label="Coolant" background="linear-gradient(to bottom, #004400 0%,#00ff00 50%,#004400 100%)" level={engines[1].coolant}/>
						</Col>
						</Col>
						<Col className="col-sm-2">
						{engines[1].speeds.map((speed, speedIndex) => {
							let speedWord = speed;
							if (typeof speed === "object"){
								speedWord = speed.text;
							}
							return <Button key={`speed-${speedIndex}`} color="primary" block className="speedBtn" onClick={() => {this.setSpeed(engines[1],speedIndex,engines,1);}}>{speedWord}</Button>;
						})}
						</Col>
						</div>
						);
				}
			})()}
			</Col>
			</Row>
			</div>
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
		coolant
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
		options: (props) => {console.log('PROPS', props); return ({ variables: { simulatorId: 'test' } })},
	}),
	graphql(SET_SPEED, {name: 'setSpeed',
		props: ({setSpeed}) => ({
			setSpeed: (props) => setSpeed({
				variables: Object.assign(props)
			})
		})
  })/*,
  graphql(LOWER_SHIELDS, {name: 'lowerShields',
    props: ({lowerShields}) => ({
      lowerShields: (props) => lowerShields({
        variables: Object.assign(props)
      })
    })
  }),*/
  )(EngineControl);
