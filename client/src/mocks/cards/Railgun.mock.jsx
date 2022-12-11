import {
  RAILGUN_QUERY,
  RAILGUN_SUB,
  RAILGUN_CONTACTS_SUB,
} from "components/cards/Railgun";
import systems from "../data/systems";

import sensorContacts from "../data/sensorContacts";
import {
  RAILGUN_CORE_QUERY,
  RAILGUN_CORE_SUB,
} from "components/cards/Railgun/core";
import {
  RAILGUN_LOADING_QUERY,
  RAILGUN_LOADING_SUB,
} from "components/cards/Railgun/loadingCard";

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
  {
    request: {
      query: RAILGUN_LOADING_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        railgun: systems.railgun,
      },
    },
  },
  {
    request: {
      query: RAILGUN_LOADING_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {railgunUpdate: systems.railgun},
    },
  },
];
