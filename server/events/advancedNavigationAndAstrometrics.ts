import AdvancedNavigationAndAstrometrics from '~classes/advancedNavigationAndAstrometrics';
import App from '../app'
import { pubsub } from '../helpers/subscriptionManager'
import throttle from "../helpers/throttle";

import uuid from "uuid";
import { FlightSet, MapBorderSide } from '../classes/flightSets/index';



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

const mapBorderSideToString = (side: string): MapBorderSide => {
    const mapping: Record<string, MapBorderSide> = {
        ["TOP"]: 'top',
        ['RIGHT']: 'right',
        ["BOTTOM"]: 'bottom',
        ["LEFT"]: 'left',
        ["TOP_RIGHT"]: 'top-right',
        ["TOP_LEFT"]: 'top-left',
        ["BOTTOM_RIGHT"]: 'bottom-right',
        ["BOTTOM_LEFT"]: 'bottom-left',
    };
    return mapping[side] || side as MapBorderSide;
}

App.on('updateFlightSet', ({ id, flightSet }) => {
    const newFlightSet = { ...flightSet }
    newFlightSet.borders = newFlightSet.borders.map(border => {
        return {
            ...border,
            location: {
                side: mapBorderSideToString(border.location.side)
            }
        }
    })
    const classedFlightSet = new FlightSet(newFlightSet);
    const flightSetIndex = App.flightSets.findIndex(f => f.id === id)
    App.flightSets[flightSetIndex] = classedFlightSet
    sendUpdate()
});

App.on('removeFlightSet', ({ id }) => {
    App.flightSets = App.flightSets.filter(f => f.id !== id)
    sendUpdate();
});

App.on('createFlightSet', ({ flightSet }) => {
    const newFlightSet = { ...flightSet, id: uuid.v4() }
    newFlightSet.borders = newFlightSet.borders.map(border => {
        return {
            ...border,
            location: {
                side: mapBorderSideToString(border.location.side)
            }
        }
    })
    const classedFlightSet = new FlightSet(newFlightSet);
    App.flightSets.push(classedFlightSet)
    sendUpdate()
});

App.on('updateAdvNavFlightSet', ({ id, flightSet }) => {
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

App.on("handleUpdateCurrentFlightSet", ({ id, flightSetId }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    system && system.updateCurrentlySelectedFlightSet(flightSetId)
    sendUpdate()
})

App.on("handleAddFlightSetToNavigation", ({ id, flightSetId }) => {
    const system: AdvancedNavigationAndAstrometrics = App.systems.find(s => s.id === id)
    const flightSet = App.flightSets.find(f => f.id === flightSetId)
    system && flightSet && system.addFlightSet(flightSet)
    console.log("handleAddFlightSetToNavigation", system, flightSet)
    sendUpdate()
})