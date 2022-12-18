import * as cardData from "./data";

export const cardRequests = Object.fromEntries(
  Object.entries(cardData).map(([cardName, {requests}]) => {
    return [cardName, requests];
  }),
);

export type UnionToIntersection<U> = (
  U extends U ? (x: U) => 0 : never
) extends (x: infer I) => 0
  ? Extract<I, U>
  : never;

type CardDataFunctions = typeof cardData;
type DataCardNames = keyof CardDataFunctions;

export type CardRequestFunctions = UnionToIntersection<
  CardDataFunctions[DataCardNames]
>["requests"];

export type CardInputFunctions = UnionToIntersection<
  CardDataFunctions[DataCardNames]
>["inputs"];

// export const cardDataStreams = Object.fromEntries(
//   Object.entries(cardData)
//     .map(([cardName, {dataStream}]) => {
//       if (!dataStream) return null;
//       return [cardName, dataStream];
//     })
//     .filter(function isEntry(entry): entry is [string, any] {
//       return entry !== null;
//     })
// );

export const cardInputs = Object.fromEntries(
  Object.entries(cardData)
    .map(([cardName, {inputs}]) => {
      if (!inputs) return null;
      return [cardName, inputs];
    })
    .filter(function isEntry(entry): entry is [string, any] {
      return entry !== null;
    }),
);
