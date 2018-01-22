import React, { Component } from "react";

class OR extends Component {
  constructor(props) {
    super(props);
    const { inputs = [], update = () => {} } = this.props;
    update(
      inputs.reduce((prev, next) => {
        if (prev === 1) return 1;
        return Math.round(next) >= 1 ? 1 : 0;
      }, 0)
    );
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.inputs) === JSON.stringify(this.props.inputs))
      return;
    const { inputs = [], update = () => {} } = nextProps;
    update(
      inputs.reduce((prev, next) => {
        if (prev === 1) return 1;
        return Math.round(next) >= 1 ? 1 : 0;
      }, 0)
    );
  }
  render() {
    const {
      page,
      edit,
      connecting,
      onMouseDown,
      id,
      startConnecting
    } = this.props;
    if (!edit) return null;
    return (
      <div>
        {page && connecting && <div className="input" data-component={id} />}
        <div className="and" onMouseDown={onMouseDown}>
          OR
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

export default OR;
