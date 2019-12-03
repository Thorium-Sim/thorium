/*query Tasks($simulatorId: ID!, $station: String) {
  tasks(simulatorId: $simulatorId, station: $station) {
    id
    instructions
    verified
    dismissed
    values
    definition
    verifyRequested
    timeElapsedInMS
    station
    startTime
    endTime
    __typename
  }
}
*/
export default [
  {
    id: "a17592b2-1990-4302-99a3-761bba7d21ae",
    instructions: " Ask the Tactical Officer to raise the Aft Shields.",
    verified: false,
    dismissed: false,
    values: {
      preamble: "",
      shield: "895c48fe-923b-49ba-8c03-deff9579c30f",
    },
    definition: "Raise Shield",
    verifyRequested: false,
    timeElapsedInMS: 0,
    station: "Test Station",
    startTime: "1573178098059",
    endTime: null,
    __typename: "Task",
  },
  {
    id: "bd9e9e91-66dd-4461-a0b5-76d724a40c0a",
    instructions:
      "A long range message needs to be composed. Ask the Comm Officer to send the following message:\nDestination: Starbase 74\nMessage: We are sending a message to check in. Do you have any information relevant to our mission?",
    verified: false,
    dismissed: false,
    values: {
      preamble: "A long range message needs to be composed.",
      destination: "Starbase 74",
      message:
        "We are sending a message to check in. Do you have any information relevant to our mission?",
    },
    definition: "Compose Long Range Message",
    verifyRequested: false,
    timeElapsedInMS: 0,
    station: "Test Station",
    startTime: "1573178113976",
    endTime: null,
    __typename: "Task",
  },
  {
    id: "102335b0-84df-4cae-9b5a-fe91800592e1",
    instructions:
      "A call must be made within the ship. Make the following internal call:\n        \nLocation: Antimatter Tankage, Deck 14\nMessage: Ensure there is no residual power flow in the junction capacitors.\n        ",
    verified: false,
    dismissed: false,
    values: {
      preamble: "A call must be made within the ship.",
      room: "5ae6f73e-0551-4469-81a5-9b4101dc9dba",
      message:
        "Ensure there is no residual power flow in the junction capacitors.",
    },
    definition: "Internal Call",
    verifyRequested: false,
    timeElapsedInMS: 0,
    station: "Comm",
    startTime: "1573178152723",
    endTime: null,
    __typename: "Task",
  },
  {
    id: "8637aba3-9632-46a3-8159-773f613a8fcb",
    instructions:
      "A security team should be dispatched to ensure the safety of the crew. Create the following security team:\n\nTeam Name: Security Detail\nLocation: Electro-Plasma System Main Trunk, Deck 8\nOrders: Patrol and report back anything that you find.",
    verified: false,
    dismissed: false,
    values: {
      preamble:
        "A security team should be dispatched to ensure the safety of the crew.",
      teamName: "Security Detail",
      orders: "Patrol and report back anything that you find.",
      room: "d6b4bb1f-c480-4fe0-97e5-056316713a6d",
    },
    definition: "Send Security Team",
    verifyRequested: false,
    timeElapsedInMS: 0,
    station: "Security",
    startTime: "1573178292657",
    endTime: null,
    __typename: "Task",
  },
];
