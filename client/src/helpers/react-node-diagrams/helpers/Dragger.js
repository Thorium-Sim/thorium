import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "../compStyles.module.css";
import propTypes from "prop-types";
import uuid from "./uuid";

export default class Dragger extends Component {
  state = {
    position: this.props.position
  };
  static propTypes = {
    component: propTypes.string,
    initialPosition: propTypes.object,
    view: propTypes.object
  };
  componentDidMount() {
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  }
  mouseMove = e => {
    this.setState(state => ({
      position: {
        x: state.position.x + e.movementX,
        y: state.position.y + e.movementY
      }
    }));
  };
  mouseUp = () => {
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
    const {
      position: { x: dragX, y: dragY }
    } = this.state;
    const {
      component,
      view: { x, y, scale },
      canvasDimensions
    } = this.props;
    if (!canvasDimensions) {
      this.props.removeDragger();
      throw new Error(
        "Cannot drop component without a mounted canvas element."
      );
    }
    this.props.addComponent({
      id: uuid(),
      position: {
        x: (dragX - x - canvasDimensions.left) / scale,
        y: (dragY - y - canvasDimensions.top) / scale
      },
      component: { name: component }
    });
  };
  getRenderComp() {
    const { component, registeredComponents } = this.props;

    let RenderComp = registeredComponents.find(c => c.objectKey === component);
    if (!RenderComp)
      RenderComp = registeredComponents.find(c => c.name === component);
    return RenderComp;
  }
  render() {
    const {
      view: { scale = 1 },
      registeredComponents
    } = this.props;
    const { position } = this.state;
    const Comp = this.getRenderComp();
    return ReactDOM.createPortal(
      <div
        className={`${styles.comp} ${styles["dragging-comp"]}`}
        style={{
          transform: `translate(${position.x}px, ${
            position.y
          }px) scale(${scale})`
        }}
      >
        <Comp.component
          {...Comp}
          registeredComponents={registeredComponents}
          updateValue={() => {}}
        />
      </div>,
      document.body
    );
  }
}
