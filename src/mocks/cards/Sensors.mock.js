import {SENSOR_QUERY, SENSOR_SUB} from "../../components/views/Sensors";
import {
  SENSOR_GRID_QUERY,
  SENSOR_GRID_SUB,
} from "../../components/views/Sensors/GridDom";
import sensors from "../data/sensors";
import sensorContacts from "../data/sensorContacts";
export default [
  {
    request: {
      query: SENSOR_QUERY,
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
      query: SENSOR_SUB,
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
