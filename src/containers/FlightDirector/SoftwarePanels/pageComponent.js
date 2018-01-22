import React, { Component } from "react";
import * as Components from "./components";

class PageComponent extends Component {
  mouseDown = evt => {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    const { update, id, x, y } = this.props;
    update({
      id,
      x: x + evt.movementX / window.innerWidth,
      y: y + evt.movementY / window.innerHeight
    });
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const { x, y, remove } = this.props;
    if (x < 0 || x > 1 || y < 0 || y > 1) remove();
  };
  render() {
    const {
      id,
      x,
      y,
      level,
      update,
      component,
      connections,
      connecting,
      startConnecting,
      edit,
      draggingCable,
      cables,
      components,
      dragCable
    } = this.props;
    const Comp = Components[component];
    return (
      <div
        className={"componentInstance"}
        style={{
          transform: `translate(${x * 100 - 0.5}%, ${y * 100 - 0.5}%)`
        }}
      >
        <Comp
          level={level}
          connecting={connecting}
          id={id}
          page
          edit={edit}
          cables={cables}
          draggingCable={draggingCable}
          components={components}
          startConnecting={startConnecting}
          inputs={connections.map(c => c.level)}
          update={level => update({ level, id })}
          onMouseDown={edit ? this.mouseDown : () => {}}
          dragCable={dragCable}
        />
      </div>
    );
  }
}

export default PageComponent;
