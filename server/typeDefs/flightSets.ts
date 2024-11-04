import App from '../app';
import { gql, withFilter } from 'apollo-server-express';
import { pubsub } from '../helpers/subscriptionManager';
const mutationHelper = require('../helpers/mutationHelper').default;

const schema = gql`

extend type Query {
    advancedNavAndAstrometric(id: ID!): FlightSet
    advancedNavAndAstrometrics(simulatorId: ID!): [FlightSet]
}

extend type Mutation {
    updateFlightSet(id: ID!, flightSet: FlightSetInput!): String
    handleCoolantFlush(id: ID!): String
    handleEmergencyStop(id: ID!): String
    handleResumePath(id: ID!): String
    handleShowFlightSet(id: ID!, show: Boolean!): String
    handleShowEta(id: ID!, show: Boolean!): String
    handleUpdateEta(id: ID!, eta: Float!): String
    handleEngineFlux(id: ID!): String
    handleSetCoolantLevel(id: ID!, level: Float!): String
    handleSetHeatLevel(id: ID!, level: Float!): String
    handleUpdateCurrentFlightPath(id: ID!, route: NavigationRouteInput!): String
    handleOverrideLocation(id: ID!, location: BasicCoordinateInput!, currentLocationUrl: String, currentLocationName: String): String
    
    handleAddProbeAssignment(id: ID!, probeId: ID!, poiId: ID!): String

    handleEngageFlightPath(id: ID!, path: NavigationRouteInput!): String
    handleSaveFlightPath(id: ID!, path: NamedNavigationRouteInput!): String

}

extend type Subscription {
    advancedNavAndAstrometricsUpdate(simulatorId: ID): [AdvancedNavigationAndAstrometrics!]!
}

type AdvancedNavigationAndAstrometrics implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    extra: Boolean
    damage: Damage
    locations: [Room]
    stealthFactor: Float
    power: Power
    flightSets: [FlightSet!]!
    currentLocation: BasicCoordinate!
    coolantLevel: Float!
    heatLevel: Float!
    flightPaths: [NamedNavigationRoute!]!
    engineStatus: EngineStatus!
    hasEmergencyPower: Boolean!
    startingStartupTime: Float!
    remainingEta: Float!
    totalEta: Float!
    flightPathCoords: [FullCoordinate!]!
    remainingStartupTime: Float
    showEta: Boolean!
    showFlightSet: Boolean!
    currentFlightSet: FlightSet
    currentFlightPath: NavigationRoute
    currentLocationName: String
    currentLocationUrl: String    
    probes: [Probe!]!
    #The following values are stringified JSON maps
    flightSetPathMap: String!
    probeAssignments: String!
}

type PointOfInterest {
    id: ID!
    name: String!
    location: Location!
    isVisible: Boolean!
    isFogOfWar: Boolean!
    speedIndex: Float!
    riskIndex: Float!
    type: PointOfInterestType!
    information: PointOfInterestInformation!
    hazards: [NavigationHazard!]!
    iconUrl: String!
    fullImageUrl: String!
    transitOptions: [SecondaryStopTransitOption]
    showName: Boolean
}

type SecondaryStopTransitOption {
  name: String!
  timeModifier: Float!
  riskModifier: Float!
  iconUrl: String!
}

type PointOfInterestInformation {
  basicInformation: String!
  hasBasicInformation: Boolean!
  detailedInformation: String!
  hasDetailedInformation: Boolean!
  secretInformation: String!
  hasSecretInformation: Boolean!
}

type MapBorder {
  name: String!
  id: ID!
  location: MapBorderLocation!
  iconUrl: String!
  riskIndex: Float!
}

enum MapBorderSide {
  TOP
  RIGHT
  BOTTOM
  LEFT
  TOP_RIGHT
  TOP_LEFT
  BOTTOM_RIGHT
  BOTTOM_LEFT
}

type MapBorderLocation {
  side: MapBorderSide!
}

type PointOfInterestObject {
  category: String!
  imageUri: String!
}

type PointOfInterestType {
  category: String!
  imageUri: String!
}

type NavigationHazardNavOptions {
  action: String!
  speedModifier: Float!
  riskModifier: Float!
  imgUrl: String!
  isArrivalOnly: Boolean!
}

type NavigationHazard {
  name: String!
  description: String!
  navOptions: [NavigationHazardNavOptions!]!
  imgUrl: String!
}

type NavigationExitOptions {
  id: ID!
  name: String!
  riskModifier: Float!
  imgUrl: String!
}

type NavigationStartOptions {
  id: ID!
  name: String!
  riskModifier: Float!
  imgUrl: String!
  secondsForStartup: Float!
}

type NavigationSpeedOptions {
  id: ID!
  name: String!
  speedModifier: Float!
  riskModifier: Float!
  requiresMaxEngines: Boolean!
  imgUrl: String!
}

type SecondaryNavigationRouteOption {
  targetLocationId: ID!
}

type NavigationRoute {
  targetLocationId: ID!
  hazardChoiceMap: [HazardChoiceMapEntry!]!
  secondaryRouteOptions: [SecondaryNavigationRouteOption!]!
  isBorder: Boolean!
  startOption: NavigationStartOptions!
  speedOption: NavigationSpeedOptions!
  exitOption: NavigationExitOptions!
}

type HazardChoiceMapEntry {
  poiId: ID!
  hazardChoice: String!
}

type NamedNavigationRoute {
  name: String!
  id: ID!
  targetLocationId: ID!
  hazardChoiceMap: [HazardChoiceMapEntry!]!
  secondaryRouteOptions: [SecondaryNavigationRouteOption!]!
  isBorder: Boolean!
  startOption: NavigationStartOptions!
  speedOption: NavigationSpeedOptions!
  exitOption: NavigationExitOptions!
}

type FlightSet {
  backgroundImg: String!
  startOptions: [NavigationStartOptions!]!
  speedOptions: [NavigationSpeedOptions!]!
  exitOptions: [NavigationExitOptions!]!
  pointsOfInterest: [PointOfInterest!]!
  defaultStartingLocation: BasicCoordinate!
  id: ID!
  name: String!
  borders: [MapBorder!]!
  imageMaxX: Float!
  imageMaxY: Float!
  pixelsPerSecond: Float!
  label: String
  probeLaunchRangeRadius: Float!
}

type BasicCoordinate {
  x: Float!
  y: Float!
}

type ColoredCoordinate {
  color: String!
  x: Float!
  y: Float!
}

type IdCoordinate {
  id: ID!
  x: Float!
  y: Float!
}

type NamedCoordinate {
  name: String!
  x: Float!
  y: Float!
}

type ShownCoordinate {
  showName: Boolean
  name: String!
  x: Float!
  y: Float!
}

type FullCoordinate {
  speed: Float!
  color: String!
  x: Float!
  y: Float!
}

type ProbeAssignment {
  probeId: ID!
  flightPathCoords: [BasicCoordinate!]!
  data: [String!]!
  remainingFuelCellCount: Float!
  hasBeenViewed: Boolean!
  currentLocation: BasicCoordinate!
  targetLocationName: String!
  currentEta: Float!
  totalEta: Float!
  completed: Boolean!
}

enum ProbeType {
  CLASS_I
  CLASS_II
  CLASS_III
  DEFENSE
  SCIENCE
}

type Probe {
  id: ID!
  name: String!
  type: ProbeType!
  equipment: [Equipment!]!
}

type Equipment {
  id: ID!
  count: Float!
}

enum EngineStatus {
  FULL_POWER
  STARTUP
  ENGAGED
  FLUX
  STOPPED
}

input PointOfInterestInput {
  id: ID!
  name: String!
  location: LocationInput!
  isVisible: Boolean!
  isFogOfWar: Boolean!
  speedIndex: Float!
  riskIndex: Float!
  type: PointOfInterestTypeInput!
  information: PointOfInterestInformationInput!
  hazards: [NavigationHazardInput!]!
  iconUrl: String!
  fullImageUrl: String!
  transitOptions: [SecondaryStopTransitOptionInput]
  showName: Boolean
}

input LocationInput {
  x: Float!
  y: Float!
}

input SecondaryStopTransitOptionInput {
  name: String!
  timeModifier: Float!
  riskModifier: Float!
  iconUrl: String!
}

input PointOfInterestInformationInput {
  basicInformation: String!
  hasBasicInformation: Boolean!
  detailedInformation: String!
  hasDetailedInformation: Boolean!
  secretInformation: String!
  hasSecretInformation: Boolean!
}

input MapBorderInput {
  name: String!
  id: ID!
  location: MapBorderLocationInput!
  iconUrl: String!
  riskIndex: Float!
}

input MapBorderLocationInput {
  side: MapBorderSide!
}

input PointOfInterestTypeInput {
  category: String!
  imageUri: String!
}

input NavigationHazardNavOptionsInput {
  action: String!
  speedModifier: Float!
  riskModifier: Float!
  imgUrl: String!
  isArrivalOnly: Boolean!
}

input NavigationHazardInput {
  name: String!
  description: String!
  navOptions: [NavigationHazardNavOptionsInput!]!
  imgUrl: String!
}

input NavigationExitOptionsInput {
  id: ID!
  name: String!
  riskModifier: Float!
  imgUrl: String!
}

input NavigationStartOptionsInput {
  id: ID!
  name: String!
  riskModifier: Float!
  imgUrl: String!
  secondsForStartup: Float!
}

input NavigationSpeedOptionsInput {
  id: ID!
  name: String!
  speedModifier: Float!
  riskModifier: Float!
  requiresMaxEngines: Boolean!
  imgUrl: String!
}

input SecondaryNavigationRouteOptionInput {
  targetLocationId: ID!
}

input NavigationRouteInput {
  targetLocationId: ID!
  hazardChoiceMap: [HazardChoiceMapEntryInput!]!
  secondaryRouteOptions: [SecondaryNavigationRouteOptionInput!]!
  isBorder: Boolean!
  startOption: NavigationStartOptionsInput!
  speedOption: NavigationSpeedOptionsInput!
  exitOption: NavigationExitOptionsInput!
}

input HazardChoiceMapEntryInput {
  poiId: ID!
  hazardChoice: String!
}

input NamedNavigationRouteInput {
  name: String!
  id: ID!
  targetLocationId: ID!
  hazardChoiceMap: [HazardChoiceMapEntryInput!]!
  secondaryRouteOptions: [SecondaryNavigationRouteOptionInput!]!
  isBorder: Boolean!
  startOption: NavigationStartOptionsInput!
  speedOption: NavigationSpeedOptionsInput!
  exitOption: NavigationExitOptionsInput!
}

input FlightSetInput {
  backgroundImg: String!
  startOptions: [NavigationStartOptionsInput!]!
  speedOptions: [NavigationSpeedOptionsInput!]!
  exitOptions: [NavigationExitOptionsInput!]!
  pointsOfInterest: [PointOfInterestInput!]!
  defaultStartingLocation: BasicCoordinateInput!
  id: ID!
  name: String!
  borders: [MapBorderInput!]!
  imageMaxX: Float!
  imageMaxY: Float!
  pixelsPerSecond: Float!
  label: String
  probeLaunchRangeRadius: Float!
}

input BasicCoordinateInput {
  x: Float!
  y: Float!
}

input ColoredCoordinateInput {
  color: String!
  x: Float!
  y: Float!
}

input IdCoordinateInput {
  id: ID!
  x: Float!
  y: Float!
}

input NamedCoordinateInput {
  name: String!
  x: Float!
  y: Float!
}

input ShownCoordinateInput {
  showName: Boolean
  name: String!
  x: Float!
  y: Float!
}

input FullCoordinateInput {
  speed: Float!
  color: String!
  x: Float!
  y: Float!
}

input ProbeAssignmentInput {
  probeId: ID!
  flightPathCoords: [BasicCoordinateInput!]!
  data: [String!]!
  remainingFuelCellCount: Float!
  hasBeenViewed: Boolean!
  currentLocation: BasicCoordinateInput!
  targetLocationName: String!
  currentEta: Float!
  totalEta: Float!
  completed: Boolean!
}

input ProbeInput {
  id: ID!
  name: String!
  type: ProbeType!
  equipment: [EquipmentInput!]!
}

input EquipmentInput {
  id: ID!
  count: Float!
}
`


const resolver = {
  AdvancedNavigationAndAstrometrics: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r),
      );
    }
  },
  Query: {
    advancedNavAndAstrometric(rootValue, { id }) {
      const sys = App.systems.find(s => s.id === id);
      return sys;
    },
    advancedNavAndAstrometrics(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "AdvancedNavigationAndAstrometrics");
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    advancedNavAndAstrometricsUpdate: {
      resolve(rootValue, { simulatorId }) {
        let returnSystems = rootValue;
        if (simulatorId) {
          returnSystems = returnSystems.filter(
            sys => sys.simulatorId === simulatorId,
          );
        }
        return returnSystems;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator('advancedNavAndAstrometricsUpdate'),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  }
}

export default { schema, resolver };