import React, {Component} from "react";
import layerComps from "./layerComps";
import {withApollo} from "react-apollo";
import gql from "graphql-tag.macro";
import {clampItemPosition} from "./layerComps/clampToBounds";
// Tick cadence for held-key movement, matching the 100ms cadence
// server/processes/thrusters.js already ticks the Thrusters-driven case at.
const KEY_MOVE_INTERVAL = 100;
const KEY_MOVE_DISTANCE = 0.01;
const KEY_MOVE_RATIO = 16 / 9;

class TacticalMapPreview extends Component {
  // Keys currently held down, tracked ourselves rather than relying on the
  // browser's native keydown-repeat: repeat has a several-hundred-ms delay
  // before it starts (reads as the ship ignoring input) and then fires at
  // whatever cadence/reliability the OS gives it (reads as jittery movement
  // and, since each repeat sent its own mutation, could flood the mutation
  // queue). Tracking held keys and moving on our own fixed interval instead
  // gives immediate, smooth, network-bounded movement.
  pressedKeys = new Set();
  moveTick = () => {
    if (this.pressedKeys.size === 0) return;
    const wasdMovement = {x: 0, y: 0};
    if (this.pressedKeys.has("KeyW"))
      wasdMovement.y -= KEY_MOVE_DISTANCE * KEY_MOVE_RATIO;
    if (this.pressedKeys.has("KeyS"))
      wasdMovement.y += KEY_MOVE_DISTANCE * KEY_MOVE_RATIO;
    if (this.pressedKeys.has("KeyA")) wasdMovement.x -= KEY_MOVE_DISTANCE;
    if (this.pressedKeys.has("KeyD")) wasdMovement.x += KEY_MOVE_DISTANCE;

    const ijklMovement = {x: 0, y: 0};
    if (this.pressedKeys.has("KeyI"))
      ijklMovement.y -= KEY_MOVE_DISTANCE * KEY_MOVE_RATIO;
    if (this.pressedKeys.has("KeyK"))
      ijklMovement.y += KEY_MOVE_DISTANCE * KEY_MOVE_RATIO;
    if (this.pressedKeys.has("KeyJ")) ijklMovement.x -= KEY_MOVE_DISTANCE;
    if (this.pressedKeys.has("KeyL")) ijklMovement.x += KEY_MOVE_DISTANCE;

    if (
      !wasdMovement.x &&
      !wasdMovement.y &&
      !ijklMovement.x &&
      !ijklMovement.y
    ) {
      return;
    }

    this.props.layers.forEach(l => {
      if (l.type === "objects") {
        l.items.forEach(i => {
          let x = 0;
          let y = 0;
          if (i.wasd) {
            x += wasdMovement.x;
            y += wasdMovement.y;
          }
          if (i.ijkl) {
            x += ijklMovement.x;
            y += ijklMovement.y;
          }
          if (!x && !y) return;
          let destination = {
            x: i.destination.x + x,
            y: i.destination.y + y,
            z: i.destination.z,
          };
          if (i.keepOnScreen) {
            destination = clampItemPosition(i, destination);
          }
          this.props.updateObject("destination", destination, i);
        });
      }
    });
  };
  handleKeyDown = evt => {
    if (evt.code === "Space") {
      this.toggleVideo();
      return;
    }
    this.pressedKeys.add(evt.code);
  };
  handleKeyUp = evt => {
    this.pressedKeys.delete(evt.code);
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
    this.moveInterval = setInterval(this.moveTick, KEY_MOVE_INTERVAL);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
    clearInterval(this.moveInterval);
  }
  toggleVideo = () => {
    this.props.client.mutate({
      mutation: gql`
        mutation ToggleVideo($viewscreenId: ID) {
          toggleViewscreenVideo(viewscreenId: $viewscreenId)
        }
      `,
      variables: {viewscreenId: this.props.viewscreen.id},
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
      speed,
      viewscreen,
      interval,
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
                  interval={interval}
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
                  viewscreen={viewscreen}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default withApollo(TacticalMapPreview);
