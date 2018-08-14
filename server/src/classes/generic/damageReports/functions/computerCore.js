import { greekLetters, randomFromList } from "../constants";

export default (_, { name, stations, displayName = name }) => {
  // Find the station with the probe construction
  const station = stations.find(s =>
    s.cards.find(c => c.component === "ComputerCore")
  );
  const stationName = station ? station.name : "Computer Core";
  return `A user should be created in the computer core to repair the ${displayName} system. Ask the ${stationName} create a user with the following username and password:

  Level: #[1-10]
  Username: ${displayName} Repair
  Password: ${randomFromList(greekLetters) -
    Math.round(Math.random() * 10000)}-${randomFromList(greekLetters)}
  
  `;
};
