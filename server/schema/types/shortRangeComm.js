export default `
type ShortRangeComm implements SystemInterface {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  damage: Damage
  name: String
  displayName: String
  stealthFactor: Float
  heat: Float
  coolant: Float
  frequency: Float
  amplitude: Float
  #One of 'idle', 'hailing', 'connected'
  state: String
  arrows:[CommArrow]
  signals: [CommSignal]
}

type ShortRangeCommExtended {
  id: ID
  simulatorId: ID
  type: String
  power: Power
  damage: Damage
  name: String
  frequency: Float
  amplitude: Float
  #One of 'idle', 'hailing', 'connected'
  state: String
  arrows:[CommArrow]
  signals: [CommSignal]
}

type CommArrow {
  id: ID
  signal: ID
  frequency: Float
  connected: Boolean
}

type CommSignal {
  id: ID
  image: String
  name: String
  range: CommRange  
  color: String
}

type CommArrowExtended {
  id: ID
  signal: ID
  range: String
  frequency: Float
  connected: Boolean
}

type CommSignalExtended {
  id: ID
  color: String
  image: String
  name: String
  ranges: CommRanges
}

type CommRanges {
  military: CommRange
  commercial: CommRange
  priority: CommRange
  emergency: CommRange
}

type CommRange {
  lower: Float
  upper: Float
}

input RangeInput {
  upper: Float
  lower: Float
}
input CommSignalInput {
  id: ID
  image: String
  name: String
  range: RangeInput
  color: String
}

input CommArrowInput {
  id: ID
  signal: ID
  frequency: Float
  connected: Boolean
}

input CommUpdateInput {
  state: String
  frequency: Float
  amplitude: Float
}

`