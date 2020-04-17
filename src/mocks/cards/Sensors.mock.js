import {
  SENSOR_GRID_QUERY,
  SENSOR_GRID_SUB,
} from "../../components/views/Sensors/GridDom";
import sensors from "../data/sensors";
import sensorContacts from "../data/sensorContacts";
import {SensorsDocument, SensorsPingSubDocument} from "generated/graphql";
import {
  JR_SENSOR_QUERY,
  JR_SENSOR_SUB,
} from "components/views/JrSensors/index.js";

export default [
  {
    request: {
      query: SensorsDocument,
      variables: {simulatorId: "test", domain: "external"},
    },
    result: {
      data: {
        sensorsUpdate: sensors,
      },
    },
  },

  {
    request: {
      query: SensorsDocument,
      variables: {simulatorId: "test", domain: "external"},
    },
    result: {
      data: {
        sensorsUpdate: sensors,
      },
    },
  },
  {
    request: {
      query: SensorsDocument,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensorsUpdate: sensors,
      },
    },
  },
  {
    request: {
      query: SensorsPingSubDocument,
      variables: {sensorsId: "test"},
    },
    result: {
      data: {
        sensorsPing: "",
      },
    },
  },
  {
    request: {
      query: JR_SENSOR_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensors,
      },
    },
  },
  {
    request: {
      query: JR_SENSOR_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        sensorsUpdate: sensors,
      },
    },
  },
  {
    request: {
      query: SENSOR_GRID_QUERY,
      variables: {sensorsId: "test"},
    },
    result: {
      data: {
        sensorContacts,
      },
    },
  },
  {
    request: {
      query: SENSOR_GRID_SUB,
      variables: {sensorId: "test"},
    },
    result: {
      data: {
        sensorContactUpdate: sensorContacts,
      },
    },
  },
];
