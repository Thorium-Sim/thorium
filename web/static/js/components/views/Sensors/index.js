import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import './style.scss';
import actions from '../../../actions';
const {systems} = actions;
const {fetchSystems} = systems;

class Sensors extends Component{
	componentWillMount(){
		const {dispatch} = this.props;
		dispatch(fetchSystems({simulatorId:this.props.params.simulatorId,name:"Sensors"}));
	}
	render() {
		return (
			<div className="cardSensors">
			<Row>
			<Col className="col-sm-3 scans">
			<Row>
			<Col className="col-sm-6">
			<label>Scan for:</label>
			</Col>
			<Col className="col-sm-6">
			<select className="btn-block c-select">
			<option>Internal</option>
			<option>External</option>
			</select>
			</Col>
			<Col className="col-sm-12">
			<textarea className="form-control btn-block" rows="5"></textarea>
			<Button type="primary" className="btn-block" label="Begin Scan" />
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<label>Scan Results:</label>
			</Col>
			<Col className="col-sm-12">
			<Card style={{height: '200px'}}>
			</Card>
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<h3>Contact Coordinates</h3>
			</Col>
			<Col className="col-sm-12">
			<Card>
			<p>X:</p>
			<p>Y:</p>
			<p>Z:</p>
			</Card>
			</Col>
			</Row>
			</Col>
			<Col className="col-sm-6 arrayContainer">
			<div className="spacer"></div>
			<div className="array">
			<div className="circles">
			<div></div>
			<div></div>
			</div>
			<div className="lines">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			</div>
			</div>
			</Col>
			<Col className="col-sm-3 data">
			<Row>
			<Col className="col-sm-12 contactPictureContainer">
			<div className="card contactPicture"></div>
			</Col>
			<Col className="col-sm-12 contactNameContainer">
			<div className="card contactName">
			USS Valiant
			</div>
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<h3>Processed Data</h3>
			</Col>
			<Col className="col-sm-12">
			<div className="card processedData"></div>
			</Col>
			</Row>
			</Col>
			</Row>
			</div>
			);
	}
}

function select(state){
	console.log('State',state);
	let sensors = state.systems.reduce((prev, next) => {
		if (prev.name === "Sensors"){
			return prev;
		}
		if (next.name === "Sensors"){
			return next;
		}
	},{});
	return {
		data: {
			sensors: sensors
		}
	};
}
const SensorsData = connect(select)(Sensors);

export default SensorsData;
