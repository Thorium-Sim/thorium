import {THX_QUERY, THX_SUB} from "components/cards/Thx";
import systems from "../data/systems";
import {THX_CORE_SUB, THX_CORE_QUERY} from "components/cards/Thx/core";
export default [
  {
    request: {
      query: THX_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        thx: systems.thx,
      },
    },
  },
  {
    request: {
      query: THX_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        thxUpdate: systems.thx,
      },
    },
  },
  {
    request: {
      query: THX_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        thx: systems.thx,
      },
    },
  },
  {
    request: {
      query: THX_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        thxUpdate: systems.thx,
      },
    },
  },
];
