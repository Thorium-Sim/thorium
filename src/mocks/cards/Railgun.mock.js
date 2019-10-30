import {
  RAILGUN_QUERY,
  RAILGUN_SUB,
  RAILGUN_CONTACTS_SUB,
} from "components/views/Railgun";
import systems from "../data/systems";

import sensorContacts from "../data/sensorContacts";
import {
  RAILGUN_CORE_QUERY,
  RAILGUN_CORE_SUB,
} from "components/views/Railgun/core";

export default [
  {
    request: {
      query: RAILGUN_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        railgun: systems.railgun,
        sensorContacts: sensorContacts.filter(c => c.type === "projectile"),
      },
    },
  },
  {
    request: {
      query: RAILGUN_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {railgunUpdate: systems.railgun},
    },
  },
  {
    request: {
      query: RAILGUN_CONTACTS_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {sensorContactUpdate: sensorContacts},
    },
  },
  {
    request: {
      query: RAILGUN_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        railgun: systems.railgun,
        sensorContacts: sensorContacts.filter(c => c.type === "projectile"),
      },
    },
  },
  {
    request: {
      query: RAILGUN_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {railgunUpdate: systems.railgun},
    },
  },
];
