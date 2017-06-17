import React, {Component} from 'react';
import ReactKonva from 'react-konva';
import {parse as parsePath} from 'extract-svg-path';
import './style.scss';
import { findDOMNode } from 'react-dom';

const {
  Layer,
  Line,
  Stage,
  Path,
  Rect,
  Group
} = ReactKonva;

const speedLimit = 20;
const speedConstant1 = 2.5 / 200;
const speedConstant2 = 1.5 / 200;
const crosshairPath = 'M0,77.03L15,77.03L15,52.03L52.5,15L77.5,15L77.5,0L57.5,0L50,10L10,50L0,57.03L0,77.03Z';

class TargetingGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {targets:[]}
    this.refreshTargets(props);
  }
  componentWillReceiveProps(nextProps) {
    this.refreshTargets(nextProps);
  }
  componentDidMount() {
    requestAnimationFrame(() => {
      this.loop()
    });
    const el = findDOMNode(this);
    this.height = el.getBoundingClientRect().height;
  }
  refreshTargets(nextProps){
    const stateTargets = this.state.targets;
    const {width} = this.props.dimensions;
    const height = width * 3/4;
    Promise.all(nextProps.targets.map(t => {
      const stateTarget = stateTargets.find(s => s.id === t.id);
      if (stateTarget){
        //The target has a target in the state already;
        //Transfer over the information necessary.
        if (t.icon === stateTarget.icon){
          return Promise.resolve({
            id: t.id,
            data: stateTarget.data,
            icon: t.icon,
            speed: t.speed,
            fill: stateTarget.fill,
            x: stateTarget.x,
            y: stateTarget.y,
            speedX: stateTarget.speedX,
            speedY: stateTarget.speedY,
            scale: t.size,
            hover: stateTarget.hover,
            targeted: t.targeted
          })
        } else {
          return fetch(t.iconUrl).then((res) => res.text())
          .then((svg) => parsePath(svg))
          .then((data) => {
            return Promise.resolve({
              id: t.id,
              data: data,
              icon: t.icon,
              speed: t.speed,
              fill: stateTarget.fill,
              x: stateTarget.x,
              y: stateTarget.y,
              speedX: stateTarget.speedX,
              speedY: stateTarget.speedY,
              scale: t.size,
              hover: stateTarget.hover,
              targeted: t.targeted
            })
          });
        }
      } else {
        //Get the SVG data
        return fetch(t.iconUrl).then((res) => res.text())
        .then((svg) => parsePath(svg))
        .then((data) => {
          //Return the new target; put it in a random place.
          return Promise.resolve({
            id: t.id,
            data,
            icon: t.icon,
            speed: t.speed,
            fill: '#0f0',
            x: Math.random() * width,
            y: Math.random() * height,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            scale: t.size,
            hover: 0,
            targeted: t.targeted
          })
        })
      }
    })
    ).then(newTargets => {
      this.setState({
        targets: newTargets
      })
    });
  }
  loop() {
    const {width} = this.props.dimensions;
    const height = width * 3/4;
    const {
      targets
    } = this.state;
    const newTargets = targets.map(({
      id,
      x,
      y,
      icon,
      speedX,
      speedY,
      scale,
      fill,
      data,
      hover,
      targeted
    }) => {
      const limit = {x: width - 32, y: height - 32};
      const speed = {x: speedX, y: speedY};
      const loc = {x, y};
      ['x','y'].forEach(which => {
        if (speed[which] / speedLimit > .99) speed[which] = speedLimit - 1;
        if (speed[which] / speedLimit < -.99) speed[which] = (speedLimit - 1) * -1;
        if (loc[which] > limit[which]) {
          loc[which] = limit[which] - 1;
          if (speed[which] > 0) speed[which] = 0;
        }
        if (loc[which] < 0) {
          loc[which] = 1;
          if (speed[which] < 0) speed[which] = 0;
        }
        if (Math.random() * limit[which] < loc[which]){
          speed[which] += (speedLimit - Math.abs(speed[which])) / speedLimit * -1 * Math.random() * speedConstant1;
          speed[which] += (limit[which] - Math.abs(loc[which]))/limit[which] * -1 * Math.random() * speedConstant2;
        } else {
          speed[which] += (speedLimit - Math.abs(speed[which])) / speedLimit * Math.random() * speedConstant1;
          speed[which] += (width - Math.abs(loc[which]))/limit[which] * Math.random() * speedConstant2;
        }
        loc[which] = Math.min(limit[which], Math.max(0, loc[which] + speed[which]));
      })

      return {id, x: loc.x, y: loc.y, fill, speedX: speed.x, speedY: speed.y, data, icon, scale, hover, targeted};
    })
    this.setState({
      targets: newTargets
    });
    // Next frame
    requestAnimationFrame(() => {
      this.loop()
    });
  }
  _mouseMove(id, e){
    const {targets} = this.state;
    if (this.props.targetedContact) {
      this.setState({
        targets: targets.map(t => {
          t.hover = 0;
          return t;
        })
      })
      return;
    };
    targets.forEach(t => {
      if (t.id === id){
        t.hover += 1;
        if (t.hover >= 100) {
          this.props.targetContact(t.id)
        }
      }
      return t;
    })
  }
  render() {
    const {width} = this.props.dimensions;
    let targetedContact;
    if (this.props.targetedContact){
      targetedContact = this.state.targets.find(t => t.id === this.props.targetedContact.id);
    }
    // Manually get the height
    const height = this.height;
    return <div className="targetArea">
    <Stage width={width} height={height}>
    <Layer>

    <Rect
    x={0}
    y={0}
    width={width}
    height={height}
    stroke={'green'}
    strokeWidth={2} />
    {
      Array(Math.round(width/16)).fill(width/16).map((x,i) => {
        return <Line
        key={`line-vertical-${i}`}
        stroke={'green'}
        strokeWidth={1}
        dash={[5, 5]}
        points={[x*i, 0, x*i, height]} />
      })
    }
    {
      Array(Math.round(width/16)).fill(width/16).map((y,i) => {
        return <Line
        key={`line-horizontal-${i}`}
        stroke={'green'}
        strokeWidth={1}
        dash={[5, 5]}
        points={[0, y*i, width, y*i]} />
      })
    }
    {
      this.state.targets.map(t => {
        return <Path 
        key={t.id}
        onMousemove={this._mouseMove.bind(this, t.id)}
        data={t.data}
        x={t.x}
        y={t.y}
        fill={t.targeted ? '#f00' : '#0f0'}
        scale={{
          x:t.scale,
          y:t.scale
        }} />
      })
    }
    {
      targetedContact && <Group
      x={targetedContact.x}
      y={targetedContact.y}>
      <Path data={crosshairPath}
      fill='#f00'
      x={-13}
      y={-13}
      scale={{
        x: 0.3,
        y: 0.3
      }} />
      <Path data={crosshairPath}
      fill='#f00'
      x={43}
      y={-13}
      rotation={90}
      scale={{
        x: 0.3,
        y: 0.3
      }} />
      <Path data={crosshairPath}
      fill='#f00'
      x={43}
      y={43}
      rotation={180}
      scale={{
        x: 0.3,
        y: 0.3
      }} />
      <Path data={crosshairPath}
      fill='#f00'
      x={-13}
      y={43}
      rotation={270}
      scale={{
        x: 0.3,
        y: 0.3
      }} />
      </Group>}
      </Layer>
      </Stage>
      </div>
    }
  }

  export default TargetingGrid;