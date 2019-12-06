import {gql} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import App from "../app";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type MidiSet {
    id: ID
    name: String
    deviceName: String
    controls: [MidiControl]
  }
  type MidiControl {
    id: ID
    channel: Int
    messageType: MidiMessageType
    key: Int
    controllerNumber: Int
    channelModeMessage: ChannelModeMessageType
    component: String
    variables: JSON
  }
  enum MidiMessageType {
    noteoff
    noteon
    keypressure
    controlchange
    programchange
    channelpressure
    pitchbendchange
  }
  enum ChannelModeMessageType {
    allsoundoff
    resetallcontrollers
    localcontroloff
    localcontrolon
    allnotesoff
    omnimodeoff
    omnimodeon
    monomodeon
    polymodeon
  }
  extend type Query {
    midiSets(simulatorId: ID): [MidiSet]
  }
  extend type Mutation {
    midiSetCreate(name: String!, deviceName: String!): MidiSet
    midiSetRename(id: ID!, name: String!): MidiSet
    midiSetRemove(id: ID!): Boolean
  }
  extend type Subscription {
    midiSets(simulatorId: ID): [MidiSet]
  }
`;

const resolver = {
  Query: {
    midiSets(_, {simulatorId}) {
      if (simulatorId) {
        const simulator = App.simulators.find(s => s.id === simulatorId);

        return simulator.midiSets.map(id =>
          App.midiSets.find(m => m.id === id).filter(Boolean),
        );
      } else {
        return App.midiSets;
      }
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    midiSets: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: () => pubsub.asyncIterator("midiSets"),
    },
  },
};

export default {schema, resolver};
