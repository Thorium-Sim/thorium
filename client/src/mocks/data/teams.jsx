/* 
query Teams($simulatorId: ID!, $teamType: String!) {
  teams(simulatorId: $simulatorId, type: $teamType) {
    id
    name
    type
    orders
    priority
    location {
      ... on Deck {
        id
        number
        __typename
      }
      ... on Room {
        id
        name
        deck {
          id
          number
          __typename
        }
        __typename
      }
      __typename
    }
    officers {
      id
      name
      position
      inventory {
        id
        name
        count
        __typename
      }
      __typename
    }
    __typename
  }
}

*/

export default [
  {
    id: "7d5e7be4-2084-4408-928c-63562170a8e9",
    name: "Test Team",
    type: "security",
    orders: "Go do the thing!",
    priority: "low",
    location: {
      id: "a5d594ff-2039-4269-b714-f720eb58d02e",
      name: "Theatre",
      deck: {
        id: "5e4e3f64-0ea0-4305-b7b8-ec52ac83eb10",
        number: 3,
        __typename: "Deck",
      },
      __typename: "Room",
    },
    officers: [
      {
        id: "a803b952-0bb8-4b5e-be20-54fc633f8920",
        name: "Richard Dean Anderson",
        position: "Deputy Chief Of Security",
        inventory: [],
        __typename: "Crew",
      },
      {
        id: "d54315d8-e055-4c94-bb15-67dcbf51754e",
        name: "Sergio Baldwin",
        position: "Security",
        inventory: [],
        __typename: "Crew",
      },
    ],
    __typename: "Team",
  },
];
