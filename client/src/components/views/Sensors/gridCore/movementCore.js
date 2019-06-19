import React, { PureComponent } from "react";
import { DraggableCore } from "react-draggable";
import { Button } from "helpers/reactstrap";
import distance from "helpers/distance";
import { throttle } from "helpers/debounce";
import gql from "graphql-tag.macro";

export default class MovementCore extends PureComponent {
  constructor(props) {
    super(props);
    const {
      movement: { x, y },
      id
    } = props.sensors;
    this.state = {
      direction: {
        left: x,
        top: y
      }
    };
    this.sendUpdate = throttle(movement => {
      const mutation = gql`
        mutation UpdateSensorsMovement($id: ID!, $movement: CoordinatesInput!) {
          setAutoMovement(id: $id, movement: $movement)
        }
      `;
      const variables = {
        id,
        movement
      };
      props.client.mutate({
        mutation,
        variables
      });
    }, 300);
  }
  onDragHandler(handlerName) {
    return (e, { node }) => {
      const newPosition = { top: 0, left: 0 };
      // Get new XY
      const {
        width,
        height,
        left,
        top
      } = node.offsetParent.getBoundingClientRect();
      switch (handlerName) {
        case "onDrag":
          const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
          const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

          newPosition.left = ((left + width / 2 - clientX) / width) * -1 * 2;
          newPosition.top = ((top + height / 2 - clientY) / width) * -1 * 2;
          if (
            distance(undefined, { x: newPosition.left, y: newPosition.top }) > 1
          ) {
            const theta = Math.abs(
              Math.atan(newPosition.top / newPosition.left)
            );
            if (newPosition.left > 0) {
              newPosition.left = Math.cos(theta);
            } else {
              newPosition.left = Math.cos(theta) * -1;
            }
            if (newPosition.top > 0) {
              newPosition.top = Math.sin(theta);
            } else {
              newPosition.top = Math.sin(theta) * -1;
            }
          }
          this.setState({ direction: newPosition });
          this.sendUpdate({ x: newPosition.left, y: newPosition.top, z: 0 });
          break;
        default:
          throw new Error(
            "onDragHandler called with unrecognized handlerName: " + handlerName
          );
      }
    };
  }
  reset = () => {
    this.setState({ direction: { left: 0, top: 0 } });
    this.sendUpdate({ x: 0, y: 0, z: 0 });
  };
  componentDidMount() {
    if (this.refs.dirCirc) {
      const width = this.refs.dirCirc.getBoundingClientRect().width;
      const height = this.refs.dirCirc.getBoundingClientRect().height;
      this.setState({
        width,
        height
      });
    }
  }
  render() {
    const {
      direction: { left, top },
      width = 0,
      height = 0
    } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <div className="draggerHolder">
          <div className="draggerCircle" ref="dirCirc">
            <DraggableCore onDrag={this.onDragHandler("onDrag")}>
              <div
                ref="directionDragger"
                className="dragger direction alertBack"
                style={{
                  transform: `translate3d(${(left * width) / 2}px,${(top *
                    height) /
                    2}px,0px)`
                }}
              />
            </DraggableCore>
          </div>
        </div>
        <Button size="sm" color="warning" onClick={this.reset}>
          Reset
        </Button>
      </div>
    );
  }
}
