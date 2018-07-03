import React, { Component } from "react";
import gql from "graphql-tag";
import { Row, Col, Input, Label, FormGroup, Button } from "reactstrap";
import { ChromePicker } from "react-color";
import FileExplorer from "./fileExplorer";

export default class ObjectConfig extends Component {
  state = { draggingObject: null };
  mouseDown = (evt, object) => {
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
        fullPath: object.fullPath
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
    const { objectId, selectedLayer, updateObject } = this.props;
    const { draggingObject } = this.state;
    const selectedObject = selectedLayer.items.find(i => i.id === objectId);
    return (
      <div className="tactical-object">
        {objectId ? (
          <ObjectSettings
            {...selectedObject}
            updateObject={updateObject}
            duplicate={() => {
              const {
                id,
                layerId,
                __typename,
                location,
                destination,
                velocity: { x, y, z },
                ...object
              } = selectedObject;
              const item = {
                ...object,
                velocity: {
                  x,
                  y,
                  z
                },
                location: {
                  x: location.x + 0.05,
                  y: location.y + 0.05,
                  z: location.z + 0.05
                },
                destination: {
                  x: destination.x + 0.05,
                  y: destination.y + 0.05,
                  z: destination.z + 0.05
                }
              };
              const mutation = gql`
                mutation AddTacticalItem(
                  $mapId: ID!
                  $layerId: ID!
                  $item: TacticalItemInput!
                ) {
                  addTacticalMapItem(
                    mapId: $mapId
                    layerId: $layerId
                    item: $item
                  )
                }
              `;
              const variables = {
                mapId: this.props.tacticalMapId,
                layerId: this.props.layerId,
                item
              };
              this.props.client.mutate({
                mutation,
                variables
              });
            }}
          />
        ) : (
          <FileExplorer
            onMouseDown={this.mouseDown}
            directory="/Viewscreen/Tactical Icons"
          />
        )}
        {draggingObject && (
          <img
            alt="draggers"
            className="dragging-img"
            draggable={false}
            src={draggingObject.url}
            style={{
              transform: `translate(${draggingObject.x}px, ${
                draggingObject.y
              }px)`
            }}
          />
        )}
      </div>
    );
  }
}

function logslider(position, reverse) {
  // position will be between 0 and 100
  var minp = 0;
  var maxp = 100;

  // The result should be between 100 an 10000000
  var minv = Math.log(0.1);
  var maxv = Math.log(20);

  // calculate adjustment factor
  var scale = (maxv - minv) / (maxp - minp);
  if (reverse) return (Math.log(position) - minv) / scale + minp;
  return Math.exp(minv + scale * (position - minp));
}

const ObjectSettings = ({
  speed,
  size,
  font,
  fontSize,
  fontColor,
  label,
  flash,
  ijkl,
  wasd,
  opacity,
  updateObject,
  //thrusters,
  rotation,
  //rotationMatch
  duplicate
}) => {
  return (
    <Row className="tactical-object-config">
      <Col>
        <FormGroup style={{ marginBottom: 0 }}>
          <Label>
            Size
            <Input
              type="range"
              min="0"
              max="100"
              step={0.1}
              value={logslider(size, true)}
              onChange={evt =>
                updateObject("size", logslider(evt.target.value))
              }
            />
          </Label>
        </FormGroup>
        <FormGroup style={{ marginBottom: 0 }}>
          <Label>
            Rotation
            <Input
              type="range"
              min="0"
              max="360"
              step={0.1}
              value={rotation}
              onChange={evt => updateObject("rotation", evt.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup style={{ marginBottom: 0 }}>
          <Label>
            Opacity <small>Can be fully transparent on viewscreen</small>
            <Input
              type="range"
              min="0"
              max="1"
              step={0.01}
              value={opacity}
              onChange={evt => updateObject("opacity", evt.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Speed
            <Input
              type="select"
              size="sm"
              value={speed}
              onChange={evt => updateObject("speed", evt.target.value)}
            >
              <option value="1000">Instant</option>
              <option value="1.5">Warp</option>
              <option value="0.2">Very Fast</option>
              <option value="0.08">Fast</option>
              <option value="0.05">Moderate</option>
              <option value="0.02">Slow</option>
              <option value="0.008">Very Slow</option>
            </Input>
          </Label>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Label>
            Label
            <Input
              type="textarea"
              value={label}
              onChange={evt => updateObject("label", evt.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={flash}
              onChange={evt => updateObject("flash", evt.target.checked)}
            />
            Flash
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={wasd}
              onChange={evt => updateObject("wasd", evt.target.checked)}
            />
            WASD Keys
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={ijkl}
              onChange={evt => updateObject("ijkl", evt.target.checked)}
            />
            IJKL Keys
          </Label>
        </FormGroup>

        {/* <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={thrusters}
              onChange={evt => updateObject("thrusters", evt.target.checked)}
            />
            Simulator Thruster Control
          </Label>
        </FormGroup> */}
        {/* <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={rotationMatch}
              onChange={evt =>
                updateObject("rotationMatch", evt.target.checked)
              }
            />
            Match Key/Thruster Direction to Rotation
          </Label>
        </FormGroup> */}
      </Col>
      <Col>
        <FormGroup>
          <Label>
            Font
            <Input
              type="text"
              value={font}
              onChange={evt => updateObject("font", evt.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Label>
            Font Size
            <Input
              type="range"
              min="0"
              max="255"
              step="1"
              value={fontSize}
              onChange={evt => updateObject("fontSize", evt.target.value)}
            />
          </Label>
        </FormGroup>
        <FormGroup>
          <Button color="success" onClick={duplicate}>
            Duplicate
          </Button>
        </FormGroup>
      </Col>
      <Col>
        <ChromePicker
          color={fontColor}
          onChangeComplete={color =>
            updateObject(
              "fontColor",
              `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${
                color.rgb.a
              })`
            )
          }
        />
      </Col>
    </Row>
  );
};
