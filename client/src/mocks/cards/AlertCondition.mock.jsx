import simulators from "../data/simulators";
import {ALERT_QUERY, ALERT_SUB} from "@client/cards/AlertCondition";
import {
  ALERT_CORE_QUERY,
  ALERT_CORE_SUB,
} from "@client/cards/AlertCondition/core";

export const alertConditionMocks = [
  {
    request: {
      query: ALERT_QUERY,
      variables: {
        id: "test",
      },
    },
    result: {
      data: {
        simulators,
      },
    },
  },
  {
    request: {
      query: ALERT_SUB,
      variables: {id: "test"},
    },
    result: {
      data: {
        simulators,
      },
    },
  },
  {
    request: {
      query: ALERT_CORE_QUERY,
      variables: {
        id: "test",
      },
    },
    result: {
      data: {
        simulators,
      },
    },
  },
  {
    request: {
      query: ALERT_CORE_SUB,
      variables: {id: "test"},
    },
    result: {
      data: {
        simulators,
      },
    },
  },
];
