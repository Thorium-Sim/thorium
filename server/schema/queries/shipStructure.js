export default `
decks(simulatorId: ID!, number: Int):[Deck]
rooms(simulatorId: ID, deck: ID, name: String):[Room]
`;
