export default ({ end }, { name, displayName = name, stations }) => {
  const station = stations.find(s =>
    s.cards.find(c => c.component === "PowerDistribution")
  );
  const officer = station ? station.name : "Power Distribution";
  if (!end) {
    return `The ${displayName} system needs to be shut off so it can be repaired. Ask the ${officer} officer to remove all power from the ${displayName} system.`;
  }
  return `The repairs are complete. Ask the ${officer} officer to return power to the ${displayName} system.`;
};
