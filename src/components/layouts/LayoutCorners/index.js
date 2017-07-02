import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import TransitionGroup from 'react-addons-transition-group';
import { TweenMax } from 'gsap';
import Views from '../../views';
import gql from 'graphql-tag'; 
import { withApollo } from 'react-apollo';
import CardSwitcher from './CardSwitcher';
import Widgets from './Widgets';
import Alerts from './Alerts';
import ActionsMixin from './Actions';

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

const Settings = (props) => {
	const logout = () => {
		const client = props.clientObj.id;
		const obj = {
			client,
		};
		const mutation = gql`mutation LogoutClient ($client: ID!){
			clientLogout(client: $client)
		}`;
		props.client.mutate({
			mutation: mutation,
			variables: obj
		});
	}
	return (
		<div className={`settingsBall ${props.clientObj.loginState} ${props.clientObj.offlineState ? 'offline' : ''}`}>
		<div className={`icon ${props.className}`} />
		<ul className="options">
		<li>Help</li>
		<li>Lock Screen</li>
		<li>Reset Terminal</li>
		<li>Diagnostic</li>
		<li onClick={logout}>Logout</li>
		</ul>
		</div>);
}

class LayoutCorners extends Component {
	render() {
		let {simulator, station, cardName, changeCard, clientObj} = this.props;
		let alertClass = `alertColor${simulator.alertLevel || 5}`;
		if (clientObj.loginState === 'logout'){
			cardName = 'Login';
		}
		if (clientObj.offlineState) {
			cardName = 'Offline';
		}
		return (<ActionsMixin {...this.props}>
			<div className={`card-container card-area ${alertClass}`} >
			<TransitionGroup>
			{
				station.cards.concat({name: 'Login', component: 'Login', icon: 'Login'})
				.concat({name: 'Offline', component: 'Offline', icon: 'Offline'}).map(card => {
					const component = Views[card.component];
					if (card.name === cardName) {
						return <CardHolder component={component} {...this.props} key={card.name} />
					}
					return null;
				}).filter(card => card)
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
			<div className="frame-4"></div>
			</div>
			<div className="frame-text">
			<h1 className="simulator-name">{simulator.name}</h1>
			<h2 className="station-name">{station.name}</h2>
			<h2 className="login-name">{clientObj.loginName}</h2>
			</div>
			<CardSwitcher clientObj={this.props.clientObj} cards={station.cards} currentCard={cardName} changeCard={changeCard} {...this.props} />
			<Settings client={this.props.client} clientObj={this.props.clientObj} className={alertClass} />
			<Widgets clientObj={this.props.clientObj} simulator={simulator} station={station}  />
			<Alerts ref="alert-widget" simulator={simulator} station={station} />
			</div>
			</ActionsMixin>);
	}
}

export default withApollo(LayoutCorners);
