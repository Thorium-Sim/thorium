import {INVENTORY_QUERY, INVENTORY_SUB} from "components/views/CargoControl";
import decks from "../data/decks.js";
import inventory from "../data/inventory.js";
import simulators from "../data/simulators.js";
import {
  INVENTORY_CORE_QUERY,
  CORE_INVENTORY_LOG_SUB,
  CORE_INVENTORY_SUB,
  INVENTORY_CORE_SEARCH,
} from "components/views/CargoControl/core.js";

export default [
  {
    request: {
      query: INVENTORY_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        decks,
        inventory,
      },
    },
  },
  {
    request: {
      query: INVENTORY_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: INVENTORY_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulators,
        inventory,
        decks,
      },
    },
  },
  {
    request: {
      query: CORE_INVENTORY_LOG_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {},
    },
  },
  {
    request: {
      query: CORE_INVENTORY_SUB,
      variables: {simulatorId: "test"},
    },
    result: {data: {}},
  },
  ...inventory.map(i => ({
    request: {
      query: INVENTORY_CORE_SEARCH,
      variables: {name: i.name, simulatorId: "test"},
    },
  })),
];
