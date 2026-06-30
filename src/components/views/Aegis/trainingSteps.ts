// Guided-tour steps for the crew card, keyed to elements by CSS selector.
export const trainingSteps = [
  {
    selector: ".nothing",
    content:
      "The Aegis System controls a fleet of small computer-controlled utility drones. The drones fly in formation around your ship and can protect it, interfere with enemy systems, boost your sensors, or assist with hull repairs.",
  },
  {
    selector: ".aegis-fabrication",
    content:
      "Drones are fabricated in batches of ten by the ship. Click this button to begin fabrication. Keep an eye on your drone count - drones deployed in space slowly wear out and can be destroyed, so you may need to fabricate replacements.",
  },
  {
    selector: ".aegis-deploy",
    content:
      "Once you have drones ready, click this button to launch the swarm. You can recall the swarm at any time to protect it.",
  },
  {
    selector: ".aegis-modes",
    content:
      "These buttons control the swarm's behavior. Defensive Screen keeps the drones in a tight orbit to deflect incoming attacks. Interference spreads them wide to jam enemy sensors. Sensor Relay forms a halo that extends your sensor range. Repair Swarm brings the drones close to the hull to assist with repairs.",
  },
  {
    selector: ".aegis-secondary",
    content:
      "Each mode has a fine control. Aim the defensive screen toward the direction attacks are coming from, tune jamming intensity, choose what the relay boosts, or set how hard the repair swarm works. Working the drones harder wears them out faster.",
  },
  {
    selector: ".aegis-canvas",
    content:
      "This display shows your drones flying around the ship. Watch how their formation changes when you select a different mode. The ship itself glows red as its structural integrity weakens, and drones flare up when they absorb an incoming hit. Ship actions like outgoing transmissions and sensor scans appear here too.",
  },
  {
    selector: ".aegis-log",
    content:
      "The activity log records where your decisions made a difference - damage your screen absorbed, repairs completed, and signals your relay amplified.",
  },
];
