import React, { Component } from "react";

export default class ReactorActivationConfig extends Component {
  render() {
    let { updateData } = this.props;
    const data = JSON.parse(this.props.data);

    return (
      <div>
        <label>Output</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={data.output || 0}
          onMouseUp={e =>
            updateData(JSON.stringify({ output: e.target.value }))
          }
        />
      </div>
    );
  }
}
