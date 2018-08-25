import React, { Component } from "react";
import * as Components from "./components";

class PageComponent extends Component {
  mouseDown = evt => {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
    const dims = evt.target.getBoundingClientRect();

    this.setState({
      offsetX: evt.clientX - dims.x,
      offsetY: evt.clientY - dims.y
    });
  };
  mouseMove = evt => {
    const { update, id, snap } = this.props;
    const snapnum = snap ? 50 : 1;
    update(
      {
        id,
        x:
          (Math.round(
            (evt.clientX - this.props.left - this.state.offsetX) / snapnum
          ) /
            this.props.width) *
          snapnum,
        y:
          (Math.round(
            (evt.clientY - this.props.top - this.state.offsetY) / snapnum
          ) /
            this.props.height) *
          snapnum
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
  scaleComp = evt => {
    document.addEventListener("mousemove", this.moveScale);
    document.addEventListener("mouseup", this.endScale);
  };
  moveScale = evt => {
    function distance3d(coord2, coord1) {
      const { x: x1, y: y1, z: z1 } = coord1;
      let { x: x2, y: y2, z: z2 } = coord2;
      return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
    }

    const { update, id, x, y, width, height, left, top } = this.props;
    const x1 = {
      x: (evt.clientX - left) / width,
      y: (evt.clientY - top) / height,
      z: 0
    };
    const x2 = { x, y, z: 0 };
    update(
      {
        id,
        scale: distance3d(x1, x2) * 20
      },
      true
    );
  };
  endScale = () => {
    document.removeEventListener("mousemove", this.moveScale);
    document.removeEventListener("mouseup", this.endScale);
    const { id, scale, update } = this.props;
    update({ id, scale });
  };
  render() {
    const {
      id,
      x,
      y,
      level,
      label,
      color,
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
      selected,
      scale
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
            color={color}
            connecting={connecting}
            id={id}
            page
            edit={edit}
            cables={cables}
            draggingCable={draggingCable}
            components={components}
            startConnecting={startConnecting}
            inputs={connections}
            update={(l, noupdate) => update({ level: l, id }, noupdate)}
            onMouseDown={edit ? this.mouseDown : () => {}}
            dragCable={dragCable}
            scale={scale}
            scaleComp={this.scaleComp}
            label={label}
          />
          {component !== "Label" && <span className="label">{label}</span>}
        </div>
      </div>
    );
  }
}

export default PageComponent;
