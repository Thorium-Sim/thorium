export default `
type Probes {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  torpedo: Boolean
  processedData: String
  probes(network: Boolean): [Probe]
  equipment: [ProbeEquipment]
  types: [ProbeType]
  scienceTypes: [ScienceType]
}

type Probe {
  id: ID
  name: String
  type: ID
  #Whether the probe is launched by tactical or not
  launched: Boolean
  equipment: [ProbeEquipment]
  engine: Engine
  phaser: Phaser
  navigation: Navigation
  query: String
  querying: Boolean
  response: String
  charge: Float
  history: [History]
}


type History {
  date: String
  text: String
}

type ScienceProbeEvent {
  simulatorId: ID!
  name: String!
  type: String!
  charge: Float!
}

input ProbeInput {
  name: String
  type: ID
  equipment: [EquipmentInput]
}

input EquipmentInput {
  id: ID
  count: Int
}

# For now, probe equipment will be static.
# TODO: Make it so probe equipment is cargo based.
type ProbeEquipment {
  id: ID
  description: String
  name: String
  size: Float
  count: Int
  damage: Damage
  availableProbes: [String]
}

input ProbeEquipmentInput {
  description: String
  name: String
  size: Float
  count: Int
}

type ProbeType {
  id: ID
  name: String
  description: String
  size: Float
  count: Int
  availableEquipment: [ProbeEquipment]
}

input ProbeTypeInput {
  id: ID
  name: String
  size: Float
  count: Int
}

type ScienceType {
  id: ID
  name: String
  type: SCIENCE_BURST_DETECTOR
  description: String
  equipment: [String]
}

enum SCIENCE_BURST_DETECTOR {
  burst
  detector
}
`;
