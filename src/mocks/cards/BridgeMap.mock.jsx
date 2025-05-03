import {
  BRIDGE_MAP_QUERY,
  BRIDGE_MAP_SUBSCRIPTION,
} from "components/views/BridgeMap";
import clients from "../data/clients";
export default [
  {
    request: {
      query: BRIDGE_MAP_QUERY,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {
        clients,
      },
    },
  },
  {
    request: {
      query: BRIDGE_MAP_SUBSCRIPTION,
      variables: {
        simulatorId: "test",
      },
    },
    result: {
      data: {},
    },
  },
];
