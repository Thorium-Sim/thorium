import React, { Component } from "react";
import PathLine from "./PathLine";
import { Asset } from "../../../../helpers/assets";
import TacticalIcon from "./TacticalIcon";
import Selection from "./select";
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
    state = { flash: false, locations: null, movements: {} };
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
    selectionChange = selectedChildren => {
      this.setState({
        selected: Object.keys(selectedChildren).filter(c => selectedChildren[c])
      });
    };
    moveMultiple = (evt, bounds) => {
      const { selected, movements } = this.state;
      const { items, speed } = this.props;
      if (evt === "cancel") {
        Object.keys(movements).forEach(m => {
          const item = items.find(i => i.id === m);
          if (!item) return;
          let { x, y, z } = item.destination;
          const movement = movements[m];
          x = x + movement.x;
          y = y + movement.y;
          if (x > 1 || x < 0 || y > 1 || y < 0) {
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
        <div className="tactical-objects">
          <Selection onSelectionChange={this.selectionChange}>
            {items.map(i => (
              <TacticalIcon
                key={i.id}
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
  },
  path: class Path extends Component {
    constructor(props) {
      super(props);
      this.state = {
        locations: props.paths.reduce((prev, next) => {
          return {
            ...prev,
            [next.id]: {
              start: next.start,
              end: next.end,
              c1: next.c1,
              c2: next.c2
            }
          };
        }, {})
      };
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        locations: nextProps.paths.reduce((prev, next) => {
          return {
            ...prev,
            [next.id]: {
              start: next.start,
              end: next.end,
              c1: next.c1,
              c2: next.c2
            }
          };
        }, {})
      });
    }
    mousedown = (id, which) => {
      this.setState({
        movingPath: id,
        movingNode: which
      });
      document.addEventListener("mouseup", this.mouseup);
      document.addEventListener("mousemove", this.mousemove);
    };
    mouseup = () => {
      const { locations, movingPath, movingNode } = this.state;
      const { x, y, z } = locations[movingPath][movingNode];
      const {
        updatePath = () => {},
        removePath = () => {},
        paths
      } = this.props;
      const path = paths.find(p => p.id === movingPath);
      if (
        (movingNode === "start" || movingNode === "end") &&
        (x > window.innerWidth || x < 0 || y > window.innerHeight || y < 0)
      ) {
        // Remove the path
        removePath(movingPath);
      } else {
        updatePath(this.state.movingNode, { x, y, z }, path);
      }
      this.setState({
        movingPath: null,
        movingNode: null
      });
      document.removeEventListener("mouseup", this.mouseup);
      document.removeEventListener("mousemove", this.mousemove);
    };
    mousemove = e => {
      const { width, height } = document
        .querySelector(".tactical-map-view")
        .getBoundingClientRect();
      const { movingPath, movingNode, locations } = this.state;
      this.setState({
        locations: {
          ...locations,
          [movingPath]: {
            ...locations[movingPath],
            [movingNode]: {
              x:
                locations[movingPath][movingNode].x +
                e.movementX * (window.innerWidth / width),
              y:
                locations[movingPath][movingNode].y +
                e.movementY * (window.innerHeight / height),
              z: 0
            }
          }
        }
      });
    };
    render() {
      const { locations } = this.state;
      const { paths, layerId } = this.props;
      if (!locations) return;
      return (
        <svg className="path-holder">
          {paths.map(p => (
            <PathLine
              key={p.id}
              {...p}
              {...locations[p.id]}
              selected={layerId}
              onMouseDown={this.mousedown}
            />
          ))}
        </svg>
      );
    }
  }
};

export default layerComps;
