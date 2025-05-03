/*query TaskReport($simulatorId: ID!) {
  taskReport(simulatorId: $simulatorId) {
    id
    type
    name
    stepCount
    tasks {
      id
      verified
      instructions
      verifyRequested
      definition
      station
      assigned
      __typename
    }
    system {
      id
      name
      displayName
      damage {
        damaged
        destroyed
        report
        requested
        reactivationCode
        neededReactivationCode
        currentStep
        validate
        which
        __typename
      }
      __typename
    }
    __typename
  }
}*/
export default [
  {
    id: "df271818-3607-42ca-b3b0-9b4f2eebbef4",
    type: "default",
    name: "Blah!",
    stepCount: 8,
    tasks: [
      {
        id: "929f17e0-a218-4f04-bfaa-7f2c99aa8bd2",
        verified: false,
        instructions:
          "To properly complete the repair of the Warp Engine system, power must be removed from the system. Remove all power from the Warp Engine system.",
        verifyRequested: false,
        definition: "Remove Power",
        station: "Operations",
        assigned: false,
        __typename: "Task",
      },
      {
        id: "d7a3b860-2da2-461b-88da-ce4d528fc714",
        verified: false,
        instructions:
          "To properly complete the repair of the Warp Engine system, power must be restored to the system. Restore power in the Warp Engine system to operational levels.",
        verifyRequested: false,
        definition: "Restore Power",
        station: "Operations",
        assigned: false,
        __typename: "Task",
      },
      {
        id: "607bf1d8-4692-40c7-a913-40e8e459da6f",
        verified: false,
        instructions:
          "To complete this repair report, a reactivation code must be accepted. Ask the Engineering Officer to enter the following reactivation code for the Warp Engine system: §£∂£-∆∂£.",
        verifyRequested: false,
        definition: "Reactivation Code",
        station: "Command",
        assigned: false,
        __typename: "Task",
      },
    ],
    system: {
      id: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
      name: "Warp",
      displayName: "Warp Engine",
      damage: {
        damaged: true,
        destroyed: false,
        report: null,
        requested: false,
        reactivationCode: null,
        neededReactivationCode: null,
        currentStep: 0,
        validate: false,
        which: "default",
        __typename: "Damage",
      },
      __typename: "System",
    },
    __typename: "TaskReport",
  },
];
