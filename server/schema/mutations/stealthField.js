export default `
setActivated(id: ID, state: Boolean): String
setCharge(id: ID, state: Boolean): String
activate(id: ID): String
deactivate(id: ID): String
setQuadrant(id: ID, which: String, value: Float): String
fluxQuadrants(id: ID): String
`;