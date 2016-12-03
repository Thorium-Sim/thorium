import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Button, Row, Col, Card } from '../../generic';
import './style.scss';
import SensorGrid from './SensorGrid.js';

class Sensors extends Component{
	constructor(props){
		super(props);
		this.state = {};
		/*this.state = {
			scanResults: props.data.sensors.scanResult,
			processedData: props.data.sensors.processedData,
			scanRequest: props.data.sensors.scanRequest,
		};*/
	}

	_startScan() {
		let obj = {
			scanning: true,
			scanRequest: this.refs.scanRequest.value,
		};
		//this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:'Sensors'},data:obj});
	}
	_stopScan() {
		//this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:'Sensors'},data:{scanning:false}});
	}
	typeIn(text,chars,stateProp){
		let currentState = this.state;
		if (text){
			if (text.length >= chars){
				currentState[stateProp] = text.substring(chars,0);
				this.setState(currentState);
				setTimeout(this.typeIn.bind(this,text,chars + 1,stateProp),1);
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		/*if (nextProps.data.sensors.scanResults !== this.state.scanResults){
			if (this.state.scanResults === undefined){
				this.setState({
					scanResults: nextProps.data.sensors.scanResults
				});
			} else {
				this.typeIn(nextProps.data.sensors.scanResults,0,"scanResults");
			}
		}
		if (nextProps.data.sensors.processedData !== this.state.processedData){
			if (this.state.scanResults === undefined){
				this.setState({
					processedData: nextProps.data.sensors.processedData
				});
			} else {
				this.typeIn(nextProps.data.sensors.processedData,0,"processedData");
			}
		}*/
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
			<Col className="col-sm-6 padding">
			<select className="btn-block c-select">
			<option>Internal</option>
			<option>External</option>
			</select>
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<div className="scanEntry">
			{/*this.props.data.sensors.scanning ?
				<div>
				<video ref={'ReactVideo'} autoPlay loop>
				<source src={'/js/images/scansvid.mov'} type="video/mp4" />
				</video>
				<Button type="danger" className="btn-block" onClick={this._stopScan.bind(this)} label="Cancel Scan" />
				</div>
				:
				<div>
				<textarea ref="scanRequest" className="form-control btn-block" rows="6">{this.state.scanRequest}</textarea>
				<Button type="primary" className="btn-block" onClick={this._startScan.bind(this)} label="Begin Scan" />
				</div>
			*/}
			</div>
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<label>Scan Results:</label>
			</Col>
			<Col className="col-sm-12">
			<Card style={{height: '200px'}}>
			{this.state.scanResults}
			</Card>
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-12">
			<h4>Contact Coordinates</h4>
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
			<SensorGrid />
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
			<Card className="processedData">
			{this.state.processedData}
			</Card>
			</Col>
			</Row>
			</Col>
			</Row>
			</div>
			);
	}
}

const THRUSTER_QUERY = gql`
query Thrusters($simulatorId: ID){
  thrusters(simulatorId: $simulatorId){
    id
    direction {
      x
      y
      z
    }
    rotation {
      yaw
      pitch
      roll
    }
    rotationDelta {
      yaw
      pitch
      roll
    }
    rotationRequired {
      yaw
      pitch
      roll
    }
    manualThrusters
  }
}
`;

export default  graphql(THRUSTER_QUERY, {
  options: (props) => ({ variables: { simulatorId: 'test' } }),
})(withApollo(Sensors));
