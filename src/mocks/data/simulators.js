/*query Ship($simulatorId: ID!) {
  simulators(id: $simulatorId) {
    id
    template
    name
    caps
    alertlevel
    alertLevelLock
    layout
    bridgeOfficerMessaging
    training
    hasPrinter
    hasLegs
    panels
    stepDamage
    verifyStep
    triggersPaused
    ship {
      legs
      ramps
      clamps
      airlock
      velocity
      radiation
      bridgeCrew
      extraPeople
      inventoryLogs {
        log
        timestamp
        __typename
      }
      selfDestructTime
      selfDestructCode
      selfDestructAuto
      remoteAccessCodes {
        id
        code
        state
        station
        timestamp
        __typename
      }
      __typename
    }
    stations {
      name
      cards {
        name
        hidden
        component
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
    id: "e0b50c95-092b-4010-a08f-89fbdea782df",
    template: false,
    name: "Voyager",
    caps: false,
    alertlevel: "5",
    alertLevelLock: false,
    layout: "LayoutCorners",
    bridgeOfficerMessaging: true,
    training: false,
    hasPrinter: true,
    hasLegs: false,
    panels: [],
    stepDamage: true,
    verifyStep: false,
    triggersPaused: false,
    ship: {
      legs: false,
      ramps: false,
      clamps: false,
      airlock: false,
      velocity: null,
      radiation: 0.1,
      bridgeCrew: 14,
      extraPeople: 0,
      inventoryLogs: [],
      selfDestructTime: null,
      selfDestructCode: null,
      selfDestructAuto: false,
      remoteAccessCodes: [],
      __typename: "Ship",
    },
    stations: [
      {
        name: "Command",
        cards: [
          {
            name: "Status",
            hidden: false,
            component: "Status",
            __typename: "Card",
          },
          {
            name: "Self Destruct",
            hidden: false,
            component: "SelfDestruct",
            __typename: "Card",
          },
          {
            name: "ComputerCore",
            hidden: false,
            component: "ComputerCore",
            __typename: "Card",
          },
          {
            name: "Roster",
            hidden: false,
            component: "Roster",
            __typename: "Card",
          },
          {
            name: "CRM Fighter",
            hidden: false,
            component: "CrmFighter",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Flight Control",
        cards: [
          {
            name: "Engines",
            hidden: false,
            component: "EngineControl",
            __typename: "Card",
          },
          {
            name: "Thrusters",
            hidden: false,
            component: "Thrusters",
            __typename: "Card",
          },
          {
            name: "Navigation",
            hidden: false,
            component: "Navigation",
            __typename: "Card",
          },
          {
            name: "Docking",
            hidden: false,
            component: "Docking",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Engineering",
        cards: [
          {
            name: "Damage Report",
            hidden: false,
            component: "DamageControl",
            __typename: "Card",
          },
          {
            name: "Damage Teams",
            hidden: false,
            component: "DamageTeams",
            __typename: "Card",
          },
          {
            name: "Coolant",
            hidden: false,
            component: "CoolantControl",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Tactical",
        cards: [
          {
            name: "Targeting",
            hidden: false,
            component: "Targeting",
            __typename: "Card",
          },
          {
            name: "Shields",
            hidden: false,
            component: "ShieldControl",
            __typename: "Card",
          },
          {
            name: "Stealth Field",
            hidden: false,
            component: "StealthField",
            __typename: "Card",
          },
          {
            name: "Tractor Beam",
            hidden: false,
            component: "TractorBeam",
            __typename: "Card",
          },
          {
            name: "Torpedos",
            hidden: false,
            component: "TorpedoLoading",
            __typename: "Card",
          },
          {
            name: "Phasers",
            hidden: false,
            component: "PhaserCharging",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Operations",
        cards: [
          {
            name: "Power Distribution",
            hidden: false,
            component: "PowerDistribution",
            __typename: "Card",
          },
          {
            name: "Cargo Control",
            hidden: false,
            component: "CargoControl",
            __typename: "Card",
          },
          {
            name: "Reactor Control",
            hidden: false,
            component: "ReactorControl",
            __typename: "Card",
          },
          {
            name: "Transporters",
            hidden: false,
            component: "Transporters",
            __typename: "Card",
          },
          {
            name: "Shuttles",
            hidden: false,
            component: "Shuttles",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Sensors",
        cards: [
          {
            name: "Sensors",
            hidden: false,
            component: "Sensors",
            __typename: "Card",
          },
          {
            name: "Scanning",
            hidden: false,
            component: "SensorScans",
            __typename: "Card",
          },
          {
            name: "Probe Construction",
            hidden: false,
            component: "ProbeConstruction",
            __typename: "Card",
          },
          {
            name: "Probe Control",
            hidden: false,
            component: "ProbeControl",
            __typename: "Card",
          },
          {
            name: "Probe Network",
            hidden: false,
            component: "ProbeNetwork",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Comm",
        cards: [
          {
            name: "Short Range Comm",
            hidden: false,
            component: "CommShortRange",
            __typename: "Card",
          },
          {
            name: "Decoding",
            hidden: false,
            component: "CommDecoding",
            __typename: "Card",
          },
          {
            name: "Long Range Comm",
            hidden: false,
            component: "LongRangeComm",
            __typename: "Card",
          },
          {
            name: "Internal Comm",
            hidden: false,
            component: "CommInternal",
            __typename: "Card",
          },
          {
            name: "Signal Jammer",
            hidden: false,
            component: "SignalJammer",
            __typename: "Card",
          },
          {
            name: "Comm Review",
            hidden: false,
            component: "CommReview",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Security",
        cards: [
          {
            name: "Deck Control",
            hidden: false,
            component: "SecurityDecks",
            __typename: "Card",
          },
          {
            name: "Security Scans",
            hidden: false,
            component: "SecurityScans",
            __typename: "Card",
          },
          {
            name: "Security Teams",
            hidden: false,
            component: "SecurityTeams",
            __typename: "Card",
          },
          {
            name: "Security Armory",
            hidden: false,
            component: "SecurityArmory",
            __typename: "Card",
          },
          {
            name: "Security Library",
            hidden: false,
            component: "SecurityLibrary",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
    ],
    __typename: "Simulator",
  },
];
