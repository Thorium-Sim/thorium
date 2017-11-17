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
    this.setState({ tacticalMapId, layerId: null });
  };
  selectLayer = layerId => {
    this.setState({ layerId });
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
          {selectedTactical && <Preview layers={selectedTactical.layers} />}
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
            tacticalMaps={tacticalMaps}
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
