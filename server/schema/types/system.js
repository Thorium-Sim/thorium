export default `
# Generic system type. Give information available to all systems.
type System {
  id: ID
  simulatorId: ID
  type: String
  name: String
  damage: Damage
  power: Power
}
`;
