import {
  ARMORY_QUERY,
  ARMORY_CREW_SUB,
  ARMORY_ROOMS_SUB,
  ARMORY_TEAMS_SUB,
} from "components/cards/Armory";
import teams from "mocks/data/teams";
import rooms from "mocks/data/rooms";
import crew from "mocks/data/crew";
import {
  ARMORY_CORE_QUERY,
  ARMORY_CORE_CREW_SUB,
  ARMORY_CORE_TEAM_SUB,
} from "components/cards/Armory/core";

export const armoryMocks = [
  {
    request: {
      query: ARMORY_QUERY,
      variables: {
        simulatorId: "test",
        type: "security",
        roomRole: "securityTeam",
      },
    },
    result: {
      data: {
        crew: crew.filter(c => c.position.includes("Security")),
        rooms: rooms.filter(r => r.roles.includes("securityTeam")),
        teams: teams,
      },
    },
  },
  {
    request: {
      query: ARMORY_ROOMS_SUB,
      variables: {
        simulatorId: "test",
        roomRole: "securityTeam",
      },
    },
    result: {},
  },
  {
    request: {
      query: ARMORY_CREW_SUB,
      variables: {simulatorId: "test", teamType: "security"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: ARMORY_TEAMS_SUB,
      variables: {
        simulatorId: "test",
        teamType: "security",
      },
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: ARMORY_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        teams,
        crew,
      },
    },
  },
  {
    request: {
      query: ARMORY_CORE_CREW_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: ARMORY_CORE_TEAM_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
];
