import React, {Component} from 'react';

export const Doors = (props) => {
  return <div className='docking-graphic'>
  <div className={`airlock ${props.transform ? "on" : ""}`}>
    <div className='tri-1'></div>
    <div className='tri-2'></div>
    <div className='tri-3'></div>
    <div className='tri-4'></div>
    <div className='tri-5'></div>
    <div className='tri-6'></div>
    <div className='tri-7'></div>
    <div className='tri-8'></div>
    <div className='tri-9'></div>
    <div className='tri-10'></div>
    <div className='tri-11'></div>
    <div className='tri-12'></div>
  </div>
</div>
}

export const Ramps = (props) => {
  return <div className="docking-graphic">
  <div className={`ramps ${props.transform ? "on" : ""}`}>
  <div className="background"></div>
  <div className="floor"></div>
  <div className="ramp"></div>
  <div className="left-door"></div>
  <div className="right-door">
  <div className="handle1"></div>
  <div className="handle2"></div>
  </div>
  </div>
  </div>
  
}

export class Clamps extends Component {
  render(){
    const {transform} = this.props;
    return <div className="docking-graphic">
    <div className={`clamps ${transform ? 'on' : ''}`}>
    <div className="xtransform">
    <div className="clamp rightClamp">
    <div className="stem"></div>
    <div className="branch"></div>
    <div className="hook"></div>
    </div>
    </div>
    <div className="leftClamp">
    <div className="xtransform">
    <div className="clamp">
    <div className="stem"></div>
    <div className="branch"></div>
    <div className="hook"></div>
    </div>
    </div>
    </div>
    <div className="bracket">
    <div className="bottom"></div>
    <div className="left"></div>
    <div className="right"></div>
    <div className="left-brack"></div>
    <div className="right-brack"></div>
    </div>
    </div>
    </div>
  }
}