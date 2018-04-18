export default (_, { name, displayName = name, stations }) => {
  // Find the station with the exocomps
  const station = stations.find(s =>
    s.cards.find(c => c.component === "Exocomps")
  );
  const stationName = station ? station.name : "Exocomp";
  return `An exocomp should be deployed to repair the damaged system. Ask the ${stationName} officer to deploy with the following settings:
  
  Destination: ${displayName}
  Parts: ${Array(Math.ceil(Math.random() * 3))
    .fill(0)
    .reduce(prev => {
      return prev + ", #PART";
    }, "#PART")}
  `;
};
