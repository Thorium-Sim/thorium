import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Sensors implements SystemInterface {
    id: ID
    simulatorId: ID
    type: String
    name: String
    displayName: String
    stealthFactor: Float
    domain: String
    pings: Boolean
    timeSincePing: Int
    pingMode: PING_MODES
    scanResults: String
    scanRequest: String
    processedData: String
    presetAnswers: [PresetAnswer]
    scanning: Boolean
    power: Power
    contacts: [SensorContact]
    armyContacts: [SensorContact]
    damage: Damage

    scans: [SensorScan]
    history: Boolean
    autoTarget: Boolean
    frozen: Boolean
    autoThrusters: Boolean
    interference: Float
    movement: Coordinates
    segments: [SensorsSegment]
    locations: [Room]

    defaultHitpoints: Int
    defaultSpeed: Float
    missPercent: Float
  }
  type SensorScan {
    id: ID
    timestamp: String
    mode: String
    location: String
    request: String
    response: String
    scanning: Boolean
    cancelled: Boolean
  }
  input SensorScanInput {
    id: ID
    timestamp: String
    mode: String
    location: String
    request: String
    response: String
    scanning: Boolean
    cancelled: Boolean
  }
  type SensorContact {
    id: ID
    name: String
    type: String
    size: Float
    icon: String
    picture: String
    color: String
    rotation: Float
    speed: Float
    location: Coordinates
    destination: Coordinates
    position: Coordinates
    startTime: Float
    endTime: Float
    movementTime: Int
    infrared: Boolean
    cloaked: Boolean
    destroyed: Boolean
    forceUpdate: Boolean
    targeted: Boolean
    locked: Boolean
    disabled: Boolean
    hostile: Boolean
    hitpoints: Int
    autoFire: Boolean
    particle: ParticleTypes
  }
  enum ParticleTypes {
    Dilithium
    Tachyon
    Neutrino
    AntiMatter
    Anomaly

    #Also use this for Science Probe bursts
    Resonance
    Graviton
    Lithium
    Magnetic
    Helium
    Hydrogen
    Oxygen
    Carbon
    Radiation
  }
  type SensorsSegment {
    ring: Int
    line: Int
    state: Boolean
  }
  type PresetAnswer {
    label: String
    value: String
  }
  input PresetAnswerInput {
    label: String
    value: String
  }
  input SensorContactInput {
    id: ID
    name: String
    type: String
    size: Float
    icon: String
    picture: String
    color: String
    speed: Float
    rotation: Float
    location: CoordinatesInput
    destination: CoordinatesInput
    infrared: Boolean
    cloaked: Boolean
    destroyed: Boolean
    locked: Boolean
    disabled: Boolean
    hostile: Boolean
    hitpoints: Int
    autoFire: Boolean
    particle: ParticleTypes
  }

  enum PING_MODES {
    active
    passive
    manual
  }

  extend type Query {
    sensors(simulatorId: ID, domain: String): [Sensors]
    sensor(id: ID!): Sensors
    sensorContacts(
      simulatorId: ID
      sensorsId: ID
      hostile: Boolean
      type: String
    ): [SensorContact]
  }
  extend type Mutation {
    sensorScanRequest(id: ID!, request: String!): String
    sensorScanResult(id: ID!, result: String!): String

    """
    Macro: Sensors: Processed Data
    """
    processedData(
      id: ID
      simulatorId: ID
      domain: String
      data: String!
      flash: Boolean
    ): String

    sensorScanCancel(id: ID!): String

    """
    Macro: Sensors: Scan Answers
    """
    setPresetAnswers(
      simulatorId: ID!
      domain: String!
      presetAnswers: [PresetAnswerInput]!
    ): String

    # Sensor Contacts
    createSensorContact(id: ID!, contact: SensorContactInput!): String
    createSensorContacts(id: ID!, contacts: [SensorContactInput!]!): String
    moveSensorContact(id: ID!, contact: SensorContactInput!): String
    removeSensorContact(id: ID!, contact: SensorContactInput!): String
    removeAllSensorContacts(id: ID!, type: [String]): String
    stopAllSensorContacts(id: ID!): String
    updateSensorContact(
      id: ID
      simulatorId: ID
      contact: SensorContactInput!
    ): String

    """
    Macro: Sensors: Set Army Sensor Contacts
    """
    setArmyContacts(
      simulatorId: ID!
      domain: String!
      armyContacts: [SensorContactInput]!
    ): String

    createSensorArmyContact(id: ID!, contact: SensorContactInput!): String
    removeSensorArmyContact(id: ID!, contact: ID!): String
    updateSensorArmyContact(id: ID!, contact: SensorContactInput!): String
    nudgeSensorContacts(
      id: ID!
      amount: CoordinatesInput
      speed: Float!
      yaw: Float
    ): String
    setSensorPingMode(id: ID!, mode: PING_MODES): String
    pingSensors(id: ID!): String
    animateSensorContacact: String

    setSensorsHistory(id: ID!, history: Boolean!): String
    # For scan history
    newSensorScan(id: ID!, scan: SensorScanInput!): String
    # For scan history
    updateSensorScan(id: ID!, scan: SensorScanInput!): String
    # For scan history
    cancelSensorScan(id: ID!, scan: ID!): String

    toggleSensorsAutoTarget(id: ID!, target: Boolean!): String
    toggleSensorsAutoThrusters(id: ID!, thrusters: Boolean!): String
    setSensorsInterference(id: ID!, interference: Float!): String
    setSensorsSegment(id: ID!, ring: Int!, line: Int!, state: Boolean!): String
    setAutoMovement(id: ID!, movement: CoordinatesInput!): String
    updateSensorContacts(id: ID!, contacts: [SensorContactInput]!): String
    destroySensorContact(id: ID!, contact: ID, contacts: [ID]): String
    sensorsFireProjectile(
      simulatorId: ID!
      contactId: ID!
      speed: Float!
      hitpoints: Int!
      miss: Boolean
    ): String
    setSensorsDefaultHitpoints(id: ID, simulatorId: ID, hp: Int!): String
    setSensorsDefaultSpeed(id: ID, simulatorId: ID, speed: Float!): String
    setSensorsMissPercent(id: ID!, miss: Float!): String
  }
  extend type Subscription {
    sensorsUpdate(simulatorId: ID, domain: String): [Sensors]
    sensorContactUpdate(
      simulatorId: ID
      sensorId: ID
      hostile: Boolean
      type: String
    ): [SensorContact]
    sensorsPing(sensorId: ID): String
  }
`;

const resolver = {
  Sensors: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    },
    movement(rootValue) {
      return {
        x: rootValue.movement.x + rootValue.thrusterMovement.x,
        y: rootValue.movement.y + rootValue.thrusterMovement.y,
        z: rootValue.movement.z + rootValue.thrusterMovement.z
      };
    }
  },
  SensorContact: {
    /*startTime() {
      return 0;
    },
    endTime() {
      return 0;
    },*/
    movementTime({ startTime, endTime }) {
      return endTime - startTime;
    },
    targeted({ id, sensorId }) {
      const sensor = App.systems.find(s => s.id === sensorId);
      const targeting = App.systems.find(
        s => s.simulatorId === sensor.simulatorId && s.class === "Targeting"
      );
      const targetedContact = targeting.contacts.find(t => t.targeted === true);
      if (targetedContact && targetedContact.class === id) return true;
      return false;
    }
  },
  Query: {
    sensors(root, { simulatorId, domain }) {
      let returnVal = App.systems.filter(s => s.type === "Sensors");
      if (domain) {
        returnVal = returnVal.filter(s => s.domain === domain);
      }
      if (simulatorId) {
        returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
      }
      return returnVal;
    },
    sensor(root, { id }) {
      return App.systems.find(s => s.id === id);
    },
    sensorContacts(root, { simulatorId, sensorsId, hostile, type }) {
      let contacts = [];
      if (sensorsId) {
        const sensors = App.systems.find(system => {
          return system.type === "Sensors" && system.id === sensorsId;
        });
        contacts = sensors ? sensors.contacts : [];
      }
      if (simulatorId) {
        const sensors = App.systems.filter(system => {
          return (
            system.type === "Sensors" && system.simulatorId === simulatorId
          );
        });
        contacts = sensors.reduce(
          (prev, next) => prev.concat(next.contacts),
          []
        );
      }
      if (hostile || hostile === false)
        contacts = contacts.filter(c => c.hostile === hostile);
      if (type) {
        contacts = contacts.filter(c => c.type === type);
      }
      return contacts;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    sensorsUpdate: {
      resolve(root, { simulatorId, domain }) {
        let returnRes = root;
        if (simulatorId)
          returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
        if (domain) returnRes = returnRes.filter(s => s.domain === domain);
        return returnRes;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("sensorsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    },
    sensorContactUpdate: {
      resolve(root, { simulatorId, sensorId, hostile, type }) {
        if (root.id !== sensorId && root.simulatorId !== simulatorId)
          return null;
        let contacts = root.contacts;

        if (hostile || hostile === false)
          contacts = root.contacts.filter(c => c.hostile === hostile);
        if (type) {
          contacts = contacts.filter(c => c.type === type);
        }
        return contacts;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("sensorContactUpdate"),
        (rootValue, { simulatorId, sensorId }) => {
          let returnVal = false;
          if (sensorId) returnVal = rootValue.id === sensorId;
          if (simulatorId) returnVal = rootValue.simulatorId === simulatorId;
          return returnVal;
        }
      )
    },
    sensorsPing: {
      resolve(root, args) {
        return root;
      },
      subscribe: () => pubsub.asyncIterator("sensorsPing")
    }
  }
};

export default { schema, resolver };
