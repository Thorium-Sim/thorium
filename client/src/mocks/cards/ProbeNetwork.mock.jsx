import {PROBE_NETWORK_QUERY, PROBE_NETWORK_SUB} from "../../cards/ProbeNetwork";
import {
  PROBE_NETWORK_CORE_QUERY,
  PROBE_NETWORK_CORE_SUB,
} from "../../cards/ProbeNetwork/core";
import systems from "../data/systems";

export default [
  {
    request: {
      query: PROBE_NETWORK_QUERY,
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
      query: PROBE_NETWORK_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        probesUpdate: systems.probes,
      },
    },
  },
  {
    request: {
      query: PROBE_NETWORK_CORE_QUERY,
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
      query: PROBE_NETWORK_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        probesUpdate: systems.probes,
      },
    },
  },
];
