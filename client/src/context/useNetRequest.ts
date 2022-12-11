import {createContext, useContext, useEffect, useRef} from "react";
import type {
  AllRequestNames,
  AllRequestParams,
  AllRequestReturns,
} from "../../../server/src/requests";
import {getTabId, getTabIdSync} from "@thorium/tab-id";
import {useQuery, QueryFunctionContext} from "@tanstack/react-query";
import {useRequestSub} from "./useRequestSub";

export const MockNetRequestContext = createContext<any>(null!);

export async function netRequest<
  T extends AllRequestNames,
  R extends AllRequestReturns[T],
>(
  requestName: T,
  params?: AllRequestParams[T],
  options: {signal?: AbortSignal} = {},
): Promise<R> {
  const clientId = await getTabId();
  const body = {
    request: requestName,
    ...(params as any),
  };
  const result = await fetch(`/netRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${clientId}`,
    },
    body: JSON.stringify(body),
    signal: options.signal,
  }).then(res => res.json());

  if (result?.error) {
    throw new Error(result.error);
  }

  return result as R;
}

async function queryFn<T extends AllRequestNames>({
  queryKey,
}: QueryFunctionContext) {
  const [, , requestName, params] = queryKey as [
    string,
    "netRequest",
    T,
    AllRequestParams[T],
  ];
  const data = await netRequest(requestName, params);
  return (data as any) || null;
}

export function useNetRequest<
  T extends AllRequestNames,
  R extends AllRequestReturns[T],
>(
  requestName: T,
  params?: AllRequestParams[T],
  callback?: (result: Awaited<R>) => void,
): Awaited<R> {
  const clientId = getTabIdSync();

  const netRequestQuery = useQuery<Awaited<R>>(
    [clientId, "netRequest", requestName, params],
    queryFn,
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      networkMode: "always",
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );
  useRequestSub({requestName, params});

  const mockData = useContext(MockNetRequestContext);

  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!netRequestQuery.data) return;
    callbackRef.current?.(netRequestQuery.data);
  }, [netRequestQuery.data]);

  if (mockData) return mockData[requestName];
  return netRequestQuery.data as any;
}

interface ProxyCallbackOptions {
  path: string[];
  params: unknown[];
}
type ProxyCallback = (opts: ProxyCallbackOptions) => unknown;
const noop = () => {
  // noop
};

function createInnerProxy(callback: ProxyCallback, path: string[]) {
  const proxy: unknown = new Proxy(noop, {
    get(_obj, key) {
      if (typeof key !== "string" || key === "then") {
        // special case for if the proxy is accidentally treated
        // like a PromiseLike (like in `Promise.resolve(proxy)`)
        return undefined;
      }
      return createInnerProxy(callback, [...path, key]);
    },
    apply(_1, _2, params) {
      return callback({
        params,
        path,
      });
    },
  });

  return proxy;
}

/**
 * Creates a proxy that calls the callback with the path and arguments
 *
 * @internal
 */
export const createRecursiveProxy = (callback: ProxyCallback) =>
  createInnerProxy(callback, []);

type SecondParam<Func extends (...args: any) => any> = Func extends (
  first: any,
  second: infer R,
  ...args: any
) => any
  ? R
  : never;

export const useChainNetRequest: {
  [P in keyof AllRequestParams]: (
    input?: SecondParam<AllRequestParams[P]>,
  ) => Awaited<ReturnType<AllRequestReturns[P]>>;
} = createRecursiveProxy(({path, params}) => {
  const requestName = path.at(-1) as AllRequestNames;
  return useNetRequest(requestName, params);
}) as any;
