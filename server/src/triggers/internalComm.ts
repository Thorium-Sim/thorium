import App from "../app";

export function internalCommCallOutgoing({id, simulatorId, outgoing}) {
  if (simulatorId) return {simulatorId};
  const system = App.systems.find(s => s.id === id);
  return {
    simulatorId: system.simulatorId,
    allDecks: outgoing === "All Decks" ? "true" : "false",
  };
}
