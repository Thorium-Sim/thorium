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
  destinations: [String]
  presets: [NavPreset]
}

type NavLoc {
  x: String
  y: String
  z: String
}

input NavLocInput {
  x: String
  y: String
  z: String
}
type NavPreset {
  name: String
  course: NavLoc
}
input NavPresetInput {
  name: String
  course: NavLocInput
}

`;
