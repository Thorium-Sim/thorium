import {
  INTERCEPTION_QUERY,
  INTERCEPTION_SUB,
} from "../../cards/CommInterception/index.jsx";
import {
  INTERCEPTION_CORE_QUERY,
  INTERCEPTION_CORE_SUB,
} from "../../cards/CommInterception/core.jsx";
import systems from "../data/systems";

export default [
  {
    request: {
      query: INTERCEPTION_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        longRangeCommunications: systems.longRangeCommunications,
      },
    },
  },
  {
    request: {
      query: INTERCEPTION_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: INTERCEPTION_CORE_QUERY,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {
        longRangeCommunications: systems.longRangeCommunications,
      },
    },
  },
  {
    request: {
      query: INTERCEPTION_CORE_SUB,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {},
    },
  },
];
