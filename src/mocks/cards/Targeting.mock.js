import {
  TARGETING_QUERY,
  TARGETING_SUB,
  TARGETING_PHASERS_SUB,
} from "components/views/Targeting";
import systems from "../data/systems";
import {
  TARGETING_CORE_QUERY,
  TARGETING_CORE_SUB,
} from "components/views/Targeting/core";
export default [
  {
    request: {
      query: TARGETING_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {targeting: systems.targeting, phasers: systems.phasers},
    },
  },
  {
    request: {
      query: TARGETING_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {targetingUpdate: systems.targeting},
    },
  },
  {
    request: {
      query: TARGETING_PHASERS_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {phasersUpdate: systems.phasers},
    },
  },
  {
    request: {
      query: TARGETING_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {targeting: systems.targeting},
    },
  },
  {
    request: {
      query: TARGETING_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {targetingUpdate: systems.targeting},
    },
  },
];
