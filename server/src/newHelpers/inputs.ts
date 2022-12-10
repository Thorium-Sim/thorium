import {
  InputParams,
  InputReturns,
  UnionToIntersection,
} from "@server/newHelpers/types";
import {DataContext} from "./types";

type CardInputFunctions = {};

export const mainInputs = {
  server: {
    serverSnapshot: (context: DataContext, params: {}) => {
      const server = context.server;
      server.writeFile(true);
      const flight = context.flight;
      flight?.writeFile(true);
      return true;
    },
  },
};
const cardInputs = {};

export type AllInputs = UnionToIntersection<
  typeof mainInputs[keyof typeof mainInputs]
> &
  CardInputFunctions;
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
