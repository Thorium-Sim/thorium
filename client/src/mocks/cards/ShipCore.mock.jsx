import {SHIP_CORE_QUERY, SHIP_CORE_SUB, POP_SUB} from "@client/cards/Ship/core";
import simulators from "../data/simulators";
export default [
  {
    request: {
      query: SHIP_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulators,
        crewCount: 336,
      },
    },
  },
  {
    request: {
      query: SHIP_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulatorsUpdate: simulators,
      },
    },
  },
  {
    request: {
      query: POP_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        crewCountUpdate: 320,
      },
    },
  },
];
