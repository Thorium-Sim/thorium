import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';
import { Button, Row, Col, Card } from 'reactstrap';
import './style.scss';
import SensorGrid from './SensorGrid.js';
import Measure from 'react-measure';

const SENSOR_SUB = gql`
subscription SensorsChanged {
	sensorsUpdate {
		id
		simulatorId
		scanResults
		scanRequest
		processedData
		scanning
	}
}`;

class Sensors extends Component{
	constructor(props){
		super(props);
		this.sensorsSubscription = null;
		this.state = {
			scanResults: '',
			processedData: '',
			scanRequest: '',
			weaponsRangePulse: 0,
			hoverContact: {name:'', pictureUrl: ''}
		};
	}
	componentWillReceiveProps(nextProps) {
		if (!this.sensorsSubscription && !nextProps.data.loading) {
			this.sensorsSubscription = nextProps.data.subscribeToMore({
				document: SENSOR_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					previousResult.sensors = previousResult.sensors.map(sensor => {
						if (sensor.id === subscriptionData.data.sensorsUpdate.id){
							return subscriptionData.data.sensorsUpdate;
						} 
						return sensor;
					})
					return previousResult;
				},
			});
		}
		const nextSensors = nextProps.data.sensors[0];
		if (!nextProps.data.loading){
			if (this.props.data.loading){
				//First time load
				this.setState({
					scanResults:nextSensors.scanResults,
					processedData:nextSensors.processedData,
					scanRequest:nextSensors.scanRequest,
				})
			} else {
				//Every other load
				if (nextSensors.scanResults !== this.state.scanResults){
					if (this.state.scanResults === undefined){
						this.setState({
							scanResults: nextSensors.scanResults
						});
					} else {
						this.typeIn(nextSensors.scanResults,0,"scanResults");
					}
				}
				if (nextSensors.processedData !== this.state.processedData){
					if (this.state.scanResults === undefined){
						this.setState({
							processedData: nextSensors.processedData
						});
					} else {
						this.typeIn(nextSensors.processedData,0,"processedData");
					}
				}
			}
		}
	}
	showWeaponsRange(){
		this.setState({
			weaponsRangePulse: 1
		})
		setTimeout(() => {
			this.setState({
				weaponsRangePulse: 0
			})
		},1000)
	}
	_startScan() {
		let obj = {
			id: this.props.data.sensors[0].id,
			request: this.refs.scanRequest.value,
		};
		this.props.client.mutate({
			mutation: gql`
			mutation SensorScanRequest($id: ID!, $request:String!){
				sensorScanRequest(id:$id, request:$request)
			}`,
			variables: obj
		})
	}
	_stopScan() {
		let obj = {
			id: this.props.data.sensors[0].id,
		};
		this.props.client.mutate({
			mutation: gql`
			mutation CancelScan($id: ID!){
				sensorScanCancel(id:$id)
			}`,
			variables: obj
		})
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
	_hoverContact(contact = {}){
		this.setState({
			hoverContact: contact
		});
	}
	render() {
		if (this.props.data.error) console.error(this.props.data.error);
		const sensors = !this.props.data.loading ? this.props.data.sensors[0] : {armyContacts: []}
		const {hoverContact} = this.state;
		console.log('Hover',hoverContact);
		return (
			<div className="cardSensors">
			{        this.props.data.loading ? 'Loading...' : 
			<div>
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
			{this.props.data.sensors[0].scanning ?
				<div>
				<video ref={'ReactVideo'} autoPlay loop>
				<source src={'/js/images/scansvid.mov'} type="video/mp4" />
				</video>
				<Button color="danger" block onClick={this._stopScan.bind(this)}>Cancel Scan</Button>
				</div>
				:
				<div>
				<textarea ref="scanRequest" className="form-control btn-block" rows="6" defaultValue={this.state.scanRequest} />
				<Button color="primary" block onClick={this._startScan.bind(this)}>Begin Scan</Button>
				</div>
			}
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
			<Button onClick={this.showWeaponsRange.bind(this)} block>Show Weapons Range</Button>
			</Col>
			<Col className="col-sm-6 arrayContainer">
			<div className="spacer"></div>
			<Measure>
			{ dimensions => (
				<div id="threeSensors" className='array'>
				{(() => console.log(dimensions) /*This is apparently necessary*/)()}
				{dimensions.width > 0 &&
					<SensorGrid 
					sensor={sensors.id}
					dimensions={dimensions}
					weaponsRangePulse={this.state.weaponsRangePulse}
					hoverContact={this._hoverContact.bind(this)}
					/> 
				}
				</div>
				) }
			</Measure>
			</Col>
			<Col className="col-sm-3 data">
			<Row>
			<Col className="col-sm-12 contactPictureContainer">
			<div className="card contactPicture" style={{backgroundSize: '100% 100%', backgroundImage:`url('${hoverContact.pictureUrl}')`}}></div>
			</Col>
			<Col className="col-sm-12 contactNameContainer">
			<div className="card contactName">
			{hoverContact.name}
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
		}
		</div>
		);
	}
}

const SENSOR_QUERY = gql`
query GetSensors($simulatorId: ID){
	sensors (simulatorId: $simulatorId){
		id
		simulatorId
		scanResults
		scanRequest
		scanning
		processedData
	}
}`;

export default  graphql(SENSOR_QUERY, {
	options: (props) => ({ variables: { simulatorId: 'test' } }),
})(withApollo(Sensors));
