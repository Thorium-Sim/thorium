import {
  PROBES_QUERY,
  PROBES_SUB,
} from "../../components/cards/ProbeConstruction";
import systems from "../data/systems";
export default [
  {
    request: {
      query: PROBES_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        probes: systems.probes,
      },
    },
  },
  {
    request: {
      query: PROBES_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        probesUpdate: systems.probes,
      },
    },
  },
];
