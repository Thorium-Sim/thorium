import {CREW_QUERY, CREW_SUB} from "components/views/Crew/core";
import crew from "../data/crew";

export default [
  {
    request: {
      query: CREW_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        crew,
      },
    },
  },
  {
    request: {
      query: CREW_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
];
