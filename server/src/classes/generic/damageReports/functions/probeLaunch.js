export default (
  { equipment, query, preamble },
  { name, stations, displayName = name }
) => {
  // Find the station with the probe construction
  const station = stations.find(s =>
    s.cards.find(c => c.component === "ProbeConstruction")
  );
  const stationName = station ? station.name : "Probe Construction";
  return `${preamble ||
    `A probe should be launched to check on the repair status of the ${displayName} system.`} Ask the ${stationName} officer to launch a probe. Then have them perform this query:
    
Query: ${query || `Status of ${displayName} system.`}
    
If they query returns a positive response, continue with the damage report.`;
};
