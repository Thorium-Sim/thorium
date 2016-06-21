import React, { Component } from 'react';

export default class Button extends Component {
	render() {
		debugger;
		let classNames = this.props.classNames;
		let type = this.props.type || 'default';
		let href = this.props.href || '#';
		let action = this.props.onClick || function(){};
		let label = this.props.label || 'Button';
		let title = this.props.title || label;
		classNames += ` btn-${type}`;
		if (this.props.type === 'link'){
			return (
				<a href={href}
				className={`btn ${classNames}`}
				title={title}>
				{ label }
				</a>
				);
		}
		return (
			<button classNames={classNames}
			onClick={action}
			type="button"
			title={title}>
			{label}
			</button>
			);
	}
}
