export default `
type SoftwarePanel {
  id: ID
  name: String
  cables: [PanelCable]
  components: [PanelComponent]
  connections: [PanelConnection]
}

type PanelCable {
  id: ID
  color: String
  components: [ID]
}

type PanelComponent {
  id: ID
  component: String
  level: Float
  label: String
  color: String
  x: Float
  y: Float
  scale: Float
}

type PanelConnection {
  id: ID
  to: ID
  from: ID
}

input SoftwarePanelInput {
  id: ID
  name: String
  cables: [PanelCableInput]
  components: [PanelComponentInput]
  connections: [PanelConnectionInput]
}

input PanelCableInput {
  id: ID
  color: String
  components: [ID]
}
input PanelComponentInput {
  id: ID
  component: String
  level: Float
  label: String
  color: String
  x: Float
  y: Float
  scale: Float
}
input PanelConnectionInput {
  id: ID
  to: ID
  from: ID
}
`;
