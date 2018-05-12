import { damagePositions, damageTexts, randomFromList } from "../constants";

export default (
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
