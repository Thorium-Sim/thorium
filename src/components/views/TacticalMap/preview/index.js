import React, { Component } from "react";
import layerComps from "./layerComps";

export default class TacticalMapPreview extends Component {
  keypress = evt => {
    const distance = 0.005;
    const ratio = 16 / 9;
    const wasd = ["KeyW", "KeyA", "KeyS", "KeyD"];
    const ijkl = ["KeyI", "KeyJ", "KeyK", "KeyL"];
    const movement = { x: 0, y: 0 };
    console.log(evt.code);
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
      case "Space":
        console.log(this);
        return;
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
      layerId,
      updateObject,
      removeObject,
      updatePath,
      removePath,
      core,
      frozen,
      speed
    } = this.props;
    return (
      <div className="tactical-map-view">
        {layers &&
          layers.map(l => {
            const Comp = layerComps[l.type];
            return (
              <div
                key={l.id}
                className={`tactical-map-layer layer-${l.type}`}
                onMouseDown={() => selectObject(null)}
              >
                <Comp
                  {...l}
                  core={core}
                  frozen={frozen}
                  selectObject={selectObject}
                  objectId={objectId}
                  layerId={layerId}
                  updateObject={updateObject}
                  removeObject={removeObject}
                  updatePath={updatePath}
                  removePath={removePath}
                  speed={speed}
                />
              </div>
            );
          })}
      </div>
    );
  }
}
