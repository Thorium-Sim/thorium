import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
import {DMXConfig, DMXDevice, DMXFixture, DMXSet} from "../classes";
import uuid from "uuid";

const schema = gql`
  enum DMXChannelProperty {
    red
    green
    blue
    amber
    white
    uv
    intensity
    strobe
    generic
    nothing
  }
  type DMXDevice {
    id: ID!
    class: String!
    name: String!
    channels: [DMXChannelProperty!]!
  }
  enum DMXFixtureMode {
    active
    passive
  }
  type DMXPassiveChannels {
    amber: Float
    white: Float
    uv: Float
    intensity: Float
    strobe: Float
    generic: Float
    nothing: Float
    color: String
  }
  input DMXPassiveChannelsInput {
    amber: Float
    white: Float
    uv: Float
    intensity: Float
    strobe: Float
    generic: Float
    nothing: Float
    color: String
  }
  type DMXFixture {
    id: ID!
    class: String!
    name: String!
    clientId: String
    DMXDeviceId: String!
    DMXDevice: DMXDevice!
    simulatorId: String!
    channel: Int!
    mode: DMXFixtureMode!
    tags: [String!]!
    passiveChannels: DMXPassiveChannels!
  }
  type DMXSet {
    id: ID!
    name: String!
    fixtureIds: [String!]!
    fixtures: [DMXFixture!]!
  }

  type DMXConfig {
    id: ID!
    name: String!
    config: JSON!
    actionStrength: Float!
  }
  extend type Query {
    dmxDevices: [DMXDevice!]!
    dmxSets: [DMXSet!]!
    dmxFixtures(simulatorId: ID): [DMXFixture!]!
    dmxConfig(id: ID!): DMXConfig
    dmxConfigs: [DMXConfig!]!
  }
  extend type Mutation {
    dmxDeviceCreate(name: String!): String
    dmxDeviceRemove(id: ID!): String
    dmxDeviceSetName(id: ID!, name: String!): String
    dmxDeviceSetChannels(id: ID!, channels: [DMXChannelProperty!]!): String

    dmxSetCreate(name: String!): String
    dmxSetRemove(id: ID!): String
    dmxSetDuplicate(id: ID!, name: String!): String
    dmxSetSetName(id: ID!, name: String!): String

    dmxFixtureCreate(DMXSetId: ID!, name: String!, DMXDeviceId: ID!): String
    dmxFixtureRemove(DMXSetId: ID!, id: ID!): String
    dmxFixtureSetName(id: ID!, name: String!): String
    dmxFixtureSetDMXDevice(id: ID!, DMXDeviceID: ID!): String
    dmxFixtureSetChannel(id: ID!, channel: Int!): String

    dmxFixtureSetMode(
      id: ID
      simulatorId: ID
      tag: [String]
      mode: DMXFixtureMode!
    ): String

    """
    Macro: DMX: Set Fixture To Active Mode
    """
    dmxFixtureSetActive(id: ID, simulatorId: ID, tags: [String]): String
    """
    Macro: DMX: Set Fixture Tags
    """
    dmxFixtureSetTags(
      id: ID
      simulatorId: ID
      tags: [String]
      newTags: [String!]!
    ): String
    """
    Macro: DMX: Add Fixture Tag
    """
    dmxFixtureAddTag(
      id: ID
      simulatorId: ID
      tags: [String]
      newTag: String!
    ): String
    """
    Macro: DMX: Remove Fixture Tag
    """
    dmxFixtureRemoveTag(
      id: ID
      simulatorId: ID
      tags: [String]
      removeTag: String!
    ): String
    """
    Macro: DMX: Set Fixture Passive Channels
    """
    dmxFixtureSetPassiveChannels(
      id: ID
      simulatorId: ID
      tags: [String]
      passiveChannels: DMXPassiveChannelsInput!
    ): String

    dmxConfigCreate(name: String!): String
    dmxConfigRemove(id: ID!): String
    dmxConfigDuplicate(id: ID!, name: String!): String
    dmxConfigSetName(id: ID!, name: String!): String
    dmxConfigSetConfig(id: ID!, config: JSON!): String
    dmxConfigSetActionStrength(id: ID!, actionStrength: Float!): String
  }
  extend type Subscription {
    dmxSets: [DMXSet!]!
    dmxDevices: [DMXDevice!]!
    dmxFixtures(simulatorId: ID, clientId: ID): [DMXFixture!]!
    dmxConfigs: [DMXConfig!]!
  }
`;

function getFixtures(id: string, simulatorId: string, tags: string[]) {
  return App.dmxFixtures.filter(f => {
    if (id) return f.id === id;
    if (!simulatorId || !tags) return false;
    if (f.simulatorId !== simulatorId) return false;

    // Case allowing a macro to target
    // fixtures that have no tags
    if (tags.length === 0) {
      return f.tags.length === 0;
    }
    for (const tag of tags) {
      if (!f.tags.includes(tag)) return false;
    }

    return true;
  });
}

const resolver = {
  Query: {
    dmxDevices() {
      return App.dmxDevices;
    },
    dmxSets() {
      return App.dmxSets;
    },
    dmxFixtures(rootValue, {simulatorId = null}) {
      return App.dmxFixtures.filter(f => f.simulatorId === simulatorId);
    },
    dmxConfig(rootValue, {id}) {
      return App.dmxConfigs.find(d => d.id === id);
    },
    dmxConfigs() {
      return App.dmxConfigs;
    },
  },
  Mutation: {
    dmxDeviceCreate(rootValue, {name}) {
      const device = new DMXDevice({name});
      App.dmxDevices.push(device);
      pubsub.publish("dmxDevices", App.dmxDevices);
      return device.id;
    },
    dmxDeviceRemove(rootValue, {id}) {
      App.dmxDevices = App.dmxDevices.filter(f => f.id !== id);
      pubsub.publish("dmxDevices", App.dmxDevices);
    },
    dmxDeviceSetName(rootValue, {id, name}) {
      const device = App.dmxDevices.find(d => d.id === id);
      device?.setName(name);
      pubsub.publish("dmxDevices", App.dmxDevices);
    },
    dmxDeviceSetChannels(rootValue, {id, channels}) {
      const device = App.dmxDevices.find(d => d.id === id);
      device?.setChannels(channels);
      pubsub.publish("dmxDevices", App.dmxDevices);
    },
    dmxSetCreate(rootValue, {name}) {
      const set = new DMXSet({name});
      App.dmxSets.push(set);
      pubsub.publish("dmxSets", App.dmxSets);
      return set.id;
    },
    dmxSetRemove(rootValue, {id}) {
      const set = App.dmxSets.find(f => f.id === id);
      App.dmxSets = App.dmxSets.filter(f => f.id !== id);
      // Also remove all the fixtures for that set
      set?.fixtures?.forEach(f =>
        resolver.Mutation.dmxFixtureRemove({}, {DMXSetId: null, id: f.id}),
      );

      pubsub.publish("dmxSets", App.dmxSets);
    },
    dmxSetDuplicate(rootValue, {id, name}) {
      const {id: setId, ...set} = App.dmxSets.find(f => f.id === id);
      // Duplicate all of the fixtures in the set
      const newFixtures = set.fixtureIds.map(fId => {
        const {id: _, ...f} = App.dmxFixtures.find(f => fId === f.id);
        const fixture = new DMXFixture(f);
        App.dmxFixtures.push(fixture);
        return fixture.id;
      });
      const newSet = new DMXSet({...set, name, fixtureIds: newFixtures});
      App.dmxSets.push(newSet);
      pubsub.publish("dmxSets", App.dmxSets);
      return newSet.id;
    },
    dmxSetSetName(rootValue, {id, name}) {
      const set = App.dmxSets.find(f => f.id === id);
      set.setName(name);
      pubsub.publish("dmxSets", App.dmxSets);
    },
    dmxFixtureCreate(rootValue, {DMXSetId, name, DMXDeviceId}) {
      const set = App.dmxSets.find(f => f.id === DMXSetId);
      const fixture = new DMXFixture({name, DMXDeviceId});
      set.setFixtures(set.fixtureIds.concat(fixture.id));
      App.dmxFixtures.push(fixture);

      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: null,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === null),
      });
      return fixture.id;
    },
    dmxFixtureRemove(rootValue, {DMXSetId, id}) {
      const set = App.dmxSets.find(f => f.id === DMXSetId);
      set?.setFixtures(set?.fixtureIds.filter(f => f !== id) || []);
      App.dmxFixtures = App.dmxFixtures.filter(f => f.id !== id);
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: null,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === null),
      });
    },
    dmxFixtureSetName(rootValue, {id, name}) {
      const fixture = App.dmxFixtures.find(f => f.id === id);
      fixture.setName(name);
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: null,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === null),
      });
    },
    dmxFixtureSetDMXDevice(rootValue, {id, DMXDeviceID}) {
      const fixture = App.dmxFixtures.find(f => f.id === id);
      fixture.setDMXDevice(DMXDeviceID);
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: null,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === null),
      });
    },
    dmxFixtureSetChannel(rootValue, {id, channel}) {
      const fixture = App.dmxFixtures.find(f => f.id === id);
      fixture.setChannel(channel);
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: null,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === null),
      });
    },
    dmxFixtureSetMode(rootValue, {id, simulatorId, tags, mode}) {
      const fixture = getFixtures(id, simulatorId, tags);
      if (fixture.length === 0) return;
      const simId = fixture[0].simulatorId;
      fixture.forEach(f => {
        f.setMode(mode);
      });
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: simId,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === simId),
      });
    },
    dmxFixtureSetActive(rootValue, {id, simulatorId, tags}) {
      const fixture = getFixtures(id, simulatorId, tags);
      if (fixture.length === 0) return;
      const simId = fixture[0].simulatorId;
      fixture.forEach(f => {
        f.setMode("active");
      });
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: simId,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === simId),
      });
    },
    dmxFixtureSetTags(rootValue, {id, simulatorId, tags, newTags}) {
      const fixture = getFixtures(id, simulatorId, tags);
      if (fixture.length === 0) return;
      const simId = fixture[0].simulatorId;
      fixture.forEach(f => {
        f.setTags(newTags);
      });
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: simId,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === simId),
      });
    },
    dmxFixtureAddTag(rootValue, {id, simulatorId, tags, newTag}) {
      const fixture = getFixtures(id, simulatorId, tags);
      if (fixture.length === 0) return;
      const simId = fixture[0].simulatorId;
      fixture.forEach(f => {
        f.setTags(
          f.tags.concat(newTag).filter((a, i, arr) => arr.indexOf(a) === i),
        );
      });
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: simId,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === simId),
      });
    },
    dmxFixtureRemoveTag(rootValue, {id, simulatorId, tags, removeTag}) {
      const fixture = getFixtures(id, simulatorId, tags);
      if (fixture.length === 0) return;
      const simId = fixture[0].simulatorId;
      fixture.forEach(f => {
        f.setTags(f.tags.filter(t => t !== removeTag));
      });
      pubsub.publish("dmxSets", App.dmxSets);
      pubsub.publish("dmxFixtures", {
        simulatorId: simId,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === simId),
      });
    },
    dmxFixtureSetPassiveChannels(
      rootValue,
      {id, simulatorId, tags, passiveChannels},
    ) {
      const fixture = getFixtures(id, simulatorId, tags);
      if (fixture.length === 0) return;
      const simId = fixture[0].simulatorId;
      fixture.forEach(f => {
        f.setPassiveChannels(passiveChannels);
        // Automatically set the channel to passive when
        // setting passive channels
        f.setMode("passive");
      });
      pubsub.publish("dmxFixtures", {
        simulatorId: simId,
        fixtures: App.dmxFixtures.filter(f => f.simulatorId === simId),
      });
    },
    dmxConfigCreate(rootValue, {name}) {
      const config = new DMXConfig({name});
      App.dmxConfigs.push(config);

      pubsub.publish("dmxConfigs", App.dmxConfigs);
      return config.id;
    },
    dmxConfigRemove(rootValue, {id}) {
      App.dmxConfigs = App.dmxConfigs.filter(f => f.id !== id);
      pubsub.publish("dmxConfigs", App.dmxConfigs);
    },
    dmxConfigDuplicate(rootValue, {id, name}) {
      const {id: configId, ...configuration} = App.dmxConfigs.find(
        f => f.id === id,
      );
      const newConfig = new DMXConfig({...configuration, name});
      App.dmxConfigs.push(newConfig);
      pubsub.publish("dmxConfigs", App.dmxConfigs);
      return newConfig.id;
    },
    dmxConfigSetName(rootValue, {id, name}) {
      const config = App.dmxConfigs.find(f => f.id === id);
      config?.setName(name);
      pubsub.publish("dmxConfigs", App.dmxConfigs);
    },
    dmxConfigSetConfig(rootValue, {id, config}) {
      const configObj = App.dmxConfigs.find(f => f.id === id);
      configObj?.setConfig(config);
      pubsub.publish("dmxConfigs", App.dmxConfigs);
    },
    dmxConfigSetActionStrength(rootValue, {id, actionStrength}) {
      const configObj = App.dmxConfigs.find(f => f.id === id);
      configObj?.setActionStrength(actionStrength);
      pubsub.publish("dmxConfigs", App.dmxConfigs);
    },
  },
  Subscription: {
    dmxDevices: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: () => {
        const id = uuid.v4();
        process.nextTick(() => {
          let returnVal = App.dmxDevices;

          pubsub.publish(id, returnVal);
        });
        return pubsub.asyncIterator([id, "dmxDevices"]);
      },
    },
    dmxSets: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: () => {
        const id = uuid.v4();
        process.nextTick(() => {
          let returnVal = App.dmxSets;

          pubsub.publish(id, returnVal);
        });
        return pubsub.asyncIterator([id, "dmxSets"]);
      },
    },
    dmxFixtures: {
      resolve(rootValue: {fixtures: DMXFixture[]}, {clientId}) {
        if (clientId)
          return rootValue.fixtures.filter(c => c.clientId === clientId);
        return rootValue.fixtures;
      },
      subscribe: withFilter(
        (rootValue, {simulatorId = null}) => {
          const id = uuid.v4();
          process.nextTick(() => {
            let returnVal = App.dmxFixtures.filter(
              f => f.simulatorId === simulatorId,
            );

            pubsub.publish(id, {simulatorId, fixtures: returnVal});
          });
          return pubsub.asyncIterator([id, "dmxFixtures"]);
        },
        (rootValue, {simulatorId}) => {
          return rootValue.simulatorId === simulatorId;
        },
      ),
    },
    dmxConfigs: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: () => {
        const id = uuid.v4();
        process.nextTick(() => {
          let returnVal = App.dmxConfigs;

          pubsub.publish(id, returnVal);
        });
        return pubsub.asyncIterator([id, "dmxConfigs"]);
      },
    },
  },
};

export default {schema, resolver};
