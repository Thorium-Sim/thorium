import type {AnyRouter} from "../server/router";
import {
  LiveQueryClient,
  HeadersResolver,
  LiveQueryClientOptions,
} from "./client";
import {createFlatProxy, createRecursiveProxy} from "../proxy";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useRequestSub} from "./useRequestSub";
import {getArrayQueryKey} from "./getArrayQueryKey";
import {CreateLiveQueryReact} from "./types";
import {getQueryKey} from "./getQueryKey";

export function createReactProxyDecoration(name: string, fns: any) {
  return createRecursiveProxy(opts => {
    const args = opts.args;

    const pathCopy = [name, ...opts.path];

    // The last arg is for instance `.useMutation` or `.useQuery()`
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastArg = pathCopy.pop()!;

    // The `path` ends up being something like `post.byId`
    const path = pathCopy.join(".");
    if (lastArg === "useNetSend") {
      return (fns as any)[lastArg](path, ...args);
    }
    const [input, ...rest] = args;

    return (fns as any)[lastArg](path, input, ...rest);
  });
}

function createHooksInternalProxy<TRouter extends AnyRouter>(
  client: LiveQueryClient,
) {
  type CreateHooksInternalProxy = CreateLiveQueryReact<TRouter>;
  const fns = {
    netRequest: (
      path: string,
      input: any,
      {headers, signal}: {headers?: HeadersResolver; signal?: AbortSignal},
    ) => client.netRequest({path, input, headers, signal}),
    useNetRequest: (path: string, input: any, ...args: unknown[]) => {
      useRequestSub({path, params: input});
      const result = useQuery({
        ...(args[0] as object),
        queryFn: ({signal}) => client.netRequest({path, input, signal}),
        queryKey: getArrayQueryKey(getQueryKey(path, input)),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        networkMode: "always",
        staleTime: Infinity,
        cacheTime: Infinity,
      });
      return [result.data, result];
    },
    netSend: (
      path: string,
      input: any,
      {headers, signal}: {headers?: HeadersResolver; signal?: AbortSignal} = {},
    ) => client.netSend({path, input, headers, signal}),
    useNetSend: (path: string, ...args: unknown[]) =>
      useMutation({
        mutationFn: input => client.netSend({path, input}),
        ...(args[0] as any),
      }),
  };
  return createFlatProxy<CreateHooksInternalProxy>(key => {
    // if (key === 'useContext') {
    //   return () => {
    //     const context = trpc.useContext();
    //     // create a stable reference of the utils context
    //     return useMemo(() => {
    //       return (createReactQueryUtilsProxy as any)(context);
    //     }, [context]);
    //   };
    // }
    // eslint-disable-next-line no-prototype-builtins
    if (fns.hasOwnProperty(key)) {
      return (fns as any)[key];
    }

    return createReactProxyDecoration(key as string, fns);
  });
}

export function createLiveQueryReact<TRouter extends AnyRouter>(
  opts?: LiveQueryClientOptions,
) {
  const client = new LiveQueryClient(opts);
  const proxy = createHooksInternalProxy<TRouter>(client);

  return proxy;
}
