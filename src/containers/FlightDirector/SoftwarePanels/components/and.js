import React, { Component } from "react";

class AND extends Component {
  constructor(props) {
    super(props);
    const { inputs = [], update = () => {} } = this.props;
    update(
      inputs.reduce((prev, next) => {
        if (prev === 0) return 0;
        return Math.round(next) >= 1 ? 1 : 0;
      }, 1)
    );
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.inputs) === JSON.stringify(this.props.inputs))
      return;
    const { inputs = [], update = () => {} } = nextProps;
    update(
      inputs.reduce((prev, next) => {
        if (prev === 0) return 0;
        return Math.round(next) >= 1 ? 1 : 0;
      }, 1)
    );
  }
  render() {
    const {
      page,
      connecting,
      onMouseDown,
      id,
      startConnecting,
      edit
    } = this.props;
    if (!edit) return null;
    return (
      <div>
        {page && connecting && <div className="input" data-component={id} />}

        <div className="and" onMouseDown={onMouseDown}>
          AND
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

export default AND;
