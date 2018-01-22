export default `
type SoftwarePanel {
  id: ID
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
  x: Float
  y: Float
}

type PanelConnection {
  id: ID
  to: ID
  from: ID
}
`;
