import AdvancedNavigationAndAstrometrics from "~classes/advancedNavigationAndAstrometrics";
import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import throttle from "../helpers/throttle";


let prevSpeed = 0;

const sendUpdate = throttle(() => {
    pubsub.publish(
        'advancedNavAndAstrometricsUpdate',
        App.systems.filter(s => s.type === 'AdvancedNavigationAndAstrometrics'),
    )
})

const sendStarsUpdate = throttle(() => {
    pubsub.publish(
        'advancedNavStarsUpdate',
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
                    const speed = nav.getCurrentSpeed();
                    if (speed.velocity !== prevSpeed) {
                        sendStarsUpdate();
                        prevSpeed = speed.velocity;
                    }

                })
            });
        });

    sendUpdate();
    setTimeout(updateValues, 1000);
};
updateValues();

