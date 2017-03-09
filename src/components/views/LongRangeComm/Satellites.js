import React, {Component} from 'react';
import './style.scss';


export default class Satellites extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedSat: null
    }
    this.sats = [
    {id:1, x: Math.random(), y: Math.random(), r: Math.random() * 360, strength: Math.random()},
    {id:2, x: Math.random(), y: Math.random(), r: Math.random() * 360, strength: Math.random()},
    {id:3, x: Math.random(), y: Math.random(), r:Math.random() * 360, strength: Math.random()},
    ]
  }
  selectSat(sat){
    this.setState({
      selectedSat: sat
    })
  }
  render(){
    const {width, height} = this.props;
    //const [width, height] = [window.innerWidth / 2, window.innerHeight / 2.5];
    return <div className="sat-container">
    <div className="starfield" style={{height:`${height}px`, width:`${width}px`}}>
    <div className="gridlines"></div>
    {
      this.sats.map(s => <Sat {...s} key={s.id} width={width} height={height} selectSat={this.selectSat.bind(this)} selectedSat={this.state.selectedSat} />)
    }
    </div>
    </div>
  }
}

const Sat = ({x, y, r, strength, id, selectSat, selectedSat, width, height}) => {
  return <div 
  onClick={selectSat.bind(this, id)} 
  style={{
    border: selectedSat === id ? 'dashed red 2px' : 'solid transparent 2px',
    left: `calc(${width - 24} * ${x}px)`,
    top: `calc(${height - 24} * ${y}px)`,
  }} 
  className="sat">
  <img 
  role="presentation" 
  style={{transform: `rotate(${r}deg)`}} 
  src="https://s3-us-west-2.amazonaws.com/ralex93/assets/Sat.svg" 
  />
  <div 
  className="strength" 
  style={{
    width: `${strength * 100}%`
  }}>
  </div>
  </div>
}