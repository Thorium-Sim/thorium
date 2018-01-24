import React, { Component } from "react";
import "./cable.css";
// Output true if connected to another cable of any kind
class CableOutput extends Component {
  constructor(props) {
    super(props);
    const { components = [], cables = [], update = () => {}, id } = props;
    const cable = cables.find(c => c.components.indexOf(id) > -1);
    const componentId = cable ? cable.components.find(c => c !== id) : null;
    const component = componentId
      ? components.find(c => c.id === componentId)
      : null;
    update(component ? component.level || 0 : 0);
  }
  componentWillReceiveProps(nextProps) {
    /*if (JSON.stringify(nextProps.cables) === JSON.stringify(this.props.cables))
      return;*/
    const {
      components = [],
      cables = [],
      update = () => {},
      id,
      level
    } = nextProps;
    const cable = cables.find(c => c.components.indexOf(id) > -1);
    const componentId = cable ? cable.components.find(c => c !== id) : null;
    const component = componentId
      ? components.find(c => c.id === componentId)
      : null;
    const newLevel = component ? component.level || 0 : 0;
    if (newLevel === level) return;
    update(newLevel);
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

export default CableOutput;
