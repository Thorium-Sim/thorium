export default `
interface SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  damage: Damage
  power: Power
  stealthFactor: Float
}

interface HeatInterface {
  heat: Float
  coolant: Float
}

type DamageStep {
  name: String
  args: DamageStepArgs
}

type DamageStepArgs {
  end: Boolean

  #Damage Team Args
  cleanup: Boolean
  name: String
  orders: String
  room: String
  preamble: String
  type: String

  #Damage Team Message Args
  message: String

  #Remote Access Args
  code: String

  #Inventory Args
  inventory: String

  #Long Range Message Args
  destination: String

  #Probe Launch Args
  equipment: String
  query: String

  #Generic Args

  #Finish Args
  reactivate: Boolean
}

# Generic system type. Give information available to all systems.
type System implements SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  damage: Damage
  power: Power
  stealthFactor: Float
  heat: Float
  coolant: Float
  isochips: [Isochip]
  locations: [Room]
  requiredDamageSteps: [DamageStep]
  optionalDamageSteps: [DamageStep]
}

# Generic system type. Query any system by type.
union SystemUnion = LRCommunications | Shield | Thruster | Engine | Transporter | Sensors | InternalComm
`;
