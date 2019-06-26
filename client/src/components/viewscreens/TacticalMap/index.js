import React, { Component } from "react";
import gql from "graphql-tag.macro";
import { Query, withApollo } from "react-apollo";
import Preview from "components/views/TacticalMap/preview";
//import { Asset } from "helpers/assets";
import SubscriptionHelper from "helpers/subscriptionHelper";

//import "./style.scss";

const fragment = gql`
  fragment TacticalMapViewscreenData on TacticalMap {
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
    template
  }
`;

const TACTICALMAP_SUB = gql`
  subscription UpdateTacticalMap($id: ID!) {
    tacticalMapUpdate(id: $id) {
      ...TacticalMapViewscreenData
    }
  }
  ${fragment}
`;

const TACTICALMAP_QUERY = gql`
  query TacticalMapQuery($id: ID!) {
    tacticalMap(id: $id) {
      ...TacticalMapViewscreenData
    }
  }
  ${fragment}
`;

class TacticalMapViewscreen extends Component {
  state = {
    tacticalMapId: null,
    layerId: null,
    objectId: null,
    layers: {}
  };
  // componentDidUpdate(prevProps) {
  //   const {tacticalMap} = this.props;
  //   if (!this.props.data.loading && this.props.data.tacticalMaps) {
  //     const layers = this.props.data.tacticalMaps.reduce((prev, next) => {
  //       // If the tactical map is frozen, use the previous tactical map's layers
  //       if (prevProps.cardName && next.frozen && this.state.layers[next.id]) {
  //         prev[next.id] = this.state.layers[next.id];
  //       } else {
  //         prev[next.id] = next.layers;
  //       }
  //       return prev;
  //     }, {});
  //     if (JSON.stringify(layers) !== JSON.stringify(this.state.layers)) {
  //       this.setState({
  //         layers
  //       });
  //     }
  //   }
  // }
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
    const { tacticalMapId } = this.props;
    const variables = {
      mapId: tacticalMapId,
      layerId: object ? object.layerId : this.state.layerId,
      item: {
        id: object ? object.id : this.state.objectId,
        [key]:
          value === true
            ? true
            : value === false
            ? false
            : isNaN(Number(value))
            ? value
            : Number(value)
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
    const { tacticalMapId } = this.props;
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
    const { core, tacticalMap } = this.props;
    return (
      <div
        className="viewscreen-tacticalMap"
        style={{
          transform: !core ? `scale(${window.innerWidth / 1920})` : null
        }}
      >
        {tacticalMap && (
          <Preview
            simulatorId={this.props.simulator.id}
            viewscreen={this.props.viewscreen}
            core={
              !(this.props.station && this.props.station.name === "Viewscreen")
            }
            frozen={tacticalMap.frozen}
            layers={tacticalMap.layers}
            selectObject={this.selectObject}
            objectId={this.state.objectId}
            updateObject={this.updateObject}
            removeObject={this.removeObject}
          />
        )}
      </div>
    );
  }
}

class TacticalMapViewscreenData extends Component {
  state = {
    tacticalMapId: null,
    layerId: null,
    objectId: null,
    layers: {}
  };

  render() {
    const data = JSON.parse(this.props.viewscreen.data);
    const { tacticalMapId } = data;
    if (!tacticalMapId) return null;
    return (
      <Query query={TACTICALMAP_QUERY} variables={{ id: tacticalMapId }}>
        {({ loading, data: { tacticalMap }, subscribeToMore }) => (
          <SubscriptionHelper
            subscribe={() =>
              subscribeToMore({
                document: TACTICALMAP_SUB,
                variables: {
                  id: tacticalMapId
                },
                updateQuery: (previousResult, { subscriptionData }) => {
                  return Object.assign({}, previousResult, {
                    tacticalMap: subscriptionData.data.tacticalMapUpdate
                  });
                }
              })
            }
          >
            {tacticalMap && (
              <TacticalMapViewscreen
                {...this.props}
                tacticalMap={tacticalMap}
                tacticalMapId={tacticalMapId}
              />
            )}
          </SubscriptionHelper>
        )}
      </Query>
    );
  }
}

export default withApollo(TacticalMapViewscreenData);
