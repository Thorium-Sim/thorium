import {DataContext} from "@server/newClasses/DataContext";
import {FlightClient} from "@server/newClasses/FlightClient";

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

  clients: (context: DataContext) => {
    return context.server.clients;
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
  random: () => {
    return Math.random();
  },
};
const dbDumpRequests = {
  dbDump: (context: DataContext) => {
    return context.database;
  },
};

const allRequests = {mainRequests, dbDumpRequests};
export const cardSubscriptions = {};

// For some reason TypeScript is complaining when
// these types aren't included in the folder where the
// inference is happening.
type AllPaths<T, P extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends any[]
      ? `${P}${K & string}`
      : AllPaths<T[K], `${P}${K & string}.`> extends infer O
      ? `${O & string}` | `${P}${K & string}`
      : never
    : `${P}${K & string}`;
}[keyof T];
type PathToType<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer L}.${infer R}`
  ? L extends keyof T
    ? PathToType<T[L], R>
    : never
  : never;
type Matcher<T> = {
  [K in AllPaths<T> as K extends `${string}.${infer R}`
    ? R
    : never]: PathToType<T, K & string>;
};
type SecondParam<Func extends (...args: any) => any> = Func extends (
  first: any,
  second: infer R,
  ...args: any
) => any
  ? R
  : never;
type ThirdParam<Func extends (...args: any) => any> = Func extends (
  first: any,
  second: any,
  third: infer R,
  ...args: any
) => any
  ? R
  : never;
type AnyFunc = (...args: any) => any;
export type InputParams<Inputs extends Record<string, AnyFunc>> = {
  [Property in keyof Inputs]: SecondParam<Inputs[Property]>;
};
export type RequestPublishParams<Requests extends Record<string, AnyFunc>> = {
  [Property in keyof Requests]: ThirdParam<Requests[Property]>;
};
export type InputReturns<Inputs extends Record<string, AnyFunc>> = {
  [Property in keyof Inputs]: Awaited<ReturnType<Inputs[Property]>>;
};

export type AllRequests = Matcher<typeof allRequests>;
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
