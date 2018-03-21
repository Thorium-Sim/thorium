import React, { Component, Fragment } from "react";
import { Row, Col, Input, Label, FormGroup, Button } from "reactstrap";
import gql from "graphql-tag";
import { ChromePicker } from "react-color";

import ImageConfig from "./imageConfig";
import ObjectConfig from "./objectConfig";
import PathConfig from "./pathConfig";

const configs = {
  gridConfig: ({ selectedLayer, updateLayer }) => {
    return (
      <Row>
        <Col>
          <FormGroup>
            <Label>
              Grid Columns{" "}
              <Input
                type="range"
                min="1"
                max="36"
                defaultValue={selectedLayer.gridCols}
                onChange={evt =>
                  updateLayer("gridCols", parseInt(evt.target.value, 10))
                }
              />
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>
              Grid Rows{" "}
              <Input
                type="range"
                min="1"
                max="25"
                defaultValue={selectedLayer.gridRows}
                onChange={evt =>
                  updateLayer("gridRows", parseInt(evt.target.value, 10))
                }
              />
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                checked={selectedLayer.labels}
                onChange={evt => updateLayer("labels", evt.target.checked)}
              />{" "}
              Labels?
            </Label>
          </FormGroup>
        </Col>
        <Col>
          <ChromePicker
            color={selectedLayer.color}
            onChangeComplete={color =>
              updateLayer(
                "color",
                `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${
                  color.rgb.a
                })`
              )
            }
          />
        </Col>
      </Row>
    );
  },
  imageConfig: ImageConfig,
  objectsConfig: ObjectConfig,
  pathConfig: PathConfig
};

export default class Bottom extends Component {
  updateType = evt => {
    const mutation = gql`
      mutation UpdateLayer($mapId: ID!, $layer: TacticalLayerInput!) {
        updateTacticalMapLayer(mapId: $mapId, layer: $layer)
      }
    `;
    const variables = {
      mapId: this.props.tacticalMapId,
      layer: {
        id: this.props.layerId,
        type: evt.target.value
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updateLayer = (key, value) => {
    const mutation = gql`
      mutation UpdateLayer($mapId: ID!, $layer: TacticalLayerInput!) {
        updateTacticalMapLayer(mapId: $mapId, layer: $layer)
      }
    `;
    const variables = {
      mapId: this.props.tacticalMapId,
      layer: {
        id: this.props.layerId,
        [key]: value
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  addLabel = () => {
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
        label: "Label",
        icon: null,
        location: { x: 0.5, y: 0.5, z: 0 },
        destination: { x: 0.5, y: 0.5, z: 0 }
      }
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    const {
      tacticalMapId,
      layerId,
      objectId,
      tacticalMaps,
      updateObject,
      updateSpeed,
      speed
    } = this.props;
    if (!tacticalMapId || !layerId) return null;
    const selectedMap = tacticalMaps.find(t => t.id === tacticalMapId);
    const selectedLayer = selectedMap.layers.find(l => l.id === layerId);
    return (
      <div style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col sm={3}>
            <h3>{selectedLayer.name}</h3>
            <Input
              type="select"
              value={selectedLayer.type}
              onChange={this.updateType}
            >
              <option value="grid">Grid</option>
              <option value="image">Image</option>
              <option value="objects">Objects</option>
              <option value="path">Paths</option>
            </Input>
            {selectedLayer.type === "objects" && (
              <Fragment>
                <Button size="sm" color="primary" onClick={this.addLabel}>
                  Add Label
                </Button>
                <Input
                  type="select"
                  size="sm"
                  value={speed}
                  onChange={evt => updateSpeed(evt.target.value)}
                >
                  <option value="1000">Instant</option>
                  <option value="2">Warp</option>
                  <option value="1">Very Fast</option>
                  <option value="0.6">Fast</option>
                  <option value="0.4">Moderate</option>
                  <option value="0.1">Slow</option>
                  <option value="0.05">Very Slow</option>
                </Input>
              </Fragment>
            )}
          </Col>
          <Col sm={9}>
            {(() => {
              const Comp = configs[`${selectedLayer.type}Config`];
              return (
                <Comp
                  tacticalMapId={tacticalMapId}
                  layerId={layerId}
                  objectId={objectId}
                  client={this.props.client}
                  selectedLayer={selectedLayer}
                  updateLayer={this.updateLayer}
                  updateObject={updateObject}
                />
              );
            })()}
          </Col>
        </Row>
      </div>
    );
  }
}
