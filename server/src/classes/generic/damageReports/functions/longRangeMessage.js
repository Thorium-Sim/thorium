import { randomFromList } from "../constants";
export default (
  { message, destination, preamble },
  { name, stations, displayName = name }
) => {
  // Find the station with the cargo control
  const station = stations.find(s =>
    s.cards.find(c => c.component === "LongRangeComm")
  );
  const stationName = station ? station.name : "Long Range Communications";
  const destinations = ["Starbase 4", "Starbase 74", "Rigel 4", "Starbase 101"];
  const messages = [
    `Our ${displayName} system has taken damage. It will need a full refurbishment when we return.`,
    `We have taken damage to our ${displayName} system. We might need assistance if the damage worsens. What ships are near our position?`,
    `Due to damage to our ${displayName} we will need additional supplies when we return to starbase. Please ensure the necessary supplies are ready.`
  ];

  return `${preamble ||
    "We should inform the closest starbase of our situation."} You need to prepare a message using your long range message composer, or ask the ${stationName} officer to send this message:

Destination: ${destination || randomFromList(destinations)}
Message: ${message || randomFromList(messages)}
`;
};
