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
  type MotuChannel {
    id: ID
    name: String
    chan: Int
    type: MotuType
    fader: Float
    mute: Int
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

  input MotuChannelInput {
    fader: Float
    mute: Int
  }
  enum MotuType {
    chan
    aux
    group
  }
  extend type Query {
    motus: [Motu]
    motu(id: ID!): Motu
    motuChannel(id: ID!, channelId: ID!): MotuChannel
    motuSend(id: ID!, inputId: ID!, outputId: ID!): MotuPatch
  }
  extend type Mutation {
    motuAdd(address: String!): String
    motuRemove(id: ID!): String

    """
    Macro: MOTU: Update Channel
    """
    motuUpdateChannel(
      id: ID!
      channelId: ID!
      channel: MotuChannelInput!
    ): String

    """
    Macro: MOTU: (Un)Mute connection from Input to Output
    """
    motuSetSendMute(
      id: ID!
      inputId: ID!
      outputId: ID!
      mute: Boolean!
    ): String
  }
  extend type Subscription {
    motus: [Motu]
    motu(id: ID!): Motu
    motuChannel(id: ID!, channelId: ID!): MotuChannel
    motuSend(id: ID!, inputId: ID!, outputId: ID!): MotuPatch
  }
`;

const resolver = {
  Motu: {
    id(motu) {
      return motu.address;
    },
    address(motu) {
      return motu.address;
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
  MotuChannel: {
    id(channel) {
      return `motu-${channel.chan}-${channel.type}`;
    },
    fader(channel) {
      return channel.mix.matrix.fader;
    },
    mute(channel) {
      return channel.mix.matrix.mute;
    },
  },
  Query: {
    motus() {
      return App.motus;
    },
    motu(_, {id}) {
      return App.motus.find(m => m.address === id);
    },
    motuChannel(_, {id, channelId}) {
      const motu = App.motus.find(m => m.address === id);
      const [, chan, type] = channelId.split("-");
      let channel;
      if (type === "aux" || type === "group") {
        channel = motu.mixerOutputChannels.find(
          c => c.type === type && c.chan === parseInt(chan, 10),
        );
      } else if (type === "chan") {
        channel = motu.mixerInputChannels.find(
          c => c.type === type && c.chan === parseInt(chan, 10),
        );
      }
      return channel;
    },
    motuSend(_, {id, inputId, outputId}) {
      const motu = App.motus.find(m => m.address === id);
      const [, chan, type] = inputId.split("-");
      const [, outputChan, outputType] = outputId.split("-");

      const input = motu.mixerInputChannels.find(
        c => c.type === type && c.chan === parseInt(chan, 10),
      );
      const output = motu.mixerOutputChannels.find(
        c => c.type === outputType && c.chan === parseInt(outputChan, 10),
      );
      return {
        input,
        output,
        send: input.mix.matrix[output.type][output.chan].send,
        mute: input.mix.matrix[output.type][output.chan].send === 0,
      };
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
          return rootValue.address === args.id;
        },
      ),
    },
    motuChannel: {
      resolve(rootQuery, {channelId}) {
        const [, chan, type] = channelId.split("-");
        let channel;
        if (type === "aux" || type === "group") {
          channel = rootQuery.mixerOutputChannels.find(
            c => c.type === type && c.chan === parseInt(chan, 10),
          );
        } else if (type === "chan") {
          channel = rootQuery.mixerInputChannels.find(
            c => c.type === type && c.chan === parseInt(chan, 10),
          );
        }
        return channel;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("motu"),
        (rootValue, args) => {
          return rootValue.address === args.id;
        },
      ),
    },
    motuSend: {
      resolve(rootQuery, {inputId, outputId}) {
        const [, chan, type] = inputId.split("-");
        const [, outputChan, outputType] = outputId.split("-");

        const input = rootQuery.mixerInputChannels.find(
          c => c.type === type && c.chan === parseInt(chan, 10),
        );
        const output = rootQuery.mixerOutputChannels.find(
          c => c.type === outputType && c.chan === parseInt(outputChan, 10),
        );
        return {
          input,
          output,
          send: input.mix.matrix[output.type][output.chan].send,
          mute: input.mix.matrix[output.type][output.chan].send === 0,
        };
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("motu"),
        (rootValue, args) => {
          return rootValue.address === args.id;
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
