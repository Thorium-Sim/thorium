import React, {Component} from 'react';
import './style.scss';
import SatImage from './Sat.svg';

export default class Satellites extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedSat: null,
    }
    this.sats = [
    {id:1, x: Math.random(), y: Math.random(), r: Math.random() * 360, strength: Math.random()},
    {id:2, x: Math.random(), y: Math.random(), r: Math.random() * 360, strength: Math.random()},
    {id:3, x: Math.random(), y: Math.random(), r:Math.random() * 360, strength: Math.random()},
    ]
  }
  render(){
    const {width, height, selectSat, selectedSat, messageLoc, messageText} = this.props;
    //const [width, height] = [window.innerWidth / 2, window.innerHeight / 2.5];
    return <div className="sat-container">
    <div className="starfield" style={{height:`${height}px`, width:`${width}px`}}>
    <div className="gridlines"></div>
    <div className="message-ball "
    style={{
      left: `calc(${width - 36} * ${messageLoc.x}px)`,
      top: `calc(${height - 36} * ${messageLoc.y}px)`,
      opacity: (messageLoc.x === 0 || messageLoc.y === 0 || messageLoc.x === 1 || messageLoc.y === 1) ? 0 : 1
    }}>
    <div className="message-text" style={{
      left: `calc(${width - 36} * ${messageLoc.x}px)`,
      top: `calc(${height - 36} * ${messageLoc.y}px)`,
    }}>
      {messageText}
    </div>
    </div>
    {
      this.sats.map(s => <Sat {...s} key={s.id} width={width} height={height} selectSat={selectSat} selectedSat={selectedSat} />)
    }
    </div>
    </div>
  }
}

const Sat = ({x, y, r, strength, id, selectSat, selectedSat, width, height}) => {
  if (!selectedSat) selectedSat = {};
  return <div 
  onClick={selectSat.bind(this, {id, x, y})} 
  style={{
    border: selectedSat.id === id ? 'dashed red 2px' : 'solid transparent 2px',
    left: `calc(${width - 60} * ${x}px)`,
    top: `calc(${height - 60} * ${y}px)`,
  }} 
  className="sat">
  <div className="rotate-container">
  <img 
  role="presentation" 
  style={{transform: `rotate(${r}deg)`}} 
  src={SatImage}
  />
  </div>
  <div 
  className="strength" 
  style={{
    width: `${strength * 100}%`
  }}>
  </div>
  </div>
}