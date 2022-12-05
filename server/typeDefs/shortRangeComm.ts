import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  """
  The Short Range Comm Card interface Schema

  Extends SystemInterface
  """
  type ShortRangeComm implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    damage: Damage
    name: String
    displayName: String
    upgradeName: String
    upgraded: Boolean
    stealthFactor: Float
    heat: Float
    coolant: Float
    "The frequency specified by a client-side frequency selector"
    frequency: Float
    "Amplitude is usually unused"
    amplitude: Float
    "Client hailing state. One of 'idle', 'hailing', 'connected'"
    state: String
    arrows: [CommArrow]
    signals: [CommSignal]
    locations: [Room]
  }

  """
  TOSPEC: An extended version of Short Range Comms?
  """
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

  """
  Describes a single short-range comms connection

  Each CommArrow is a single "open comms line" from 
  the FD/CORE system, to which the Short Range Comms client
  may connect or disconnect.

  Note this scheme does NOT describe the location of
  the client-side frequency selector arrow. That's handled
  in the ShortRangeComm scheme.
  """
  type CommArrow {
    id: ID
    signal: ID
    frequency: Float
    connected: Boolean
    muted: Boolean
  }

  """
  Specifies a frequency band & associated user
    (e.g. "Ferengi" @ 377MHz - 450MHz)

  Frequency bands are permitted to overlap.
  There may also be gaps in frequency bands.
  """
  type CommSignal {
    id: ID
    image: String
    name: String
    range: CommRange
    color: String
  }

  """
  TOSPEC: A Version of CommArrow with extensions?
  """
  type CommArrowExtended {
    id: ID
    signal: ID
    range: String
    frequency: Float
    connected: Boolean
  }

  """
  TOSPEC: A Version of CommmSignal with extensions?
  """
  type CommSignalExtended {
    id: ID
    color: String
    image: String
    name: String
    ranges: CommRanges
  }

  """
  TOSPEC: A secondary set of ranges

  Subsidiary to CommSignal
  Determines the type of communication
  """
  type CommRanges {
    military: CommRange
    commercial: CommRange
    priority: CommRange
    emergency: CommRange
  }

  """
  Specifies the bottom and top of a frequency band

  Note that frequencies are provided in floats
  0 - 1, and user-readable frequencies
  (e.g. in MHz) must be derived client-side
  """
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

    """
    Macro: Short Range: Set Signals
    Requires:
     - Cards:CommShortRange
     - Systems:ShortRangeComm
    """
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

    """
    Macro: Short Range: Add Signal
    Requires:
     - Cards:CommShortRange
     - Systems:ShortRangeComm
    """
    addShortRangeComm(
      simulatorId: ID!
      frequency: Float
      signalName: String
    ): String

    """
    Macro: Short Range: Remove Signal
    Requires:
     - Cards:CommShortRange
     - Systems:ShortRangeComm
    """
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
        App.rooms.find(room => room.id === r),
      );
    },
  },
  Query: {
    shortRangeComm(root, {simulatorId}) {
      let returnVal = App.systems.filter(s => s.type === "ShortRangeComm");
      if (simulatorId)
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      return returnVal;
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    shortRangeCommUpdate: {
      resolve(rootValue, {simulatorId}) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("shortRangeCommUpdate"),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
  },
};

export default {schema, resolver};
