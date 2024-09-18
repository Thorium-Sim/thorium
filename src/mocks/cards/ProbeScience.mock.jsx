import {
  PROBES_SCIENCE_QUERY,
  PROBES_SCIENCE_SUB,
  PROBES_SCIENCE_CONTACT_SUB,
} from "components/views/ProbeScience";
import systems from "../data/systems";
import sensors from "../data/sensors";
import sensorContacts from "../data/sensorContacts";
import {
  PROBE_SCIENCE_CORE_QUERY,
  PROBES_SCIENCE_CORE_SUB,
  PROBE_SCIENCE_CONTACTS_CORE_SUB,
} from "components/views/ProbeScience/core";
import {PROBE_SCIENCE_EMITTER_SUB} from "components/views/ProbeScience/probeScience";
export default [
  {
    request: {
      query: PROBES_SCIENCE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensorContacts,
        sensors,
        probes: systems.probes,
      },
    },
  },
  {
    request: {
      query: PROBES_SCIENCE_SUB,
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
      query: PROBES_SCIENCE_CONTACT_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensorContactUpdate: sensorContacts,
      },
    },
  },
  {
    request: {
      query: PROBE_SCIENCE_EMITTER_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        scienceProbeEmitter: {
          name: null,
          type: null,
          charge: null,
        },
      },
    },
  },
  {
    request: {
      query: PROBE_SCIENCE_EMITTER_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        scienceProbeEmitter: {
          name: null,
          type: null,
          charge: null,
        },
      },
    },
  },
  {
    request: {
      query: PROBE_SCIENCE_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensorContacts,
        sensors,
        probes: systems.probes,
      },
    },
  },
  {
    request: {
      query: PROBES_SCIENCE_CORE_SUB,
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
      query: PROBE_SCIENCE_CONTACTS_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensorContactUpdate: sensorContacts,
      },
    },
  },
];
