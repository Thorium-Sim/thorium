export default `
type ShortRangeComm {
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
  color: String
  image: String
  name: String
  lower: Float
  upper: Float
}
`