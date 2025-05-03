import simulators from "../data/simulators";
import {
  CARDS_CORE_QUERY,
  CARDS_CORE_SUB,
} from "components/views/StationControl/core";

export default [
  {
    request: {
      query: CARDS_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulators,
      },
    },
  },
  {
    request: {
      query: CARDS_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
];
