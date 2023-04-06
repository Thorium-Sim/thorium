import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import uuid from "uuid";
import throttle from "../helpers/throttle";
import { HullPlating } from "../classes";

const sendUpdate = throttle(() => {
    pubsub.publish(
        "hullPlatingUpdate",
        App.systems.filter(s => s.type === "HullPlating"),
    );
}, 60);

App.on("setHullPlatingMode", ({ id, mode }) => {
    const sys: HullPlating = App.systems.find(s => s.id === id);
    sys && sys.setMode(mode);
    sendUpdate();
})


App.on("setHullPlatingEngaged", ({ id, engaged }) => {
    const sys: HullPlating = App.systems.find(s => s.id === id);
    if (sys) {
        pubsub.publish("notify", {
            id: uuid.v4(),
            simulatorId: sys.simulatorId,
            type: "Hull Plating",
            station: "Core",
            title: engaged ? `${sys.displayName} Engaged` : `${sys.displayName} Disengaged`,
            body: engaged ? `${sys.displayName} Engaged` : `${sys.displayName} Disengaged`,
            color: "info",
        });
        App.handleEvent(
            {
                simulatorId: sys.simulatorId,
                title: engaged ? `${sys.displayName} Engaged` : `${sys.displayName} Disengaged`,
                body: engaged ? `${sys.displayName} Engaged` : `${sys.displayName} Disengaged`,
                component: "HullPlatingCore",
                color: "info",
            },
            "addCoreFeed",
        );
        sys.setEngaged(engaged);
    }
    sendUpdate();
})

App.on("setHullPlatingPulse", ({ id, pulse }) => {
    const sys: HullPlating = App.systems.find(s => s.id === id);
    sys && sys.setPulse(pulse);
    sendUpdate();
})