/*query Ship($simulatorId: ID!) {
  shortRangeComm(simulatorId: $simulatorId) {
    id
    simulatorId
    name
    arrows {
      id
      muted
      signal
      frequency
      connected
      __typename
    }
    signals {
      id
      name
      image
      range {
        lower
        upper
        __typename
      }
      color
      __typename
    }
    state
    frequency
    amplitude
    power {
      power
      powerLevels
      __typename
    }
    damage {
      damaged
      report
      __typename
    }
    __typename
  }
}
*/
export default {
  shortRangeComm: [
    {
      id: "6db37956-797d-4373-bbc3-d856d23669af",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Short Range Communications",
      arrows: [
        {
          id: "32765eb3-b9a5-41c5-80c6-ccbb18d9e0e7",
          signal: "0a014e45-1fa4-4fc6-aa40-1c7155fed7c2",
          frequency: 0.62,
          connected: false,
          muted: false,
          __typename: "CommArrow",
        },
        {
          id: "0e085979-d2d6-418f-a0ac-e619e9a94cb0",
          signal: "51c1a326-b81d-4817-8bd6-4019ae3a4e11",
          frequency: 0.24,
          connected: false,
          muted: false,
          __typename: "CommArrow",
        },
      ],
      signals: [
        {
          id: "8b887969-b9d2-451f-bdf2-af1f89d9345c",
          name: "Romulan",
          image: "/Comm Images/Romulan.png",
          range: {
            lower: 0.85,
            upper: 1,
            __typename: "CommRange",
          },
          color: "#00ff00",
          __typename: "CommSignal",
        },
        {
          id: "94c425e6-c570-4cc4-ae7d-9ab03060525e",
          name: "Cardassian",
          image: "/Comm Images/Cardassian.png",
          range: {
            lower: 0.75,
            upper: 0.85,
            __typename: "CommRange",
          },
          color: "#ffaa00",
          __typename: "CommSignal",
        },
        {
          id: "0a014e45-1fa4-4fc6-aa40-1c7155fed7c2",
          name: "General Use",
          image: "/Comm Images/General Use.png",
          range: {
            lower: 0.58,
            upper: 0.75,
            __typename: "CommRange",
          },
          color: "#ffffff",
          __typename: "CommSignal",
        },
        {
          id: "c4a1a1bf-503b-41b0-bc92-f90100e1b094",
          name: "Starfleet",
          image: "/Comm Images/Starfleet.png",
          range: {
            lower: 0.4,
            upper: 0.58,
            __typename: "CommRange",
          },
          color: "#0088ff",
          __typename: "CommSignal",
        },
        {
          id: "387fbaa7-ee7b-4b08-bfd5-67ae0cc4b480",
          name: "Klingon",
          image: "/Comm Images/Klingon.png",
          range: {
            lower: 0.3,
            upper: 0.4,
            __typename: "CommRange",
          },
          color: "#ff0000",
          __typename: "CommSignal",
        },
        {
          id: "51c1a326-b81d-4817-8bd6-4019ae3a4e11",
          name: "Orion",
          image: "/Comm Images/Orion.png",
          range: {
            lower: 0.22,
            upper: 0.3,
            __typename: "CommRange",
          },
          color: "#888888",
          __typename: "CommSignal",
        },
        {
          id: "dc578187-418b-4846-95cd-741b5d8bce1b",
          name: "Ferengi",
          image: "/Comm Images/Ferengi.png",
          range: {
            lower: 0,
            upper: 0.22,
            __typename: "CommRange",
          },
          color: "#ffff00",
          __typename: "CommSignal",
        },
      ],
      state: "idle",
      frequency: 0.5,
      amplitude: 0.5,
      power: {
        power: 3,
        powerLevels: [3],
        __typename: "Power",
      },
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      __typename: "ShortRangeComm",
    },
  ],
  /* 
   query Ship($simulatorId: ID!) {
  internalComm(simulatorId: $simulatorId) {
    id
    name
    state
    outgoing
    incoming
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
*/
  internalComm: [
    {
      id: "b4d3ce23-c44e-49f4-83d4-c86c918cb91d",
      name: "Internal Communications",
      state: "idle",
      outgoing: null,
      incoming: null,
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 0,
        powerLevels: [],
        __typename: "Power",
      },
      __typename: "InternalComm",
    },
  ],
  /* query Ship($simulatorId: ID!) {
  longRangeCommunications(simulatorId: $simulatorId) {
    id
    simulatorId
    name
    satellites
    presetMessages {
      label
      value
      __typename
    }
    messages {
      id
      a
      f
      ra
      rf
      sender
      message
      decodedMessage
      encrypted
      sent
      timestamp
      datestamp
      deleted
      approved
      crew
      __typename
    }
    interception
    difficulty
    locked
    decoded
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
*/
  longRangeCommunications: [
    {
      id: "7aef492a-f314-47c4-8985-3d59c1c2c5c6",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Long Range Communications",
      satellites: 3,
      presetMessages: [
        {
          label: "Update please",
          value:
            "To: Voyager\nFrom: Starbase 74\n\nWhat is your status, Voyager? We haven't heard from you in a while.\n\nStarbase 74 out.",
          __typename: "PresetAnswer",
        },
      ],
      messages: [
        {
          id: "d215379a-2e5b-439d-bde5-8187b0f85246",
          a: 10,
          f: 10,
          ra: 35,
          rf: 45,
          sender: "Hi there!",
          message: "Hello there, friend. Woot!",
          decodedMessage: "",
          encrypted: false,
          sent: false,
          timestamp:
            "Mon Nov 04 2019 08:08:27 GMT-0700 (Mountain Standard Time)",
          datestamp: "8523.4",
          deleted: false,
          approved: false,
          crew: false,
          __typename: "LRMessage",
        },
      ],
      interception: false,
      difficulty: 30000,
      locked: false,
      decoded: false,
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 2,
        powerLevels: [2],
        __typename: "Power",
      },
      __typename: "LRCommunications",
    },
  ],
  /* query Ship($simulatorId: ID!) {
  probes(simulatorId: $simulatorId) {
    id
    simulatorId
    name
   type
    torpedo
    types {
      id
      name
      size
      count
      description
      availableEquipment {
        id
        name
        size
        count
        description
        __typename
      }
      __typename
    }
    processedData
    probes {
      id
      type
      name
      launched
      equipment {
        id
        name
        count
        __typename
      }
      charge
      __typename
    }
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
 */
  probes: [
    {
      id: "9f96decf-59ff-4992-abaf-0c54a4059b2b",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Probe Launcher",
      type: "Probes",
      torpedo: false,
      types: [
        {
          id: "class-i",
          name: "Class I Probe",
          size: 4,
          count: 30,
          description:
            "The smallest probe; can only hold 4 units of equipment. Use for probe networks and general purposes.",
          availableEquipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              size: 1,
              count: 60,
              description:
                "A probe network package instructs the probe to network with up to 7 other probes.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
              __typename: "ProbeEquipment",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
              __typename: "ProbeEquipment",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
              __typename: "ProbeEquipment",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
              __typename: "ProbeEquipment",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
              __typename: "ProbeEquipment",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
              __typename: "ProbeEquipment",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
              __typename: "ProbeEquipment",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
              __typename: "ProbeEquipment",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
              __typename: "ProbeEquipment",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
              __typename: "ProbeEquipment",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
              __typename: "ProbeEquipment",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
              __typename: "ProbeEquipment",
            },
          ],
          __typename: "ProbeType",
        },
        {
          id: "class-ii",
          name: "Class II Probe",
          size: 10,
          count: 30,
          description:
            "This medium-sized probe can hold 10 units of equipment. Use for probe networks and general purposes.",
          availableEquipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              size: 1,
              count: 60,
              description:
                "A probe network package instructs the probe to network with up to 7 other probes.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
              __typename: "ProbeEquipment",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
              __typename: "ProbeEquipment",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
              __typename: "ProbeEquipment",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
              __typename: "ProbeEquipment",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
              __typename: "ProbeEquipment",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
              __typename: "ProbeEquipment",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
              __typename: "ProbeEquipment",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
              __typename: "ProbeEquipment",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
              __typename: "ProbeEquipment",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
              __typename: "ProbeEquipment",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
              __typename: "ProbeEquipment",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
              __typename: "ProbeEquipment",
            },
          ],
          __typename: "ProbeType",
        },
        {
          id: "class-iii",
          name: "Class III Probe",
          size: 16,
          count: 30,
          description:
            "This is the largest standard probe. It can hold up to 16 units of equipment. Use for probe networks and general purposes.",
          availableEquipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              size: 1,
              count: 60,
              description:
                "A probe network package instructs the probe to network with up to 7 other probes.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
              __typename: "ProbeEquipment",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
              __typename: "ProbeEquipment",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
              __typename: "ProbeEquipment",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
              __typename: "ProbeEquipment",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
              __typename: "ProbeEquipment",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
              __typename: "ProbeEquipment",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
              __typename: "ProbeEquipment",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
              __typename: "ProbeEquipment",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
              __typename: "ProbeEquipment",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
              __typename: "ProbeEquipment",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
              __typename: "ProbeEquipment",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
              __typename: "ProbeEquipment",
            },
          ],
          __typename: "ProbeType",
        },
        {
          id: "defense",
          name: "Defensive Probe",
          size: 20,
          count: 20,
          description:
            "This weapon-like probe has access to additional equipment. You can use it to defend your ship. It holds 20 units of equipment.",
          availableEquipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              size: 1,
              count: 60,
              description:
                "A probe network package instructs the probe to network with up to 7 other probes.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
              __typename: "ProbeEquipment",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
              __typename: "ProbeEquipment",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
              __typename: "ProbeEquipment",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
              __typename: "ProbeEquipment",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
              __typename: "ProbeEquipment",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
              __typename: "ProbeEquipment",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
              __typename: "ProbeEquipment",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
              __typename: "ProbeEquipment",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
              __typename: "ProbeEquipment",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
              __typename: "ProbeEquipment",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
              __typename: "ProbeEquipment",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "self-destruct-kit",
              name: "Self-Destruct Kit",
              size: 1,
              count: 17,
              description:
                "A Self-Destruct Kit allows the probe to receive a self-destruct signal from the station.",
              __typename: "ProbeEquipment",
            },
            {
              id: "warp-nacelle",
              name: "Warp Nacelle",
              size: 1,
              count: 20,
              description:
                "A Warp Nacelle (warp core included) allows the probe to travel at warp speed.",
              __typename: "ProbeEquipment",
            },
            {
              id: "targeting-sensors",
              name: "Targeting Sensors",
              size: 2,
              count: 21,
              description:
                "Targeting sensors extends the targeting range of the probe.",
              __typename: "ProbeEquipment",
            },
            {
              id: "proximity-destruct",
              name: "Proximity Destruct",
              size: 2,
              count: 20,
              description:
                "A Proximity Self-Destruct detector tells the probe to blow-up when an enemy is near.",
              __typename: "ProbeEquipment",
            },
            {
              id: "titanium-armor-alloy",
              name: "Titanium Armor Alloy",
              size: 2,
              count: 15,
              description:
                "Titanium Armor Alloy increases the probe's defenses.",
              __typename: "ProbeEquipment",
            },
            {
              id: "stealth-field",
              name: "Stealth Field",
              size: 3,
              count: 7,
              description:
                "A stealth field masks the probe making it harder to detect.",
              __typename: "ProbeEquipment",
            },
            {
              id: "phaser-head",
              name: "Phaser Head",
              size: 3,
              count: 27,
              description:
                "A Phaser Head allows the probe to fire one phaser shot at an enemy ship.",
              __typename: "ProbeEquipment",
            },
          ],
          __typename: "ProbeType",
        },
        {
          id: "science",
          name: "Science Probe",
          size: 12,
          count: 20,
          description:
            "This probe can use special emitters and detectors for specific scientific experiments. It holds 12 units of equipment.",
          availableEquipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              size: 1,
              count: 60,
              description:
                "A probe network package instructs the probe to network with up to 7 other probes.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
              __typename: "ProbeEquipment",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
              __typename: "ProbeEquipment",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
              __typename: "ProbeEquipment",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
              __typename: "ProbeEquipment",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
              __typename: "ProbeEquipment",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
              __typename: "ProbeEquipment",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
              __typename: "ProbeEquipment",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
              __typename: "ProbeEquipment",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
              __typename: "ProbeEquipment",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
              __typename: "ProbeEquipment",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
              __typename: "ProbeEquipment",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
              __typename: "ProbeEquipment",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
              __typename: "ProbeEquipment",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
              __typename: "ProbeEquipment",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
              __typename: "ProbeEquipment",
            },
            {
              id: "tachyon-emitter",
              name: "Tachyon Emitter",
              size: 3,
              count: 8,
              description:
                "A Tachyon Emitter allows the probe to interact with tachyon particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "resonance-emitter",
              name: "Resonance Emitter",
              size: 3,
              count: 8,
              description:
                "A Resonance Emitter allows the probe to interact with resonating particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "lithium-emitter",
              name: "Lithium Emitter",
              size: 3,
              count: 10,
              description:
                "A Lithium Emitter allows the probe to interact with lithium particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "carbon-emitter",
              name: "Carbon Emitter",
              size: 3,
              count: 8,
              description:
                "A Carbon Emitter allows the probe to interact with carbon particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "radiation-emitter",
              name: "Radiation Emitter",
              size: 3,
              count: 8,
              description:
                "A Radiation Emitter allows the probe to interact with radioactive particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "oxygen-emitter",
              name: "Oxygen Emitter",
              size: 3,
              count: 8,
              description:
                "An Oxygen Emitter allows the probe to interact with oxygen particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "hydrogen-emitter",
              name: "Hydrogen Emitter",
              size: 3,
              count: 8,
              description:
                "A Hydrogen Emitter allows the probe to interact with hydrogen particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "helium-emitter",
              name: "Helium Emitter",
              size: 3,
              count: 8,
              description:
                "A Helium Emitter allows the probe to interact with helium particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "graviton-emitter",
              name: "Graviton Emitter",
              size: 3,
              count: 8,
              description:
                "A Graviton Emitter allows the probe to interact with graviton particles.",
              __typename: "ProbeEquipment",
            },
            {
              id: "magnetic-emitter",
              name: "Magnetic Emitter",
              size: 3,
              count: 8,
              description:
                "A Magnetic Emitter allows the probe to interact with magnetic particles.",
              __typename: "ProbeEquipment",
            },
          ],
          __typename: "ProbeType",
        },
      ],
      processedData: "",
      probes: [],
      scienceTypes: [
        {
          id: "resonance-burst",
          name: "Resonance",
          type: "burst",
          equipment: [
            "resonance-emitter",
            "extra-fuel-cell",
            "extra-fuel-cell",
            "radio-transceiver",
          ],
          description:
            "Stimulate anti-matter explosions. Discharges unwanted and dangerous particles from the deflector dish. Disrupts certain anomalies of an energetic nature. Nullifies the effects of plasma storms.",
          __typename: "ScienceType",
        },
        {
          id: "resonance-detector",
          name: "Resonance",
          type: "detector",
          equipment: [
            "resonance-emitter",
            "sensor-array",
            "extra-fuel-cell",
            "communications-signal-booster",
          ],
          description:
            "Detects vibrations and curves in space/time. Can be used to detect spatial anomalies' location and size.",
          __typename: "ScienceType",
        },
        {
          id: "tachyon-burst",
          name: "Tachyon",
          type: "burst",
          equipment: [
            "tachyon-emitter",
            "radio-transceiver",
            "chemical-analysis-package",
          ],
          description:
            "Used to neutralize certain phased matter. Can disrupt phaser fire and stealth systems.",
          __typename: "ScienceType",
        },
        {
          id: "tachyon-detector",
          name: "Tachyon",
          type: "detector",
          equipment: [
            "tachyon-emitter",
            "sensor-array",
            "communications-signal-booster",
          ],
          description:
            "Can locate certain star emissions, as well as cloaked ships.",
          __typename: "ScienceType",
        },
        {
          id: "graviton-detector",
          name: "Graviton",
          type: "detector",
          equipment: [
            "graviton-emitter",
            "sensor-array",
            "subspace-encounter-package",
            "radio-transceiver",
          ],
          description:
            "Detects ship movements, warp trails, impulse trails, and thruster movement.",
          __typename: "ScienceType",
        },
        {
          id: "graviton-burst",
          name: "Graviton",
          type: "burst",
          equipment: [
            "graviton-emitter",
            "ecm-package",
            "extra-fuel-cell",
            "communications-signal-booster",
          ],
          description:
            "Disrupts space/time anomalies. Seals ruptures. Dissipates subspace fields. Can disrupt certain shield systems.",
          __typename: "ScienceType",
        },
        {
          id: "lithium-detector",
          name: "Lithium",
          type: "detector",
          equipment: [
            "lithium-emitter",
            "extra-fuel-cell",
            "extra-fuel-cell",
            "radio-transceiver",
          ],
          description:
            "Locates lithium based life forms, lithium based space anomalies, and lithium based matter. Known as a common way to locate dilithium crystals and other such energy sources.",
          __typename: "ScienceType",
        },
        {
          id: "lithium-burst",
          name: "Lithium",
          type: "burst",
          equipment: [
            "lithium-emitter",
            "sensor-array",
            "sample-retrieval-package",
            "chemical-analysis-package",
          ],
          description:
            "Masks trace amounts of lithium. Kills space-borne microorganisms.",
          __typename: "ScienceType",
        },
        {
          id: "magnetic-detector",
          name: "Magnetic",
          type: "detector",
          equipment: [
            "magnetic-emitter",
            "sensor-array",
            "metaphasic-shield-generator",
            "radio-transceiver",
          ],
          description:
            "Detects magnetic fields emanating from stars, planets, nebulae, and starships.",
          __typename: "ScienceType",
        },
        {
          id: "magnetic-burst",
          name: "Magnetic",
          type: "burst",
          equipment: [
            "magnetic-emitter",
            "ecm-package",
            "extra-fuel-cell",
            "communications-signal-booster",
          ],
          description:
            "Masks transporters signals. Can disrupt anti-matter, destabilize warp fields, and stop matter in a state of flux.",
          __typename: "ScienceType",
        },
        {
          id: "helium-burst",
          name: "Helium",
          type: "burst",
          equipment: [
            "helium-emitter",
            "ecm-package",
            "radio-transceiver",
            "extra-fuel-cell",
          ],
          description:
            "Masks trace amounts of helium. Used to help in terraforming operations. \n --NOT ADVISED TO BE USED NEAR NEBULAE AND OTHER SOURCES OF RADIATION--",
          __typename: "ScienceType",
        },
        {
          id: "helium-detector",
          name: "Helium",
          type: "detector",
          equipment: [
            "helium-emitter",
            "sensor-array",
            "chemical-analysis-package",
            "communications-signal-booster",
          ],
          description:
            "Locates helium based life forms, helium based space anomalies, and helium based matter.",
          __typename: "ScienceType",
        },
        {
          id: "hydrogen-burst",
          name: "Hydrogen",
          type: "burst",
          equipment: ["hydrogen-emitter", "extra-fuel-cell", "extra-fuel-cell"],
          description:
            "Masks trace amounts of hydrogen. Can be used to stimulate fusion reactions and stall the collapse of red dwarf stars.",
          __typename: "ScienceType",
        },
        {
          id: "hydrogen-detector",
          name: "Hydrogen",
          type: "detector",
          equipment: [
            "hydrogen-emitter",
            "sensor-array",
            "sample-retrieval-package",
            "extra-fuel-cell",
          ],
          description:
            "Locates hydrogen based life forms, hydrogen based space anomalies, and hydrogen based matter. Detects the current life cycle and age of a star.",
          __typename: "ScienceType",
        },
        {
          id: "oxygen-burst",
          name: "Oxygen",
          type: "burst",
          equipment: [
            "oxygen-emitter",
            "communications-signal-booster",
            "extra-fuel-cell",
            "extra-fuel-cell",
          ],
          description:
            "Masks trace amounts of oxygen. Can also stimulate exothermic reactions.\n--WARNING: FLAMMABLE SUBSTANCE--",
          __typename: "ScienceType",
        },
        {
          id: "oxygen-detector",
          name: "Oxygen",
          type: "detector",
          equipment: [
            "oxygen-emitter",
            "sample-retrieval-package",
            "chemical-analysis-package",
            "extra-fuel-cell",
          ],
          description:
            "Locates oxygen based life forms, oxygen based space anomalies, and oxygen based matter.",
          __typename: "ScienceType",
        },
        {
          id: "carbon-burst",
          name: "Carbon",
          type: "burst",
          equipment: [
            "carbon-emitter",
            "extra-fuel-cell",
            "extra-fuel-cell",
            "extra-fuel-cell",
          ],
          description:
            "Masks trace amounts of carbon. Also known to regenerate planetary ozone layers. Helps to dissipate the fallout of matter/antimatter reactions.",
          __typename: "ScienceType",
        },
        {
          id: "carbon-detector",
          name: "Carbon",
          type: "detector",
          equipment: [
            "carbon-emitter",
            "sensor-array",
            "sample-retrieval-package",
          ],
          description:
            "Locates carbon based life forms, carbon based space anomalies, and carbon based matter.",
          __typename: "ScienceType",
        },
        {
          id: "radiation-burst",
          name: "Radiation",
          type: "burst",
          equipment: [
            "radiation-emitter",
            "metaphasic-shield-generator",
            "extra-fuel-cell",
          ],
          description:
            "Masks general radiation. Locates unique radiation signatures, either artificial or naturally occurring.",
          __typename: "ScienceType",
        },
        {
          id: "radiation-detector",
          name: "Radiation",
          type: "detector",
          equipment: [
            "radiation-emitter",
            "metaphasic-shield-generator",
            "sensor-array",
          ],
          description:
            "Detects the type and intensity of radiation in the surrounding area. Useful for setting shield frequencies.",
          __typename: "ScienceType",
        },
      ],
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 0,
        powerLevels: [],
        __typename: "Power",
      },
      __typename: "Probes",
    },
  ],
  /* 
  query Ship($simulatorId: ID!) {
  railgun(simulatorId: $simulatorId) {
    id
    simulatorId
    name
    displayName
    ammo
    maxAmmo
    availableAmmo
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
*/
  railgun: [
    {
      id: "1bf5361c-3e98-4547-986c-d08d6bf090b0",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Railgun",
      displayName: "Railgun",
      ammo: 0,
      maxAmmo: 25,
      availableAmmo: 250,
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 5,
        powerLevels: [5],
        __typename: "Power",
      },
      __typename: "Railgun",
    },
  ],
  /* query Ship($simulatorId: ID!) {
  targeting(simulatorId: $simulatorId) {
    id
    simulatorId
    type
    name
    displayName
    range
    quadrants
    coordinateTargeting
    interference
    calculatedTarget {
      x
      y
      z
      __typename
    }
    enteredTarget {
      x
      y
      z
      __typename
    }
    targetedSensorContact {
      id
      name
      picture
      __typename
    }
    classes {
      id
      name
      size
      icon
      speed
      picture
      quadrant
      moving

      __typename
    }
    contacts {
      id
      quadrant
      icon
      size
      name
      class
      speed
      system
      picture
      targeted
      destroyed
      moving
      __typename
    }
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
 */
  targeting: [
    {
      id: "d0b63c32-75f7-4896-9b99-cf86bf7cb09f",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      type: "Targeting",
      name: "Targeting",
      displayName: "Targeting",
      range: 0.33,
      quadrants: false,
      coordinateTargeting: false,
      interference: 0.22,
      calculatedTarget: null,
      enteredTarget: null,
      targetedSensorContact: null,
      classes: [
        {
          id: "92cc915a-d997-450e-b08c-edcf7331600d",
          name: "Target",
          size: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          speed: 1,
          picture: "/Sensor Contacts/Pictures/Default.png",
          quadrant: 1,
          moving: true,
          clickToTarget: false,
          __typename: "TargetingClass",
        },
      ],
      contacts: [
        {
          id: "99a6a194-458a-4153-93cb-f540e136ec69",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          size: 1,
          name: "Target",
          class: "92cc915a-d997-450e-b08c-edcf7331600d",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Default.png",
          targeted: false,
          destroyed: false,
          moving: true,
          clickToTarget: false,
          __typename: "TargetingContact",
        },
        {
          id: "c1334a79-1c97-4d15-90a5-24f0b60e1e66",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          size: 1,
          name: "Target",
          class: "92cc915a-d997-450e-b08c-edcf7331600d",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Default.png",
          targeted: false,
          destroyed: false,
          moving: true,
          clickToTarget: false,
          __typename: "TargetingContact",
        },
      ],
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 2,
        powerLevels: [2],
        __typename: "Power",
      },
      __typename: "Targeting",
    },
  ],
  /* query Ship($simulatorId: ID!) {
  phasers(simulatorId: $simulatorId) {
    id
    simulatorId
   name
    arc
    coolant
    holdToCharge
    beams {
      id
      state
      charge
      heat
      __typename
    }
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
 */
  phasers: [
    {
      id: "64cfa652-b984-4f58-a430-e379043caa66",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Phaser",
      arc: 0.5,
      coolant: 1,
      holdToCharge: false,
      beams: [
        {
          id: "9d563be3-e933-4a45-8c1a-abcdd3060d8e",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "1c551834-d645-4d24-908a-29fad4ea00f0",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "35add545-7d3a-43c4-a9a7-7b846f39301a",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "89d9012a-d3f8-4785-9e80-0278181b887d",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "331f3f9f-909b-4121-82e4-08b11edce324",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "82ea59dc-616a-48dc-b42c-c639fabc3608",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "69009cf3-9f81-4720-b91a-1896164e5d15",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
        {
          id: "51e63203-42c1-416b-af07-d8f1b60460f7",
          state: "idle",
          charge: 0,
          heat: 0,
          __typename: "PhaserBeam",
        },
      ],
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 6,
        powerLevels: [6],
        __typename: "Power",
      },
      __typename: "Phaser",
    },
  ],
  /* query Ship($simulatorId: ID!) {
  torpedos(simulatorId: $simulatorId) {
    id
    simulatorId
    name
    loaded
    state
    inventory {
      id
      type
      probe {
        id
      }
      __typename
    }
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
 */
  torpedos: [
    {
      id: "18c5016b-fa07-489e-a87d-5e8b7af2cb89",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Fore Launcher",
      loaded: null,
      state: "idle",
      inventory: [
        {
          id: "5a88c6fd-6019-4b8c-b862-46c44ecd60cc",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "596f6dc6-95b5-44fc-bfdf-a75c4baa3141",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "506b2011-9fc8-48f3-8d21-4a80984bfdde",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "52ee16da-6fcb-4329-a1c7-ffcc0f9c885f",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "49bd14e2-d1ca-4094-ac17-bd922fbc4826",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "97e395c1-a519-43d4-adfc-edc2dcefe624",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "f98b04cc-67be-4ce0-93a4-6b3d02c68b01",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "c5623404-13a3-4404-991b-215cf4cb5225",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "8df592d1-0cd4-4fc3-8388-82070838419f",
          type: "quantum",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "39ca8e19-8df3-4e1f-bd3d-03a9aa3911c6",
          type: "quantum",
          probe: null,
          __typename: "Warhead",
        },
      ],
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 5,
        powerLevels: [5],
        __typename: "Power",
      },
      __typename: "Torpedo",
    },
    {
      id: "8f0d2765-4c85-4c65-a293-314dae2da6c1",
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      name: "Aft Launcher",
      loaded: null,
      state: "idle",
      inventory: [
        {
          id: "959a78d8-f6b8-468d-a45e-d6f2406af318",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "3b52ab9b-2c29-41b6-b106-6dc288aa9a19",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "bb8e1eb7-3abc-4630-adfa-db5c6297e46a",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "f39d2ca2-605e-4727-9d2d-0f3483ca17f5",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "78c37992-7c2a-42de-baed-4c8c066c5a16",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "b22d945b-bb37-45ee-ba44-924791d7a287",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "65af5504-d138-4bb8-a082-2268a278bb24",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "62b06460-6045-4157-8060-bb7228a54e57",
          type: "photon",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "06c78aef-4e7e-439e-b974-34884adb492a",
          type: "quantum",
          probe: null,
          __typename: "Warhead",
        },
        {
          id: "4962a48e-3ede-43ab-a826-ec5849c18dfa",
          type: "quantum",
          probe: null,
          __typename: "Warhead",
        },
      ],
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 5,
        powerLevels: [5],
        __typename: "Power",
      },
      __typename: "Torpedo",
    },
  ],
  /* query Navigation($simulatorId: ID!) {
  navigation(simulatorId: $simulatorId) {
    id
    name
    presets {
      name
      course {
        x
        y
        z
        __typename
      }
      __typename
    }
    scanning
    calculate
    currentCourse {
      x
      y
      z
      __typename
    }
    calculatedCourse {
      x
      y
      z
      __typename
    }
    destination
    destinations
    thrusters
    power {
      power
      powerLevels
      __typename
    }
    damage {
      damaged
      __typename
    }
    __typename
  }
}
 */
  navigation: [
    {
      id: "93e6adcc-9608-49a6-8335-8f42d0758954",
      name: "Navigation",
      presets: [],
      scanning: false,
      calculate: true,
      currentCourse: {
        x: null,
        y: null,
        z: null,
        __typename: "NavLoc",
      },
      calculatedCourse: {
        x: 258.12,
        y: 242.51,
        z: 83.24,
        __typename: "NavLoc",
      },
      destination: null,
      destinations: [],
      thrusters: false,
      power: {
        power: 3,
        powerLevels: [3],
        __typename: "Power",
      },
      damage: {
        damaged: false,
        __typename: "Damage",
      },
      __typename: "Navigation",
    },
  ],
  /* query getEngines($simulatorId: ID!) {
  engines(simulatorId: $simulatorId) {
    id
    name
    speeds {
      text
      number
      velocity
      __typename
    }
    velocity
    heat
    speed
    on
    stealthFactor

    displayName
    power {
      power
      powerLevels
      __typename
    }
    damage {
      damaged
      report
      __typename
    }

    coolant
    on
    __typename
  }
}
 */
  engines: [
    {
      id: "b6b0b865-4225-4e9e-a689-d3049f98e7eb",
      name: "Impulse",
      speeds: [
        {
          text: "1/4 Impulse",
          number: 0.25,
          velocity: 18750,
          __typename: "Speed",
        },
        {
          text: "1/2 Impulse",
          number: 0.5,
          velocity: 37500,
          __typename: "Speed",
        },
        {
          text: "3/4 Impulse",
          number: 0.75,
          velocity: 56250,
          __typename: "Speed",
        },
        {
          text: "Full Impulse",
          number: 1,
          velocity: 75000,
          __typename: "Speed",
        },
        {
          text: "Destructive Impulse",
          number: 1.25,
          velocity: 93750,
          __typename: "Speed",
        },
      ],
      velocity: 0,
      heat: 0,
      speed: -1,
      on: false,
      stealthFactor: 0,
      displayName: "Impulse Engine",
      power: {
        power: 6,
        powerLevels: [6, 8, 10, 12, 14],
        __typename: "Power",
      },
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      coolant: 1,
      __typename: "Engine",
    },
    {
      id: "55237b3d-162d-4400-ac61-2e12ce64690e",
      name: "Warp",
      speeds: [
        {
          text: "Warp 1",
          number: 1,
          velocity: 749277,
          __typename: "Speed",
        },
        {
          text: "Warp 2",
          number: 2,
          velocity: 900321,
          __typename: "Speed",
        },
        {
          text: "Warp 3",
          number: 3,
          velocity: 1443619,
          __typename: "Speed",
        },
        {
          text: "Warp 4",
          number: 4,
          velocity: 3265257,
          __typename: "Speed",
        },
        {
          text: "Warp 5",
          number: 5,
          velocity: 9381363,
          __typename: "Speed",
        },
        {
          text: "Warp 6",
          number: 6,
          velocity: 30652599,
          __typename: "Speed",
        },
        {
          text: "Warp 7",
          number: 7,
          velocity: 109919571,
          __typename: "Speed",
        },
        {
          text: "Warp 8",
          number: 8,
          velocity: 447053408,
          __typename: "Speed",
        },
        {
          text: "Warp 9",
          number: 9,
          velocity: 2429304561,
          __typename: "Speed",
        },
        {
          text: "Destructive Warp",
          number: 9.54,
          velocity: 9062165670,
          __typename: "Speed",
        },
      ],
      velocity: 0,
      heat: 0,
      speed: -1,
      on: false,
      stealthFactor: 0,
      displayName: "Warp Engine",
      power: {
        power: 37,
        powerLevels: [10, 13, 16, 19, 22, 25, 28, 31, 34, 37],
        __typename: "Power",
      },
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      coolant: 1,
      __typename: "Engine",
    },
  ],
  /*
  query Coolant($simulatorId: ID!) {
  coolant(simulatorId: $simulatorId) {
    id
    name
    displayName
    coolant
    coolantRate
    damage {
      damaged
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
*/

  coolant: [
    {
      id: "4d013bce-5e90-48f8-9e79-272e0a2bdf3d",
      name: "Coolant",
      displayName: "Coolant",
      coolant: 1,
      coolantRate: 0.2,
      damage: {
        damaged: false,
        __typename: "Damage",
      },
      power: {
        power: null,
        powerLevels: null,
        __typename: "Power",
      },
      __typename: "CoolantTank",
    },
  ],
  /*
query Reactors($simulatorId: ID!) {
  reactors(simulatorId: $simulatorId) {
    id
    id
    type
    name
    heat
    model
    coolant
    damage {
      damaged
      __typename
    }
    ejected
    efficiency
    displayName
    powerOutput
    batteryChargeRate
    batteryChargeLevel
    efficiencies {
      label
      color
      efficiency
      __typename
    }
    alphaLevel
    alphaTarget
    betaLevel
    betaTarget
    __typename
  }
}
*/
  reactors: [
    {
      id: "d19e0602-fa91-4345-841c-e5d1bd203196",
      type: "Reactor",
      name: "Battery",
      heat: null,
      model: "battery",
      coolant: null,
      damage: {
        damaged: false,
        __typename: "Damage",
      },
      ejected: false,
      efficiency: 1,
      displayName: "Battery",
      powerOutput: 120,
      batteryChargeRate: 0.001,
      batteryChargeLevel: 0.9995280000000126,
      efficiencies: [
        {
          label: "Overload",
          color: "danger",
          efficiency: 1.25,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Cruise",
          color: "primary",
          efficiency: 1,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Silent Running",
          color: "cloak",
          efficiency: 0.87,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Reduced",
          color: "default",
          efficiency: 0.5,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Auxiliary",
          color: "info",
          efficiency: 0.38,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Minimal",
          color: "warning",
          efficiency: 0.27,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Power Down",
          color: "danger",
          efficiency: 0,
          __typename: "ReactorEfficiency",
        },
        {
          label: "External Power",
          color: "success",
          efficiency: null,
          __typename: "ReactorEfficiency",
        },
      ],
      alphaLevel: 68,
      alphaTarget: 68,
      betaLevel: 67,
      betaTarget: 67,
      __typename: "Reactor",
    },
    {
      id: "ab773137-8573-4714-89e3-892983a157c1",
      type: "Reactor",
      name: "Reactor",
      heat: 0,
      model: "reactor",
      coolant: 1,
      damage: {
        damaged: false,
        __typename: "Damage",
      },
      ejected: false,
      efficiency: 1,
      displayName: "Reactor",
      powerOutput: 100,
      batteryChargeRate: 0.001,
      batteryChargeLevel: 1,
      efficiencies: [
        {
          label: "Overload",
          color: "danger",
          efficiency: 1.25,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Cruise",
          color: "primary",
          efficiency: 1,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Silent Running",
          color: "cloak",
          efficiency: 0.87,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Reduced",
          color: "default",
          efficiency: 0.5,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Auxiliary",
          color: "info",
          efficiency: 0.38,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Minimal",
          color: "warning",
          efficiency: 0.27,
          __typename: "ReactorEfficiency",
        },
        {
          label: "Power Down",
          color: "danger",
          efficiency: 0,
          __typename: "ReactorEfficiency",
        },
        {
          label: "External Power",
          color: "success",
          efficiency: null,
          __typename: "ReactorEfficiency",
        },
      ],
      alphaLevel: 23,
      alphaTarget: 23,
      betaLevel: 3,
      betaTarget: 3,
      __typename: "Reactor",
    },
  ],
  /*
     query StealthField($simulatorId: ID!) {
    stealthField(simulatorId: $simulatorId) {
        id
    name
    state
    charge
    displayName
    activated
    quadrants {
      fore
      aft
      port
      starboard
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    damage {
      damaged
      report
      __typename
    }
    __typename
    }
  }
*/
  stealthField: [
    {
      id: "940fb530-60b2-477d-9291-3422770ef6e3",
      name: "Stealth Field",
      state: true,
      charge: true,
      displayName: "Stealth Field",
      activated: true,
      stealthFactor: 0,
      quadrants: {
        fore: 0,
        aft: 0,
        port: 0,
        starboard: 0,
        __typename: "StealthQuad",
      },
      power: {
        power: 0,
        powerLevels: [0, 15],
        __typename: "Power",
      },
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      __typename: "StealthField",
    },
  ],
  /*
  query Shields($simulatorId: ID!) {
  shields(simulatorId: $simulatorId) {
    id
    name
    displayName
    state
    position
    frequency
    integrity
    simulatorId
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
*/
  shields: [
    {
      id: "541f172e-cc73-4eae-9e26-abd624ce482e",
      name: "Fore",
      displayName: "Fore Shields",
      type: "Shields",
      state: false,
      position: 1,
      frequency: 260.5,
      integrity: 1,
      stealthFactor: 0.4,
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 7,
        powerLevels: [7],
        __typename: "Power",
      },
      __typename: "Shield",
    },
    {
      id: "bb1a104e-73ec-4ddc-87b5-928b318f0158",
      name: "Aft",
      displayName: "Aft Shields",
      type: "Shields",

      state: false,
      position: 2,
      frequency: 260.5,
      integrity: 1,
      stealthFactor: 0.4,
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 7,
        powerLevels: [7],
        __typename: "Power",
      },
      __typename: "Shield",
    },
    {
      id: "f99c6860-c37f-4963-add4-8c9b92467638",
      name: "Port",
      displayName: "Port Shields",
      type: "Shields",

      state: false,
      position: 3,
      frequency: 260.5,
      integrity: 1,
      stealthFactor: 0.4,
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 7,
        powerLevels: [7],
        __typename: "Power",
      },
      __typename: "Shield",
    },
    {
      id: "b3c16b03-dedf-46f8-87e9-cc1759e66f4b",
      name: "Starboard",
      displayName: "Starboard Shields",
      type: "Shields",

      state: false,
      position: 4,
      frequency: 260.5,
      integrity: 1,
      stealthFactor: 0.4,
      simulatorId: "e0b50c95-092b-4010-a08f-89fbdea782df",
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 7,
        powerLevels: [7],
        __typename: "Power",
      },
      __typename: "Shield",
    },
  ],
  /*
  query SubspaceField($simulatorId: ID!) {
  subspaceField(simulatorId: $simulatorId) {
    id
    name
    displayName
    totalPower
    fore {
      required
      value
      __typename
    }
    aft {
      required
      value
      __typename
    }
    port {
      required
      value
      __typename
    }
    starboard {
      required
      value
      __typename
    }
    ventral {
      required
      value
      __typename
    }
    dorsal {
      required
      value
      __typename
    }
    __typename
  }
}

*/
  subspaceField: [
    {
      id: "4dd0bb47-3a4d-4691-8710-1f92b654db30",
      name: "Subspace Field",
      displayName: null,
      totalPower: 300,
      fore: {
        required: 50,
        value: 0,
        __typename: "SubspaceFieldSector",
      },
      aft: {
        required: 50,
        value: 0,
        __typename: "SubspaceFieldSector",
      },
      port: {
        required: 50,
        value: 0,
        __typename: "SubspaceFieldSector",
      },
      starboard: {
        required: 50,
        value: 0,
        __typename: "SubspaceFieldSector",
      },
      ventral: {
        required: 50,
        value: 0,
        __typename: "SubspaceFieldSector",
      },
      dorsal: {
        required: 50,
        value: 0,
        __typename: "SubspaceFieldSector",
      },
      __typename: "SubspaceField",
    },
  ],
  /*  query Thrusters($simulatorId: ID) {
  thrusters(simulatorId: $simulatorId) {
    id
    direction {
      x
      y
      z
      __typename
    }
    rotation {
      yaw
      pitch
      roll
      __typename
    }
    rotationDelta {
      yaw
      pitch
      roll
      __typename
    }
    rotationRequired {
      yaw
      pitch
      roll
      __typename
    }
    manualThrusters
    rotationSpeed
    movementSpeed
    damage {
      damaged
      report
      __typename
    }
    power {
      power
      powerLevels
      __typename
    }
    __typename
  }
}
*/
  thrusters: [
    {
      id: "1473b111-a829-468b-96d5-3e5cad801a61",
      direction: {
        x: 0,
        y: 0,
        z: 0,
        __typename: "Coordinates",
      },
      rotation: {
        yaw: 0,
        pitch: 0,
        roll: 0,
        __typename: "Rotation",
      },
      rotationDelta: {
        yaw: 0,
        pitch: 0,
        roll: 0,
        __typename: "Rotation",
      },
      rotationRequired: {
        yaw: 0,
        pitch: 0,
        roll: 0,
        __typename: "Rotation",
      },
      manualThrusters: false,
      rotationSpeed: 3,
      movementSpeed: 5,
      damage: {
        damaged: false,
        report: null,
        __typename: "Damage",
      },
      power: {
        power: 5,
        powerLevels: [5],
        __typename: "Power",
      },
      __typename: "Thruster",
    },
  ],
  /*  query THX($simulatorId: ID!) {
    thx(simulatorId: $simulatorId) {
    id
    name
    clients {
      id
      lock
      charge
      station {
        name
        __typename
      }
      executive
      __typename
    }
    activated
    __typename
  }
} */
  thx: [
    {
      id: "4326ba64-66e2-4ef2-a2b3-3b5e38a472de",
      name: "THX-1138",
      clients: [
        {
          id: "prove-during-special",
          lock: false,
          charge: 0,
          connected: true,
          station: {
            name: "Engineering",
            __typename: "Station",
          },
          executive: false,
          __typename: "ThxClient",
        },
      ],
      activated: false,
      __typename: "Thx",
    },
  ],
};
