export default `

type TacticalMap {
  id: ID
  name: String
  template: Boolean
  flight: Flight
  
  layers: [TacticalLayer]
  frozen: Boolean
}

type TacticalLayer {
  id: ID
  name: String
  type: TACTICAL_TYPES
  
  #Item Options
  items: [TacticalItem]

  #Image Options
  image: String

  #Grid Options  
  color: String
  labels: Boolean
  gridCols: Int
  gridRows: Int
}

input TacticalLayerInput {
  id: ID
  type: TACTICAL_TYPES
  image: String
  color: String
  labels: Boolean
  gridCols: Int
  gridRows: Int
}

type TacticalItem {
  id: ID
  layerId: ID
  
  #Text
  label: String
  font: String
  fontSize: Float
  fontColor: String
  flash: Boolean

  #Icon
  icon: String  
  size: Float

  #Animation
  speed: Float
  velocity: Coordinates
  location: Coordinates
  destination: Coordinates

  #Keyboard Control
  wasd: Boolean
  ijkl: Boolean

}

input TacticalItemInput {
  id: ID
  
    #Text
    label: String
    font: String
    fontSize: Float
    fontColor: String
    flash: Boolean
  
    #Icon
    icon: String  
    size: Float
  
    #Animation
    speed: Float
    velocity: CoordinatesInput
    location: CoordinatesInput
    destination: CoordinatesInput
  
    #Keyboard Control
    wasd: Boolean
    ijkl: Boolean
}

enum TACTICAL_TYPES {
 grid
 image
 objects 
}`;
