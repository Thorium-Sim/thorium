import {EventEmitter} from "events";

import {DataContext} from "../newClasses/DataContext";
import {
  AllRequestNames,
  AllRequestPublishParams,
  AllRequestReturns,
} from "./netRequests";

class PubSub {
  protected ee: EventEmitter;
  private subscriptions: {[key: string]: [string, (...args: any[]) => void]};
  private subIdCounter: number;
  constructor() {
    const ee = new EventEmitter();
    ee.setMaxListeners(250);
    this.ee = ee;
    this.subscriptions = {};
    this.subIdCounter = 0;
  }

  public publish<
    TriggerName extends AllRequestNames,
    Payload extends AllRequestPublishParams[TriggerName],
  >(triggerName: TriggerName, payload?: Payload): Promise<void> {
    this.ee.emit(triggerName, payload);
    return Promise.resolve();
  }

  public subscribe<
    TriggerName extends AllRequestNames,
    Payload extends AllRequestPublishParams[TriggerName],
    Return extends AllRequestReturns[TriggerName],
  >(
    triggerName: TriggerName,
    onMessage: (payload: Payload, context: DataContext) => Return,
    context: DataContext,
  ): Promise<number> {
    const listener = (payload: Payload) => onMessage(payload, context);
    this.ee.addListener(triggerName, listener);
    this.subIdCounter = this.subIdCounter + 1;
    this.subscriptions[this.subIdCounter] = [triggerName, listener];

    return Promise.resolve(this.subIdCounter);
  }

  public unsubscribe(subId: number) {
    if (this.subscriptions[subId]) {
      const [triggerName, onMessage] = this.subscriptions[subId];
      delete this.subscriptions[subId];
      this.ee.removeListener(triggerName, onMessage);
    }
  }
}

export const pubsub = new PubSub();
