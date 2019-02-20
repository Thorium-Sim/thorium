export default `
type Coolant {
	temperature: Float
	quantity: Float
	rate: Float
}

type CoolantTank {
	id: ID
	simulatorId: ID
	type: String
	name: String
	displayName: String
	coolant: Float
	coolantRate: Float
	damage: Damage
	power: Power
}

type CoolantRegulator {
	id: ID
	simulatorId: ID
	type: String
	name: String
	coolant: Coolant
	damage: Float
}

type SystemCoolant {
	systemId: ID
	simulatorId: ID
	name: String
	displayName: String
	type: String
	coolant: Float
	coolantRate: Float
}
`;
