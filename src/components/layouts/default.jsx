import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container } from '../generic';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import {TweenMax} from 'gsap';
import Views from '../views';

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
			<div className="cardContainer container">
			<this.props.component {...this.props} />
			</div>
			);
	}
}

class LayoutDefault extends Component {
	render() {
		const {simulatorId, stationId} = this.props.params;
		let {cardsData} = this.props.data;
		cardsData = cardsData || [];
		let loading = cardsData.length === 0;
		return (<Container>
			<div style={{display:'flex'}}>
			<ul>
			{(loading) ? <div></div> : cardsData.map((card,index) => (
				<li key={card.id}>
				<Link to={`/app/simulator/${simulatorId}/station/${stationId}/card/${index}`}>
				{card.name}
				</Link>
				</li>
				))}
			</ul>
			<TransitionGroup>
			{
				cardsData.map((card) => {
					const component = Views[card.component];
					return <CardHolder component={component} {...this.props} key={card.id} />;
				})
			}
			</TransitionGroup>
			</div>
			</Container>);
	}
}

export default LayoutDefault;