export const partsList = [
  "Field Generator",
  "Isolinear Rods",
  "Eps Step-down Conduit",
  "Fuel Regulator",
  "Field Emitter",
  "Sensor Pallet",
  "EPS Power Node",
  "Isolinear Chips",
  "Network Adapter",
  "Fusion Generator",
  "Magnetic Coil",
  "Analog Buffer",
  "Coaxial Servo",
  "CASM Generator",
  "Computer Interface",
  "Digital Sequence Encoder",
  "Fiberoptic Wire Linkage",
  "Fusion Welder",
  "Holographic Servo Display",
  "IDC Power Cable",
  "Integrated Fluid Sensor",
  "Magnetic Bolt Fastener",
  "Power Coupling",
  "Power Splitter",
  "Prefire Chamber",
  "Residual Power Store",
  "Subspace Transceiver"
];

export const defaultOptionalSteps = [
  { name: "damageTeam", args: {} },
  { name: "remoteAccess", args: {} },
  { name: "damageTeamMessage", args: {} },
  { name: "sendInventory", args: {} },
  { name: "longRangeMessage", args: {} },
  { name: "probeLaunch", args: {} }
];

export const damagePositions = [
  "Computer Specialist",
  "Custodian",
  "Quality Assurance",
  "Electrician",
  "Explosive Expert",
  "Fire Control",
  "General Engineer",
  "Hazardous Waste Expert",
  "Maintenance Officer",
  "Mechanic",
  "Plumber",
  "Structural Engineer",
  "Welder"
];

export const damageTexts = {
  "Computer Specialist": [
    {
      preamble:
        "The computer systems which run the %SYSTEM% system are malfunctioning.",
      orders:
        "Diagnose and repair the malfunctions to the %SYSTEM% systems computers."
    }
  ],
  "Quality Assurance": [
    {
      preamble:
        "An unknown systems error is causing faults in the %SYSTEM% system. A diagnostic must be performed.",
      orders:
        "Perform a level 3 diagnostic on the %SYSTEM% system and report your findings."
    }
  ],
  Electrician: [
    {
      preamble:
        "There has been a short in the electrical circuitry in the %SYSTEM% system.",
      orders: "Find and repair the short in the %SYSTEM% system circuitry."
    }
  ],
  "Explosive Expert": [
    {
      preamble:
        "A fault in the %SYSTEM% system is causing an overload, causing the system to potentially explode. The system must carefully be overridden.",
      orders:
        "Carefully diffuse the overload in the %SYSTEM% system before it explodes."
    }
  ],
  "Fire Control": [
    {
      preamble:
        "A fire has started in the %SYSTEM% system. Fire control officers must take care of the fire before it causes more damage.",
      orders: "Extinguish the fire in the %SYSTEM% system."
    }
  ],
  "General Engineer": [
    {
      preamble: "Due to regular use, the %SYSTEM% system requires maintenance.",
      orders: "Clean and maintain the %SYSTEM% system."
    }
  ],
  "Hazardous Waste Expert": [
    {
      preamble:
        "A chemical spill near the %SYSTEM% system has created hazard and disrupted system operations.",
      orders: "Clean up the chemical spill disrupting the %SYSTEM% system."
    }
  ],
  "Maintenance Officer": [
    {
      preamble: "Due to regular use, the %SYSTEM% system requires maintenance.",
      orders: "Clean and maintain the %SYSTEM% system."
    }
  ],
  Mechanic: [
    {
      preamble:
        "Mechanical parts in the %SYSTEM% system have siezed, causing the system to fail.",
      orders:
        "Discover and repair the siezed mechanical parts in the %SYSTEM% system."
    }
  ],
  Plumber: [
    {
      preamble: "Piping for the %SYSTEM% system has sprung a leak.",
      orders: "Find and repair the leak in the piping for the %SYSTEM% system."
    }
  ],
  "Structural Engineer": [
    {
      preamble:
        "Superstructure failures in the hull of the ship surrounding the %SYSTEM% system have triggered automated failsafes. The superstructure must be repaired before the system can operate.",
      orders:
        "Repair the superstructure failures surrounding the %SYSTEM% system."
    }
  ],
  Welder: [
    {
      preamble:
        "Metal seams in the %SYSTEM% system have become unstable. They must be repaired for the system to operate.",
      orders: "Re-weld the seams in the %SYSTEM% system."
    }
  ]
};

export function randomCode() {
  const codeWords = [
    "Alpha",
    "Beta",
    "Gamma",
    "Delta",
    "Epsilon",
    "Omicron",
    "Theta",
    "Phi"
  ];
  const codeWords2 = [
    "Ansible",
    "Cyber",
    "Matrix",
    "Naidon",
    "Skadov",
    "Memory",
    "Faraday",
    "Bernal",
    "Dyson"
  ];
  return `${randomFromList(codeWords)}-${Math.floor(
    Math.random() * 999
  )}-${randomFromList(codeWords2)}`;
}

export function randomFromList(list) {
  if (!list) return;
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}
