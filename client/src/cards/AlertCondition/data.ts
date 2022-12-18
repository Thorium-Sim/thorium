import {DataContext} from "@server/newClasses/DataContext";
import {pubsub} from "@server/newHelpers/pubsub";

export const requests = {
  alertCondition(
    context: DataContext,
    params: {shipId?: string},
    publishParams: {shipId: string},
  ) {
    return "5";
  },
};

export const inputs = {
  alertConditionSet(
    context: DataContext,
    params: {
      alertCondition: "5" | "4" | "3" | "2" | "1" | "p";
      shipId?: string;
    },
  ) {},
};
