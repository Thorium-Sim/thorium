import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import throttle from "../helpers/throttle";

const sendUpdate = throttle(async () => {
    const value = {
        Mission: App.firebaseManager.selectedMission?.id,
        Simulator: App.firebaseManager.selectedSimulator?.id,
        StationEmailLinks: Object.keys(App.firebaseManager.stationEmailMap).map(key => {
            return {
                station: key,
                email: App.firebaseManager.stationEmailMap[key]
            }
        }),
        Awards: App.firebaseManager.awards,
        EventId: await App.firebaseManager.getEventId(),
        flightSubmissions: App.firebaseManager.flightSubmissions
    }
    pubsub.publish("firebaseCurrentSelectionsUpdate", value)
}, 60);

App.on("setFirebaseMission", async ({ id }) => {
    if (App.firebaseManager) {
        await App.firebaseManager.setMission(id);
        sendUpdate();
    }
});

App.on("setFirebaseSimulator", async ({ id }) => {
    if (App.firebaseManager) {
        await App.firebaseManager.setSimulator(id);
        sendUpdate();
    }
});

App.on("updateFirebaseUserStation", ({ email, station }) => {
    if (App.firebaseManager) {
        App.firebaseManager.updateUserStation(email, station);
        sendUpdate();
    }
});

App.on("setFirebaseAwards", async ({ awards }) => {
    if (App.firebaseManager) {
        await App.firebaseManager.setAwards(awards);
        sendUpdate();
    }
});

App.on("executeFirebasePush", async ({ eventId, flightId }) => {
    if (App.firebaseManager) {
        await App.firebaseManager.executePush(eventId, flightId);
        sendUpdate();
    }
});