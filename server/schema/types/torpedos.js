export default `
type OldTorpedo {
  id: ID
  simulatorId: ID
  type: String
  name: String
  power: Power
  damage: Damage
  #Simple torpedos will need counts of the warheads available
  inventory: TorpedoInventory
  #One of 'photon' and 'quantum'
  loaded: String
  #One of 'idle', 'loaded', 'fired'
  state: String
}

type Torpedo implements SystemInterface{
  id: ID
  simulatorId: ID
  type: String
  name: String
  displayName: String
  power: Power
  damage: Damage
  #List torpedos take a list of warheads
  inventory: [Warhead]
  loaded: ID
  #One of 'idle', 'loaded', 'fired'
  state: String
  stealthFactor: Float
}

type Warhead {
  id: ID,
  type: String
  #TODO Change probe to be a probe type
  probe: ID
}

input WarheadInput {
  type: String
  probe: ID
}

type TorpedoInventory {
  photon: Int
  quantum: Int
}
`;
