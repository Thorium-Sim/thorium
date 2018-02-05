import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import Team from "../classes/teams";
import uuid from "uuid";

App.on("createTeam", ({ team }) => {
  App.teams.push(new Team(team));
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: team.simulatorId,
    station: "Core",
    title: `New ${team.type} team`,
    body: team.name,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: team.simulatorId,
      title: `New ${team.type} team`,
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("teamsUpdate", App.teams);
});
App.on("updateTeam", ({ team }) => {
  const updateTeam = App.teams.find(t => t.id === team.id);
  updateTeam.update(team);
  pubsub.publish("teamsUpdate", App.teams);
});
App.on("addCrewToTeam", ({ teamId, crewId }) => {
  const team = App.teams.find(t => t.id === teamId);
  team.addOfficer(crewId);
  pubsub.publish("teamsUpdate", App.teams);
});
App.on("removeCrewFromTeam", ({ teamId, crewId }) => {
  const team = App.teams.find(t => t.id === teamId);
  team.removeOfficer(crewId);
  pubsub.publish("teamsUpdate", App.teams);
});
App.on("removeTeam", ({ teamId }) => {
  App.teams = App.teams.filter(t => t.id !== teamId);
  pubsub.publish("teamsUpdate", App.teams);
});
