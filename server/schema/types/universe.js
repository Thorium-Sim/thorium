export default `
type Universe{
  id: ID
  name: String
  objects: [StellarObject]
}

type StellarObject {
  id: ID
  parentId: ID
  name: String
  position: Coordinates
  image: String
  stageScale: Float
  scale: Float
  type: STELLAR_TYPE
  hsl: HSL
}

type HSL {
  h:Float
  s:Float
  l:Float
}

enum STELLAR_TYPE {
  star
  planet
  starbase
}
`;
