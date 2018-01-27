import React, { Component } from "react";
import "./cable.css";
// Output true if connected to another cable of any kind
class CableInput extends Component {
  constructor(props) {
    super(props);
    const { inputs = [], update = () => {} } = this.props;
    update(inputs[0]);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.inputs) === JSON.stringify(this.props.inputs))
      return;
    const { inputs = [], update = () => {} } = nextProps;
    update(inputs[0]);
  }
  render() {
    const {
      connecting,
      id,
      page,
      onMouseDown,
      inputs,
      draggingCable,
      cables = [],
      scaleComp = () => {},
      scale = 1,
      edit
    } = this.props;
    const cableComponents = cables.reduce((prev, next) => {
      return prev.concat(next.components);
    }, []);
    return (
      <div style={{ transform: `scale(${scale})` }}>
        <div onMouseDown={onMouseDown}>
          {page &&
            connecting &&
            inputs.length === 0 && (
              <div className="input" data-component={id} />
            )}
          <div
            data-component={id}
            className={`cable ${
              draggingCable && cableComponents.indexOf(id) === -1
                ? "hilite"
                : ""
            }`}
          />
        </div>
        {page && edit && <div className="scale" onMouseDown={scaleComp} />}
      </div>
    );
  }
}

export default CableInput;
