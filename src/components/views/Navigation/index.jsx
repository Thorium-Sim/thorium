import React, {Component} from 'react';
import { Row, Col, Container } from 'reactstrap';
import './style.scss';

class NavigationScanner extends Component {
	constructor(props){
		super(props);
		this.state = {
			lineX:50,
			lineY:50,
			backX:0,
			backY:0,
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.scanning && !this.state.scanning){
			this.setState({
				scanning: true
			})
			this._scan.bind(this)();
		}
		if (!nextProps.scanning){
			this.setState({
				scanning: false
			})
		}
	}
	_scan(){
		if (this.props.scanning){
			this.setState({
				lineX:Math.random() * 100,
				lineY:Math.random() * 100,
				backX:(Math.random() - 0.5) * 1000,
				backY:(Math.random() - 0.5) * 1000,
				scanning: true,
			});
			setTimeout(this._scan.bind(this),(Math.random(5000) + 2000))
		}
	}
	render(){
		if (this.props.scanning && !this.state.scanning){
			setTimeout(this._scan.bind(this),100);
		}
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

class NavigationContent extends Component {
	constructor(props){
		super(props);
		this.state = {
			scanning: true
		}
	}
	render(){
		return (
			<Container fluid className="cardNavigation">
			<Row>
			<Col sm={3}>
			<div className="keypadButtons card">
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
			</Col>
			<Col className="col-sm-3">
			<div className="currentCourse card">
			<label>Current Course</label>
			<Row>
			<Col className="col-sm-3">
			X:
			</Col>
			<Col className="col-sm-8 numBox">

			</Col>
			</Row>
			<Row>
			<Col className="col-sm-3">
			Y:
			</Col>
			<Col className="col-sm-8 numBox">

			</Col>
			</Row>
			<Row>
			<Col className="col-sm-3">
			Z:
			</Col>
			<Col className="col-sm-8 numBox">

			</Col>
			</Row>
			</div>
			</Col>
			<Col className="col-sm-6">
			<NavigationScanner scanning={this.state.scanning} />
			</Col>
			</Row>
			</Container>);
	}
}

const Navigation = NavigationContent;

export default Navigation;
