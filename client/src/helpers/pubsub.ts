import uuid from "uuid";

const topics: {[key: string]: {[key: string]: Function | null}} = {};

export function subscribe(topic: string, fn: Function) {
  if (!topics[topic]) topics[topic] = {};
  const id = uuid.v4();
  topics[topic][id] = fn;
  return () => {
    topics[topic][id] = null;
    delete topics[topic][id];
  };
}

export function publish(topic: string, args?: any) {
  if (!topics[topic]) return;
  Object.values(topics[topic]).forEach(fn => {
    if (fn) fn(args);
  });
}
