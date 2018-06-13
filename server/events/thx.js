import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on("chargeThx", ({ id, clientId, charge }) => {});

App.on("lockThx", ({ id, clientId }) => {});

App.on("activateThx", ({ id }) => {});

App.on("deactivateThx", ({ id }) => {});

App.on("resetThx", ({ id }) => {});
