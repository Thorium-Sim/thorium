import type {DataContext} from "@server/newClasses/DataContext";
import {pubsub} from "@server/newHelpers/pubsub";

export const mainInputs = {
  server: {
    serverSnapshot: (context: DataContext, params: {test: true}) => {
      const server = context.server;
      server.writeFile(true);
      const flight = context.flight;
      flight?.writeFile(true);
      return true;
    },
  },
  random: {
    randomize: () => {
      pubsub.publish("random");
    },
  },
};
const cardInputs = {};

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
type AnyFunc = (...args: any) => any;
type InputParams<Inputs extends Record<string, AnyFunc>> = {
  [Property in keyof Inputs]: SecondParam<Inputs[Property]>;
};
type InputReturns<Inputs extends Record<string, AnyFunc>> = {
  [Property in keyof Inputs]: Awaited<ReturnType<Inputs[Property]>>;
};

export type AllInputs = Matcher<typeof mainInputs>;
export type AllInputNames = keyof AllInputs;
export type AllInputParams = InputParams<AllInputs>;
export type AllInputReturns = InputReturns<AllInputs>;

const inputList = Object.entries(mainInputs).concat(Object.entries(cardInputs));

const inputListKeys = inputList.flatMap(([, value]) =>
  value ? Object.keys(value) : null,
);
const duplicateKeys = inputListKeys.reduce((prev: string[], string, i, arr) => {
  if (string && arr.indexOf(string) !== i) prev.push(string);
  return prev;
}, []);
if (duplicateKeys.length > 0) {
  throw new Error(`Duplicate inputs: ${duplicateKeys.join(", ")}`);
}

const flattenedInputs: AllInputs = inputList.reduce(
  (prev: any, [inputName, inputs]) =>
    inputName === "default" ? prev : {...prev, ...inputs},
  {},
);

export default flattenedInputs;
