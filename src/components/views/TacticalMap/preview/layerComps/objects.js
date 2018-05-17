import React, { Component } from "react";
import TacticalIcon from "./TacticalIcon";
import Selection from "./select";
import * as THREE from "three";

function distance3d(coord2, coord1) {
  const { x: x1, y: y1, z: z1 } = coord1;
  let { x: x2, y: y2, z: z2 } = coord2;
  return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2 + (z2 -= z1) * z2);
}

class Objects extends Component {
  state = { flash: false, locations: null, movements: {} };
  flashing = true;
  loopInterval = 30;
  componentDidMount() {
    this.looping = true;
    this.flashLoop();
    this.moveLoop();
    document.addEventListener("keydown", this.deleteKey);
  }
  componentWillUnmount() {
    this.looping = false;
    document.removeEventListener("keydown", this.deleteKey);
  }
  deleteKey = e => {
    if (e.which === 8 && e.target instanceof window.HTMLBodyElement) {
      e.preventDefault();
      const selected = this.state.selected || [];
      const objectId = this.props.objectId || null;
      []
        .concat(selected)
        .concat(objectId)
        .filter(i => i)
        .forEach(c => this.props.removeObject(c, this.props.id));
    }
  };

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
  selectionChange = selectedChildren => {
    this.setState({
      selected: Object.keys(selectedChildren).filter(c => selectedChildren[c])
    });
  };
  moveMultiple = (evt, bounds) => {
    const { selected, movements } = this.state;
    const { items, speed } = this.props;
    const canvasEl = document.getElementById(
      `tactical-objects-${this.props.id}`
    );
    const canvasBounds = canvasEl.getBoundingClientRect();
    if (evt === "cancel") {
      Object.keys(movements).forEach(m => {
        const item = items.find(i => i.id === m);
        if (!item) return;
        let { x, y, z } = item.destination;
        const movement = movements[m];
        x = x + movement.x;
        y = y + movement.y;

        const el = document.getElementById(`tactical-icon-${item.id}`);
        const elBounds = el.getBoundingClientRect();
        const leftBound =
          -1 *
          (elBounds.width / item.size + canvasBounds.left) /
          canvasBounds.width;
        const rightBound = 1 + 20 / canvasBounds.width;
        const topBound =
          -1 *
          (elBounds.height / item.size + canvasBounds.top) /
          canvasBounds.height;
        const bottomBound = 1 + 20 / canvasBounds.height;
        if (
          x > rightBound ||
          x < leftBound ||
          y > bottomBound ||
          y < topBound
        ) {
          this.props.removeObject();
        } else {
          this.props.updateObject("destination", { x, y, z }, item, speed);
        }
      });
      this.setState({
        movements: {}
      });
    } else {
      const x = evt.movementX / bounds.width;
      const y = evt.movementY / bounds.height;
      this.setState({
        movements: selected.reduce((prev, next) => {
          if (!movements[next]) {
            prev[next] = { x, y, z: 0 };
          } else {
            prev[next] = {
              x: movements[next].x + x,
              y: movements[next].y + y,
              z: 0
            };
          }
          return prev;
        }, {})
      });
    }
  };
  render() {
    const {
      id,
      items,
      selectObject,
      objectId,
      updateObject,
      removeObject,
      core
    } = this.props;
    const { flash, locations, selected = [], movements = {} } = this.state;
    if (!locations) return null;
    return (
      <div className="tactical-objects" id={`tactical-objects-${id}`}>
        <Selection onSelectionChange={this.selectionChange}>
          {items.map(i => (
            <TacticalIcon
              key={i.id}
              layerId={id}
              {...i}
              core={core}
              moveMultiple={selected.length ? this.moveMultiple : () => {}}
              movement={movements[i.id]}
              location={locations[i.id]}
              flashing={flash}
              selectObject={selectObject}
              objectId={objectId}
              updateObject={updateObject}
              removeObject={removeObject}
            />
          ))}
        </Selection>
      </div>
    );
  }
}

export default Objects;
