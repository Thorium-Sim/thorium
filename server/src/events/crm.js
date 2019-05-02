import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";

function performAction(id, action) {
    const sys = App.systems.find(s => s.id === id);
    if (!sys) return;
    action(sys);
    pubsub.publish('crmUpdate', sys)
}

App.on("crmSetActivated", ({id, state}) => {
    performAction(id, (sys) => sys.setActivated(state))
})
App.on("crmSetPassword", ({id, password, cb}) => {
    performAction(id, (sys) => sys.changePassword(password))
})
App.on("crmAddEnemy", ({id}) => {
    performAction(id, (sys) => sys.addEnemy({}));
})