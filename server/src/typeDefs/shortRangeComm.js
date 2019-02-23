import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type ShortRangeComm implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    damage: Damage
    name: String
    displayName: String
    stealthFactor: Float
    heat: Float
    coolant: Float
    frequency: Float
    amplitude: Float
    #One of 'idle', 'hailing', 'connected'
    state: String
    arrows: [CommArrow]
    signals: [CommSignal]
    locations: [Room]
  }

  type ShortRangeCommExtended {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    damage: Damage
    name: String
    frequency: Float
    amplitude: Float
    #One of 'idle', 'hailing', 'connected'
    state: String
    arrows: [CommArrow]
    signals: [CommSignal]
  }

  type CommArrow {
    id: ID
    signal: ID
    frequency: Float
    connected: Boolean
    muted: Boolean
  }

  type CommSignal {
    id: ID
    image: String
    name: String
    range: CommRange
    color: String
  }

  type CommArrowExtended {
    id: ID
    signal: ID
    range: String
    frequency: Float
    connected: Boolean
  }

  type CommSignalExtended {
    id: ID
    color: String
    image: String
    name: String
    ranges: CommRanges
  }

  type CommRanges {
    military: CommRange
    commercial: CommRange
    priority: CommRange
    emergency: CommRange
  }

  type CommRange {
    lower: Float
    upper: Float
  }

  input RangeInput {
    upper: Float
    lower: Float
  }
  input CommSignalInput {
    id: ID
    image: String
    name: String
    range: RangeInput
    color: String
  }

  input CommArrowInput {
    id: ID
    signal: ID
    frequency: Float
    connected: Boolean
  }

  input CommUpdateInput {
    state: String
    frequency: Float
    amplitude: Float
  }
  extend type Query {
    shortRangeComm(simulatorId: ID!): [ShortRangeComm]
  }
  extend type Mutation {
    commAddSignal(id: ID!, commSignalInput: CommSignalInput!): String
    commUpdateSignal(id: ID!, commSignalInput: CommSignalInput!): String

    #Macro: Short Range: Set Signals
    commUpdateSignals(id: ID!, signals: [CommSignalInput]!): String
    commRemoveSignal(id: ID!, signalId: ID!): String
    commAddArrow(id: ID!, commArrowInput: CommArrowInput!): String
    commRemoveArrow(id: ID!, arrowId: ID!): String
    commConnectArrow(id: ID!, arrowId: ID!): String
    commDisconnectArrow(id: ID!, arrowId: ID!): String
    commUpdate(id: ID!, commUpdateInput: CommUpdateInput!): String
    commHail(id: ID!): String
    cancelHail(id: ID!, core: Boolean): String
    connectHail(id: ID!): String

    #Macro: Short Range: Add Signal
    addShortRangeComm(
      simulatorId: ID!
      frequency: Float
      signalName: String
    ): String

    #Macro: Short Range: Remove Signal
    removeShortRangeComm(
      simulatorId: ID!
      frequency: Float
      signalName: String
    ): String

    muteShortRangeComm(id: ID!, arrowId: ID!, mute: Boolean!): String
  }
  extend type Subscription {
    shortRangeCommUpdate(simulatorId: ID!): [ShortRangeComm]
  }
`;

const resolver = {
  ShortRangeComm: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  Query: {
    shortRangeComm(root, { simulatorId }) {
      let returnVal = App.systems.filter(s => s.type === "ShortRangeComm");
      if (simulatorId)
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      return returnVal;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    shortRangeCommUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("shortRangeCommUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
