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
}

enum DOCKING_TYPES {
  shuttlebay
  dockingport
}
`;
