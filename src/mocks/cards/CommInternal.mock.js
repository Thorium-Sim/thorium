import {
  INTERNAL_COMM_QUERY,
  INTERNAL_COMM_SUB,
} from "components/views/CommInternal";
import systems from "../data/systems";
import decks from "../data/decks";
import {
  INTERNAL_COMM_CORE_QUERY,
  INTERNAL_COMM_CORE_SUB,
} from "components/views/CommInternal/core";
export default [
  {
    request: {
      query: INTERNAL_COMM_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        internalComm: systems.internalComm,
        decks,
      },
    },
  },
  {
    request: {
      query: INTERNAL_COMM_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: INTERNAL_COMM_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {data: {internalComm: systems.internalComm, decks}},
  },
  {
    request: {query: INTERNAL_COMM_CORE_SUB, variables: {simulatorId: "test"}},
    result: {data: {}},
  },
];
