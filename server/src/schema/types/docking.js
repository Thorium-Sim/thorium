export default `
type DockingPort {
  id: ID
  simulatorId: ID
  name: String
  type: DOCKING_TYPES
  clamps: Boolean
  compress: Boolean
  doors: Boolean
  image: String
  docked: Boolean
  damage: Damage  
  position: Coordinates
}

input DockingPortInput {
  id: ID
  simulatorId: ID
  name: String
  type: String
  clamps: Boolean
  compress: Boolean
  doors: Boolean
  image: String
  docked: Boolean
  position: CoordinatesInput
}

enum DOCKING_TYPES {
  shuttlebay
  dockingport
}
`;
