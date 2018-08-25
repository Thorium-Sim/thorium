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

  #Path Options
  paths: [TacticalPath]

  #Video Options
  advance:Boolean
  asset:String
  autoplay:Boolean
  loop:Boolean
  playbackSpeed:Float
}

input TacticalLayerInput {
  id: ID
  type: TACTICAL_TYPES
  image: String
  color: String
  labels: Boolean
  gridCols: Int
  gridRows: Int

  # Video Config
  advance:Boolean
  asset:String
  autoplay:Boolean
  loop:Boolean
  playbackSpeed:Float
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
  locationJson: String
  destination: Coordinates
  rotation: Float
  #Keyboard Control
  wasd: Boolean
  ijkl: Boolean
  thrusters: Boolean
  rotationMatch: Boolean
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
    rotation: Float
    #Keyboard Control
    wasd: Boolean
    ijkl: Boolean
    thrusters: Boolean
    rotationMatch: Boolean
}

type TacticalPath {
  id: ID
  layerId: ID
  start: Coordinates
  end: Coordinates
  c1: Coordinates
  c2: Coordinates
  color: String
  width: Float
  arrow: Boolean
}

input TacticalPathInput {
  id: ID
  start: CoordinatesInput
  end: CoordinatesInput
  c1: CoordinatesInput
  c2: CoordinatesInput
  color: String
  width: Float
  arrow: Boolean
}

enum TACTICAL_TYPES {
 grid
 image
 objects 
 path
 video
}`;
