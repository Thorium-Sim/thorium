import App from "../app";
import {gql} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import handleTrigger from "../helpers/handleTrigger";
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

  extend type Mutation {
    updateSimulatorLighting(id: ID!, lighting: LightingInput!): String
    """
    Macro: DMX: Set Simulator DMX Config
    """
    dmxSetSimulatorConfig(simulatorId: ID!, dmxConfigId: ID!): String
    """
    Macro: Lighting: Set Intensity
    """
    lightingSetIntensity(simulatorId: ID!, intensity: Float!): String
    """
    Macro: Lighting: Shake Lights
    """
    lightingShakeLights(
      simulatorId: ID!
      strength: Float
      duration: Float
    ): String
    """
    Macro: Lighting: Fade Lights
    """
    lightingFadeLights(
      simulatorId: ID!
      duration: Float!
      endIntensity: Float!
      startIntensity: Float
    ): String
    """
    Macro: Lighting: Set Effect
    """
    lightingSetEffect(
      simulatorId: ID!
      duration: Float
      strength: Float
      effect: LIGHTING_ACTION!
    ): String
  }
`;

const lightingTimeouts = {};
const resolver = {
  Query: {},
  Mutation: {
    updateSimulatorLighting(rootValue, {id, lighting}, context) {
      const sim = App.simulators.find(s => s.id === id);
      sim.updateLighting(lighting);
      pubsub.publish("simulatorsUpdate", App.simulators);
      if (lighting.action) {
        handleTrigger(
          "lightingSetEffect",
          {effect: lighting.action, simulatorId: id},
          context,
        );
      }
      if (
        (lighting.action === "shake" && lighting.transitionDuration) ||
        (lighting.action === "fade" &&
          (lighting.intensity || lighting.intensity === 0))
      ) {
        // It was a shake or fade button press. Wait for the duration,
        // then trigger an update to cancel the shake
        clearTimeout(lightingTimeouts[id]);
        const duration =
          lighting.transitionDuration || sim.lighting.transitionDuration;
        lightingTimeouts[id] = setTimeout(() => {
          sim.updateLighting({action: "normal"});
          handleTrigger(
            "lightingSetEffect",
            {effect: "normal", simulatorId: id},
            context,
          );
          pubsub.publish("simulatorsUpdate", App.simulators);
        }, duration);
      }
    },
    dmxSetSimulatorConfig(rootValue, {simulatorId, dmxConfigId}) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      sim.updateLighting({dmxConfig: dmxConfigId});
      pubsub.publish("simulatorsUpdate", App.simulators);
    },
    lightingSetIntensity(rootValue, {simulatorId, intensity}) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      sim.updateLighting({intensity});
      pubsub.publish("simulatorsUpdate", App.simulators);
    },
    lightingShakeLights(rootValue, {simulatorId, strength, duration}, context) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      sim.updateLighting({
        action: "shake",
        actionStrength: strength,
        transitionDuration: duration,
      });
      pubsub.publish("simulatorsUpdate", App.simulators);
      if (duration) {
        // It was a timed shake. Wait for the duration,
        // then trigger an update to cancel the shake
        clearTimeout(lightingTimeouts[simulatorId]);
        lightingTimeouts[simulatorId] = setTimeout(() => {
          sim.updateLighting({action: "normal"});
          handleTrigger(
            "lightingSetEffect",
            {effect: "normal", simulatorId},
            context,
          );
          pubsub.publish("simulatorsUpdate", App.simulators);
        }, duration);
      }
    },
    lightingFadeLights(
      rootValue,
      {simulatorId, duration, endIntensity, startIntensity},
      context,
    ) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      if (startIntensity || startIntensity === 0) {
        sim.updateLighting({intensity: startIntensity});
        pubsub.publish("simulatorsUpdate", App.simulators);
      }
      sim.updateLighting({
        action: "fade",
        transitionDuration: duration,
        intensity: endIntensity,
      });
      pubsub.publish("simulatorsUpdate", App.simulators);

      clearTimeout(lightingTimeouts[simulatorId]);

      lightingTimeouts[simulatorId] = setTimeout(() => {
        sim.updateLighting({action: "normal"});
        handleTrigger(
          "lightingSetEffect",
          {effect: "normal", simulatorId},
          context,
        );
        pubsub.publish("simulatorsUpdate", App.simulators);
      }, duration);
    },
    lightingSetEffect(rootValue, {simulatorId, duration, strength, effect}) {
      const sim = App.simulators.find(s => s.id === simulatorId);
      sim.updateLighting({
        action: effect,
        actionStrength: strength,
        transitionDuration: duration,
      });
      pubsub.publish("simulatorsUpdate", App.simulators);
    },
  },
  Lighting: {
    dmxConfig(rootValue) {
      return App.dmxConfigs.find(d => d.id === rootValue.dmxConfig);
    },
  },
};

export default {schema, resolver};
