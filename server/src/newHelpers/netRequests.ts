import {DataContext} from "@server/newClasses/DataContext";
import {FlightClient} from "@server/newClasses/FlightClient";
import {
  InputParams,
  InputReturns,
  RequestPublishParams,
  UnionToIntersection,
} from "./types";

export const mainRequests = {
  timers: async (
    context: DataContext,
    params: {id: string},
    payload: {id: string},
  ) => {
    if (!context.flight) throw new Error("Flight has not started");
    return context.flight.timers;
  },
  thorium: (context: DataContext) => {
    return {};
  },
  dbDump: (context: DataContext) => {
    return context.database;
  },
  client: (
    context: DataContext,
    params: {},
    publishParams: {clientId: string},
  ) => {
    if (publishParams && publishParams.clientId !== context.clientId)
      throw null;

    const {id, name, connected} = context.server.clients[context.clientId];
    const {
      officersLog,
      id: _id,
      ...flightClient
    } = (context.flightClient as FlightClient) || {};
    return {id, name, connected, ...flightClient};
  },
};

const allRequests = {timerRequests: mainRequests};
export const cardSubscriptions = {};

type RequestsUnion = typeof allRequests[keyof typeof allRequests];
export type AllRequests = UnionToIntersection<RequestsUnion>;
export type AllRequestNames = keyof AllRequests;
export type AllRequestParams = InputParams<AllRequests>;
export type AllRequestPublishParams = RequestPublishParams<AllRequests>;
export type AllRequestReturns = InputReturns<AllRequests>;

const requestList = Object.entries(allRequests).concat(
  Object.entries(cardSubscriptions),
);
const requestListKeys = requestList.flatMap(([, value]) =>
  value ? Object.keys(value) : null,
);
const duplicateKeys = requestListKeys.reduce(
  (prev: string[], string, i, arr) => {
    if (string && arr.indexOf(string) !== i) prev.push(string);
    return prev;
  },
  [],
);
if (duplicateKeys.length > 0) {
  throw new Error(`Duplicate requests: ${duplicateKeys.join(", ")}`);
}

const flattenedRequests: AllRequests = requestList.reduce(
  (prev: any, [requestName, inputs]) =>
    requestName === "default" ? prev : {...prev, ...inputs},
  {},
);

export default flattenedRequests;
