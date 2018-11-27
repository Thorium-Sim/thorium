import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Sidebar from "./sidebar";
import Bottom from "./bottom";
import Preview from "./preview";
import "./style.scss";
import SubscriptionHelper from "helpers/subscriptionHelper";

const TACTICAL_MAP_DATA = `
id
name
flight {
  id
}
layers {
  id
  name
  type
  items {
    id
    layerId
    font
    label
    fontSize
    fontColor
    icon
    size
    speed
    velocity {
      x
      y
      z
    }
    location {
      x
      y
      z
    }
    destination {
      x
      y
      z
    }
    rotation
    opacity
    flash
    ijkl
    wasd
    thrusters
    rotationMatch
    thrusterControls {
      rotation
      reversed
      matchRotation
      up
      down
      left
      right
    }
  }
  paths {
    id
    layerId
    start {
      x
      y
      z
    }
    end {
      x
      y
      z
    }
    c1 {
      x
      y
      z
    }
    c2 {
      x
      y
      z
    }
    color
    width
    arrow
  }
  image
  color
  labels
  gridCols
  gridRows
  advance
  asset
  autoplay
  loop
  playbackSpeed
  opacity
}
frozen
template`;
const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate {
    tacticalMapsUpdate {
     ${TACTICAL_MAP_DATA}
    }
  }
`;

class TacticalMapCore extends Component {
  state = {
    tacticalMapId: null,
    layerId: null,
    objectId: null,
    speed: 1000
  };
  selectTactical = tacticalMapId => {
    this.setState({ tacticalMapId, layerId: null, objectId: null });
  };
  selectLayer = layerId => {
    this.setState({ layerId, objectId: null });
  };
  selectObject = object => {
    if (object) {
      this.setState({ layerId: object.layerId, objectId: object.id });
    } else {
      this.setState({ objectId: null });
    }
  };
  updateObject = (key, value, object, speed) => {
    const variables = {
      mapId: this.state.tacticalMapId,
      layerId: object ? object.layerId : this.state.layerId,
      item: {
        id: object ? object.id : this.state.objectId,
        [key]: value
      }
    };
    if (speed) {
      variables.item.speed = speed;
    }
    const mutation = gql`
      mutation UpdateTacticalItem(
        $mapId: ID!
        $layerId: ID!
        $item: TacticalItemInput!
      ) {
        updateTacticalMapItem(mapId: $mapId, layerId: $layerId, item: $item)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  removeObject = (objectId, layerId) => {
    const mutation = gql`
      mutation RemoveTacticalItem($mapId: ID!, $layerId: ID!, $itemId: ID!) {
        removeTacticalMapItem(mapId: $mapId, layerId: $layerId, itemId: $itemId)
      }
    `;
    const variables = {
      mapId: this.state.tacticalMapId,
      layerId: layerId || this.state.layerId,
      itemId: objectId || this.state.objectId
    };
    this.setState({
      objectId: null
    });
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  updatePath = (key, value, object) => {
    const variables = {
      mapId: this.state.tacticalMapId,
      layerId: object ? object.layerId : this.state.layerId,
      path: {
        id: object ? object.id : this.state.objectId,
        [key]: value
      }
    };
    const mutation = gql`
      mutation UpdateTacticalPath(
        $mapId: ID!
        $layerId: ID!
        $path: TacticalPathInput!
      ) {
        updateTacticalMapPath(mapId: $mapId, layerId: $layerId, path: $path)
      }
    `;
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  removePath = pathId => {
    const mutation = gql`
      mutation RemoveTacticalPath($mapId: ID!, $layerId: ID!, $pathId: ID!) {
        removeTacticalMapPath(mapId: $mapId, layerId: $layerId, pathId: $pathId)
      }
    `;
    const variables = {
      mapId: this.state.tacticalMapId,
      layerId: this.state.layerId,
      pathId: pathId
    };
    this.props.client.mutate({
      mutation,
      variables
    });
  };
  render() {
    if (this.props.data.loading || !this.props.data.tacticalMaps) return null;
    const { flightId } = this.props;
    const { tacticalMaps } = this.props.data;
    const selectedTactical = tacticalMaps.find(
      t => t.id === this.state.tacticalMapId
    );
    const filteredMaps = tacticalMaps.filter(
      t => (flightId ? !t.flight || t.flight.id === flightId : !t.flight)
    );
    return (
      <div className="tacticalmap-core">
        <SubscriptionHelper
          subscribe={() =>
            this.props.data.subscribeToMore({
              document: TACTICALMAP_SUB,
              updateQuery: (previousResult, { subscriptionData }) => {
                return Object.assign({}, previousResult, {
                  tacticalMaps: subscriptionData.data.tacticalMapsUpdate
                });
              }
            })
          }
        />
        <div className="preview">
          {selectedTactical && (
            <Preview
              simulatorId={
                this.props.simulator ? this.props.simulator.id : null
              }
              tacticalMapId={this.state.tacticalMapId}
              layers={selectedTactical.layers}
              layerId={this.state.layerId}
              selectObject={this.selectObject}
              objectId={this.state.objectId}
              updateObject={this.updateObject}
              removeObject={this.removeObject}
              updatePath={this.updatePath}
              removePath={this.removePath}
              speed={this.state.speed}
              core={true}
            />
          )}
        </div>
        <div className="right-sidebar">
          <Sidebar
            tacticalMapId={this.state.tacticalMapId}
            layerId={this.state.layerId}
            tacticalMaps={filteredMaps}
            selectTactical={this.selectTactical}
            selectLayer={this.selectLayer}
            deselectTactical={() =>
              this.setState({
                tacticalMapId: null
              })
            }
            {...this.props}
          />
        </div>
        <div className="bottom-bar">
          <Bottom
            speed={this.state.speed}
            updateSpeed={s => this.setState({ speed: s })}
            tacticalMapId={this.state.tacticalMapId}
            layerId={this.state.layerId}
            objectId={this.state.objectId}
            tacticalMaps={filteredMaps}
            updateObject={this.updateObject}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

const TACTICALMAP_QUERY = gql`
  query TacticalMap {
    tacticalMaps {
      ${TACTICAL_MAP_DATA}
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network"
  })
})(withApollo(TacticalMapCore));
