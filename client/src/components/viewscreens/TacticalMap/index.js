import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Preview from "../../views/TacticalMap/preview";
//import { Asset } from "../../../helpers/assets";
import SubscriptionHelper from "../../../helpers/subscriptionHelper";

//import "./style.scss";

const queryData = `
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
    locationJson
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
}
frozen
template`;

const TACTICALMAP_SUB = gql`
  subscription UpdateTacticalMap($flightId: ID) {
    tacticalMapsUpdate(flightId: $flightId) {
      ${queryData}
    }
  }
`;

class TacticalMapViewscreen extends Component {
  state = {
    tacticalMapId: null,
    layerId: null,
    objectId: null,
    layers: {}
  };
  componentDidUpdate(prevProps) {
    if (!this.props.data.loading && this.props.data.tacticalMaps) {
      const layers = this.props.data.tacticalMaps.reduce((prev, next) => {
        // If the tactical map is frozen, use the previous tactical map's layers
        if (prevProps.cardName && next.frozen && this.state.layers[next.id]) {
          prev[next.id] = this.state.layers[next.id];
        } else {
          prev[next.id] = next.layers;
        }
        return prev;
      }, {});
      if (JSON.stringify(layers) !== JSON.stringify(this.state.layers)) {
        this.setState({
          layers
        });
      }
    }
  }
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
  updateObject = (key, value, object) => {
    const data = JSON.parse(this.props.viewscreen.data);
    const { tacticalMapId } = data;
    const variables = {
      mapId: tacticalMapId,
      layerId: object ? object.layerId : this.state.layerId,
      item: {
        id: object ? object.id : this.state.objectId,
        [key]: value
      }
    };
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
  removeObject = objectId => {
    const data = JSON.parse(this.props.viewscreen.data);
    const { tacticalMapId } = data;
    const mutation = gql`
      mutation RemoveTacticalItem($mapId: ID!, $layerId: ID!, $itemId: ID!) {
        removeTacticalMapItem(mapId: $mapId, layerId: $layerId, itemId: $itemId)
      }
    `;
    const variables = {
      mapId: tacticalMapId,
      layerId: this.state.layerId,
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
  render() {
    if (this.props.data.loading || !this.props.data.tacticalMaps) return null;
    const data = JSON.parse(this.props.viewscreen.data);
    const { tacticalMapId } = data;
    return (
      <SubscriptionHelper
        subscribe={() =>
          this.props.data.subscribeToMore({
            document: TACTICALMAP_SUB,
            variables: {
              flightId:
                this.props.flightId ||
                (this.props.flight && this.props.flight.id)
            },
            updateQuery: (previousResult, { subscriptionData }) => {
              return Object.assign({}, previousResult, {
                tacticalMaps: subscriptionData.data.tacticalMapsUpdate
              });
            }
          })
        }
      >
        {(() => {
          if (!tacticalMapId) return null;
          const selectedTacticalMap = this.props.data.tacticalMaps.find(
            t => t.id === tacticalMapId
          );
          const { core } = this.props;
          const layers = this.state.layers[tacticalMapId];
          return (
            <div
              className="viewscreen-tacticalMap"
              style={{
                transform: !core ? `scale(${window.innerWidth / 1920})` : null
              }}
            >
              {selectedTacticalMap && (
                <Preview
                  simulatorId={this.props.simulator.id}
                  core={
                    !(
                      this.props.station &&
                      this.props.station.name === "Viewscreen"
                    )
                  }
                  frozen={selectedTacticalMap.frozen}
                  layers={layers}
                  selectObject={this.selectObject}
                  objectId={this.state.objectId}
                  updateObject={this.updateObject}
                  removeObject={this.removeObject}
                />
              )}
            </div>
          );
        })()}
      </SubscriptionHelper>
    );
  }
}

const TACTICALMAP_QUERY = gql`
  query TacticalMapQuery($flightId: ID) {
    tacticalMaps(flightId: $flightId) {
      ${queryData}
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, {
  options: ownProps => ({
    fetchPolicy: "cache-and-network",
    variables: {
      flightId: ownProps.flightId || (ownProps.flight && ownProps.flight.id)
    }
  })
})(withApollo(TacticalMapViewscreen));
