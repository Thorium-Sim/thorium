import React, {Component} from 'react';
import { Row, Col, Container } from 'reactstrap';
import gql from 'graphql-tag';
import { InputGroup, InputGroupButton, Button, Input } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import Immutable from 'immutable';
import './style.scss';

const Keypad = (props) => {
	return <div className="keypadButtons card">
	<div className="keypad alertBack">7</div>
	<div className="keypad alertBack">8</div>
	<div className="keypad alertBack">9</div>
	<div className="keypad alertBack">4</div>
	<div className="keypad alertBack">5</div>
	<div className="keypad alertBack">6</div>
	<div className="keypad alertBack">1</div>
	<div className="keypad alertBack">2</div>
	<div className="keypad alertBack">3</div>
	<div className="keypad alertBack">.</div>
	<div className="keypad alertBack">0</div>
	<div className="keypad alertBack clearButton">C</div>
	<div className=" btn-block alertBack enter">Enter</div>
	</div>
}
class NavigationScanner extends Component {
	constructor(props){
		super(props);
		this.state = {
			lineX:50,
			lineY:50,
			backX:0,
			backY:0,
		};
		this.scanning = null;
		if (props.scanning) {
			this.scanning = setTimeout(this._scan.bind(this),100);
		}
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.scanning && nextProps.scanning){
			this.scanning = setTimeout(this._scan.bind(this),100);
		}
		if (!nextProps.scanning){
			clearTimeout(this.scanning);
			this.scanning = null;
		}
	}
	_scan(){
		if (this.props.scanning){
			this.setState({
				lineX:Math.random() * 100,
				lineY:Math.random() * 100,
				backX:(Math.random() - 0.5) * 1000,
				backY:(Math.random() - 0.5) * 1000,
			});
			this.scanning = setTimeout(this._scan.bind(this),(Math.random(5000) + 2000))
		}
	}
	render(){
		return (
			<div className="starsBox" style={{backgroundPosition:`${this.state.backX}px ${this.state.backY}px`}}>
			<div className="barVert" style={{left:`${this.state.lineX}%`}}></div>
			<div className="barHoriz" style={{top:`${this.state.lineY}%`}}></div>
			<div className="crosshair" style={{left:`calc(${this.state.lineX}% - 18px)`,top:`calc(${this.state.lineY}% - 18px)`}}>
			<div />
			<div />
			<div />
			<div />
			</div>
			</div>
			);
	}
}

const NAVIGATION_SUB = gql`
subscription NavigationUpdate($simulatorId: ID){
	navigationUpdate(simulatorId: $simulatorId) {
		id
		power {
			power
			powerLevels
		}
		damage {
			damaged
			report
		}
		scanning
		calculate
		destination
		currentCourse {
			x
			y
			z
		}
		calculatedCourse {
			x
			y
			z
		}
	}
}`;

class Navigation extends Component {
	constructor(props){
		super(props);
		this.state = {
			destination: null,
			calculatedCourse: {}
		}
		this.scanning = null;
		this.subscription = null;
		if (props.scanning) {
			this.scanning = setTimeout(this._scan.bind(this),100);
		}
	}
	componentWillReceiveProps(nextProps){
		if (!this.subscription && !nextProps.data.loading) {
			this.subscription = nextProps.data.subscribeToMore({
				document: NAVIGATION_SUB,
				updateQuery: (previousResult, {subscriptionData}) => {
					const returnResult = Immutable.Map(previousResult);
					return returnResult.merge({navigation: subscriptionData.data.navigationUpdate}).toJS();
				}
			});
		}
		if (!nextProps.data.loading){
			const navigation = nextProps.data.navigation[0];
			if (navigation){
				if (navigation.scanning){
					this.scanning = setTimeout(this._randomCourse.bind(this),60);
				}
				if (!navigation.scanning){
					clearTimeout(this.scanning);
					this.scanning = null;
				}
				this.setState({
					destination:navigation.destination,
					calculatedCourse: navigation.calculatedCourse
				})
			}
		}
	}
	_randomCourse(){
		this.setState({
			calculatedCourse: {
				x: Math.round(Math.random() * 100000)/100,
				y: Math.round(Math.random() * 100000)/100,
				z: Math.round(Math.random() * 100000)/100,
			}
		})
		this.scanning = setTimeout(this._randomCourse.bind(this),60);
	}
	updateDestination(e){
		this.setState({
			destination: e.target.value
		})
	}
	calc(){
		const navigation = this.props.data.navigation[0];
		const mutation = gql`
		mutation CalculateCourse($id: ID!, $destination: String!){
			navCalculateCourse(id: $id, destination: $destination)
		}`;
		const variables = {
			id: navigation.id,
			destination: this.state.destination
		}
		this.props.client.mutate({
			mutation,
			variables
		})
	}
	cancelCalc(){
		const navigation = this.props.data.navigation[0];
		const mutation = gql`
		mutation CancelCalculation($id: ID!){
			navCancelCalculation(id: $id)
		}`;
		const variables = {
			id: navigation.id,
			destination: this.state.destination
		}
		this.props.client.mutate({
			mutation,
			variables
		})
	}
	inputDestination(){
		const mutation = gql`
		mutation CourseEntry($id: ID!, $x: String!, $y: String!, $z: String!,){
			navCourseEntry(id: $id, x: $x, y: $y, z: $z)
		}`;
	}
	render(){
		if (this.props.data.loading) return null;
		const {calculatedCourse} = this.state;
		const navigation = this.props.data.navigation[0];
		if (!navigation) return <p>No Navigation System</p>;
		return (
			<Container fluid className="cardNavigation">
			<Row>
			<Col className="col-sm-6">
			{navigation.calculate && <Row>
				{navigation.scanning ?
					<Col sm="12">
					<Button block size="lg" style={{marginTop: '55px'}}color="warning" onClick={this.cancelCalc.bind(this)}>Cancel Scan</Button>
					</Col> :
					<Col sm="12">
					<label htmlFor="destination"><h3>Desired Destination:</h3></label>
					<InputGroup>
					<Input id="destination" type="text" value={this.state.destination} onChange={this.updateDestination.bind(this)} className="form-control" />
					<InputGroupButton><Button onClick={this.calc.bind(this)} color="secondary">Calculate Coordinates</Button></InputGroupButton>
					</InputGroup>
					</Col>
				}
				</Row>
			}
			<Row>
			<Col className="col-sm-12">
			<NavigationScanner scanning={navigation.scanning} />
			</Col>
			</Row>
			</Col>
			<Col className="col-sm-3">
			{
				navigation.calculate && <div className="calculated card">
				<label>Calculated Course</label>
				<Row>
				<Col className="col-sm-3">
				X:
				</Col>
				<Col className="col-sm-8 numBox">
				{calculatedCourse.x}
				</Col>
				</Row>
				<Row>
				<Col className="col-sm-3">
				Y:
				</Col>
				<Col className="col-sm-8 numBox">
				{calculatedCourse.y}
				</Col>
				</Row>
				<Row>
				<Col className="col-sm-3">
				Z:
				</Col>
				<Col className="col-sm-8 numBox">
				{calculatedCourse.z}
				</Col>
				</Row>
				</div>
			}
			<div className="currentCourse card">
			<label>Current Course</label>
			<Row>
			<Col className="col-sm-3">
			X:
			</Col>
			<Col className="col-sm-8 numBox">
			{navigation.currentCourse.x}
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-3">
			Y:
			</Col>
			<Col className="col-sm-8 numBox">
			{navigation.currentCourse.y}
			</Col>
			</Row>
			<Row>
			<Col className="col-sm-3">
			Z:
			</Col>
			<Col className="col-sm-8 numBox">
			{navigation.currentCourse.z}
			</Col>
			</Row>
			</div>
			</Col>
			<Col sm={3}>
			<Keypad />
			</Col>
			</Row>
			</Container>);
	}
}


const NAVIGATION_QUERY = gql`
query Navigation($simulatorId: ID){
	navigation(simulatorId: $simulatorId) {
		id
		power {
			power
			powerLevels
		}
		damage {
			damaged
			report
		}
		scanning
		calculate
		destination
		currentCourse {
			x
			y
			z
		}
		calculatedCourse {
			x
			y
			z
		}
	}
}`;

export default graphql(NAVIGATION_QUERY, {
	options: (ownProps) => ({ variables: { simulatorId: ownProps.simulator.id } }),
})(withApollo(Navigation));
