export default {
  shortRangeComm: [
    {
      id: "1be6ccd4-51d2-4318-8ffb-344814094af1",
      simulatorId: "a334d67e-f832-48be-a10b-3727c02ff07e",
      name: "Short Range Communications",
      arrows: [
        {
          id: "32765eb3-b9a5-41c5-80c6-ccbb18d9e0e7",
          signal: "0a014e45-1fa4-4fc6-aa40-1c7155fed7c2",
          frequency: 0.62,
          connected: false,
          muted: false,
        },
        {
          id: "0e085979-d2d6-418f-a0ac-e619e9a94cb0",
          signal: "51c1a326-b81d-4817-8bd6-4019ae3a4e11",
          frequency: 0.24,
          connected: false,
          muted: false,
        },
      ],
      signals: [
        {
          id: "8b887969-b9d2-451f-bdf2-af1f89d9345c",
          name: "Romulan",
          image: "/Comm Images/Romulan.png",
          color: "#00ff00",
          range: {
            lower: 0.85,
            upper: 1,
          },
        },
        {
          id: "94c425e6-c570-4cc4-ae7d-9ab03060525e",
          name: "Cardassian",
          image: "/Comm Images/Cardassian.png",
          color: "#ffaa00",
          range: {
            lower: 0.75,
            upper: 0.85,
          },
        },
        {
          id: "0a014e45-1fa4-4fc6-aa40-1c7155fed7c2",
          name: "General Use",
          image: "/Comm Images/General Use.png",
          color: "#ffffff",
          range: {
            lower: 0.58,
            upper: 0.75,
          },
        },
        {
          id: "c4a1a1bf-503b-41b0-bc92-f90100e1b094",
          name: "Starfleet",
          image: "/Comm Images/Starfleet.png",
          color: "#0088ff",
          range: {
            lower: 0.4,
            upper: 0.58,
          },
        },
        {
          id: "387fbaa7-ee7b-4b08-bfd5-67ae0cc4b480",
          name: "Klingon",
          image: "/Comm Images/Klingon.png",
          color: "#ff0000",
          range: {
            lower: 0.3,
            upper: 0.4,
          },
        },
        {
          id: "51c1a326-b81d-4817-8bd6-4019ae3a4e11",
          name: "Orion",
          image: "/Comm Images/Orion.png",
          color: "#888888",
          range: {
            lower: 0.22,
            upper: 0.3,
          },
        },
        {
          id: "dc578187-418b-4846-95cd-741b5d8bce1b",
          name: "Ferengi",
          image: "/Comm Images/Ferengi.png",
          color: "#ffff00",
          range: {
            lower: 0,
            upper: 0.22,
          },
        },
      ],
      state: "hailing",
      frequency: 0.7014247690621576,
      amplitude: 0.5,
      power: {
        power: 3,
        powerLevels: [3],
      },
      damage: {
        damaged: false,
        report: null,
      },
    },
  ],
  internalComm: [
    {
      id: "78d7bd75-e7af-41e7-adfc-0c0c29012bb0",
      name: "Internal Communications",
      state: "idle",
      outgoing: null,
      incoming: null,
      damage: {
        damaged: false,
        report: null,
      },
      power: {
        power: 0,
        powerLevels: [],
      },
    },
  ],
  longRangeCommunications: [
    {
      id: "11f2e785-a1b6-45cc-8d8d-a0090fdc4ab9",
      simulatorId: "a334d67e-f832-48be-a10b-3727c02ff07e",
      name: "Long Range Communications",
      satellites: 3,
      presetMessages: [
        {
          label: "Yo",
          value:
            "To: Voyager\nFrom: Starbase 74\n\nWhat is your status, Voyager? We haven't heard from you in a while.\n\nStarbase 74 out.",
        },
      ],
      messages: [
        {
          id: "f809bdac-a1fa-4203-98e0-ac7aaad6a7a7",
          a: 10,
          f: 10,
          ra: 20,
          rf: 50,
          sender: "Me",
          message: "\nHello there, someone!\n\nMe out",
          decodedMessage: "",
          encrypted: false,
          sent: true,
          timestamp:
            "Mon Oct 21 2019 21:18:27 GMT-0600 (Mountain Daylight Time)",
          datestamp: "4551.2",
          deleted: false,
          approved: false,
          crew: true,
        },
      ],
      interception: true,
      difficulty: 30000,
      locked: false,
      decoded: false,
      damage: {
        damaged: false,
        report: null,
      },
      power: {
        power: 2,
        powerLevels: [2],
      },
    },
  ],
};
