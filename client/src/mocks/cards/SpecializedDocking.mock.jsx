import {
  SPECIALIZED_DOCKING_QUERY,
  SPECIALIZED_DOCKING_SUB,
} from "components/cards/SpecializedDocking";
import docking from "../data/docking";
import {
  SPECIALIZED_DOCKING_CORE_QUERY,
  SPECIALIZED_DOCKING_CORE_SUB,
} from "components/cards/SpecializedDocking/core";
export default [
  {
    request: {
      query: SPECIALIZED_DOCKING_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        docking: docking.filter(d => d.type === "specialized"),
      },
    },
  },
  {
    request: {
      query: SPECIALIZED_DOCKING_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        dockingUpdate: docking.filter(d => d.type === "specialized"),
      },
    },
  },
  {
    request: {
      query: SPECIALIZED_DOCKING_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        docking: docking.filter(d => d.type === "specialized"),
      },
    },
  },
  {
    request: {
      query: SPECIALIZED_DOCKING_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        dockingUpdate: docking.filter(d => d.type === "specialized"),
      },
    },
  },
];
