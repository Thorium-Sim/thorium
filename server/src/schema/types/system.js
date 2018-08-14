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
  locations: [Room]
}

interface HeatInterface {
  heat: Float
  coolant: Float
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
  heatRate: Float
  isochips: [Isochip]
  locations: [Room]
  requiredDamageSteps: [DamageStep]
  optionalDamageSteps: [DamageStep]
}

# Generic system type. Query any system by type.
union SystemUnion = LRCommunications | Shield | Thruster | Engine | Transporter | Sensors | InternalComm


`;
