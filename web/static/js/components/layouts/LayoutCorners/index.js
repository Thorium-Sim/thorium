import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { Button, LoadingWidget, Row, Col, Container, Card } from '../../generic';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-transition-group';
import { Link } from 'react-router';

import Views from '../../views';

import CardSwitcher from './CardSwitcher';
import './layout.scss';
import './theme.scss';

class CardHolder extends Component {
	componentWillEnter (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 0.5, {z: 100, rotationY:0, opacity: 0, transformPerspective:200}, {z: 0, rotationY:0, opacity: 1, transformPerspective:200, onComplete: callback});
	}

	componentWillLeave (callback) {
		const el = findDOMNode(this);
		TweenMax.fromTo(el, 0.5, {z: 0, rotationY:0, opacity: 1, transformPerspective:200}, {z: -100, rotationY:0, opacity: 0, transformPerspective:200, onComplete: callback});
	}
	render(){
		return (
			<div className="cardContainer container" style={{width: '100%', position:'absolute', alignSelf:'center'}}>
			<this.props.component {...this.props} />
			</div>
			);
	}
}

class LayoutCorners extends Component {
	render() {
		const {simulatorId, stationId, cardIndex} = this.props.params;
		let {stationsData, simulatorsData} = this.props.data;
		let currentStation = stationsData[0] || {};
		let currentSimulator = simulatorsData[0] || {};
		let {cardsData} = this.props.data;
		cardsData = cardsData || [];
		let loading = cardsData.length === 0;
		let alertClass = `alertColor${currentSimulator.alertLevel || 5}`;
		return (<div>
			<div className={`card-container card-area ${alertClass}`} >
			<TransitionGroup>
			{
				cardsData.map((card, index) => {
					const component = Views[card.component];
					if (index === parseInt(cardIndex, 10)){
						return <CardHolder component={component} {...this.props} key={card.id} />;
					}
					return null;
				}).filter((card) => {
					return card;
				})
			}
			</TransitionGroup>
			</div>
			<div id="curve-frame" className={alertClass}>
			<div className="frame-color">
			<div className="part-1-1"></div>
			<div className="part-c"></div>
			<div className="part-1-2"></div>
			<div className="part-2"></div>
			<div className="part-3"></div>
			</div>
			<div className="frame-image">
			<div className="frame-1"></div>
			<div className="frame-2"></div>
			<div className="frame-3"></div>
			</div>
			<div className="frame-text">
			<h1 className="simulator-name">{currentSimulator.name}</h1>
			<h2 className="station-name">{currentStation.name}</h2>
			</div>
		{/*<span class="login-name" style="{{usernameStyle}}">{{username}}</span>*/}
		<CardSwitcher cards={cardsData} {...this.props} />
		</div>
		</div>);
	}
}

export default LayoutCorners;
