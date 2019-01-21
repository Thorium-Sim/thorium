const uuid = require("uuid");
const damageTexts = {
  "Computer Specialist": [
    {
      preamble:
        "The computer systems which run the #SYSTEMNAME system are malfunctioning.",
      orders:
        "Diagnose and repair the malfunctions to the #SYSTEMNAME systems computers."
    }
  ],
  "Quality Assurance": [
    {
      preamble:
        "An unknown systems error is causing faults in the #SYSTEMNAME system. A diagnostic must be performed.",
      orders:
        "Perform a level 3 diagnostic on the #SYSTEMNAME system and report your findings."
    }
  ],
  Electrician: [
    {
      preamble:
        "There has been a short in the electrical circuitry in the #SYSTEMNAME system.",
      orders: "Find and repair the short in the #SYSTEMNAME system circuitry."
    }
  ],
  "Explosive Expert": [
    {
      preamble:
        "A fault in the #SYSTEMNAME system is causing an overload, causing the system to potentially explode. The system must carefully be overridden.",
      orders:
        "Carefully diffuse the overload in the #SYSTEMNAME system before it explodes."
    }
  ],
  "Fire Control": [
    {
      preamble:
        "A fire has started in the #SYSTEMNAME system. Fire control officers must take care of the fire before it causes more damage.",
      orders: "Extinguish the fire in the #SYSTEMNAME system."
    }
  ],
  "General Engineer": [
    {
      preamble:
        "Due to regular use, the #SYSTEMNAME system requires maintenance.",
      orders: "Clean and maintain the #SYSTEMNAME system."
    }
  ],
  "Hazardous Waste Expert": [
    {
      preamble:
        "A chemical spill near the #SYSTEMNAME system has created hazard and disrupted system operations.",
      orders: "Clean up the chemical spill disrupting the #SYSTEMNAME system."
    }
  ],
  "Maintenance Officer": [
    {
      preamble:
        "Due to regular use, the #SYSTEMNAME system requires maintenance.",
      orders: "Clean and maintain the #SYSTEMNAME system."
    }
  ],
  Mechanic: [
    {
      preamble:
        "Mechanical parts in the #SYSTEMNAME system have siezed, causing the system to fail.",
      orders:
        "Discover and repair the siezed mechanical parts in the #SYSTEMNAME system."
    }
  ],
  Plumber: [
    {
      preamble: "Piping for the #SYSTEMNAME system has sprung a leak.",
      orders:
        "Find and repair the leak in the piping for the #SYSTEMNAME system."
    }
  ],
  "Structural Engineer": [
    {
      preamble:
        "Superstructure failures in the hull of the ship surrounding the #SYSTEMNAME system have triggered automated failsafes. The superstructure must be repaired before the system can operate.",
      orders:
        "Repair the superstructure failures surrounding the #SYSTEMNAME system."
    }
  ],
  Welder: [
    {
      preamble:
        "Metal seams in the #SYSTEMNAME system have become unstable. They must be repaired for the system to operate.",
      orders: "Re-weld the seams in the #SYSTEMNAME system."
    }
  ]
};

const template = {
  id: "eb730ff7-d60b-4c29-82ff-ae445a5e0b55",
  name: "Computer Specialist Team",
  values: {
    preamble:
      "The computer systems which run the #SYSTEMNAME system are malfunctioning.",
    orders:
      "Diagnose and repair the malfunctions to the #SYSTEMNAME systems computers.",
    teamName: "#SYSTEMNAME Repairs",
    officers: {
      "Computer Specialist": 2
    }
  },
  definition: "Send Damage Team",
  reportTypes: ["default", "rnd", "engineering"]
};

const report = Object.entries(damageTexts).map(([key, value]) => ({
  id: uuid.v4(),
  name: `${key} Team`,
  class: "TaskTemplate",
  values: {
    preamble: value[0].preamble,
    orders: value[0].orders,
    teamName: "#SYSTEMNAME Repairs",
    officers: {
      [key]: 1
    }
  },
  definition: "Send Damage Team",
  reportTypes: ["default"]
}));

console.log(JSON.stringify(report));
