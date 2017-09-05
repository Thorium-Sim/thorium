export default `
type Isochip {
  id: ID
  system: System
  simulator: Simulator
  slot: Int
  requiredChip: Int
  chip: Int
  label: String
  state: ISOCHIP_STATES
}

enum ISOCHIP_STATES {
  empty
  diagnostic
  nominal
  invalid
}

input IsochipInput {
  system: ID
  simulator: ID
  slot: Int
  requiredChip: Int
  chip: Int
  label: String
}
`;
