export default () => [
  {
    class: "TaskTemplate",
    name: "Repair: Computer Specialist Team",
    values: {
      preamble:
        "The computer systems which run the #SYSTEMNAME system are malfunctioning.",
      orders:
        "Diagnose and repair the malfunctions to the #SYSTEMNAME systems computers.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Computer Specialist": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Quality Assurance Team",
    values: {
      preamble:
        "An unknown systems error is causing faults in the #SYSTEMNAME system. A diagnostic must be performed.",
      orders:
        "Perform a level 3 diagnostic on the #SYSTEMNAME system and report your findings.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Quality Assurance": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Electrician Team",
    values: {
      preamble:
        "There has been a short in the electrical circuitry in the #SYSTEMNAME system.",
      orders: "Find and repair the short in the #SYSTEMNAME system circuitry.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        Electrician: 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Explosive Expert Team",
    values: {
      preamble:
        "A fault in the #SYSTEMNAME system is causing an overload, causing the system to potentially explode. The system must carefully be overridden.",
      orders:
        "Carefully diffuse the overload in the #SYSTEMNAME system before it explodes.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Explosive Expert": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Fire Control Team",
    values: {
      preamble:
        "A fire has started in the #SYSTEMNAME system. Fire control officers must take care of the fire before it causes more damage.",
      orders: "Extinguish the fire in the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Fire Control": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: General Engineer Team",
    values: {
      preamble:
        "Due to regular use, the #SYSTEMNAME system requires maintenance.",
      orders: "Clean and maintain the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "General Engineer": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Hazardous Waste Expert Team",
    values: {
      preamble:
        "A chemical spill near the #SYSTEMNAME system has created hazard and disrupted system operations.",
      orders: "Clean up the chemical spill disrupting the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Hazardous Waste Expert": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Maintenance Officer Team",
    values: {
      preamble:
        "Due to regular use, the #SYSTEMNAME system requires maintenance.",
      orders: "Clean and maintain the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Maintenance Officer": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Mechanic Team",
    values: {
      preamble:
        "Mechanical parts in the #SYSTEMNAME system have siezed, causing the system to fail.",
      orders:
        "Discover and repair the siezed mechanical parts in the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        Mechanic: 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Plumber Team",
    values: {
      preamble: "Piping for the #SYSTEMNAME system has sprung a leak.",
      orders:
        "Find and repair the leak in the piping for the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        Plumber: 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Structural Engineer Team",
    values: {
      preamble:
        "Superstructure failures in the hull of the ship surrounding the #SYSTEMNAME system have triggered automated failsafes. The superstructure must be repaired before the system can operate.",
      orders:
        "Repair the superstructure failures surrounding the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        "Structural Engineer": 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Welder Team",
    values: {
      preamble:
        "Metal seams in the #SYSTEMNAME system have become unstable. They must be repaired for the system to operate.",
      orders: "Re-weld the seams in the #SYSTEMNAME system.",
      teamName: "#SYSTEMNAME Repairs",
      officers: {
        Welder: 1
      }
    },
    definition: "Send Damage Team",
    reportTypes: ["default"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Transfer Cargo",
    values: {
      preamble:
        "Cargo will need to be transferred to properly repair the #SYSTEMNAME system."
    },
    definition: "Transfer Cargo",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Create User",
    values: {
      preamble:
        "A user will need to be created to properly repair the #SYSTEMNAME system.",
      level: "7",
      password: "fixit",
      username: "#SYSTEMNAME Repair"
    },
    definition: "Create User",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Evacuate and Seal Deck",
    values: {
      preamble:
        "For safety, the deck where the damage is should be evacuated and sealed."
    },
    definition: "Evacuate and Seal Deck",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Send Exocomp",
    values: {
      preamble: "An exocomp must be sent to repair the damaged system.",
      parts: ["Network Adapter", "Field Generator", "Integrated Fluid Sensor"]
    },
    definition: "Send Exocomp",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Internal Call",
    values: {
      message:
        "Ensure there is no residual power flow in the #SYSTEMNAME capacitors.",
      preamble:
        "A call must be to the room that controls the #SYSTEMNAME system."
    },
    definition: "Internal Call",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Intership Message",
    values: {
      destination: "#SYSTEMNAME Repair",
      preamble: "Check on the damage team.",
      message:
        "What is your assessment of the damage to the #SYSTEMNAME system?"
    },
    definition: "Compose Intership Message",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Long Range Message 1",
    values: {
      preamble: "We should inform the closest starbase of our situation.",
      destination: "",
      message:
        "Our #SYSTEMNAME system has taken damage. It will need a full refurbishment when we return."
    },
    definition: "Compose Long Range Message",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Long Range Message 2",
    values: {
      preamble: "We should inform the closest starbase of our situation.",
      destination: "",
      message:
        "We have taken damage to our #SYSTEMNAME system. We might need assistance if the damage worsens. What ships are near our position?"
    },
    definition: "Compose Long Range Message",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Long Range Message 3",
    values: {
      preamble: "We should inform the closest starbase of our situation.",
      message:
        "Due to damage to our #SYSTEMNAME we will need additional supplies when we return to starbase. Please ensure the necessary supplies are ready."
    },
    definition: "Compose Long Range Message",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Launch a Probe",
    values: {
      preamble:
        "A probe should be launched to monitor the status of the repair.",
      probeType: "class-ii",
      equipment: {
        "video-camera": 2,
        "Sensors Array": 2
      }
    },
    definition: "Launch a Probe",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Remote Access Code",
    values: {},
    definition: "Send Remote Access Code",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  },
  {
    class: "TaskTemplate",
    name: "Repair: Security Team",
    values: {
      teamName: "#SYSTEMNAME Repair Detail",
      preamble:
        "A security team should be dispatched to ensure the safety of the crew.",
      orders:
        "Make sure no unauthorized personnel enter the area that is being repaired."
    },
    definition: "Send Security Team",
    reportTypes: ["default", "rnd", "engineering"],
    macros: []
  }
];
