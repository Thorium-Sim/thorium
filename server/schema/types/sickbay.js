export default `
type Sickbay implements SystemInterface {
  id: ID
  simulatorId: ID
  name: String
  displayName: String
  type: String
  damage: Damage
  power: Power
  stealthFactor: Float
  locations: [Room]
  
  deconProgram: String
  deconLocation: String
  deconActive: Boolean
  deconOffset: Float
  autoFinishDecon: Boolean

  sickbayRoster: [Crew]
  bunks: [SickbayBunk]
}

type SickbayBunk {
  id: ID
  sickbayId: ID
  scanRequest: String
  scanResults: String
  scanning: Boolean
  patient: Crew
}

type Chart {
  id: ID
  admitTime: String
  dischargeTime:String
  bloodPressure:String
  heartRate:Float
  temperature:Float
  o2levels:Float
  symptoms:[String]
  diagnosis:[String]
  treatment:String
  treatmentRequest:Boolean
  painPoints: [PainPoint]
}

type PainPoint {
  x: Float
  y: Float
}
input PainPointInput {
  x: Float
  y: Float
}

input ChartInput {
  id: ID
  admitTime: String
  dischargeTime:String
  bloodPressure:String
  heartRate:Float
  temperature:Float
  o2levels:Float
  symptoms:[String]
  treatment:String
  treatmentRequest:Boolean
  painPoints: [PainPointInput]
}
`;
