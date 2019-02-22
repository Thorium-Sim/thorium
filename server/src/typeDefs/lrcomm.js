import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type LRCommunications {
    id: ID
    simulatorId: ID
    type: String
    power: Power
    name: String
    damage: Damage
    messages(crew: Boolean, sent: Boolean, approved: Boolean): [LRMessage]
    satellites: Int

    #Interception Properties
    interception: Boolean
    locked: Boolean
    decoded: Boolean
    presetMessages: [PresetAnswer]
  }

  type LRMessage {
    id: ID
    message: String
    decodedMessage: String
    # True: This is a message to the crew, else a message to the control room
    crew: Boolean
    sent: Boolean
    deleted: Boolean
    encrypted: Boolean
    approved: Boolean
    sender: String
    datestamp: String
    timestamp: String
    a: Int
    f: Int
    ra: Int
    rf: Int
  }

  input LongRangeCommInput {
    id: ID
    interception: Boolean
    locked: Boolean
    decoded: Boolean
  }
  extend type Query {
    longRangeCommunications(simulatorId: ID): [LRCommunications]
  }
  extend type Mutation {
    #Macro: Long Range: Send Long Range Message
    sendLongRangeMessage(
      id: ID
      simulatorId: ID
      message: String!
      crew: Boolean
      sender: String
      decoded: Boolean
    ): String
    longRangeMessageSend(id: ID, message: ID!): String
    deleteLongRangeMessage(id: ID!, message: ID!): String
    updateLongRangeDecodedMessage(
      id: ID!
      messageId: ID!
      decodedMessage: String
      a: Int
      f: Int
    ): String
    updateLongRangeComm(longRangeComm: LongRangeCommInput!): String
    approveLongRangeMessage(id: ID!, message: ID!): String
    encryptLongRangeMessage(id: ID!, message: ID!): String
    setLongRangeSatellites(id: ID!, num: Int!): String

    #Macro: Interception: Add Interception Signal
    addInterceptionSignal(id: ID!): String

    #Macro: Interception: Remove Interception Signal
    removeInterceptionSignal(id: ID!): String

    #Macro: Long Range: Set preset messages
    setLongRangePresetMessages(
      id: ID
      simulatorId: ID
      messages: [PresetAnswerInput]
    ): String
  }
  extend type Subscription {
    longRangeCommunicationsUpdate(simulatorId: ID): [LRCommunications]
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  LRCommunications: {
    messages(sys, { crew, sent, approved }) {
      let returnMessages = sys.messages;
      if (crew) {
        returnMessages = returnMessages.filter(m => m.crew === crew);
      }
      if (crew === false) {
        returnMessages = returnMessages.filter(
          m => m.crew === crew && m.deleted === false
        );
      }
      if (sent || sent === false) {
        returnMessages = returnMessages.filter(m => m.sent === sent);
      }
      if (approved || approved === false) {
        returnMessages = returnMessages.filter(m => m.approved === approved);
      }
      return returnMessages;
    }
  },
  Query: {
    longRangeCommunications(root, { simulatorId }) {
      let lrComm = App.systems.filter(s => s.type === "LongRangeComm");
      if (simulatorId) return lrComm.filter(s => s.simulatorId === simulatorId);
      return lrComm;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    longRangeCommunicationsUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("longRangeCommunicationsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
