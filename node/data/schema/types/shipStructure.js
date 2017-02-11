export default `
type Deck {
  id: ID
  simulatorId: ID
  number: Int
  svgPath: String
  doors: Boolean
  evac: Boolean
  rooms: [Room]
  hallway: String
}

type Room {
  id: ID
  simulatorId: ID
  deck: Deck
  name: String
  svgPath: String
}
`;

// TODO: Maybe eventaully add edges to the hallway and room
