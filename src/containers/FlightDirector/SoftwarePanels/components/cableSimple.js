import React, { Component } from "react";
import "./cable.css";
// Output true if connected to another cable of any kind
class CableSimple extends Component {
  constructor(props) {
    super(props);
    const { cables = [], update = () => {}, id } = props;
    const cableComponents = cables.reduce((prev, next) => {
      return prev.concat(next.components);
    }, []);
    update(cableComponents.indexOf(id) > -1 ? 1 : 0);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.cables) === JSON.stringify(this.props.cables))
      return;
    const { cables = [], update = () => {}, id } = nextProps;
    const cableComponents = cables.reduce((prev, next) => {
      return prev.concat(next.components);
    }, []);
    update(cableComponents.indexOf(id) > -1 ? 1 : 0);
  }
  render() {
    const {
      connecting,
      startConnecting,
      id,
      page,
      onMouseDown,
      edit,
      draggingCable,
      cables = []
    } = this.props;
    const cableComponents = cables.reduce((prev, next) => {
      return prev.concat(next.components);
    }, []);
    return (
      <div>
        <div onMouseDown={onMouseDown}>
          <div
            data-component={id}
            className={`cable ${
              draggingCable && cableComponents.indexOf(id) === -1
                ? "hilite"
                : ""
            }`}
          />
        </div>
        {page &&
          edit &&
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

export default CableSimple;
