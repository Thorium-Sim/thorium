import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "../helpers/debounce";
import styles from "../compStyles.module.css";

const snapGridSize = 20;
export default class Comp extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    position: PropTypes.object.isRequired,
    config: PropTypes.object,
    updateComponentPosition: PropTypes.func.isRequired,
    selected: PropTypes.bool,
    scale: PropTypes.number,
    view: PropTypes.object
  };
  constructor(props) {
    super(props);
    const { id, component, registeredComponents } = this.props;
    const RenderComp = registeredComponents.find(
      c => c.objectKey === component.name || c.name === component.name
    );
    this.allRefs = {
      ...RenderComp.inputs.reduce(
        (prev, next) => ({
          ...prev,
          [`input-${id}-${next.id}`]: React.createRef()
        }),
        {}
      ),
      ...RenderComp.outputs.reduce(
        (prev, next) => ({
          ...prev,
          [`output-${id}-${next.id}`]: React.createRef()
        }),
        {}
      )
    };
  }
  resize = debounce(this.performNodeUpdate, 500);
  componentDidMount() {
    // handle event
    window.addEventListener("resize", this.resize);
    this.performNodeUpdate();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  shouldComponentUpdate = nextProps => {
    if (
      this.props.position.x === nextProps.position.x &&
      this.props.position.y === nextProps.position.y &&
      this.props.view.x === nextProps.view.x &&
      this.props.view.y === nextProps.view.y &&
      this.props.view.scale === nextProps.view.scale &&
      this.props.value === nextProps.value &&
      // JSON.stringify(this.props.inputs) === JSON.stringify(nextProps.inputs) &&
      this.props.selected === nextProps.selected
    ) {
      return false;
    }
    return true;
  };
  performNodeUpdate = () => {
    let {
      updateNodePositions,
      view: { x, y }
    } = this.props;
    const nodes = Object.entries(this.allRefs).reduce(
      (prev, [id, { current }]) => {
        if (!current) return prev;
        const rect = current.getBoundingClientRect();
        return {
          ...prev,
          [id]: {
            x: rect.width / 2 + rect.left - x,
            y: rect.height / 2 + rect.top - y
          }
        };
      },
      {}
    );
    updateNodePositions(nodes);
  };
  mouseDown = e => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    this.moved = false;
    document.addEventListener("mousemove", this.mouseMove);
    document.addEventListener("mouseup", this.mouseUp);
  };
  mouseMove = e => {
    const {
      updateComponentPosition,
      id,
      position: { x, y },
      view: { scale }
    } = this.props;
    this.moved = true;
    updateComponentPosition(id, {
      x: x + e.movementX / scale,
      y: y + e.movementY / scale
    });
    this.performNodeUpdate();
  };
  mouseUp = e => {
    e.preventDefault();
    e.stopPropagation();
    const {
      dimensions: { left, right, top, bottom },
      id
    } = this.props;
    if (
      e.clientX > right ||
      e.clientX < left ||
      e.clientY > bottom ||
      e.clientY < top
    ) {
      this.props.removeComponent(id);
    } else {
      this.performNodeUpdate();
    }
    if (!this.moved && this.props.onClick) {
      setTimeout(() => this.props.onClick(e), 10);
    }
    document.removeEventListener("mousemove", this.mouseMove);
    document.removeEventListener("mouseup", this.mouseUp);
  };
  beginDrag = (e, ioId, io, type) => {
    e.preventDefault();
    e.stopPropagation();
    const { beginDrag, id } = this.props;
    beginDrag(id, ioId, { x: e.clientX, y: e.clientY }, io, type);
  };
  render() {
    const {
      id,
      // config = {},
      selected,
      position: { x, y },
      component,
      updateValue = () => {},
      registeredComponents,
      snapping
    } = this.props;
    const RenderComp = registeredComponents.find(
      c => c.objectKey === component.name || c.name === component.name
    );

    return (
      <div
        className={`${RenderComp.locked ? "component-locked" : ""} ${
          styles.comp
        }`}
        style={{
          transform: `translate(${
            snapping ? Math.round(x / snapGridSize) * snapGridSize : x
          }px, ${
            snapping ? Math.round(y / snapGridSize) * snapGridSize : y
          }px)`,
          position: "absolute",
          pointerEvents: RenderComp.locked ? "none" : ""
        }}
        onMouseDown={this.mouseDown}
      >
        {selected && (
          <div className="selection">
            <div className={`${styles.ul}`} />
            <div className={`${styles.ur}`} />
            <div className={`${styles.bl}`} />
            <div className={`${styles.br}`} />
          </div>
        )}
        {/* <p>{config.label}</p> */}
        <RenderComp.component
          {...this.props}
          updateValue={value => updateValue(id, value)}
        />
        <div className={`${styles.connectors} ${styles.inputs}`}>
          {RenderComp.inputs.map(i => (
            <div
              key={`input-${id}-${i.id}`}
              ref={this.allRefs[`input-${id}-${i.id}`]}
              style={{ backgroundColor: i.color }}
              title={i.title}
              className={`${styles.connector} ${styles.input}`}
              data-id={id}
              data-connector="true"
              data-input="true"
              data-node={i.id}
              data-type={i.type}
              onMouseDown={e => this.beginDrag(e, i.id, "input", i.type)}
            />
          ))}
        </div>
        <div className={`${styles.connectors} ${styles.outputs}`}>
          {RenderComp.outputs.map(i => (
            <div
              key={`output-${id}-${i.id}`}
              ref={this.allRefs[`output-${id}-${i.id}`]}
              style={{ backgroundColor: i.color }}
              title={i.title}
              className={`${styles.connector} ${styles.output}`}
              data-id={id}
              data-connector="true"
              data-output="true"
              data-node={i.id}
              data-type={i.type}
              onMouseDown={e => this.beginDrag(e, i.id, "output", i.type)}
            />
          ))}
        </div>
      </div>
    );
  }
}
