import React, { Component } from "react";

export default class ReactorActivationConfig extends Component {
  constructor(props) {
    super(props);
    const data = JSON.parse(props.data);

    this.state = {
      startOutput: parseFloat(data.startOutput),
      endOutput: parseFloat(data.endOutput),
      duration: parseFloat(data.duration)
    };
  }
  render() {
    let { updateData } = this.props;
    return (
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.startOutput}
          onChange={evt =>
            this.setState({
              startOutput: evt.target.value
            })}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.endOutput}
          onChange={evt =>
            this.setState({
              endOutput: evt.target.value
            })}
        />
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={this.state.duration}
          onChange={evt =>
            this.setState({
              duration: evt.target.value
            })}
        />
        <button onClick={() => updateData(JSON.stringify(this.state))}>
          Trigger
        </button>
      </div>
    );
  }
}
