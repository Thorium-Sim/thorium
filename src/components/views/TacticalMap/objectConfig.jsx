import React, {Component, useState} from "react";
import gql from "graphql-tag.macro";
import {Input, Label, FormGroup, Button, ButtonGroup} from "helpers/reactstrap";
import {ChromePicker} from "react-color";
import FileExplorer from "./fileExplorer";
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default class ObjectConfig extends Component {
  state = {draggingObject: null};
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
        fullPath: object.fullPath,
      },
    });
  };
  mouseUp = () => {
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);
    // Get the bounds of the preview area
    const bounds = document
      .querySelector(".tactical-map-view")
      .getBoundingClientRect();
    const {draggingObject} = this.state;

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
          location: {x, y, z: 0},
          destination: {x, y, z: 0},
        },
      };
      this.props.client.mutate({
        mutation,
        variables,
      });
    }
    this.setState({
      draggingObject: null,
    });
  };
  mouseMove = evt => {
    const {draggingObject} = this.state;
    this.setState({
      draggingObject: Object.assign({}, draggingObject, {
        x: evt.clientX - draggingObject.width / 4,
        y: evt.clientY - draggingObject.height / 4,
      }),
    });
  };
  render() {
    const {objectId, selectedLayer, updateObject, removeObject} = this.props;
    const {draggingObject, thrusters} = this.state;
    const selectedObject = selectedLayer.items.find(i => i.id === objectId);
    return (
      <div className="tactical-object">
        {objectId ? (
          thrusters ? (
            <Thrusters
              {...selectedObject}
              updateObject={updateObject}
              cancel={() => this.setState({thrusters: false})}
            />
          ) : (
            <ObjectSettings
              {...selectedObject}
              removeObject={() => removeObject(objectId, selectedLayer.id)}
              updateObject={updateObject}
              duplicate={() => {
                const {
                  id,
                  layerId,
                  __typename,
                  location,
                  destination,
                  velocity: {x, y, z},
                  ...object
                } = selectedObject;
                const item = {
                  ...object,
                  velocity: {
                    x,
                    y,
                    z,
                  },
                  location: {
                    x: location.x + 0.05,
                    y: location.y + 0.05,
                    z: location.z + 0.05,
                  },
                  destination: {
                    x: destination.x + 0.05,
                    y: destination.y + 0.05,
                    z: destination.z + 0.05,
                  },
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
                  item,
                };
                this.props.client.mutate({
                  mutation,
                  variables,
                });
              }}
              configThrusters={() => this.setState({thrusters: true})}
            />
          )
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
              transform: `translate(${draggingObject.x}px, ${draggingObject.y}px)`,
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

const DIRECTION_OPTIONS = [
  ["up", "Up"],
  ["down", "Down"],
  ["port", "Port"],
  ["starboard", "Starboard"],
  ["fore", "Fore"],
  ["reverse", "Reverse"],
];

const DirectionField = ({icon, label, value, onChange}) => (
  <FormGroup className="tactical-thruster-direction">
    <Label>
      {icon} {label}
    </Label>
    <Input type="select" bsSize="sm" value={value} onChange={onChange}>
      <option value="">Choose a direction</option>
      {DIRECTION_OPTIONS.map(([val, text]) => (
        <option key={val} value={val}>
          {text}
        </option>
      ))}
    </Input>
  </FormGroup>
);

const Thrusters = ({cancel, updateObject, thrusterControls}) => {
  const {rotation, reversed, matchRotation, up, down, left, right} =
    thrusterControls;
  function updateThrusters(which, value) {
    updateObject("thrusterControls", {...thrusterControls, [which]: value});
  }
  return (
    <div className="tactical-inspector">
      <section className="tactical-inspector-section">
        <h4>Thrusters</h4>
        <Button size="sm" color="warning" onClick={cancel}>
          Standard Config
        </Button>
        <p className="tactical-inspector-hint">
          Rotation speed is controlled in the thrusters core. Movement speed is
          controlled by the speed of the object.
        </p>
      </section>
      <section className="tactical-inspector-section">
        <h4>Rotation Match</h4>
        <FormGroup>
          <Label>Match Thruster Rotation</Label>
          <Input
            type="select"
            bsSize="sm"
            value={rotation}
            onChange={evt => updateThrusters("rotation", evt.target.value)}
          >
            <option value="">Choose a rotation</option>
            <option value="yaw">Yaw</option>
            <option value="pitch">Pitch</option>
            <option value="roll">Roll</option>
          </Input>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={reversed}
              onChange={evt => updateThrusters("reversed", evt.target.checked)}
            />
            Reverse
          </Label>
          <p className="tactical-inspector-hint">
            Makes the object rotate opposite the thruster setting.
          </p>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={matchRotation}
              onChange={evt =>
                updateThrusters("matchRotation", evt.target.checked)
              }
            />
            Match Key/Thruster Direction to Rotation
          </Label>
        </FormGroup>
      </section>
      <section className="tactical-inspector-section">
        <h4>Thruster Direction</h4>
        <DirectionField
          icon={<FaArrowUp />}
          label="Up"
          value={up}
          onChange={evt => updateThrusters("up", evt.target.value)}
        />
        <DirectionField
          icon={<FaArrowDown />}
          label="Down"
          value={down}
          onChange={evt => updateThrusters("down", evt.target.value)}
        />
        <DirectionField
          icon={<FaArrowLeft />}
          label="Left"
          value={left}
          onChange={evt => updateThrusters("left", evt.target.value)}
        />
        <DirectionField
          icon={<FaArrowRight />}
          label="Right"
          value={right}
          onChange={evt => updateThrusters("right", evt.target.value)}
        />
      </section>
    </div>
  );
};
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
  keepOnScreen,
  trainingGoal,
  trainingGoalRadius,
  opacity,
  updateObject,
  //thrusters,
  rotation,
  //rotationMatch
  duplicate,
  configThrusters,
  removeObject,
}) => {
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  return (
    <div className="tactical-inspector tactical-object-config">
      <section className="tactical-inspector-section">
        <h4>Transform</h4>
        <FormGroup>
          <Label>Size</Label>
          <Input
            type="range"
            min="0"
            max="100"
            step={0.1}
            value={logslider(size, true)}
            onChange={evt => updateObject("size", logslider(evt.target.value))}
          />
        </FormGroup>
        <FormGroup>
          <Label>Rotation</Label>
          <div className="tactical-inspector-slider-row">
            <Input
              type="range"
              min="0"
              max="360"
              step={0.1}
              value={rotation}
              onChange={evt => updateObject("rotation", evt.target.value)}
            />
            <Input
              className="tactical-inspector-slider-value"
              type="number"
              value={rotation}
              onChange={evt =>
                (evt.target.value || evt.target.value === 0) &&
                updateObject("rotation", evt.target.value)
              }
            />
          </div>
        </FormGroup>
        <FormGroup style={{marginBottom: 0}}>
          <Label>Opacity</Label>
          <Input
            type="range"
            min="0"
            max="1"
            step={0.01}
            value={opacity}
            onChange={evt => updateObject("opacity", evt.target.value)}
          />
          <small className="tactical-inspector-hint">
            Can be fully transparent on the viewscreen.
          </small>
        </FormGroup>
      </section>

      <section className="tactical-inspector-section">
        <h4>Label &amp; Text</h4>
        <FormGroup>
          <Label>Label</Label>
          <Input
            type="textarea"
            rows={2}
            defaultValue={label}
            onBlur={evt => updateObject("label", evt.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Font</Label>
          <Input
            type="text"
            defaultValue={font}
            onBlur={evt => updateObject("font", evt.target.value)}
          />
        </FormGroup>
        <FormGroup style={{marginBottom: 0}}>
          <Label>Font Size</Label>
          <Input
            type="range"
            min="0"
            max="255"
            step="1"
            value={fontSize}
            onChange={evt => updateObject("fontSize", evt.target.value)}
          />
        </FormGroup>
        <FormGroup className="tactical-color-field">
          <Label>Font Color</Label>
          <button
            type="button"
            className="tactical-color-swatch"
            style={{background: fontColor || "transparent"}}
            onClick={() => setColorPickerOpen(open => !open)}
          >
            <span>{colorPickerOpen ? "Close" : "Edit"}</span>
          </button>
          {colorPickerOpen && (
            <div className="tactical-color-popover">
              <ChromePicker
                color={fontColor}
                onChangeComplete={color =>
                  updateObject(
                    "fontColor",
                    `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
                  )
                }
              />
            </div>
          )}
        </FormGroup>
      </section>

      <section className="tactical-inspector-section">
        <h4>Behavior</h4>
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
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={keepOnScreen}
              onChange={evt => updateObject("keepOnScreen", evt.target.checked)}
            />
            Keep on screen
          </Label>
          <small className="tactical-inspector-hint">
            Stops the icon from moving off the edge of the screen.
          </small>
        </FormGroup>
        <FormGroup style={{marginBottom: 0}}>
          <Label>Movement Speed</Label>
          <Input
            type="select"
            bsSize="sm"
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
        </FormGroup>
      </section>

      <section className="tactical-inspector-section">
        <h4>Training Goal</h4>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              checked={trainingGoal || false}
              onChange={evt => updateObject("trainingGoal", evt.target.checked)}
            />
            Training goal
          </Label>
          <small className="tactical-inspector-hint">
            Advanced Training: fires when a thruster-controlled item reaches
            this object.
          </small>
        </FormGroup>
        {trainingGoal && (
          <FormGroup style={{marginBottom: 0}}>
            <Label>Goal Radius</Label>
            <Input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={
                trainingGoalRadius || trainingGoalRadius === 0
                  ? trainingGoalRadius
                  : 0.08
              }
              onChange={evt =>
                updateObject("trainingGoalRadius", evt.target.value)
              }
            />
          </FormGroup>
        )}
      </section>

      <section className="tactical-inspector-section tactical-inspector-section--actions">
        <h4>Actions</h4>
        <ButtonGroup vertical>
          <Button size="sm" color="success" onClick={duplicate}>
            Duplicate
          </Button>
          <Button size="sm" color="info" onClick={configThrusters}>
            Config Thrusters
          </Button>
          <Button size="sm" color="danger" onClick={() => removeObject()}>
            Remove Item
          </Button>
        </ButtonGroup>
      </section>
    </div>
  );
};
