export default `
type Navigation {
    id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  power: Power
  damage: Damage
  calculate: Boolean
  currentCourse: NavLoc
  calculatedCourse: NavLoc
  destination: String
  scanning: Boolean
}

type NavLoc {
  x: String
  y: String
  z: String
}
`;
