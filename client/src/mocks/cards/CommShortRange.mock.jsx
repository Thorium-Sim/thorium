import {
  COMM_SHORT_RANGE_QUERY,
  COMM_SHORT_RANGE_SUB,
} from "components/cards/CommShortRange";
import systems from "mocks/data/systems";
import {
  COMM_SHORT_RANGE_CORE_QUERY,
  COMM_SHORT_RANGE_CORE_SUB,
} from "components/cards/CommShortRange/core";

export default [
  {
    request: {
      query: COMM_SHORT_RANGE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        shortRangeComm: systems.shortRangeComm,
      },
    },
  },
  {
    request: {
      query: COMM_SHORT_RANGE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: COMM_SHORT_RANGE_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        shortRangeComm: systems.shortRangeComm,
      },
    },
  },
  {
    request: {
      query: COMM_SHORT_RANGE_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
];
