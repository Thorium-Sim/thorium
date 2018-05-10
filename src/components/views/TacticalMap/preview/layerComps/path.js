import React, { Component } from "react";
import PathLine from "./PathLine";

class Path extends Component {
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
    const { updatePath = () => {}, removePath = () => {}, paths } = this.props;
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

export default Path;
