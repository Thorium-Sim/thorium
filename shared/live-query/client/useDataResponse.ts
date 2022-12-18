import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useErrorHandler} from "react-error-boundary";
import {useLiveQuery} from "./liveQueryContext";
import {getQueryKey} from "./getQueryKey";
import {getArrayQueryKey} from "./getArrayQueryKey";
import {NetResponseData} from "./useDataConnection";

export function useDataResponse() {
  const queryClient = useQueryClient();
  const handleError = useErrorHandler();
  const {socket} = useLiveQuery();
  useEffect(() => {
    if (socket) {
      function handleNetRequestData(data: NetResponseData) {
        try {
          if (typeof data !== "object") {
            throw new Error(
              `netResponse data must be an object. Got "${data}"`,
            );
          }
          if ("error" in data) {
            throw new Error(data.error);
          }
          if (!("id" in data && "data" in data)) {
            const dataString = JSON.stringify(data, null, 2);
            throw new Error(
              `netResponse data must include an id and a response. Got ${dataString}`,
            );
          }

          const [path, params] = JSON.parse(data.id);
          const queryKey = getArrayQueryKey(getQueryKey(path, params));
          queryClient.setQueryData(queryKey, data.data);
        } catch (err) {
          console.error(err);
          handleError(err);
        }
      }

      function handleReady() {
        queryClient.refetchQueries(undefined, {cancelRefetch: false});
      }
      socket.on("netRequestData", handleNetRequestData);
      socket.on("ready", handleReady);
      return () => {
        socket.off("netRequestData", handleNetRequestData);
        socket.off("ready", handleReady);
      };
    }
  }, [socket, handleError, queryClient]);
}
