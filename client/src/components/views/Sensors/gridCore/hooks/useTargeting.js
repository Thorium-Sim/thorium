import React from "react";
import { subscribe } from "helpers/pubsub";

export function useTargeting() {
  const [targetingRange, setTargetingRange] = React.useState(false);
  React.useEffect(() => {
    const sub = subscribe("setTargetingRange", range => {
      setTargetingRange(range);
    });
    return () => sub && sub();
  }, []);
  return targetingRange;
}
