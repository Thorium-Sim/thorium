import React, { Component } from "react";

class NOT extends Component {
  constructor(props) {
    super(props);
    const { inputs = [], update = () => {} } = this.props;
    update(Math.round(inputs[0]) === 1 ? 0 : 1);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.inputs) === JSON.stringify(this.props.inputs))
      return;
    const { inputs = [], update = () => {} } = nextProps;
    update(Math.round(inputs[0]) === 1 ? 0 : 1);
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
          NOT
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

export default NOT;
