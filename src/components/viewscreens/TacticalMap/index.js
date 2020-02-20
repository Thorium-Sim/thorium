import React, {Component} from "react";
import gql from "graphql-tag.macro";
import {withApollo} from "react-apollo";
import Preview from "components/views/TacticalMap/preview";
import {useSubscribeToMore} from "helpers/hooks/useQueryAndSubscribe";
import {useQuery} from "@apollo/client";
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
    interval
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
    layers: {},
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
    this.setState({layerId, objectId: null});
  };
  selectObject = object => {
    if (object) {
      this.setState({layerId: object.layerId, objectId: object.id});
    } else {
      this.setState({objectId: null});
    }
  };
  updateObject = (key, value, object) => {
    const {tacticalMapId} = this.props;
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
            : Number(value),
      },
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
      variables,
    });
  };
  render() {
    const {core, tacticalMap} = this.props;
    return (
      <div
        className="viewscreen-tacticalMap"
        style={{
          transform: !core ? `scale(${window.innerWidth / 1920})` : null,
        }}
      >
        {tacticalMap && (
          <Preview
            simulatorId={this.props.simulator.id}
            viewscreen={this.props.viewscreen}
            core={
              !(this.props.station && this.props.station.name === "Viewscreen")
            }
            interval={tacticalMap.interval}
            frozen={tacticalMap.frozen}
            layers={tacticalMap.layers}
            selectObject={this.selectObject}
            objectId={this.state.objectId}
            updateObject={this.updateObject}
          />
        )}
      </div>
    );
  }
}

const TacticalMapViewscreenData = props => {
  const {tacticalMapId} = JSON.parse(props.viewscreen.data);
  const {loading, data, subscribeToMore} = useQuery(TACTICALMAP_QUERY, {
    skip: !tacticalMapId,
    variables: {id: tacticalMapId},
  });
  const config = React.useMemo(
    () => ({
      variables: {
        id: tacticalMapId,
        lowInterval: props.core,
      },
      updateQuery: (previousResult, {subscriptionData}) => {
        if (!subscriptionData.data) return previousResult;
        return Object.assign({}, previousResult, {
          tacticalMap: subscriptionData.data.tacticalMapUpdate,
        });
      },
    }),
    [tacticalMapId, props.core],
  );
  useSubscribeToMore(
    subscribeToMore,
    TACTICALMAP_SUB,
    config,
    // props.core && props.preview
  );
  if (loading || !data) return null;
  const {tacticalMap} = data;
  if (!tacticalMap) return null;
  return (
    <TacticalMapViewscreen
      {...props}
      tacticalMap={tacticalMap}
      tacticalMapId={tacticalMapId}
    />
  );
};

export default withApollo(TacticalMapViewscreenData);
