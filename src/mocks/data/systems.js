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
  probes: [
    {
      id: "8813dbdc-ddb6-44a4-869c-6fd265035e0b",
      simulatorId: "baea999a-5aca-441c-b244-5eb37bd18a6a",
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
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
            },
          ],
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
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
            },
          ],
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
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
            },
          ],
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
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
            },
            {
              id: "self-destruct-kit",
              name: "Self-Destruct Kit",
              size: 1,
              count: 17,
              description:
                "A Self-Destruct Kit allows the probe to receive a self-destruct signal from the station.",
            },
            {
              id: "warp-nacelle",
              name: "Warp Nacelle",
              size: 1,
              count: 20,
              description:
                "A Warp Nacelle (warp core included) allows the probe to travel at warp speed.",
            },
            {
              id: "targeting-sensors",
              name: "Targeting Sensors",
              size: 2,
              count: 21,
              description:
                "Targeting sensors extends the targeting range of the probe.",
            },
            {
              id: "proximity-destruct",
              name: "Proximity Destruct",
              size: 2,
              count: 20,
              description:
                "A Proximity Self-Destruct detector tells the probe to blow-up when an enemy is near.",
            },
            {
              id: "titanium-armor-alloy",
              name: "Titanium Armor Alloy",
              size: 2,
              count: 15,
              description:
                "Titanium Armor Alloy increases the probe's defenses.",
            },
            {
              id: "stealth-field",
              name: "Stealth Field",
              size: 3,
              count: 7,
              description:
                "A stealth field masks the probe making it harder to detect.",
            },
            {
              id: "phaser-head",
              name: "Phaser Head",
              size: 3,
              count: 27,
              description:
                "A Phaser Head allows the probe to fire one phaser shot at an enemy ship.",
            },
          ],
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
            },
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              size: 1,
              count: 54,
              description:
                "A radio transceiver is used to let the probe communicate.",
            },
            {
              id: "video-camera",
              name: "Video Camera",
              size: 1,
              count: 47,
              description: "A Video Camera can take still or moving pictures.",
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              size: 2,
              count: 38,
              description:
                "A Communications Signal Booster gives the probe's radio more range.",
            },
            {
              id: "encoding-sequencer",
              name: "Encoding Sequencer",
              size: 2,
              count: 25,
              description:
                "Encodes and encrypts signals, making them more secure.",
            },
            {
              id: "extra-data-storage",
              name: "Extra Data Storage",
              size: 2,
              count: 61,
              description:
                "Increases the amount of on-board data storage, allowing the probe to store more data.",
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              size: 2,
              count: 79,
              description:
                "An Extra Fuel Cell lets the probe travel further and perform longer.",
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              size: 2,
              count: 120,
              description:
                "The Sensor Array gives the probe general scanning abilities.",
            },
            {
              id: "chemical-analysis-package",
              name: "Chemical Analysis Package",
              size: 3,
              count: 24,
              description:
                "A Chemical Analysis Package lets the probe research what chemicals it has found.",
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              size: 3,
              count: 22,
              description:
                "A Sample Retrieval Package lets the probe get something and return it to the ship.",
            },
            {
              id: "radiation-shielding",
              name: "Radiation Shielding",
              size: 3,
              count: 16,
              description:
                "Protects the probe from moderate levels of radiation.",
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              size: 4,
              count: 26,
              description:
                "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
            },
            {
              id: "gas-giant-encounter-package",
              name: "Gas Giant Encounter Package",
              size: 4,
              count: 11,
              description:
                "A Gas Giant Encounter Package allows the probe to research a gas giant.",
            },
            {
              id: "nebula-encounter-package",
              name: "Nebula Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Nebula Encounter Package allows the probe to research a nebula.",
            },
            {
              id: "planetary-encounter-package",
              name: "Planetary Encounter Package",
              size: 4,
              count: 14,
              description:
                "A Planetary Encounter Package allows the probe to research a planet.",
            },
            {
              id: "decoy-package",
              name: "Decoy Package",
              size: 4,
              count: 23,
              description:
                "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
            },
            {
              id: "tractor-beam",
              name: "Tractor Beam",
              size: 5,
              count: 7,
              description:
                "Projects dark matter particles to create areas of negative gravitation. Can be used to pull objects towards the probe.",
            },
            {
              id: "subspace-encounter-package",
              name: "Subspace Encounter Package",
              size: 5,
              count: 6,
              description:
                "A Subspace Encounter Package allows the probe to research subspace.",
            },
            {
              id: "solar-encounter-package",
              name: "Solar Encounter Package",
              size: 5,
              count: 19,
              description:
                "A Solar Encounter Package allows the probe to research a star.",
            },
            {
              id: "transporter-relay",
              name: "Transporter Relay",
              size: 5,
              count: 15,
              description:
                "A transporter relay extends the transporter range of this ship.",
            },
            {
              id: "hologram-projector-package",
              name: "Hologram Projector Package",
              size: 5,
              count: 5,
              description:
                "A Hologram Projector Package makes the probe look like a ship.",
            },
            {
              id: "metaphasic-shield-generator",
              name: "Metaphasic Shield Generator",
              size: 6,
              count: 7,
              description:
                "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
            },
            {
              id: "tachyon-emitter",
              name: "Tachyon Emitter",
              size: 3,
              count: 8,
              description:
                "A Tachyon Emitter allows the probe to interact with tachyon particles.",
            },
            {
              id: "resonance-emitter",
              name: "Resonance Emitter",
              size: 3,
              count: 8,
              description:
                "A Resonance Emitter allows the probe to interact with resonating particles.",
            },
            {
              id: "lithium-emitter",
              name: "Lithium Emitter",
              size: 3,
              count: 10,
              description:
                "A Lithium Emitter allows the probe to interact with lithium particles.",
            },
            {
              id: "carbon-emitter",
              name: "Carbon Emitter",
              size: 3,
              count: 8,
              description:
                "A Carbon Emitter allows the probe to interact with carbon particles.",
            },
            {
              id: "radiation-emitter",
              name: "Radiation Emitter",
              size: 3,
              count: 8,
              description:
                "A Radiation Emitter allows the probe to interact with radioactive particles.",
            },
            {
              id: "oxygen-emitter",
              name: "Oxygen Emitter",
              size: 3,
              count: 8,
              description:
                "An Oxygen Emitter allows the probe to interact with oxygen particles.",
            },
            {
              id: "hydrogen-emitter",
              name: "Hydrogen Emitter",
              size: 3,
              count: 8,
              description:
                "A Hydrogen Emitter allows the probe to interact with hydrogen particles.",
            },
            {
              id: "helium-emitter",
              name: "Helium Emitter",
              size: 3,
              count: 8,
              description:
                "A Helium Emitter allows the probe to interact with helium particles.",
            },
            {
              id: "graviton-emitter",
              name: "Graviton Emitter",
              size: 3,
              count: 8,
              description:
                "A Graviton Emitter allows the probe to interact with graviton particles.",
            },
            {
              id: "magnetic-emitter",
              name: "Magnetic Emitter",
              size: 3,
              count: 8,
              description:
                "A Magnetic Emitter allows the probe to interact with magnetic particles.",
            },
          ],
        },
      ],
      processedData: "Hello there, friend.",
      probes: [
        {
          id: "ab1bc45c-727b-4536-b18b-b39a201da0fb",
          type: "class-i",
          name: "1",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "2d15942c-18d6-44f4-a256-b22f1e337793",
          type: "class-i",
          name: "2",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "c8b37b9f-5a42-4d5b-a776-ed612a369a61",
          type: "class-i",
          name: "3",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "1a2ab064-3d38-4bc2-8686-25ec2aff7192",
          type: "class-ii",
          name: "4",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "71a9dcf0-ae9a-447b-9320-cdeadcbc2776",
          type: "class-ii",
          name: "5",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "003d7b07-713c-46c7-9566-06ee21021c36",
          type: "class-ii",
          name: "6",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "7468c006-dbc2-4bd9-97a2-93f9ceb4b960",
          type: "class-ii",
          name: "7",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "13d6b534-48c6-4a32-88a5-ba94477b95e7",
          type: "class-ii",
          name: "8",
          launched: true,
          equipment: [
            {
              id: "probe-network-package",
              name: "Probe Network Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "0c7ee97a-e466-4a81-b7d9-4ece0cd603ef",
          type: "class-iii",
          name: "Cool Probe",
          launched: true,
          equipment: [
            {
              id: "radio-transceiver",
              name: "Radio Transceiver",
              count: 1,
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              count: 1,
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "35659e99-c400-4e7d-b8c3-e344fea54bcb",
          type: "science",
          name: "Carbon Detector",
          launched: true,
          equipment: [
            {
              id: "carbon-emitter",
              name: "Carbon Emitter",
              count: 1,
            },
            {
              id: "sensor-array",
              name: "Sensor Array",
              count: 1,
            },
            {
              id: "sample-retrieval-package",
              name: "Sample Retrieval Package",
              count: 1,
            },
          ],
          charge: 0,
        },
        {
          id: "a3bc54a1-e74a-489e-8a49-6ebb0e8ae8c0",
          type: "science",
          name: "Graviton Burst",
          launched: true,
          equipment: [
            {
              id: "graviton-emitter",
              name: "Graviton Emitter",
              count: 1,
            },
            {
              id: "ecm-package",
              name: "ECM Package",
              count: 1,
            },
            {
              id: "extra-fuel-cell",
              name: "Extra Fuel Cell",
              count: 1,
            },
            {
              id: "communications-signal-booster",
              name: "Communications Signal Booster",
              count: 1,
            },
          ],
          charge: 0,
        },
      ],
      name: "Probe Launcher",
      power: {
        power: 0,
        powerLevels: [],
      },
      damage: {
        damaged: false,
        report: null,
      },
      scienceTypes: [
        {
          id: "resonance-burst",
          name: "Resonance",
          type: "burst",
          description:
            "Stimulate anti-matter explosions. Discharges unwanted and dangerous particles from the deflector dish. Disrupts certain anomalies of an energetic nature. Nullifies the effects of plasma storms.",
          equipment: [
            "resonance-emitter",
            "extra-fuel-cell",
            "extra-fuel-cell",
            "radio-transceiver",
          ],
        },
        {
          id: "resonance-detector",
          name: "Resonance",
          type: "detector",
          description:
            "Detects vibrations and curves in space/time. Can be used to detect spatial anomalies' location and size.",
          equipment: [
            "resonance-emitter",
            "sensor-array",
            "extra-fuel-cell",
            "communications-signal-booster",
          ],
        },
        {
          id: "tachyon-burst",
          name: "Tachyon",
          type: "burst",
          description:
            "Used to neutralize certain phased matter. Can disrupt phaser fire and stealth systems.",
          equipment: [
            "tachyon-emitter",
            "radio-transceiver",
            "chemical-analysis-package",
          ],
        },
        {
          id: "tachyon-detector",
          name: "Tachyon",
          type: "detector",
          description:
            "Can locate certain star emissions, as well as cloaked ships.",
          equipment: [
            "tachyon-emitter",
            "sensor-array",
            "communications-signal-booster",
          ],
        },
        {
          id: "graviton-detector",
          name: "Graviton",
          type: "detector",
          description:
            "Detects ship movements, warp trails, impulse trails, and thruster movement.",
          equipment: [
            "graviton-emitter",
            "sensor-array",
            "subspace-encounter-package",
            "radio-transceiver",
          ],
        },
        {
          id: "graviton-burst",
          name: "Graviton",
          type: "burst",
          description:
            "Disrupts space/time anomalies. Seals ruptures. Dissipates subspace fields. Can disrupt certain shield systems.",
          equipment: [
            "graviton-emitter",
            "ecm-package",
            "extra-fuel-cell",
            "communications-signal-booster",
          ],
        },
        {
          id: "lithium-detector",
          name: "Lithium",
          type: "detector",
          description:
            "Locates lithium based life forms, lithium based space anomalies, and lithium based matter. Known as a common way to locate dilithium crystals and other such energy sources.",
          equipment: [
            "lithium-emitter",
            "extra-fuel-cell",
            "extra-fuel-cell",
            "radio-transceiver",
          ],
        },
        {
          id: "lithium-burst",
          name: "Lithium",
          type: "burst",
          description:
            "Masks trace amounts of lithium. Kills space-borne microorganisms.",
          equipment: [
            "lithium-emitter",
            "sensor-array",
            "sample-retrieval-package",
            "chemical-analysis-package",
          ],
        },
        {
          id: "magnetic-detector",
          name: "Magnetic",
          type: "detector",
          description:
            "Detects magnetic fields emanating from stars, planets, nebulae, and starships.",
          equipment: [
            "magnetic-emitter",
            "sensor-array",
            "metaphasic-shield-generator",
            "radio-transceiver",
          ],
        },
        {
          id: "magnetic-burst",
          name: "Magnetic",
          type: "burst",
          description:
            "Masks transporters signals. Can disrupt anti-matter, destabilize warp fields, and stop matter in a state of flux.",
          equipment: [
            "magnetic-emitter",
            "ecm-package",
            "extra-fuel-cell",
            "communications-signal-booster",
          ],
        },
        {
          id: "helium-burst",
          name: "Helium",
          type: "burst",
          description:
            "Masks trace amounts of helium. Used to help in terraforming operations. \n --NOT ADVISED TO BE USED NEAR NEBULAE AND OTHER SOURCES OF RADIATION--",
          equipment: [
            "helium-emitter",
            "ecm-package",
            "radio-transceiver",
            "extra-fuel-cell",
          ],
        },
        {
          id: "helium-detector",
          name: "Helium",
          type: "detector",
          description:
            "Locates helium based life forms, helium based space anomalies, and helium based matter.",
          equipment: [
            "helium-emitter",
            "sensor-array",
            "chemical-analysis-package",
            "communications-signal-booster",
          ],
        },
        {
          id: "hydrogen-burst",
          name: "Hydrogen",
          type: "burst",
          description:
            "Masks trace amounts of hydrogen. Can be used to stimulate fusion reactions and stall the collapse of red dwarf stars.",
          equipment: ["hydrogen-emitter", "extra-fuel-cell", "extra-fuel-cell"],
        },
        {
          id: "hydrogen-detector",
          name: "Hydrogen",
          type: "detector",
          description:
            "Locates hydrogen based life forms, hydrogen based space anomalies, and hydrogen based matter. Detects the current life cycle and age of a star.",
          equipment: [
            "hydrogen-emitter",
            "sensor-array",
            "sample-retrieval-package",
            "extra-fuel-cell",
          ],
        },
        {
          id: "oxygen-burst",
          name: "Oxygen",
          type: "burst",
          description:
            "Masks trace amounts of oxygen. Can also stimulate exothermic reactions.\n--WARNING: FLAMMABLE SUBSTANCE--",
          equipment: [
            "oxygen-emitter",
            "communications-signal-booster",
            "extra-fuel-cell",
            "extra-fuel-cell",
          ],
        },
        {
          id: "oxygen-detector",
          name: "Oxygen",
          type: "detector",
          description:
            "Locates oxygen based life forms, oxygen based space anomalies, and oxygen based matter.",
          equipment: [
            "oxygen-emitter",
            "sample-retrieval-package",
            "chemical-analysis-package",
            "extra-fuel-cell",
          ],
        },
        {
          id: "carbon-burst",
          name: "Carbon",
          type: "burst",
          description:
            "Masks trace amounts of carbon. Also known to regenerate planetary ozone layers. Helps to dissipate the fallout of matter/antimatter reactions.",
          equipment: [
            "carbon-emitter",
            "extra-fuel-cell",
            "extra-fuel-cell",
            "extra-fuel-cell",
          ],
        },
        {
          id: "carbon-detector",
          name: "Carbon",
          type: "detector",
          description:
            "Locates carbon based life forms, carbon based space anomalies, and carbon based matter.",
          equipment: [
            "carbon-emitter",
            "sensor-array",
            "sample-retrieval-package",
          ],
        },
        {
          id: "radiation-burst",
          name: "Radiation",
          type: "burst",
          description:
            "Masks general radiation. Locates unique radiation signatures, either artificial or naturally occurring.",
          equipment: [
            "radiation-emitter",
            "metaphasic-shield-generator",
            "extra-fuel-cell",
          ],
        },
        {
          id: "radiation-detector",
          name: "Radiation",
          type: "detector",
          description:
            "Detects the type and intensity of radiation in the surrounding area. Useful for setting shield frequencies.",
          equipment: [
            "radiation-emitter",
            "metaphasic-shield-generator",
            "sensor-array",
          ],
        },
      ],
    },
  ],
  railgun: [
    {
      id: "116451b5-c448-4779-9245-68a0d192dc4f",
      displayName: "Railgun",
      damage: {
        damaged: false,
      },
      power: {
        power: 5,
        powerLevels: [5],
      },
      ammo: 0,
      maxAmmo: 25,
      availableAmmo: 250,
    },
  ],
  targeting: [
    {
      id: "dd26d1ee-8507-4ee6-ba01-3dfcd2cad716",
      type: "Targeting",
      name: "Targeting",
      range: 0.33,
      quadrants: false,
      coordinateTargeting: false,
      interference: 0,
      calculatedTarget: null,
      enteredTarget: null,
      targetedSensorContact: null,
      power: {
        power: 2,
        powerLevels: [2],
      },
      damage: {
        damaged: false,
        report: null,
      },
      classes: [
        {
          id: "daf18f6c-ed66-4d0a-a48f-1f0c1389c7ef",
          name: "Target",
          size: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          speed: 1,
          picture: "/Sensor Contacts/Pictures/Default.png",
          quadrant: 1,
          moving: true,
        },
        {
          id: "b4c5012b-319f-423c-b53e-5cff7c17c25c",
          name: "Other Target",
          size: 1,
          icon: "/Sensor Contacts/Icons/Circle.svg",
          speed: 1,
          picture: "/Sensor Contacts/Pictures/Starbug.png",
          quadrant: 1,
          moving: true,
        },
      ],
      contacts: [
        {
          id: "23d36f97-6668-4938-bc25-f493860e3a20",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          size: 1,
          name: "Target",
          class: "daf18f6c-ed66-4d0a-a48f-1f0c1389c7ef",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Default.png",
          targeted: false,
          destroyed: false,
          moving: true,
        },
        {
          id: "8196a3b7-8554-4bd6-9d20-2ec632c1fbdb",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          size: 1,
          name: "Target",
          class: "daf18f6c-ed66-4d0a-a48f-1f0c1389c7ef",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Default.png",
          targeted: false,
          destroyed: false,
          moving: true,
        },
        {
          id: "e24c346c-3ec9-47e8-a9b9-abd0f845e66b",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Default.svg",
          size: 1,
          name: "Target",
          class: "daf18f6c-ed66-4d0a-a48f-1f0c1389c7ef",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Default.png",
          targeted: false,
          destroyed: false,
          moving: true,
        },
        {
          id: "f729185d-0608-4797-9fb7-9010c355472d",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Circle.svg",
          size: 1,
          name: "Other Target",
          class: "b4c5012b-319f-423c-b53e-5cff7c17c25c",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Starbug.png",
          targeted: false,
          destroyed: false,
          moving: true,
        },
        {
          id: "9df3bad8-8242-4d6a-bd3c-b7d289d4b0c7",
          quadrant: 1,
          icon: "/Sensor Contacts/Icons/Circle.svg",
          size: 1,
          name: "Other Target",
          class: "b4c5012b-319f-423c-b53e-5cff7c17c25c",
          speed: 1,
          system: "General",
          picture: "/Sensor Contacts/Pictures/Starbug.png",
          targeted: false,
          destroyed: false,
          moving: true,
        },
      ],
    },
  ],
  phasers: [
    {
      id: "c879335f-5a7c-4a1d-9c23-92ec4d584ce2",
      simulatorId: "5b331cf1-e94c-4e29-868f-9dca98726090",
      power: {
        power: 6,
        powerLevels: [6],
      },
      damage: {
        damaged: false,
        report: null,
      },
      name: "Phaser",
      beams: [
        {
          id: "9d563be3-e933-4a45-8c1a-abcdd3060d8e",
          state: "idle",
          charge: 1,
          heat: 0,
        },
        {
          id: "1c551834-d645-4d24-908a-29fad4ea00f0",
          state: "idle",
          charge: 0.4499999999999995,
          heat: 0,
        },
        {
          id: "35add545-7d3a-43c4-a9a7-7b846f39301a",
          state: "idle",
          charge: 1,
          heat: 0,
        },
        {
          id: "89d9012a-d3f8-4785-9e80-0278181b887d",
          state: "idle",
          charge: 0,
          heat: 0.19500000000000006,
        },
        {
          id: "331f3f9f-909b-4121-82e4-08b11edce324",
          state: "idle",
          charge: 1,
          heat: 0,
        },
        {
          id: "82ea59dc-616a-48dc-b42c-c639fabc3608",
          state: "idle",
          charge: 1,
          heat: 0,
        },
        {
          id: "69009cf3-9f81-4720-b91a-1896164e5d15",
          state: "idle",
          charge: 1,
          heat: 0,
        },
        {
          id: "51e63203-42c1-416b-af07-d8f1b60460f7",
          state: "idle",
          charge: 1,
          heat: 0,
        },
      ],
      arc: 0.5,
      coolant: 1,
      holdToCharge: false,
    },
  ],
  torpedos: [
    {
      id: "b1316615-86a1-494d-979e-841a1c9f9ffd",
      loaded: "8df592d1-0cd4-4fc3-8388-82070838419f",
      name: "Fore Launcher",
      power: {
        power: 5,
        powerLevels: [5],
      },
      damage: {
        damaged: false,
        report: null,
      },
      inventory: [
        {
          id: "5a88c6fd-6019-4b8c-b862-46c44ecd60cc",
          type: "photon",
          probe: null,
        },
        {
          id: "596f6dc6-95b5-44fc-bfdf-a75c4baa3141",
          type: "photon",
          probe: null,
        },
        {
          id: "506b2011-9fc8-48f3-8d21-4a80984bfdde",
          type: "photon",
          probe: null,
        },
        {
          id: "52ee16da-6fcb-4329-a1c7-ffcc0f9c885f",
          type: "photon",
          probe: null,
        },
        {
          id: "49bd14e2-d1ca-4094-ac17-bd922fbc4826",
          type: "photon",
          probe: null,
        },
        {
          id: "97e395c1-a519-43d4-adfc-edc2dcefe624",
          type: "photon",
          probe: null,
        },
        {
          id: "f98b04cc-67be-4ce0-93a4-6b3d02c68b01",
          type: "photon",
          probe: null,
        },
        {
          id: "c5623404-13a3-4404-991b-215cf4cb5225",
          type: "photon",
          probe: null,
        },
        {
          id: "8df592d1-0cd4-4fc3-8388-82070838419f",
          type: "quantum",
          probe: null,
        },
        {
          id: "39ca8e19-8df3-4e1f-bd3d-03a9aa3911c6",
          type: "quantum",
          probe: null,
        },
      ],
      state: "loaded",
    },
    {
      id: "61ff9626-52e1-4c09-9ad4-9ccc7cf62d1d",
      loaded: null,
      name: "Aft Launcher",
      power: {
        power: 5,
        powerLevels: [5],
      },
      damage: {
        damaged: false,
        report: null,
      },
      inventory: [
        {
          id: "959a78d8-f6b8-468d-a45e-d6f2406af318",
          type: "photon",
          probe: null,
        },
        {
          id: "3b52ab9b-2c29-41b6-b106-6dc288aa9a19",
          type: "photon",
          probe: null,
        },
        {
          id: "bb8e1eb7-3abc-4630-adfa-db5c6297e46a",
          type: "photon",
          probe: null,
        },
        {
          id: "f39d2ca2-605e-4727-9d2d-0f3483ca17f5",
          type: "photon",
          probe: null,
        },
        {
          id: "78c37992-7c2a-42de-baed-4c8c066c5a16",
          type: "photon",
          probe: null,
        },
        {
          id: "b22d945b-bb37-45ee-ba44-924791d7a287",
          type: "photon",
          probe: null,
        },
        {
          id: "65af5504-d138-4bb8-a082-2268a278bb24",
          type: "photon",
          probe: null,
        },
        {
          id: "62b06460-6045-4157-8060-bb7228a54e57",
          type: "photon",
          probe: null,
        },
        {
          id: "06c78aef-4e7e-439e-b974-34884adb492a",
          type: "quantum",
          probe: null,
        },
        {
          id: "4962a48e-3ede-43ab-a826-ec5849c18dfa",
          type: "quantum",
          probe: null,
        },
      ],
      state: "idle",
    },
  ],
};
