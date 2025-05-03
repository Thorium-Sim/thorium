/*  query TaskDefinitions($simulatorId: ID) {
    taskDefinitions(simulatorId: $simulatorId) {
      id
      class
      name
      active
      stations {
        name
        __typename
      }
      valuesInput
      valuesValue
      __typename
    }
  }*/
export default [
  {
    id: "Undock Shuttle",
    class: "Docking",
    name: "Undock Shuttle",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      shuttle: [
        {
          label: "Alpha",
          value: "92fc61cd-4e8f-40be-933f-be583105c2c0",
        },
        {
          label: "Bravo",
          value: "428ec3b9-23ff-473f-992c-2e857a51a888",
        },
        {
          label: "Charlie",
          value: "89402342-4f67-4988-a562-ed42b6ee1239",
        },
        {
          label: "Delta",
          value: "5dc8de48-f56b-4831-8cb6-536cbe602916",
        },
        {
          label: "Echo",
          value: "8f11ac45-9dc4-4a86-9149-0d00facd4d07",
        },
        {
          label: "Foxtrot",
          value: "675341d7-eaa2-452c-bfd9-b2fe674b7117",
        },
      ],
    },
    valuesValue: {
      preamble: "A shuttle needs to be undocked.",
      shuttle: "428ec3b9-23ff-473f-992c-2e857a51a888",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Dock Shuttle",
    class: "Docking",
    name: "Dock Shuttle",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      shuttle: [
        {
          label: "Alpha",
          value: "92fc61cd-4e8f-40be-933f-be583105c2c0",
        },
        {
          label: "Bravo",
          value: "428ec3b9-23ff-473f-992c-2e857a51a888",
        },
        {
          label: "Charlie",
          value: "89402342-4f67-4988-a562-ed42b6ee1239",
        },
        {
          label: "Delta",
          value: "5dc8de48-f56b-4831-8cb6-536cbe602916",
        },
        {
          label: "Echo",
          value: "8f11ac45-9dc4-4a86-9149-0d00facd4d07",
        },
        {
          label: "Foxtrot",
          value: "675341d7-eaa2-452c-bfd9-b2fe674b7117",
        },
      ],
    },
    valuesValue: {
      preamble: "A shuttle needs to be docked.",
      shuttle: "428ec3b9-23ff-473f-992c-2e857a51a888",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Undock All Shuttles",
    class: "Docking",
    name: "Undock All Shuttles",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "All shuttles needs to be undocked.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Dock All Shuttles",
    class: "Docking",
    name: "Dock All Shuttles",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "All shuttles needs to be docked.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Activate Engines",
    class: "Engines",
    name: "Activate Engines",
    active: true,
    stations: [
      {
        name: "Flight Control",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      speed: [
        {
          value: "1/4 Impulse",
          label: "1/4 Impulse",
        },
        {
          value: "1/2 Impulse",
          label: "1/2 Impulse",
        },
        {
          value: "3/4 Impulse",
          label: "3/4 Impulse",
        },
        {
          value: "Full Impulse",
          label: "Full Impulse",
        },
        {
          value: "Destructive Impulse",
          label: "Destructive Impulse",
        },
        {
          value: "Warp 1",
          label: "Warp 1",
        },
        {
          value: "Warp 2",
          label: "Warp 2",
        },
        {
          value: "Warp 3",
          label: "Warp 3",
        },
        {
          value: "Warp 4",
          label: "Warp 4",
        },
        {
          value: "Warp 5",
          label: "Warp 5",
        },
        {
          value: "Warp 6",
          label: "Warp 6",
        },
        {
          value: "Warp 7",
          label: "Warp 7",
        },
        {
          value: "Warp 8",
          label: "Warp 8",
        },
        {
          value: "Warp 9",
          label: "Warp 9",
        },
        {
          value: "Destructive Warp",
          label: "Destructive Warp",
        },
      ],
    },
    valuesValue: {
      preamble: "The engines need to be activated.",
      speed: "Warp 6",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Deactivate Engines",
    class: "Engines",
    name: "Deactivate Engines",
    active: true,
    stations: [
      {
        name: "Flight Control",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "The engines need to be deactivated.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Cool Engine",
    class: "Engines",
    name: "Cool Engine",
    active: false,
    stations: [
      {
        name: "Flight Control",
        __typename: "Station",
      },
    ],
    valuesInput: {
      engine: [
        {
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
          label: "Impulse Engine",
        },
        {
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
          label: "Warp Engine",
        },
      ],
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "An engine is overheating.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Send Exocomp",
    class: "Exocomps",
    name: "Send Exocomp",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
      destination: [
        {
          value: "4ffd7cba-e593-4af1-b3cf-f921b627c1d4",
          label: "Long Range Comm",
        },
        {
          value: "463d81c7-72c1-46a8-86b6-e6b8adb4f56e",
          label: "Internal Comm",
        },
        {
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
          label: "Impulse Engine",
        },
        {
          value: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
          label: "Thrusters",
        },
        {
          value: "cd414584-45b4-4b67-bcf6-d73d43f284b3",
          label: "Navigation",
        },
        {
          value: "cf4808d7-4977-4a9a-a3dc-c0473d0f2aec",
          label: "External Sensors",
        },
        {
          value: "f1ff9ed7-54cd-4742-ab96-9dfee746cb91",
          label: "Internal Sensors",
        },
        {
          value: "68ee4601-9d07-415a-a3b0-6c56bd5e079b",
          label: "Probe Launcher",
        },
        {
          value: "66aea34d-b32a-43f3-a9bb-c06e0ea6ad00",
          label: "Tractor Beam",
        },
        {
          value: "9edf6f06-c112-4924-8edb-50788d3abeaa",
          label: "Transporters",
        },
        {
          value: "d5c1ce52-3463-4bbc-9241-31ab0b4d6eef",
          label: "Battery",
        },
        {
          value: "baeb814e-adb6-4b5e-859e-258393f659d4",
          label: "Reactor",
        },
        {
          value: "3cc8e55c-a9b1-4687-9503-f0bb0c4e4f68",
          label: "Stealth Field",
        },
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
        {
          value: "72308578-edca-4677-b8cf-e7cbb9364ff0",
          label: "Targeting",
        },
        {
          value: "ab226ee7-d3dd-4086-ba0d-c606e3bbb5fb",
          label: "Phaser",
        },
        {
          value: "35d3af1c-3e87-475c-a474-66cc809aa255",
          label: "Coolant",
        },
        {
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
          label: "Warp Engine",
        },
        {
          value: "d0dc42ad-b8bb-46a9-ae29-73f1d813f862",
          label: "Fore Launcher",
        },
        {
          value: "ea7f25cf-e485-46d8-a233-d4c4cb199688",
          label: "Aft Launcher",
        },
        {
          value: "a76c91cb-57a1-4e67-b4c5-5ee6481bbe27",
          label: "Short Range Comm",
        },
        {
          value: "f0c219f4-0ea6-4759-b0e0-4a2dc6d7f26e",
          label: "Signal Jammer",
        },
        {
          value: "e8916d8b-52a4-4a6a-9c79-20775073255b",
          label: "Main Computer",
        },
        {
          value: "558480ca-811b-481e-82fd-ae4a7c475da3",
          label: "THX-1138",
        },
        {
          value: "dbfa0909-933e-43ea-b670-ad7e423fef41",
          label: "Sickbay",
        },
      ],
      parts: "partsPicker",
    },
    valuesValue: {
      preamble: "An exocomp must be sent to operate on a system.",
      destination: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
      parts: ["Prefire Chamber", "Subspace Transceiver"],
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Internal Call",
    class: "Internal Comm",
    name: "Internal Call",
    active: true,
    stations: [
      {
        name: "Comm",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      room: "roomPicker",
      message: "textarea",
    },
    valuesValue: {
      preamble: "A call must be made within the ship.",
      room: "49f0d073-b1d6-4335-841e-08ceb8b6cd94",
      message:
        "Ensure there is no residual power flow in the junction capacitors.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Activate Jump Drive",
    class: "Jump Drive",
    name: "Activate Jump Drive",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "The #SYSTEMNAME should be activated.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Stabilize Jump Drive",
    class: "Jump Drive",
    name: "Stabilize Jump Drive",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "The #SYSTEMNAME is dangerously unstable.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Compose Long Range Message",
    class: "Long Range Comm",
    name: "Compose Long Range Message",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
      {
        name: "Operations",
        __typename: "Station",
      },
      {
        name: "Comm",
        __typename: "Station",
      },
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      destination: "text",
      message: "textarea",
    },
    valuesValue: {
      preamble: "A long range message needs to be composed.",
      destination: "Starbase 101",
      message:
        "We are sending a message to check in. Do you have any information relevant to our mission?",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Decode Long Range Message",
    class: "Long Range Comm",
    name: "Decode Long Range Message",
    active: false,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
      {
        name: "Operations",
        __typename: "Station",
      },
      {
        name: "Comm",
        __typename: "Station",
      },
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      messageOrDestination: "text",
    },
    valuesValue: {
      preamble:
        "A long range message has been recieved and needs to be decoded.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Intercept Signal",
    class: "Long Range Comm",
    name: "Intercept Signal",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "A signal has been detected and may be processed.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Compose Intership Message",
    class: "Intership Messaging",
    name: "Compose Intership Message",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
      {
        name: "Flight Control",
        __typename: "Station",
      },
      {
        name: "Engineering",
        __typename: "Station",
      },
      {
        name: "Tactical",
        __typename: "Station",
      },
      {
        name: "Operations",
        __typename: "Station",
      },
      {
        name: "Sensors",
        __typename: "Station",
      },
      {
        name: "Comm",
        __typename: "Station",
      },
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      destination: "text",
      message: "textarea",
    },
    valuesValue: {
      preamble: "A message should be sent inside the ship.",
      destination: "",
      message: "",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Raise All Shields",
    class: "Shields",
    name: "Raise All Shields",
    active: true,
    stations: [
      {
        name: "Tactical",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "The shields need to be raised.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Lower All Shields",
    class: "Shields",
    name: "Lower All Shields",
    active: true,
    stations: [
      {
        name: "Tactical",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble: "The shields need to be lowered.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Raise Shield",
    class: "Shields",
    name: "Raise Shield",
    active: true,
    stations: [
      {
        name: "Tactical",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      shield: [
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
      ],
    },
    valuesValue: {
      preamble: "The #SYSTEMNAME need to be raised.",
      shield: "895c48fe-923b-49ba-8c03-deff9579c30f",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Lower Shield",
    class: "Shields",
    name: "Lower Shield",
    active: true,
    stations: [
      {
        name: "Tactical",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      shield: [
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
      ],
    },
    valuesValue: {
      preamble: "The #SYSTEMNAME need to be lowered.",
      shield: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Set Shield Frequency",
    class: "Shields",
    name: "Set Shield Frequency",
    active: true,
    stations: [
      {
        name: "Tactical",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      shield: [
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
      ],
      frequency: {
        type: "number",
        min: 100,
        max: 350,
      },
    },
    valuesValue: {
      preamble: "The frequency of the #SYSTEMNAME needs to be changed.",
      shield: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
      frequency: 257.2,
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Admit Patient",
    class: "Sickbay",
    name: "Admit Patient",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
      crew: [
        {
          value: "00775445-44ef-40ee-a87d-aa0d9f2b8159",
          label: "Courtney Holt",
        },
        {
          value: "9600e40a-0293-48d3-b71b-1f49d1dc5237",
          label: "Gavin Meyer",
        },
        {
          value: "033e08bf-b6e6-4e59-a576-ef35eeafc5e9",
          label: "Gloria Roach",
        },
        {
          value: "7c920570-4001-405e-aaf2-e82e4ba45fc4",
          label: "Bodhi Stark",
        },
        {
          value: "0816763c-29c7-40ff-9b05-4784489c0fe3",
          label: "Jonas Madden",
        },
        {
          value: "9ed4a8bc-5a9f-4581-8ce3-6c2f3b61641a",
          label: "Alex Hicks",
        },
        {
          value: "2e1f246f-1a6f-4d40-818e-bea880bcdb4d",
          label: "Leo Monson",
        },
        {
          value: "209eecdb-217e-413a-a533-d0e2c3b5dc39",
          label: "Mara Hines",
        },
        {
          value: "6671e41b-f05d-495d-8a7a-bcb15dac15a8",
          label: "Julio Castillo",
        },
        {
          value: "ad244a67-7d07-461f-8dd9-cfbb8d06b88a",
          label: "Moses Cobb",
        },
        {
          value: "877f6f85-05e5-4fd5-aca8-e41a1d477b1d",
          label: "Autumn Nguyen",
        },
        {
          value: "0ea18615-ff1a-4591-a625-62b9aeb53a10",
          label: "Hadley Gallagher",
        },
        {
          value: "75af1ab9-b0ac-46fa-814d-e726839e75a1",
          label: "Lucian Holland",
        },
        {
          value: "4c5c37dc-c31a-4f3c-af89-2d9c27208422",
          label: "Amelia Delgado",
        },
        {
          value: "382c8e3a-8a89-4da4-88a7-d45421c56338",
          label: "Brecken Grooves",
        },
        {
          value: "933580b2-8fa5-46b8-a588-199532f96394",
          label: "Laila Kerr",
        },
        {
          value: "6b9b7745-6404-46a0-ac7f-b520a2a457c0",
          label: "Laurel Massey",
        },
        {
          value: "93646e82-3915-4ad8-85d5-631320186e25",
          label: "Kimberly Cannon",
        },
        {
          value: "8c57cf5e-c91d-44e9-bd9a-560752a44754",
          label: "Alena Warren",
        },
        {
          value: "6072df11-50ff-4f9a-814a-51b4b0723e46",
          label: "Camden Grimes",
        },
        {
          value: "f581ee66-b3cb-4691-912c-ae83e5899ad4",
          label: "Anabelle Caldwell",
        },
        {
          value: "ce4a5ed2-2e7f-4414-8be8-070f6908424a",
          label: "Lillian Webb",
        },
        {
          value: "b9b1e8fc-19e5-444b-bd1a-7bfd56e26f8d",
          label: "Marvin Schneider",
        },
        {
          value: "a70d8b5b-ece6-4256-8b07-b3207147967a",
          label: "Larry Marquez",
        },
        {
          value: "12cf7bd8-1949-4608-8e6f-c345c732ae72",
          label: "Greyson Hunter",
        },
        {
          value: "91d33470-af46-45a5-b091-444a96da19dd",
          label: "Jimmy Rojas",
        },
        {
          value: "6651a5d6-8eca-45d6-bb79-318d1ca049cc",
          label: "Alonzo Carr",
        },
        {
          value: "6575b0d1-b5a4-4574-8378-d0f2252c5c10",
          label: "India Dean",
        },
        {
          value: "dbdf3677-4abe-4889-bc6d-433263a8049b",
          label: "Cody Fields",
        },
        {
          value: "4c8c5e54-56d9-416b-b16c-579e948974fb",
          label: "Zachary Knight",
        },
        {
          value: "e393ed97-2d2c-4d34-8ef1-9546a3d8f03b",
          label: "Sean Mcguire",
        },
        {
          value: "c4b5d22f-183f-4be0-b684-0c7ed60b917b",
          label: "Brandon Webster",
        },
        {
          value: "cae049e9-1cea-4d6b-8dda-76199da4c19e",
          label: "Caylee Sosa",
        },
        {
          value: "af25653d-ec0e-474e-8b31-ead53f9f327f",
          label: "Travis Beltran",
        },
        {
          value: "9e5bb13e-78b0-4f3d-99d7-e768612b862c",
          label: "Collin Mccall",
        },
        {
          value: "ede15989-d929-4420-9317-3a127d49ad06",
          label: "Mario Gallagher",
        },
        {
          value: "01c70962-f971-46e1-abe5-172d03caf2cf",
          label: "Jacob Marshall",
        },
        {
          value: "6d6a91ef-aac0-472f-a64d-e6a00b0ff56c",
          label: "Brittany Glenn",
        },
        {
          value: "554791e8-4879-49de-b1f5-423db5eb4440",
          label: "Gwen Lynch",
        },
        {
          value: "bc3e3dd0-92de-484c-b559-9fa29a15895e",
          label: "Desiree Powell",
        },
        {
          value: "bfb778ad-dd47-48d6-abeb-094ef734faf7",
          label: "Wyatt Stanley",
        },
        {
          value: "e804628f-911c-416d-9ed7-05b2c9f87335",
          label: "Olivia Novak",
        },
        {
          value: "ead4bcfd-d712-4141-88b9-f69c952b21a0",
          label: "Jack Fox",
        },
        {
          value: "ff9fa0d9-8b2d-4eea-8da9-7ed723a42e06",
          label: "Ivan Gregory",
        },
        {
          value: "81db1e59-0eb6-4ef8-bd3e-5c90a8a8d394",
          label: "Barbara Burnett",
        },
        {
          value: "52b893ce-0545-49b2-94fe-deba4b916a34",
          label: "Kylee Farrell",
        },
        {
          value: "a23e2f66-c4fd-4a3b-810f-afbfb09a5d40",
          label: "Daisy Flowers",
        },
        {
          value: "c18d3a38-7724-4d6f-b656-48c751cdf75f",
          label: "Benson Perez",
        },
        {
          value: "9bcd2a40-fdb4-4b7b-a944-cc50642dcbfb",
          label: "Teresa Boone",
        },
        {
          value: "67595cd1-edcb-4167-86ea-ed4fe5bb9a08",
          label: "Milo Bass",
        },
        {
          value: "1bf78bfa-3f7c-4c8d-a1d2-d2ecb4871d39",
          label: "Matilda Oneal",
        },
        {
          value: "bc1e5e45-324d-4cc3-a63d-f5c5b3f63ac5",
          label: "Ruby Noble",
        },
        {
          value: "42d38e98-9dbc-4be7-ba73-ec810c89165e",
          label: "Violet Young",
        },
        {
          value: "850d44d5-d1cf-42a8-b21d-20c4b5130f96",
          label: "Denise Sharp",
        },
        {
          value: "e5b3bbda-ca8d-4526-9814-c4a165b55dbf",
          label: "Jasper Gill",
        },
        {
          value: "52fdb209-77a8-48e3-833e-c8d9f51b820f",
          label: "Rosemary Whitaker",
        },
        {
          value: "96df1c9e-6cca-4847-ae6b-420469937968",
          label: "Tessa Becker",
        },
        {
          value: "f84207b4-8cda-4ba7-9929-da9640f77b83",
          label: "Emma Donaldson",
        },
        {
          value: "2d5c841c-c449-4a5e-8678-45bd665a369c",
          label: "Kate Mckinney",
        },
        {
          value: "a4acbd9e-babc-4a91-8d6b-68370a7239ff",
          label: "Corinne Bernard",
        },
        {
          value: "8036ad04-8327-4baa-b258-5d79dce3b27f",
          label: "Darius Clarke",
        },
        {
          value: "4756fe59-c1a7-4270-a224-bc31435ba883",
          label: "Martin Eaton",
        },
        {
          value: "24176fad-db50-43b0-b56f-2a4b1c1efac7",
          label: "Hector Davidson",
        },
        {
          value: "17b40ea8-accf-4aee-b6d2-e489c09d1cd9",
          label: "Rene Dupont",
        },
        {
          value: "927c94c6-9257-4ecf-9d41-9263017327d6",
          label: "Alondra Nicholson",
        },
        {
          value: "fee375a7-6029-47ac-af4f-3c479a78c666",
          label: "Alfred Dunlap",
        },
        {
          value: "7a82cf21-c5ab-4568-8473-491d3db037bb",
          label: "Raphael Mancini",
        },
        {
          value: "b8fa8b25-65ef-4500-80e6-d33585f50ee9",
          label: "Aarav Ramsey",
        },
        {
          value: "a0f4abb1-61cf-4485-9202-1b636879fddd",
          label: "Richard Dean Anderson",
        },
        {
          value: "7d0ad279-d811-451b-ae93-c1ffe50863ac",
          label: "Kendall Daugherty",
        },
        {
          value: "f03cc3cc-4a25-4ea6-bb16-49845b47b7e6",
          label: "Nathan West",
        },
        {
          value: "6014c8b1-180c-46a3-b299-544a2852e676",
          label: "Marcus Frey",
        },
        {
          value: "75a7bde8-0441-43b0-b99a-733ea028d208",
          label: "Jared Key",
        },
        {
          value: "4900ad97-b97f-4ec2-b169-2e2347921291",
          label: "Asia Long",
        },
        {
          value: "0bdfdee5-9484-482b-902c-f1a0f88a1e9b",
          label: "Michelle Colon",
        },
        {
          value: "2aa4a69a-5e38-4083-aed2-24d38ff02072",
          label: "Rachel Rosario",
        },
        {
          value: "1b829a3c-c794-4147-9745-ea35d7efee4f",
          label: "Eva Wolf",
        },
        {
          value: "c28a2825-d5e3-4b17-bad4-692f1da889bf",
          label: "Otto Finley",
        },
        {
          value: "473ff61d-e306-4ad9-911e-4bb72309dec5",
          label: "Gino Gentry",
        },
        {
          value: "50ddbe70-492d-488d-bb94-d00e32cce22f",
          label: "Christian Farmer",
        },
        {
          value: "8c828a90-8175-42e4-803f-68ce5d64e764",
          label: "Damien Baird",
        },
        {
          value: "6c264ea8-005e-485d-bbb5-75edb9ee892b",
          label: "Genesis Dixon",
        },
        {
          value: "05199ba6-acc6-454d-b807-5b66c3c956af",
          label: "Maddison Dennis",
        },
        {
          value: "53d11393-f006-4abd-869d-3df2088c4e26",
          label: "Aaron Fuller",
        },
        {
          value: "0801f1ba-0c7a-44a0-a688-0c6ad48a2b2b",
          label: "Emily Henson",
        },
        {
          value: "d2246821-f7c3-448f-99f6-c3283d4ead83",
          label: "Nikolai Stokes",
        },
        {
          value: "38cb01b9-d073-4c6f-a1c2-1bf6e23cab21",
          label: "Owen Little",
        },
        {
          value: "98123c41-757b-4d93-9204-6e6b01f23b62",
          label: "Lorenzo Atkins",
        },
        {
          value: "ff07763b-cabd-4d2d-99d1-44e29b1068f6",
          label: "Corey Hathaway",
        },
        {
          value: "06633c33-6167-439c-a3be-82768cc3dc0f",
          label: "Kailyn Hensley",
        },
        {
          value: "d298264a-3fe1-4af5-8f5a-c9c597b63359",
          label: "Celeste Pace",
        },
        {
          value: "766cd180-500f-4cdf-9e5c-8242d2870a3e",
          label: "Cindy Sparks",
        },
        {
          value: "0b7ba44c-f537-4754-b3dd-00008adfb59e",
          label: "Ace Bartlett",
        },
        {
          value: "7b5f579a-a4ba-4ec4-a857-70dbe61c2fce",
          label: "Dax Santos",
        },
        {
          value: "9f6f9eb9-0d98-4cdc-bd8b-698b80567e7e",
          label: "Zoe Watson",
        },
        {
          value: "c537c3da-a1d8-4e8c-aef0-a38167e0dd54",
          label: "Maverick Ballard",
        },
        {
          value: "5d8004d8-ec18-4713-83a1-1982fd5136eb",
          label: "Addilyn Ryan",
        },
        {
          value: "0c5faba2-2ed5-4397-9e6d-5aecdd754b81",
          label: "Logan Hulick",
        },
        {
          value: "3d82b343-7518-4c9f-be79-9d47798f03d4",
          label: "Allison Moran",
        },
        {
          value: "c1a196c1-7dc8-4639-967b-944df89ca6f1",
          label: "Alec Mercer",
        },
        {
          value: "45c068ee-ba36-40c9-8db2-c86954ce5b92",
          label: "Garrison Schultz",
        },
        {
          value: "b4fc2935-83c9-48c6-b850-2117097b41b9",
          label: "Roy Church",
        },
        {
          value: "f233e217-18e9-40e7-a5d5-cf1c9b4873ad",
          label: "Janessa Green",
        },
        {
          value: "44705aff-50fb-4e1b-9d1d-87872fc37196",
          label: "Diego Sexton",
        },
        {
          value: "6c59f6b9-15d1-418c-9e5d-6b62211e1396",
          label: "Taryn Faulkner",
        },
        {
          value: "d8b99876-5162-4892-80fe-35db9afa2280",
          label: "Hayley Wu",
        },
        {
          value: "65dad0b6-69cd-4660-b9ee-aed6102136cc",
          label: "Kaden Chaney",
        },
        {
          value: "9cf9524b-0aec-4fef-af89-53ef813f01b1",
          label: "T’Laren Doe",
        },
        {
          value: "8d50caaa-c87b-4c3b-bdbd-312f57f14f8e",
          label: "Tanner Edwards",
        },
        {
          value: "825e1697-ff77-4d44-aa44-536321fd235e",
          label: "Devin Wall",
        },
        {
          value: "7d6817e6-becc-42a1-8885-a2174d784258",
          label: "Edward Parks",
        },
        {
          value: "a35be52a-9aa6-499b-8eee-c26e513f2944",
          label: "Lamar Mays",
        },
        {
          value: "67367b76-1e6b-48a1-8f11-e181b7f4b030",
          label: "Ashton Drake",
        },
        {
          value: "f979046d-d613-4328-8a42-4f8eb6e22d80",
          label: "Owen King",
        },
        {
          value: "ba515559-a333-4f20-829b-8fd00c4e8228",
          label: "Sawyer Singleton",
        },
        {
          value: "10e4082f-5f6c-4799-93fb-c4c24074fed0",
          label: "Curtis Mcgrath",
        },
        {
          value: "51dd521e-c618-4da3-8ce2-bba051aca894",
          label: "Orion Sandoval",
        },
        {
          value: "3f5fd35f-75bc-4693-9878-11bb26595d3e",
          label: "Nora Horn",
        },
        {
          value: "2b6ac02a-dc9b-45fc-b041-f49925312b20",
          label: "Fabian Deleon",
        },
        {
          value: "706aabec-e197-42fa-9a45-76b3cbfea8df",
          label: "Gustavo Rocha",
        },
        {
          value: "0ce974ea-364b-4240-a046-0e527409a579",
          label: "Cassandra Bentley",
        },
        {
          value: "383fb363-b54f-4f28-8ebb-9425cf431b77",
          label: "Layton Ali",
        },
        {
          value: "a1e4f036-192f-4259-8984-6e0d848b7cd6",
          label: "Cameron Carpenter",
        },
        {
          value: "4a13c66d-b5f3-47d5-8d3a-53e59b493af1",
          label: "Jessie Anderson",
        },
        {
          value: "ba1d58b6-1c11-407f-9c54-69597b7a117a",
          label: "Isaac Decker",
        },
        {
          value: "da38bb3f-453d-4ff3-83e1-f382cab040bb",
          label: "Hugo Miller",
        },
        {
          value: "76d35a37-abd9-474c-a45b-43cd876f3146",
          label: "Tony Novak",
        },
        {
          value: "c7728454-fe7a-41ea-875a-24e7c1cd2afe",
          label: "Kenia Palmer",
        },
        {
          value: "3191965a-ec47-48a6-9d18-759ef8aeb90f",
          label: "Ezra Santana",
        },
        {
          value: "f342742e-6746-40c0-b1d6-9e93747ebd47",
          label: "Megan Nolan",
        },
        {
          value: "84f37f59-9e35-41ab-8ddc-dc76a7aacc1e",
          label: "Breanna Norris",
        },
        {
          value: "75b65b79-a5f7-438c-9e17-a8607df317d0",
          label: "Noe Tate",
        },
        {
          value: "985226e7-f377-46cb-b075-19a5b336f332",
          label: "Nico Ritter",
        },
        {
          value: "32fc1f4a-dfd0-4703-90b7-2350a9dbd73c",
          label: "Ahmed Villanueva",
        },
        {
          value: "6d799cd8-930d-4ad4-b971-4f3739d6efea",
          label: "Francesca Delacruz",
        },
        {
          value: "0193a078-4349-42f6-8633-95ca03adccef",
          label: "Lionel Logan",
        },
        {
          value: "de327b3a-6508-42a0-b6aa-5c10322f6f1b",
          label: "Ivy Melton",
        },
        {
          value: "2446cd5a-9a26-4fd9-9ea8-72d2e222284f",
          label: "Sandra Cortez",
        },
        {
          value: "735e3eac-87f6-4fe2-a255-79d280f0aef2",
          label: "Diana Garner",
        },
        {
          value: "ffa8eb95-d52d-40a2-b2b7-4b2e1ab37dca",
          label: "Payton Hanson",
        },
        {
          value: "574ef595-41be-46fa-a493-83364f14f6f5",
          label: "Jenny Mcguire",
        },
        {
          value: "3e034ab3-8b54-4060-9611-49792882b38b",
          label: "Oliver Conley",
        },
        {
          value: "6b346222-3422-4719-82f6-5f195dca2501",
          label: "Felix Carey",
        },
        {
          value: "be5ddbfe-9bd3-4c60-b569-5d719eb93a0a",
          label: "Cyrus Tanner",
        },
        {
          value: "103d849d-cdcd-4b64-a2a8-c37f1af71e8a",
          label: "Dominic Kaufman",
        },
        {
          value: "0b2e6ec7-12ce-438f-9dd3-bfcddd254892",
          label: "Camille Merritt",
        },
        {
          value: "a9f35863-b8da-4121-bde5-073df28e310a",
          label: "Connor Wheeler",
        },
        {
          value: "b2e3d72c-f5eb-465f-9e47-e89af9fc0b4b",
          label: "Raven Lester",
        },
        {
          value: "71e2ba45-9204-4885-8863-a9ff25df4e53",
          label: "Savannah Keller",
        },
        {
          value: "6a37534b-9d2a-40c3-869c-7ef57c45ff32",
          label: "Adrian Stevens",
        },
        {
          value: "2c349b65-9c14-43df-8584-d3f056004f58",
          label: "Cora Bond",
        },
        {
          value: "373e1feb-a880-4fcc-9092-50acd0fa13c5",
          label: "Flynn Dalton",
        },
        {
          value: "19f1c004-1b0c-4317-9f67-d87d429d2209",
          label: "Sidney Irwin",
        },
        {
          value: "7ed91d1a-f745-43c9-b1e4-9d7527ea1036",
          label: "Ronald Fowler",
        },
        {
          value: "157b5286-cefe-41b0-b6f0-de0a32811eb1",
          label: "Adrian Gould",
        },
        {
          value: "d15b1412-aa1f-49c0-8446-baeda22bf0c1",
          label: "Belen Hardin",
        },
        {
          value: "432cacae-00fc-44db-b6dd-75cdb68776b7",
          label: "Victoria Harrell",
        },
        {
          value: "592f3161-a81e-4a02-957c-f3637312bd74",
          label: "Gary Davenport",
        },
        {
          value: "c9eedd75-4148-4d81-98f8-ea50dc4e4054",
          label: "Lindsey House",
        },
        {
          value: "8d8cb5c9-ba29-4520-82c1-418ee5252dc9",
          label: "Zane Li",
        },
        {
          value: "53ca83ba-acc2-44a7-ac3e-a3ee776fbfdb",
          label: "Alyssa Little",
        },
        {
          value: "63af38eb-4e3a-435b-99b3-3aaffd1d356f",
          label: "Paris Mcneil",
        },
        {
          value: "84a42535-1df3-48f6-8673-c306ac14e6b8",
          label: "Addison Harvey",
        },
        {
          value: "f9f942f4-4a39-4adc-9e36-e825f184d485",
          label: "Levi Moore",
        },
        {
          value: "90359838-1464-4587-ada1-131c01856490",
          label: "Sloan Osborne",
        },
        {
          value: "59fc8a20-a273-4a19-8a63-4e9928c30cf6",
          label: "Solomon Ramos",
        },
        {
          value: "34233382-26ab-4992-86b2-92ddea3161c2",
          label: "Sullivan Rice",
        },
        {
          value: "d66608d6-29d7-4c04-85cd-3a3378f99826",
          label: "Nicole Sims",
        },
        {
          value: "bfeb5278-ea3a-4c7f-b742-36eddf04d651",
          label: "Isabella Mendoza",
        },
        {
          value: "90660db8-5690-43b5-b034-79e389f5554d",
          label: "Vincent Valencia",
        },
        {
          value: "1eb78f55-db39-48de-813a-8c4c52966d22",
          label: "David Berger",
        },
        {
          value: "37a1e56a-c407-4727-9c3a-31a422695d89",
          label: "Samson Reyes",
        },
        {
          value: "3500bc95-da9b-4f04-882a-962df0e4d542",
          label: "Axel Pace",
        },
        {
          value: "9da57699-fe42-49d2-b713-a056fe495a71",
          label: "Aleena Stewart",
        },
        {
          value: "d746dbf1-ccac-4c83-8952-1912c7b002e9",
          label: "Stephanie Drake",
        },
        {
          value: "be689f12-fff8-4b85-98e5-79a696fa52cd",
          label: "Derek Terrell",
        },
        {
          value: "d619e0c2-3fec-48c5-aaba-657f5bae93cb",
          label: "Jane Hobbs",
        },
        {
          value: "69ffc705-2ac4-4f06-a7d4-c123b95b59ef",
          label: "Kora Gray",
        },
        {
          value: "7e84aba5-7936-4aff-ab5e-94bf526c9ae7",
          label: "Elaine Burch",
        },
        {
          value: "629876b3-d1ed-431f-b1cf-0debccb10d51",
          label: "Tabitha Odom",
        },
        {
          value: "321d6e64-38bc-4647-8be4-31032b4ac97c",
          label: "Mallory Oilver",
        },
        {
          value: "3ef0e1e3-5e01-4fd3-b140-e18ea5d5079e",
          label: "Mitchell Solis",
        },
        {
          value: "ed46a6c4-a005-42b6-b437-e33de67bdd1a",
          label: "Quentin Own",
        },
        {
          value: "c9ce52c4-8720-452b-9291-8e3363661098",
          label: "Aurelia Smith",
        },
        {
          value: "8970e3df-1bc8-436e-9c89-7ac3642bfe69",
          label: "Trey Rush",
        },
        {
          value: "c5bfb61a-8e03-4afa-844b-27421fd57c1d",
          label: "Winston Woodard",
        },
        {
          value: "4b6681f8-2dcb-4205-89dd-f5484ddbe332",
          label: "Patricia Francis",
        },
        {
          value: "cf88dd8e-62d6-4a57-86f0-7f235dfbd6db",
          label: "Ivan Camacho",
        },
        {
          value: "119ea949-5041-4c6c-8347-c5f9bfbcd7c5",
          label: "Iris Nash",
        },
        {
          value: "c7cc4a8b-a778-46e0-b943-5f2b70ad2953",
          label: "Ryan Rivers",
        },
        {
          value: "6f4053d5-5977-428b-96e7-a4c51b0ae9ad",
          label: "Noah Mccarthy",
        },
        {
          value: "f1e9b585-075b-4c25-b3f8-bf436a698a3f",
          label: "Danielle Holden",
        },
        {
          value: "59ec07ba-8bfe-4085-a1b2-7a10540ccc5c",
          label: "Riley Mcewan",
        },
        {
          value: "0f9cda64-6a36-4bdd-a71b-265e814298be",
          label: "Leonard Moss",
        },
        {
          value: "23d12013-840f-4a11-9b8c-89d2d6613bed",
          label: "John Morse",
        },
        {
          value: "71dc4886-7d62-47ae-93b0-faa554111c0a",
          label: "Jeremy Yates",
        },
        {
          value: "31bc8deb-324a-4a10-b4df-30b546ae1ea5",
          label: "Claudia Heath",
        },
        {
          value: "3a73b06b-efca-4cbe-beec-808d7fe5a120",
          label: "Daniel Rogers",
        },
        {
          value: "ee0be184-0384-4b88-9c10-4097893181b8",
          label: "Hazel Stone",
        },
        {
          value: "07c73cf3-d73c-44e8-95a7-cd241237ec83",
          label: "Uriel Suarez",
        },
        {
          value: "979f99f9-21b5-432b-9ad6-eb70828b912c",
          label: "Cedric Lawrence",
        },
        {
          value: "0cbb0301-a969-4c20-b248-3e042007016e",
          label: "Bridger Mathews",
        },
        {
          value: "01341cfe-929a-448e-83fa-927e4c71a0f3",
          label: "Erik Moon",
        },
        {
          value: "e7d7bcd1-6d52-468d-888a-034cf5f80da9",
          label: "Truman Patrick",
        },
        {
          value: "782582d8-61a7-413b-b27e-7646c85eb415",
          label: "Adan Fuentes",
        },
        {
          value: "e88ad933-6ce1-4c8f-84ba-51f8ca82ee07",
          label: "Carley Harper",
        },
        {
          value: "69f5e998-d4cc-4d5b-a412-84fc19ea8a7e",
          label: "Roxanne Bauer",
        },
        {
          value: "d07bcd88-56b4-421f-9591-b493fbd50352",
          label: "Samuel Dudley",
        },
        {
          value: "93b3b6a7-05f2-4714-96f8-90ae5e6e24a8",
          label: "Artillery Rowe",
        },
        {
          value: "c1c6e832-d141-4ed5-83df-0f3c01294ab0",
          label: "Mckenzie Baldwin",
        },
        {
          value: "2a1b3ed3-6cdc-417d-86a1-43a82555f9cb",
          label: "Andrew Cooke",
        },
        {
          value: "80492295-e595-479e-a295-455ed0c93641",
          label: "Elias Harrell",
        },
        {
          value: "385261da-46d6-4e89-a16d-c7d01ed4d5fc",
          label: "Saul Armstrong",
        },
        {
          value: "b723720d-7617-4865-98e1-475a487e9e02",
          label: "Jazmine Mann",
        },
        {
          value: "0b1087eb-d6f9-4a86-b4a7-e41a1cb42e90",
          label: "Ramon Reid",
        },
        {
          value: "00b7beef-fccf-4f9a-bb5e-637c55a58faf",
          label: "Dalilah Sweeney",
        },
        {
          value: "14102b31-a2e7-4d1d-97b0-6bdc6fd3cd18",
          label: "Naomi Olsen",
        },
        {
          value: "f2ddc995-2d8c-4805-828f-44ad3bc3e173",
          label: "Aleigha Morse",
        },
        {
          value: "5ab474c6-402e-4b51-8760-0de713f64b8a",
          label: "Omar Holder",
        },
        {
          value: "81ebaa5e-5170-4b11-9a51-b1c96ab5fbbe",
          label: "Drew Patel",
        },
        {
          value: "47dd4f12-cb04-47f7-8c51-800cb393e567",
          label: "Vivian King",
        },
        {
          value: "5d536637-5715-4a7c-b83b-dc166a2e028a",
          label: "Jaden Howe",
        },
        {
          value: "ed431268-b1d6-4ff3-bd0d-e3504124e99a",
          label: "Anne Lambert",
        },
        {
          value: "6ffc0f59-466e-468f-984c-78c4e3ed3e44",
          label: "Kiana Barry",
        },
        {
          value: "07535481-7133-495e-8eb4-44da313ff2bf",
          label: "Carter Ward",
        },
        {
          value: "92bd7d74-67d4-4c7b-9811-0c11d3946db4",
          label: "Brock Robles",
        },
        {
          value: "559f8692-e14f-49c3-aa7a-e4b8161fa67d",
          label: "Ariel Henry",
        },
        {
          value: "a1467f90-f3f1-4956-b952-0170b78dd83b",
          label: "Deangelo Riggs",
        },
        {
          value: "fbfde2e1-ad68-45ec-be41-d490ddb5bb17",
          label: "Brenna Turner",
        },
        {
          value: "028c4126-28fa-46b4-90ee-6ae8c5b8ef1e",
          label: "Jake Cummings",
        },
        {
          value: "906c7ee6-d497-4fbf-a29b-eb5342092d75",
          label: "Angelo Golden",
        },
        {
          value: "04362c8a-2e47-4e59-b839-b7c4210e7f72",
          label: "Sergio Baldwin",
        },
        {
          value: "fa387ba0-c656-4264-ac32-e8091f0b6616",
          label: "Morgan Bates",
        },
        {
          value: "05f23ed8-2b76-4cc9-b749-7739a2638d03",
          label: "Brycen Baxter",
        },
        {
          value: "3a704017-e66b-4691-903f-adea194cdfbe",
          label: "Warren Becker",
        },
        {
          value: "44a31fb2-b63c-4118-837e-2caa79ac13f6",
          label: "Chloe Baird",
        },
        {
          value: "242e2a95-2ebc-4dc5-a433-352fbdeb4467",
          label: "Mauricio Brandt",
        },
        {
          value: "bf3a8cbe-9f4b-42d0-8855-69e5a056165a",
          label: "Alexis Byrd",
        },
        {
          value: "ae0e500a-bd3a-4b8f-b92a-8194e6015b14",
          label: "Morgan Callahan",
        },
        {
          value: "1c00dbe3-f7e6-4569-b68a-7c349c6564aa",
          label: "Carmen Carrillo",
        },
        {
          value: "beac9798-4ffd-4134-8bc0-fe67acc88ba3",
          label: "Bianca Black",
        },
        {
          value: "e4d67b23-463a-4387-82ff-2527a919173f",
          label: "Keira Castro",
        },
        {
          value: "9eb40e79-db43-4ca6-9b93-8a0ed3023bd2",
          label: "Taylor Clark",
        },
        {
          value: "2ffe6f60-1062-4f8a-831a-86f795aa3e05",
          label: "Mark Clements",
        },
        {
          value: "849f4c71-8996-467b-a494-02b47d64fa3b",
          label: "Natasha Cooley",
        },
        {
          value: "dc631f4a-f31e-4ead-8561-6bdaf56a0a6f",
          label: "Arthur Castro",
        },
        {
          value: "aac20135-5b9d-4b52-a756-f08b4988a4a8",
          label: "Andre Farley",
        },
        {
          value: "672ebd97-54df-4627-b2ed-285781282146",
          label: "Alan Fitzpatrick",
        },
        {
          value: "5ae5cee9-3e50-46e2-858d-e166d79a5bbb",
          label: "Randy Fleming",
        },
        {
          value: "09f0ae94-fda4-4473-8f9b-62922610efff",
          label: "Bethany Guzman",
        },
        {
          value: "4ba5328f-2ef8-4c88-aec3-e29fba9018c2",
          label: "Alma Davies",
        },
        {
          value: "4121100e-30f2-4127-b385-fca77896bc28",
          label: "Alice Ibarra",
        },
        {
          value: "d6aceb76-febf-49da-b298-afa189f40a34",
          label: "Rocco Landry",
        },
        {
          value: "bdede555-d549-4358-b482-bfb876f173bc",
          label: "Amos Lin",
        },
        {
          value: "f0444d81-925e-4feb-baea-413aefacdeb7",
          label: "Bobby Lloyd",
        },
        {
          value: "14be6ebd-fe83-46e7-a456-8ae079f4a86c",
          label: "Chris Martin",
        },
        {
          value: "c30914f4-2d10-4065-a907-fad4a6b6a5e3",
          label: "Samara Hartman",
        },
        {
          value: "44718415-dd86-4392-8a9f-729cc7e92f79",
          label: "Monica Maxwell",
        },
        {
          value: "da2f4f16-0627-46cd-9094-57c79de48c82",
          label: "Jamal Meza",
        },
        {
          value: "75bac8df-32f3-4b9d-9ba7-03f2ca5a06b9",
          label: "Mikaela Neal",
        },
        {
          value: "febe6b03-7a08-4e82-933e-42cf5798d81f",
          label: "Kyree Ortega",
        },
        {
          value: "7c579a97-02b8-4879-b16b-f21d2d2641f1",
          label: "Fernanda Pennington",
        },
        {
          value: "1ff7a165-206c-4394-99af-28642f0e7374",
          label: "Reagan Perry",
        },
        {
          value: "3a9b6de6-0433-497f-84f6-24b3b732c41c",
          label: "Sofia Potter",
        },
        {
          value: "117dec68-0c33-4a76-892b-bd89ee85c111",
          label: "Antoine Preston",
        },
        {
          value: "3e1c2966-4cd6-407e-8e20-8694a19c0fd3",
          label: "Vanessa Rudd",
        },
        {
          value: "b467aa0b-5eb9-4b58-9365-07592078f53d",
          label: "Karen Tucker",
        },
        {
          value: "9639105f-3178-4cd0-8a76-7ff4a8ea5c1b",
          label: "Casey Wilcox",
        },
        {
          value: "16765b72-df8b-43b9-894a-93922248cf8d",
          label: "Pierre Dubois",
        },
        {
          value: "e81d0217-042e-407c-84c9-a3c93608747f",
          label: "Angel Diaz",
        },
        {
          value: "af6fba1d-679b-4804-9a85-ce63c2273d19",
          label: "Gwyneth Martin",
        },
        {
          value: "b358382f-d6c9-4e0a-a969-767e7e6f9260",
          label: "Kyle Haas",
        },
        {
          value: "d94ef0a4-f9cc-4970-ac9f-9d054c5b784b",
          label: "Kyson Mcknight",
        },
        {
          value: "8f28d56b-8e21-4f40-aad2-52c6ba147dc8",
          label: "Frances Bowers",
        },
        {
          value: "9bd406a7-d5fd-4e07-9df6-3f597f384496",
          label: "Ulises Rose",
        },
        {
          value: "30646f92-3f98-4c27-a2f3-5793a98cdbd3",
          label: "Byron Sheppard",
        },
        {
          value: "6e758250-3e28-45c0-8ee7-b71fb0d7bf49",
          label: "Nancy Bowen",
        },
        {
          value: "cc129672-c1ad-497d-982a-147cfff9edc8",
          label: "Amara Chandler",
        },
        {
          value: "6021379e-cff6-4a88-ba1e-adbf661d208a",
          label: "Miranda Roberts",
        },
        {
          value: "f825315b-a931-4eb2-a0e0-2c2099967389",
          label: "Mia Stafford",
        },
        {
          value: "4918fe0a-34dc-4df3-b2ea-c197399599b3",
          label: "Lincoln Bates",
        },
        {
          value: "9e901847-c53b-4aa2-b268-8c9781860dd1",
          label: "Claire Wise",
        },
        {
          value: "3e909d0b-0f7e-4dc5-a3c4-e9f4e5c9abbe",
          label: "Breanna Rhodes",
        },
        {
          value: "4f1c02b0-728f-4e6f-82eb-4d27c17d99fe",
          label: "Wesley Wilson",
        },
        {
          value: "501490a1-062d-4a31-9b76-3851b7cb7c69",
          label: "Dylan Mills",
        },
        {
          value: "ddc1d1d7-8927-4a6d-900b-1269eed0c281",
          label: "Adrienne Knight",
        },
        {
          value: "198f88b6-0c0c-4479-84c8-bd3c90470f70",
          label: "Shannon Anthony",
        },
        {
          value: "6ca9896d-dd07-41e6-a92a-5fc59c2f7b3f",
          label: "Lola Proctor",
        },
        {
          value: "53323174-1aac-4d37-baa2-307552aa3330",
          label: "Leroy Sellers",
        },
        {
          value: "9f2582f8-d40d-4133-89b0-3f9a566b719f",
          label: "Cherish Hodges",
        },
        {
          value: "17edd1bb-0ce7-4cb9-bee6-083863dfbdab",
          label: "Xavi Ingram",
        },
        {
          value: "bff426d1-59b3-4019-8fc1-37802309d970",
          label: "Frank Crane",
        },
        {
          value: "782bd7e8-a3d6-42d2-a030-3424976660b5",
          label: "Seamus Stone",
        },
        {
          value: "f9609d56-1ee3-4227-b929-b4959d9ecc47",
          label: "Russell Curry",
        },
        {
          value: "7008d2f1-a15e-4e7f-8e84-f20336f90d42",
          label: "Yousef Kataan",
        },
        {
          value: "4f6d71cc-6451-4f0c-a52e-4f9938280d2e",
          label: "Vance Levy",
        },
        {
          value: "db03f2c7-42d1-4ca0-8adb-6085502763e2",
          label: "Braxton Hess",
        },
        {
          value: "79a9fb2f-d076-4947-a6f3-61ab6867d442",
          label: "Molly Day",
        },
        {
          value: "7b92ae5e-4b22-48c7-b4c6-1a736a4b31fa",
          label: "Jalen Gardner",
        },
        {
          value: "5a81d992-8321-4657-8b80-f2f45cc3ce17",
          label: "Makenna Ball",
        },
        {
          value: "08ec3535-7189-484c-8414-9a4f71906918",
          label: "Holly Collins",
        },
        {
          value: "15f3c9a6-c06a-4ed5-a9e5-e1b6082b35b2",
          label: "Parker Hill",
        },
        {
          value: "de1c9965-46d9-4043-b7d5-3b661d8ddcc2",
          label: "Eliza Wells",
        },
        {
          value: "d95539b9-585c-4cac-9794-f3bd595c792b",
          label: "Donald Pope",
        },
        {
          value: "e9a4ab0b-a76f-42cb-ab50-2790fac4189f",
          label: "Emmett Krueger",
        },
        {
          value: "5fcba538-f4db-4933-8832-ec1d201e16a9",
          label: "Gage Vance",
        },
        {
          value: "07542097-4464-4ddc-b4bf-774f07f73300",
          label: "Victor Williamson",
        },
        {
          value: "1210f19d-85ee-4776-9da4-bbf01e27b82c",
          label: "Ronnie Ford",
        },
        {
          value: "05a2b300-fdf1-4570-a7ce-c77806b8b446",
          label: "Harley Leon",
        },
        {
          value: "15edd2f9-9a27-4d0a-82e9-ee2444b3279a",
          label: "Pablo Rivas",
        },
        {
          value: "53c2a28a-1ffb-4297-a22b-e0204f793748",
          label: "Mack Shannon",
        },
        {
          value: "ff7dc9eb-8154-4afa-b7c3-5c420049f96f",
          label: "George Austin",
        },
        {
          value: "293f80a2-17f1-4b00-8d56-ba98a758cbb6",
          label: "Aaden Frost",
        },
        {
          value: "028b6406-bb67-4679-82c4-deda1934bde2",
          label: "Cesar Ramirez",
        },
        {
          value: "591e8fea-8d84-4686-93cb-660b5df70799",
          label: "Jade Barnes",
        },
        {
          value: "251ad57a-dfea-4bf7-9330-5a438b3ea05b",
          label: "Rosa Kline",
        },
        {
          value: "11088c39-3dcb-4bbf-8dc2-20dd41bd6289",
          label: "Nolan Hayes",
        },
        {
          value: "eb3da2b1-e7ec-4e67-92d3-ca1694a4d32f",
          label: "Alvin Marks",
        },
        {
          value: "95e59a31-0d9c-4bc0-9cd3-827254e0c5a7",
          label: "Rex Carney",
        },
        {
          value: "c70db8f2-b984-453c-805f-4b5c47a46d73",
          label: "Rodrigo Orr",
        },
        {
          value: "2ce52c06-f8d8-4a71-97c8-1e11a6b54903",
          label: "Hadassah Haddad",
        },
        {
          value: "23abe3cd-0e34-4709-bfaa-6b2a62ea18bc",
          label: "Aaliyah Valentine",
        },
        {
          value: "c34bb5e7-c8c2-41ad-81bd-1fb33fdac653",
          label: "Aspen Coleman",
        },
        {
          value: "25224923-2fd0-4ca8-b5d2-b6dfdd69c2b5",
          label: "Conrad Huber",
        },
        {
          value: "72cded0e-dbcf-4a7e-8cd2-bc886dddba8d",
          label: "Major Scott",
        },
        {
          value: "0c74d794-040e-405e-a601-bb3d357aaa43",
          label: "Skylar Carson",
        },
        {
          value: "d46b8f81-d59e-4e88-a3d1-e2174a264bc7",
          label: "Phillip Buck",
        },
        {
          value: "96669fc2-f4a5-40de-b578-9695f3b797d1",
          label: "Douglas Blair",
        },
        {
          value: "3a2039b4-4e49-4abf-9ee9-74469915044b",
          label: "Christine Nichols",
        },
        {
          value: "d925686b-d34f-42fd-8d00-13745cdc6097",
          label: "Benjamin Sloan",
        },
        {
          value: "9ef6fd46-6455-42c9-85aa-51870e0d56d5",
          label: "Atticus Ewing",
        },
        {
          value: "530948d0-76aa-4850-85b2-dd17c09efbc0",
          label: "Catherine Mullen",
        },
        {
          value: "291646cf-32d3-432b-bef4-832c7ceb4d60",
          label: "Jonathan Howell",
        },
        {
          value: "71131e4e-f977-4562-b987-14243f109cdc",
          label: "Mason Mccormick",
        },
        {
          value: "cf31a536-3e44-4b63-a80a-9dc1782298e2",
          label: "Jason Beck",
        },
        {
          value: "5a5c9535-26da-4979-b929-3041be6c6ff0",
          label: "Leland Gannon",
        },
      ],
    },
    valuesValue: {
      preamble:
        "A crew member has been experiencing some symptoms and needs a checkup.",
      crew: "554791e8-4879-49de-b1f5-423db5eb4440",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Generic",
    class: "Generic",
    name: "Generic",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
      {
        name: "Flight Control",
        __typename: "Station",
      },
      {
        name: "Engineering",
        __typename: "Station",
      },
      {
        name: "Tactical",
        __typename: "Station",
      },
      {
        name: "Operations",
        __typename: "Station",
      },
      {
        name: "Sensors",
        __typename: "Station",
      },
      {
        name: "Comm",
        __typename: "Station",
      },
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      name: "text",
      message: "textarea",
    },
    valuesValue: {
      name: "Task",
      message: "This is a generic task.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Create User",
    class: "Computer Core",
    name: "Create User",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      level: [
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
        {
          label: 4,
          value: 4,
        },
        {
          label: 5,
          value: 5,
        },
        {
          label: 6,
          value: 6,
        },
        {
          label: 7,
          value: 7,
        },
        {
          label: 8,
          value: 8,
        },
        {
          label: 9,
          value: 9,
        },
        {
          label: 10,
          value: 10,
        },
      ],
      username: "text",
      password: "text",
    },
    valuesValue: {
      preamble:
        "A crewmember needs a user created in the computer core to complete some calculations.",
      level: 7,
      username: "EMSIAC",
      password: "Epsilon-519-Threading",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Remove User",
    class: "Computer Core",
    name: "Remove User",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      level: [
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
        {
          label: 4,
          value: 4,
        },
        {
          label: 5,
          value: 5,
        },
        {
          label: 6,
          value: 6,
        },
        {
          label: 7,
          value: 7,
        },
        {
          label: 8,
          value: 8,
        },
        {
          label: 9,
          value: 9,
        },
        {
          label: 10,
          value: 10,
        },
      ],
      user: [
        {
          label: "Level 1: Captain",
          value: "70578420-10c0-4f0d-ae47-92bb95e1ce91",
        },
        {
          label: "Level 1: Executive Officer",
          value: "8fb3d37c-59f8-4423-810d-4610797a3cd0",
        },
        {
          label: "Level 1: Network Administrator 1",
          value: "9271cd9b-a005-47ba-8161-186a1c148d22",
        },
        {
          label: "Level 1: Network Administrator 2",
          value: "c25b9c59-df11-41cb-bb63-77797b22d949",
        },
        {
          label: "Level 1: Client Server Manager",
          value: "88189208-270e-4937-bf5d-c3a11d3d4773",
        },
        {
          label: "Level 1: On-Site Technician",
          value: "7787cd52-2dac-4d63-b175-5ba537cd65a4",
        },
        {
          label: "Level 1: Remote Access Uss Ranger",
          value: "5e65c42e-4aa4-41e5-8947-a22044d2e4e3",
        },
        {
          label: "Level 2: Communications",
          value: "946dcb22-abf5-49f5-beab-99b2d394aeb7",
        },
        {
          label: "Level 2: Decoding",
          value: "acf2353c-d923-4cf5-a435-0dd18ae952bb",
        },
        {
          label: "Level 2: Chief Of Security",
          value: "69c4f3c8-d64b-42ac-9e2b-81f15677a668",
        },
        {
          label: "Level 2: Deputy Chief Of Security",
          value: "8b844607-67ba-4493-b570-bd3db0c7f1e7",
        },
        {
          label: "Level 2: Internal Security Scans",
          value: "afa829b6-2b9d-4fc0-9d59-1833c400bd70",
        },
        {
          label: "Level 2: Weapons Management",
          value: "a9bb4989-8caa-4981-a335-be0d463a79c5",
        },
        {
          label: "Level 2: Recon Probes",
          value: "8563f359-8490-49e8-bc69-c1387ccda25a",
        },
        {
          label: "Level 2: Flight Control",
          value: "5a816da7-9698-4cf7-962d-c0bfef969454",
        },
        {
          label: "Level 2: Navigation",
          value: "4dee5c7e-9350-470f-bff8-1e958eab259c",
        },
        {
          label: "Level 2: Weapons Control",
          value: "ce600c65-c85f-4030-9684-30ac0f15f829",
        },
        {
          label: "Level 2: Bernanard Montgomery",
          value: "f4b150a5-f2d5-4847-952f-85e8409387dc",
        },
        {
          label: "Level 3: Engineer",
          value: "fdc1c71f-369f-43b4-8c39-4d79f5c66e0e",
        },
        {
          label: "Level 3: Sensors",
          value: "316c25e2-838c-45b0-b26a-9fcf47963709",
        },
        {
          label: "Level 3: Records",
          value: "0904a019-49ef-4bf8-a28c-031c7d377daa",
        },
        {
          label: "Level 3: Docking",
          value: "667ee085-f21d-4d89-827d-6d37f456d2e2",
        },
        {
          label: "Level 4: Director Of Encryption/Decryption Services",
          value: "d9f7b78d-dd2a-4527-bf4e-fad874ff9093",
        },
        {
          label: "Level 4: Director Technology Services",
          value: "722ff85f-8a3d-408e-a3ee-4278fceae289",
        },
        {
          label: "Level 4: Admiral's Personal Assistant",
          value: "b4d530e1-820d-4d6e-886e-4038c8200980",
        },
        {
          label: "Level 4: Chief Programmer",
          value: "98edadb1-d21a-42eb-997d-a6f762ff8e6b",
        },
        {
          label: "Level 5: Maintenaince Manager",
          value: "6893c725-8bc9-45df-9d22-6703c744ba03",
        },
        {
          label: "Level 5: Weapons Management Officer",
          value: "a6c88f69-997b-44c1-9592-f7022919db15",
        },
        {
          label: "Level 5: Probe Monitoring",
          value: "f8d1c0e3-3a00-4302-919c-62ae5d943c34",
        },
        {
          label: "Level 5: Reactor Core Engineer",
          value: "c29b81aa-91e2-4cd5-b41f-d980c5e9768c",
        },
        {
          label: "Level 5: Probe Inventory Manager",
          value: "72dd70bf-1aca-4db7-b6d1-b3eb87a08af6",
        },
        {
          label: "Level 5: Phaser Repair",
          value: "e416754c-fd51-4533-bbe0-a6b4ac5972de",
        },
        {
          label: "Level 5: Pylon Access 1",
          value: "fc8ccfcb-61c5-48ff-a182-681f8b8dd79b",
        },
        {
          label: "Level 5: Pylon Access 2",
          value: "41ed9c1f-e462-4a14-bfdb-1de6d8d1a603",
        },
        {
          label: "Level 5: Pylon Access 3",
          value: "7e4fae1b-8602-415a-805a-e40853e24723",
        },
        {
          label: "Level 5: System Supervisor",
          value: "ead41f7d-80a4-4fa0-9030-2f51215489b9",
        },
        {
          label: "Level 6: Security Training Holodeck Systems",
          value: "09c28be7-5ded-443d-a33e-b67cd7c174e6",
        },
        {
          label: "Level 6: Security Database Systems Manager",
          value: "97da60d0-c618-4aef-8e9c-bae9ab019098",
        },
        {
          label: "Level 6: Pro JavaScript Writer",
          value: "16d40d52-9252-4e0e-b1b7-032cecb6a82f",
        },
        {
          label: "Level 7: LCARS Interface Development",
          value: "aeb82641-2f73-45e5-abf8-e77c2ad19ea9",
        },
        {
          label: "Level 7: LCARS Tester Level II",
          value: "81bcf789-f61b-4a7e-a7e3-5df2648e4ee1",
        },
        {
          label: "Level 7: LCARS Subspace Network Integrator",
          value: "a8defc37-a902-404f-836c-9580ff52275d",
        },
        {
          label: "Level 7: LCARS Repair",
          value: "5e4efe54-e64f-42f0-a85f-3be3f676780a",
        },
        {
          label: "Level 8: Janitor",
          value: "10f8c644-61b7-4794-806c-2795c1edaeba",
        },
        {
          label: "Level 8: Sanitation Engineer",
          value: "739e6b95-fd49-4700-a29f-f8b4e8563abf",
        },
        {
          label: "Level 9: Replicator Development",
          value: "fe37f537-b765-47e5-8561-6e2eff75e823",
        },
        {
          label: "Level 9: Food Ration Storage Operator",
          value: "477b3df3-1d67-4a53-bf17-a1a789b207d5",
        },
        {
          label: "Level 10: Archbishop Apotheosis",
          value: "fe0fbc9e-74f7-4a92-adb2-265047db0e7c",
        },
      ],
    },
    valuesValue: {
      preamble: "A user needs to be removed from the computer core.",
      level: 9,
      user: "a8defc37-a902-404f-836c-9580ff52275d",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Restart Terminal",
    class: "Computer Core",
    name: "Restart Terminal",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      terminal: [
        {
          label: "Terminal b6al7",
          value: "e5b40fcf-9782-44e9-8175-a1050fb3cd5d",
        },
        {
          label: "Terminal 7rroz",
          value: "0cd23a29-3e81-4fe2-bb20-354ff5bc2237",
        },
        {
          label: "Terminal vw0v9",
          value: "b47fc59f-4eaa-4d62-b495-dfecb182b860",
        },
        {
          label: "Terminal lgz86",
          value: "12e1677d-901d-40cb-8010-d333f231c30c",
        },
        {
          label: "Terminal 3ch6l",
          value: "6027c114-a12d-4f75-b60b-3cd014e8eb6a",
        },
        {
          label: "Terminal wnjkj",
          value: "086cadbd-410b-475d-890d-d32193b5211c",
        },
        {
          label: "Terminal ihlkx",
          value: "5e68ed37-071d-4d2c-bbea-f5c61cfe653e",
        },
        {
          label: "Terminal 0v9dr",
          value: "dd4131ed-02ba-4005-b18a-ac99dcf9ba11",
        },
        {
          label: "Terminal pj6or",
          value: "0fbce848-bbf8-49cd-9753-06383ffc51cb",
        },
        {
          label: "Terminal bviuq",
          value: "012178a6-c085-42b0-80a6-95a200cbac80",
        },
        {
          label: "Terminal lah97",
          value: "2cb42720-7a2e-4964-81b9-e8e8a69e9e7e",
        },
        {
          label: "Terminal mfspr",
          value: "769dbde1-9533-419d-a7cc-fdd978eccf98",
        },
        {
          label: "Terminal lp6ju",
          value: "9612b95f-736d-4257-b88c-65f1b3a5adc0",
        },
        {
          label: "Terminal 01q8m",
          value: "28333799-0b03-47a0-bdb8-ddfa8a845040",
        },
        {
          label: "Terminal tgh3y",
          value: "1579373e-2cfd-4302-87f1-d73eaba03c05",
        },
        {
          label: "Terminal jid8b",
          value: "dd9323d8-4475-4b38-9828-7c3561e11a38",
        },
        {
          label: "Terminal oqusp",
          value: "4dd1622f-2ecf-4cbd-9e61-1df6ae3bba15",
        },
        {
          label: "Terminal bi8iq",
          value: "6339b0d2-1344-49ce-a813-856678d0220a",
        },
        {
          label: "Terminal qgkeg",
          value: "68f46ddf-3143-4b53-95f4-1feec2b3b145",
        },
        {
          label: "Terminal v2jif",
          value: "a9b2a138-146c-4a93-ae85-61d86456444b",
        },
        {
          label: "Terminal awbon",
          value: "a695305d-47db-4045-bce0-e147a55e3c6d",
        },
        {
          label: "Terminal byt67",
          value: "21a56098-c9fd-4dcb-bf53-c4b6435bdcfd",
        },
        {
          label: "Terminal cpe4o",
          value: "492ce4f0-52dc-473f-8d16-27a0139a1295",
        },
        {
          label: "Terminal gxvxp",
          value: "78e8def4-dacd-4831-91b5-6f118f4edc65",
        },
        {
          label: "Terminal o2ngq",
          value: "41a44c7f-79ff-4067-9e7d-9beeb66c0eb7",
        },
        {
          label: "Terminal q0ekj",
          value: "976e8447-0878-4420-8b78-8bf0a9fe01c4",
        },
        {
          label: "Terminal tixkk",
          value: "66f5f0f2-9eef-4074-9ad4-52c717ca0bad",
        },
        {
          label: "Terminal ilxn8",
          value: "c98e5092-ab92-4fd2-b598-a9b8deee487d",
        },
        {
          label: "Terminal z2jjm",
          value: "995cf2ef-328d-491b-91a4-5739a8792b71",
        },
        {
          label: "Terminal xzm35",
          value: "33292726-95a4-4007-b2e7-aa39698f9940",
        },
        {
          label: "Terminal 4iro5",
          value: "54e2178e-fe68-4efd-8f57-8ad30efe9718",
        },
        {
          label: "Terminal 9ll9l",
          value: "df1dabe7-1e16-4592-8876-e503a05f65e0",
        },
        {
          label: "Terminal d9q6p",
          value: "969ea13e-937f-4525-9f65-7efe9088d183",
        },
        {
          label: "Terminal v0jca",
          value: "bff95df6-4aa3-4f17-8a12-7c5ca416a3b4",
        },
        {
          label: "Terminal ujmbg",
          value: "61f415f0-1ca4-47de-87cb-df3c87d99175",
        },
        {
          label: "Terminal ycyun",
          value: "a919e28b-ab27-4d6a-af13-ca3cada460fa",
        },
        {
          label: "Terminal dxggt",
          value: "266dbe0c-4336-4f13-bff8-bb8f14c0af91",
        },
        {
          label: "Terminal ubwxq",
          value: "4b2246aa-3a0d-4980-81ae-c7a247dd26ee",
        },
        {
          label: "Terminal therq",
          value: "c08836a5-2e63-423b-b848-d6744e6a405a",
        },
        {
          label: "Terminal vpv5d",
          value: "7485a991-8873-40e3-9e38-60beb1220cd4",
        },
        {
          label: "Terminal so03e",
          value: "4b4e6661-c6c8-4ff5-b058-f062a518f548",
        },
        {
          label: "Terminal yt9i0",
          value: "3c47f174-2083-4e1d-b184-c92581de1a80",
        },
        {
          label: "Terminal po80o",
          value: "a2602d84-f6a2-496c-bbb7-e279fba89aaf",
        },
        {
          label: "Terminal v8rpd",
          value: "6fc51a35-258c-4b7b-a64e-5ee2cb45692d",
        },
        {
          label: "Terminal 6dbry",
          value: "6d195ae5-a3ec-48c4-9aeb-5a0735537b87",
        },
        {
          label: "Terminal tqyvl",
          value: "0062d330-387d-4af8-bb17-35758a34208f",
        },
        {
          label: "Terminal ovhz0",
          value: "cf94dfd6-581d-4063-a62c-6433cc4ed437",
        },
        {
          label: "Terminal fioja",
          value: "bc10ac22-3d94-44a1-aa78-b34d79f080c2",
        },
        {
          label: "Terminal tc6kw",
          value: "eb43fbc0-855f-4055-9926-e0ec2e606834",
        },
        {
          label: "Terminal jni7d",
          value: "b854a0ad-2075-45be-ae32-f37ccd5f545f",
        },
        {
          label: "Terminal s93z3",
          value: "aba03923-a561-42e8-bce5-5f7484ecba80",
        },
        {
          label: "Terminal y45z0",
          value: "b2eadb17-befa-4cbe-be1f-03157b1cadf0",
        },
        {
          label: "Terminal ash8x",
          value: "ad512556-db92-432a-b3b2-a20048abd6fa",
        },
        {
          label: "Terminal p5owm",
          value: "6076a7e4-4679-47fb-be0d-0a1ac454ba11",
        },
        {
          label: "Terminal o6e3g",
          value: "ecffd524-87b7-454f-8e54-4c67561c7c33",
        },
        {
          label: "Terminal 1d6my",
          value: "5efc6471-29d3-403d-bc88-27e2b3f969cd",
        },
        {
          label: "Terminal 1dkw8",
          value: "992813f4-140f-46fe-85a4-98ed1b364f1a",
        },
        {
          label: "Terminal lgm06",
          value: "7189f042-0135-4ff6-8d1c-0fe5697ce2c7",
        },
        {
          label: "Terminal ipwaf",
          value: "68f2ddb4-c2fc-42df-826d-7bce13598994",
        },
        {
          label: "Terminal k7fde",
          value: "ff3bc7c8-2c3a-4272-8e88-b9941b298f08",
        },
        {
          label: "Terminal i8lk9",
          value: "e5e51345-c7d9-4f8f-b078-27b5debfd245",
        },
        {
          label: "Terminal uq9gq",
          value: "d3566bde-4b92-4640-b290-2d7eb3808885",
        },
        {
          label: "Terminal azjl9",
          value: "9bfaa9f1-2ea4-4dfd-8b0a-62cdedf1cd4a",
        },
        {
          label: "Terminal gl60e",
          value: "dce83260-5b86-4151-80ff-1c00d909237d",
        },
        {
          label: "Terminal y2mmy",
          value: "4640b901-163d-41de-befa-691d53490651",
        },
        {
          label: "Terminal ladcg",
          value: "37a82d6e-dcbc-42fa-b473-86cec43188f2",
        },
        {
          label: "Terminal e29wo",
          value: "8bcdae35-caa0-4817-9c0b-dd69da4475ba",
        },
        {
          label: "Terminal yhj3s",
          value: "489ee779-d4b4-435f-95d6-7a595a185ed3",
        },
        {
          label: "Terminal tftck",
          value: "6585e815-e575-46e4-899b-de4d593a6c47",
        },
        {
          label: "Terminal ctvqm",
          value: "2fc4251a-e93f-4dca-9379-b7c3ac82c26a",
        },
        {
          label: "Terminal bxktn",
          value: "19c06634-3b9f-4d0e-b92a-b5f28bb56151",
        },
        {
          label: "Terminal z9ma2",
          value: "3331424c-f4e1-45f7-8d4d-1d23ac2e75ec",
        },
        {
          label: "Terminal zb8lb",
          value: "be7ca70f-71da-4973-af49-473a337de843",
        },
        {
          label: "Terminal wmeu8",
          value: "375cc0e3-8b67-416d-9744-841cfd36593f",
        },
        {
          label: "Terminal yc38l",
          value: "6b97e19e-2874-475e-ab62-48feb76066c0",
        },
        {
          label: "Terminal u0jdx",
          value: "0da2b849-fd78-4935-bea4-082486fa2967",
        },
        {
          label: "Terminal 90au1",
          value: "41b85c0a-8a8e-4cfb-9574-4f7af2cc692b",
        },
        {
          label: "Terminal vufi6",
          value: "a773deba-7695-4b0f-a2f5-7b10db645141",
        },
        {
          label: "Terminal v84bm",
          value: "ea01d0e1-4e6c-4efa-87ad-f3370e2ae583",
        },
        {
          label: "Terminal mxqjb",
          value: "292686b2-10c8-4df0-82b3-923608805f9d",
        },
        {
          label: "Terminal xptcc",
          value: "c6f4e37b-7a3f-443b-be5d-8b299d9e3f7e",
        },
        {
          label: "Terminal wk92r",
          value: "7e80d80e-e471-4da8-9d08-1b795e281ddb",
        },
        {
          label: "Terminal zoyoo",
          value: "f30ff7ed-9a8e-4f18-992d-104489ae0c9a",
        },
        {
          label: "Terminal r9uq8",
          value: "c8f919e6-4096-4e96-8e92-1143639615a4",
        },
        {
          label: "Terminal wt0lw",
          value: "ee021f1a-1370-4a7c-9977-6e15e1ee508a",
        },
        {
          label: "Terminal r48rg",
          value: "df5240f7-c216-4059-af0a-9d667e451bdd",
        },
        {
          label: "Terminal c43b9",
          value: "f64bc7e1-eae3-49a8-a548-df704136bd20",
        },
        {
          label: "Terminal ktizy",
          value: "4af50482-7263-429d-96ee-7796da3a5820",
        },
        {
          label: "Terminal jwofi",
          value: "9eba5f55-69ff-4f58-b7c7-5d5806280c1e",
        },
        {
          label: "Terminal 7621m",
          value: "d07f186e-9d3d-470b-a254-d1918f5989a4",
        },
        {
          label: "Terminal vbdy6",
          value: "c21bab20-0654-4f71-ba66-448be5713f42",
        },
        {
          label: "Terminal 4m0vv",
          value: "27c9ecd4-7e84-4c7c-88a5-58c41cfa5984",
        },
        {
          label: "Terminal 368r0",
          value: "0a34ac79-2b10-4b93-81e7-dc17b7667d04",
        },
        {
          label: "Terminal h6x52",
          value: "149589ac-ecaf-413f-8f5f-e152f2032331",
        },
        {
          label: "Terminal uxjzj",
          value: "ab6fc804-a914-4052-87e5-d35236a27048",
        },
        {
          label: "Terminal 2k53b",
          value: "92d70d19-d36f-43b2-8f49-9230a2c54754",
        },
        {
          label: "Terminal zp3ci",
          value: "ec26e899-3959-4374-9c27-38ae5f0386d5",
        },
        {
          label: "Terminal lcvet",
          value: "3cac0e72-0eac-46c2-a2de-414f54eb9c73",
        },
        {
          label: "Terminal kw3gx",
          value: "e70e9e41-99ae-4e61-97c7-072827c2ee28",
        },
        {
          label: "Terminal glpbs",
          value: "0937a6d8-762f-4064-a0d1-6950f369e29f",
        },
        {
          label: "Terminal ubou3",
          value: "57399b48-5e9d-4b40-b8e1-3b5b73b8c113",
        },
        {
          label: "Terminal wm0ta",
          value: "853631d8-4550-42aa-a54e-273f63759761",
        },
        {
          label: "Terminal mg636",
          value: "8a9b3d12-68e9-4252-b142-811ca70b48cd",
        },
        {
          label: "Terminal p0rsm",
          value: "d4b482cd-e5fd-4330-9379-7caa4e3d69a3",
        },
        {
          label: "Terminal zyh2e",
          value: "abfcf24d-25de-4258-8a23-f354b8451509",
        },
        {
          label: "Terminal wyz11",
          value: "a0f37803-73f9-415c-b8f5-ce993326963d",
        },
        {
          label: "Terminal vgyp9",
          value: "a26594d6-7ec5-4197-b1a3-f5e9fea2ad5b",
        },
        {
          label: "Terminal 081r1",
          value: "9966e30e-ee38-4822-8b72-3abc553581d2",
        },
        {
          label: "Terminal eqqv7",
          value: "abf73e10-3291-42d4-ab1a-f07538f6d62b",
        },
        {
          label: "Terminal aznwz",
          value: "42bcf076-c3da-4251-b0ee-9681d3c6478e",
        },
        {
          label: "Terminal qcqz4",
          value: "8bcb2bac-13a4-4fda-b103-e4e31ade69f1",
        },
        {
          label: "Terminal pwoed",
          value: "ba426a96-1bf9-4ed8-b7a9-23331949cd93",
        },
        {
          label: "Terminal ubebp",
          value: "688ddb4a-0ba1-4847-925e-f807f0c6cefc",
        },
        {
          label: "Terminal upzpl",
          value: "3952ccce-50a8-46c4-9e53-f5dd8fa4f95a",
        },
        {
          label: "Terminal 67jeh",
          value: "b7724340-ab7d-4ae1-81ce-4c004fe6108b",
        },
        {
          label: "Terminal i0zj8",
          value: "306de2e8-8ce0-4257-a588-c5e0dd1eb315",
        },
        {
          label: "Terminal xkash",
          value: "c3757398-e5e4-474d-a887-f6ed1a7fca69",
        },
        {
          label: "Terminal tp8hg",
          value: "50f1c5e9-83c0-4286-bd5a-5d1eb90aaf0a",
        },
        {
          label: "Terminal xbz90",
          value: "770ac0d7-0fc4-4758-afd7-648f1990a7fb",
        },
        {
          label: "Terminal 3zkhp",
          value: "8b46771a-49b1-412b-bf10-6dcdf07e7fe7",
        },
        {
          label: "Terminal 20b6v",
          value: "624b0c43-789a-49ba-8d96-15043f8d230b",
        },
        {
          label: "Terminal oax55",
          value: "bb982f54-ea04-4bc5-be1a-c0335b877e52",
        },
        {
          label: "Terminal b6bwn",
          value: "d8bcd297-437c-4690-9d5f-10ae0ea60855",
        },
        {
          label: "Terminal 2ftax",
          value: "561cd5c3-72e5-4c8c-ad43-e3529df142ed",
        },
        {
          label: "Terminal i6tpt",
          value: "34ca35ec-ca4c-4354-bbea-8a3f8c2cc717",
        },
        {
          label: "Terminal gm0vl",
          value: "b41d054c-fcd2-461a-aa85-772067c0342b",
        },
        {
          label: "Terminal tacnp",
          value: "f801b998-653a-4564-a871-0c1b170f40cc",
        },
        {
          label: "Terminal 4tcjb",
          value: "0ba198d0-106d-4291-a386-99af04cae2e3",
        },
        {
          label: "Terminal j1dtr",
          value: "02d5244a-edeb-4d36-a912-8c7957deb3e4",
        },
        {
          label: "Terminal fum8o",
          value: "23afe201-5821-47d8-bf72-7c7dcf3a0392",
        },
        {
          label: "Terminal yua3d",
          value: "2c00807a-1fbe-4efa-91b3-b4408455098e",
        },
        {
          label: "Terminal 32hgc",
          value: "00b95f76-bd42-4569-9c34-f75bbd09dcd9",
        },
        {
          label: "Terminal rg5td",
          value: "fa6e35b1-3d02-4241-aabe-dd8bb760deb6",
        },
        {
          label: "Terminal yyoxb",
          value: "e8905e6f-9697-4a4d-8522-4b93a8c5bac6",
        },
        {
          label: "Terminal tr4bc",
          value: "19c0bc14-6bdd-4907-8eba-69f3b3003aeb",
        },
        {
          label: "Terminal ubybm",
          value: "810045b9-a50f-40b0-b3f8-c2548efe14e7",
        },
        {
          label: "Terminal tsahv",
          value: "cba1909d-bc4c-4830-b82d-8ecdcc60c291",
        },
        {
          label: "Terminal pd3gw",
          value: "b660a781-37bc-4ea2-a832-fc74631cf9a7",
        },
        {
          label: "Terminal l056l",
          value: "8dcc1b86-3a24-4761-aaf0-e5b4cd051be5",
        },
        {
          label: "Terminal 1y0a3",
          value: "475bb139-b43b-4726-bf54-c8f6756b7092",
        },
        {
          label: "Terminal mvzao",
          value: "0b91fc71-270a-48ef-890b-c948f42a24ee",
        },
        {
          label: "Terminal 9c4w0",
          value: "22688247-30ba-4e2f-8099-5ccd727a4908",
        },
        {
          label: "Terminal yw2gl",
          value: "b79c78d6-b7ec-455b-bbf4-34eeb62ca897",
        },
        {
          label: "Terminal srwdg",
          value: "183c6e56-bece-47b2-9655-7886b530cefc",
        },
        {
          label: "Terminal 33c6w",
          value: "dfaec218-518b-4e47-97f9-8a5382c1549e",
        },
        {
          label: "Terminal 8hiyg",
          value: "e0542236-6bae-41c8-9640-73eb61728372",
        },
        {
          label: "Terminal x2ql7",
          value: "c6eef094-65f6-481a-92c5-9482d38b0d00",
        },
        {
          label: "Terminal xcz38",
          value: "b326c9f9-c5d8-4a87-a18c-507c8291ee9d",
        },
        {
          label: "Terminal yc99v",
          value: "03bdf751-9d91-4a2e-a065-1056171c6169",
        },
        {
          label: "Terminal b7d39",
          value: "5dab18c3-ba0a-4ff0-b13b-18fc9bfc3fa5",
        },
        {
          label: "Terminal tk8ok",
          value: "396bd1fc-67d6-41b4-8fec-76d10e901113",
        },
        {
          label: "Terminal hey15",
          value: "dc6dc156-1b2b-4981-9305-a1492b910415",
        },
        {
          label: "Terminal sww11",
          value: "14ae348d-289a-49fc-a73c-6a17ef5eebf9",
        },
        {
          label: "Terminal frf9o",
          value: "365e666a-0b40-4e9d-90c0-72bf14881203",
        },
        {
          label: "Terminal apro4",
          value: "bf925ece-e20e-49af-811a-30912300ff80",
        },
        {
          label: "Terminal xmv9m",
          value: "dda945fb-c526-4d80-8e9c-b82a5c031baa",
        },
        {
          label: "Terminal nf81r",
          value: "421b0312-273e-4451-bf2c-d60239435ddf",
        },
        {
          label: "Terminal 9uqa2",
          value: "2e76874b-0f69-4909-9b25-049d95ec2f19",
        },
        {
          label: "Terminal wwng5",
          value: "863fb45e-5146-4b85-873d-f077eb87733f",
        },
        {
          label: "Terminal gy20i",
          value: "c66c64c5-4582-4bf3-96e4-139de76641d7",
        },
        {
          label: "Terminal sorf4",
          value: "cc4e8788-01a9-4e6b-b3aa-75b12ea686f2",
        },
        {
          label: "Terminal dnt4b",
          value: "4c809efb-dff5-4ce8-9993-33f695838c6c",
        },
        {
          label: "Terminal 8h3is",
          value: "10b8d16c-740b-4923-915c-4582d2a97e80",
        },
        {
          label: "Terminal kio8x",
          value: "d5f710b4-8eef-42d2-98a7-0f527c989043",
        },
        {
          label: "Terminal zdcnx",
          value: "a72d539a-38a6-4505-8947-e1be9cdcbbae",
        },
        {
          label: "Terminal 8qnv8",
          value: "bf68ac89-7a0d-4fb1-b833-df2385fd4c75",
        },
        {
          label: "Terminal 9b2d3",
          value: "25f624d5-6e43-4651-aa8b-813703f69be1",
        },
        {
          label: "Terminal v3xnk",
          value: "3d087074-1553-450a-b31a-2928d4cbf0f9",
        },
        {
          label: "Terminal 450ye",
          value: "685a84f8-86c8-49e9-8c0c-de5fca2fff88",
        },
        {
          label: "Terminal q8m9l",
          value: "f30d3fcd-344c-4330-bb53-d22bbd2ed223",
        },
        {
          label: "Terminal 5nvib",
          value: "ccc73146-1bb7-4aa0-ac1f-b71f9c0c4db5",
        },
        {
          label: "Terminal 9xt82",
          value: "bb5962a3-903b-484d-ad19-065118a5a746",
        },
        {
          label: "Terminal 7y7f6",
          value: "0d2214da-d1e0-4f82-8576-2c908b93b3ad",
        },
        {
          label: "Terminal bg2et",
          value: "35900e84-a0e2-49de-abef-74799722048c",
        },
        {
          label: "Terminal l1mp9",
          value: "bb29f4f4-b512-427c-b973-86912e36b7e9",
        },
        {
          label: "Terminal jphv4",
          value: "d71d247c-5003-458c-a7f2-bb58efc8c6ab",
        },
        {
          label: "Terminal b4sv8",
          value: "fd21d3e0-7e55-4b72-9734-3683eb14614c",
        },
        {
          label: "Terminal bw0nn",
          value: "060c9206-cdca-454d-9fc7-ce2204acfb86",
        },
        {
          label: "Terminal sh07l",
          value: "d7f40d50-3c3b-499e-baa3-1e99838cedf8",
        },
        {
          label: "Terminal d9kbd",
          value: "fee8717c-25f5-4b9f-92c4-73b5baccbe5f",
        },
        {
          label: "Terminal dtlrk",
          value: "33b753bb-d9f0-40ae-bdac-41a54f6201e6",
        },
        {
          label: "Terminal q74v2",
          value: "3c2f1cee-feb8-4968-b667-e3eb17f81b87",
        },
        {
          label: "Terminal ll54a",
          value: "580e8fb2-0591-43d1-aabd-89ac09884fd9",
        },
        {
          label: "Terminal dajyu",
          value: "0394418b-2ee9-44a9-afeb-e0ba9119d268",
        },
        {
          label: "Terminal csjns",
          value: "10f8325f-176a-4dd0-afb1-81e1d53abab8",
        },
        {
          label: "Terminal jyu3l",
          value: "53216d74-279d-4d9e-9aad-cd28d8561513",
        },
        {
          label: "Terminal hemzi",
          value: "5a7ab8f0-35f6-4f65-983e-2006d602946c",
        },
        {
          label: "Terminal x2y8k",
          value: "4aecfa75-32ed-4dd2-a86b-3293c0c9210e",
        },
        {
          label: "Terminal w2bl6",
          value: "0c76b203-0768-4c24-bdc0-3d2d23f918b6",
        },
        {
          label: "Terminal snmkt",
          value: "8a99f9ac-b3fc-4ad4-bfe7-40f317d72709",
        },
        {
          label: "Terminal 3shih",
          value: "fed929f4-99bc-4cc3-9914-7e6b5ae5995a",
        },
        {
          label: "Terminal c6jj0",
          value: "a3d6f988-4ce9-4f31-994c-8f0438d1e7b4",
        },
        {
          label: "Terminal usvf3",
          value: "1c835d03-4eb2-4ce1-9799-9eb03a8b9883",
        },
        {
          label: "Terminal 0ep0t",
          value: "c5aa107e-093f-4f0d-bfda-4606eb92e8e1",
        },
        {
          label: "Terminal e81ya",
          value: "0dacce8a-ced3-4405-aa87-de75c6225d3c",
        },
        {
          label: "Terminal 7kqla",
          value: "43ed894c-b193-41d3-b225-3ca7c535c3f2",
        },
        {
          label: "Terminal zq1hs",
          value: "b29290af-d220-485f-a866-497b89afe26c",
        },
        {
          label: "Terminal 6m26f",
          value: "be84c0f3-7376-4338-beea-40e9dc65b33e",
        },
        {
          label: "Terminal y871k",
          value: "7e9b8e0b-d2b0-4bb9-9262-292b0b3d8bbb",
        },
        {
          label: "Terminal sgry2",
          value: "76adc74d-5a1e-4368-8893-834d88f860a7",
        },
      ],
    },
    valuesValue: {
      preamble: "A terminal is malfunctioning and needs to be restarted.",
      terminal: 0.3710484863354955,
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Find Hacker",
    class: "Computer Core",
    name: "Find Hacker",
    active: false,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      user: [],
    },
    valuesValue: {
      preamble:
        "A hacker has been identified in the computer core and should be removed.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Restore File",
    class: "Computer Core",
    name: "Restore File",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      file: [],
    },
    valuesValue: {
      preamble: "A file has become corrupted and needs to be restored.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Restore All Files",
    class: "Computer Core",
    name: "Restore All Files",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      level: [
        {
          label: 1,
          value: 1,
        },
        {
          label: 2,
          value: 2,
        },
        {
          label: 3,
          value: 3,
        },
        {
          label: 4,
          value: 4,
        },
        {
          label: 5,
          value: 5,
        },
        {
          label: 6,
          value: 6,
        },
        {
          label: 7,
          value: 7,
        },
        {
          label: 8,
          value: 8,
        },
        {
          label: 9,
          value: 9,
        },
        {
          label: 10,
          value: 10,
        },
      ],
    },
    valuesValue: {
      preamble: "Several files have become corrupted and need to be restored.",
      level: 6,
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Remove Virus",
    class: "Computer Core",
    name: "Remove Virus",
    active: false,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
    },
    valuesValue: {
      preamble:
        "Viruses have been detected in the computer core and should be removed.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Refill Coolant",
    class: "Coolant",
    name: "Refill Coolant",
    active: false,
    stations: [
      {
        name: "Engineering",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      system: [
        {
          label: "Impulse Engine",
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
        },
        {
          label: "Reactor",
          value: "baeb814e-adb6-4b5e-859e-258393f659d4",
        },
        {
          label: "Phaser",
          value: "ab226ee7-d3dd-4086-ba0d-c606e3bbb5fb",
        },
        {
          label: "Coolant",
          value: "35d3af1c-3e87-475c-a474-66cc809aa255",
        },
        {
          label: "Warp Engine",
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
        },
      ],
    },
    valuesValue: {
      preamble:
        "A system is running low on coolant. More should be transferred into that system.",
      system: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Remove Power",
    class: "Power",
    name: "Remove Power",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      system: [
        {
          value: "4ffd7cba-e593-4af1-b3cf-f921b627c1d4",
          label: "Long Range Comm",
        },
        {
          value: "463d81c7-72c1-46a8-86b6-e6b8adb4f56e",
          label: "Internal Comm",
        },
        {
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
          label: "Impulse Engine",
        },
        {
          value: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
          label: "Thrusters",
        },
        {
          value: "cd414584-45b4-4b67-bcf6-d73d43f284b3",
          label: "Navigation",
        },
        {
          value: "cf4808d7-4977-4a9a-a3dc-c0473d0f2aec",
          label: "External Sensors",
        },
        {
          value: "f1ff9ed7-54cd-4742-ab96-9dfee746cb91",
          label: "Internal Sensors",
        },
        {
          value: "68ee4601-9d07-415a-a3b0-6c56bd5e079b",
          label: "Probe Launcher",
        },
        {
          value: "66aea34d-b32a-43f3-a9bb-c06e0ea6ad00",
          label: "Tractor Beam",
        },
        {
          value: "9edf6f06-c112-4924-8edb-50788d3abeaa",
          label: "Transporters",
        },
        {
          value: "d5c1ce52-3463-4bbc-9241-31ab0b4d6eef",
          label: "Battery",
        },
        {
          value: "baeb814e-adb6-4b5e-859e-258393f659d4",
          label: "Reactor",
        },
        {
          value: "3cc8e55c-a9b1-4687-9503-f0bb0c4e4f68",
          label: "Stealth Field",
        },
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
        {
          value: "72308578-edca-4677-b8cf-e7cbb9364ff0",
          label: "Targeting",
        },
        {
          value: "ab226ee7-d3dd-4086-ba0d-c606e3bbb5fb",
          label: "Phaser",
        },
        {
          value: "35d3af1c-3e87-475c-a474-66cc809aa255",
          label: "Coolant",
        },
        {
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
          label: "Warp Engine",
        },
        {
          value: "d0dc42ad-b8bb-46a9-ae29-73f1d813f862",
          label: "Fore Launcher",
        },
        {
          value: "ea7f25cf-e485-46d8-a233-d4c4cb199688",
          label: "Aft Launcher",
        },
        {
          value: "a76c91cb-57a1-4e67-b4c5-5ee6481bbe27",
          label: "Short Range Comm",
        },
        {
          value: "f0c219f4-0ea6-4759-b0e0-4a2dc6d7f26e",
          label: "Signal Jammer",
        },
        {
          value: "e8916d8b-52a4-4a6a-9c79-20775073255b",
          label: "Main Computer",
        },
        {
          value: "558480ca-811b-481e-82fd-ae4a7c475da3",
          label: "THX-1138",
        },
        {
          value: "dbfa0909-933e-43ea-b670-ad7e423fef41",
          label: "Sickbay",
        },
      ],
    },
    valuesValue: {
      preamble: "Power must be removed from the #SYSTEMNAME system.",
      system: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Restore Power",
    class: "Power",
    name: "Restore Power",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      system: [
        {
          value: "4ffd7cba-e593-4af1-b3cf-f921b627c1d4",
          label: "Long Range Comm",
        },
        {
          value: "463d81c7-72c1-46a8-86b6-e6b8adb4f56e",
          label: "Internal Comm",
        },
        {
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
          label: "Impulse Engine",
        },
        {
          value: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
          label: "Thrusters",
        },
        {
          value: "cd414584-45b4-4b67-bcf6-d73d43f284b3",
          label: "Navigation",
        },
        {
          value: "cf4808d7-4977-4a9a-a3dc-c0473d0f2aec",
          label: "External Sensors",
        },
        {
          value: "f1ff9ed7-54cd-4742-ab96-9dfee746cb91",
          label: "Internal Sensors",
        },
        {
          value: "68ee4601-9d07-415a-a3b0-6c56bd5e079b",
          label: "Probe Launcher",
        },
        {
          value: "66aea34d-b32a-43f3-a9bb-c06e0ea6ad00",
          label: "Tractor Beam",
        },
        {
          value: "9edf6f06-c112-4924-8edb-50788d3abeaa",
          label: "Transporters",
        },
        {
          value: "d5c1ce52-3463-4bbc-9241-31ab0b4d6eef",
          label: "Battery",
        },
        {
          value: "baeb814e-adb6-4b5e-859e-258393f659d4",
          label: "Reactor",
        },
        {
          value: "3cc8e55c-a9b1-4687-9503-f0bb0c4e4f68",
          label: "Stealth Field",
        },
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
        {
          value: "72308578-edca-4677-b8cf-e7cbb9364ff0",
          label: "Targeting",
        },
        {
          value: "ab226ee7-d3dd-4086-ba0d-c606e3bbb5fb",
          label: "Phaser",
        },
        {
          value: "35d3af1c-3e87-475c-a474-66cc809aa255",
          label: "Coolant",
        },
        {
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
          label: "Warp Engine",
        },
        {
          value: "d0dc42ad-b8bb-46a9-ae29-73f1d813f862",
          label: "Fore Launcher",
        },
        {
          value: "ea7f25cf-e485-46d8-a233-d4c4cb199688",
          label: "Aft Launcher",
        },
        {
          value: "a76c91cb-57a1-4e67-b4c5-5ee6481bbe27",
          label: "Short Range Comm",
        },
        {
          value: "f0c219f4-0ea6-4759-b0e0-4a2dc6d7f26e",
          label: "Signal Jammer",
        },
        {
          value: "e8916d8b-52a4-4a6a-9c79-20775073255b",
          label: "Main Computer",
        },
        {
          value: "558480ca-811b-481e-82fd-ae4a7c475da3",
          label: "THX-1138",
        },
        {
          value: "dbfa0909-933e-43ea-b670-ad7e423fef41",
          label: "Sickbay",
        },
      ],
    },
    valuesValue: {
      preamble: "Power must be restored to the #SYSTEMNAME system.",
      system: "d5c1ce52-3463-4bbc-9241-31ab0b4d6eef",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Set Power",
    class: "Power",
    name: "Set Power",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      system: [
        {
          value: "4ffd7cba-e593-4af1-b3cf-f921b627c1d4",
          label: "Long Range Comm",
        },
        {
          value: "463d81c7-72c1-46a8-86b6-e6b8adb4f56e",
          label: "Internal Comm",
        },
        {
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
          label: "Impulse Engine",
        },
        {
          value: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
          label: "Thrusters",
        },
        {
          value: "cd414584-45b4-4b67-bcf6-d73d43f284b3",
          label: "Navigation",
        },
        {
          value: "cf4808d7-4977-4a9a-a3dc-c0473d0f2aec",
          label: "External Sensors",
        },
        {
          value: "f1ff9ed7-54cd-4742-ab96-9dfee746cb91",
          label: "Internal Sensors",
        },
        {
          value: "68ee4601-9d07-415a-a3b0-6c56bd5e079b",
          label: "Probe Launcher",
        },
        {
          value: "66aea34d-b32a-43f3-a9bb-c06e0ea6ad00",
          label: "Tractor Beam",
        },
        {
          value: "9edf6f06-c112-4924-8edb-50788d3abeaa",
          label: "Transporters",
        },
        {
          value: "d5c1ce52-3463-4bbc-9241-31ab0b4d6eef",
          label: "Battery",
        },
        {
          value: "baeb814e-adb6-4b5e-859e-258393f659d4",
          label: "Reactor",
        },
        {
          value: "3cc8e55c-a9b1-4687-9503-f0bb0c4e4f68",
          label: "Stealth Field",
        },
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
        {
          value: "72308578-edca-4677-b8cf-e7cbb9364ff0",
          label: "Targeting",
        },
        {
          value: "ab226ee7-d3dd-4086-ba0d-c606e3bbb5fb",
          label: "Phaser",
        },
        {
          value: "35d3af1c-3e87-475c-a474-66cc809aa255",
          label: "Coolant",
        },
        {
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
          label: "Warp Engine",
        },
        {
          value: "d0dc42ad-b8bb-46a9-ae29-73f1d813f862",
          label: "Fore Launcher",
        },
        {
          value: "ea7f25cf-e485-46d8-a233-d4c4cb199688",
          label: "Aft Launcher",
        },
        {
          value: "a76c91cb-57a1-4e67-b4c5-5ee6481bbe27",
          label: "Short Range Comm",
        },
        {
          value: "f0c219f4-0ea6-4759-b0e0-4a2dc6d7f26e",
          label: "Signal Jammer",
        },
        {
          value: "e8916d8b-52a4-4a6a-9c79-20775073255b",
          label: "Main Computer",
        },
        {
          value: "558480ca-811b-481e-82fd-ae4a7c475da3",
          label: "THX-1138",
        },
        {
          value: "dbfa0909-933e-43ea-b670-ad7e423fef41",
          label: "Sickbay",
        },
      ],
      power: {
        type: "number",
        min: 1,
        max: 40,
      },
    },
    valuesValue: {
      preamble: "The power level of the #SYSTEMNAME system must be changed.",
      system: "9edf6f06-c112-4924-8edb-50788d3abeaa",
      power: 17,
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Send Damage Team",
    class: "Teams",
    name: "Send Damage Team",
    active: true,
    stations: [
      {
        name: "Engineering",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      teamName: "text",
      orders: "textarea",
      room: "roomPicker",
      officers: "damageTeamPicker",
    },
    valuesValue: {
      preamble: "A damage team needs to be sent to perform some repairs.",
      teamName: "Repair Team",
      orders: "Repair any damage that you find.",
      room: "a5afa6df-b216-45ec-b91a-a41af842cad7",
      officers: {
        "Explosive Expert": 1,
      },
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Wait For Team To Clear",
    class: "Teams",
    name: "Wait For Team To Clear",
    active: true,
    stations: [
      {
        name: "Engineering",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      teamName: "text",
    },
    valuesValue: {
      preamble: "A damage team needs to be sent to perform some repairs.",
      teamName: "Repair Team",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Send Security Team",
    class: "Teams",
    name: "Send Security Team",
    active: true,
    stations: [
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      teamName: "text",
      orders: "textarea",
      room: "roomPicker",
    },
    valuesValue: {
      preamble:
        "A security team should be dispatched to ensure the safety of the crew.",
      teamName: "Security Detail",
      orders: "Patrol and report back anything that you find.",
      room: "37b802fd-126f-432a-9b84-5396e7882fdf",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Send Medical Team",
    class: "Teams",
    name: "Send Medical Team",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
      teamName: "text",
      orders: "textarea",
      room: "roomPicker",
    },
    valuesValue: {
      preamble: "An incident requires the attention of a medical team.",
      teamName: "Medical Detail",
      orders: "Address any medical situations you find.",
      room: "6da1851b-3d5e-40bd-bd9e-7b2fb43f48fb",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Send Remote Access Code",
    class: "Remote Access",
    name: "Send Remote Access Code",
    active: true,
    stations: [
      {
        name: "Engineering",
        __typename: "Station",
      },
      {
        name: "Tactical",
        __typename: "Station",
      },
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      code: "text",
      backup: {
        type: "text",
        placeholder: "Optional",
      },
    },
    valuesValue: {
      preamble: "A remote access code needs to be sent.",
      code: "Alpha-474-Multiplex",
      backup: "Rho-589-Vector",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Evacuate and Seal Deck",
    class: "Decks",
    name: "Evacuate and Seal Deck",
    active: true,
    stations: [
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      deck: "deckPicker",
    },
    valuesValue: {
      preamble:
        "For safety, the deck where the damage is should be evacuated and sealed.",
      deck: "21c749dc-a378-469b-84a2-d73ebd98db06",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Transfer Cargo",
    class: "Cargo",
    name: "Transfer Cargo",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      room: "roomPicker",
      inventory: "inventoryInput",
    },
    valuesValue: {
      preamble: "Supplies need to be transferred.",
      room: "6da1851b-3d5e-40bd-bd9e-7b2fb43f48fb",
      inventory: {
        "0b760a35-99a2-410a-85c0-db2c7888d697": [11],
        "7565b7c6-84ce-46ea-97d2-d21fdb0aa73a": [5],
      },
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Launch a Probe",
    class: "Probes",
    name: "Launch a Probe",
    active: true,
    stations: [
      {
        name: "Sensors",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      probeType: [
        {
          value: "class-i",
          label: "Class I Probe",
        },
        {
          value: "class-ii",
          label: "Class II Probe",
        },
        {
          value: "class-iii",
          label: "Class III Probe",
        },
        {
          value: "defense",
          label: "Defensive Probe",
        },
        {
          value: "science",
          label: "Science Probe",
        },
      ],
      equipment: "probeEquipment",
    },
    valuesValue: {
      preamble: "A probe should be launched to provide additional data.",
      probeType: "class-i",
      equipment: {
        "communications-signal-booster": 2,
      },
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Perform Probe Query",
    class: "Probes",
    name: "Perform Probe Query",
    active: true,
    stations: [
      {
        name: "Sensors",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      query: "text",
    },
    valuesValue: {
      preamble: "We should use a probe to gather more information.",
      query: "",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Execute Science Probe Function",
    class: "Probes",
    name: "Execute Science Probe Function",
    active: true,
    stations: [
      {
        name: "Sensors",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      type: [
        {
          value: "resonance-burst",
          label: "Resonance Burst",
        },
        {
          value: "resonance-detector",
          label: "Resonance Detector",
        },
        {
          value: "tachyon-burst",
          label: "Tachyon Burst",
        },
        {
          value: "tachyon-detector",
          label: "Tachyon Detector",
        },
        {
          value: "graviton-detector",
          label: "Graviton Detector",
        },
        {
          value: "graviton-burst",
          label: "Graviton Burst",
        },
        {
          value: "lithium-detector",
          label: "Lithium Detector",
        },
        {
          value: "lithium-burst",
          label: "Lithium Burst",
        },
        {
          value: "magnetic-detector",
          label: "Magnetic Detector",
        },
        {
          value: "magnetic-burst",
          label: "Magnetic Burst",
        },
        {
          value: "helium-burst",
          label: "Helium Burst",
        },
        {
          value: "helium-detector",
          label: "Helium Detector",
        },
        {
          value: "hydrogen-burst",
          label: "Hydrogen Burst",
        },
        {
          value: "hydrogen-detector",
          label: "Hydrogen Detector",
        },
        {
          value: "oxygen-burst",
          label: "Oxygen Burst",
        },
        {
          value: "oxygen-detector",
          label: "Oxygen Detector",
        },
        {
          value: "carbon-burst",
          label: "Carbon Burst",
        },
        {
          value: "carbon-detector",
          label: "Carbon Detector",
        },
        {
          value: "radiation-burst",
          label: "Radiation Burst",
        },
        {
          value: "radiation-detector",
          label: "Radiation Detector",
        },
      ],
      charge: {
        type: "range",
        min: 0,
        max: 100,
      },
    },
    valuesValue: {
      preamble: "A science probe could perform a valuable function.",
      type: "hydrogen-burst",
      charge: 42,
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Panel Actions",
    class: "Panels",
    name: "Panel Actions",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
      panel: [],
    },
    valuesValue: {
      preamble: "Panel maintenance must be performed.",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Reactivation Code",
    class: "Generic",
    name: "Reactivation Code",
    active: true,
    stations: [
      {
        name: "Command",
        __typename: "Station",
      },
      {
        name: "Flight Control",
        __typename: "Station",
      },
      {
        name: "Engineering",
        __typename: "Station",
      },
      {
        name: "Tactical",
        __typename: "Station",
      },
      {
        name: "Operations",
        __typename: "Station",
      },
      {
        name: "Sensors",
        __typename: "Station",
      },
      {
        name: "Comm",
        __typename: "Station",
      },
      {
        name: "Security",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      system: [
        {
          value: "4ffd7cba-e593-4af1-b3cf-f921b627c1d4",
          label: "Long Range Comm",
        },
        {
          value: "463d81c7-72c1-46a8-86b6-e6b8adb4f56e",
          label: "Internal Comm",
        },
        {
          value: "13704ebd-059f-47df-afa9-8333d2ca3691",
          label: "Impulse Engine",
        },
        {
          value: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
          label: "Thrusters",
        },
        {
          value: "cd414584-45b4-4b67-bcf6-d73d43f284b3",
          label: "Navigation",
        },
        {
          value: "cf4808d7-4977-4a9a-a3dc-c0473d0f2aec",
          label: "External Sensors",
        },
        {
          value: "f1ff9ed7-54cd-4742-ab96-9dfee746cb91",
          label: "Internal Sensors",
        },
        {
          value: "68ee4601-9d07-415a-a3b0-6c56bd5e079b",
          label: "Probe Launcher",
        },
        {
          value: "66aea34d-b32a-43f3-a9bb-c06e0ea6ad00",
          label: "Tractor Beam",
        },
        {
          value: "9edf6f06-c112-4924-8edb-50788d3abeaa",
          label: "Transporters",
        },
        {
          value: "d5c1ce52-3463-4bbc-9241-31ab0b4d6eef",
          label: "Battery",
        },
        {
          value: "baeb814e-adb6-4b5e-859e-258393f659d4",
          label: "Reactor",
        },
        {
          value: "3cc8e55c-a9b1-4687-9503-f0bb0c4e4f68",
          label: "Stealth Field",
        },
        {
          value: "acffad37-a51c-4b4f-ae0b-37bdc3e58267",
          label: "Fore Shields",
        },
        {
          value: "895c48fe-923b-49ba-8c03-deff9579c30f",
          label: "Aft Shields",
        },
        {
          value: "a693fcef-4182-4c52-a4f2-e6c5d1565feb",
          label: "Port Shields",
        },
        {
          value: "567bb866-3b65-4821-9fbf-1995460ef2ff",
          label: "Starboard Shields",
        },
        {
          value: "72308578-edca-4677-b8cf-e7cbb9364ff0",
          label: "Targeting",
        },
        {
          value: "ab226ee7-d3dd-4086-ba0d-c606e3bbb5fb",
          label: "Phaser",
        },
        {
          value: "35d3af1c-3e87-475c-a474-66cc809aa255",
          label: "Coolant",
        },
        {
          value: "d2c0f813-68f6-42e1-8f86-9f4250bab99c",
          label: "Warp Engine",
        },
        {
          value: "d0dc42ad-b8bb-46a9-ae29-73f1d813f862",
          label: "Fore Launcher",
        },
        {
          value: "ea7f25cf-e485-46d8-a233-d4c4cb199688",
          label: "Aft Launcher",
        },
        {
          value: "a76c91cb-57a1-4e67-b4c5-5ee6481bbe27",
          label: "Short Range Comm",
        },
        {
          value: "f0c219f4-0ea6-4759-b0e0-4a2dc6d7f26e",
          label: "Signal Jammer",
        },
        {
          value: "e8916d8b-52a4-4a6a-9c79-20775073255b",
          label: "Main Computer",
        },
        {
          value: "558480ca-811b-481e-82fd-ae4a7c475da3",
          label: "THX-1138",
        },
        {
          value: "dbfa0909-933e-43ea-b670-ad7e423fef41",
          label: "Sickbay",
        },
      ],
      code: {
        disabled: true,
        placeholder: "Cannot configure code",
      },
    },
    valuesValue: {
      preamble:
        "A reactivation code must be applied to the #SYSTEMNAME system.",
      system: "d572dbd5-2f0d-4e35-bded-97b46c1eb112",
      code: "∆§∏∑∆∂¥∆",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Change Reactor Efficiency",
    class: "Reactor",
    name: "Change Reactor Efficiency",
    active: true,
    stations: [
      {
        name: "Operations",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      efficiency: [
        {
          label: "Overload",
          value: 1.25,
        },
        {
          label: "Cruise",
          value: 1,
        },
        {
          label: "Silent Running",
          value: 0.87,
        },
        {
          label: "Reduced",
          value: 0.5,
        },
        {
          label: "Auxiliary",
          value: 0.38,
        },
        {
          label: "Minimal",
          value: 0.27,
        },
        {
          label: "Power Down",
          value: 0,
        },
        {
          label: "External Power",
        },
      ],
    },
    valuesValue: {
      preamble: "The reactor efficiency is not at the correct level.",
      efficiency: 0.5,
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Perform Sensor Scan",
    class: "Sensors",
    name: "Perform Sensor Scan",
    active: true,
    stations: [
      {
        name: "Sensors",
        __typename: "Station",
      },
    ],
    valuesInput: {
      preamble: "textarea",
      scanText: "text",
    },
    valuesValue: {
      preamble: "A scan should be performed.",
      scanText: "",
    },
    __typename: "TaskDefinition",
  },
  {
    id: "Search Particle Detector",
    class: "Sensors",
    name: "Search Particle Detector",
    active: false,
    stations: [],
    valuesInput: {
      preamble: "textarea",
      particleType: [
        {
          label: "Dilithium",
          value: "Dilithium",
        },
        {
          label: "Tachyon",
          value: "Tachyon",
        },
        {
          label: "Neutrino",
          value: "Neutrino",
        },
        {
          label: "AntiMatter",
          value: "AntiMatter",
        },
        {
          label: "Anomaly",
          value: "Anomaly",
        },
      ],
    },
    valuesValue: {
      preamble: "We should check for particles.",
      particleType: "Anomaly",
    },
    __typename: "TaskDefinition",
  },
];
