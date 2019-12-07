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
    actionMode: MidiActionMode
    config: JSON
  }
  input MidiControlInput {
    channel: Int
    messageType: MidiMessageType
    key: Int
    controllerNumber: Int
    channelModeMessage: ChannelModeMessageType
    actionMode: MidiActionMode
    config: JSON
  }
  enum MidiActionMode {
    macro
    momentaryMacro
    toggle
    valueAssignment
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
    midiSetControl(id: ID!, control: MidiControlInput!): MidiSet

    """
    Macro: MIDI: Activate a MIDI Set
    """
    simulatorAddMidiSet(simulatorId: ID!, midiSet: ID!): Simulator

    """
    Macro: MIDI: Deactivate a MIDI Set
    """
    simulatorRemoveMidiSet(simulatorId: ID!, midiSet: ID!): Simulator
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

        const output = simulator.midiSets
          .map(id => App.midiSets.find(m => m.id === id))
          .filter(Boolean);
        return output;
      } else {
        return App.midiSets;
      }
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    midiSets: {
      resolve(rootQuery, {simulatorId}) {
        if (simulatorId) {
          const simulator = App.simulators.find(s => s.id === simulatorId);

          return rootQuery.filter(({id}) => simulator.midiSets.includes(id));
        }
        return rootQuery;
      },
      subscribe: () => pubsub.asyncIterator("midiSets"),
    },
  },
};

export default {schema, resolver};
