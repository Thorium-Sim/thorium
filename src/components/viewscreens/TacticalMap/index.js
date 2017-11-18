import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import Preview from "../../views/TacticalMap/preview";
//import { Asset } from "../../../helpers/assets";

//import "./style.css";

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

class TacticalMapViewscreen extends Component {
  state = {
    tacticalMapId: null,
    layerId: null,
    objectId: null
  };
  sub = null;
  componentWillReceiveProps(nextProps) {
    if (!this.sub && !nextProps.tacticalData.loading) {
      this.sub = nextProps.tacticalData.subscribeToMore({
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
    if (
      this.props.tacticalData.loading ||
      !this.props.tacticalData.tacticalMaps
    )
      return null;
    const data = JSON.parse(this.props.viewscreen.data);
    const { tacticalMapId } = data;
    if (!tacticalMapId) return null;
    const { tacticalMaps } = this.props.tacticalData;
    const selectedTactical = tacticalMaps.find(t => t.id === tacticalMapId);
    return (
      <div className="viewscreen-tacticalMap">
        <Preview
          layers={selectedTactical.layers}
          selectObject={this.selectObject}
          objectId={this.state.objectId}
          updateObject={this.updateObject}
          removeObject={this.removeObject}
        />
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
  name: "tacticalData",
  options: ownProps => ({
    variables: {
      flightId: ownProps.flightId
    }
  })
})(withApollo(TacticalMapViewscreen));
