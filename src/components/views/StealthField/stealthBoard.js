import React, { Component } from "react";
import StealthBars from "./stealthBars";

const limit = 0.05;
const factor = 0.005;

export default class StealthBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: props.systems || null
    };
    this.looping = true;
    this.loop = this.loop.bind(this);
    this.frame = window.requestAnimationFrame(this.loop);
  }
  componentDidMount() {
    this.looping = true;
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frame);
    this.looping = false;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.systems && !this.state.systems) {
      // We only need to initialize the state
      this.setState({
        systems: nextProps.systems.filter(
          s => typeof s.stealthFactor === "number"
        )
      });
    }
  }
  loop(currentTime) {
    if (this.looping) {
      this.frame = window.requestAnimationFrame(this.loop);
    } else {
      return;
    }
    if (Math.round(currentTime) % 2 !== 0) return;
    if (!this.props.systems) return;
    const systemsState = this.state.systems;
    const systemsProps = this.props.systems;
    if (!systemsState || !systemsProps) return;
    this.setState({
      systems: systemsState
        .filter(s => typeof s.stealthFactor === "number")
        .map(s => {
          const propSys = systemsProps.find(ps => ps.id === s.id);
          let sign = Math.sign(Math.random() - 0.5);
          if (Math.abs(s.stealthFactor - propSys.stealthFactor) > limit) {
            sign = -1 * Math.sign(s.stealthFactor - propSys.stealthFactor);
          }
          let stealthFactor = Math.min(
            1,
            Math.max(0, s.stealthFactor + sign * Math.random() * factor)
          );

          return {
            id: s.id,
            name: s.name,
            type: s.type,
            stealthFactor
          };
        })
    });
  }
  render() {
    const { stealthField } = this.props;
    const { systems } = this.state;
    return (
      <div className="stealth-board">
        {[StealthBars]
          .filter(() => stealthField.state)
          .map(Comp => <Comp key={Comp.name} systems={systems} />)}
      </div>
    );
  }
}
