import React, { Component } from "react";
import gql from "graphql-tag";
import FileExplorer from "./fileExplorer";

export default class ObjectConfig extends Component {
  state = { draggingObject: null };
  mouseDown = (evt, container) => {
    const object =
      container.objects.find(o => o.simulatorId === "default") ||
      container.objects[0];
    document.addEventListener("mouseup", this.mouseUp);
    document.addEventListener("mousemove", this.mouseMove);
    const bounds = evt.target.getBoundingClientRect();
    this.setState({
      draggingObject: {
        x: evt.clientX,
        y: evt.clientY,
        width: bounds.width,
        height: bounds.height,
        url: object.url,
        fullPath: container.fullPath
      }
    });
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
    // Get the bounds of the preview area
    const bounds = document
      .querySelector(".tactical-map-view")
      .getBoundingClientRect();
    const { draggingObject } = this.state;

    const x = (draggingObject.x - bounds.left) / bounds.width;
    const y = (draggingObject.y - bounds.top) / bounds.height;
    if (x > 0 && x < 1 && y > 0 && y < 1) {
      const mutation = gql`
        mutation AddTacticalItem(
          $mapId: ID!
          $layerId: ID!
          $item: TacticalItemInput!
        ) {
          addTacticalMapItem(mapId: $mapId, layerId: $layerId, item: $item)
        }
      `;
      const variables = {
        mapId: this.props.tacticalMapId,
        layerId: this.props.layerId,
        item: {
          icon: draggingObject.fullPath,
          location: { x, y, z: 0 },
          destination: { x, y, z: 0 }
        }
      };
      this.props.client.mutate({
        mutation,
        variables
      });
    }
    this.setState({
      draggingObject: null
    });
  };
  mouseMove = evt => {
    const { draggingObject } = this.state;
    this.setState({
      draggingObject: Object.assign({}, draggingObject, {
        x: evt.clientX - draggingObject.width / 4,
        y: evt.clientY - draggingObject.height / 4
      })
    });
  };
  render() {
    const { draggingObject } = this.state;
    return (
      <div className="tactical-object">
        <FileExplorer
          onMouseDown={this.mouseDown}
          directory="/Viewscreen/Tactical Icons"
        />
        {draggingObject && (
          <img
            className="dragging-img"
            draggable={false}
            src={draggingObject.url}
            style={{
              transform: `translate(${draggingObject.x}px, ${draggingObject.y}px)`
            }}
          />
        )}
      </div>
    );
  }
}
