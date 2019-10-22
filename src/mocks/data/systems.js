export default {
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
