import randomWords from "random-words";

export default {
  _eventsCount: 403,
  simulators: [
    {
      id: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Voyager",
      layout: "LayoutCorners",
      alertlevel: "5",
      template: true,
      templateId: null,
      class: "Simulator",
      assets: {
        mesh: "/Simulator/default/mesh.obj",
        texture: "/Simulator/default/texture.jpg",
        side: "/Simulator/default/side.png",
        top: "/Simulator/default/top.png",
        logo: "/Simulator/default/logo.svg"
      },
      stationSet: null,
      stations: [],
      exocomps: 0,
      mission: null,
      currentTimelineStep: 0,
      executedTimelineSteps: ["b7489adc-6220-4110-b29f-66f812d1aa44"],
      bridgeOfficerMessaging: true,
      teams: [],
      training: false,
      ship: {
        clamps: false,
        ramps: false,
        airlock: false,
        legs: false,
        bridgeCrew: 14,
        radiation: 0.1,
        speed: 0,
        selfDestructTime: null,
        selfDestructCode: null,
        selfDestructAuto: false,
        remoteAccessCodes: [],
        extraSystems: []
      },
      panels: [],
      stepDamage: true,
      verifyStep: false,
      requiredDamageSteps: [],
      optionalDamageSteps: []
    }
  ],
  stationSets: [
    {
      class: "StationSet",
      id: "b0a875f6-0e01-4b51-a423-9241bc197f89",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "8-Standard",
      stations: [
        {
          class: "Station",
          name: "Command",
          login: false,
          executive: true,
          messageGroups: [],
          widgets: [
            "composer",
            "calculator",
            "messages",
            "officerLog",
            "objectives"
          ],
          cards: [
            {
              name: "Status",
              icon: null,
              component: "Status",
              class: "Card"
            },
            {
              name: "Self Destruct",
              icon: null,
              component: "SelfDestruct",
              class: "Card"
            },
            {
              name: "ComputerCore",
              icon: null,
              component: "ComputerCore",
              class: "Card"
            },
            {
              name: "Roster",
              icon: null,
              component: "Roster",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Flight Control",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Engines",
              icon: null,
              component: "EngineControl",
              class: "Card"
            },
            {
              name: "Thrusters",
              icon: null,
              component: "Thrusters",
              class: "Card"
            },
            {
              name: "Navigation",
              icon: null,
              component: "Navigation",
              class: "Card"
            },
            {
              name: "Docking",
              icon: null,
              component: "Docking",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Engineering",
          login: false,
          executive: false,
          messageGroups: ["DamageTeams"],
          widgets: [
            "calculator",
            "messages",
            "remote",
            "officerLog",
            "damageReport"
          ],
          cards: [
            {
              name: "Damage Report",
              icon: null,
              component: "DamageControl",
              class: "Card"
            },
            {
              name: "Damage Teams",
              icon: null,
              component: "DamageTeams",
              class: "Card"
            },
            {
              name: "Coolant",
              icon: null,
              component: "CoolantControl",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Tactical",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["calculator", "remote", "messages", "officerLog"],
          cards: [
            {
              name: "Targeting",
              icon: null,
              component: "Targeting",
              class: "Card"
            },
            {
              name: "Shields",
              icon: null,
              component: "ShieldControl",
              class: "Card"
            },
            {
              name: "Stealth Field",
              icon: null,
              component: "StealthField",
              class: "Card"
            },
            {
              name: "Tractor Beam",
              icon: null,
              component: "TractorBeam",
              class: "Card"
            },
            {
              name: "Torpedos",
              icon: null,
              component: "TorpedoLoading",
              class: "Card"
            },
            {
              name: "Phasers",
              icon: null,
              component: "PhaserCharging",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Operations",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: [
            "composer",
            "calculator",
            "messages",
            "remote",
            "officerLog"
          ],
          cards: [
            {
              name: "Power Distribution",
              icon: null,
              component: "PowerDistribution",
              class: "Card"
            },
            {
              name: "Cargo Control",
              icon: null,
              component: "CargoControl",
              class: "Card"
            },
            {
              name: "Reactor Control",
              icon: null,
              component: "ReactorControl",
              class: "Card"
            },
            {
              name: "Transporters",
              icon: null,
              component: "Transporters",
              class: "Card"
            },
            {
              name: "Shuttles",
              icon: null,
              component: "Shuttles",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Sensors",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Sensors",
              icon: null,
              component: "Sensors",
              class: "Card"
            },
            {
              name: "Scanning",
              icon: null,
              component: "SensorScans",
              class: "Card"
            },
            {
              name: "Probe Construction",
              icon: null,
              component: "ProbeConstruction",
              class: "Card"
            },
            {
              name: "Probe Control",
              icon: null,
              component: "ProbeControl",
              class: "Card"
            },
            {
              name: "Probe Network",
              icon: null,
              component: "ProbeNetwork",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Comm",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["composer", "calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Short Range Comm",
              icon: null,
              component: "CommShortRange",
              class: "Card"
            },
            {
              name: "Decoding",
              icon: null,
              component: "CommDecoding",
              class: "Card"
            },
            {
              name: "Long Range Comm",
              icon: null,
              component: "LongRangeComm",
              class: "Card"
            },
            {
              name: "Internal Comm",
              icon: null,
              component: "CommInternal",
              class: "Card"
            },
            {
              name: "Signal Jammer",
              icon: null,
              component: "SignalJammer",
              class: "Card"
            },
            {
              name: "Comm Review",
              icon: null,
              component: "CommReview",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Security",
          login: false,
          executive: false,
          messageGroups: ["SecurityTeams"],
          widgets: ["composer", "calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Deck Control",
              icon: null,
              component: "SecurityDecks",
              class: "Card"
            },
            {
              name: "Security Scans",
              icon: null,
              component: "SecurityScans",
              class: "Card"
            },
            {
              name: "Security Teams",
              icon: null,
              component: "SecurityTeams",
              class: "Card"
            },
            {
              name: "Security Armory",
              icon: null,
              component: "SecurityArmory",
              class: "Card"
            },
            {
              name: "Security Library",
              icon: null,
              component: "SecurityLibrary",
              class: "Card"
            }
          ]
        }
      ]
    },
    {
      class: "StationSet",
      id: "67119e3f-ed4f-422f-ab29-33add4d1f8c9",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "10-Standard",
      stations: [
        {
          class: "Station",
          name: "Command",
          login: false,
          executive: true,
          messageGroups: [],
          widgets: [
            "composer",
            "calculator",
            "objectives",
            "messages",
            "officerLog"
          ],
          cards: [
            {
              name: "Status",
              icon: null,
              component: "Status",
              class: "Card"
            },
            {
              name: "Self Destruct",
              icon: null,
              component: "SelfDestruct",
              class: "Card"
            },
            {
              name: "Roster",
              icon: null,
              component: "Roster",
              class: "Card"
            },
            {
              name: "Library",
              icon: null,
              component: "Library",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Flight Control",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Engine Control",
              icon: null,
              component: "EngineControl",
              class: "Card"
            },
            {
              name: "Thrusters",
              icon: null,
              component: "Thrusters",
              class: "Card"
            },
            {
              name: "Navigation",
              icon: null,
              component: "Navigation",
              class: "Card"
            },
            {
              name: "Docking",
              icon: null,
              component: "Docking",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Engineering",
          login: false,
          executive: false,
          messageGroups: ["DamageTeams"],
          widgets: [
            "remote",
            "damageReport",
            "officerLog",
            "composer",
            "calculator",
            "messages"
          ],
          cards: [
            {
              name: "Damage Control",
              icon: null,
              component: "DamageControl",
              class: "Card"
            },
            {
              name: "Damage Teams",
              icon: null,
              component: "DamageTeams",
              class: "Card"
            },
            {
              name: "Equipment",
              icon: null,
              component: "DamageArmory",
              class: "Card"
            },
            {
              name: "Coolant Control",
              icon: null,
              component: "CoolantControl",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Tactical",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["calculator", "messages", "remote", "officerLog"],
          cards: [
            {
              name: "Targeting",
              icon: null,
              component: "Targeting",
              class: "Card"
            },
            {
              name: "Phaser Charging",
              icon: null,
              component: "PhaserCharging",
              class: "Card"
            },
            {
              name: "Torpedo Loading",
              icon: null,
              component: "TorpedoLoading",
              class: "Card"
            },
            {
              name: "Shield Control",
              icon: null,
              component: "ShieldControl",
              class: "Card"
            },
            {
              name: "Stealth Field",
              icon: null,
              component: "StealthField",
              class: "Card"
            },
            {
              name: "Tractor Beam",
              icon: null,
              component: "TractorBeam",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Operations",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: [],
          cards: [
            {
              name: "Power Distribution",
              icon: null,
              component: "PowerDistribution",
              class: "Card"
            },
            {
              name: "Reactor Control",
              icon: null,
              component: "ReactorControl",
              class: "Card"
            },
            {
              name: "Dilithium Stress",
              icon: null,
              component: "DilithiumStress",
              class: "Card"
            },
            {
              name: "Shuttles",
              icon: null,
              component: "Shuttles",
              class: "Card"
            },
            {
              name: "Transporters",
              icon: null,
              component: "Transporters",
              class: "Card"
            },
            {
              name: "Cargo Control",
              icon: null,
              component: "CargoControl",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Sensors",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Sensors",
              icon: null,
              component: "Sensors",
              class: "Card"
            },
            {
              name: "Sensor Scans",
              icon: null,
              component: "SensorScans",
              class: "Card"
            },
            {
              name: "Probe Construction",
              icon: null,
              component: "ProbeConstruction",
              class: "Card"
            },
            {
              name: "Probe Network",
              icon: null,
              component: "ProbeNetwork",
              class: "Card"
            },
            {
              name: "Probe Control",
              icon: null,
              component: "ProbeControl",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Comm",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["composer", "calculator", "messages", "officerLog"],
          cards: [
            {
              name: "Short Range Comm",
              icon: null,
              component: "CommShortRange",
              class: "Card"
            },
            {
              name: "Long Range Comm",
              icon: null,
              component: "LongRangeComm",
              class: "Card"
            },
            {
              name: "Decoding",
              icon: null,
              component: "CommDecoding",
              class: "Card"
            },
            {
              name: "Internal Comm",
              icon: null,
              component: "CommInternal",
              class: "Card"
            },
            {
              name: "Signal Jammer",
              icon: null,
              component: "SignalJammer",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Security",
          login: false,
          executive: false,
          messageGroups: ["SecurityTeams"],
          widgets: ["messages", "officerLog", "composer"],
          cards: [
            {
              name: "Security Decks",
              icon: null,
              component: "SecurityDecks",
              class: "Card"
            },
            {
              name: "Security Scans",
              icon: null,
              component: "SecurityScans",
              class: "Card"
            },
            {
              name: "Security Teams",
              icon: null,
              component: "SecurityTeams",
              class: "Card"
            },
            {
              name: "Security Armory",
              icon: null,
              component: "SecurityArmory",
              class: "Card"
            },
            {
              name: "Security Library",
              icon: null,
              component: "SecurityLibrary",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Medical",
          login: false,
          executive: false,
          messageGroups: ["MedicalTeams"],
          widgets: ["messages", "composer", "officerLog", "calculator"],
          cards: [
            {
              name: "Sickbay",
              icon: null,
              component: "Sickbay",
              class: "Card"
            },
            {
              name: "Decontamination",
              icon: null,
              component: "Decontamination",
              class: "Card"
            },
            {
              name: "Medical Roster",
              icon: null,
              component: "MedicalRoster",
              class: "Card"
            },
            {
              name: "Medical Teams",
              icon: null,
              component: "MedicalTeams",
              class: "Card"
            },
            {
              name: "Medical Armory",
              icon: null,
              component: "MedicalArmory",
              class: "Card"
            },
            {
              name: "Medical Library",
              icon: null,
              component: "MedicalLibrary",
              class: "Card"
            }
          ]
        },
        {
          class: "Station",
          name: "Counterintelligence",
          login: false,
          executive: false,
          messageGroups: [],
          widgets: ["composer", "officerLog", "messages", "remote"],
          cards: [
            {
              name: "Decoding",
              icon: null,
              component: "CommDecoding",
              class: "Card"
            },
            {
              name: "Code Cyphers",
              icon: null,
              component: "CodeCyphers",
              class: "Card"
            },
            {
              name: "Interception",
              icon: null,
              component: "Interception",
              class: "Card"
            },
            {
              name: "Comm Review",
              icon: null,
              component: "CommReview",
              class: "Card"
            },
            {
              name: "Computer Core",
              icon: null,
              component: "ComputerCore",
              class: "Card"
            }
          ]
        }
      ]
    }
  ],
  flights: [],
  missions: [],
  systems: [
    {
      id: "762d0afa-9b68-4c35-8ae0-7aa55d1f7901",
      class: "LongRangeComm",
      type: "LongRangeComm",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Long Range Communications",
      displayName: "Long Range Comm",
      power: {
        power: 2,
        powerLevels: [2]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: ["9dd20de2-5f72-4a4d-b81e-3aa21bc295f1"],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      messages: [],
      messageSent: false,
      interception: false,
      locked: false,
      decoded: false,
      satellites: 3
    },
    {
      id: "90731c1e-28e3-4216-8ead-fdf1e3a83544",
      class: "InternalComm",
      type: "InternalComm",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Internal Communications",
      displayName: "Internal Comm",
      power: {
        power: 0,
        powerLevels: []
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: ["9dd20de2-5f72-4a4d-b81e-3aa21bc295f1"],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      state: "idle",
      outgoing: null,
      incoming: null
    },
    {
      id: "5aa006ba-2f47-4af5-b2d8-d71149f2c9a1",
      class: "Engine",
      type: "Engine",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Impulse",
      displayName: "Impulse Engine",
      power: {
        power: 6,
        powerLevels: [6, 8, 10, 12, 14]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      heat: 0,
      heatRate: 1,
      coolant: 1,
      cooling: false,
      on: false,
      speeds: [
        {
          text: "1/4 Impulse",
          number: 0.25,
          velocity: 18750
        },
        {
          text: "1/2 Impulse",
          number: 0.5,
          velocity: 37500
        },
        {
          text: "3/4 Impulse",
          number: 0.75,
          velocity: 56250
        },
        {
          text: "Full Impulse",
          number: 1,
          velocity: 75000
        },
        {
          text: "Destructive Impulse",
          number: 1.25,
          velocity: 93750
        }
      ],
      speed: -1,
      useAcceleration: true,
      speedFactor: 1250,
      acceleration: 0
    },
    {
      id: "f413c026-5bd0-4e28-ba63-6737236addb5",
      class: "Thrusters",
      type: "Thrusters",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Thrusters",
      displayName: "Thrusters",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: ["4c03247e-56bb-4ec7-8453-0ea7de504df4"],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      direction: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: {
        yaw: 0,
        pitch: 0,
        roll: 0
      },
      rotationDelta: {
        yaw: 0,
        pitch: 0,
        roll: 0
      },
      rotationRequired: {
        yaw: 0,
        pitch: 0,
        roll: 0
      },
      manualThrusters: false,
      thrusting: false,
      rotationSpeed: 3,
      movementSpeed: 5
    },
    {
      id: "6deb9b38-e919-4af3-b6ef-f42aea2db465",
      class: "Navigation",
      type: "Navigation",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Navigation",
      displayName: "Navigation",
      power: {
        power: 3,
        powerLevels: [3]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [
        "33d1ccbd-68c3-4309-b1de-602ab864f62a",
        "13711617-6f58-44f1-98e4-afef5dddb827",
        "bbc6965c-7c80-4a2d-a34c-6c3b1c991119"
      ],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      calculate: true,
      currentCourse: {
        x: null,
        y: null,
        z: null
      },
      calculatedCourse: {
        x: null,
        y: null,
        z: null
      },
      destination: null,
      destinations: [],
      scanning: false,
      presets: [],
      thrusters: false
    },
    {
      id: "d037b35a-ec20-418f-aff8-759667afdfff",
      class: "Sensors",
      type: "Sensors",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "External Sensors",
      displayName: "External Sensors",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [
        "f2b310a8-e12c-4041-9bcb-6a37ef8841ea",
        "7695e147-3e40-40ae-8a8e-74ec2f06079e",
        "a67ec97e-44be-4e0c-949f-c7da79238f36"
      ],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      domain: "external",
      pings: true,
      pingMode: "manual",
      timeSincePing: 61888300,
      scanResults: "",
      scanRequest: "",
      processedData: "",
      presetAnswers: [],
      scanning: false,
      autoTarget: false,
      history: false,
      scans: [],
      contacts: [],
      armyContacts: [],
      frozen: false,
      autoThrusters: false,
      interference: 0,
      movement: {
        x: 0,
        y: 0,
        z: 0
      },
      thrusterMovement: {
        x: 0,
        y: 0,
        z: 0
      },
      segments: []
    },
    {
      id: "8f013dc1-9c19-4c34-b9e4-7a24e6e78419",
      class: "Sensors",
      type: "Sensors",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Internal Sensors",
      displayName: "Internal Sensors",
      power: {
        power: 3,
        powerLevels: [3]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [
        "a67ec97e-44be-4e0c-949f-c7da79238f36",
        "fbf11e57-c6fa-4ffb-a2cd-baafbe6ab76a"
      ],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      domain: "internal",
      pings: true,
      pingMode: "manual",
      timeSincePing: 61888300,
      scanResults: "",
      scanRequest: "",
      processedData: "",
      presetAnswers: [],
      scanning: false,
      autoTarget: false,
      history: false,
      scans: [],
      contacts: [],
      armyContacts: [],
      frozen: false,
      autoThrusters: false,
      interference: 0,
      movement: {
        x: 0,
        y: 0,
        z: 0
      },
      thrusterMovement: {
        x: 0,
        y: 0,
        z: 0
      },
      segments: []
    },
    {
      id: "6b675202-0e9c-4c0f-a7b7-07076086525b",
      class: "Probes",
      type: "Probes",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Probe Launcher",
      displayName: "Probe Launcher",
      power: {
        power: 0,
        powerLevels: []
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      torpedo: false,
      probes: [],
      equipment: [
        {
          id: "probe-network-package",
          name: "Probe Network Package",
          description:
            "A probe network package instructs the probe to network with up to 7 other probes.",
          size: 1,
          count: 60,
          availableProbes: []
        },
        {
          id: "radio-transceiver",
          name: "Radio Transceiver",
          description:
            "A radio transceiver is used to let the probe communicate.",
          size: 1,
          count: 54,
          availableProbes: []
        },
        {
          id: "video-camera",
          name: "Video Camera",
          description: "A Video Camera can take still or moving pictures.",
          size: 1,
          count: 47,
          availableProbes: []
        },
        {
          id: "communications-signal-booster",
          name: "Communications Signal Booster",
          description:
            "A Communications Signal Booster gives the probe's radio more range.",
          size: 2,
          count: 38,
          availableProbes: []
        },
        {
          id: "encoding-sequencer",
          name: "Encoding Sequencer",
          description: "Encodes and encrypts signals, making them more secure.",
          size: 2,
          count: 25,
          availableProbes: []
        },
        {
          id: "extra-data-storage",
          name: "Extra Data Storage",
          description:
            "Increases the amount of on-board data storage, allowing the probe to store more data.",
          size: 2,
          count: 61,
          availableProbes: []
        },
        {
          id: "extra-fuel-cell",
          name: "Extra Fuel Cell",
          description:
            "An Extra Fuel Cell lets the probe travel further and perform longer.",
          size: 2,
          count: 79,
          availableProbes: []
        },
        {
          id: "sensor-array",
          name: "Sensor Array",
          description:
            "The Sensor Array gives the probe general scanning abilities.",
          size: 2,
          count: 120,
          availableProbes: []
        },
        {
          id: "chemical-analysis-package",
          name: "Chemical Analysis Package",
          description:
            "A Chemical Analysis Package lets the probe research what chemicals it has found.",
          size: 3,
          count: 24,
          availableProbes: []
        },
        {
          id: "sample-retrieval-package",
          name: "Sample Retrieval Package",
          description:
            "A Sample Retrieval Package lets the probe get something and return it to the ship.",
          size: 3,
          count: 22,
          availableProbes: []
        },
        {
          id: "radiation-shielding",
          name: "Radiation Shielding",
          description: "Protects the probe from moderate levels of radiaiton.",
          size: 3,
          count: 16,
          availableProbes: []
        },
        {
          id: "ecm-package",
          name: "ECM Package",
          description:
            "An ECM (Electronic Counter Measures) Package is used to jam electronics.",
          size: 4,
          count: 26,
          availableProbes: []
        },
        {
          id: "gas-giant-encounter-package",
          name: "Gas Giant Encounter Package",
          description:
            "A Gas Giant Encounter Package allows the probe to research a gas giant.",
          size: 4,
          count: 11,
          availableProbes: []
        },
        {
          id: "nebula-encounter-package",
          name: "Nebula Encounter Package",
          description:
            "A Nebula Encounter Package allows the probe to research a nebula.",
          size: 4,
          count: 14,
          availableProbes: []
        },
        {
          id: "planetary-encounter-package",
          name: "Planetary Encounter Package",
          description:
            "A Planetary Encounter Package allows the probe to research a planet.",
          size: 4,
          count: 14,
          availableProbes: []
        },
        {
          id: "decoy-package",
          name: "Decoy Package",
          description:
            "A Decoy Package sends out signals to make sensor devices detect the probe as a ship.",
          size: 4,
          count: 23,
          availableProbes: []
        },
        {
          id: "subspace-encounter-package",
          name: "Subspace Encounter Package",
          description:
            "A Subspace Encounter Package allows the probe to research subspace.",
          size: 5,
          count: 6,
          availableProbes: []
        },
        {
          id: "solar-encounter-package",
          name: "Solar Encounter Package",
          description:
            "A Solar Encounter Package allows the probe to research a star.",
          size: 5,
          count: 19,
          availableProbes: []
        },
        {
          id: "transporter-relay",
          name: "Transporter Relay",
          description:
            "A transporter relay extends the transporter range of this ship.",
          size: 5,
          count: 15,
          availableProbes: []
        },
        {
          id: "hologram-projector-package",
          name: "Hologram Projector Package",
          description:
            "A Hologram Projector Package makes the probe look like a ship.",
          size: 5,
          count: 5,
          availableProbes: []
        },
        {
          id: "metaphasic-shield-generator",
          name: "Metaphasic Shield Generator",
          description:
            "Shield Generator that can construct a Shield Grid with other probes up to 2,500 Km protecting from radiation.",
          size: 6,
          count: 7,
          availableProbes: []
        },
        {
          id: "self-destruct-kit",
          name: "Self-Destruct Kit",
          description:
            "A Self-Destruct Kit allows the probe to receive a self-destruct signal from the station.",
          size: 1,
          count: 17,
          availableProbes: ["defense"]
        },
        {
          id: "warp-nacelle",
          name: "Warp Nacelle",
          description:
            "A Warp Nacelle (warp core included) allows the probe to travel at warp speed.",
          size: 1,
          count: 20,
          availableProbes: ["defense"]
        },
        {
          id: "targeting-sensors",
          name: "Targeting Sensors",
          description:
            "Targeting sensors extends the targeting range of the probe.",
          size: 2,
          count: 21,
          availableProbes: ["defense"]
        },
        {
          id: "proximity-destruct",
          name: "Proximity Destruct",
          description:
            "A Proximity Self-Destruct detector tells the probe to blow-up when an enemy is near.",
          size: 2,
          count: 20,
          availableProbes: ["defense"]
        },
        {
          id: "titanium-armor-alloy",
          name: "Titanium Armor Alloy",
          description: "Titanium Armor Alloy increases the probe's defenses.",
          size: 2,
          count: 15,
          availableProbes: ["defense"]
        },
        {
          id: "stealth-field",
          name: "Stealth Field",
          description:
            "A stealth field masks the probe making it harder to detect.",
          size: 3,
          count: 7,
          availableProbes: ["defense"]
        },
        {
          id: "phaser-head",
          name: "Phaser Head",
          description:
            "A Phaser Head allows the probe to fire one phaser shot at an enemy ship.",
          size: 3,
          count: 27,
          availableProbes: ["defense"]
        },
        {
          id: "tachyon-emitter",
          name: "Tachyon Emitter",
          description:
            "A Tachyon Emitter allows the probe to interact with tachyon particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "resonance-emitter",
          name: "Resonance Emitter",
          description:
            "A Resonance Emitter allows the probe to interact with resonating particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "lithium-emitter",
          name: "Lithium Emitter",
          description:
            "A Lithium Emitter allows the probe to interact with lithium particles.",
          size: 3,
          count: 10,
          availableProbes: ["science"]
        },
        {
          id: "carbon-emitter",
          name: "Carbon Emitter",
          description:
            "A Carbon Emitter allows the probe to interact with carbon particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "radiation-emitter",
          name: "Radiation Emitter",
          description:
            "A Radiation Emitter allows the probe to interact with radioactive particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "oxygen-emitter",
          name: "Oxygen Emitter",
          description:
            "An Oxygen Emitter allows the probe to interact with oxygen particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "hydrogen-emitter",
          name: "Hydrogen Emitter",
          description:
            "A Hydrogen Emitter allows the probe to interact with hydrogen particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "helium-emitter",
          name: "Helium Emitter",
          description:
            "A Helium Emitter allows the probe to interact with helium particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "graviton-emitter",
          name: "Graviton Emitter",
          description:
            "A Graviton Emitter allows the probe to interact with graviton particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        },
        {
          id: "magnetic-emitter",
          name: "Magnetic Emitter",
          description:
            "A Magnetic Emitter allows the probe to interact with magnetic particles.",
          size: 3,
          count: 8,
          availableProbes: ["science"]
        }
      ],
      types: [
        {
          id: "class-i",
          name: "Class I Probe",
          parentId: "6b675202-0e9c-4c0f-a7b7-07076086525b",
          description:
            "The smallest probe; can only hold 4 units of equipment. Use for probe networks and general purposes.",
          size: 4,
          count: 30
        },
        {
          id: "class-ii",
          name: "Class II Probe",
          parentId: "6b675202-0e9c-4c0f-a7b7-07076086525b",
          description:
            "This medium-sized probe can hold 10 units of equipment. Use for probe networks and general purposes.",
          size: 10,
          count: 30
        },
        {
          id: "class-iii",
          name: "Class III Probe",
          parentId: "6b675202-0e9c-4c0f-a7b7-07076086525b",
          description:
            "This is the largest standard probe. It can hold up to 16 units of equipment. Use for probe networks and general purposes.",
          size: 16,
          count: 30
        },
        {
          id: "defense",
          name: "Defensive Probe",
          parentId: "6b675202-0e9c-4c0f-a7b7-07076086525b",
          description:
            "This weapon-like probe has access to additional equipment. You can use it to defend your ship. It holds 20 units of equipment.",
          size: 4,
          count: 20
        },
        {
          id: "science",
          name: "Science Probe",
          parentId: "6b675202-0e9c-4c0f-a7b7-07076086525b",
          description:
            "This probe can use special emitters and detectors for specific scientific experiments. It holds 12 units of equipment.",
          size: 12,
          count: 20
        }
      ],
      stealthCompromised: false,
      processedData: ""
    },
    {
      id: "a361d9a6-688c-40c6-ac2a-6fad6576aafb",
      class: "TractorBeam",
      type: "TractorBeam",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Tractor Beam",
      displayName: "Tractor Beam",
      power: {
        power: 5,
        powerLevels: [5, 10]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: ["4e891b9b-4b16-45ae-96fb-f127471d1cb1"],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      state: false,
      target: false,
      targetLabel: "",
      strength: 0,
      stress: 0.15,
      scanning: false
    },
    {
      id: "fd1d8609-1406-4300-9c69-d5ba275ba0f5",
      class: "Transporters",
      type: "Transporters",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Transporters",
      displayName: "Transporters",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: ["c6a129cd-c960-4765-bff9-72fc5466aa34"],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      targets: [],
      requestedTarget: null,
      destination: null,
      charge: 0,
      state: "Inactive",
      stealthCompromised: false
    },
    {
      id: "7c68e5a6-6801-49bf-b1f8-445e540725e7",
      class: "Reactor",
      type: "Reactor",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Battery",
      displayName: "Battery",
      power: {
        power: 0,
        powerLevels: []
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      heat: null,
      heatRate: null,
      coolant: null,
      cooling: false,
      ejected: false,
      model: "battery",
      powerOutput: 120,
      efficiency: 1,
      externalPower: true,
      batteryChargeLevel: 0.9995280000000126,
      batteryChargeRate: 0.001,
      depletion: 0,
      alphaLevel: 68,
      betaLevel: 67,
      alphaTarget: 68,
      betaTarget: 67,
      alerted: false
    },
    {
      id: "f2bbc94a-e192-401f-84b0-b2692fdf4b6a",
      class: "Reactor",
      type: "Reactor",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Reactor",
      displayName: "Reactor",
      power: {
        power: 0,
        powerLevels: []
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      heat: 1,
      heatRate: 1,
      coolant: 1,
      cooling: false,
      ejected: false,
      model: "reactor",
      powerOutput: 100,
      efficiency: 1,
      externalPower: true,
      batteryChargeLevel: 1,
      batteryChargeRate: 0.001,
      depletion: 0,
      alphaLevel: 23,
      betaLevel: 3,
      alphaTarget: 23,
      betaTarget: 3,
      alerted: false
    },
    {
      id: "111b473a-b3f5-48f1-827c-3f85857f233e",
      class: "StealthField",
      type: "StealthField",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Stealth Field",
      displayName: "Stealth Field",
      power: {
        power: 0,
        powerLevels: [0, 15],
        defaultLevel: 0
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      charge: false,
      activated: true,
      state: false,
      quadrants: {
        fore: 0,
        aft: 0,
        port: 0,
        starboard: 0
      }
    },
    {
      id: "d0c8de83-1b2c-4e9a-99d0-11b66cbe1959",
      class: "Shield",
      type: "Shield",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Fore",
      displayName: "Fore Shields",
      power: {
        power: 7,
        powerLevels: [7]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      position: 1,
      frequency: 260.5,
      state: false,
      integrity: 1
    },
    {
      id: "4c051dee-f466-4eae-8ab4-8efbdd81b8c3",
      class: "Shield",
      type: "Shield",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Aft",
      displayName: "Aft Shields",
      power: {
        power: 7,
        powerLevels: [7]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      position: 2,
      frequency: 260.5,
      state: false,
      integrity: 1
    },
    {
      id: "3c321a72-99fe-4c66-9d39-bb02187b0397",
      class: "Shield",
      type: "Shield",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Port",
      displayName: "Port Shields",
      power: {
        power: 7,
        powerLevels: [7]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      position: 3,
      frequency: 260.5,
      state: false,
      integrity: 1
    },
    {
      id: "16615a95-c67d-46f6-9784-7d8ddc53908f",
      class: "Shield",
      type: "Shield",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Starboard",
      displayName: "Starboard Shields",
      power: {
        power: 7,
        powerLevels: [7]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      position: 4,
      frequency: 260.5,
      state: false,
      integrity: 1
    },
    {
      id: "6efa6459-c6e2-4c87-b011-963871023cd7",
      class: "Targeting",
      type: "Targeting",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Targeting",
      displayName: "Targeting",
      power: {
        power: 2,
        powerLevels: [2]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      contacts: [],
      classes: [],
      quadrants: false,
      coordinateTargeting: false,
      targetedSensorContact: null,
      calculatedTarget: null,
      enteredTarget: null
    },
    {
      id: "9a49957d-d644-4a77-8fe3-9756eea50ec7",
      class: "Phasers",
      type: "Phasers",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Phaser",
      displayName: "Phaser",
      power: {
        power: 6,
        powerLevels: [6]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      heat: 0,
      heatRate: 1,
      coolant: 1,
      cooling: null,
      arc: 0.5,
      beams: [
        {
          id: "9d563be3-e933-4a45-8c1a-abcdd3060d8e",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "1c551834-d645-4d24-908a-29fad4ea00f0",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "35add545-7d3a-43c4-a9a7-7b846f39301a",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "89d9012a-d3f8-4785-9e80-0278181b887d",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "331f3f9f-909b-4121-82e4-08b11edce324",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "82ea59dc-616a-48dc-b42c-c639fabc3608",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "69009cf3-9f81-4720-b91a-1896164e5d15",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        },
        {
          id: "51e63203-42c1-416b-af07-d8f1b60460f7",
          class: "System",
          type: "System",
          simulatorId: null,
          name: null,
          displayName: null,
          power: {
            power: 5,
            powerLevels: [5]
          },
          damage: {
            damaged: false,
            report: null,
            reportSteps: null,
            requested: false,
            currentStep: 0,
            reactivationCode: null,
            reactivationRequester: null,
            neededReactivationCode: null,
            exocompParts: [],
            validate: false,
            destroyed: false,
            which: "default"
          },
          extra: false,
          locations: [],
          requiredDamageSteps: [],
          optionalDamageSteps: [],
          state: "idle",
          charge: 0,
          heat: 0,
          heatRate: 0.01
        }
      ]
    },
    {
      id: "b267a418-4aaa-4b70-a1e5-9e11a9d1b9f6",
      class: "Coolant",
      type: "Coolant",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Coolant",
      displayName: "Coolant",
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      coolant: 1,
      coolantRate: 0.2,
      transfer: null
    },
    {
      id: "4fccfa2a-0c77-4240-a747-b1395d36db5e",
      class: "Engine",
      type: "Engine",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Warp",
      displayName: "Warp Engine",
      power: {
        power: 10,
        powerLevels: [10, 13, 16, 19, 22, 25, 28, 31, 34, 37]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      heat: 0,
      heatRate: 1,
      coolant: 1,
      cooling: false,
      on: false,
      speeds: [
        {
          text: "Warp 1",
          number: 1,
          velocity: 749277
        },
        {
          text: "Warp 2",
          number: 2,
          velocity: 900321
        },
        {
          text: "Warp 3",
          number: 3,
          velocity: 1443619
        },
        {
          text: "Warp 4",
          number: 4,
          velocity: 3265257
        },
        {
          text: "Warp 5",
          number: 5,
          velocity: 9381363
        },
        {
          text: "Warp 6",
          number: 6,
          velocity: 30652599
        },
        {
          text: "Warp 7",
          number: 7,
          velocity: 109919571
        },
        {
          text: "Warp 8",
          number: 8,
          velocity: 447053408
        },
        {
          text: "Warp 9",
          number: 9,
          velocity: 2429304561
        },
        {
          text: "Destructive Warp",
          number: 9.54,
          velocity: 9062165670
        }
      ],
      speed: -1,
      useAcceleration: false,
      speedFactor: 1,
      acceleration: 0
    },
    {
      id: "07c6d721-346a-4652-a4f0-3e3be3a4bba2",
      class: "Torpedo",
      type: "Torpedo",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Fore Launcher",
      displayName: "Fore Launcher",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      loaded: false,
      state: "idle",
      inventory: [
        {
          id: "5a88c6fd-6019-4b8c-b862-46c44ecd60cc",
          type: "photon",
          probe: null
        },
        {
          id: "596f6dc6-95b5-44fc-bfdf-a75c4baa3141",
          type: "photon",
          probe: null
        },
        {
          id: "506b2011-9fc8-48f3-8d21-4a80984bfdde",
          type: "photon",
          probe: null
        },
        {
          id: "52ee16da-6fcb-4329-a1c7-ffcc0f9c885f",
          type: "photon",
          probe: null
        },
        {
          id: "49bd14e2-d1ca-4094-ac17-bd922fbc4826",
          type: "photon",
          probe: null
        },
        {
          id: "97e395c1-a519-43d4-adfc-edc2dcefe624",
          type: "photon",
          probe: null
        },
        {
          id: "f98b04cc-67be-4ce0-93a4-6b3d02c68b01",
          type: "photon",
          probe: null
        },
        {
          id: "c5623404-13a3-4404-991b-215cf4cb5225",
          type: "photon",
          probe: null
        },
        {
          id: "8df592d1-0cd4-4fc3-8388-82070838419f",
          type: "quantum",
          probe: null
        },
        {
          id: "39ca8e19-8df3-4e1f-bd3d-03a9aa3911c6",
          type: "quantum",
          probe: null
        }
      ],
      stealthCompromised: false
    },
    {
      id: "1d73f91e-0b46-4a9d-83ec-c4cb06764b7d",
      class: "Torpedo",
      type: "Torpedo",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Aft Launcher",
      displayName: "Aft Launcher",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      loaded: false,
      state: "idle",
      inventory: [
        {
          id: "959a78d8-f6b8-468d-a45e-d6f2406af318",
          type: "photon",
          probe: null
        },
        {
          id: "3b52ab9b-2c29-41b6-b106-6dc288aa9a19",
          type: "photon",
          probe: null
        },
        {
          id: "bb8e1eb7-3abc-4630-adfa-db5c6297e46a",
          type: "photon",
          probe: null
        },
        {
          id: "f39d2ca2-605e-4727-9d2d-0f3483ca17f5",
          type: "photon",
          probe: null
        },
        {
          id: "78c37992-7c2a-42de-baed-4c8c066c5a16",
          type: "photon",
          probe: null
        },
        {
          id: "b22d945b-bb37-45ee-ba44-924791d7a287",
          type: "photon",
          probe: null
        },
        {
          id: "65af5504-d138-4bb8-a082-2268a278bb24",
          type: "photon",
          probe: null
        },
        {
          id: "62b06460-6045-4157-8060-bb7228a54e57",
          type: "photon",
          probe: null
        },
        {
          id: "06c78aef-4e7e-439e-b974-34884adb492a",
          type: "quantum",
          probe: null
        },
        {
          id: "4962a48e-3ede-43ab-a826-ec5849c18dfa",
          type: "quantum",
          probe: null
        }
      ],
      stealthCompromised: false
    },
    {
      id: "5aa1c842-bbd9-4361-83e9-c2181edfeadb",
      class: "ShortRangeComm",
      type: "ShortRangeComm",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Short Range Communications",
      displayName: "Short Range Comm",
      power: {
        power: 4,
        powerLevels: [3],
        defaultLevel: 0
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      frequency: 0.5,
      amplitude: 0.5,
      state: "idle",
      arrows: [],
      signals: [
        {
          id: "8b887969-b9d2-451f-bdf2-af1f89d9345c",
          image: "/Comm Images/Romulan.png",
          name: "Romulan",
          color: "#00ff00",
          range: {
            upper: 1,
            lower: 0.85
          }
        },
        {
          id: "94c425e6-c570-4cc4-ae7d-9ab03060525e",
          image: "/Comm Images/Cardassian.png",
          name: "Cardassian",
          color: "#ffaa00",
          range: {
            upper: 0.85,
            lower: 0.75
          }
        },
        {
          id: "0a014e45-1fa4-4fc6-aa40-1c7155fed7c2",
          image: "/Comm Images/General Use.png",
          name: "General Use",
          color: "#ffffff",
          range: {
            upper: 0.75,
            lower: 0.58
          }
        },
        {
          id: "c4a1a1bf-503b-41b0-bc92-f90100e1b094",
          image: "/Comm Images/Starfleet.png",
          name: "Starfleet",
          color: "#0088ff",
          range: {
            upper: 0.58,
            lower: 0.4
          }
        },
        {
          id: "387fbaa7-ee7b-4b08-bfd5-67ae0cc4b480",
          image: "/Comm Images/Klingon.png",
          name: "Klingon",
          color: "#ff0000",
          range: {
            upper: 0.4,
            lower: 0.3
          }
        },
        {
          id: "51c1a326-b81d-4817-8bd6-4019ae3a4e11",
          image: "/Comm Images/Orion.png",
          name: "Orion",
          color: "#888888",
          range: {
            upper: 0.3,
            lower: 0.22
          }
        },
        {
          id: "dc578187-418b-4846-95cd-741b5d8bce1b",
          image: "/Comm Images/Ferengi.png",
          name: "Ferengi",
          color: "#ffff00",
          range: {
            upper: 0.22,
            lower: 0
          }
        }
      ]
    },
    {
      id: "924d94cd-3d87-4972-ac24-d36bcefa88ec",
      class: "SignalJammer",
      type: "SignalJammer",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Signal Jammer",
      displayName: "Signal Jammer",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: ["90562fb4-55c2-4ff2-9769-7206125122e5"],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      active: false,
      level: 0.5,
      strength: 0.1,
      signals: []
    },
    {
      id: "bf454820-ae93-451e-a246-771ffa32a318",
      class: "ComputerCore",
      type: "ComputerCore",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Main Computer",
      displayName: "Main Computer",
      power: {
        power: 2,
        powerLevels: [2],
        defaultLevel: 0
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      users: [
        {
          id: "70578420-10c0-4f0d-ae47-92bb95e1ce91",
          name: "Captain",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "8fb3d37c-59f8-4423-810d-4610797a3cd0",
          name: "Executive Officer",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "9271cd9b-a005-47ba-8161-186a1c148d22",
          name: "Network Administrator 1",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "c25b9c59-df11-41cb-bb63-77797b22d949",
          name: "Network Administrator 2",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "88189208-270e-4937-bf5d-c3a11d3d4773",
          name: "Client Server Manager",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "7787cd52-2dac-4d63-b175-5ba537cd65a4",
          name: "On-Site Technician",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "5e65c42e-4aa4-41e5-8947-a22044d2e4e3",
          name: "Remote Access Uss Ranger",
          password: "rommel1942",
          hacker: false,
          level: 1
        },
        {
          id: "946dcb22-abf5-49f5-beab-99b2d394aeb7",
          name: "Communications",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "acf2353c-d923-4cf5-a435-0dd18ae952bb",
          name: "Decoding",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "69c4f3c8-d64b-42ac-9e2b-81f15677a668",
          name: "Chief Of Security",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "8b844607-67ba-4493-b570-bd3db0c7f1e7",
          name: "Deputy Chief Of Security",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "afa829b6-2b9d-4fc0-9d59-1833c400bd70",
          name: "Internal Security Scans",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "a9bb4989-8caa-4981-a335-be0d463a79c5",
          name: "Weapons Management",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "8563f359-8490-49e8-bc69-c1387ccda25a",
          name: "Recon Probes",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "5a816da7-9698-4cf7-962d-c0bfef969454",
          name: "Flight Control",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "4dee5c7e-9350-470f-bff8-1e958eab259c",
          name: "Navigation",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "ce600c65-c85f-4030-9684-30ac0f15f829",
          name: "Weapons Control",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "f4b150a5-f2d5-4847-952f-85e8409387dc",
          name: "Bernanard Montgomery",
          password: "rommel1942",
          hacker: false,
          level: 2
        },
        {
          id: "fdc1c71f-369f-43b4-8c39-4d79f5c66e0e",
          name: "Engineer",
          password: "rommel1942",
          hacker: false,
          level: 3
        },
        {
          id: "316c25e2-838c-45b0-b26a-9fcf47963709",
          name: "Sensors",
          password: "rommel1942",
          hacker: false,
          level: 3
        },
        {
          id: "0904a019-49ef-4bf8-a28c-031c7d377daa",
          name: "Records",
          password: "rommel1942",
          hacker: false,
          level: 3
        },
        {
          id: "667ee085-f21d-4d89-827d-6d37f456d2e2",
          name: "Docking",
          password: "rommel1942",
          hacker: false,
          level: 3
        },
        {
          id: "d9f7b78d-dd2a-4527-bf4e-fad874ff9093",
          name: "Director Of Encryption/Decryption Services",
          password: "rommel1942",
          hacker: false,
          level: 4
        },
        {
          id: "722ff85f-8a3d-408e-a3ee-4278fceae289",
          name: "Director Technology Services",
          password: "rommel1942",
          hacker: false,
          level: 4
        },
        {
          id: "b4d530e1-820d-4d6e-886e-4038c8200980",
          name: "Admiral's Personal Assistant",
          password: "rommel1942",
          hacker: false,
          level: 4
        },
        {
          id: "98edadb1-d21a-42eb-997d-a6f762ff8e6b",
          name: "Chief Programmer",
          password: "rommel1942",
          hacker: false,
          level: 4
        },
        {
          id: "6893c725-8bc9-45df-9d22-6703c744ba03",
          name: "Maintenaince Manager",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "a6c88f69-997b-44c1-9592-f7022919db15",
          name: "Weapons Management Officer",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "f8d1c0e3-3a00-4302-919c-62ae5d943c34",
          name: "Probe Monitoring",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "c29b81aa-91e2-4cd5-b41f-d980c5e9768c",
          name: "Reactor Core Engineer",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "72dd70bf-1aca-4db7-b6d1-b3eb87a08af6",
          name: "Probe Inventory Manager",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "e416754c-fd51-4533-bbe0-a6b4ac5972de",
          name: "Phaser Repair",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "fc8ccfcb-61c5-48ff-a182-681f8b8dd79b",
          name: "Pylon Access 1",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "41ed9c1f-e462-4a14-bfdb-1de6d8d1a603",
          name: "Pylon Access 2",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "7e4fae1b-8602-415a-805a-e40853e24723",
          name: "Pylon Access 3",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "ead41f7d-80a4-4fa0-9030-2f51215489b9",
          name: "System Supervisor",
          password: "rommel1942",
          hacker: false,
          level: 5
        },
        {
          id: "09c28be7-5ded-443d-a33e-b67cd7c174e6",
          name: "Security Training Holodeck Systems",
          password: "rommel1942",
          hacker: false,
          level: 6
        },
        {
          id: "97da60d0-c618-4aef-8e9c-bae9ab019098",
          name: "Security Database Systems Manager",
          password: "rommel1942",
          hacker: false,
          level: 6
        },
        {
          id: "16d40d52-9252-4e0e-b1b7-032cecb6a82f",
          name: "Pro JavaScript Writer",
          password: "rommel1942",
          hacker: false,
          level: 6
        },
        {
          id: "aeb82641-2f73-45e5-abf8-e77c2ad19ea9",
          name: "LCARS Interface Development",
          password: "rommel1942",
          hacker: false,
          level: 7
        },
        {
          id: "81bcf789-f61b-4a7e-a7e3-5df2648e4ee1",
          name: "LCARS Tester Level II",
          password: "rommel1942",
          hacker: false,
          level: 7
        },
        {
          id: "a8defc37-a902-404f-836c-9580ff52275d",
          name: "LCARS Subspace Network Integrator",
          password: "rommel1942",
          hacker: false,
          level: 7
        },
        {
          id: "5e4efe54-e64f-42f0-a85f-3be3f676780a",
          name: "LCARS Repair",
          password: "rommel1942",
          hacker: false,
          level: 7
        },
        {
          id: "10f8c644-61b7-4794-806c-2795c1edaeba",
          name: "Janitor",
          password: "rommel1942",
          hacker: false,
          level: 8
        },
        {
          id: "739e6b95-fd49-4700-a29f-f8b4e8563abf",
          name: "Sanitation Engineer",
          password: "rommel1942",
          hacker: false,
          level: 8
        },
        {
          id: "fe37f537-b765-47e5-8561-6e2eff75e823",
          name: "Replicator Development",
          password: "rommel1942",
          hacker: false,
          level: 9
        },
        {
          id: "477b3df3-1d67-4a53-bf17-a1a789b207d5",
          name: "Food Ration Storage Operator",
          password: "rommel1942",
          hacker: false,
          level: 9
        },
        {
          id: "fe0fbc9e-74f7-4a92-adb2-265047db0e7c",
          name: "Archbishop Apotheosis",
          password: "rommel1942",
          hacker: false,
          level: 10
        }
      ],
      virii: [],
      files: [
        {
          id: "b71217c3-981d-4bd9-8ef6-0e209d613524",
          name: "KERNEL1024.DLL",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "7c62fa6a-8f38-40f0-a76f-df690436f561",
          name: "FILE 852",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "a87f6e64-d670-4e52-814a-7ab1107b238c",
          name: "FILE 258",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "3f671550-6859-493a-b1b2-cda2ebae2fa1",
          name: "FILE 825",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "6619f696-faca-4cf9-9c1a-bf9656db9ea2",
          name: "FILE 023",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "370c0dd9-4475-428d-ba4a-d89b8bdf1052",
          name: "FILE 059",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "efe865fa-8cc0-40d1-a6d8-2ecf95c0aef5",
          name: "FILE 090",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "4371b2c9-1224-4a45-a7f5-d0a2503400a5",
          name: "FILE 089",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "cc5233d7-717e-4d7b-9b36-22d6e1354110",
          name: "FILE 078",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "ee880aff-f5d6-4cc1-b3f1-b1259ada3924",
          name: "FILE 782",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "e1e486fe-752d-45ef-8a85-02dc8eccbce2",
          name: "FILE 593",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "10e0e2d9-1a8d-460e-bd68-428160f0fbc2",
          name: "FILE 6O3",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "968df421-0951-44b4-8090-f3f43302791b",
          name: "FILE 604",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "cd85b518-e4e6-47ec-b9da-8f7cf71617db",
          name: "FILE 934",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "86b05c90-baa7-4fbd-9cde-c36cda03bb94",
          name: "FILE 394",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "fef1b5ab-373c-43a4-9585-d74b0536bc28",
          name: "FILE 399",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "a9b43341-51ae-4dc7-940c-102b2c50f1fb",
          name: "FILE 104",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "143f46fd-bf73-4a56-906f-7f48d318bde4",
          name: "FILE 096",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "9ae3f034-2a51-42d9-98b9-e24a4986d938",
          name: "FILE 759",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "b38f38d6-f171-423d-a1d5-dc47dcf586de",
          name: "FILE 209",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "3ceb009b-1a05-4078-82e7-335e6c5f6efe",
          name: "FILE 495",
          level: 1,
          corrupted: false,
          restoring: false
        },
        {
          id: "7768b3e3-9e7f-4f9b-91c0-587c1ab639d3",
          name: "FILE 266",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "4f8834c3-57b2-4ca5-85bd-933f9715bc3e",
          name: "FILE 032",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "30f396cb-487f-4d92-88c9-2f834d491e08",
          name: "FILE 210",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "e3822f80-d44e-4568-8481-3bd82aa55dc2",
          name: "FILE 059",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "f106d018-d5a1-4385-8abe-f192094b1be1",
          name: "FILE 088",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "75857922-dc97-41ac-b950-f569f471dc84",
          name: "FILE 307",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "7ed7c75e-e56e-4f79-9b77-0faa1782e146",
          name: "FILE 405",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "bbc2a137-4e94-46dc-8c06-a6abd1f1d2f6",
          name: "FILE 406",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "5ed85404-7ca7-4b9d-adf1-5a9f94986e3a",
          name: "FILE 584",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "3fbd0254-c40b-45c8-91ef-808344356692",
          name: "FILE 248",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "ad76ea2a-d148-4c8d-ae34-4d7aadcb975e",
          name: "FILE 365",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "cfbc7297-4c75-40ed-acf3-79f8a073dfd5",
          name: "FILE 358",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "7c9f790f-180d-483c-a463-79b62fa20912",
          name: "FILE 983",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "3e88ceb5-635a-4d61-838b-222fae30513a",
          name: "FILE 349",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "1d2cf3b5-399d-4c17-aba8-d2caf7699797",
          name: "FILE 998",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "c58e7705-fc06-441a-b098-9d498f72cad5",
          name: "FILE 876",
          level: 2,
          corrupted: false,
          restoring: false
        },
        {
          id: "08cfb561-9c29-4e78-bb9d-2541d21c202c",
          name: "VONRUNDSTED.DLL",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "a1615c73-5147-4efe-bd90-5d9460bc17a4",
          name: "FILE 988",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "ccf1c967-459f-4647-8e49-9de2e70eedd4",
          name: "FILE 989",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "f570e684-1b7b-4339-bf03-e0a6f0a96b82",
          name: "FILE 758",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "de399043-90c3-4b9b-9f67-83dd106a213d",
          name: "FILE 458",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "6f703a76-bade-4420-a8fb-05901d9e2aa6",
          name: "FILE 778",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "8f0908f9-4eb9-4c13-bf95-e504d3545ce3",
          name: "FILE 779",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "5a6c32ab-4f40-4cf4-9ce4-2d274c5b3e4d",
          name: "FILE 789",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "da4b3183-d2d5-4419-9ef4-01f94cc0fbd4",
          name: "FILE 987",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "4d029ea8-f309-4a27-9342-5914f153d817",
          name: "FILE 775",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "2e2620a7-4e79-40a1-9d2c-4434b66a0c5e",
          name: "FILE 556",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "6a7c8f39-0307-4e14-a499-a30358cb8678",
          name: "FILE 459",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "a527f710-3d08-4745-8212-e54514371d2c",
          name: "FILE 845",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "894b749b-ec70-4ead-9808-3a614ac61f8a",
          name: "FILE 111",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "c3ae690e-5f52-4a8f-87cd-6d63cd170fb6",
          name: "FILE 112",
          level: 3,
          corrupted: false,
          restoring: false
        },
        {
          id: "c2206aaf-761c-4494-8e29-4c727ec16a3f",
          name: "FILE 885",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "d71a324d-278d-426d-b1d8-c58b1a4d9e46",
          name: "FILE 889",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "a5e0ee80-cfb7-479c-affe-ac8f0cf32d8f",
          name: "FILE 886",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "5a898fc2-67f3-4e12-a7f9-a7b26d86a689",
          name: "FILE 754",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "454bf68f-5279-4e98-8cca-47db17011c77",
          name: "FILE 888",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "94c083b8-7272-4913-bc71-adc5ac9c4231",
          name: "FILE 321",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "eda91e7f-7104-4b74-9c12-2186d3a81739",
          name: "FILE 625",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "9b3db2a5-15a4-4b2e-8502-dcfc1e1b0127",
          name: "FILE 856",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "f31f957d-59d6-477b-b0ff-b0b49820b3a6",
          name: "FILE 433",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "f318affb-6ebd-413c-9fe5-9fb99e88a7f8",
          name: "FILE 135",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "02f5fafb-cf34-458c-a74b-66f697130533",
          name: "FILE 529",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "ae783fe5-d67e-44c4-b943-39dbbf1469e3",
          name: "FILE 666",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "50a9893d-6d6f-4b37-84ab-ebb18070aca0",
          name: "FILE 665",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "b05de20a-a1f5-4454-8c72-6415d47bb457",
          name: "FILE 664",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "b8a94e7e-810f-4680-8b49-459a1778bab8",
          name: "FILE 667",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "0bcdcd7a-2fc6-4aa5-b50b-c96dd61e42ed",
          name: "FILE 669",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "16a73cf3-8467-4c90-858f-bcceae32a2a9",
          name: "FILE 662",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "56b8ff35-d00d-49d9-9d7d-a70884f41bce",
          name: "FILE 663",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "dfb9ee74-803a-4c28-a8a5-e06dff407b31",
          name: "FILE 900",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "b398fd2b-6b41-45c7-bd2e-f24fbedab9d8",
          name: "FILE 909",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "2d47384d-e7b6-46b4-b787-351a2cce66f7",
          name: "ROMMEL.DLL",
          level: 4,
          corrupted: false,
          restoring: false
        },
        {
          id: "9c1ebae4-7b10-4f6e-864f-f85b911ef730",
          name: "FILE 9987",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "66e886b4-a43c-4706-99e4-540b0b179060",
          name: "FILE 2265",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "496130c9-e2f9-48cb-85b4-fe053149ae48",
          name: "FILE 4486",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "75290bab-33cb-40d1-96f5-7fc10d0d88ba",
          name: "FILE 9567",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "38f3e802-a1a5-4b1b-987b-636e1a8a2455",
          name: "FILE 9877",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "54740965-30ee-43aa-91ab-a3cc9daff29f",
          name: "FILE 9845",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "8255dbe1-b64e-4a0b-b732-d2fbbf464f92",
          name: "FILE 9543",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "9b7e1eeb-7472-4722-bdcc-d0104716160c",
          name: "FILE 9852",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "e278984d-dec0-4836-9fe1-7f8b1cfd5a92",
          name: "FILE 2315",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "1225c360-1ab7-49f4-bfd6-d20392b02bfe",
          name: "FILE 6548",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "c2df2c35-11a5-453d-b31c-44edb4fe4f7b",
          name: "FILE 3337",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "d6f02e75-c345-477a-8f78-0175b2240d4a",
          name: "FILE 7154",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "8017a2e6-4da5-440c-9813-7c1fd7058185",
          name: "FILE 4124",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "73a1251f-9b97-4a58-b97b-edc9caa2bf8f",
          name: "FILE 9654",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "a680112b-4512-449e-99c5-4084e7696201",
          name: "FILE 0156",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "861bd2d1-3f35-461b-abb8-58aa4760b5fe",
          name: "FILE 9654",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "7ff8112c-951e-46ee-a836-40b0c8c15282",
          name: "FILE 7410",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "ddbfd645-c52a-4770-afa3-0942045b3aa9",
          name: "FILE 1234",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "a4c8dfd9-3b8d-475f-8dab-e8ea782c9a89",
          name: "FILE 8463",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "b1a4123e-b165-4536-a8a5-861fc89b0d70",
          name: "FILE 4444",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "fb7677bd-dd9f-4596-b3f0-042261a8b4ca",
          name: "FILE 5555",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "0bf27678-4524-47ca-b73e-3496ab428fdf",
          name: "FILE 6583",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "877d8b57-96d1-4e7e-8aed-2bea09ac1f4d",
          name: "FILE 7516",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "0c12a90f-a70e-4e8d-9765-514d584258c0",
          name: "FILE 6843",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "5c10160f-083a-44d2-aa5c-d80f923f41f5",
          name: "FILE 9138",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "b17f8558-04d2-42c5-83a0-9d58efff8576",
          name: "FILE 7654",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "05207ec6-5775-4294-9423-7e8c4ebe1404",
          name: "FILE 3654",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "7cf8fba1-5828-4a96-a227-8152095ea800",
          name: "FILE 6550",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "e125a87f-4d3e-453d-bfc7-f7f04119c9e2",
          name: "FILE 7645",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "0b6f129e-6ac7-4e01-842e-170de9da836f",
          name: "RANMA.MP12",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "8dfeb737-5314-47db-8bb4-8e89bb498fa4",
          name: "TENCHI.MP12",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "088c76c3-939a-4a65-a1ba-2d72a04b292f",
          name: "AMG.MP12",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "4c0b5b82-0570-47d6-be3c-f9652889a2aa",
          name: "BNL.MP12",
          level: 5,
          corrupted: false,
          restoring: false
        },
        {
          id: "e826542d-9a70-4244-a57e-a1d1a5df8983",
          name: "FILE 8551",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "b1129fe7-9aa8-4df7-8f03-f1bc8fb41507",
          name: "FILE 7783",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "abeea865-d094-4b98-b54e-f5afb8d926b1",
          name: "FILE 8566",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "e38146d5-d106-443c-883c-7bb7617c376b",
          name: "FILE 1111",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "7faa0702-b301-44d3-9529-26afb3bb033c",
          name: "FILE 1121",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "30e6aeb3-5f13-4a94-9f30-d1dfa1b1381f",
          name: "FILE 8885",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "4f469bf2-a069-4367-b259-1d565d5c287e",
          name: "FILE 9956",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "5bcf1d17-db68-4d59-9041-61052de58c85",
          name: "FILE 6644",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "60921b12-6e04-4fd2-b5fd-06847e899465",
          name: "FILE 7777",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "ddea433e-b61a-4f6c-abcc-ae08691cb30d",
          name: "FILE 8888",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "528fda5f-47b8-4d3c-928d-c18952e10ed3",
          name: "FILE 1115",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "6156804a-5999-4299-b82e-f202fc146a37",
          name: "FILE 2222",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "b714f182-b812-467a-a5f7-601c48ff32a1",
          name: "FILE 3333",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "6b6034d1-b3df-40f6-b50b-e56672746dde",
          name: "FILE 6846",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "b6d28817-19f0-47e8-8bbc-3f8e373191a9",
          name: "FILE 8365",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "584d1e30-9c0f-446b-9a3c-1805c5aa0955",
          name: "FILE 2121",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "a0e3d442-7385-4d1e-a6c3-2817049145f6",
          name: "FILE 5435",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "d54ed8c6-d80d-46ff-b7ce-fce1e4eb5af5",
          name: "FILE 8753",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "22475ec9-29d5-484a-94f9-cf67451182b3",
          name: "FILE 0025",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "92f49913-aa70-49f5-beb0-0b267773a07c",
          name: "FILE 0260",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "0160dbbb-a0b5-4d51-9cf4-a763c288399b",
          name: "FILE 0985",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "bbd67f36-db9b-4995-87cd-0a1bd0e2f80b",
          name: "FILE 0987",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "0fdd5c5a-5178-4549-8cc3-aaf794047db0",
          name: "FILE 7654",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "8858681f-8138-4d0d-8fd1-bbd20edd2207",
          name: "FILE 3215",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "7bbbb039-7898-4f7b-941c-82abb0ec1055",
          name: "FILE 7765",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "3af6b4ab-1049-4879-97d3-b7a3abbd8afd",
          name: "FILE 9656",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "c0b82ab9-c2b4-4851-8409-1cc8bf23c234",
          name: "FILE 9998",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "57ab1f7d-55ed-48d2-aaec-993ab66ae4ff",
          name: "FILE 1123",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "f1f96511-7e9f-4ad6-b5da-0d18d778eff5",
          name: "FILE 3326",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "d60f783b-55c0-4081-b53a-693134b046cb",
          name: "FILE 7785",
          level: 6,
          corrupted: false,
          restoring: false
        },
        {
          id: "0d41492f-c364-41bb-9802-9c810ed104a8",
          name: "FILE 6843",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "a2a0c768-0a78-4cc1-a917-c92f00152aec",
          name: "FILE 7789",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "96c3415e-572a-4a78-a485-77fe9b0d6622",
          name: "FILE 7798",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "2f4f25fc-e3a5-4160-97e5-b6fee68a3743",
          name: "FILE 6565",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "1979714b-fe82-4254-8392-05585b951728",
          name: "FILE 6556",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "35147ca4-584f-4a83-a22a-775b7d6e0cd0",
          name: "FILE 5665",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "0e13d467-f43e-4e4e-beb2-49b453499d62",
          name: "FILE 4562",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "073e6cd0-21b4-4859-94c4-3a9ffaeb497e",
          name: "FILE 3256",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "0f3993f2-4fe8-4233-a4fa-c5fd763d9154",
          name: "FILE 0087",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "edac065b-6394-4f7d-abfc-4350889303ac",
          name: "FILE 7894",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "d2047772-f9aa-4dde-af0f-0fd818ea5b32",
          name: "FILE 6431",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "2d2d1ec0-490e-42af-8b06-baf33a94c381",
          name: "FILE 9731",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "def37469-16c1-4aa0-9850-534f8c48d4e2",
          name: "FILE 9764",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "53b535ca-ace3-405a-9ea7-23eac5f3527c",
          name: "FILE 3197",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "52dcc00a-1102-41dd-b301-7e31170f1b0c",
          name: "FILE 3164",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "7400628c-f9cf-4996-8231-dea56de75b37",
          name: "FILE 7413",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "cc10ebbd-57e7-45b9-953f-e4be315be808",
          name: "BITMAP1.BMP",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "8fb08447-ac73-4d3c-9b6c-1dc22f48deea",
          name: "BITMAP2.BMP",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "26e4a863-bbd8-49d9-bb91-d07e0129672a",
          name: "BITMAP3.BMP",
          level: 7,
          corrupted: false,
          restoring: false
        },
        {
          id: "40c1b969-48fb-45c5-83d5-83ee1c8506d9",
          name: "FILE 6549",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "be145ee4-5d78-4812-a535-4212950bf18c",
          name: "FILE 7535",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "58559d7f-1d5c-4f1c-8eeb-e4b208ae77de",
          name: "FILE 3575",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "b68096a2-ed3b-4cb7-8a87-ea75c1915e74",
          name: "FILE 2222",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "f2ae2c13-82cf-4b85-9514-3220c2f7e0ab",
          name: "FILE 8888",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "5fe5d866-7d08-4d44-bd33-d1ccb7f367e8",
          name: "FILE 7797",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "1133c90f-ffa2-4342-9d8e-01bca7574462",
          name: "FILE 6665",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "ff351655-ea2b-4f84-9ef6-8aaf73d61e41",
          name: "FILE 4454",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "8ab5437e-e6fa-43a6-a232-493b2153f8b7",
          name: "FILE 3321",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "68b98b42-fdf5-47a0-aa64-74304f06d530",
          name: "FILE 4464",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "91100e80-57bb-4902-a521-eeb9f29b04d1",
          name: "FILE 6568",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "8f6c86b4-a96d-4034-aee4-64ca2ea7c573",
          name: "FILE 3333",
          level: 8,
          corrupted: false,
          restoring: false
        },
        {
          id: "008a8c67-61e9-4992-b664-c1d42d1457a8",
          name: "FILE 9687",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "7c23d39c-6e96-405a-97d8-2a55fa43d2d2",
          name: "FILE 9874",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "6c241487-7312-4dfe-9e3a-1531de36b56a",
          name: "FILE 8148",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "6edd8260-9688-4e7c-ac9e-bf83d2405511",
          name: "FILE 6572",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "e51b5921-833d-4193-a30d-c62d1a50f1d5",
          name: "FILE 2298",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "99624ad6-8e9d-4784-9bb9-e21b9dee0e57",
          name: "FILE 3.74",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "aa2ac7f5-7762-479c-b1b7-a2714a95bdb8",
          name: "FILE 6184",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "cfac2aa4-2a68-4acd-9063-57d06bb9bda2",
          name: "FILE 9110",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "e4364a3a-1874-41fb-82c9-b10b8cb55867",
          name: "FILE 0911",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "b123dc8c-0913-44c2-bc5f-b44c22753d9a",
          name: "FILE 4564",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "1f510bbf-48dc-4971-8177-141380d7110a",
          name: "FILE 6516",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "6044d906-aa3c-4893-b06e-43c2cdc95869",
          name: "FILE 3287",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "1d101c3d-2f58-48da-9b05-b709acd180b5",
          name: "FILE 1955",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "0b027e34-89e9-4b29-926e-5a82be768707",
          name: "FILE 3545",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "9f6b93f1-4887-4612-b60c-00b7471fb1c5",
          name: "FILE 5166",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "00b0da0a-22ac-4049-9d02-1e33c769eda3",
          name: "HITOKIRI.JPN",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "9443e888-6e72-4f6c-b1e8-382f43a2feaa",
          name: "BATOUSIA.CMD",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "62e6af0d-6834-42b5-8af6-da395d2f6059",
          name: "APPLE.MAC",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "a0478268-331c-485b-84f0-624d83a68a04",
          name: "PROGRAM.NOT",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "56b5ccf1-ade6-45aa-81f8-26d0a9b5fb62",
          name: "EMRIX.APP",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "d0de8d06-7a17-4959-b4a3-d6f99372e3a4",
          name: "FLINT.CACHE",
          level: 9,
          corrupted: false,
          restoring: false
        },
        {
          id: "2fda1961-1a22-4c2e-802a-fa0c227424c5",
          name: "FILE 6544",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "5ad6e782-c849-4727-8409-bc0f4d5112cb",
          name: "FILE 6542",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "2c88e780-596a-4832-9341-b78aab52e341",
          name: "FILE 0935",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "e2f7b6f0-2961-4e25-856c-3ac1c50217c2",
          name: "FILE 0266",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "0233191d-8ba2-4088-8a31-77249ef686c6",
          name: "FILE 0956",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "5530a2ab-1d1c-496c-8190-00d5bec043bd",
          name: "FILE 0952",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "95d43ca8-a58d-4a06-a59b-831f13446b85",
          name: "FILE 0741",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "41163d05-570f-4e8a-b9a9-8b7b6e716451",
          name: "FILE 0963",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "449d0d11-ada4-46e3-8c1a-e52223b14ab4",
          name: "FILE 0934",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "159e914f-1022-4f2a-8749-b2b0620b76e9",
          name: "FILE 0005",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "07354861-0f28-4c0b-b7f6-ebc6dcd6b4c8",
          name: "FILE 0002",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "741d2b0c-341b-429a-84b2-95afd7e9e2bf",
          name: "FILE 1000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "b13968d0-8443-4a11-8de4-cfc76488ccbd",
          name: "FILE 2000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "e96271aa-2e07-4599-afff-33761dfb6b0b",
          name: "FILE 3000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "57ed14b5-9bf8-4e55-bb80-37f960cdf6c1",
          name: "FILE 4000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "49ecb0d6-9a12-417a-bde6-99db097230c1",
          name: "FILE 5000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "3fa2b982-decc-4013-b54c-bd4e18f6b0cc",
          name: "FILE 6000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "a97ef912-ea69-4890-9f76-5df1250d9fca",
          name: "FILE 7000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "611995be-ed75-4e83-bb40-3eb623a33a81",
          name: "FILE 8000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "f5e099ee-1b38-4644-88eb-7dba46d010c0",
          name: "FILE 9000",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "69dc6005-89d2-4460-8eae-56a3a7885e70",
          name: "FILE 4509",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "47c210a4-7c4b-401e-8ef4-cc5a35087102",
          name: "FILE 3290",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "eb73dea5-859b-464b-aa4a-12fae7e98c88",
          name: "FILE 2039",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "5a734389-07d0-4418-ae14-19f68921a1cd",
          name: "FILE 3450",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "7ed50ae6-afc7-4a8c-aa88-754efef46fd4",
          name: "FILE 9034",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "aa9793e2-94c4-46ee-ad0c-45f278f2040f",
          name: "FILE 7980",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "107ff39a-8d2e-46a3-a5fd-14e96640d60c",
          name: "FILE 3409",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "ae3fcf0f-ac8f-4912-8dc8-bb7cd9d5bce9",
          name: "FILE 3025",
          level: 10,
          corrupted: false,
          restoring: false
        },
        {
          id: "4ae61588-4bc4-4149-8442-38c0fb4fda3b",
          name: "FILE 2340",
          level: 10,
          corrupted: false,
          restoring: false
        }
      ],
      terminals: [
        {
          id: "e5b40fcf-9782-44e9-8175-a1050fb3cd5d",
          name: "Terminal b6al7",
          status: "F"
        },
        {
          id: "0cd23a29-3e81-4fe2-bb20-354ff5bc2237",
          name: "Terminal 7rroz",
          status: "F"
        },
        {
          id: "b47fc59f-4eaa-4d62-b495-dfecb182b860",
          name: "Terminal vw0v9",
          status: "F"
        },
        {
          id: "12e1677d-901d-40cb-8010-d333f231c30c",
          name: "Terminal lgz86",
          status: "F"
        },
        {
          id: "6027c114-a12d-4f75-b60b-3cd014e8eb6a",
          name: "Terminal 3ch6l",
          status: "F"
        },
        {
          id: "086cadbd-410b-475d-890d-d32193b5211c",
          name: "Terminal wnjkj",
          status: "F"
        },
        {
          id: "5e68ed37-071d-4d2c-bbea-f5c61cfe653e",
          name: "Terminal ihlkx",
          status: "F"
        },
        {
          id: "dd4131ed-02ba-4005-b18a-ac99dcf9ba11",
          name: "Terminal 0v9dr",
          status: "F"
        },
        {
          id: "0fbce848-bbf8-49cd-9753-06383ffc51cb",
          name: "Terminal pj6or",
          status: "F"
        },
        {
          id: "012178a6-c085-42b0-80a6-95a200cbac80",
          name: "Terminal bviuq",
          status: "F"
        },
        {
          id: "2cb42720-7a2e-4964-81b9-e8e8a69e9e7e",
          name: "Terminal lah97",
          status: "F"
        },
        {
          id: "769dbde1-9533-419d-a7cc-fdd978eccf98",
          name: "Terminal mfspr",
          status: "F"
        },
        {
          id: "9612b95f-736d-4257-b88c-65f1b3a5adc0",
          name: "Terminal lp6ju",
          status: "F"
        },
        {
          id: "28333799-0b03-47a0-bdb8-ddfa8a845040",
          name: "Terminal 01q8m",
          status: "F"
        },
        {
          id: "1579373e-2cfd-4302-87f1-d73eaba03c05",
          name: "Terminal tgh3y",
          status: "F"
        },
        {
          id: "dd9323d8-4475-4b38-9828-7c3561e11a38",
          name: "Terminal jid8b",
          status: "F"
        },
        {
          id: "4dd1622f-2ecf-4cbd-9e61-1df6ae3bba15",
          name: "Terminal oqusp",
          status: "F"
        },
        {
          id: "6339b0d2-1344-49ce-a813-856678d0220a",
          name: "Terminal bi8iq",
          status: "F"
        },
        {
          id: "68f46ddf-3143-4b53-95f4-1feec2b3b145",
          name: "Terminal qgkeg",
          status: "F"
        },
        {
          id: "a9b2a138-146c-4a93-ae85-61d86456444b",
          name: "Terminal v2jif",
          status: "F"
        },
        {
          id: "a695305d-47db-4045-bce0-e147a55e3c6d",
          name: "Terminal awbon",
          status: "F"
        },
        {
          id: "21a56098-c9fd-4dcb-bf53-c4b6435bdcfd",
          name: "Terminal byt67",
          status: "F"
        },
        {
          id: "492ce4f0-52dc-473f-8d16-27a0139a1295",
          name: "Terminal cpe4o",
          status: "F"
        },
        {
          id: "78e8def4-dacd-4831-91b5-6f118f4edc65",
          name: "Terminal gxvxp",
          status: "F"
        },
        {
          id: "41a44c7f-79ff-4067-9e7d-9beeb66c0eb7",
          name: "Terminal o2ngq",
          status: "F"
        },
        {
          id: "976e8447-0878-4420-8b78-8bf0a9fe01c4",
          name: "Terminal q0ekj",
          status: "F"
        },
        {
          id: "66f5f0f2-9eef-4074-9ad4-52c717ca0bad",
          name: "Terminal tixkk",
          status: "F"
        },
        {
          id: "c98e5092-ab92-4fd2-b598-a9b8deee487d",
          name: "Terminal ilxn8",
          status: "F"
        },
        {
          id: "995cf2ef-328d-491b-91a4-5739a8792b71",
          name: "Terminal z2jjm",
          status: "F"
        },
        {
          id: "33292726-95a4-4007-b2e7-aa39698f9940",
          name: "Terminal xzm35",
          status: "F"
        },
        {
          id: "54e2178e-fe68-4efd-8f57-8ad30efe9718",
          name: "Terminal 4iro5",
          status: "F"
        },
        {
          id: "df1dabe7-1e16-4592-8876-e503a05f65e0",
          name: "Terminal 9ll9l",
          status: "F"
        },
        {
          id: "969ea13e-937f-4525-9f65-7efe9088d183",
          name: "Terminal d9q6p",
          status: "F"
        },
        {
          id: "bff95df6-4aa3-4f17-8a12-7c5ca416a3b4",
          name: "Terminal v0jca",
          status: "F"
        },
        {
          id: "61f415f0-1ca4-47de-87cb-df3c87d99175",
          name: "Terminal ujmbg",
          status: "F"
        },
        {
          id: "a919e28b-ab27-4d6a-af13-ca3cada460fa",
          name: "Terminal ycyun",
          status: "F"
        },
        {
          id: "266dbe0c-4336-4f13-bff8-bb8f14c0af91",
          name: "Terminal dxggt",
          status: "F"
        },
        {
          id: "4b2246aa-3a0d-4980-81ae-c7a247dd26ee",
          name: "Terminal ubwxq",
          status: "F"
        },
        {
          id: "c08836a5-2e63-423b-b848-d6744e6a405a",
          name: "Terminal therq",
          status: "F"
        },
        {
          id: "7485a991-8873-40e3-9e38-60beb1220cd4",
          name: "Terminal vpv5d",
          status: "F"
        },
        {
          id: "4b4e6661-c6c8-4ff5-b058-f062a518f548",
          name: "Terminal so03e",
          status: "F"
        },
        {
          id: "3c47f174-2083-4e1d-b184-c92581de1a80",
          name: "Terminal yt9i0",
          status: "F"
        },
        {
          id: "a2602d84-f6a2-496c-bbb7-e279fba89aaf",
          name: "Terminal po80o",
          status: "F"
        },
        {
          id: "6fc51a35-258c-4b7b-a64e-5ee2cb45692d",
          name: "Terminal v8rpd",
          status: "F"
        },
        {
          id: "6d195ae5-a3ec-48c4-9aeb-5a0735537b87",
          name: "Terminal 6dbry",
          status: "F"
        },
        {
          id: "0062d330-387d-4af8-bb17-35758a34208f",
          name: "Terminal tqyvl",
          status: "F"
        },
        {
          id: "cf94dfd6-581d-4063-a62c-6433cc4ed437",
          name: "Terminal ovhz0",
          status: "F"
        },
        {
          id: "bc10ac22-3d94-44a1-aa78-b34d79f080c2",
          name: "Terminal fioja",
          status: "F"
        },
        {
          id: "eb43fbc0-855f-4055-9926-e0ec2e606834",
          name: "Terminal tc6kw",
          status: "F"
        },
        {
          id: "b854a0ad-2075-45be-ae32-f37ccd5f545f",
          name: "Terminal jni7d",
          status: "F"
        },
        {
          id: "aba03923-a561-42e8-bce5-5f7484ecba80",
          name: "Terminal s93z3",
          status: "F"
        },
        {
          id: "b2eadb17-befa-4cbe-be1f-03157b1cadf0",
          name: "Terminal y45z0",
          status: "F"
        },
        {
          id: "ad512556-db92-432a-b3b2-a20048abd6fa",
          name: "Terminal ash8x",
          status: "F"
        },
        {
          id: "6076a7e4-4679-47fb-be0d-0a1ac454ba11",
          name: "Terminal p5owm",
          status: "F"
        },
        {
          id: "ecffd524-87b7-454f-8e54-4c67561c7c33",
          name: "Terminal o6e3g",
          status: "F"
        },
        {
          id: "5efc6471-29d3-403d-bc88-27e2b3f969cd",
          name: "Terminal 1d6my",
          status: "F"
        },
        {
          id: "992813f4-140f-46fe-85a4-98ed1b364f1a",
          name: "Terminal 1dkw8",
          status: "F"
        },
        {
          id: "7189f042-0135-4ff6-8d1c-0fe5697ce2c7",
          name: "Terminal lgm06",
          status: "F"
        },
        {
          id: "68f2ddb4-c2fc-42df-826d-7bce13598994",
          name: "Terminal ipwaf",
          status: "F"
        },
        {
          id: "ff3bc7c8-2c3a-4272-8e88-b9941b298f08",
          name: "Terminal k7fde",
          status: "F"
        },
        {
          id: "e5e51345-c7d9-4f8f-b078-27b5debfd245",
          name: "Terminal i8lk9",
          status: "F"
        },
        {
          id: "d3566bde-4b92-4640-b290-2d7eb3808885",
          name: "Terminal uq9gq",
          status: "F"
        },
        {
          id: "9bfaa9f1-2ea4-4dfd-8b0a-62cdedf1cd4a",
          name: "Terminal azjl9",
          status: "F"
        },
        {
          id: "dce83260-5b86-4151-80ff-1c00d909237d",
          name: "Terminal gl60e",
          status: "F"
        },
        {
          id: "4640b901-163d-41de-befa-691d53490651",
          name: "Terminal y2mmy",
          status: "F"
        },
        {
          id: "37a82d6e-dcbc-42fa-b473-86cec43188f2",
          name: "Terminal ladcg",
          status: "F"
        },
        {
          id: "8bcdae35-caa0-4817-9c0b-dd69da4475ba",
          name: "Terminal e29wo",
          status: "F"
        },
        {
          id: "489ee779-d4b4-435f-95d6-7a595a185ed3",
          name: "Terminal yhj3s",
          status: "F"
        },
        {
          id: "6585e815-e575-46e4-899b-de4d593a6c47",
          name: "Terminal tftck",
          status: "F"
        },
        {
          id: "2fc4251a-e93f-4dca-9379-b7c3ac82c26a",
          name: "Terminal ctvqm",
          status: "F"
        },
        {
          id: "19c06634-3b9f-4d0e-b92a-b5f28bb56151",
          name: "Terminal bxktn",
          status: "F"
        },
        {
          id: "3331424c-f4e1-45f7-8d4d-1d23ac2e75ec",
          name: "Terminal z9ma2",
          status: "F"
        },
        {
          id: "be7ca70f-71da-4973-af49-473a337de843",
          name: "Terminal zb8lb",
          status: "F"
        },
        {
          id: "375cc0e3-8b67-416d-9744-841cfd36593f",
          name: "Terminal wmeu8",
          status: "F"
        },
        {
          id: "6b97e19e-2874-475e-ab62-48feb76066c0",
          name: "Terminal yc38l",
          status: "F"
        },
        {
          id: "0da2b849-fd78-4935-bea4-082486fa2967",
          name: "Terminal u0jdx",
          status: "F"
        },
        {
          id: "41b85c0a-8a8e-4cfb-9574-4f7af2cc692b",
          name: "Terminal 90au1",
          status: "F"
        },
        {
          id: "a773deba-7695-4b0f-a2f5-7b10db645141",
          name: "Terminal vufi6",
          status: "F"
        },
        {
          id: "ea01d0e1-4e6c-4efa-87ad-f3370e2ae583",
          name: "Terminal v84bm",
          status: "F"
        },
        {
          id: "292686b2-10c8-4df0-82b3-923608805f9d",
          name: "Terminal mxqjb",
          status: "F"
        },
        {
          id: "c6f4e37b-7a3f-443b-be5d-8b299d9e3f7e",
          name: "Terminal xptcc",
          status: "F"
        },
        {
          id: "7e80d80e-e471-4da8-9d08-1b795e281ddb",
          name: "Terminal wk92r",
          status: "F"
        },
        {
          id: "f30ff7ed-9a8e-4f18-992d-104489ae0c9a",
          name: "Terminal zoyoo",
          status: "F"
        },
        {
          id: "c8f919e6-4096-4e96-8e92-1143639615a4",
          name: "Terminal r9uq8",
          status: "F"
        },
        {
          id: "ee021f1a-1370-4a7c-9977-6e15e1ee508a",
          name: "Terminal wt0lw",
          status: "F"
        },
        {
          id: "df5240f7-c216-4059-af0a-9d667e451bdd",
          name: "Terminal r48rg",
          status: "F"
        },
        {
          id: "f64bc7e1-eae3-49a8-a548-df704136bd20",
          name: "Terminal c43b9",
          status: "F"
        },
        {
          id: "4af50482-7263-429d-96ee-7796da3a5820",
          name: "Terminal ktizy",
          status: "F"
        },
        {
          id: "9eba5f55-69ff-4f58-b7c7-5d5806280c1e",
          name: "Terminal jwofi",
          status: "F"
        },
        {
          id: "d07f186e-9d3d-470b-a254-d1918f5989a4",
          name: "Terminal 7621m",
          status: "F"
        },
        {
          id: "c21bab20-0654-4f71-ba66-448be5713f42",
          name: "Terminal vbdy6",
          status: "F"
        },
        {
          id: "27c9ecd4-7e84-4c7c-88a5-58c41cfa5984",
          name: "Terminal 4m0vv",
          status: "F"
        },
        {
          id: "0a34ac79-2b10-4b93-81e7-dc17b7667d04",
          name: "Terminal 368r0",
          status: "F"
        },
        {
          id: "149589ac-ecaf-413f-8f5f-e152f2032331",
          name: "Terminal h6x52",
          status: "F"
        },
        {
          id: "ab6fc804-a914-4052-87e5-d35236a27048",
          name: "Terminal uxjzj",
          status: "F"
        },
        {
          id: "92d70d19-d36f-43b2-8f49-9230a2c54754",
          name: "Terminal 2k53b",
          status: "F"
        },
        {
          id: "ec26e899-3959-4374-9c27-38ae5f0386d5",
          name: "Terminal zp3ci",
          status: "F"
        },
        {
          id: "3cac0e72-0eac-46c2-a2de-414f54eb9c73",
          name: "Terminal lcvet",
          status: "F"
        },
        {
          id: "e70e9e41-99ae-4e61-97c7-072827c2ee28",
          name: "Terminal kw3gx",
          status: "F"
        },
        {
          id: "0937a6d8-762f-4064-a0d1-6950f369e29f",
          name: "Terminal glpbs",
          status: "F"
        },
        {
          id: "57399b48-5e9d-4b40-b8e1-3b5b73b8c113",
          name: "Terminal ubou3",
          status: "F"
        },
        {
          id: "853631d8-4550-42aa-a54e-273f63759761",
          name: "Terminal wm0ta",
          status: "F"
        },
        {
          id: "8a9b3d12-68e9-4252-b142-811ca70b48cd",
          name: "Terminal mg636",
          status: "F"
        },
        {
          id: "d4b482cd-e5fd-4330-9379-7caa4e3d69a3",
          name: "Terminal p0rsm",
          status: "F"
        },
        {
          id: "abfcf24d-25de-4258-8a23-f354b8451509",
          name: "Terminal zyh2e",
          status: "F"
        },
        {
          id: "a0f37803-73f9-415c-b8f5-ce993326963d",
          name: "Terminal wyz11",
          status: "F"
        },
        {
          id: "a26594d6-7ec5-4197-b1a3-f5e9fea2ad5b",
          name: "Terminal vgyp9",
          status: "F"
        },
        {
          id: "9966e30e-ee38-4822-8b72-3abc553581d2",
          name: "Terminal 081r1",
          status: "F"
        },
        {
          id: "abf73e10-3291-42d4-ab1a-f07538f6d62b",
          name: "Terminal eqqv7",
          status: "F"
        },
        {
          id: "42bcf076-c3da-4251-b0ee-9681d3c6478e",
          name: "Terminal aznwz",
          status: "F"
        },
        {
          id: "8bcb2bac-13a4-4fda-b103-e4e31ade69f1",
          name: "Terminal qcqz4",
          status: "F"
        },
        {
          id: "ba426a96-1bf9-4ed8-b7a9-23331949cd93",
          name: "Terminal pwoed",
          status: "F"
        },
        {
          id: "688ddb4a-0ba1-4847-925e-f807f0c6cefc",
          name: "Terminal ubebp",
          status: "F"
        },
        {
          id: "3952ccce-50a8-46c4-9e53-f5dd8fa4f95a",
          name: "Terminal upzpl",
          status: "F"
        },
        {
          id: "b7724340-ab7d-4ae1-81ce-4c004fe6108b",
          name: "Terminal 67jeh",
          status: "F"
        },
        {
          id: "306de2e8-8ce0-4257-a588-c5e0dd1eb315",
          name: "Terminal i0zj8",
          status: "F"
        },
        {
          id: "c3757398-e5e4-474d-a887-f6ed1a7fca69",
          name: "Terminal xkash",
          status: "F"
        },
        {
          id: "50f1c5e9-83c0-4286-bd5a-5d1eb90aaf0a",
          name: "Terminal tp8hg",
          status: "F"
        },
        {
          id: "770ac0d7-0fc4-4758-afd7-648f1990a7fb",
          name: "Terminal xbz90",
          status: "F"
        },
        {
          id: "8b46771a-49b1-412b-bf10-6dcdf07e7fe7",
          name: "Terminal 3zkhp",
          status: "F"
        },
        {
          id: "624b0c43-789a-49ba-8d96-15043f8d230b",
          name: "Terminal 20b6v",
          status: "F"
        },
        {
          id: "bb982f54-ea04-4bc5-be1a-c0335b877e52",
          name: "Terminal oax55",
          status: "F"
        },
        {
          id: "d8bcd297-437c-4690-9d5f-10ae0ea60855",
          name: "Terminal b6bwn",
          status: "F"
        },
        {
          id: "561cd5c3-72e5-4c8c-ad43-e3529df142ed",
          name: "Terminal 2ftax",
          status: "F"
        },
        {
          id: "34ca35ec-ca4c-4354-bbea-8a3f8c2cc717",
          name: "Terminal i6tpt",
          status: "F"
        },
        {
          id: "b41d054c-fcd2-461a-aa85-772067c0342b",
          name: "Terminal gm0vl",
          status: "F"
        },
        {
          id: "f801b998-653a-4564-a871-0c1b170f40cc",
          name: "Terminal tacnp",
          status: "F"
        },
        {
          id: "0ba198d0-106d-4291-a386-99af04cae2e3",
          name: "Terminal 4tcjb",
          status: "F"
        },
        {
          id: "02d5244a-edeb-4d36-a912-8c7957deb3e4",
          name: "Terminal j1dtr",
          status: "F"
        },
        {
          id: "23afe201-5821-47d8-bf72-7c7dcf3a0392",
          name: "Terminal fum8o",
          status: "F"
        },
        {
          id: "2c00807a-1fbe-4efa-91b3-b4408455098e",
          name: "Terminal yua3d",
          status: "F"
        },
        {
          id: "00b95f76-bd42-4569-9c34-f75bbd09dcd9",
          name: "Terminal 32hgc",
          status: "F"
        },
        {
          id: "fa6e35b1-3d02-4241-aabe-dd8bb760deb6",
          name: "Terminal rg5td",
          status: "F"
        },
        {
          id: "e8905e6f-9697-4a4d-8522-4b93a8c5bac6",
          name: "Terminal yyoxb",
          status: "F"
        },
        {
          id: "19c0bc14-6bdd-4907-8eba-69f3b3003aeb",
          name: "Terminal tr4bc",
          status: "F"
        },
        {
          id: "810045b9-a50f-40b0-b3f8-c2548efe14e7",
          name: "Terminal ubybm",
          status: "F"
        },
        {
          id: "cba1909d-bc4c-4830-b82d-8ecdcc60c291",
          name: "Terminal tsahv",
          status: "F"
        },
        {
          id: "b660a781-37bc-4ea2-a832-fc74631cf9a7",
          name: "Terminal pd3gw",
          status: "F"
        },
        {
          id: "8dcc1b86-3a24-4761-aaf0-e5b4cd051be5",
          name: "Terminal l056l",
          status: "F"
        },
        {
          id: "475bb139-b43b-4726-bf54-c8f6756b7092",
          name: "Terminal 1y0a3",
          status: "F"
        },
        {
          id: "0b91fc71-270a-48ef-890b-c948f42a24ee",
          name: "Terminal mvzao",
          status: "F"
        },
        {
          id: "22688247-30ba-4e2f-8099-5ccd727a4908",
          name: "Terminal 9c4w0",
          status: "F"
        },
        {
          id: "b79c78d6-b7ec-455b-bbf4-34eeb62ca897",
          name: "Terminal yw2gl",
          status: "F"
        },
        {
          id: "183c6e56-bece-47b2-9655-7886b530cefc",
          name: "Terminal srwdg",
          status: "F"
        },
        {
          id: "dfaec218-518b-4e47-97f9-8a5382c1549e",
          name: "Terminal 33c6w",
          status: "F"
        },
        {
          id: "e0542236-6bae-41c8-9640-73eb61728372",
          name: "Terminal 8hiyg",
          status: "F"
        },
        {
          id: "c6eef094-65f6-481a-92c5-9482d38b0d00",
          name: "Terminal x2ql7",
          status: "F"
        },
        {
          id: "b326c9f9-c5d8-4a87-a18c-507c8291ee9d",
          name: "Terminal xcz38",
          status: "F"
        },
        {
          id: "03bdf751-9d91-4a2e-a065-1056171c6169",
          name: "Terminal yc99v",
          status: "F"
        },
        {
          id: "5dab18c3-ba0a-4ff0-b13b-18fc9bfc3fa5",
          name: "Terminal b7d39",
          status: "F"
        },
        {
          id: "396bd1fc-67d6-41b4-8fec-76d10e901113",
          name: "Terminal tk8ok",
          status: "F"
        },
        {
          id: "dc6dc156-1b2b-4981-9305-a1492b910415",
          name: "Terminal hey15",
          status: "F"
        },
        {
          id: "14ae348d-289a-49fc-a73c-6a17ef5eebf9",
          name: "Terminal sww11",
          status: "F"
        },
        {
          id: "365e666a-0b40-4e9d-90c0-72bf14881203",
          name: "Terminal frf9o",
          status: "F"
        },
        {
          id: "bf925ece-e20e-49af-811a-30912300ff80",
          name: "Terminal apro4",
          status: "F"
        },
        {
          id: "dda945fb-c526-4d80-8e9c-b82a5c031baa",
          name: "Terminal xmv9m",
          status: "F"
        },
        {
          id: "421b0312-273e-4451-bf2c-d60239435ddf",
          name: "Terminal nf81r",
          status: "F"
        },
        {
          id: "2e76874b-0f69-4909-9b25-049d95ec2f19",
          name: "Terminal 9uqa2",
          status: "F"
        },
        {
          id: "863fb45e-5146-4b85-873d-f077eb87733f",
          name: "Terminal wwng5",
          status: "F"
        },
        {
          id: "c66c64c5-4582-4bf3-96e4-139de76641d7",
          name: "Terminal gy20i",
          status: "F"
        },
        {
          id: "cc4e8788-01a9-4e6b-b3aa-75b12ea686f2",
          name: "Terminal sorf4",
          status: "F"
        },
        {
          id: "4c809efb-dff5-4ce8-9993-33f695838c6c",
          name: "Terminal dnt4b",
          status: "F"
        },
        {
          id: "10b8d16c-740b-4923-915c-4582d2a97e80",
          name: "Terminal 8h3is",
          status: "F"
        },
        {
          id: "d5f710b4-8eef-42d2-98a7-0f527c989043",
          name: "Terminal kio8x",
          status: "F"
        },
        {
          id: "a72d539a-38a6-4505-8947-e1be9cdcbbae",
          name: "Terminal zdcnx",
          status: "F"
        },
        {
          id: "bf68ac89-7a0d-4fb1-b833-df2385fd4c75",
          name: "Terminal 8qnv8",
          status: "F"
        },
        {
          id: "25f624d5-6e43-4651-aa8b-813703f69be1",
          name: "Terminal 9b2d3",
          status: "F"
        },
        {
          id: "3d087074-1553-450a-b31a-2928d4cbf0f9",
          name: "Terminal v3xnk",
          status: "F"
        },
        {
          id: "685a84f8-86c8-49e9-8c0c-de5fca2fff88",
          name: "Terminal 450ye",
          status: "F"
        },
        {
          id: "f30d3fcd-344c-4330-bb53-d22bbd2ed223",
          name: "Terminal q8m9l",
          status: "F"
        },
        {
          id: "ccc73146-1bb7-4aa0-ac1f-b71f9c0c4db5",
          name: "Terminal 5nvib",
          status: "F"
        },
        {
          id: "bb5962a3-903b-484d-ad19-065118a5a746",
          name: "Terminal 9xt82",
          status: "F"
        },
        {
          id: "0d2214da-d1e0-4f82-8576-2c908b93b3ad",
          name: "Terminal 7y7f6",
          status: "F"
        },
        {
          id: "35900e84-a0e2-49de-abef-74799722048c",
          name: "Terminal bg2et",
          status: "F"
        },
        {
          id: "bb29f4f4-b512-427c-b973-86912e36b7e9",
          name: "Terminal l1mp9",
          status: "F"
        },
        {
          id: "d71d247c-5003-458c-a7f2-bb58efc8c6ab",
          name: "Terminal jphv4",
          status: "F"
        },
        {
          id: "fd21d3e0-7e55-4b72-9734-3683eb14614c",
          name: "Terminal b4sv8",
          status: "F"
        },
        {
          id: "060c9206-cdca-454d-9fc7-ce2204acfb86",
          name: "Terminal bw0nn",
          status: "F"
        },
        {
          id: "d7f40d50-3c3b-499e-baa3-1e99838cedf8",
          name: "Terminal sh07l",
          status: "F"
        },
        {
          id: "fee8717c-25f5-4b9f-92c4-73b5baccbe5f",
          name: "Terminal d9kbd",
          status: "F"
        },
        {
          id: "33b753bb-d9f0-40ae-bdac-41a54f6201e6",
          name: "Terminal dtlrk",
          status: "F"
        },
        {
          id: "3c2f1cee-feb8-4968-b667-e3eb17f81b87",
          name: "Terminal q74v2",
          status: "F"
        },
        {
          id: "580e8fb2-0591-43d1-aabd-89ac09884fd9",
          name: "Terminal ll54a",
          status: "F"
        },
        {
          id: "0394418b-2ee9-44a9-afeb-e0ba9119d268",
          name: "Terminal dajyu",
          status: "F"
        },
        {
          id: "10f8325f-176a-4dd0-afb1-81e1d53abab8",
          name: "Terminal csjns",
          status: "F"
        },
        {
          id: "53216d74-279d-4d9e-9aad-cd28d8561513",
          name: "Terminal jyu3l",
          status: "F"
        },
        {
          id: "5a7ab8f0-35f6-4f65-983e-2006d602946c",
          name: "Terminal hemzi",
          status: "F"
        },
        {
          id: "4aecfa75-32ed-4dd2-a86b-3293c0c9210e",
          name: "Terminal x2y8k",
          status: "F"
        },
        {
          id: "0c76b203-0768-4c24-bdc0-3d2d23f918b6",
          name: "Terminal w2bl6",
          status: "F"
        },
        {
          id: "8a99f9ac-b3fc-4ad4-bfe7-40f317d72709",
          name: "Terminal snmkt",
          status: "F"
        },
        {
          id: "fed929f4-99bc-4cc3-9914-7e6b5ae5995a",
          name: "Terminal 3shih",
          status: "F"
        },
        {
          id: "a3d6f988-4ce9-4f31-994c-8f0438d1e7b4",
          name: "Terminal c6jj0",
          status: "F"
        },
        {
          id: "1c835d03-4eb2-4ce1-9799-9eb03a8b9883",
          name: "Terminal usvf3",
          status: "F"
        },
        {
          id: "c5aa107e-093f-4f0d-bfda-4606eb92e8e1",
          name: "Terminal 0ep0t",
          status: "F"
        },
        {
          id: "0dacce8a-ced3-4405-aa87-de75c6225d3c",
          name: "Terminal e81ya",
          status: "F"
        },
        {
          id: "43ed894c-b193-41d3-b225-3ca7c535c3f2",
          name: "Terminal 7kqla",
          status: "F"
        },
        {
          id: "b29290af-d220-485f-a866-497b89afe26c",
          name: "Terminal zq1hs",
          status: "F"
        },
        {
          id: "be84c0f3-7376-4338-beea-40e9dc65b33e",
          name: "Terminal 6m26f",
          status: "F"
        },
        {
          id: "7e9b8e0b-d2b0-4bb9-9262-292b0b3d8bbb",
          name: "Terminal y871k",
          status: "F"
        },
        {
          id: "76adc74d-5a1e-4368-8893-834d88f860a7",
          name: "Terminal sgry2",
          status: "F"
        }
      ],
      history: []
    },
    {
      id: "ff431e2f-7417-4a37-9044-1882c8a4c11c",
      class: "Thx",
      type: "Thx",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "THX-1138",
      displayName: "THX-1138",
      power: {
        power: 0,
        powerLevels: [0, 40],
        defaultLevel: 0
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      activated: false,
      clients: []
    },
    {
      id: "a310136d-d51b-45aa-9bd1-83f55fdaccd1",
      class: "Sickbay",
      type: "Sickbay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Sickbay",
      displayName: "Sickbay",
      power: {
        power: 0,
        powerLevels: [],
        defaultLevel: -1
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      deconProgram: null,
      deconLocation: null,
      deconActive: false,
      deconOffset: 0,
      autoFinishDecon: false,
      sickbayRoster: [],
      bunks: [
        {
          id: "289b538e-3bf9-411e-9aa8-0a35a5fad43a",
          sickbayId: "a310136d-d51b-45aa-9bd1-83f55fdaccd1",
          scanRequest: "",
          scanResults: "",
          scanning: false,
          patient: null
        },
        {
          id: "56a253bc-50d2-4190-a56f-60e837871943",
          sickbayId: "a310136d-d51b-45aa-9bd1-83f55fdaccd1",
          scanRequest: "",
          scanResults: "",
          scanning: false,
          patient: null
        }
      ]
    }
  ],
  clients: [],
  sets: [],
  decks: [
    {
      id: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 2,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "185bb73a-be07-4083-8f04-69362916f0e0",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 1,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 5,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 15,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 3,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 13,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 12,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "aa68151a-9476-4521-9017-138375d32b23",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 7,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 6,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 4,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 11,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "11af4110-2969-4497-ac02-71eea987d0ca",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 9,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 14,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 8,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    },
    {
      id: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      class: "Deck",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      number: 10,
      svgPath: "",
      doors: false,
      evac: false,
      hallway: ""
    }
  ],
  rooms: [
    {
      class: "Room",
      id: "c3ada619-8430-4550-86cc-58a0fb25e862",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Decontamination",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "78a3d0d0-df30-47a2-959d-3eb4c072ed22",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Escape Pod Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "9ed3b6a0-4055-48f3-b768-0ec27ae88343",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Galley",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "76a7e66e-842a-4a1b-be1b-ee07d9fe1d22",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Secondary Sickbay",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a94d7c98-9491-4c7a-8524-fcc7efadba47",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Compressor Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ff59437f-1dd8-4062-b33d-c3846795304e",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Runabout Access Airlock",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a4663017-742b-4536-9014-9a71878800a3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c6a129cd-c960-4765-bff9-72fc5466aa34",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Transporter Room 1",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c103fd9b-7552-4c9d-bc0d-6ad45e7aa703",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "56b01558-d6a8-40f6-9760-9a31fc9edc8a",
      name: "Briefing Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c5783e97-f82c-484f-84f7-548f0e21f6ad",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Swimming Pool",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "316ed1b0-77d6-4ebd-8447-711582fd3407",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Theatre",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "92899ce6-c6fe-426e-ac3d-6904cee3c710",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Gymnasium",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5c7fa286-29de-4ce0-80d9-56fc1d14bc1c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Dancefloor",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e8abac41-0bc7-4fe1-9116-973389a084a6",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Botany Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "dd08a544-32b8-418a-9e2e-57959fb08ec0",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Main Library",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "85ecae4c-6a59-4008-aa6c-c107476e45cd",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Cloning Studies Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "eaa6cbd2-c8b5-41e0-ac98-5aea9b062886",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Variable Gravity Gymnasium",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "59fe9194-a182-48bc-9ba3-f45d29ea2bd7",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Pool Hall",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c81715a5-bcb2-4567-ad30-ca2ae5f581dd",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "53ff8e59-f715-4835-8189-dd55730ec39d",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Crew Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "24f47082-e317-45e1-bd41-298edce794c4",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "a55f0ac7-28b1-4ee5-9e22-531ad18b29d9",
      name: "Eps Secondary Energy Converters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7c547371-b69e-4452-b999-f339f8eabc6f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Secondary Brig",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "beabdacb-06b1-4d22-9275-7d152d823b21",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Secondary Armory",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "32d294b9-b522-4130-9c6a-90ec2d213e2f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Escape Pod Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "b6210528-00df-4573-b88c-f29e82a6e4a5",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Phaser Bank Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f9aeac43-6466-40dc-90e9-4f38d5547395",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Junior Officers' Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ad6a2be1-4c31-406e-b29a-796086fbd870",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "High Security Briefing Rooms 1-3",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7df204e9-9d76-4db5-826f-987295b7fc3b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "High Security Interrogation Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "77b4086a-d27a-4136-9fbf-b38260ef4f0c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Security Station",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "1ffe8a80-a60f-4cc6-97f0-e5b3d703f9e2",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Photon Torpedo Storage Bay 1",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f2b310a8-e12c-4041-9bcb-6a37ef8841ea",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Sensor Trunks",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "009774d6-d6df-4c15-882c-505a486661ec",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Phaser Maintenance",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c405d35f-91e0-4589-80d5-8400dc4a3d81",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Aft Photon Torpedo Launchers",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "b3ea6dbd-4cb5-427e-9b54-1fcbb64ea2fb",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Aft Torpedo Control Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f3909f07-d69c-4061-8541-96ea913eeda9",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Phaser Control Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e55b7fa2-dd07-424d-a60e-bf2ead35362b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "High Security Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bef4633d-93e5-42f6-a165-e9b8543139e0",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Chief Medical Officer's Office",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7d231be4-98fc-45e6-8a8c-2c227eb5b431",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Escape Pod Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7d2004fa-908c-4f13-89df-d3f24af1183b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Shuttlebay 1",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e728e35d-908b-4b79-b7c1-c5da921576fa",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "b925a752-0672-4a33-b325-ac36416f7067",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "1c04fa10-47e2-47f1-ad2e-7e3c8714c3aa",
      name: "Genetics Lab, Deck 5",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6b8190fd-2601-4b56-a6fc-859b64ccfd86",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Surgical Cubical",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7695e147-3e40-40ae-8a8e-74ec2f06079e",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Sensor Trunks",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "71ca3c0e-e474-48b4-8c6e-6e6556831366",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Emergency Batteries",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "9abca2c1-6cf7-4d50-9fc4-1fa2155e539e",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Biochemistry Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "65beac9c-1e35-4038-9bb3-172d3e496bf2",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Archaeology Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "03541836-5018-422e-95b4-df0e1435fe2a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Inorganic Chemistry Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "38cd3ee8-1e9c-4841-81da-0e306e2828c3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Zoology Pens",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "25ea2b31-0bf6-429f-ad27-9b639e95f204",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Biology Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "33fe8b37-ca99-4b72-afce-b39a58b7c690",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Phaser Head Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "0e901d7c-59c0-426d-ba63-1f447306da91",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Environmental Substation: Air Conditioning Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a1cfa1d5-af2d-46e7-acfa-ea0c1cf5d977",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Sickbay",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "0784a618-a00f-4d14-9d51-fdb60a267801",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Organic Chemistry Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4cf2a91c-8227-4097-a645-e2ca8f8f37bc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Vip Staterooms",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "57f0ef27-e2d8-4f19-8b55-14ff15f37623",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Admiral's Office",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f1533fd8-0797-4e6d-9377-de1dc69bf42f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b7001e2c-91e2-4c77-9179-a7a89c3f8adf",
      name: "Zoology Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5bc2df26-8647-49ac-988c-afcf1e41da0a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Mr. Williamson's Office",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e80a9950-13ca-450f-9ced-93401aa88597",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Morgue",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "494cb871-1750-43cd-b638-909f1a488879",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Messroom B",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "2d7ed9c6-dc1a-48fb-97c5-f0280faf3bfa",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Messroom A",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "fe3155a5-9d40-4bb2-b284-4958c7c12702",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Mr. Williamson's Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "3930f8ca-3c26-4f48-9865-4508dd2e4656",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Medical Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4eb74ff5-2fb0-4dd1-9adb-827733cde949",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Vip Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "108125e1-8508-48be-a6d1-b7e59be0d41d",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Admiral's Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5cdb2330-daa1-49b3-9c2c-d239710775ac",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Officers' Staterooms",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "94f4658c-6d3c-40f8-8611-a6a4bf495c2b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Auxiliary Computer Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "afb3448b-d560-4998-8201-17d8c065c34c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Upper Stellar Cartography",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bf57cee2-77f8-4271-92ac-3134ebd5390a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e1c70b64-467f-4eac-b98d-afbda7303fd1",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Transporter Room 2",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "915fec53-6f21-4b4d-bea4-65a5b097d0f3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Consumables Resupply Connectors",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "032fb2fb-6b90-4fce-8e68-8e0944e9b2d0",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Auxiliary Deflector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e59e9951-d35f-46a4-92fe-47e4e47f6be9",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Holodeck",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "3a693e23-25c2-4c42-a535-d3691a969a72",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Deuterium Processing",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "669c7a6e-08bc-4393-af18-312c0806c7c3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Senior Officers' Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a67ec97e-44be-4e0c-949f-c7da79238f36",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Sensor Maintenance",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "d1c8618d-c8da-4521-8951-da94e118e1d7",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "b946b41f-1213-4696-b462-6a5c14c7b0df",
      name: "Ten Forward Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "39d0474b-5ce7-417f-b134-9d3629a715e5",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Upper Cargo Bay 2",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "cedd7954-e280-4051-93eb-e851feb619e7",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Upper Cargo Bay 1",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ed25ec67-81b9-4adf-87c9-1f48333e5293",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Chaos Physics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "fc53a9a9-6550-463e-89d1-3516d3c012f4",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Main Stellar Cartography",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4c03247e-56bb-4ec7-8453-0ea7de504df4",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Rcs Thruster Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "0bba9ba0-20d6-45b9-92f6-220197550bcc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Auxiliary Computer Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "816493e8-500c-44ca-820e-30611a9abce1",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Astrophysics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6ffbd7a6-d7d0-4d19-a004-e66776638598",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Science Chief Offices",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "d14ab059-26e4-4a3d-b353-7d0967dc8307",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Particle Physics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "cddebdcc-812f-44c2-8e9e-5573868e4b65",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Classrooms A-E",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "1baab1b0-6ac3-4c71-b333-0b7c7d7660a3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Crew Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4a6f3f97-3901-4f68-a9fd-88e430e5a862",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Deuterium Injector Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "397f6c28-7b7f-40ca-8857-273c0b9095f0",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Explosive Detachment Bolts 1-5",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f123175f-45c7-4587-80e5-ff29c816da0c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Nuclear Physics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e1bd173f-7f6c-464a-8a3e-8d5c0f3f8bb0",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Tachyonics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "15c46503-7fda-454c-9ab0-b94d470e2e1d",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Antimatter Physics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "36a68424-2a15-4d45-8676-558d316dca73",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Upper Deflector Shield Grid",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a3c64318-c0e8-4880-a3cc-f8147b92c49f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "fbf11e57-c6fa-4ffb-a2cd-baafbe6ab76a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Sensor Control Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ce6ea719-b3f2-435d-98eb-fcc39cded3fb",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "aa68151a-9476-4521-9017-138375d32b23",
      name: "Deuterium Tankage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "eb99dd29-3273-4055-83a8-ebdb2ea4b94f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Deuterium Tankage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e96c9080-eae9-450f-a68e-4aadfd36a6d4",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Explosive Detachment Bolts 6-10",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "9c8f7cc1-d812-4fc9-901f-30bb13159e0b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Deuterium Processing",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "91940630-3c05-4d30-b99f-c958878d3e0b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Forward Workpod Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "8ca3e2c9-8ebd-42ad-9c54-351feabc39b3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Electro-Plasma System Main Trunk",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f22f2b7b-4f25-4e0c-a59e-ed0f1d836de6",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Air Filtration System",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "b8eb154a-b003-4d1b-a88a-92d95f6df979",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Air Pumping",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "732ccb72-0bdc-45a0-b4ef-d6210a7be006",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Deuterium Injector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "64439b9f-4cff-4991-a3f1-19eeadd3f1dc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Messroom C",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5ea9c00e-05ee-40c1-86bc-b752be17f371",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Aft Workpod Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "8dd3be3d-3396-432e-8a1a-60e7a7d6f501",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Kitchen",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "fbc93d7a-7b9c-4613-ba60-e5c4ca57270c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Lateral Sensor Array",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5fb7dea2-2560-4d98-bf5c-9fefcbadb050",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Liquid Nitrogen Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "811301b2-7c01-4991-960b-17d5e2fc05a9",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Photosynthetic Co2/o2 Exchange",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "821a9fe6-8fef-467c-805c-db9dee38d355",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Port / Starboard / Foreward Docking Ports",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c80b6675-ff34-4cc0-9ccc-753a7a37e113",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Jefferies Tube Main Access 1-5",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "968cc656-6f0e-465e-90d3-ab1fa4dce6fb",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Classrooms F-N",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "078dcab2-038b-4256-b87d-e137d1759070",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Main Environmental Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5c3200db-c727-482e-b9ca-dd31f4c89f64",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Liquid Oxygen Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "588765e6-63fa-41bd-b1da-f84314cf65ab",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Lower Stellar Cartography",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "347a5839-ffed-4f11-9723-5aff238ca65f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Cargo Transporters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "0380c30f-43a2-455e-9801-ca9070adbdbc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Lower Cargo Bay 1",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ae8027a7-772e-4fa3-b0f2-05b649d16898",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Rcs Thrusters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a5d506fe-4022-4b95-96ae-e0a789e80d10",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Lower Cargo Bay 2",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f3d58ea0-56f4-40a3-b99a-5f922f70dfda",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Optical Data Network Main Trunk",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5e4d9cf7-718d-4fce-85fe-69d0f4e0c7dc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "8f4fd006-fca7-4638-ae92-9442d6cba35a",
      name: "Lower Deflector Shield Grid",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "9987dbf7-c0f1-4920-96bc-b335579b42ee",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Biological Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "8557823c-3f33-4fa9-b4df-4d5d9a341898",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Cargo Loading Doors",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "40f7826f-6cd2-4902-853d-9bc1105c02e2",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Organic Fabrication",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a037ec2c-f202-4c44-8f1d-f9f3b6a72512",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Robotics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e63e0a9a-809a-4f44-84e9-ac94c018cf8c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Upper Main Engineering",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "368ec0a3-f894-44a6-84d1-9ebe628f7a15",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a5b3a2a9-c288-42bd-9a7c-b06d07045078",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Primary Subspace Transceiver",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "febf1a4d-cf84-4d17-8fa2-b1d37a4103bd",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Cryonic Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "89cd1928-0eff-454e-8400-44da4fa81997",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Metallurgy Labs",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "d758815c-8105-47ef-a330-64ae8860a024",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Toxic Chemical Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "cd0bc1b2-167d-454e-b061-35e957e5f2de",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Specialized Docking Port",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bca7ac4c-4767-45c6-808c-091ea5d12c3c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Workpod Control Station",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "100116e1-153e-4f80-bb25-6452044f5ac9",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Inorganic Fabrication",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "9dd20de2-5f72-4a4d-b81e-3aa21bc295f1",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Communications Control Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "90489fd8-7e8b-4f14-bdfa-b70075be8d16",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "11af4110-2969-4497-ac02-71eea987d0ca",
      name: "Subspace Mechanics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6a6966f9-5781-4ca0-9d44-63d60db1234b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Forward Torpedo Control Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4c962493-a6a8-424b-9944-84d63d773a3d",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Photon Torpedo Storage Bay 3",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "1979f80f-2183-49e9-9635-ff5b3e30f210",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Plasma Transfer Conduits",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f4fff5e4-6b7f-4063-a91e-a83ac365f647",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "33d1ccbd-68c3-4309-b1de-602ab864f62a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Main Navigational Deflector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "29d862c3-e0e0-43e8-954d-52659daaa70e",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Photon Torpedo Storage Bay 2",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "320d23fe-cebc-4a69-ab10-e6ff2b2db352",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Main Engineering",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f423f2a8-b7db-489c-bbab-5864fdb5ef05",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Main Computer Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c852933b-df2a-424b-904a-94cb835d75dd",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Reserve Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bf26b10d-c76c-45e6-9fed-ea809d1cc702",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Voice Recognition Subprocessor",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7489e9f1-4624-4908-a7d1-87d2be5515f9",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Eps Power Taps",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "d160d144-fae3-43cd-ad38-b83606dc7a53",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Eps Power Distribution Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "05680058-a535-4c08-a813-6e9d147a95fc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Port / Starboard Impulse Engine Access Tubes",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "9c00e3c9-5990-424f-914a-f1721d12da62",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "12e0332d-1205-424f-bec0-4b768a09a967",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "bfdcbd8b-4fc4-4c32-8b11-9e4ba15510b9",
      name: "Forward Photon Torpedo Launchers",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ddfe29ef-931d-4f7c-8e38-55b7edf44c84",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Nacelle Wing Servos",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5b57fce0-5217-4fbc-b92f-c5463dc25728",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Main Computer Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6d68e4a8-5dd4-43d5-a87e-0f74bfd16825",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Chief Engineer's Office",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "657c667d-e165-4ec8-9331-51145bbf7f04",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Port / Starboard Warp Nacelle Access Tubes",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "cf74edd3-9f85-4d7f-a59e-75523cc4c876",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Main Computer Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "d4a5c7d3-fb4c-4e0d-9e24-778c6d9a9e01",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Weapons Targeting Subprocessor",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "40d7843e-9cc2-4cf4-a523-9dddb3bfcf2a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Reserve Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "2352bfd4-8112-4c01-b9cb-2178f622cabe",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Jefferies Tube Main Access 6-10",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "2a84856e-9d1f-4b4f-9e9c-d3d873056e06",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Gamma Ray Telescope",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "1b9291a6-08d5-4bc9-a90f-00863be98d4a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Lower Main Engineering",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "13711617-6f58-44f1-98e4-afef5dddb827",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Main Navigational Deflector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "3306c85a-ec67-4e1d-8bc1-e6d0fe9ebd81",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Damage Control Personnel Office",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "418e0695-084c-4d9b-b50c-d2e780dab6ff",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Fire Detection Subprocessor",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "deffb79c-7bee-4272-b45f-5fc9045ea56a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Phaser Coolant Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "72020ab8-0896-4213-9e1c-65ba89a8c753",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Aft Long Range Sensors",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "77e6e10a-87b8-4a41-a3bd-7d67b635e402",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Boarding Ramps Control Station",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "88cde8d3-1bbc-4ce9-b442-984f506546bf",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Engineering Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "2178eb93-5acf-4e9f-a6e9-0bcb186cb42c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Docking Clamps Control Station",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "90562fb4-55c2-4ff2-9769-7206125122e5",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "4e86f7a9-0981-4653-a3fc-8cb6498ae452",
      name: "Subspace Telescope",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "df5cd836-4ba0-4742-86a9-1292a73dc974",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Environmental Substation: Gravity Generation",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "cb6d6a1d-54fc-435c-88dd-1b7d0887050f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Shuttlebay 2",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "5313c4f9-4c1c-4077-b3fb-b57252c9d3dc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Solid Waste Recycling",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bac9a80b-16c1-4f64-b74a-a19dd97ea229",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Forensics Lab",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a1f5825a-9f58-46ce-a11c-764485d778fb",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Forward Long Range Sensors",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "adffc584-399a-40d2-bb4a-d6ac2daa1816",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Jefferies Tube Main Access 11-15",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e87e6c50-74d8-4fad-be97-3ec8f9ee8ae6",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Environmental Substation: Heating Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "8743d772-1fc2-4223-a02d-4023b3ad3cde",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Thermal Imaging Array",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "34f4cefa-f569-444b-811b-2a76c5eff708",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Transporter Room 3",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "86e21516-470b-41f7-8979-dcf5cae8a570",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Heavy Equipment Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "14906659-ed55-4c73-801c-37bca495342a",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Main Deflector Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6963285d-eac1-4e4a-b09e-b3aebb397ada",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Upper Water Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bbc6965c-7c80-4a2d-a34c-6c3b1c991119",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Main Navigational Deflector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "921aa2cf-90da-4090-9d03-6a9adbec91d3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Matter Injector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6ca9274f-c329-440c-93ed-70703267450e",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Port / Starboard Observation Lounges",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a3f293a6-3a06-4594-8a5b-384fcc97ef5c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Antimatter Injector",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "19162e88-801f-43c4-924f-3ae630f15525",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Phaser Practice Range",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "c49cb416-4ed0-4cd7-a817-5fe3f5e45a15",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Water Reclamation Plant",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "a6fcc5f4-4cc4-4d10-be94-d13b4d478d58",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Escape Pod Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "72b15ce7-c7cb-4b61-badc-c74c088b06be",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2125a449-645e-4b3c-9e15-fca4d8451d07",
      name: "Water Pumping",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "0ffc8831-5103-49ac-a593-d22c5e641639",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Primary Brig",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "6e290077-39ca-4d34-a30c-b730b60f156b",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Primary Armory",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: ["securityTeam"]
    },
    {
      class: "Room",
      id: "3645dc23-2cf0-45d3-9a69-96992580f491",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "High Security Observation Lounge",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7ae3c4e3-49ed-4a9e-8945-8c425d7a5c09",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Turbolift Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "d7984dc2-883c-403f-96df-262634c12a84",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Reserve Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "35541482-083a-43c3-8b82-aca8c6faa7b4",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Turbolift Pathway Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "314ddefd-56a3-4a8e-ab55-3c6c0328e16d",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "High Security Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ff06db7e-596a-442c-a7ae-ad32969255fc",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "High Security Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: ["securityTeam"]
    },
    {
      class: "Room",
      id: "dea9e7fc-f276-4a06-959b-7cfef92bcda2",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Secondary Odn Trunks",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7cc8ab34-57b8-4862-9941-c384eae47eb5",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Turbolift Maintenance",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "ad9a4c84-7785-4201-a4a4-fa47f8446825",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Interrogation Room",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "78b2d79c-369e-4886-ab78-e68eab718917",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Matter Injector Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "bf366237-d2f1-4be3-869e-5efb85e25524",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Secondary Eps Trunks",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "e5759539-d993-4ad2-b648-b08f07c113a3",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Antimatter Injector Access",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "3509b289-29d8-4d9e-a735-63f88946e0d0",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Main Security Station",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "671aa3bf-6dcd-4e05-81ff-d2b9b5cef918",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Crew Quarters",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4e891b9b-4b16-45ae-96fb-f127471d1cb1",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Aft Tractor Beam Emitter",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f63fba31-fc53-43b5-8d43-b9eb0e895cb1",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Antimatter Processing",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "4d496c39-ba2c-4e61-88c3-fdd433e92fca",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Shuttlebay 3",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "2c656132-b231-484c-8cb4-d75a2c3dbf80",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Antimatter Tankage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "814495a0-b5e0-46a5-a9c0-fc92f651293c",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "02e4db1f-1ad8-4143-9796-516a3cea6d1a",
      name: "Lower Water Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f0893601-f08d-49fd-a750-9980705eb37f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Dilithium Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "1b6a63bc-5bfb-4f39-8a74-0893adf67422",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Reserve Warp Engine Core",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "24b77083-c507-4576-9423-7e97b1e8b2dd",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Ground Hover Footpad Control",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "dd54fc20-1524-419f-91ca-a5f53a50ae72",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Matter Processing",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "fc9f7ec5-6a80-4c8d-ac59-38fd83f30117",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Matter Tankage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "77ea7471-5208-4400-a8e8-1637cc0e7106",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Secondary Subspace Transceiver",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "7aa59f2c-a9ed-4777-97e1-81253b3a6ed6",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      name: "Laundry",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "171665e0-d50b-4c82-92df-43097c89ee76",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      name: "Ground Hover Footpads",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "39ff2e31-2835-484e-95f6-bb821bbac049",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      name: "Antimatter Loading Port",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "128af649-c4ff-434d-8da4-da934d73cb79",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      name: "Matter Loading Port",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "70b43d33-07d4-4cfb-b6c3-80a665ca128d",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "2b86d2b1-bb81-4169-8da1-b64588e6a73c",
      name: "Explosive Hull Plate Detachment Bolts",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "753627ab-176e-4eac-b974-5304d3830a4f",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      name: "Forward Tractor Beam Emitter",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    },
    {
      class: "Room",
      id: "f4f454f9-d627-4901-b42f-18e1948ef0ea",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      deckId: "e30d0f20-858b-4143-a2d2-e81ccda67910",
      name: "Coolant Storage",
      gas: false,
      svgPath: "",
      metadata: {},
      roles: []
    }
  ],
  crew: [
    {
      id: "2d1c41b1-93a0-45b3-ae8f-5f8b1b5588b1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Courtney",
      lastName: "Holt",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Air Pumping Controller",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9903e527-f471-4b07-9b3d-a5b6047668ac",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gavin",
      lastName: "Meyer",
      gender: "M",
      age: 23,
      rank: "Cadet",
      position: "Air Pumping Controller",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "746dbf3d-90db-46e9-a8ac-886e982e6e57",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gloria",
      lastName: "Roach",
      gender: "F",
      age: 27,
      rank: "Warrant Officer",
      position: "Air Pumping Supervisor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "68101cec-00ec-4202-bf38-355a74bc17d3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Bodhi",
      lastName: "Stark",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Assistant Counselor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "85ddf5b9-051c-41a6-96c7-3311bc09a343",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jonas",
      lastName: "Madden",
      gender: "M",
      age: 26,
      rank: "Cadet",
      position: "Astrophysicist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bf52d6d8-f023-45e9-bc9d-7e33596e5b5d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alex",
      lastName: "Hicks",
      gender: "M",
      age: 26,
      rank: "Crewman",
      position: "Ambassador Secretary",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4bde83bc-7e03-4903-bf47-01f833eaf25b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Leo",
      lastName: "Monson",
      gender: "M",
      age: 25,
      rank: "Petty Officer",
      position: "Archaeologist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "78e528bc-e5c5-4f0e-a20d-117ce740e08c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mara",
      lastName: "Hines",
      gender: "F",
      age: 25,
      rank: "Crewman",
      position: "Armory Attendant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fe69be01-090e-46fa-b4b7-8b9cd017daaa",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Julio",
      lastName: "Castillo",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Bartender",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6892bd3b-22ae-4ba2-9542-6e5c64e0f152",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Moses",
      lastName: "Cobb",
      gender: "M",
      age: 37,
      rank: "Chief Petty Officer",
      position: "Biologist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bb58f73d-3240-48ef-b03f-dbdf93cec18f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Autumn",
      lastName: "Nguyen",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Biologist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2f25b279-8f53-43c4-895d-1e8edd50153a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Hadley",
      lastName: "Gallagher",
      gender: "F",
      age: 29,
      rank: "Crewman",
      position: "Botany Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3257969b-46c2-49af-b368-a88c78aeb369",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lucian",
      lastName: "Holland",
      gender: "M",
      age: 20,
      rank: "Ensign",
      position: "Atmospheric Monitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "70bcf371-d0df-4a47-8253-22df9702d98b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Amelia",
      lastName: "Delgado",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "99bd38dd-d27c-4099-9650-0133cc2dbf45",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Brecken",
      lastName: "Grooves",
      gender: "M",
      age: 25,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "97c58df4-a79e-4afe-ab16-39e3199d8237",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Laila",
      lastName: "Kerr",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3dfce472-c80a-4e52-b7ed-70f7532b828b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Laurel",
      lastName: "Massey",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d0bfbae4-540d-4a66-9b2f-bea89c359cc2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kimberly",
      lastName: "Cannon",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f9a19905-10f0-4145-92a8-b3ba7416e450",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alena",
      lastName: "Warren",
      gender: "F",
      age: 27,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6baabecc-144f-4a74-ace8-9df53730173a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Camden",
      lastName: "Grimes",
      gender: "M",
      age: 40,
      rank: "Chief Petty Officer",
      position: "Cargo Supervisor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c37e15fc-d0ba-45d2-ac37-5cb0d207bd27",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Anabelle",
      lastName: "Caldwell",
      gender: "F",
      age: 26,
      rank: "Chief Petty Officer",
      position: "Cargobay Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "87774f1d-c91b-4e09-9299-99fa2b31d11e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lillian",
      lastName: "Webb",
      gender: "F",
      age: 20,
      rank: "Cadet",
      position: "Chaos Theory Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8916e49d-7659-43ad-9f68-8af0dc84e7f5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Marvin",
      lastName: "Schneider",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Cargo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "51d22b16-5dd9-4541-abd6-660df1e93a45",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Larry",
      lastName: "Marquez",
      gender: "M",
      age: 28,
      rank: "Chaplain",
      position: "Chaplain",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "59577cd3-0806-4c43-958e-042fe3ec4de2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Greyson",
      lastName: "Hunter",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Chaplain Aide",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "7d007784-07b0-4557-9367-9652f412de7e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jimmy",
      lastName: "Rojas",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Chaplain Aide",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "493299ab-9448-47db-848a-99d0f3dfebd2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alonzo",
      lastName: "Carr",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Chef",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b2bca724-a583-44d4-89fc-72a233ef730f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "India",
      lastName: "Dean",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Chef",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "aca25d21-7f49-405c-985c-e9fcd24fc640",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cody",
      lastName: "Fields",
      gender: "M",
      age: 29,
      rank: "Chaplain",
      position: "Chaplain",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8e690dab-70d7-4805-99cd-5a1e76b6c3b0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Zachary",
      lastName: "Knight",
      gender: "M",
      age: 32,
      rank: "Chief Petty Officer",
      position: "Chef",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "54278d3a-d7c8-485e-8fe2-cd139e618539",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sean",
      lastName: "Mcguire",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Chef",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "56e912c4-21e1-44e8-8b65-fc7d1bd5c12f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Brandon",
      lastName: "Webster",
      gender: "M",
      age: 35,
      rank: "Chief Petty Officer",
      position: "Chef",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6be526d7-6243-4480-b04e-47b1b7eee70d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Caylee",
      lastName: "Sosa",
      gender: "F",
      age: 36,
      rank: "Chief Petty Officer",
      position: "Chief Decryption Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "62e4b25e-6204-4c52-8782-d43bc6978a9c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Travis",
      lastName: "Beltran",
      gender: "M",
      age: 29,
      rank: "Chief Petty Officer",
      position: "Chief Phaser Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "585b1c1f-0a51-41d3-a4c8-3c41db61bdb7",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Collin",
      lastName: "Mccall",
      gender: "M",
      age: 25,
      rank: "Petty Officer",
      position: "Chief Programmer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "933384af-9286-4da2-b77b-372b1e1009d5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mario",
      lastName: "Gallagher",
      gender: "M",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Chief Railgun Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "27a43646-990e-4291-a76a-1c889ddf4a4a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jacob",
      lastName: "Marshall",
      gender: "M",
      age: 34,
      rank: "Chief Petty Officer",
      position: "Chief Torpedo Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fd678bad-4915-4350-a43e-496d30881807",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Brittany",
      lastName: "Glenn",
      gender: "F",
      age: 26,
      rank: "Yeoman",
      position: "Clerk",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1837347b-6da1-4318-b50b-5c62e1f256d0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gwen",
      lastName: "Lynch",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Chief Probes Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a507a7eb-613a-49f6-8975-3cf6a61c74fc",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Desiree",
      lastName: "Powell",
      gender: "F",
      age: 25,
      rank: "Yeoman",
      position: "Clerk",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b7577328-ff69-4a06-8bbd-afaf28b87913",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Wyatt",
      lastName: "Stanley",
      gender: "M",
      age: 26,
      rank: "Petty Officer",
      position: "Client / Server Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bf69016c-da1e-4c08-a2e0-ad843d69f152",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Olivia",
      lastName: "Novak",
      gender: "F",
      age: 24,
      rank: "Petty Officer",
      position: "Co2 Scrubber Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ffb83db4-bcfe-4793-986a-7e10f54f7790",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jack",
      lastName: "Fox",
      gender: "M",
      age: 29,
      rank: "Chief Petty Officer",
      position: "Communications Crew Department Head",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6ae6a572-e917-4a82-b25a-651d52e9fc1c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ivan",
      lastName: "Gregory",
      gender: "M",
      age: 25,
      rank: "Yeoman",
      position: "Clerk",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "64ef0979-c170-46b9-82e2-08c557df6451",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Barbara",
      lastName: "Burnett",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "aa1b3235-d8a6-47da-8937-7115230682ce",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kylee",
      lastName: "Farrell",
      gender: "F",
      age: 21,
      rank: "Cadet",
      position: "Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0cebdff4-e932-4759-a779-0321c6d6609a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Daisy",
      lastName: "Flowers",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1d684407-8904-445c-8ef2-08602d83dcc2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Benson",
      lastName: "Perez",
      gender: "M",
      age: 22,
      rank: "Ensign",
      position: "Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a899ede6-2058-4499-99b6-6d65d1caffb8",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Teresa",
      lastName: "Boone",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "99a850ea-fd00-4087-a146-11befb347bb4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Milo",
      lastName: "Bass",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Communications Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "02c80981-e7ef-4622-9b42-f95a962a47df",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Matilda",
      lastName: "Oneal",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Communications Sub-department Head",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "de8aeabb-0f3e-4d08-b6f4-c71e96ea988b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ruby",
      lastName: "Noble",
      gender: "F",
      age: 21,
      rank: "Petty Officer",
      position: "Compressor Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b32b5d1c-2e3d-42b4-a1b3-b97e536dcf8b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Violet",
      lastName: "Young",
      gender: "F",
      age: 33,
      rank: "Chief Petty Officer",
      position: "Computer Core Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "68da5bb7-c035-4392-933b-a229f12a02b2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Denise",
      lastName: "Sharp",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "82d82ae9-9cf3-49eb-9a86-64780187b6fa",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jasper",
      lastName: "Gill",
      gender: "M",
      age: 26,
      rank: "Warrant Officer",
      position: "Computer Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "21815f58-bee0-4b65-88b2-71ac8e0271ac",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rosemary",
      lastName: "Whitaker",
      gender: "F",
      age: 28,
      rank: "Warrant Officer",
      position: "Computer Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a82b5e3e-13c3-46ed-9530-180d607f0be9",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Tessa",
      lastName: "Becker",
      gender: "F",
      age: 28,
      rank: "Lieutenant Junior Grade",
      position: "Counselor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "81c1ee66-3102-4435-95c2-5006af59950c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Emma",
      lastName: "Donaldson",
      gender: "F",
      age: 34,
      rank: "Lieutenant Junior Grade",
      position: "Crew Development Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4aabb490-6702-4ec1-826e-fad44e169215",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kate",
      lastName: "Mckinney",
      gender: "F",
      age: 29,
      rank: "Chief Petty Officer",
      position: "Crm-114 Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "77f4fc4e-2f1a-42aa-bb49-5840ce141a36",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Corinne",
      lastName: "Bernard",
      gender: "F",
      age: 29,
      rank: "Warrant Officer",
      position: "Computer Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d8af197b-60e3-4761-b066-842db3a88aac",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Darius",
      lastName: "Clarke",
      gender: "M",
      age: 20,
      rank: "Ensign",
      position: "Cryonic Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "7ee532f7-c979-4e41-b07c-3ec3bdb0fcab",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Martin",
      lastName: "Eaton",
      gender: "M",
      age: 27,
      rank: "Warrant Officer",
      position: "Cultural Studies Attendant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "da411f9d-92d2-4acb-93fb-64345f9c4dab",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Hector",
      lastName: "Davidson",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Custodian",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2b9ca860-eeb5-4169-b86a-1f1212899c38",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rene",
      lastName: "Dupont",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Custodian",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ccd0c43d-2f7b-417b-915a-534610632d4d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alondra",
      lastName: "Nicholson",
      gender: "F",
      age: 25,
      rank: "Crewman",
      position: "Custodian",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6e3f5f0a-4fc6-4df2-8d87-a18d99456e36",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alfred",
      lastName: "Dunlap",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Decoder",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9ae4bc4e-cd2c-4cf1-b441-18d2ff4abf59",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Raphael",
      lastName: "Mancini",
      gender: "M",
      age: 27,
      rank: "Lieutenant Commander",
      position: "Deputy Chief Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "509200ce-f719-4d12-bc96-563fa7bc74ba",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aarav",
      lastName: "Ramsey",
      gender: "M",
      age: 33,
      rank: "Lieutenant Commander",
      position: "Deputy Chief Of Operations",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e5f27382-af31-47fc-9f2d-3558d4fc4e64",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Richard Dean",
      lastName: "Anderson",
      gender: "M",
      age: 35,
      rank: "Senior Chief Petty Officer",
      position: "Deputy Chief Of Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "354b03b0-c247-46d6-9e28-43fd4556c1dd",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kendall",
      lastName: "Daugherty",
      gender: "M",
      age: 25,
      rank: "Petty Officer",
      position: "Decoder",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5e95fc8b-ef9e-487e-9bbc-fc8de57dfaa1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nathan",
      lastName: "West",
      gender: "M",
      age: 29,
      rank: "Lieutenant",
      position: "Deputy Maintenance Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0cabf4e9-8c2f-43c9-a708-a3ae483c1e3e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Marcus",
      lastName: "Frey",
      gender: "M",
      age: 41,
      rank: "Lieutenant Commander",
      position: "Deputy Navigations Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "30bc1540-b980-4e6a-a9eb-6facc793b91e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jared",
      lastName: "Key",
      gender: "M",
      age: 48,
      rank: "Chief Petty Officer",
      position: "Deputy Phaser Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "220f7d5a-6ede-484c-87b3-27096c2d423d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Asia",
      lastName: "Long",
      gender: "F",
      age: 29,
      rank: "Chief Warrant Officer",
      position: "Deputy Quartermaster",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "71f79f0c-076b-4a9c-b2b2-bf6eec8f9aab",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Michelle",
      lastName: "Colon",
      gender: "F",
      age: 29,
      rank: "Lieutenant Commander",
      position: "Deputy Communications Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "144a15b9-9279-4d0f-bc88-accee8070336",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rachel",
      lastName: "Rosario",
      gender: "F",
      age: 29,
      rank: "Lieutenant Commander",
      position: "Deputy Tactical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "96f936e9-c1bf-4e59-86ed-7463335b43a3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Eva",
      lastName: "Wolf",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Deputy Torpedo Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3e73ae41-4dbd-476e-894a-0add25726fa6",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Otto",
      lastName: "Finley",
      gender: "M",
      age: 28,
      rank: "Warrant Officer",
      position: "Docking Port Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8e23f54c-ad9c-414a-b5ae-6917b7d9e035",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gino",
      lastName: "Gentry",
      gender: "M",
      age: 23,
      rank: "Petty Officer",
      position: "Docking Port Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c331e86d-e450-45d2-bf2b-f12eb578d728",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Christian",
      lastName: "Farmer",
      gender: "M",
      age: 26,
      rank: "Chief Petty Officer",
      position: "Deputy Railgun Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0ef1a4b3-d398-4df8-ba55-3128b64e77ca",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Damien",
      lastName: "Baird",
      gender: "M",
      age: 45,
      rank: "Lieutenant Commander",
      position: "Duty Medical Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b90859c6-b5c7-4489-bf8d-3686944b7c55",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Genesis",
      lastName: "Dixon",
      gender: "F",
      age: 29,
      rank: "Lieutenant",
      position: "Duty Navigations Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ea966382-e198-4873-a407-5f9d606e3e45",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Maddison",
      lastName: "Dennis",
      gender: "F",
      age: 29,
      rank: "Lieutenant",
      position: "Duty Surviellance Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c444414a-708c-41d0-828e-cc3aa5b1712e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aaron",
      lastName: "Fuller",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Electrician",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ba47eed7-858d-478f-a200-576d72617ac4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Emily",
      lastName: "Henson",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Electrician",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ede97030-50f1-44bd-89cd-209d5dbcc8a5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nikolai",
      lastName: "Stokes",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Docking Port Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b071c7bb-4541-42b4-bc76-bbf2c64422ad",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Owen",
      lastName: "Little",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Electrician",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e9c323b6-f491-446d-bc52-f2e949715b24",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lorenzo",
      lastName: "Atkins",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "22623155-76a4-4d73-a1ea-26780c7520d0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Corey",
      lastName: "Hathaway",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "db8dd0f7-4534-4369-b578-36d6563a7362",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kailyn",
      lastName: "Hensley",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "04c211f2-6cf4-4eba-bd3b-4e89e0cdeac2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Celeste",
      lastName: "Pace",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fd8c8eaa-b358-4f25-ba06-786b3c70efe5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cindy",
      lastName: "Sparks",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Entertainment & Crew Morale Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "55c5bdd6-da50-4fa2-b12b-1e8f4e2982b0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ace",
      lastName: "Bartlett",
      gender: "M",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Environmental Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "db107e57-65e8-445e-99a9-a1b0b1600e7b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Dax",
      lastName: "Santos",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Environmental Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c2623e50-1c5c-44a4-94f7-432081d64828",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Zoe",
      lastName: "Watson",
      gender: "F",
      age: 36,
      rank: "Chief Petty Officer",
      position: "Environmental Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "deabde1b-d8a2-45e0-9a3f-392803abc871",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Maverick",
      lastName: "Ballard",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Explosive Expert",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f72ebbbc-69dd-4f87-981f-ef9775e3ee83",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Addilyn",
      lastName: "Ryan",
      gender: "F",
      age: 25,
      rank: "Crewman",
      position: "Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4256e823-b3c2-4ef3-9343-47d9e2fb3f0e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Logan",
      lastName: "Hulick",
      gender: "M",
      age: 29,
      rank: "Chief Petty Officer",
      position: "Environmental Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a38b699f-12da-4f14-99df-f6732d71be9d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Allison",
      lastName: "Moran",
      gender: "F",
      age: 24,
      rank: "Crewman",
      position: "Explosive Expert",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "cc9e1123-261c-4df7-ab30-6ce0e587ed6b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alec",
      lastName: "Mercer",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Fire Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fa6f009b-db86-4839-9825-f154147abc93",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Garrison",
      lastName: "Schultz",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Fire Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "96b63e1e-8819-4978-b1ba-928179545b73",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Roy",
      lastName: "Church",
      gender: "M",
      age: 39,
      rank: "Warrant Officer",
      position: "Fire Suppression Systems Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6922778b-2e8c-4ccf-8a5d-545d00becfde",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Janessa",
      lastName: "Green",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Food Preparation",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3277429d-51a1-4432-aca2-8506389adc66",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Diego",
      lastName: "Sexton",
      gender: "M",
      age: 29,
      rank: "Chief Petty Officer",
      position: "Forensics",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "04703c6d-2fc1-4393-9d61-5a24d0d4dfe0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Taryn",
      lastName: "Faulkner",
      gender: "F",
      age: 26,
      rank: "Warrant Officer",
      position: "Gamma Ray Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c04ba994-6345-446d-ab2f-fc3fbba4d1e0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Hayley",
      lastName: "Wu",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Genetics Lab Researcher",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "de053059-1e1a-40a9-9575-0f29a715ce68",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kaden",
      lastName: "Chaney",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Food Preparation",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1107b46a-2088-4efe-a4c7-752b41a6afce",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "T’Laren",
      lastName: "Doe",
      gender: "M",
      age: 27,
      rank: "Warrant Officer",
      position: "Gravity Control Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d3a4dbdd-cafa-44d2-af09-5d83c4084f08",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Tanner",
      lastName: "Edwards",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Gravity Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1f59d4d9-abcc-4db3-b20c-28a316a32e23",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Devin",
      lastName: "Wall",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Gravity Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bb9cac91-97e8-425a-b75b-90218e487467",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Edward",
      lastName: "Parks",
      gender: "M",
      age: 25,
      rank: "Crewman",
      position: "Greenhouse Caretaker",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b9dd8c0b-7591-4cc8-a62c-79baeb8de7cf",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lamar",
      lastName: "Mays",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Geologist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2ecc8246-7300-4352-9b17-3b2072dcf1db",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ashton",
      lastName: "Drake",
      gender: "M",
      age: 29,
      rank: "Crewman",
      position: "Hazardous Waste Expert",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "31cdc684-cddd-4df9-b240-ba19cf726822",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Owen",
      lastName: "King",
      gender: "M",
      age: 23,
      rank: "Ensign",
      position: "Hazardous Waste Expert",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0fed131d-4e7d-4d93-9238-f95973458f37",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sawyer",
      lastName: "Singleton",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Hazardous Waste Expert",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "61cacac6-3311-4882-b0b2-8a9e86bed8b5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Curtis",
      lastName: "Mcgrath",
      gender: "M",
      age: 26,
      rank: "Crewman",
      position: "Hull Monitoring Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bd0f1aaf-f812-4759-b219-26a32ee8f72d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Orion",
      lastName: "Sandoval",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Gymnasium Supervisor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "50931584-3f04-478b-a512-011712faa9ea",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nora",
      lastName: "Horn",
      gender: "F",
      age: 25,
      rank: "Cadet",
      position: "Inorganic Chemist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "60435b52-eae3-4eac-86ee-13177c756ceb",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Fabian",
      lastName: "Deleon",
      gender: "M",
      age: 22,
      rank: "Petty Officer",
      position: "Intelligence Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "211ec27b-de42-4bdc-90a9-a770f2e83751",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gustavo",
      lastName: "Rocha",
      gender: "M",
      age: 22,
      rank: "Petty Officer",
      position: "Intelligence Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f3cf6969-0a75-471c-8685-e007bc3ffb4b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cassandra",
      lastName: "Bentley",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Internal Communications Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "139889e7-431e-4ab2-9369-574140795f1f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Layton",
      lastName: "Ali",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Janitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fda328c7-604c-44a1-bcd4-c24f098133d1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cameron",
      lastName: "Carpenter",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Hydroponics",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "076f1b31-a421-4782-a550-59a34baf56d1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jessie",
      lastName: "Anderson",
      gender: "F",
      age: 37,
      rank: "Crewman",
      position: "Janitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "831388ad-956f-42d2-a2e3-120423503814",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Isaac",
      lastName: "Decker",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Janitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "92e48474-0e54-45fc-b3c6-5a68f9504269",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Hugo",
      lastName: "Miller",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Janitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2925ebc5-9652-4fdd-8d77-6d5a5b2047a2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Tony",
      lastName: "Novak",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Janitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fc2102ff-471f-4d2e-ac60-acf92c1c5935",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kenia",
      lastName: "Palmer",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Janitor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "7870a708-60e0-45fa-9b23-04030cc5b1d2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ezra",
      lastName: "Santana",
      gender: "M",
      age: 20,
      rank: "Cadet",
      position: "Lateral Sensors Array Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "dc6c006d-bc34-4db8-bbd7-973f33be464b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Megan",
      lastName: "Nolan",
      gender: "F",
      age: 26,
      rank: "Petty Officer",
      position: "Librarian",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a177f6cc-367a-44c2-a0fe-289dbc4ce75c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Breanna",
      lastName: "Norris",
      gender: "F",
      age: 21,
      rank: "Cadet",
      position: "Librarian",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "574aedde-f703-440f-9e34-bac47dc35a8d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Noe",
      lastName: "Tate",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Librarian",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bd56ef0c-70cb-4e56-898e-6f8949bc7a74",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nico",
      lastName: "Ritter",
      gender: "M",
      age: 34,
      rank: "Chief Petty Officer",
      position: "Janitor Crew Department Head",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "48bb0afd-712b-4ef0-90c3-5de830085ced",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ahmed",
      lastName: "Villanueva",
      gender: "M",
      age: 24,
      rank: "Crewman",
      position: "Lifeguard",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "aea5549a-7a89-4e1a-b44c-c2300abce983",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Francesca",
      lastName: "Delacruz",
      gender: "F",
      age: 39,
      rank: "Chief Petty Officer",
      position: "Long Range Sensors Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e0e0f6f2-3675-4471-96c5-b8d389e3d3bd",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lionel",
      lastName: "Logan",
      gender: "M",
      age: 43,
      rank: "Lieutenant",
      position: "Maintenance Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "143b310b-6fba-4267-8c58-59fcf62f79f8",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ivy",
      lastName: "Melton",
      gender: "F",
      age: 25,
      rank: "Petty Officer",
      position: "Maintenance Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "352bb7aa-9932-4617-87ac-1a517a7eb47e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sandra",
      lastName: "Cortez",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Launderer ",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ff0877f7-683f-41bd-a7a9-504a51c31b4a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Diana",
      lastName: "Garner",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Maintenance Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "056010ca-2237-470f-b084-dcb07cd18074",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Payton",
      lastName: "Hanson",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Maintenance Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b89b573d-d3a8-4e53-a515-a09315100fe3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jenny",
      lastName: "Mcguire",
      gender: "F",
      age: 20,
      rank: "Cadet",
      position: "Maintenance Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5551d7fe-2402-40e5-914d-64dff2221184",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Oliver",
      lastName: "Conley",
      gender: "M",
      age: 26,
      rank: "Chief Petty Officer",
      position: "Marconi Cube Attendant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f7d2b541-d773-41b5-bd52-5e2ad1c7f2d2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Felix",
      lastName: "Carey",
      gender: "M",
      age: 25,
      rank: "Cadet",
      position: "Maintenance Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "730872d3-ce2c-4ce2-a138-7aeac0d47169",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cyrus",
      lastName: "Tanner",
      gender: "M",
      age: 36,
      rank: "Chief Petty Officer",
      position: "Marconi Cube Attendant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4ffbba98-69fe-4c2f-9756-5732f98f2f17",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Dominic",
      lastName: "Kaufman",
      gender: "M",
      age: 51,
      rank: "Chief Petty Officer",
      position: "Marconi Radio Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "86994242-ff55-436d-ba0f-d7b9579cfb67",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Camille",
      lastName: "Merritt",
      gender: "F",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Marconi Radio Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "21af8bd5-249a-4e39-9aca-a03486a72041",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Connor",
      lastName: "Wheeler",
      gender: "M",
      age: 32,
      rank: "Chief Petty Officer",
      position: "Marconi Radio Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a6278bc5-88c2-4f72-9260-1490f56960ba",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Raven",
      lastName: "Lester",
      gender: "F",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Marconi Cube Attendant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "185bddf3-543b-4989-9ad5-36f9c501e44a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Savannah",
      lastName: "Keller",
      gender: "F",
      age: 25,
      rank: "Crewman",
      position: "Mechanic",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6230be78-946b-46a3-a8aa-80a56d874001",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Adrian",
      lastName: "Stevens",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Mechanic",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d66454ed-efa8-4e7b-b153-774a4f9608ff",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cora",
      lastName: "Bond",
      gender: "F",
      age: 29,
      rank: "Lieutenant",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ef668c56-726e-4d0b-8ae8-a10e5013b152",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Flynn",
      lastName: "Dalton",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a004b9c8-c633-4009-b167-e05040612693",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sidney",
      lastName: "Irwin",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Mechanic",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b1d2d7a8-addf-4186-bf57-ffaf009411be",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ronald",
      lastName: "Fowler",
      gender: "M",
      age: 24,
      rank: "Ensign",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d12a3bd9-bff0-4241-a7ea-7d3a6f70b0a6",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Adrian",
      lastName: "Gould",
      gender: "F",
      age: 48,
      rank: "Chief Warrant Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "7c343a82-8dc7-44d6-9548-8c3081e48a6e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Belen",
      lastName: "Hardin",
      gender: "M",
      age: 31,
      rank: "Lieutenant Junior Grade",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "cc3182b3-a1fd-4835-9342-35054ded3990",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Victoria",
      lastName: "Harrell",
      gender: "F",
      age: 32,
      rank: "Warrant Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5d52f367-d4c9-4d4b-9855-e1d103ec8631",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gary",
      lastName: "Davenport",
      gender: "M",
      age: 48,
      rank: "Chief Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0bfe8616-2093-48d7-ae85-106b8e2756de",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lindsey",
      lastName: "House",
      gender: "F",
      age: 40,
      rank: "Chief Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4e6f7c58-ab2d-4b58-b47e-652177875884",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Zane",
      lastName: "Li",
      gender: "M",
      age: 32,
      rank: "Warrant Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "beeb672e-050b-4fa2-8eb5-de81720e0224",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alyssa",
      lastName: "Little",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "18ee67df-3f2d-4f61-b6fa-752c8223aa00",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Paris",
      lastName: "Mcneil",
      gender: "M",
      age: 26,
      rank: "Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3fceb99a-6e0e-4a0a-a914-e265aa7f34ef",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Addison",
      lastName: "Harvey",
      gender: "M",
      age: 30,
      rank: "Senior Chief Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "58b04ff4-7cfe-4d85-aa90-370c9d12035a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Levi",
      lastName: "Moore",
      gender: "M",
      age: 21,
      rank: "Ensign",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ca81c892-b0d6-4d1f-ad4b-3eaa3db4135e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sloan",
      lastName: "Osborne",
      gender: "F",
      age: 26,
      rank: "Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "74c23874-df9d-4d9c-9e7c-43ee9ad3c20f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Solomon",
      lastName: "Ramos",
      gender: "M",
      age: 30,
      rank: "Lieutenant Junior Grade",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8920e85a-02da-41d4-b288-f26b863adffa",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sullivan",
      lastName: "Rice",
      gender: "M",
      age: 26,
      rank: "Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5482b839-66a3-4c41-a569-6d98c0efb742",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nicole",
      lastName: "Sims",
      gender: "F",
      age: 26,
      rank: "Crewman",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3234c322-bcb8-4752-b4e3-89d3429d32ee",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Isabella",
      lastName: "Mendoza",
      gender: "F",
      age: 49,
      rank: "Senior Chief Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "01b4e4af-dc50-41fd-a9ca-87e122c43873",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Vincent",
      lastName: "Valencia",
      gender: "M",
      age: 38,
      rank: "Chief Petty Officer",
      position: "Medical Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f20b3b4f-03cc-4108-8c34-8c6b16672c96",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "David",
      lastName: "Berger",
      gender: "M",
      age: 26,
      rank: "Chief Petty Officer",
      position: "Mepcomm Assymetric Encryption Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "071a372e-5cf0-4c46-bcbc-de258101e21f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Samson",
      lastName: "Reyes",
      gender: "M",
      age: 41,
      rank: "Chief Petty Officer",
      position: "Mepcomm Symmetric Encryption Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "97ec9dfc-cd67-46a1-b279-8d4df1ef1f1d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Axel",
      lastName: "Pace",
      gender: "M",
      age: 22,
      rank: "Cadet",
      position: "Metallurgist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bd6696ef-91fb-4fbc-b5eb-3c8db71d0076",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aleena",
      lastName: "Stewart",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Metallurgist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "aa5aea4a-227e-4cd0-9b52-ea68d6b5cefa",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Stephanie",
      lastName: "Drake",
      gender: "F",
      age: 28,
      rank: "Warrant Officer",
      position: "Morgue Attendant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "35693214-281d-4329-8871-ac4aa098e120",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Derek",
      lastName: "Terrell",
      gender: "M",
      age: 28,
      rank: "Warrant Officer",
      position: "Nano Technology Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ba972e5a-08c7-43a4-87bd-c9c6cb38eb15",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jane",
      lastName: "Hobbs",
      gender: "F",
      age: 26,
      rank: "Petty Officer",
      position: "Navigational Array Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d2f011cd-03c5-40da-9a46-25894b7dc900",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kora",
      lastName: "Gray",
      gender: "F",
      age: 24,
      rank: "Cadet",
      position: "Navigational Deflector Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2848d0a7-177a-4b59-9818-3d2164fddb01",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Elaine",
      lastName: "Burch",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Molecular Biologist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "af391ef6-63e3-4734-ae95-2ce738f6a6f9",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Tabitha",
      lastName: "Odom",
      gender: "F",
      age: 24,
      rank: "Petty Officer",
      position: "Network Administrator 1",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ce1a7fbc-39cb-4d74-bcd7-164179a3a4a9",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mallory",
      lastName: "Oilver",
      gender: "F",
      age: 26,
      rank: "Petty Officer",
      position: "Network Administrator 2",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8c60fe6b-9fe8-4e05-bd87-29bd58848c23",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mitchell",
      lastName: "Solis",
      gender: "M",
      age: 38,
      rank: "Lieutenant Junior Grade",
      position: "Nuclear Physicist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "61472e36-595f-4e4b-8292-133f31b7c9bf",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Quentin",
      lastName: "Own",
      gender: "M",
      age: 26,
      rank: "Petty Officer",
      position: "On-site Technician",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "16527454-4bc3-4f21-a872-2d63980435b2",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aurelia",
      lastName: "Smith",
      gender: "F",
      age: 24,
      rank: "Crewman",
      position: "Navigational Deflector Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8c44539a-634b-4ff3-91d2-bf6783cb7ca6",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Trey",
      lastName: "Rush",
      gender: "M",
      age: 39,
      rank: "Lieutenant Junior Grade",
      position: "Organic Chemist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3b032296-e032-4e23-bdb3-bf30adbcd811",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Winston",
      lastName: "Woodard",
      gender: "M",
      age: 21,
      rank: "Ensign",
      position: "Oxygen Generator Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "35a9a9a9-1f57-41f2-bbbb-a4c565418b5f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Patricia",
      lastName: "Francis",
      gender: "F",
      age: 21,
      rank: "Petty Officer",
      position: "Paralegal Assistant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "059ce301-ef85-4e78-9f40-ee561ac1cc03",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ivan",
      lastName: "Camacho",
      gender: "M",
      age: 38,
      rank: "Chief Petty Officer",
      position: "Penetration Tester",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b3ea05e4-eab6-445f-84b4-2ba6de11e8a6",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Iris",
      lastName: "Nash",
      gender: "F",
      age: 23,
      rank: "Cadet",
      position: "Orbital Trajectory Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ddf8450d-14cd-4d3a-b6fa-e7cc85189a35",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ryan",
      lastName: "Rivers",
      gender: "M",
      age: 23,
      rank: "Petty Officer",
      position: "Paralegal Assistant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5b58e9e5-d2bf-48e9-9f1e-709ff3805678",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Noah",
      lastName: "Mccarthy",
      gender: "M",
      age: 38,
      rank: "Lieutenant Junior Grade",
      position: "Particle Physicist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1108f477-eeb0-47bf-9b64-50790f541d48",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Danielle",
      lastName: "Holden",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Phaser Head Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "73f6c585-ddc3-4eb2-aac0-fd045b5dba4b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Riley",
      lastName: "Mcewan",
      gender: "M",
      age: 24,
      rank: "Ensign",
      position: "Phaser Head Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e3b844db-fcd1-40d3-a599-e9b95471213f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Leonard",
      lastName: "Moss",
      gender: "M",
      age: 24,
      rank: "Petty Officer",
      position: "Phaser Inspector",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "70ab8704-4854-48bf-82a8-b4744fc96c5c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "John",
      lastName: "Morse",
      gender: "M",
      age: 29,
      rank: "Chief Warrant Officer",
      position: "Personnel Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "84672708-5bc1-4e02-8b19-7695ff72135b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jeremy",
      lastName: "Yates",
      gender: "M",
      age: 33,
      rank: "Warrant Officer",
      position: "Physics Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "472eafef-f1ac-47d2-a7fb-9f2f5e4b0482",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Claudia",
      lastName: "Heath",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Plumber",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ec07be07-e0e4-4860-9f70-66b04eb9063c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Daniel",
      lastName: "Rogers",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Plumber",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "96da56aa-bf69-497f-9183-4c17e3ae0a5d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Hazel",
      lastName: "Stone",
      gender: "F",
      age: 24,
      rank: "Crewman",
      position: "Plumber",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4a74d7bb-f0c0-4232-9ef5-7b0e4a020b7a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Uriel",
      lastName: "Suarez",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Plumber",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b67811bc-fb46-41bb-bd68-c8888da311a6",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cedric",
      lastName: "Lawrence",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Potions Master",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2cb2f9ff-510c-4cf0-85b4-bf6a0cbe23c4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Bridger",
      lastName: "Mathews",
      gender: "M",
      age: 28,
      rank: "Crewman",
      position: "Power Distribution Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "28c463d7-5f80-4796-af5f-2a9810a44f51",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Erik",
      lastName: "Moon",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Power Distribution Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2c83d354-8fa2-4827-aaf5-766e172f8955",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Truman",
      lastName: "Patrick",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Power Distribution Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "33716686-82dd-4d95-a2e9-1e879fad814a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Adan",
      lastName: "Fuentes",
      gender: "M",
      age: 26,
      rank: "Warrant Officer",
      position: "Pro-javascript Writer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "99d2a33b-2f6f-4be9-a4c7-823aeb085a15",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Carley",
      lastName: "Harper",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Pool Hall Disk Jockey",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "bc26bbe2-b3f9-4f8c-9a1a-d02193bc64ef",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Roxanne",
      lastName: "Bauer",
      gender: "F",
      age: 20,
      rank: "Cadet",
      position: "Probes Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "77aa5ef1-f516-4d23-83c6-0e8d1b5a20b4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Samuel",
      lastName: "Dudley",
      gender: "M",
      age: 24,
      rank: "Crewman",
      position: "Probes Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4319023d-8858-4878-8020-d56b87991234",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Artillery",
      lastName: "Rowe",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Probes Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "fbcef8d1-4583-4ed5-8c84-ef7eaea01159",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mckenzie",
      lastName: "Baldwin",
      gender: "F",
      age: 20,
      rank: "Petty Officer",
      position: "Quality Assurance",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5e83ab50-5e3c-4992-9394-7717e70ce3d3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Andrew",
      lastName: "Cooke",
      gender: "M",
      age: 24,
      rank: "Petty Officer",
      position: "Quality Assurance",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "56476148-38a2-4745-a076-19376571afc1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Elias",
      lastName: "Harrell",
      gender: "M",
      age: 32,
      rank: "Lieutenant Junior Grade",
      position: "Quantum Mechanic",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "86420b52-8d9e-4644-b6ff-3fc5496234ac",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Saul",
      lastName: "Armstrong",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Quartermaster",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3eff5bed-5660-454a-956a-ebc0c74c9fb8",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jazmine",
      lastName: "Mann",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Quartermaster",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a494bf57-84eb-4426-b1ca-1436ccd5c2ef",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ramon",
      lastName: "Reid",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Quartermaster",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ccb14904-95b3-4ce4-877f-bc36e810494b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Dalilah",
      lastName: "Sweeney",
      gender: "F",
      age: 22,
      rank: "Petty Officer",
      position: "Quality Assurance",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d1ff6faa-5d08-4adb-93b1-b4629739c43e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Naomi",
      lastName: "Olsen",
      gender: "F",
      age: 24,
      rank: "Petty Officer",
      position: "Rcs Thruster Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "01b9a9fa-6453-46d8-a442-138edd360fe1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aleigha",
      lastName: "Morse",
      gender: "F",
      age: 29,
      rank: "Chief Petty Officer",
      position: "Reactor Core Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9192e7a6-30d0-420d-aa98-69f22da72eab",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Omar",
      lastName: "Holder",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Reactor Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "37bb9b00-2505-41b2-b38a-7b62b7987133",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Drew",
      lastName: "Patel",
      gender: "M",
      age: 31,
      rank: "Petty Officer",
      position: "Reactor Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "cbaecda7-9615-45ec-8d09-92b3b1554642",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Vivian",
      lastName: "King",
      gender: "F",
      age: 24,
      rank: "Petty Officer",
      position: "Rcs Thruster Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "177c3ecb-1fd9-4228-bd9e-7f555ad255c8",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jaden",
      lastName: "Howe",
      gender: "M",
      age: 26,
      rank: "Crewman",
      position: "Recycling Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1456fa93-be60-4a9e-914e-e1a560340682",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Anne",
      lastName: "Lambert",
      gender: "F",
      age: 26,
      rank: "Crewman",
      position: "Recycling Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "75d56fd7-48fe-4304-a117-92d739b98612",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kiana",
      lastName: "Barry",
      gender: "F",
      age: 28,
      rank: "Chief Warrant Officer",
      position: "Repair Teams Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e9a782ee-f283-4e4f-b329-20e098a32e26",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Carter",
      lastName: "Ward",
      gender: "M",
      age: 50,
      rank: "Lieutenant",
      position: "Science Department Head",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4ea52ee3-d3b4-4123-9f5c-b1d06c0505ea",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Brock",
      lastName: "Robles",
      gender: "M",
      age: 27,
      rank: "Warrant Officer",
      position: "Recycling Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0efce273-fd6a-4de8-83bf-cb40a85c206f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ariel",
      lastName: "Henry",
      gender: "F",
      age: 24,
      rank: "Petty Officer",
      position: "Science Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "08de5a31-f061-4d5f-b388-1dfd730f1de1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Deangelo",
      lastName: "Riggs",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Science Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9ed57ce9-d8e1-4ca5-a6de-5a157ee0f3e5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Brenna",
      lastName: "Turner",
      gender: "F",
      age: 28,
      rank: "Crewman",
      position: "Science Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "102df08d-d76d-49ff-9b1a-b4fb6a7ca2a3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jake",
      lastName: "Cummings",
      gender: "M",
      age: 24,
      rank: "Petty Officer",
      position: "Secondary Computer Core Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0afe86c9-323a-4ce8-96e0-aac4662208b0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Angelo",
      lastName: "Golden",
      gender: "M",
      age: 26,
      rank: "Ensign",
      position: "Science Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "26483cfe-27ad-431d-bd16-5765174346a4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sergio",
      lastName: "Baldwin",
      gender: "M",
      age: 23,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f83cf80e-5fb1-4036-83c9-ff2be19a4885",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Morgan",
      lastName: "Bates",
      gender: "F",
      age: 25,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d85c731e-8408-46ed-99a4-c10d32c309ab",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Brycen",
      lastName: "Baxter",
      gender: "M",
      age: 25,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c12907f6-81ef-4a77-b743-7d3f9af93c68",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Warren",
      lastName: "Becker",
      gender: "M",
      age: 26,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6b6640f6-f7e3-4df3-b4d3-75e8a2441f76",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Chloe",
      lastName: "Baird",
      gender: "F",
      age: 24,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8a0ebb2a-b368-4253-902a-960528739d16",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mauricio",
      lastName: "Brandt",
      gender: "M",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "83216565-d4ea-4b70-9704-6c7d247f77cc",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alexis",
      lastName: "Byrd",
      gender: "F",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3932dd32-0ac1-4a50-8fdb-4ffe79f53f70",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Morgan",
      lastName: "Callahan",
      gender: "M",
      age: 24,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e86a67bf-b983-41e7-b8f4-18570f25b51e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Carmen",
      lastName: "Carrillo",
      gender: "F",
      age: 23,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1425e9d3-5fa8-4562-bc3b-0c852749bc61",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Bianca",
      lastName: "Black",
      gender: "F",
      age: 49,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2f389949-4572-4b95-aa65-aa2f5814882b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Keira",
      lastName: "Castro",
      gender: "F",
      age: 24,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "244aa2ab-2e00-4af9-be8f-ee7191bf7522",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Taylor",
      lastName: "Clark",
      gender: "M",
      age: 25,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b19368fa-9761-4d2f-8af2-af4363eb9c7a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mark",
      lastName: "Clements",
      gender: "M",
      age: 23,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "758f4868-464d-4f5f-af5b-af64057ed92a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Natasha",
      lastName: "Cooley",
      gender: "F",
      age: 35,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "021aa5f1-fc08-4c8e-9e3a-9a996850e046",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Arthur",
      lastName: "Castro",
      gender: "M",
      age: 24,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c91ddcf4-f291-4024-aa14-b5ed7efa9190",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Andre",
      lastName: "Farley",
      gender: "M",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e03f140a-9bab-4ef7-b044-d2635e85e11b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alan",
      lastName: "Fitzpatrick",
      gender: "M",
      age: 29,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ff1b7c97-6417-44dc-9210-be86f1913774",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Randy",
      lastName: "Fleming",
      gender: "M",
      age: 32,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5035a448-970c-4b96-b1aa-c0187ca90997",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Bethany",
      lastName: "Guzman",
      gender: "F",
      age: 37,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4b3a0e8f-416d-4827-86b7-1aeee79ab98d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alma",
      lastName: "Davies",
      gender: "M",
      age: 26,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "086821c9-f2be-4843-b745-7e59c39d6559",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alice",
      lastName: "Ibarra",
      gender: "F",
      age: 29,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "eff49cf1-0c7c-4807-b752-8276ec015c18",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rocco",
      lastName: "Landry",
      gender: "M",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a4d2af9b-d594-4332-8d79-fdfa6faca9af",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Amos",
      lastName: "Lin",
      gender: "M",
      age: 29,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "15f52984-15f7-4c56-8738-6d866c71f881",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Bobby",
      lastName: "Lloyd",
      gender: "M",
      age: 27,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "095493eb-b16c-42f2-bb80-95cded6232ab",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Chris",
      lastName: "Martin",
      gender: "M",
      age: 41,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "cc4ee86b-f67a-44e4-88ba-2860a048811f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Samara",
      lastName: "Hartman",
      gender: "F",
      age: 29,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d48f0324-f3ab-4d85-a542-787297302256",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Monica",
      lastName: "Maxwell",
      gender: "F",
      age: 27,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "49e15ee0-32da-4ecd-af73-351282372165",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jamal",
      lastName: "Meza",
      gender: "M",
      age: 41,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "8342af69-f1ab-4cf1-b90c-a1d19fbf64cc",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mikaela",
      lastName: "Neal",
      gender: "F",
      age: 27,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a2c2efd2-8b64-4520-9582-fbffd01e2ead",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kyree",
      lastName: "Ortega",
      gender: "F",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "308ee911-0c6f-459e-9027-3be153a98e35",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Fernanda",
      lastName: "Pennington",
      gender: "F",
      age: 33,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b6cf2204-4feb-42db-8e29-17f131e4b8a3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Reagan",
      lastName: "Perry",
      gender: "F",
      age: 34,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5339eb8d-dd00-4a60-8944-3abe45b0b298",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Sofia",
      lastName: "Potter",
      gender: "F",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a87b67e4-8d9a-4951-8403-7cec493982ca",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Antoine",
      lastName: "Preston",
      gender: "M",
      age: 27,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2d6ea068-7e04-4483-8ddb-cdade9f74736",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Vanessa",
      lastName: "Rudd",
      gender: "F",
      age: 29,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ce3148c9-431f-4174-9570-8b798a7c2266",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Karen",
      lastName: "Tucker",
      gender: "F",
      age: 35,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2bd32bdc-236c-4fd3-b2bd-0429b60c0483",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Casey",
      lastName: "Wilcox",
      gender: "M",
      age: 28,
      rank: "Master-at-arms",
      position: "Security",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "17a7da40-5dd2-4532-9f86-2c5175b16d73",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Pierre",
      lastName: "Dubois",
      gender: "M",
      age: 29,
      rank: "Senior Chief Petty Officer",
      position: "Senior Cryptologic Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9fe15408-fbcc-4369-886e-48d21cca04da",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Angel",
      lastName: "Diaz",
      gender: "M",
      age: 28,
      rank: "Senior Chief Petty Officer",
      position: "Senior Equipment Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ede8a099-ea2a-4814-b229-0ea33b8d5c6d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gwyneth",
      lastName: "Martin",
      gender: "F",
      age: 40,
      rank: "Senior Chief Petty Officer",
      position: "Senior Information Systems Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2f93702a-95b1-407e-a075-435e423d1067",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kyle",
      lastName: "Haas",
      gender: "M",
      age: 30,
      rank: "Senior Chief Petty Officer",
      position: "Senior Intelligence Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0a861e2a-573e-4bac-b4f7-7a6a5879f352",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Kyson",
      lastName: "Mcknight",
      gender: "F",
      age: 52,
      rank: "Senior Chief Petty Officer",
      position: "Senior Paralegal",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "815940ec-068d-4824-8e86-b59e73cb6f3c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Frances",
      lastName: "Bowers",
      gender: "F",
      age: 47,
      rank: "Senior Chief Petty Officer",
      position: "Senior Construction Mechanic",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "494fc17e-a712-4924-889e-76af28e560d3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ulises",
      lastName: "Rose",
      gender: "M",
      age: 29,
      rank: "Senior Chief Petty Officer",
      position: "Senior Quartermaster",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "75e549be-d0d4-4ba8-bccf-b4ab2bef5e4e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Byron",
      lastName: "Sheppard",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Sensor Systems Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b6ed6f68-07f0-4064-9610-952559eafe91",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nancy",
      lastName: "Bowen",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Sensors Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ed5db7e5-e739-4efa-ad31-508597b1598c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Amara",
      lastName: "Chandler",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Sensors Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3ec6cdbf-c2c8-4cd8-9065-3463554d645d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Miranda",
      lastName: "Roberts",
      gender: "F",
      age: 21,
      rank: "Crewman",
      position: "Sensors Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "736eb2ba-713b-4d61-b73d-339e1fea57c3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mia",
      lastName: "Stafford",
      gender: "F",
      age: 36,
      rank: "Warrant Officer",
      position: "Shield Control Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1fe0aa7f-acc5-4051-aa4f-80d6a89ddde6",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lincoln",
      lastName: "Bates",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Shield Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9f435233-2d75-4a9c-8c21-9eb96b78d75e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Claire",
      lastName: "Wise",
      gender: "F",
      age: 22,
      rank: "Cadet",
      position: "Shield Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c45fe81c-731e-4067-9fb1-ab7daf16af66",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Breanna",
      lastName: "Rhodes",
      gender: "F",
      age: 21,
      rank: "Cadet",
      position: "Ship Photographer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6898c817-8f35-4dc2-9ca4-2f98f94c88fd",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Wesley",
      lastName: "Wilson",
      gender: "M",
      age: 29,
      rank: "Chief Warrant Officer",
      position: "Ship Serviceman",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a1ab71d6-2949-42bb-8b10-054f51c29160",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Dylan",
      lastName: "Mills",
      gender: "M",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Short Range Sensors Specialist",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "709a6ede-ec2e-457d-9286-5c8fcb84272e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Adrienne",
      lastName: "Knight",
      gender: "F",
      age: 31,
      rank: "Chief Petty Officer",
      position: "Shuttlebay Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9d13111e-3a4b-4828-aaad-f2d32e43110c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Shannon",
      lastName: "Anthony",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Shuttlebay Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3b839146-e6ea-476d-ae4b-07a1a8e73ecc",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Lola",
      lastName: "Proctor",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Shuttlebay Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b7376042-4b41-4c6e-a06a-b2e266079c80",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Leroy",
      lastName: "Sellers",
      gender: "M",
      age: 22,
      rank: "Ensign",
      position: "Shuttlebay Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "490d277c-e14c-4dc7-96b6-1f324f7de08d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cherish",
      lastName: "Hodges",
      gender: "F",
      age: 27,
      rank: "Petty Officer",
      position: "Sous Chef",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "77f16e38-71e0-40e9-84e7-380d6dfd9d84",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Xavi",
      lastName: "Ingram",
      gender: "F",
      age: 34,
      rank: "Lieutenant",
      position: "Stellar Cartographer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "381a40b7-baa4-4372-bf43-45f59586d86f",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Frank",
      lastName: "Crane",
      gender: "M",
      age: 29,
      rank: "Petty Officer",
      position: "Stellar Cartographer Assistant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "53957f42-8a14-4209-8973-52d3a3d52d4b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Seamus",
      lastName: "Stone",
      gender: "M",
      age: 23,
      rank: "Crewman",
      position: "Structural Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1b26417d-e9ca-49d4-ac17-ae6c03fcf727",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Russell",
      lastName: "Curry",
      gender: "M",
      age: 23,
      rank: "Petty Officer",
      position: "Stellar Cartographer Assistant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5dca3213-22f8-4403-b960-ee30df8a3e90",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Yousef",
      lastName: "Kataan",
      gender: "M",
      age: 23,
      rank: "Petty Officer",
      position: "Stellar Cartographer Assistant",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ffc2bf26-60f6-4707-bb0f-90b36288d091",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Vance",
      lastName: "Levy",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Strategic Operations Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "823eab47-7dbc-4460-84bc-42a12a042865",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Braxton",
      lastName: "Hess",
      gender: "M",
      age: 24,
      rank: "Crewman",
      position: "Structural Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "5c2572d7-d017-45aa-a2b9-31c82100406a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Molly",
      lastName: "Day",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Sub-light Engine Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "35fd4965-dc5f-475c-8856-23b663951cb0",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jalen",
      lastName: "Gardner",
      gender: "M",
      age: 25,
      rank: "Petty Officer",
      position: "Sub-light Engine Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ba5901f6-1674-4abd-90fb-7114a6d48e85",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Makenna",
      lastName: "Ball",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Swim Instructor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b51b0a25-bd37-4969-b949-6fe4658182c8",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Holly",
      lastName: "Collins",
      gender: "F",
      age: 24,
      rank: "Crewman",
      position: "Tailor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b05dc80b-bc65-4702-93de-666baa324bdf",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Parker",
      lastName: "Hill",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Structural Engineer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f72d581f-9cf2-4df8-b4d7-7e87f064fb5c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Eliza",
      lastName: "Wells",
      gender: "F",
      age: 25,
      rank: "Petty Officer",
      position: "Temperature Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b423f1b4-c595-4989-8cce-d7b85363a6ff",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Donald",
      lastName: "Pope",
      gender: "M",
      age: 26,
      rank: "Crewman",
      position: "Theater Projector Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "1f1db602-ac2f-4ea3-bc2f-3c2904fceaaa",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Emmett",
      lastName: "Krueger",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Thermal Imaging",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "356c88b2-a789-4e8f-9ddd-46c20a6b37dc",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Gage",
      lastName: "Vance",
      gender: "M",
      age: 45,
      rank: "Petty Officer",
      position: "Thruster Coolant Control",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f32d061a-b97b-421f-8b6c-f6d491f86565",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Victor",
      lastName: "Williamson",
      gender: "M",
      age: 57,
      rank: "Civilian",
      position: "Teacher",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "2555aa99-e787-430c-ba02-a79d34681c76",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Ronnie",
      lastName: "Ford",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Torpedo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "c4bf5d77-8857-41b9-8360-36d2c712448e",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Harley",
      lastName: "Leon",
      gender: "F",
      age: 26,
      rank: "Crewman",
      position: "Torpedo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "06215ed3-5529-4348-9934-039568240c37",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Pablo",
      lastName: "Rivas",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Torpedo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a38c5ca4-87db-41f5-963a-b980abe29f6c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mack",
      lastName: "Shannon",
      gender: "M",
      age: 26,
      rank: "Petty Officer",
      position: "Torpedo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "67110481-65a5-4e63-8607-1d2c7303242c",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "George",
      lastName: "Austin",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Torpedo Loader",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "59864e49-d7a6-4e2a-81b5-054eee43bc76",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aaden",
      lastName: "Frost",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Tractor Beam Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "f4ee66cf-9265-491a-8223-1e7aff91c01a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Cesar",
      lastName: "Ramirez",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Tractor Beam Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "d0201dee-aaa5-418e-b54c-872d4772b8e4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jade",
      lastName: "Barnes",
      gender: "F",
      age: 28,
      rank: "Chief Petty Officer",
      position: "Transporter Chief",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "45e16579-5b86-47e0-96bb-58851f14ab45",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rosa",
      lastName: "Kline",
      gender: "F",
      age: 20,
      rank: "Crewman",
      position: "Transporter Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "cc1d8865-7a1a-4b21-b0f0-831e1614cd3b",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Nolan",
      lastName: "Hayes",
      gender: "M",
      age: 25,
      rank: "Petty Officer",
      position: "Tractor Beam Control Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "b949eb5b-316c-4299-af66-5d696a2eb342",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Alvin",
      lastName: "Marks",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Turbolift Maintenance Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "4b28473b-b9e7-4200-a36a-2842a6f70cc8",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rex",
      lastName: "Carney",
      gender: "M",
      age: 29,
      rank: "Crewman",
      position: "Water Pumping",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "17db6315-8aad-4891-be61-d6b7daa95ec1",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Rodrigo",
      lastName: "Orr",
      gender: "M",
      age: 20,
      rank: "Crewman",
      position: "Water Pumping",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "0dd39268-e046-4808-bf17-40bd00642819",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Hadassah",
      lastName: "Haddad",
      gender: "M",
      age: 24,
      rank: "Crewman",
      position: "Water Pumping Supervisor",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ebc9b003-cf97-42db-b049-6de96c1f0dd4",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aaliyah",
      lastName: "Valentine",
      gender: "F",
      age: 22,
      rank: "Crewman",
      position: "Transporter Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "ab34ae95-0b6a-4679-afee-8ac23d4eba8a",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Aspen",
      lastName: "Coleman",
      gender: "F",
      age: 23,
      rank: "Crewman",
      position: "Weapons Control Understudy",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "6a82c54f-9b70-4ce6-8131-20c2b2f238d9",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Conrad",
      lastName: "Huber",
      gender: "M",
      age: 28,
      rank: "Warrant Officer",
      position: "Weapons Crew Department Head",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "480c6800-58b4-4d97-925a-fdd9edcdfdf3",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Major",
      lastName: "Scott",
      gender: "M",
      age: 21,
      rank: "Cadet",
      position: "Weapons Crew Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "a49f92b1-86b8-4af1-afc4-21d4e55f7c9d",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Skylar",
      lastName: "Carson",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Weapons Manager",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9b5f58f5-7a63-47d9-986d-02911b3dd869",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Phillip",
      lastName: "Buck",
      gender: "M",
      age: 21,
      rank: "Crewman",
      position: "Weapons Control Understudy",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "e7dd169f-08bb-4709-b40b-facd603c4dc5",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Douglas",
      lastName: "Blair",
      gender: "M",
      age: 23,
      rank: "Ensign",
      position: "Welder",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "dab1a628-a481-4eb2-b9d2-83f9d72c2255",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Christine",
      lastName: "Nichols",
      gender: "F",
      age: 27,
      rank: "Crewman",
      position: "Welder",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3d47890b-87a7-4186-a2f3-83bdd98ed896",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Benjamin",
      lastName: "Sloan",
      gender: "M",
      age: 22,
      rank: "Crewman",
      position: "Welder",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "9bafeb2c-57d7-4348-831e-102926b72bf9",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Atticus",
      lastName: "Ewing",
      gender: "M",
      age: 23,
      rank: "Petty Officer",
      position: "Work Bee Control Room Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "cb1e130f-674f-452f-9968-7c52e4f78e85",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Catherine",
      lastName: "Mullen",
      gender: "F",
      age: 22,
      rank: "Ensign",
      position: "Weapons Sub-department Head",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "eec828ba-a5b9-4667-abc6-fd52893638e9",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jonathan",
      lastName: "Howell",
      gender: "M",
      age: 22,
      rank: "Petty Officer",
      position: "Work Bee Control Room Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "abe2452c-d622-41d3-aa8e-b24d4ad3a036",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Mason",
      lastName: "Mccormick",
      gender: "M",
      age: 27,
      rank: "Chief Petty Officer",
      position: "Wormhole Generator Operator",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "3e2ef801-d055-43e3-90c7-13bf79182099",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Jason",
      lastName: "Beck",
      gender: "M",
      age: 29,
      rank: "Lieutenant",
      position: "Zoology Lab Technican",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    },
    {
      id: "dd207797-e654-4907-a1b5-4ee37d95d6f7",
      class: "Crew",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      firstName: "Leland",
      lastName: "Gannon",
      gender: "M",
      age: 27,
      rank: "Petty Officer",
      position: "Work Bee Control Room Officer",
      killed: false,
      workRoom: null,
      restRoom: null,
      charts: []
    }
  ],
  teams: [],
  inventory: [
    {
      class: "InventoryItem",
      id: "14643077-b48e-428f-969a-cffe4edc66e8",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Phaser",
      roomCount: {
        "6e290077-39ca-4d34-a30c-b730b60f156b": 10,
        "ff06db7e-596a-442c-a7ae-ad32969255fc": 1
      },
      crewCount: {},
      metadata: {}
    },
    {
      class: "InventoryItem",
      id: "ec0f69f5-4c46-4b5f-955c-8fa07ebccd73",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Thermal Detonator",
      roomCount: {
        "ff06db7e-596a-442c-a7ae-ad32969255fc": 5
      },
      crewCount: {},
      metadata: {}
    }
  ],
  isochips: [],
  dockingPorts: [
    {
      id: "239b8082-ba2b-4156-baa9-1c58860eef08",
      class: "DockingPort",
      type: "shuttlebay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Alpha",
      displayName: "Alpha",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      clamps: true,
      compress: true,
      doors: true,
      image: "/Docking Images/Blackbird.png",
      docked: true
    },
    {
      id: "2b8761d9-7d8f-42fe-a4a6-9a4e00d96b19",
      class: "DockingPort",
      type: "shuttlebay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Bravo",
      displayName: "Bravo",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      clamps: true,
      compress: true,
      doors: true,
      image: "/Docking Images/Boxwing.png",
      docked: true
    },
    {
      id: "b84e8e02-2f54-419d-981e-8eeb4e007e78",
      class: "DockingPort",
      type: "shuttlebay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Charlie",
      displayName: "Charlie",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      clamps: true,
      compress: true,
      doors: true,
      image: "/Docking Images/Bug.png",
      docked: true
    },
    {
      id: "bd53cbfc-5477-4ab5-9f30-82069c8bb536",
      class: "DockingPort",
      type: "shuttlebay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Delta",
      displayName: "Delta",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      clamps: true,
      compress: true,
      doors: true,
      image: "/Docking Images/Lance.png",
      docked: true
    },
    {
      id: "3460d5ff-0ff1-4bb5-a7b5-2220e6a0771a",
      class: "DockingPort",
      type: "shuttlebay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Echo",
      displayName: "Echo",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      clamps: true,
      compress: true,
      doors: true,
      image: "/Docking Images/Mravene.png",
      docked: true
    },
    {
      id: "cd822b3d-61c0-4761-bbd0-bbc3840d6eb7",
      class: "DockingPort",
      type: "shuttlebay",
      simulatorId: "635ee7d9-3693-45b5-89f1-7ef6ab969e93",
      name: "Foxtrot",
      displayName: "Foxtrot",
      power: {
        power: 5,
        powerLevels: [5]
      },
      damage: {
        damaged: false,
        report: null,
        reportSteps: null,
        requested: false,
        currentStep: 0,
        reactivationCode: null,
        reactivationRequester: null,
        neededReactivationCode: null,
        exocompParts: [],
        validate: false,
        destroyed: false,
        which: "default"
      },
      extra: false,
      locations: [],
      requiredDamageSteps: [],
      optionalDamageSteps: [],
      clamps: true,
      compress: true,
      doors: true,
      image: "/Docking Images/Quicksilver.png",
      docked: true
    }
  ],
  coreLayouts: [],
  coreFeed: [],
  viewscreens: [],
  messages: [],
  tacticalMaps: [],
  officerLogs: [],
  exocomps: [],
  libraryDatabase: [],
  softwarePanels: [],
  surveyForms: [],
  objectives: [],
  keyboards: [],
  sounds: [],
  tasks: [],
  commandLine: [],
  triggerGroups: [],
  taskTemplates: [],
  taskReports: [],
  interfaces: [],
  interfaceDevices: [],
  macros: [],
  autoUpdate: true,
  thoriumId: randomWords(5).join("-"),
  doTrack: false,
  askedToTrack: false,
  addedTaskTemplates: false,
  spaceEdventuresToken: "",
  migrations: {
    assets: true
  },
  events: [],
  replaying: false,
  snapshotVersion: 2,
  version: 2,
  timestamp: "2018-08-15T14:11:54.203Z"
};
