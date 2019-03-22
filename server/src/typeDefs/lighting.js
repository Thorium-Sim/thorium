import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Lighting {
    intensity: Float
    action: LIGHTING_ACTION
    actionStrength: Float
    transitionDuration: Int
    useAlertColor: Boolean
    color: String
  }
  input LightingInput {
    intensity: Float
    action: LIGHTING_ACTION
    actionStrength: Float
    transitionDuration: Int
    useAlertColor: Boolean
    color: String
  }

  enum LIGHTING_ACTION {
    normal
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
  Mutation: {}
};

export default { schema, resolver };
