export default {
  flight: {
    id: "test",
    name: "deep-mysterious-herd",
    date: "2019-10-12T22:17:09.852Z",
    flightType: null,
    running: false,
    simulators: [
      {
        id: "test",
        name: "Voyager",
        layout: "LayoutCorners",
        stations: [
          {
            name: "Command",
            cards: [
              {
                name: "Status",
                hidden: false,
                component: "Status",
              },
              {
                name: "Self Destruct",
                hidden: false,
                component: "SelfDestruct",
              },
              {
                name: "ComputerCore",
                hidden: false,
                component: "ComputerCore",
              },
              {
                name: "Roster",
                hidden: false,
                component: "Roster",
              },
              {
                name: "CRM Fighter",
                hidden: false,
                component: "CrmFighter",
              },
            ],
            messageGroups: [],
          },
          {
            name: "Flight Control",
            cards: [
              {
                name: "Engines",
                hidden: false,
                component: "EngineControl",
              },
              {
                name: "Thrusters",
                hidden: false,
                component: "Thrusters",
              },
              {
                name: "Navigation",
                hidden: false,
                component: "Navigation",
              },
              {
                name: "Docking",
                hidden: false,
                component: "Docking",
              },
            ],
            messageGroups: [],
          },
          {
            name: "Engineering",
            cards: [
              {
                name: "Damage Report",
                hidden: false,
                component: "DamageControl",
              },
              {
                name: "Damage Teams",
                hidden: false,
                component: "DamageTeams",
              },
              {
                name: "Coolant",
                hidden: false,
                component: "CoolantControl",
              },
            ],
            messageGroups: ["DamageTeams"],
          },
          {
            name: "Tactical",
            cards: [
              {
                name: "Targeting",
                hidden: false,
                component: "Targeting",
              },
              {
                name: "Shields",
                hidden: false,
                component: "ShieldControl",
              },
              {
                name: "Stealth Field",
                hidden: false,
                component: "StealthField",
              },
              {
                name: "Tractor Beam",
                hidden: false,
                component: "TractorBeam",
              },
              {
                name: "Torpedos",
                hidden: false,
                component: "TorpedoLoading",
              },
              {
                name: "Phasers",
                hidden: false,
                component: "PhaserCharging",
              },
            ],
            messageGroups: [],
          },
          {
            name: "Operations",
            cards: [
              {
                name: "Power Distribution",
                hidden: false,
                component: "PowerDistribution",
              },
              {
                name: "Cargo Control",
                hidden: false,
                component: "CargoControl",
              },
              {
                name: "Reactor Control",
                hidden: false,
                component: "ReactorControl",
              },
              {
                name: "Transporters",
                hidden: false,
                component: "Transporters",
              },
              {
                name: "Shuttles",
                hidden: false,
                component: "Shuttles",
              },
            ],
            messageGroups: [],
          },
          {
            name: "Sensors",
            cards: [
              {
                name: "Sensors",
                hidden: false,
                component: "Sensors",
              },
              {
                name: "Scanning",
                hidden: false,
                component: "SensorScans",
              },
              {
                name: "Probe Construction",
                hidden: false,
                component: "ProbeConstruction",
              },
              {
                name: "Probe Control",
                hidden: false,
                component: "ProbeControl",
              },
              {
                name: "Probe Network",
                hidden: false,
                component: "ProbeNetwork",
              },
              {
                name: "Railgun",
                hidden: false,
                component: "Railgun",
              },
            ],
            messageGroups: [],
          },
          {
            name: "Comm",
            cards: [
              {
                name: "Short Range Comm",
                hidden: false,
                component: "CommShortRange",
              },
              {
                name: "Decoding",
                hidden: false,
                component: "CommDecoding",
              },
              {
                name: "Long Range Comm",
                hidden: false,
                component: "LongRangeComm",
              },
              {
                name: "Internal Comm",
                hidden: false,
                component: "CommInternal",
              },
              {
                name: "Signal Jammer",
                hidden: false,
                component: "SignalJammer",
              },
              {
                name: "Comm Review",
                hidden: false,
                component: "CommReview",
              },
            ],
            messageGroups: [],
          },
          {
            name: "Security",
            cards: [
              {
                name: "Deck Control",
                hidden: false,
                component: "SecurityDecks",
              },
              {
                name: "Security Scans",
                hidden: false,
                component: "SecurityScans",
              },
              {
                name: "Security Teams",
                hidden: false,
                component: "SecurityTeams",
              },
              {
                name: "Security Armory",
                hidden: false,
                component: "SecurityArmory",
              },
              {
                name: "Security Library",
                hidden: false,
                component: "SecurityLibrary",
              },
            ],
            messageGroups: ["SecurityTeams"],
          },
        ],
        assets: {
          mesh: "/Simulator/default/mesh.obj",
          texture: "/Simulator/default/texture.jpg",
          side: "/Simulator/default/side.png",
          top: "/Simulator/default/top.png",
          logo: "/Simulator/default/logo.svg",
          bridge: "/Simulator/default/bridge.svg",
        },
      },
    ],
  },

  clients: [
    {
      id: "phoenix-mvs.local",
      simulator: {
        id: "a334d67e-f832-48be-a10b-3727c02ff07e",
      },
      station: {
        name: "keyboard:b99676ad-833c-4d1c-b4f7-fd4952c09eff",
      },
      commandLineOutput: [
        'Welcome to Ubuntu 31.04.5 LTS (GNU/Linux 3.13.0-125-generic x86_64)\n  \n      System information\n    \n      System load:  0.26                Processes:           133\n      Usage of /:   63.7% of 147.51YB   Users logged in:     0\n      Memory usage: 85%                 IP address for eth0: 172.19.45.181\n      Swap usage:   0%\n    \n    79 packages can be updated.\n    60 updates are security updates.\n    \n    \n    Last login: ip-10-0-43-69.ec2.internal\n    \n    Type "help" to get a list of available commands',
      ],
      commandLineFeedback: [],
    },
    {
      id: "ECS-Viewscreen",
      simulator: {
        id: "a334d67e-f832-48be-a10b-3727c02ff07e",
      },
      station: {
        name: "Operations",
      },
      commandLineOutput: [
        'Welcome to Ubuntu 31.04.5 LTS (GNU/Linux 3.13.0-125-generic x86_64)\n  \n      System information\n    \n      System load:  0.26                Processes:           133\n      Usage of /:   63.7% of 147.51YB   Users logged in:     0\n      Memory usage: 85%                 IP address for eth0: 172.19.45.181\n      Swap usage:   0%\n    \n    79 packages can be updated.\n    60 updates are security updates.\n    \n    \n    Last login: ip-10-0-43-69.ec2.internal\n    \n    Type "help" to get a list of available commands',
      ],
      commandLineFeedback: [],
    },
  ],
  simulator: {
    id: "test",
    template: false,
    name: "Voyager",
    caps: false,
    alertlevel: "5",
    layout: "LayoutCorners",
    bridgeOfficerMessaging: true,
    training: false,
    hasPrinter: true,
    hasLegs: false,
    panels: [],
    assets: {
      mesh: "/Simulator/default/mesh.obj",
      texture: "/Simulator/default/texture.jpg",
      side: "/Simulator/default/side.png",
      top: "/Simulator/default/top.png",
      logo: "/Simulator/default/logo.svg",
      bridge: "/Simulator/default/bridge.svg",
    },
    soundEffects: {
      buttonClick: [],
      buttonHover: [],
      cardChange: [],
      notification: [],
      login: [],
      buttonClickVolume: 1,
      buttonHoverVolume: 1,
      cardChangeVolume: 1,
      notificationVolume: 1,
      loginVolume: 1,
    },
    stations: [
      {
        name: "Command",
        login: false,
        training: "",
        ambiance: "",
        executive: true,
        layout: null,
        messageGroups: [],
        widgets: [
          "composer",
          "calculator",
          "messages",
          "officerLog",
          "objectives",
        ],
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
          {
            name: "CRM Fighter",
            component: "CrmFighter",
            hidden: false,
          },
        ],
      },
      {
        name: "Flight Control",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: [],
        widgets: ["calculator", "messages", "officerLog"],
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
        name: "Engineering",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: ["DamageTeams"],
        widgets: [
          "calculator",
          "messages",
          "remote",
          "officerLog",
          "damageReport",
        ],
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
        name: "Tactical",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: [],
        widgets: ["calculator", "remote", "messages", "officerLog"],
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
        name: "Operations",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: [],
        widgets: ["composer", "calculator", "messages", "remote", "officerLog"],
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
          {
            name: "Command Line",
            component: "CommandLine",
          },
        ],
      },
      {
        name: "Sensors",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: [],
        widgets: ["calculator", "messages", "officerLog"],
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
          {
            name: "Railgun",
            component: "Railgun",
            hidden: false,
          },
        ],
      },
      {
        name: "Comm",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: [],
        widgets: ["composer", "calculator", "messages", "officerLog"],
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
        name: "Security",
        login: false,
        training: "",
        ambiance: "",
        executive: false,
        layout: null,
        messageGroups: ["SecurityTeams"],
        widgets: ["composer", "calculator", "messages", "officerLog"],
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
  clientObj: {
    id: "test",
    offlineState: "lockdown",
  },
  station: {
    name: "Test Station",
    widgets: [],
    cards: [],
    messageGroups: ["security"],
  },
};
