export default `
type Interface{
  id: ID
  deviceType: InterfaceDevice
  name: String
  components: JSON
  connections: JSON
  values: JSON
  config: JSON
}

type InterfaceDevice {
  id: ID
  name: String
  width: Int
  height: Int
  isLandscape: Boolean
}
`;
