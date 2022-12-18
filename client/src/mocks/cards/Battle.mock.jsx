import {
  BATTLE_QUERY,
  BATTLE_CONTACT_SUB,
  BATTLE_SENSORS_SUB,
} from "@client/cards/Battle";
import sensorContacts from "mocks/data/sensorContacts";
import sensors from "mocks/data/sensors";

export default [
  {
    request: {
      query: BATTLE_QUERY,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {
        sensorContacts,
        sensors,
      },
    },
  },
  {
    request: {
      query: BATTLE_CONTACT_SUB,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: BATTLE_SENSORS_SUB,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {},
    },
  },
];
