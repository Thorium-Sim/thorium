import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import App from "../app";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Motu {
    id: ID
    offline: Boolean
    address: String
    inputs: [MotuInput]
    outputs: [MotuOutput]
    sends: [MotuPatch]
  }
  type MotuInput {
    id: ID
    name: String
    chan: Int
    type: MotuType

    # Gate
    gate: MotuGate

    # Compressor
    comp: MotuComp

    # Matrix
    fader: Float
    mute: Int
    pan: Float

    # EQ
    highshelf: MotuEQ
    mid1: MotuEQ
    mid2: MotuEQ
    lowshelf: MotuEQ
  }
  type MotuGate {
    release: Float
    enable: Int
    attack: Float
    threshold: Float
  }
  type MotuComp {
    enable: Float
    release: Float
    makeup: Float
    trim: Float
    peak: Float
    attack: Float
    ratio: Float
    threshold: Float
  }
  type MotuOutput {
    id: ID
    name: String
    chan: Int
    type: MotuType
    # Matrix
    prefader: Float
    fader: Float
    mute: Int
    panner: Float

    # EQ
    highshelf: MotuEQ
    mid1: MotuEQ
    mid2: MotuEQ
    lowshelf: MotuEQ
  }
  type MotuEQ {
    enable: Int
    freq: Float
    gain: Float
    bw: Float
    mode: Int
  }
  type MotuPatch {
    input: MotuInput
    output: MotuOutput
    send: Float
    mute: Boolean
  }

  #Lulz
  input MotuChannelInput {
    fader:Float
    mute:Int
  }
  enum MotuType {
    chan
    aux
    group
  }
  extend type Query {
    motus: [Motu]
    motu(id: ID!): Motu
  }
  extend type Mutation {
    motuAdd(address: String!): String
    motuRemove(id: ID!): String
    
    """
    Macro: MOTU: Update Channel
    """
    motuUpdateChannel(id:ID!, channelId:ID!, channel:MotuChannelInput!):String

    """
    Macro: MOTU: (Un)Mute connection from Input to Output
    """
    motuSetSendMute(id:ID!, inputId:ID!, outputId:ID!, mute: Boolean!)
  }
  extend type Subscription {
    motus: [Motu]
    motu(id: ID!): Motu
  }
`;

const resolver = {
  Motu: {
    id(motu) {
      return motu._address;
    },
    address(motu) {
      return motu._address;
    },
    offline(motu) {
      return Object.keys(motu._data).length === 0;
    },
    inputs(motu) {
      return motu.mixerInputChannels.map(({name, chan, type, mix}) => ({
        name,
        chan,
        type,
        ...mix.eq,
        comp: mix.comp,
        gate: mix.gate,
        ...mix.matrix,
      }));
    },
    outputs(motu) {
      return motu.mixerOutputChannels.map(({name, chan, type, mix}) => ({
        name,
        chan,
        type,
        ...mix.eq,
        ...mix.matrix,
      }));
    },
    sends(motu) {
      const sends = [];
      motu.mixerOutputChannels.forEach(output => {
        motu.mixerInputChannels.forEach(input => {
          sends.push({
            input,
            output,
            send: input.mix.matrix[output.type][output.chan].send,
            mute: input.mix.matrix[output.type][output.chan].send === 0,
          });
        });
      });
      return sends;
    },
  },
  MotuInput: {
    id(input) {
      return `motu-${input.chan}-${input.type}`;
    },
  },
  MotuOutput: {
    id(output) {
      return `motu-${output.chan}-${output.type}`;
    },
  },
  Query: {
    motus() {
      return App.motus;
    },
    motu(_, {id}) {
      return App.motus.find(m => m._address === id);
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    motu: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("motu"),
        (rootValue, args) => {
          return rootValue._address === args.id;
        },
      ),
    },
    motus: {
      resolve(rootQuery) {
        return rootQuery;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("motus"),
        (rootValue, args) => {
          return true;
        },
      ),
    },
  },
};

export default {schema, resolver};
