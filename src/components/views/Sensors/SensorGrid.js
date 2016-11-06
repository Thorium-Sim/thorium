import React, {Component} from 'react';
import {fabric} from 'fabric';

class SensorGrid extends Component{
	constructor(props){
		super(props);
		this.state = {
			canvas:null,
		};
	}
	componentDidMount(){
		const canvas = new fabric.Canvas('canvas');
		let rect = new fabric.Rect({
			top: 100,
			left: 100,
			width: 60,
			height: 80,
			fill: 'red'
		});

		canvas.add(rect);
		this.setState({
			canvas:canvas
		});
	}
	render(){
		return <canvas id="canvas" style={{width: '100%', height: '100%'}} ref="sensorGrid"></canvas>;
	}
}
export default SensorGrid;
