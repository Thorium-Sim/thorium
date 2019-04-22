import { randomFromList, greekLetters } from "../constants";

export default (
  { room, preamble, message },
  { name, displayName = name, location, stations }
) => {
  // Find the station with the internal comm
  const station = stations.find(s =>
    s.cards.find(c => c.component === "CommInternal")
  );
  const stationName = station ? station.name : "Telephone";
  const messageList = [
    `Run a level ${Math.floor(
      Math.random() * 5
    )} diagnostic on the ${displayName} system.`,
    `Activate the ${randomFromList(
      greekLetters
    )} protocol on the ${displayName} system.`,
    `Ensure there is no residual power flow in the ${displayName} system capacitors.`
  ];
  return `${preamble || `A message should be sent to the system's room.`}
Ask the ${stationName} officer to send the following internal message:

Room: ${room || location}
Message: ${message || randomFromList(messageList)}
`;
};
