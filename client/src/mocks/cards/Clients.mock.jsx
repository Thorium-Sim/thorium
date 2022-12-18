import {
  CLIENTS_CORE_QUERY,
  CLIENTS_CORE_SUBSCRIPTION,
} from "../../cards/Clients/core";
import clients from "../data/clients";

export default [
  {
    request: {query: CLIENTS_CORE_QUERY, variables: {simulatorId: "test"}},
    result: {data: {clients}},
  },
  {
    request: {
      query: CLIENTS_CORE_SUBSCRIPTION,
      variables: {simulatorId: "test"},
    },
    result: {data: {}},
  },
];
