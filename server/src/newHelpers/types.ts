import type {DataContext} from "../newClasses/DataContext";
export {DataContext};
export type UnionToIntersection<U> = (
  U extends U ? (x: U) => 0 : never
) extends (x: infer I) => 0
  ? Extract<I, U>
  : never;

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type SecondParam<Func extends (...args: any) => any> = Func extends (
  first: any,
  second: infer R,
  ...args: any
) => any
  ? R
  : never;
export type ThirdParam<Func extends (...args: any) => any> = Func extends (
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
  [Property in keyof Inputs]: UnwrapPromise<ReturnType<Inputs[Property]>>;
};
