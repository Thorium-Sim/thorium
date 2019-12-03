import {
  COMMAND_LINE_QUERY,
  COMMAND_LINE_SUB,
} from "components/views/CommandLine";
import clients from "../data/clients";
export default [
  {
    request: {
      query: COMMAND_LINE_QUERY,
      variables: {clientId: "test"},
    },
    result: {
      data: {
        clients: [clients[0]],
      },
    },
  },
  {
    request: {
      query: COMMAND_LINE_SUB,
      variables: {clientId: "test"},
    },
    result: {
      data: {},
    },
  },
];
