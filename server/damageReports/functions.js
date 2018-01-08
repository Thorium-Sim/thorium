import App from "../app";
import {
  damagePositions,
  damageTexts,
  randomCode,
  randomFromList,
  greekLetters
} from "./constants";

export const power = ({ end }, { name, displayName = name, stations }) => {
  const station = stations.find(s =>
    s.cards.find(c => c.component === "PowerDistribution")
  );
  const officer = station ? station.name : "Power Distribution";
  if (!end) {
    return `The ${displayName} system needs to be shut off so it can be repaired. Ask the ${officer} officer to remove all power from the ${displayName} system.`;
  }
  return `The repairs are complete. Ask the ${officer} officer to return power to the ${displayName} system.`;
};

export const damageTeam = (
  { end, cleanup, name: teamName, orders, room, preamble, type },
  { damageSteps, name, displayName = name, location },
  index
) => {
  if (end) {
    // Find the previous damage team.
    let team = null;
    for (let i = index; i >= 0; i--) {
      if (damageSteps[i].name === "damageTeam" && !damageSteps[i].args.end) {
        team = damageSteps[i];
      }
    }
    let oldTeamName = null;
    if (!team || !team.args.teamName) {
      oldTeamName =
        displayName +
        (cleanup || (team && team.args.cleanup) ? " Cleanup" : " Repair");
    }
    return `Before continuing on, you need to wait for the damage team named '${oldTeamName}' to finish their work. Once the damage team named '${oldTeamName}' disappears from the list of damage teams, you can continue on.
      
You can send a message to the damage team to check on their progress.`;
  }
  if (cleanup) {
    return `Now a work order should be created to have the custodians clean up the mess left from repairing the damage to the ${displayName} system. Create the following work order:
      
Damage Team Name: ${displayName} Cleanup
Location: ${location}
Officers: ${Math.floor(Math.random() * 2 + 1)} Custodian(s)
Orders: Clean up the mess left from repairing the ${displayName} system.
      `;
  }
  const teamType = type
    ? type
    : randomFromList(damagePositions.filter(p => p.position !== "Custodian"));
  const damageText = randomFromList(damageTexts[teamType]);
  return `${preamble ||
    damageText.preamble.replace(
      "%SYSTEM%",
      displayName
    )} Create the following work order:
      
Damage Team Name: ${teamName || displayName + " Repair"}
Location: ${room || location}
Officers: ${Math.floor(Math.random() * 2 + 1)} ${teamType}(s)
Orders: ${orders || damageText.orders.replace("%SYSTEM%", displayName)}
      `;
};

export const damageTeamMessage = (
  { message },
  { name, displayName = name }
) => {
  return `Send a message to your damage team:
    
Message: ${message ||
    `What is your assessment of the damage to the ${displayName} system?`}
    
Wait for a response and follow the instructions they provide. 
    `;
};

export const remoteAccess = (
  { code = randomCode(), backup = randomCode() },
  { stations }
) => {
  const station = stations.find(s => s.widgets.indexOf("remote") > -1);
  const officer = station ? station.name : "Remote Access";
  return `Ask the ${officer} officer to send the following remote access code: ${code}.
    
If the code is rejected, have them send a backup remote access code: ${backup}`;
};

export const sendInventory = (
  { inventory, room },
  { location, name, displayName = name, stations, simulatorId }
) => {
  // Find the station with the cargo control
  const station = stations.find(s =>
    s.cards.find(c => c.component === "CargoControl")
  );
  const stationName = station ? station.name : "Cargo Control";
  return `Supplies will be needed to repair the ${displayName} system. Ask the ${stationName} officer to send the following cargo:
    
Location: ${room || location}
Cargo: ${inventory ||
    (App.inventory.filter(i => i.simulatorId === simulatorId).length &&
      Array(Math.floor(Math.random() * 3 + 1))
        .fill(0)
        .map(
          () =>
            randomFromList(
              App.inventory.filter(i => i.simulatorId === simulatorId)
            ).name
        )
        .filter((c, i, a) => a.indexOf(c) === i)
        .map(i => Math.floor(Math.random() * 4 + 1) + " " + i))}
    `;
};

export const longRangeMessage = (
  { message, destination },
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

  return `We should inform the closest starbase of our situation. You need to prepare a message using your long range message composer, or ask the ${stationName} officer to send this message:

Destination: ${destination || randomFromList(destinations)}
Message: ${message || randomFromList(messages)}
`;
};

export const probeLaunch = (
  { equipment, query },
  { name, stations, displayName = name }
) => {
  // Find the station with the probe construction
  const station = stations.find(s =>
    s.cards.find(c => c.component === "ProbeConstruction")
  );
  const stationName = station ? station.name : "Probe Construction";
  return `A probe should be launched to check on the repair status of the ${displayName} system. Ask the ${stationName} officer to launch a probe. Then have them perform this query:
    
Query: ${query || `Status of ${displayName} system.`}
    
If they query returns a positive response, continue with the damage report.`;
};

export const generic = ({ message }) => {
  if (!message) return "";
  return message;
};

export const finish = ({ reactivate }) => {
  return `If you followed the steps properly, the system has been repaired. ${
    reactivate
      ? "Enter the following reactivation code to reactivate the system: #REACTIVATIONCODE"
      : ""
  }`;
};

export const securityTeam = (
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

export const securityEvac = ({ room, preamble }, { location, stations }) => {
  // Find the station with the security decks
  const station = stations.find(s =>
    s.cards.find(c => c.component === "SecurityDecks")
  );
  const stationName = station ? station.name : "Security Decks";
  return `${preamble ||
    `For safety, the deck where the damage is should be evacuated and sealed.`}
Ask the ${stationName} officer to evacuate and seal the entire deck where the damage is: ${
    room ? `Deck ${room}` : location
  }
  `;
};

export const internalCall = (
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
  return `${preamble || `A call should be made to the system's room.`}
Ask the ${stationName} officer to make the following internal call:

Room: ${room || location}
Message: ${message || randomFromList(messageList)}
`;
};

export const exocomps = (_, { name, displayName = name, stations }) => {
  // Find the station with the internal comm
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
