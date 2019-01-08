export function createTeam({
  team: { type, simulatorId, name, orders, priority }
}) {
  return { type, simulatorId, name, orders, priority };
}
