export default `
type Coolant {
	temperature: Float
	quantity: Int
	max: Int
}

type CoolantTank {
	id: ID
	simulatorId: ID
	type: String
	name: String
	coolant: Coolant
	damage: Float

}

type CoolantRegulator {
	id: ID
	simulatorId: ID
	type: String
	name: String
	coolant: Coolant
	damage: Float
}
`;
