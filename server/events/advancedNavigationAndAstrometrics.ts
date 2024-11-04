import AdvancedNavigationAndAstrometrics from '~classes/advancedNavigationAndAstrometrics';
import App from '../app'
import { pubsub } from '../helpers/subscriptionManager'
import throttle from "../helpers/throttle";

import uuid from "uuid";



const sendUpdate = throttle(() => {
    pubsub.publish(
        'advancedNavAndAstrometricsUpdate',
        App.systems.filter(s => s.type === 'AdvancedNavigationAndAstrometrics'),
    )
})

const notifyEvent = (simulatorId, type, component, title, body, color) => {
    pubsub.publish('notify', {
        id: uuid.v4(),
        simulatorId,
        type: type,
        station: 'Core',
        title,
        body,
        color,
    });
    App.handleEvent(
        {
            simulatorId,
            title,
            body,
            component,
            color,
        },
        'addCoreFeed',
    );
}

App.on('updateFlightSet', ({ id, flightSet }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.updateFlightSet(flightSet)
    sendUpdate()
});

App.on("handleCoolantFlush", ({ id }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id);
    system && system.handleCoolantFlush();
    system && notifyEvent(system.simulatorId, 'Advanced Navigation', 'AdvancedNavigationCore', 'Coolant Flushed', 'Coolant has been flushed', 'info');
    sendUpdate();
});

App.on('handleEmergencyStop', ({ id }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleEmergencyStop()
    system && notifyEvent(system.simulatorId, 'Advanced Navigation', 'AdvancedNavigationCore', 'Emergency Stop', 'Emergency Stop Executed', 'info');

    sendUpdate()
})

App.on('handleResumePath', ({ id }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleResumePath();
    system && notifyEvent(system.simulatorId, 'Advanced Navigation', 'AdvancedNavigationCore', 'Path Resumed', 'Path has been resumed', 'info');
    sendUpdate()
});

App.on('handleShowFlightSet', ({ id, show }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleShowFlightSet(show)
    sendUpdate()
});

App.on('handleShowEta', ({ id, show }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleShowEta(show)
    sendUpdate()
});

App.on('handleUpdateEta', ({ id, eta }) => {
    const system = App.systems.find(s => s.id === id)
    system && system.handleUpdateEta(eta)
    sendUpdate()
});

App.on('handleEngineFlux', ({ id }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleEngineFlux()
    sendUpdate()
});

App.on('handleSetCoolantLevel', ({ id, level }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleSetCoolantLevel(level)
    sendUpdate()
})

App.on('handleSetHeatLevel', ({ id, level }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleSetHeatLevel(level)
    sendUpdate()
});

App.on('handleUpdateCurrentFlightPath', ({ id, route }) => {
    const system = App.systems.find(s => s.id === id)
    system && system.handleUpdateCurrentFlightPath(route)
    system && notifyEvent(system.simulatorId, 'Advanced Navigation', 'AdvancedNavigationCore', 'Flight Path Updated', 'Flight Path has been updated', 'info');
    sendUpdate()
});

App.on('handleOverrideLocation', ({ id, location, currentLocationUrl, currentLocationName }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleOverrideLocation(location, currentLocationUrl, currentLocationName)
    sendUpdate()
});

App.on('handleAddProbeAssignment', ({ id, probeId, poiId }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleAddProbeAssignment(probeId, poiId)
    system && notifyEvent(system.simulatorId, 'Astrometrics', 'AstrometricsCore', 'Probe Assignment Added', 'Probe Assignment has been added', 'info');
    sendUpdate()
});

App.on('handleEngageFlightPath', ({ id, path }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleEngageFlightPath(path)
    system && notifyEvent(system.simulatorId, 'Advanced Navigation', 'AdvancedNavigationCore', 'Flight Path Engaged', 'Flight Path has been engaged', 'info');
    sendUpdate()
});

App.on('handleSaveFlightPath', ({ id, path }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.handleSaveFlightPath(path)
    system && notifyEvent(system.simulatorId, 'Advanced Navigation', 'AdvancedNavigationCore', 'Flight Path Saved', 'Flight Path has been saved', 'info');
    sendUpdate()
})