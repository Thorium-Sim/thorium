import React, { Component } from "react";
import PanZoomElement from "./PanZoomElement";
import compStyles from "../compStyles.module.css";
import Comp from "./Comp";
import Connection from "./Connection";
import uuid from "../helpers/uuid";

class InnerCanvas extends Component {
  state = { draggingConnection: null, nodes: {} };
  dragConnection = (id, nodeId, position, which, type) => {
    document.addEventListener("mousemove", this.draggingConnection);
    document.addEventListener("mouseup", this.dropConnection);
    this.setState({
      draggingConnection: { id, nodeId, position, which, type }
    });
  };
  draggingConnection = e => {
    const { draggingConnection } = this.state;
    const { position } = draggingConnection;
    this.setState({
      draggingConnection: {
        ...draggingConnection,
        position: { x: position.x + e.movementX, y: position.y + e.movementY }
      }
    });
  };
  dropConnection = e => {
    const { id, nodeId, which, type } = this.state.draggingConnection;
    if (e.target.dataset.connector === "true") {
      if (!e.target.dataset[which]) {
        const data = { ...e.target.dataset };
        if (type === data.type || type === "Any" || data.type === "Any") {
          if (which === "input") {
            this.props.addConnection({
              id: uuid(),
              from: { id: data.id, nodeId: data.node },
              to: { id, nodeId }
            });
          } else {
            this.props.addConnection({
              id: uuid(),
              from: { id, nodeId },
              to: { id: data.id, nodeId: data.node }
            });
          }
        }
      }
    }
    document.removeEventListener("mousemove", this.draggingConnection);
    document.removeEventListener("mouseup", this.dropConnection);
    this.setState({
      draggingConnection: null
    });
  };
  updateNodePositions = newNodes => {
    this.setState(({ nodes }) => ({
      nodes: { ...nodes, ...newNodes }
    }));
  };
  render() {
    const { draggingConnection, nodes } = this.state;
    const {
      dimensions,
      view: { x, y, scale },
      view,
      reset,
      values,
      updatePan,
      components,
      connections,
      removeConnection,
      updateSelectedComponent,
      selectedComponent,
      config,
      snapping = false
    } = this.props;
    return (
      <PanZoomElement
        reset={reset}
        width={dimensions.width}
        height={dimensions.height}
        onUpdate={updatePan}
      >
        {components.map(c => {
          return (
            <Comp
              key={c.id}
              {...c}
              {...this.props}
              config={config[c.id]}
              updateNodePositions={this.updateNodePositions}
              beginDrag={this.dragConnection}
              value={values[c.id]}
              onClick={() => updateSelectedComponent(c.id)}
              selected={selectedComponent === c.id}
              snapping={snapping}
            />
          );
        })}
        <svg
          className={compStyles.connections}
          style={{
            transform: `translate(${-1 *
              (dimensions.left / scale - x)}px, ${-1 *
              (dimensions.top / scale - y)}px)`
          }}
        >
          {draggingConnection && (
            <Connection
              dragging
              nodes={nodes}
              view={view}
              from={draggingConnection}
              position={draggingConnection.position}
              updateNodePositions={this.updateNodePositions}
            />
          )}
          {connections.map(c => (
            <Connection
              key={`${c.from.id}-${c.from.node}-${c.to.id}-${c.to.node}`}
              nodes={nodes}
              view={view}
              remove={removeConnection}
              {...c}
            />
          ))}
        </svg>
      </PanZoomElement>
    );
  }
}

export default InnerCanvas;
