import {TEAMS_QUERY, TEAM_SUB, CREW_SUB} from "components/views/Teams";
import teams from "../data/teams";
import decks from "../data/decks";
import crew from "../data/crew";
import {
  TEAMS_CORE_QUERY,
  TEAMS_CORE_SUB,
  TEAMS_CREW_CORE_SUB,
} from "components/views/Teams/core";
export default [
  {
    request: {
      query: TEAMS_QUERY,
      variables: {simulatorId: "test", teamType: "security"},
    },
    result: {
      data: {
        crew: crew.filter(c => c.position.includes("Security")),
        teams,
        decks,
      },
    },
  },
  {
    request: {
      query: TEAM_SUB,
      variables: {simulatorId: "test", teamType: "security"},
    },
    result: {
      data: {
        teamsUpdate: teams,
      },
    },
  },
  {
    request: {
      query: CREW_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        crewUpdate: crew.filter(c => c.position.includes("Security")),
      },
    },
  },
  {
    request: {
      query: TEAMS_CORE_QUERY,
      variables: {simulatorId: "test", teamType: "security"},
    },
    result: {
      data: {
        crewCount: crew.length,
        teams,
        decks,
      },
    },
  },
  {
    request: {
      query: TEAMS_CORE_SUB,
      variables: {simulatorId: "test", teamType: "security"},
    },
    result: {
      data: {
        teamsUpdate: teams,
      },
    },
  },
  {
    request: {
      query: TEAMS_CREW_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        crewCountUpdate: crew.length,
      },
    },
  },
];
