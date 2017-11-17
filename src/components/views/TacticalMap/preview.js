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
    if (!this.dragging) {
      this.setState({
        location: nextProps.location
      });
    }
  }
  mouseDown = evt => {
    this.dragging = true;
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
    const { icon, id, objectId } = this.props;
    return (
      <Asset asset={icon}>
        {({ src }) => (
          <div
            className={"tactical-icon"}
            style={{
              transform: `translate(${location.x * 100}%, ${location.y * 100}%)`
            }}
          >
            <div className="image-holder" onMouseDown={this.mouseDown}>
              {objectId === id && (
                <div className="select-loc">
                  <img draggable={false} src={require("./cornerLoc.svg")} />
                  <img draggable={false} src={require("./cornerLoc.svg")} />
                  <img draggable={false} src={require("./cornerLoc.svg")} />
                  <img draggable={false} src={require("./cornerLoc.svg")} />
                </div>
              )}
              <img draggable={false} src={src} />
            </div>
          </div>
        )}
      </Asset>
    );
  }
}

export default ({
  layers,
  selectObject,
  objectId,
  updateObject,
  removeObject
}) => {
  return (
    <div className="tactical-map-view">
      {layers.map(l => {
        const Comp = layerComps[l.type];
        return (
          <div key={l.id} className="tactical-map-layer">
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
};
