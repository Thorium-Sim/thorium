import React, { Component } from 'react';

export default class ComponentView extends Component {
	render(){
		console.log(this.props);
		return(
			<div>{this.props.params.component}
			</div>
			);
	}
}
