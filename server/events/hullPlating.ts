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
    sys && sys.setEngaged(engaged);
    sendUpdate();
})