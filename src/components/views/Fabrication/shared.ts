// Constants shared by the crew card, the FD core, and the simulator config
// screen. Keep this module free of component imports so any surface can pull
// it in without dragging the others along.
export const MAX_SLOTS = 4;

export const categoryLabels: {[key: string]: string} = {
  repair: "Repair",
  weapon: "Weapons",
  probe: "Probes",
  upgrade: "Upgrades",
  science: "Science",
  misc: "General",
};
