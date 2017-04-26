import React, {Component} from 'react';
import { Button } from 'reactstrap';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { TweenMax } from 'gsap';
import { findDOMNode } from 'react-dom';

export default class TorpedoLoading extends Component {
  state = {
    torpedoState: 'none',
    torpedoType: 'quantum',
    screen: 'TorpedoTube'
  }
  updateScreen(screen){
    this.setState({
      screen
    })
  }
  loadTorpedo(which){
    this.setState({
      screen: 'TorpedoTube',
      torpedoType: which
    }, () => {
      this.setState({
        torpedoState: 'loaded',
      })
    })
  }
  unloadTorpedo(which){
    this.setState({
      torpedoState: 'none',
    })
  }
  fireTorpedo(){
    
  }
  render(){
    const components = [
    TorpedoTube,
    TorpedoPick
    ];
    return <TransitionGroup>
    {
      components.map(Comp => {
        if (this.state.screen === Comp.name) return <Comp 
          key={Comp.name} 
        {...this.state} 
        loadTorpedo={this.loadTorpedo.bind(this)} 
        unloadTorpedo={this.unloadTorpedo.bind(this)}
        updateScreen={this.updateScreen.bind(this)} 
        fireTorpedo={this.fireTorpedo.bind(this)}
        />;
        return null;
      }).filter(a => a)
    }
    </TransitionGroup>
  }
}

const Torpedo = ({state, type, updateScreen}) => {

  const style = {
    width: '60px',
    height: '20px',
    position: 'absolute',
    opacity: state === 'none' ? 0 : 1,
    top: state === 'loaded' ? '136px' : '2px',
    left: '49px',
    transition: `opacity 1s ease-in ${state === 'loaded' ? '' : '2s'}, top 3s ease-in-out`
  };
  let color = 'rgb(200, 120, 255)';
  switch(type){
    case 'photon':
    color = 'rgb(255,0,0)';
    break;
    case 'quantum':
    color = 'rgb(0,80,255)';
    break;
    case 'probe':
    color = 'rgb(40,140,40)';
    break;
    case 'other':
    default:
    color = 'rgb(200, 120, 255)';
    break;
  }

  return <svg style={style} width="100%" height="100%" viewBox="0 0 32 10">
  <g transform="matrix(1,0,0,1,-199,-136)">
  <path style={{fill:color}} d="M209,136L226,136C228.761,136 231,138.239 231,141C231,141 231,141 231,141C231,143.761 228.761,146 226,146C220,146 210,146 204,146C201.239,146 199,143.761 199,141C199,141 199,141 199,141C199,139.674 199.527,138.402 200.464,137.464C201.402,136.527 202.674,136 204,136L208,136L208,139L206,139L206,136L205,136L205,140L209,140L209,136ZM209,144L209,143L204,143L204,144L209,144ZM213,144L213,143L210,143L210,144L213,144ZM216,144L216,143L215,143L215,144L216,144ZM218,144L218,143L217,143L217,144L218,144ZM225,144L225,143L222,143L222,144L225,144ZM230,142L230,141L200,141L200,142L230,142ZM221,140L221,136L220,136L220,139L211,139L211,136L210,136L210,140L221,140ZM226,140L226,136L225,136L225,139L223,139L223,136L222,136L222,140L226,140Z" />
  </g>
  </svg>
}

class Transitioner extends Component {
  componentWillEnter (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 0.5, {z: 100, rotationY:0, opacity: 0, transformPerspective:200}, {z: 0, rotationY:0, opacity: 1, transformPerspective:200, onComplete: callback});
  }
  componentWillLeave (callback) {
    const el = findDOMNode(this);
    TweenMax.fromTo(el, 0.5, {z: 0, rotationY:0, opacity: 1, transformPerspective:200}, {z: -100, rotationY:0, opacity: 0, transformPerspective:200, onComplete: callback});
  }
}
class TorpedoTube extends Transitioner {
  render(){
    const {torpedoState, torpedoType, updateScreen, unloadTorpedo, fireTorpedo} = this.props;
    return <div style={{position: 'absolute', width: '100%', height: '100%'}}>
    <div className="torpedoButton">
    {torpedoState === 'none' ?
    <Button block color="info" onClick={updateScreen.bind(this, 'TorpedoPick')}>Load Torpedo</Button>
    : <div>
    <Button block color="warning" onClick={unloadTorpedo}>Unload Torpedo</Button>
    <Button block color="danger" onClick={fireTorpedo}>Fire Torpedo</Button>
    </div>
  }
  </div>
  <Torpedo state={torpedoState} type={torpedoType} />
  <img role="presentation" draggable="false" src="/js/images/torpedo/torpedo.svg" />
  </div>
}
}

class TorpedoPick extends Transitioner {
  render() {
    const torpedoWidth = 100;
    const {updateScreen, loadTorpedo} = this.props;
    const types = ['photon','quantum','probe','probe','probe','other','other','other'];
    return <div style={{position: 'absolute', width: '100%', height: '100%'}}>
    <div className="torpedoPickScroll">
    <div className="torpedoPicker"  style={{width: types.length * torpedoWidth}}>
    {
      types.map((t,i) => {
        const img = require(`./torpedos/${t}.svg`);
        return <div key={t + i} onClick={loadTorpedo.bind(this, t)} className="torpedoPick" style={{width: torpedoWidth}}>
        <img draggable="false"  role="presentation" src={img} />
        {t}
        </div>
      })
    }
    </div>
    </div>
    <Button block color="warning" onClick={updateScreen.bind(this, 'TorpedoTube')}>Cancel</Button>
    </div>
  }
}



