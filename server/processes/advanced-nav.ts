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
    // A throw anywhere in here used to kill the tick for every simulator on the server,
    // since the reschedule was the last statement. Keep the loop alive no matter what.
    try {
        App.flights.filter(f => f.running === true)
            .forEach(f => {
                f.simulators.forEach(s => {
                    App.systems.filter(sys => sys.simulatorId === s && sys.type === "AdvancedNavigationAndAstrometrics").forEach((nav: AdvancedNavigationAndAstrometrics) => {
                        try {
                            nav.executeHeatInterval();
                            nav.executeLoopInterval();
                            nav.executeProbeInterval();
                            const speed = nav.getCurrentSpeed();
                            if (speed.velocity !== prevSpeed) {
                                sendStarsUpdate();
                                prevSpeed = speed.velocity;
                            }
                        } catch (err) {
                            console.error(`Error updating advanced navigation for simulator ${s}:`, err);
                        }
                    })
                });
            });

        sendUpdate();
    } catch (err) {
        console.error('Error in the advanced navigation update loop:', err);
    } finally {
        setTimeout(updateValues, 1000);
    }
};
updateValues();

