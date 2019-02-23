import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type TacticalMap {
    id: ID
    name: String
    template: Boolean
    flight: Flight

    layers: [TacticalLayer]
    frozen: Boolean
  }

  type TacticalLayer {
    id: ID
    name: String
    type: TACTICAL_TYPES
    opacity: Float

    #Item Options
    items: [TacticalItem]

    #Image Options
    image: String

    #Grid Options
    color: String
    labels: Boolean
    gridCols: Int
    gridRows: Int

    #Path Options
    paths: [TacticalPath]

    #Video Options
    advance: Boolean
    asset: String
    autoplay: Boolean
    loop: Boolean
    playbackSpeed: Float
  }

  input TacticalLayerInput {
    id: ID
    type: TACTICAL_TYPES
    opacity: Float
    image: String
    color: String
    labels: Boolean
    gridCols: Int
    gridRows: Int

    # Video Config
    advance: Boolean
    asset: String
    autoplay: Boolean
    loop: Boolean
    playbackSpeed: Float
  }

  type ThrusterControls {
    rotation: String
    reversed: Boolean
    matchRotation: Boolean
    up: String
    down: String
    left: String
    right: String
  }

  input ThrusterControlsInput {
    rotation: String
    reversed: Boolean
    matchRotation: Boolean
    up: String
    down: String
    left: String
    right: String
  }

  type TacticalItem {
    id: ID
    layerId: ID

    #Text
    label: String
    font: String
    fontSize: Float
    fontColor: String
    flash: Boolean

    #Icon
    icon: String
    size: Float
    opacity: Float

    #Animation
    speed: Float
    velocity: Coordinates
    location: Coordinates
    locationJson: String
    destination: Coordinates
    rotation: Float
    #Keyboard Control
    wasd: Boolean
    ijkl: Boolean
    thrusters: Boolean
    rotationMatch: Boolean
    thrusterControls: ThrusterControls
  }

  input TacticalItemInput {
    id: ID

    #Text
    label: String
    font: String
    fontSize: Float
    fontColor: String
    flash: Boolean

    #Icon
    icon: String
    size: Float
    opacity: Float

    #Animation
    speed: Float
    velocity: CoordinatesInput
    location: CoordinatesInput
    destination: CoordinatesInput
    rotation: Float
    #Keyboard Control
    wasd: Boolean
    ijkl: Boolean
    thrusters: Boolean
    rotationMatch: Boolean
    thrusterControls: ThrusterControlsInput
  }

  type TacticalPath {
    id: ID
    layerId: ID
    start: Coordinates
    end: Coordinates
    c1: Coordinates
    c2: Coordinates
    color: String
    width: Float
    arrow: Boolean
  }

  input TacticalPathInput {
    id: ID
    start: CoordinatesInput
    end: CoordinatesInput
    c1: CoordinatesInput
    c2: CoordinatesInput
    color: String
    width: Float
    arrow: Boolean
  }

  enum TACTICAL_TYPES {
    grid
    image
    objects
    path
    video
  }
  extend type Query {
    tacticalMaps(flightId: ID): [TacticalMap]
    tacticalMap(id: ID!): TacticalMap
  }
  extend type Mutation {
    newTacticalMap(name: String!, flightId: ID): String
    updateTacticalMap(id: ID!): String
    freezeTacticalMap(id: ID!, freeze: Boolean!): String
    duplicateTacticalMap(id: ID!, name: String!): String
    loadTacticalMap(id: ID!, flightId: ID!): String
    removeTacticalMap(id: ID!): String

    addTacticalMapLayer(mapId: ID!, name: String!): String
    updateTacticalMapLayer(mapId: ID!, layer: TacticalLayerInput!): String
    reorderTacticalMapLayer(mapId: ID!, layer: ID!, order: Int!): String
    removeTacticalMapLayer(mapId: ID!, layerId: ID!): String

    addTacticalMapItem(
      mapId: ID!
      layerId: ID!
      item: TacticalItemInput!
    ): String
    updateTacticalMapItem(
      mapId: ID!
      layerId: ID!
      item: TacticalItemInput!
    ): String
    removeTacticalMapItem(mapId: ID!, layerId: ID!, itemId: ID!): String

    addTacticalMapPath(
      mapId: ID!
      layerId: ID!
      path: TacticalPathInput!
    ): String
    updateTacticalMapPath(
      mapId: ID!
      layerId: ID!
      path: TacticalPathInput!
    ): String
    removeTacticalMapPath(mapId: ID!, layerId: ID!, pathId: ID!): String

    #Macro: Viewscreen: Show Tactical Map
    showViewscreenTactical(mapId: ID!, secondary: Boolean): String
  }
  extend type Subscription {
    tacticalMapsUpdate(flightId: ID): [TacticalMap]
    tacticalMapUpdate(id: ID!): TacticalMap
  }
`;

const resolver = {
  TacticalMap: {
    flight(rootValue) {
      return App.flights.find(f => f.id === rootValue.flightId);
    }
  },
  TacticalLayer: {
    items(rootValue) {
      return rootValue.items.map(i =>
        Object.assign({}, i, {
          layerId: rootValue.id,
          locationJson: JSON.stringify(i.location)
        })
      );
    },
    paths(rootValue) {
      return rootValue.paths.map(i =>
        Object.assign({}, i, {
          layerId: rootValue.id
        })
      );
    }
  },
  Query: {
    tacticalMaps(rootValue, { flightId, template }) {
      let returnVal = App.tacticalMaps;
      if (flightId) returnVal = returnVal.filter(m => m.flightId === flightId);
      if (template || template === false) {
        returnVal = returnVal.filter(m => m.template === template);
      }
      return returnVal;
    },
    tacticalMap(rootValue, { id }) {
      return App.tacticalMaps.find(t => t.id === id);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    tacticalMapsUpdate: {
      resolve(rootValue, { flightId }) {
        let returnRes = rootValue;
        if (flightId) {
          returnRes = returnRes.filter(s => s.flightId === flightId);
        }
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("tacticalMapsUpdate"),
        (rootValue, { flightId }) => {
          if (flightId) {
            return rootValue.filter(s => s.flightId === flightId).length > 0;
          }
          return !!(rootValue && rootValue.length);
        }
      )
    },
    tacticalMapUpdate: {
      resolve(rootValue, { id }) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("tacticalMapUpdate"),
        (rootValue, { id }) => {
          return id === rootValue.id;
        }
      )
    }
  }
};

export default { schema, resolver };
