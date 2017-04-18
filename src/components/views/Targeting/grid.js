import React, {Component} from 'react';
import ReactKonva from 'react-konva';
import './style.scss';

const {
  Layer,
  Line,
  Stage,
  Path,
  Rect
} = ReactKonva;

const speedLimit = 20;
const speedConstant1 = 2.5 / 200;
const speedConstant2 = 1.5 / 200;


class TargetingGrid extends Component {
  constructor(props) {
    super(props);

    const {width} = props.dimensions;
    const height = width * 3/4;
    this.state = {
      targets: [{
        id: "b",
        data: "M15.27,22.479L13.944,19.718L14.654,19.718L13.33,18.061L7.174,18.189L6.076,17.091L7.987,17.091L9.099,14.102L4.557,14.033L0.677,11.872L2.331,11.872L0,9.935L11.626,11.297L14.044,13.715L17.941,13.715L20.359,11.297L31.985,9.935L29.654,11.872L31.308,11.872L27.428,14.033L22.885,14.103L23.998,17.091L25.908,17.091L24.811,18.189L18.655,18.061L17.331,19.718L18.041,19.718L16.751,22.479L15.27,22.479L15.27,22.479",
        fill: '#0f0',
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        scale: 1,
        hover: 0
      }, {
        id: "a",
        data: "M15.27,22.479L13.944,19.718L14.654,19.718L13.33,18.061L7.174,18.189L6.076,17.091L7.987,17.091L9.099,14.102L4.557,14.033L0.677,11.872L2.331,11.872L0,9.935L11.626,11.297L14.044,13.715L17.941,13.715L20.359,11.297L31.985,9.935L29.654,11.872L31.308,11.872L27.428,14.033L22.885,14.103L23.998,17.091L25.908,17.091L24.811,18.189L18.655,18.061L17.331,19.718L18.041,19.718L16.751,22.479L15.27,22.479L15.27,22.479",
        fill: '#0f0',
        x: Math.random() * width,
        y: Math.random() * height,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        scale: 1,
        hover: 0
      }]
    }
  }
  componentDidMount() {
    requestAnimationFrame(() => {
      this.loop()
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
      speedX,
      speedY,
      scale,
      fill,
      data,
      hover
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

      return {id, x: loc.x, y: loc.y, fill, speedX: speed.x, speedY: speed.y, data, scale, hover};
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
    this.setState({
      targets: targets.map(t => {
        if (t.id === id){
          t.hover += 1;
          if (t.hover >= 100) {
            t.fill = 'red';
          }
        } else {
          t.hover = 0;
          t.fill = "#0f0";
        }
        return t;
      })
    })
  }
  render() {
    const {width} = this.props.dimensions;
    const height = width * 3/4;
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
    {Array(Math.round(width/16)).fill(width/16).map((x,i) => {
      return <Line
      key={`line-vertical-${i}`}
      stroke={'green'}
      strokeWidth={1}
      dash={[5, 5]}
      points={[x*i, 0, x*i, height]} />
    })
  }
  {Array(Math.round(width/16)).fill(width/16).map((y,i) => {
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
    fill={t.fill}
    scale={{
      x:t.scale,
      y:t.scale
    }} />
  })
}
</Layer>
</Stage>
</div>
}
}

export default TargetingGrid;