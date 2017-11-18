import React, { Component } from "react";
import { Asset } from "../../../helpers/assets";

const layerComps = {
  grid: ({ gridCols, gridRows, color, labels }) => {
    return (
      <div className="tactical-grid">
        <div className="cols">
          {Array(gridCols)
            .fill(0)
            .map((_, i) => (
              <div key={`grid-col-${i}`} style={{ backgroundColor: color }} />
            ))}
        </div>
        <div className="rows">
          {Array(gridRows)
            .fill(0)
            .map((_, i) => (
              <div key={`grid-row-${i}`} style={{ backgroundColor: color }} />
            ))}
        </div>
        {labels && (
          <div className="labels">
            <div className="label-cols">
              {Array(gridCols + 1)
                .fill(0)
                .map((_, i) => <div key={`grid-label-col-${i}`}>{i + 1}</div>)}
            </div>
            <div className="label-rows">
              {Array(gridRows + 1)
                .fill(0)
                .map((_, i) => (
                  <div key={`grid-label-row-${i}`}>
                    {String.fromCharCode(i + 65)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  },
  image: ({ image }) => {
    return (
      <div className="tactical-image">
        <Asset asset={image}>
          {({ src }) => <img src={src} alt="Background" />}
        </Asset>
      </div>
    );
  },
  objects: ({ items, selectObject, objectId, updateObject, removeObject }) => (
    <div className="tactical-objects">
      {items.map(i => (
        <TacticalIcon
          key={i.id}
          {...i}
          selectObject={selectObject}
          objectId={objectId}
          updateObject={updateObject}
          removeObject={removeObject}
        />
      ))}
    </div>
  )
};

class TacticalIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location
    };
    this.dragging = false;
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.location);
    if (!this.dragging) {
      this.setState({
        location: nextProps.location
      });
    }
  }
  mouseDown = evt => {
    this.dragging = true;
    evt.stopPropagation();
    evt.preventDefault();
    this.props.selectObject(this.props);
    this.setState({
      targetBounds: evt.target.getBoundingClientRect()
    });
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
  };
  mouseUp = () => {
    const { x, y, z } = this.state.location;
    if (x > 1 || x < 0 || y > 1 || y < 0) {
      this.props.removeObject();
    } else {
      this.props.updateObject("location", { x, y, z });
    }
    this.dragging = false;
    this.setState({
      targetBounds: null
    });
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
  };
  mouseMove = evt => {
    const bounds = document
      .querySelector(".tactical-map-view")
      .getBoundingClientRect();
    const { targetBounds } = this.state;
    const x =
      (evt.clientX - targetBounds.width / 4 - bounds.left) / bounds.width;
    const y =
      (evt.clientY - targetBounds.height / 4 - bounds.top) / bounds.height;
    this.setState({
      location: Object.assign({}, this.state.location, { x, y })
    });
  };
  render() {
    const { location } = this.state;
    const {
      icon,
      id,
      objectId,
      size,
      label,
      font,
      fontColor,
      fontSize
    } = this.props;
    if (icon) {
      return (
        <Asset asset={icon}>
          {({ src }) => (
            <IconMarkup
              mouseDown={this.mouseDown}
              location={location}
              size={size}
              objectId={objectId}
              id={id}
              src={src}
              font={font}
              fontColor={fontColor}
              fontSize={fontSize}
              label={label}
            />
          )}
        </Asset>
      );
    }
    return (
      <IconMarkup
        mouseDown={this.mouseDown}
        location={location}
        size={size}
        objectId={objectId}
        id={id}
        font={font}
        fontColor={fontColor}
        fontSize={fontSize}
        label={label}
      />
    );
  }
}

const IconMarkup = ({
  mouseDown,
  location,
  size,
  objectId,
  id,
  src,
  font,
  fontColor,
  fontSize,
  label
}) => (
  <div
    className={"tactical-icon"}
    style={{
      transform: `translate(${location.x * 100}%, ${location.y * 100}%)`
    }}
  >
    <div
      className="image-holder"
      onMouseDown={mouseDown}
      style={{ transform: `scale(${size})` }}
    >
      {objectId === id && (
        <div className="select-loc">
          <img alt="loc" draggable={false} src={require("./cornerLoc.svg")} />
          <img alt="loc" draggable={false} src={require("./cornerLoc.svg")} />
          <img alt="loc" draggable={false} src={require("./cornerLoc.svg")} />
          <img alt="loc" draggable={false} src={require("./cornerLoc.svg")} />
        </div>
      )}
      {src && <img alt="icon" draggable={false} src={src} />}
      <pre
        className="icon-label"
        style={{ fontFamily: font, color: fontColor, fontSize }}
      >
        {label}
      </pre>
    </div>
  </div>
);
export default class TacticalMapPreview extends Component {
  keypress = evt => {
    const distance = 0.005;
    const ratio = 16 / 9;
    const wasd = ["KeyW", "KeyA", "KeyS", "KeyD"];
    const ijkl = ["KeyI", "KeyJ", "KeyK", "KeyL"];
    const movement = { x: 0, y: 0 };
    switch (evt.code) {
      case "KeyW":
      case "KeyI":
        movement.y = -1 * distance * ratio;
        break;
      case "KeyA":
      case "KeyJ":
        movement.x = -1 * distance;
        break;
      case "KeyS":
      case "KeyK":
        movement.y = distance * ratio;
        break;
      case "KeyD":
      case "KeyL":
        movement.x = distance;
        break;
      default:
        break;
    }
    this.props.layers.forEach(l => {
      if (l.type === "objects") {
        l.items.forEach(i => {
          if (
            (wasd.indexOf(evt.code) > -1 && i.wasd) ||
            (ijkl.indexOf(evt.code) > -1 && i.ijkl)
          ) {
            this.props.updateObject(
              "location",
              {
                x: i.location.x + movement.x,
                y: i.location.y + movement.y,
                z: i.location.z
              },
              i
            );
          }
        });
      }
    });
  };
  componentDidMount() {
    document.addEventListener("keydown", this.keypress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keypress);
  }
  render() {
    const {
      layers,
      selectObject,
      objectId,
      updateObject,
      removeObject
    } = this.props;
    return (
      <div className="tactical-map-view">
        {layers.map(l => {
          const Comp = layerComps[l.type];
          return (
            <div
              key={l.id}
              className="tactical-map-layer"
              onMouseDown={() => selectObject(null)}
            >
              <Comp
                {...l}
                selectObject={selectObject}
                objectId={objectId}
                updateObject={updateObject}
                removeObject={removeObject}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
