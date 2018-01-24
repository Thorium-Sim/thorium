import React, { Component } from "react";
import * as Components from "./components";

class PageComponent extends Component {
  mouseDown = evt => {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = evt => {
    const { update, id, x, y } = this.props;
    update(
      {
        id,
        x: x + evt.movementX / this.props.width,
        y: y + evt.movementY / this.props.height
      },
      true
    );
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const { id, x, y, remove, update } = this.props;
    update({ id, x, y });
    if (x < 0 || x > 1 || y < 0 || y > 1) remove();
  };
  render() {
    const {
      id,
      x,
      y,
      level,
      label,
      update,
      component,
      connections,
      connecting,
      startConnecting,
      edit,
      draggingCable,
      cables,
      components,
      dragCable,
      selectComponent,
      selected
    } = this.props;
    const Comp = Components[component];
    return (
      <div
        className={"componentInstance"}
        style={{
          transform: `translate(${x * 100 - 0.5}%, ${y * 100 - 0.5}%)`
        }}
        onClick={() => selectComponent(id)}
      >
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            textAlign: "center",
            backgroundColor: selected ? "rgba(255,0,0,0.5)" : "transparent"
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
            update={(l, noupdate) => update({ level: l, id }, noupdate)}
            onMouseDown={edit ? this.mouseDown : () => {}}
            dragCable={dragCable}
          />
          <span className="label">{label}</span>
        </div>
      </div>
    );
  }
}

export default PageComponent;
