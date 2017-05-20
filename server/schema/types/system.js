export default `
# Generic system type. Give information available to all systems.
type System {
  id: ID
  simulatorId: ID
  type: String
  name: String
  damage: Damage
  power: Power
  stealthFactor: Float
}

# Generic system type. Query any system by type.
union SystemUnion = LRCommunications | Shield | Thruster | Engine | Transporter | Sensors | InternalComm
`;
