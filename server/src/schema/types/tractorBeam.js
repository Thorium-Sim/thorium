export default `
type TractorBeam {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  damage: Damage
  name: String
  displayName: String
  state: Boolean
  target: Boolean
  targetLabel: String
  strength: Float
  stress: Float
  scanning: Boolean
}
`;
