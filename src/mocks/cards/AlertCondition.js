import simulators from "../data/simulators";
import {ALERT_QUERY, ALERT_SUB} from "components/views/AlertCondition";
import {
  ALERT_CORE_QUERY,
  ALERT_CORE_SUB,
} from "components/views/AlertCondition/core";

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
];
export const alertConditionCoreMocks = [
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
