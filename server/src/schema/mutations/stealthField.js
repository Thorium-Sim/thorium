export default `
setStealthActivated(id: ID, state: Boolean): String
setStealthCharge(id: ID, state: Boolean): String
activateStealth(id: ID): String
deactivateStealth(id: ID): String
setStealthQuadrant(id: ID, which: String, value: Float): String
fluxStealthQuadrants(id: ID): String
stealthChangeAlert(id:ID!, change:Boolean!):String
`;
