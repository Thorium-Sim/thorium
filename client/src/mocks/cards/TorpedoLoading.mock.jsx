import {TORPEDO_QUERY, TORPEDO_SUB} from "../../cards/TorpedoLoading";
import {
  TORPEDO_CORE_QUERY,
  TORPEDO_CORE_SUB,
} from "../../cards/TorpedoLoading/core";
import systems from "../data/systems";

export default [
  {
    request: {query: TORPEDO_QUERY, variables: {simulatorId: "test"}},
    result: {
      data: {
        torpedos: systems.torpedos,
      },
    },
  },
  {
    request: {query: TORPEDO_SUB, variables: {simulatorId: "test"}},
    result: {
      data: {
        torpedosUpdate: systems.torpedos,
      },
    },
  },
  {
    request: {query: TORPEDO_CORE_QUERY, variables: {simulatorId: "test"}},
    result: {
      data: {
        torpedos: systems.torpedos,
      },
    },
  },
  {
    request: {query: TORPEDO_CORE_SUB, variables: {simulatorId: "test"}},
    result: {
      data: {
        torpedosUpdate: systems.torpedos,
      },
    },
  },
];
