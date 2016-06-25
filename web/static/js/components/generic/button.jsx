import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Button extends Component {
	render() {
		let classNames = this.props.className || '';
		let type = this.props.type || 'default';
		let href = this.props.href || '#';
		let action = this.props.onClick || function(){};
		let label = this.props.label || 'Button';
		let title = this.props.title || label;
		classNames += ` btn-${type}`;
		if (this.props.href){
			return (
				<Link to={href}
				className={`btn ${classNames}`}
				title={title}>
				{ label }
				</Link>
				);
		}
		return (
			<button className={`btn ${classNames}`}
			onClick={action}
			type="button"
			title={title}>
			{label}
			</button>
			);
	}
}
