import React, { Component } from "react";

class Ceil extends Component {
  constructor(props) {
    super(props);
    const { inputs = [], update = () => {} } = this.props;
    update(Math.ceil(inputs[0]));
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.inputs) === JSON.stringify(this.props.inputs))
      return;
    const { inputs = [], update = () => {} } = nextProps;
    update(Math.ceil(inputs[0]));
  }
  render() {
    const {
      page,
      connecting,
      onMouseDown,
      id,
      startConnecting,
      inputs,
      edit
    } = this.props;
    if (!edit) return null;
    return (
      <div>
        {page &&
          connecting &&
          inputs.length === 0 && <div className="input" data-component={id} />}
        <div className="and" onMouseDown={onMouseDown}>
          Ceil
        </div>
        {page &&
          !connecting && (
            <div
              className="output"
              onMouseDown={evt => startConnecting(evt, id)}
            />
          )}
      </div>
    );
  }
}

export default Ceil;
