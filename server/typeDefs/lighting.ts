import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Lighting {
    intensity: Float!
    action: LIGHTING_ACTION!
    actionStrength: Float!
    transitionDuration: Int!
    useAlertColor: Boolean
    color: String
    dmxConfig: DMXConfig
  }
  input LightingInput {
    intensity: Float
    action: LIGHTING_ACTION
    actionStrength: Float
    transitionDuration: Int
    useAlertColor: Boolean
    color: String
    dmxConfig: String
  }

  enum LIGHTING_ACTION {
    normal
    darken
    blackout
    work
    fade
    shake
    strobe
    oscillate
  }

  extend type Simulator {
    lighting: Lighting
  }
`;

const resolver = {
  Query: {},
  Mutation: {},
  Lighting: {
    dmxConfig(rootValue) {
      return App.dmxConfigs.find(d => d.id === rootValue.dmxConfig);
    },
  },
};

export default {schema, resolver};
