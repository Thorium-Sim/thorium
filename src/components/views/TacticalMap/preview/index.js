import React, { Component } from "react";
import layerComps from "./layerComps";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
class TacticalMapPreview extends Component {
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
      case "Space":
        this.toggleVideo();
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
  toggleVideo = () => {
    this.props.client.mutate({
      mutation: gql`
        mutation ToggleVideo($simulatorId: ID!) {
          toggleViewscreenVideo(simulatorId: $simulatorId)
        }
      `,
      variables: { simulatorId: this.props.simulatorId }
    });
  };
  render() {
    const {
      tacticalMapId,
      simulatorId,
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
                  simulatorId={simulatorId}
                  core={core}
                  frozen={frozen}
                  selectObject={selectObject}
                  tacticalMapId={tacticalMapId}
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

export default withApollo(TacticalMapPreview);
