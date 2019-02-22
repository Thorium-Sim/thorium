import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Deck {
    id: ID
    simulatorId: ID
    number: Int
    svgPath: String
    doors: Boolean
    evac: Boolean
    rooms: [Room]
    hallway: String
    crewCount: Int
    environment: Environment
  }

  union Location = Deck | Room

  extend type Query {
    decks(simulatorId: ID!, number: Int): [Deck]
  }
  extend type Mutation {
    addDeck(
      simulatorId: ID!
      number: Int!
      svgPath: String
      doors: Boolean
      evac: Boolean
    ): String
    removeDeck(deckId: ID!): String
    addDecksBulk(simulatorId: ID!, decks: String!): String
    updateDeckSvg(deckId: ID!, svg: String!): String
    deckDoors(deckId: ID!, doors: Boolean): String
    deckEvac(deckId: ID!, evac: Boolean): String
    updateHallwaySvg(deckId: ID!, svg: String): String
  }
  extend type Subscription {
    decksUpdate(simulatorId: ID!): [Deck]
  }
`;

const resolver = {
  Deck: {
    rooms(deck) {
      return App.rooms
        .concat(
          App.dockingPorts.filter(d => d.deckId && d.docked).map(d => ({
            ...d,
            name: `${d.shipName || d.name} Loading`
          }))
        )
        .filter(r => r.deckId === deck.id);
    },
    crewCount(deck) {
      return App.crew.filter(c => c.location === deck.id).length;
    }
  },

  Location: {
    __resolveType(obj, context, info) {
      return obj.class || null;
    }
  },
  Query: {
    decks(root, { simulatorId, number }) {
      let decks = App.decks;
      if (simulatorId) {
        decks = decks.filter(d => d.simulatorId === simulatorId);
      }
      if (number) {
        decks = decks.filter(d => d.number === number);
      }
      return decks;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    decksUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId && rootValue) {
          return rootValue.filter(r => r.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("decksUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
