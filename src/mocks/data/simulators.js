export default [
  {
    id: "test",
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
    stations: [
      {
        cards: [
          {
            name: "Status",
            component: "Status",
            hidden: false,
          },
          {
            name: "Self Destruct",
            component: "SelfDestruct",
            hidden: false,
          },
          {
            name: "ComputerCore",
            component: "ComputerCore",
            hidden: false,
          },
          {
            name: "Roster",
            component: "Roster",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Engines",
            component: "EngineControl",
            hidden: false,
          },
          {
            name: "Thrusters",
            component: "Thrusters",
            hidden: false,
          },
          {
            name: "Navigation",
            component: "Navigation",
            hidden: false,
          },
          {
            name: "Docking",
            component: "Docking",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Damage Report",
            component: "DamageControl",
            hidden: false,
          },
          {
            name: "Damage Teams",
            component: "DamageTeams",
            hidden: false,
          },
          {
            name: "Coolant",
            component: "CoolantControl",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Targeting",
            component: "Targeting",
            hidden: false,
          },
          {
            name: "Shields",
            component: "ShieldControl",
            hidden: false,
          },
          {
            name: "Stealth Field",
            component: "StealthField",
            hidden: false,
          },
          {
            name: "Tractor Beam",
            component: "TractorBeam",
            hidden: false,
          },
          {
            name: "Torpedos",
            component: "TorpedoLoading",
            hidden: false,
          },
          {
            name: "Phasers",
            component: "PhaserCharging",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Power Distribution",
            component: "PowerDistribution",
            hidden: false,
          },
          {
            name: "Cargo Control",
            component: "CargoControl",
            hidden: false,
          },
          {
            name: "Reactor Control",
            component: "ReactorControl",
            hidden: false,
          },
          {
            name: "Transporters",
            component: "Transporters",
            hidden: false,
          },
          {
            name: "Shuttles",
            component: "Shuttles",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Sensors",
            component: "Sensors",
            hidden: false,
          },
          {
            name: "Scanning",
            component: "SensorScans",
            hidden: false,
          },
          {
            name: "Probe Construction",
            component: "ProbeConstruction",
            hidden: false,
          },
          {
            name: "Probe Control",
            component: "ProbeControl",
            hidden: false,
          },
          {
            name: "Probe Network",
            component: "ProbeNetwork",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Short Range Comm",
            component: "CommShortRange",
            hidden: false,
          },
          {
            name: "Decoding",
            component: "CommDecoding",
            hidden: false,
          },
          {
            name: "Long Range Comm",
            component: "LongRangeComm",
            hidden: false,
          },
          {
            name: "Internal Comm",
            component: "CommInternal",
            hidden: false,
          },
          {
            name: "Signal Jammer",
            component: "SignalJammer",
            hidden: false,
          },
          {
            name: "Comm Review",
            component: "CommReview",
            hidden: false,
          },
        ],
      },
      {
        cards: [
          {
            name: "Deck Control",
            component: "SecurityDecks",
            hidden: false,
          },
          {
            name: "Security Scans",
            component: "SecurityScans",
            hidden: false,
          },
          {
            name: "Security Teams",
            component: "SecurityTeams",
            hidden: false,
          },
          {
            name: "Security Armory",
            component: "SecurityArmory",
            hidden: false,
          },
          {
            name: "Security Library",
            component: "SecurityLibrary",
            hidden: false,
          },
        ],
      },
    ],
  },
];
