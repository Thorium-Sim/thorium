import React, { Component } from "react";
import { Asset } from "../../../helpers/assets";
import * as THREE from "three";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

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
  objects: class extends Component {
    state = { flash: false, locations: null };
    flashing = true;
    loopInterval = 30;
    componentDidMount() {
      this.looping = true;
      this.flashLoop();
      this.moveLoop();
    }
    componentWillUnmount() {
      this.looping = false;
    }
    flashLoop = () => {
      if (!this.looping) return;
      this.setState({
        flash: !this.state.flash
      });
      if (this.state.flash) {
        setTimeout(this.flashLoop, 250);
      } else {
        setTimeout(this.flashLoop, 500);
      }
    };
    moveLoop = () => {
      if (!this.looping) return;
      setTimeout(this.moveLoop, this.loopInterval);
      this.setState({
        locations: this.props.items.reduce((prev, next) => {
          const { destination, speed, id } = next;
          const location = this.state.locations
            ? this.state.locations[id] || next.location
            : next.location;
          if (
            destination.x === location.x &&
            destination.y === location.y &&
            destination.z === location.z
          ) {
            prev[id] = destination;
          } else {
            prev[id] = this.moveContact(
              destination,
              location,
              speed,
              this.props.frozen,
              this.loopInterval
            );
          }
          return prev;
        }, {})
      });
    };
    moveContact = (dest, loc, speed, frozen, i) => {
      if (speed > 100) return dest;
      if (speed === 0 || frozen) return loc;
      if (distance3d(dest, loc) < 0.005) {
        return dest;
      }
      const locVec = new THREE.Vector3(loc.x, loc.y, loc.z);
      const destVec = new THREE.Vector3(dest.x, dest.y, dest.z);
      const v = destVec
        .sub(locVec)
        .normalize()
        .multiplyScalar(speed);
      const newLoc = {
        x: loc.x + Math.round(v.x / (10000 / i) * 10000) / 10000,
        y: loc.y + Math.round(v.y / (10000 / i) * 10000) / 10000,
        z: loc.z + Math.round(v.z / (10000 / i) * 10000) / 10000
      };
      return newLoc;
    };
    render() {
      const {
        items,
        selectObject,
        objectId,
        updateObject,
        removeObject,
        core
      } = this.props;
      const { flash, locations } = this.state;
      if (!locations) return null;
      return (
        <div className="tactical-objects">
          {items.map(i => (
            <TacticalIcon
              key={i.id}
              {...i}
              core={core}
              location={locations[i.id]}
              flashing={flash}
              selectObject={selectObject}
              objectId={objectId}
              updateObject={updateObject}
              removeObject={removeObject}
            />
          ))}
        </div>
      );
    }
  }
};

class TacticalIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: props.destination
    };
    this.dragging = false;
  }
  componentWillReceiveProps(nextProps) {
    if (!this.dragging) {
      this.setState({
        destination: nextProps.destination
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
    const { x, y, z } = this.state.destination;
    if (x > 1 || x < 0 || y > 1 || y < 0) {
      this.props.removeObject();
    } else {
      this.props.updateObject("destination", { x, y, z });
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
      destination: Object.assign({}, this.state.destination, { x, y })
    });
  };
  render() {
    const { destination } = this.state;
    const {
      icon,
      id,
      location,
      objectId,
      size,
      label,
      font,
      fontColor,
      fontSize,
      flash,
      flashing,
      core
    } = this.props;
    if (icon) {
      return (
        <Asset asset={icon}>
          {({ src }) => (
            <IconMarkup
              mouseDown={this.mouseDown}
              destination={destination}
              location={location}
              size={size}
              objectId={objectId}
              id={id}
              src={src}
              font={font}
              flash={flash}
              flashing={flashing}
              fontColor={fontColor}
              fontSize={fontSize}
              label={label}
              core={core}
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
        flash={flash}
        flashing={flashing}
        fontColor={fontColor}
        fontSize={fontSize}
        label={label}
        core={core}
      />
    );
  }
}

const IconMarkup = ({
  mouseDown,
  location,
  destination,
  size,
  objectId,
  id,
  src,
  font,
  fontColor,
  fontSize,
  label,
  flash,
  flashing,
  core
}) => [
  location ? (
    <div
      className={"tactical-icon"}
      key={`icon-location-${id}`}
      style={{
        transform: `translate(${location.x * 100}%, ${location.y * 100}%)`,
        opacity: core ? 0.5 : 1
      }}
    >
      <div
        className="image-holder"
        onMouseDown={mouseDown}
        style={{
          transform: `scale(${size})`,
          opacity: flash && flashing ? 0 : 1
        }}
      >
        {src && <img alt="icon" draggable={false} src={src} />}
        <pre
          className="icon-label"
          style={{ fontFamily: font, color: fontColor, fontSize }}
        >
          {label}
        </pre>
      </div>
    </div>
  ) : null,
  core ? (
    <div
      className={"tactical-icon"}
      key={`icon-destination-${id}`}
      style={{
        transform: `translate(${destination.x * 100}%, ${destination.y * 100}%)`
      }}
    >
      <div
        className="image-holder"
        onMouseDown={mouseDown}
        style={{
          transform: `scale(${size})`,
          opacity: flash && flashing ? 0 : 1
        }}
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
  ) : null
];
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
              "destination",
              {
                x: i.destination.x + movement.x,
                y: i.destination.y + movement.y,
                z: i.destination.z
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
      removeObject,
      core,
      frozen
    } = this.props;
    return (
      <div className="tactical-map-view">
        {layers &&
          layers.map(l => {
            const Comp = layerComps[l.type];
            return (
              <div
                key={l.id}
                className="tactical-map-layer"
                onMouseDown={() => selectObject(null)}
              >
                <Comp
                  {...l}
                  core={core}
                  frozen={frozen}
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
