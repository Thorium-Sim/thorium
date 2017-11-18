import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Sidebar from "./sidebar";
import Bottom from "./bottom";
import Preview from "./preview";
import "./style.css";

const TACTICALMAP_SUB = gql`
  subscription TacticalMapUpdate($flightId: ID) {
    tacticalMapsUpdate(flightId: $flightId) {
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
          flash
          ijkl
          wasd
        }
        image
        color
        labels
        gridCols
        gridRows
      }
      frozen
      template
    }
  }
`;

class TacticalMapCore extends Component {
  state = {
    tacticalMapId: null,
    layerId: null,
    objectId: null
  };
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.data.loading) {
      this.sub = nextProps.data.subscribeToMore({
        document: TACTICALMAP_SUB,
        variables: {
          flightId: nextProps.flightId
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          return Object.assign({}, previousResult, {
            tacticalMaps: subscriptionData.tacticalMapsUpdate
          });
        }
      });
    }
  }
  componentWillUnmount() {
    this.sub && this.sub();
  }
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
  updateObject = (key, value, object) => {
    const variables = {
      mapId: this.state.tacticalMapId,
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
    const mutation = gql`
      mutation RemoveTacticalItem($mapId: ID!, $layerId: ID!, $itemId: ID!) {
        removeTacticalMapItem(mapId: $mapId, layerId: $layerId, itemId: $itemId)
      }
    `;
    const variables = {
      mapId: this.state.tacticalMapId,
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
    const { tacticalMaps } = this.props.data;
    const selectedTactical = tacticalMaps.find(
      t => t.id === this.state.tacticalMapId
    );
    return (
      <div className="tacticalmap-core">
        <div className="preview">
          {selectedTactical && (
            <Preview
              layers={selectedTactical.layers}
              selectObject={this.selectObject}
              objectId={this.state.objectId}
              updateObject={this.updateObject}
              removeObject={this.removeObject}
            />
          )}
        </div>
        <div className="right-sidebar">
          <Sidebar
            tacticalMapId={this.state.tacticalMapId}
            layerId={this.state.layerId}
            tacticalMaps={tacticalMaps}
            selectTactical={this.selectTactical}
            selectLayer={this.selectLayer}
            {...this.props}
          />
        </div>
        <div className="bottom-bar">
          <Bottom
            tacticalMapId={this.state.tacticalMapId}
            layerId={this.state.layerId}
            objectId={this.state.objectId}
            tacticalMaps={tacticalMaps}
            updateObject={this.updateObject}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

const TACTICALMAP_QUERY = gql`
  query TacticalMap($flightId: ID) {
    tacticalMaps(flightId: $flightId) {
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
          flash
          ijkl
          wasd
        }
        image
        color
        labels
        gridCols
        gridRows
      }
      frozen
      template
    }
  }
`;

export default graphql(TACTICALMAP_QUERY, {
  options: ownProps => ({
    variables: {
      flightId: ownProps.flightId
    }
  })
})(withApollo(TacticalMapCore));
