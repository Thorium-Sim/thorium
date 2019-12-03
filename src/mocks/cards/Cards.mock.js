import {
  CARDS_CORE_QUERY,
  CARDS_CORE_SUB,
} from "../../components/views/Cards/core";
import simulators from "../data/simulators";

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
