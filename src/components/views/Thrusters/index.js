import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import { DraggableCore } from "react-draggable";
import { Button, Row, Col } from "reactstrap";
import ThrusterThree from "./three-view";
import distance from "../../../helpers/distance";
import Measure from "react-measure";
import throttle from "../../../helpers/debounce";

import DamageOverlay from "../helpers/DamageOverlay";
import "./style.scss";
import Tour from "reactour";

const trainingSteps = [
  {
    selector: ".direction-drag",
    content:
      "These toggles manually steer your ship. Drag the toggle around and watch how it affects the model of your ship. Use the lower sideways toggle to move forward and backward in space."
  },
  {
    selector: ".rotation-drag",
    content:
      "Use these toggles to rotate your ship in space. Steering in 3D space is different than driving a car on Earth, where you only have to navigate a 2D plane. Luckily, you also have auto-pilot functions on your ship for long-distance navigation. These manual controls are useful, however, for navigating tighter spaces, like landing docks and asteroid fields."
  },
  {
    selector: ".indicatorCircles",
    content:
      "These dials track your rotation in 3D space. The red line represents required thruster settings. Use the rotation controls to orient your ship so it is pointing in the right direction."
  }
];

const ROTATION_CHANGE_SUB = gql`
  subscription RotationChanged($simulatorId: ID!) {
    rotationChange(simulatorId: $simulatorId) {
      id
      direction {
        x
        y
        z
      }
      rotation {
        yaw
        pitch
        roll
      }
      rotationDelta {
        yaw
        pitch
        roll
      }
      rotationRequired {
        yaw
        pitch
        roll
      }
      manualThrusters
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

const THRUSTER_SUB = gql`
  subscription ThrusterUpdate($simulatorId: ID) {
    systemsUpdate(simulatorId: $simulatorId, type: "Thrusters") {
      id
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

const IndicatorCircle = props => {
  return (
    <Col sm={4}>
      <div className="indicatorContainer">
        <div className="spacer" />
        <div className="rotationIndicator yaw">
          <div
            className="pointer required"
            style={{ transform: `rotate(${props.required || 0}deg)` }}
          />
          <div
            className="pointer current"
            style={{ transform: `rotate(${props.current || 0}deg)` }}
          />
          <span className="label up">0</span>
          <span className="label right">90</span>
          <span className="label down">180</span>
          <span className="label left">270</span>
        </div>
      </div>
      <label>{props.name}</label>
    </Col>
  );
};

class Thrusters extends Component {
  constructor(props) {
    super(props);
    this.rotationSubscription = null;
    this.thrusterSub = null;
    this.state = {
      control: false,
      gamepad: null,
      lastTimeMsec: null,
      request: null,
      activeDrags: 0,
      direction: {
        left: 0,
        top: 0
      },
      directionUp: {
        left: 0,
        top: 0
      },
      rotation: {
        left: 0,
        top: 0
      },
      yaw: {
        left: 0,
        top: 0
      }
    };
    this.updateRotation = throttle(({ id, rotation, on }) => {
      props.rotationUpdate({
        id,
        rotation,
        on
      });
    }, 15);
    this.updateDirection = throttle(({ id, direction }) => {
      props.directionUpdate({
        id,
        direction
      });
    }, 15);
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.request);
    this.rotationSubscription && this.rotationSubscription();
    this.thrusterSub && this.thrusterSub();
  }
  componentWillReceiveProps(nextProps) {
    if (!this.rotationSubscription && !nextProps.data.loading) {
      this.rotationSubscription = nextProps.data.subscribeToMore({
        document: ROTATION_CHANGE_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            thrusters: [subscriptionData.data.rotationChange]
          });
        }
      });
    }
    if (!this.thrusterSub && !nextProps.data.loading) {
      this.thrusterSub = nextProps.data.subscribeToMore({
        document: THRUSTER_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            thrusters: previousResult.thrusters.map(t => {
              const updateT = subscriptionData.data.systemsUpdate.find(
                s => s.id === t.id
              );
              if (updateT) {
                return Object.assign({}, t, updateT);
              }
              return t;
            })
          });
        }
      });
    }
  }

  /*
componentDidMount(){
  let self = this;
  this.setState({
   request: requestAnimationFrame(this.tick.bind(this))
 });
}
tick() {
  this.gamepadLoop();
  this.setState({
   lastTimeMsec: Date.now(),
   request: requestAnimationFrame(this.tick.bind(this))
 });
}
gamepadLoop(){
  const gamepad = navigator.getGamepads()[0];
  if (gamepad && this.state.control){
			//Create a custom object to store.
			let direction = {x:0,y:0,z:0};
			switch(Math.round(gamepad.axes[9] * 100) / 100) {
				case -1:
				direction.y = 1;
				break;
				case -0.71:
				direction.y = 0.7;
				direction.x = 0.7;
				break;
				case -0.43:
				direction.x = 1;
				break;
				case -0.14:
				direction.y = -0.7;
				direction.x = 0.7;
				break;
				case 0.14:
				direction.y = -1;
				break;
				case 0.43:
				direction.y = -0.7;
				direction.x = -0.7;
				break;
				case 0.71:
				direction.x = -1;
				break;
				case 1:
				direction.x = -0.7;
				direction.y = 0.7;
				break;
				default:
				break;
			}
			direction.z = Math.round((gamepad.axes[2]) * -10) / 10;
			const obj = {
				attitudeAdjust:{
					roll:Math.round(gamepad.axes[0] * 100) / 100,
					pitch: Math.round(gamepad.axes[1] * 100) / 100,
					yaw: 0,
				},
				direction: direction,
			};
			const gamepadObj = this.state.gamepad;
			if (JSON.stringify(gamepadObj) !== JSON.stringify(obj)){
				//this.props.operationChannel.push("update",{table:"systems",filter:{simulatorId:this.props.params.simulatorId,name:'Thrusters'},data:obj});
				this.setState({
					gamepad:obj,
				});
			}
		}
	}
	gamepadControl(){
		//Disable/enable the draggables
		/*if (!this.state.control){
			Draggable.get(this.refs.directionDragger).disable();
			Draggable.get(this.refs.rotationDragger).disable();
			Draggable.get(this.refs.foreDragger).disable();
			Draggable.get(this.refs.yawDragger).disable();
		} else {
			Draggable.get(this.refs.directionDragger).enable();
			Draggable.get(this.refs.rotationDragger).enable();
			Draggable.get(this.refs.foreDragger).enable();
			Draggable.get(this.refs.yawDragger).enable();
		}
		this.setState({control:!this.state.control});
	}
  */
  onDragHandler(handlerName, which) {
    return (e, { node }) => {
      const self = this;
      const newPosition = { top: 0, left: 0 };
      // Get new XY
      const parentRect = node.offsetParent.getBoundingClientRect();
      const obj = {};
      const id = this.props.data.thrusters[0].id;
      const rotation = { yaw: 0, pitch: 0, roll: 0 };
      const direction = { x: 0, y: 0, z: 0 };
      const { width } = node.offsetParent.getBoundingClientRect();
      switch (handlerName) {
        case "onDragStart":
          obj[which] = newPosition;
          this.setState(obj);
          break;
        case "onDrag":
          const clientX = e.clientX || e.clientX === 0 || e.touches[0].clientX;
          const clientY = e.clientY || e.clientY === 0 || e.touches[0].clientY;

          if (!this.state[which]) {
            throw new Error("onDrag called before onDragStart.");
          }
          newPosition.left =
            ((parentRect.left + parentRect.width / 2 - clientX) / width) *
            -1 *
            2;
          newPosition.top =
            ((parentRect.top + parentRect.height / 2 - clientY) / width) *
            -1 *
            2;
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
          if (Math.abs(newPosition.top) < 0.1) newPosition.top = 0;
          if (Math.abs(newPosition.left) < 0.1) newPosition.left = 0;
          obj[which] = newPosition;
          switch (which) {
            case "rotation":
              rotation.pitch = newPosition.top;
              rotation.roll = newPosition.left;
              this.updateRotation({
                id: id,
                rotation: rotation,
                on: true
              });
              break;
            case "yaw":
              rotation.yaw = newPosition.left;
              this.updateRotation({
                id: id,
                rotation: rotation,
                on: true
              });
              break;
            case "directionUp":
              direction.z = newPosition.left;
              this.updateDirection({ id: id, direction: direction });
              break;
            case "direction":
              direction.x = newPosition.left;
              direction.y = newPosition.top * -1;
              this.updateDirection({ id: id, direction: direction });
              break;
            default:
              this.props.updateRotation({
                id: id,
                rotation: rotation,
                on: false
              });
              this.updateDirection({ id: id, direction: direction });
              break;
          }
          this.setState(obj);
          break;
        case "onDragStop":
          if (!this.state[which]) {
            throw new Error("onDragEnd called before onDragStart.");
          }
          newPosition.left = this.state[which].left;
          newPosition.top = this.state[which].top;
          setTimeout(() => {
            if (which === "yaw" || which === "rotation") {
              this.props.rotationUpdate({
                id: id,
                rotation: rotation,
                on: false
              });
            } else {
              this.props.directionUpdate({ id: id, direction: direction });
            }
          }, 100);
          window.TweenMax.fromTo(this.state[which], 0.1, this.state[which], {
            left: 0,
            top: 0,
            onUpdate: function() {
              obj.which = { left: this.target.left, top: this.target.top };
              self.setState(obj);
            }
          });
          break;
        default:
          throw new Error(
            "onDragHandler called with unrecognized handlerName: " + handlerName
          );
      }
    };
  }
  render() {
    if (this.props.data.loading || !this.props.data.thrusters) return null;
    const gamepad = navigator.getGamepads()[0];
    let thruster = {};
    if (this.props.data.thrusters) {
      thruster = this.props.data.thrusters[0]; //Only allow one thruster - no need for multiple.
    }
    let { width, height } = { width: 0, height: 0 };
    if (this.refs.dirCirc) {
      width = this.refs.dirCirc.getBoundingClientRect().width;
      height = this.refs.dirCirc.getBoundingClientRect().height;
    }
    const direction = {
      x: this.state.direction.left,
      y: this.state.direction.top,
      z: this.state.directionUp.left
    };
    if (!thruster) return <h1>No thruster system</h1>;
    return (
      <div className="cardThrusters">
        <DamageOverlay message={"Thrusters Offline"} system={thruster} />
        <Row>
          <Col className="col-sm-3 draggerContainer direction-drag">
            <label>Direction</label>
            <div className="spacer" />
            <div className="draggerCircle" ref="dirCirc">
              <DraggableCore
                onStart={this.onDragHandler("onDragStart", "direction")}
                onDrag={this.onDragHandler("onDrag", "direction")}
                onStop={this.onDragHandler("onDragStop", "direction")}
              >
                <div
                  ref="directionDragger"
                  className="dragger direction alertBack"
                  style={{
                    transform: `translate3d(${(this.state.direction.left *
                      width) /
                      2}px,${(this.state.direction.top * height) / 2}px,0px)`
                  }}
                />
              </DraggableCore>
              <span className="label up">Forward</span>
              <span className="label right">Starboard</span>
              <span className="label down">Reverse</span>
              <span className="label left">Port</span>
            </div>
            <div className="draggerBar">
              <DraggableCore
                axis="x"
                onStart={this.onDragHandler("onDragStart", "directionUp")}
                onDrag={this.onDragHandler("onDrag", "directionUp")}
                onStop={this.onDragHandler("onDragStop", "directionUp")}
              >
                <div
                  ref="foreDragger"
                  className="dragger fore alertBack"
                  style={{
                    transform: `translate3d(${(this.state.directionUp.left *
                      (width - 40)) /
                      2}px,0px,0px)`
                  }}
                />
              </DraggableCore>
              <span className="label right">Up</span>
              <span className="label left">Down</span>
            </div>
          </Col>
          <Col className="col-sm-6">
            <Measure
              bounds
              onResize={contentRect => {
                this.setState({ dimensions: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef} style={{ height: "100%" }}>
                  {this.state.dimensions && (
                    <ThrusterThree
                      direction={direction}
                      simulator={this.props.simulator}
                      simulatorId={this.props.simulator.id}
                      dimensions={this.state.dimensions}
                      rotation={thruster.rotation}
                    />
                  )}
                </div>
              )}
            </Measure>
            {gamepad ? (
              <Row>
                <Col className="col-sm-6 col-sm-offset-3">
                  <Button
                    type="primary"
                    className="btn-block"
                    onClick={this.gamepadControl.bind(this)}
                    label={`${
                      this.state.control ? "Deactivate" : "Activate"
                    } Manual Control`}
                  />
                </Col>
              </Row>
            ) : (
              <div />
            )}
          </Col>
          <Col className="col-sm-3 draggerContainer rotation-drag">
            <label>Rotation</label>
            <div className="spacer" />
            <div className="draggerCircle">
              <DraggableCore
                onStart={this.onDragHandler("onDragStart", "rotation")}
                onDrag={this.onDragHandler("onDrag", "rotation")}
                onStop={this.onDragHandler("onDragStop", "rotation")}
              >
                <div
                  ref="rotationDragger"
                  className="dragger rotation alertBack"
                  style={{
                    transform: `translate3d(${(this.state.rotation.left *
                      width) /
                      2}px,${(this.state.rotation.top * height) / 2}px,0px)`
                  }}
                />
              </DraggableCore>
              <span className="label up">Pitch Up</span>
              <span className="label right">Roll Right</span>
              <span className="label down">Pitch Down</span>
              <span className="label left">Roll Left</span>
            </div>
            <div className="draggerBar">
              <DraggableCore
                axis="x"
                onStart={this.onDragHandler("onDragStart", "yaw")}
                onDrag={this.onDragHandler("onDrag", "yaw")}
                onStop={this.onDragHandler("onDragStop", "yaw")}
              >
                <div
                  ref="yaw"
                  className="dragger yaw alertBack"
                  style={{
                    transform: `translate3d(${(this.state.yaw.left *
                      (width - 40)) /
                      2}px,0px,0px)`
                  }}
                />
              </DraggableCore>
              <span className="label right">Yaw Starboard</span>
              <span className="label left">Yaw Port</span>
            </div>
          </Col>
        </Row>
        <Row className="indicatorCircles">
          {!this.props.data.loading &&
            thruster.rotation && (
              <Col lg={{ size: 6, offset: 3 }}>
                <Row>
                  <IndicatorCircle
                    name={`Yaw: ${Math.min(
                      359,
                      Math.max(0, Math.round(thruster.rotation.yaw))
                    )}`}
                    required={thruster.rotationRequired.yaw}
                    current={thruster.rotation.yaw}
                  />
                  <IndicatorCircle
                    name={`Pitch: ${Math.min(
                      359,
                      Math.max(0, Math.round(thruster.rotation.pitch))
                    )}`}
                    required={thruster.rotationRequired.pitch}
                    current={thruster.rotation.pitch}
                  />
                  <IndicatorCircle
                    name={`Roll: ${Math.min(
                      359,
                      Math.max(0, Math.round(thruster.rotation.roll))
                    )}`}
                    required={thruster.rotationRequired.roll}
                    current={thruster.rotation.roll}
                  />
                </Row>
              </Col>
            )}
        </Row>
        <Tour
          steps={trainingSteps}
          isOpen={this.props.clientObj.training}
          onRequestClose={this.props.stopTraining}
        />
      </div>
    );
  }
}

const THRUSTER_QUERY = gql`
  query Thrusters($simulatorId: ID) {
    thrusters(simulatorId: $simulatorId) {
      id
      direction {
        x
        y
        z
      }
      rotation {
        yaw
        pitch
        roll
      }
      rotationDelta {
        yaw
        pitch
        roll
      }
      rotationRequired {
        yaw
        pitch
        roll
      }
      manualThrusters
      damage {
        damaged
        report
      }
      power {
        power
        powerLevels
      }
    }
  }
`;

const ROTATION_UPDATE = gql`
  mutation ThrusterDelta($id: ID!, $rotation: RotationInput, $on: Boolean) {
    rotationUpdate(id: $id, rotation: $rotation, on: $on)
  }
`;

const DIRECTION_UPDATE = gql`
  mutation ThrusterDirection($id: ID!, $direction: DirectionInput) {
    directionUpdate(id: $id, direction: $direction)
  }
`;

export default compose(
  graphql(THRUSTER_QUERY, {
    options: ownProps => ({
      fetchPolicy: "cache-and-network",
      variables: { simulatorId: ownProps.simulator.id }
    })
  }),
  graphql(ROTATION_UPDATE, {
    name: "rotationUpdate",
    props: ({ rotationUpdate }) => ({
      rotationUpdate: props =>
        rotationUpdate({
          variables: Object.assign(props)
        })
    })
  }),
  graphql(DIRECTION_UPDATE, {
    name: "directionUpdate",
    props: ({ directionUpdate }) => ({
      directionUpdate: props =>
        directionUpdate({
          variables: Object.assign(props)
        })
    })
  })
)(Thrusters);
