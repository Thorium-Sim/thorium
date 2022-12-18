import {
  SUBSPACE_FIELD_QUERY,
  SUBSPACE_FIELD_SUB,
} from "@client/cards/SubspaceField";
import {
  SUBSPACE_CORE_QUERY,
  SUBSPACE_CORE_SUB,
} from "@client/cards/SubspaceField/core";
import systems from "../data/systems";
export default [
  {
    request: {
      query: SUBSPACE_FIELD_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        subspaceField: systems.subspaceField,
      },
    },
  },
  {
    request: {
      query: SUBSPACE_FIELD_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        subspaceFieldUpdate: systems.subspaceField,
      },
    },
  },
  {
    request: {
      query: SUBSPACE_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        subspaceField: systems.subspaceField,
      },
    },
  },
  {
    request: {
      query: SUBSPACE_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        subspaceFieldUpdate: systems.subspaceField,
      },
    },
  },
];
