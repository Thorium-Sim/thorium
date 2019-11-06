import {
  STEALTH_QUERY,
  STEALTH_SUB,
  STEALTH_SYSTEMS_QUERY,
} from "../../components/views/StealthField";
import systems from "../data/systems";
import {
  STEALTH_CORE_SUB,
  STEALTH_CORE_QUERY,
  STEALTH_SYSTEMS_CORE_QUERY,
} from "components/views/StealthField/core";
export default [
  {
    request: {
      query: STEALTH_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        stealthField: systems.stealthField,
        systems: systems.shields,
      },
    },
  },
  {
    request: {
      query: STEALTH_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        stealthFieldUpdate: systems.stealthField,
      },
    },
  },
  {
    request: {
      query: STEALTH_SYSTEMS_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        systems: systems.stealthField,
      },
    },
  },
  {
    request: {
      query: STEALTH_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        stealthField: systems.stealthField,
        systems: systems.shields,
      },
    },
  },
  {
    request: {
      query: STEALTH_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        stealthFieldUpdate: systems.stealthField,
      },
    },
  },
  {
    request: {
      query: STEALTH_SYSTEMS_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        systems: systems.stealthField,
      },
    },
  },
];
