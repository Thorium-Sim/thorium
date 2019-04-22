export default (
  { name: teamName, orders, room, preamble },
  { name, displayName = name, location, stations }
) => {
  // Find the station with the security teams
  const station = stations.find(s =>
    s.cards.find(c => c.component === "SecurityTeams")
  );
  const stationName = station ? station.name : "Security Teams";
  return `${preamble ||
    `A security team should be dispatched to ensure there are no problems as the ${displayName} system is repaired.`}
Ask the ${stationName} officer to create the following security team:

Team Name: ${teamName || `${displayName} Detail`}
Orders: ${orders ||
    `Ensure there are no problems as the ${displayName} system is repaired.`}
Location: ${room || location}

`;
};
