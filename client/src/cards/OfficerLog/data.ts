import {DataContext} from "@server/newClasses/DataContext";
import {pubsub} from "@server/newHelpers/pubsub";

export const requests = {
  officersLog(
    context: DataContext,
    params: {clientId?: string},
    publishParams: {clientId: string},
  ) {
    if (
      publishParams &&
      context.id !== publishParams.clientId &&
      params.clientId !== publishParams.clientId
    )
      throw null;

    if (params.clientId) {
      return context.flight?.clients[params.clientId].officersLog || [];
    }
    return context.flightClient?.officersLog || [];
  },
};

export const inputs = {
  officersLogAdd(
    context: DataContext,
    params: {message: string; timestamp: number},
  ) {
    const {message, timestamp = Date.now()} = params;

    context.flightClient?.officersLog.push({
      message,
      timestamp,
    });

    pubsub.publish("officersLog", {
      clientId: context.id,
    });
  },
};
