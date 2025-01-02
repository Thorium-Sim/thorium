import AdvancedNavigationAndAstrometrics from "~classes/advancedNavigationAndAstrometrics";
import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import throttle from "../helpers/throttle";

const sendUpdate = throttle(() => {
    pubsub.publish(
        'advancedNavAndAstrometricsUpdate',
        App.systems.filter(s => s.type === 'AdvancedNavigationAndAstrometrics'),
    )
})

const updateValues = () => {
    App.flights.filter(f => f.running === true)
        .forEach(f => {
            f.simulators.forEach(s => {
                App.systems.filter(sys => sys.simulatorId === s && sys.type === "AdvancedNavigationAndAstrometrics").forEach((nav: AdvancedNavigationAndAstrometrics) => {
                    nav.executeHeatInterval();
                    nav.executeLoopInterval();
                    nav.executeProbeInterval();

                })
            });
        });

    sendUpdate();
    setTimeout(updateValues, 1000);
};
updateValues();

