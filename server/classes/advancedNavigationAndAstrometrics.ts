import { pubsub } from "../helpers/subscriptionManager";
import uuid from "uuid";
import { BasicCoordinate, EngineStatus, FlightSet, FullCoordinate, MapBorder, NamedNavigationRoute, NavigationRoute, PointOfInterest, Probe, ProbeAssignment } from "./flightSets";
import { calculateTotalTime, countProbeFuelCells, generateCurrentUnixTimestamp, generateFlightPathCoordinates, getLastVisitedCoordinate, getPositionAtTime, getProbeCurrentLocation } from "./flightSets/helpers";
import { System } from "./generic";
import App from "../app";

export default class AdvancedNavigationAndAstrometrics extends System {
    class: string;
    type: string;
    flightSets: FlightSet[];
    currentLocation: BasicCoordinate;
    coolantLevel: number;
    heatLevel: number;
    flightPaths: NamedNavigationRoute[];
    engineStatus: EngineStatus;
    hasEmergencyPower: boolean;
    startingStartupTime: number;
    remainingEta: number;
    totalEta: number;
    flightPathCoords: FullCoordinate[];
    remainingStartupTime?: number;
    showEta: boolean;
    showFlightSet: boolean;
    currentFlightSet?: FlightSet;
    currentFlightPath?: NavigationRoute;
    currentLocationName?: string;
    currentLocationUrl?: string;
    flightSetPathMap: { [key: string]: NamedNavigationRoute[] };
    probes: Probe[];
    probeAssignments: Record<string, ProbeAssignment[]>;
    locationMap: Record<string, BasicCoordinate>
    name: string;
    heat: number;

    constructor(params: Partial<AdvancedNavigationAndAstrometrics>) {
        super(params);
        this.class = "AdvancedNavigationAndAstrometrics";
        this.type = "AdvancedNavigationAndAstrometrics";
        this.name = params.name || "Advanced Navigation";
        this.displayName = params.displayName || "Advanced Navigation";
        this.flightSets = params.flightSets || [];
        this.currentLocation = params.currentLocation || { x: 0, y: 0 };
        this.coolantLevel = params.coolantLevel || 100;
        this.heatLevel = params.heatLevel || 0;
        this.flightPaths = params.flightPaths || [];
        this.engineStatus = params.engineStatus || EngineStatus.STOPPED;
        this.hasEmergencyPower = params.hasEmergencyPower || false;
        this.startingStartupTime = params.startingStartupTime || 0;
        this.remainingEta = params.remainingEta || 0;
        this.totalEta = params.totalEta || 0;
        this.flightPathCoords = params.flightPathCoords || [];
        this.showEta = params.showEta || false;
        this.showFlightSet = params.showFlightSet || false;
        this.currentFlightSet = params.currentFlightSet;
        this.currentFlightPath = params.currentFlightPath;
        this.currentLocationName = params.currentLocationName;
        this.currentLocationUrl = params.currentLocationUrl;
        this.flightSetPathMap = params.flightSetPathMap || {};
        this.probes = params.probes || App.systems.find(sys => sys.simulatorId === this.simulatorId && sys.class === 'Probes')?.probes || [];
        this.probeAssignments = params.probeAssignments || {};
        this.heat = params.heat || this.heat || 0;
        this.heatRate = params.heatRate || this.heatRate || 1;
        this.coolant = params.coolant || this.coolant || 1;
        this.cooling = params.cooling || false;
        this.locationMap = {}
        this.resyncProbes();
    }


    get stealthFactor() {
        switch (this.engineStatus) {
            case EngineStatus.ENGAGED:
                return 0.5;
            case EngineStatus.FULL_POWER:
                return 0.75;
            case EngineStatus.FLUX:
                return 1;
            default:
                return 0;
        }
    }
    trainingMode(): void {
        const addOnTrainingSets = App.flightSets.filter(f => f.addOnTraining);
        addOnTrainingSets.forEach(f => this.addFlightSet(f));
        this.updateCurrentlySelectedFlightSet(addOnTrainingSets[0].id);
    }

    setHeat(heat) {
        this.heat = Math.min(1, Math.max(0, heat));
        this.heatLevel = heat * 100;
    }
    // We don't really do heat rate... but we could
    setRate(rate) {
        this.heatRate = rate;
    }
    applyCoolant() {
        this.coolant = this.coolant - 0.037;
        this.heat = this.heat - 0.89;
    }

    executeHeatInterval() {
        let heatRate = 0;
        const basicHeatRate = 0.083;
        switch (this.engineStatus) {
            case EngineStatus.ENGAGED:
                heatRate = basicHeatRate;
                break;
            case EngineStatus.FULL_POWER:
                heatRate = basicHeatRate * 2;
                break;
            case EngineStatus.FLUX:
                heatRate = basicHeatRate * 3;
                break;
            default:
                heatRate = 0;
        };
        this.heatLevel = Math.min(100, this.heatLevel + heatRate);
        this.heat = this.heatLevel / 100;
    }

    executeProbeInterval() {
        const flightSetIds = Object.keys(this.probeAssignments);
        const newProbeAssignments = { ...this.probeAssignments };
        for (let i = 0; i < flightSetIds.length; i++) {
            if (!newProbeAssignments[flightSetIds[i]]) {
                newProbeAssignments[flightSetIds[i]] = [];
            }
            let flightSetProbeAssignments = [...newProbeAssignments[flightSetIds[i]]];
            for (let j = 0; j < flightSetProbeAssignments.length; j++) {
                const probeAssignment = flightSetProbeAssignments[j];
                if (!probeAssignment.completed) {
                    if (probeAssignment.currentEta <= 0) {
                        probeAssignment.remainingFuelCellCount -= 1;
                        probeAssignment.currentLocation = probeAssignment.flightPathCoords[probeAssignment.flightPathCoords.length - 1];
                        probeAssignment.completed = true;
                    }
                    else {
                        probeAssignment.currentEta -= 1;
                        probeAssignment.currentLocation = getPositionAtTime(probeAssignment.totalEta - probeAssignment.currentEta, probeAssignment.flightPathCoords.map((each) => { return { ...each, speed: 1, color: 'white' } }), probeAssignment.totalEta);
                    }

                }
                flightSetProbeAssignments[j] = probeAssignment;

            }
            newProbeAssignments[flightSetIds[i]] = flightSetProbeAssignments;
        }
        this.probeAssignments = newProbeAssignments;
    }


    executeLoopInterval() {
        if (this.currentFlightPath && this.currentFlightSet) {

            const currentTimestamp = generateCurrentUnixTimestamp();
            if (this.engineStatus === EngineStatus.STARTUP && this.currentFlightPath) {
                if (this.power.power < this.power.powerLevels[0] || this.damage.damaged) {
                    // shutdown the engine
                    this.engineStatus = EngineStatus.STOPPED;
                    return;
                }
                const timeElapsed = currentTimestamp - this.startingStartupTime;
                if (timeElapsed >= this.currentFlightPath.startOption.secondsForStartup) {
                    const flightPathCoords = generateFlightPathCoordinates(this.currentLocation, this.currentFlightPath, this.getLocationIdMap(), this.getBorderIdMap(), this.currentFlightSet.imageMaxX, this.currentFlightSet.imageMaxY);
                    this.flightPathCoords = flightPathCoords;
                    const totalFlightTime = calculateTotalTime(flightPathCoords, this.currentFlightSet?.pixelsPerSecond || 1);
                    this.remainingEta = totalFlightTime;
                    this.totalEta = totalFlightTime;
                    if (this.currentFlightPath.speedOption.requiresMaxEngines) {
                        this.engineStatus = EngineStatus.FULL_POWER;
                    }
                    else {
                        this.engineStatus = EngineStatus.ENGAGED;
                    }

                }
                else {
                    this.remainingStartupTime = this.currentFlightPath.startOption.secondsForStartup - timeElapsed;
                }
            }
            else if (this.engineStatus === EngineStatus.ENGAGED || this.engineStatus === EngineStatus.FULL_POWER || this.engineStatus === EngineStatus.FLUX) {
                if (this.power.power < this.power.powerLevels[0] || this.damage.damaged) {
                    // shutdown the engine
                    this.engineStatus = EngineStatus.STOPPED;
                    return;
                }
                this.remainingEta = this.remainingEta - 1;
                const currentLocation = getPositionAtTime(this.totalEta - this.remainingEta, this.flightPathCoords, this.totalEta);
                this.currentLocation = currentLocation;
                if (this.remainingEta <= 0) {
                    this.remainingEta = 0;
                    this.engineStatus = EngineStatus.STOPPED;
                    this.currentLocationUrl = this.currentFlightPath.isBorder ? this.getBorderIdMap()[this.currentFlightPath.targetLocationId].iconUrl : this.getLocationIdMap()[this.currentFlightPath.targetLocationId].iconUrl;
                    this.currentLocationName = this.currentFlightPath.isBorder ? this.getBorderIdMap()[this.currentFlightPath.targetLocationId].name : this.getLocationIdMap()[this.currentFlightPath.targetLocationId].name;
                    this.currentFlightPath = undefined;
                    notifyEvent(this.simulatorId, 'info', 'Advanced Navigation', 'Arrival at ' + this.currentLocationName, 'Crew has arrived at ' + this.currentLocationName, 'info');
                }
            }
        }

    }

    getCurrentSpeed() {
        if (this.currentFlightPath && this.currentFlightSet) {
            if (this.engineStatus === EngineStatus.STARTUP && this.currentFlightPath) {
                return { velocity: 0, activating: true };
            }
            else if (this.engineStatus === EngineStatus.ENGAGED || this.engineStatus === EngineStatus.FULL_POWER || this.engineStatus === EngineStatus.FLUX) {
                //this.remainingEta = this.remainingEta - 1;
                const currentLocation = getPositionAtTime(this.totalEta - this.remainingEta, this.flightPathCoords, this.totalEta);
                const nextLocation = getPositionAtTime(this.totalEta - this.remainingEta + 1, this.flightPathCoords, this.totalEta);
                const distance = Math.sqrt(Math.pow(nextLocation.x - currentLocation.x, 2) + Math.pow(nextLocation.y - currentLocation.y, 2));
                const velocity = (distance * (this.currentFlightSet.pixelDistanceModifier || 1));
                return { velocity: Number(velocity.toFixed(3)), activating: false };
            }
            else {
                return { velocity: 0, activating: false };
            }
        }
        return { velocity: 0, activating: false };
    }

    setCoolant(coolant: any): void {
        this.coolant = coolant;
        this.coolantLevel = coolant * 100;
    }

    cool(state?: boolean): void {
    }

    break(report: string, destroyed: boolean, which: string) {
        this.engineStatus = EngineStatus.STOPPED;
        super.break(report, destroyed, which);
    }

    addFlightSet(flightSet: FlightSet) {
        this.flightSets.push(flightSet);
    }

    updateFlightSet(flightSet: FlightSet) {
        const oldFlightPaths = [...this.flightPaths];
        const locationMap = { ...this.locationMap };
        const setMap = { ...this.flightSetPathMap };
        this.currentFlightSet && (setMap[this.currentFlightSet.id] = oldFlightPaths);
        const newFlightPaths = setMap[flightSet.id] || [];
        this.showEta = false;
        locationMap[this.currentFlightSet?.id || ''] = { ...this.currentLocation };
        if (locationMap[flightSet.id]) {
            this.currentLocation = locationMap[flightSet.id]
        }
        else {
            this.currentLocation = flightSet.defaultStartingLocation;
        }
        this.currentLocation = locationMap[flightSet.id] || flightSet.defaultStartingLocation;
        this.flightPaths = newFlightPaths;
        this.remainingEta = 0;
        this.totalEta = 0;
        this.flightPathCoords = [];
        this.currentFlightPath = undefined;
        this.engineStatus = EngineStatus.STOPPED;
        this.currentLocationName = undefined;
        this.currentLocationUrl = undefined;
        this.currentFlightSet = flightSet;
        this.flightSetPathMap = setMap;
        this.locationMap = locationMap;
    }
    updateCurrentlySelectedFlightSet(flightSetId: string) {
        const flightSet = this.flightSets.find(f => f.id === flightSetId);
        this.updateFlightSet(flightSet);
    }
    updateFlightSetData(flightSet: FlightSet) {
        const index = this.flightSets.findIndex(f => f.id === flightSet.id);
        if (index > -1) {
            this.flightSets[index] = flightSet;
        }
        if (this.currentFlightSet?.id === flightSet.id) {
            this.currentFlightSet = flightSet;
        }
    }
    handleCoolantFlush() {
        if (this.heatLevel > this.coolantLevel) {
            const remainingHeat = this.heatLevel - this.coolantLevel;
            this.heatLevel = remainingHeat;
            this.coolantLevel = 0;
            this.coolant = 0;
        }
        else {
            this.coolantLevel -= this.heatLevel;
            this.coolant = this.coolantLevel / 100;
            this.heatLevel = 0;
            this.heat = 0;
        }
    }
    handleEmergencyStop() {
        this.engineStatus = EngineStatus.STOPPED;
    }
    handleResumePath() {
        this.engineStatus = EngineStatus.ENGAGED;
    }
    handleShowFlightSet(show: boolean) {
        this.showFlightSet = show;
    }
    handleShowEta(show: boolean) {
        this.showEta = show;
    }
    handleUpdateEta(eta: number) {
        const lastVisitedCoord = getLastVisitedCoordinate(this.totalEta - this.remainingEta, this.flightPathCoords, this.totalEta);
        const lastCoordIndex = this.flightPathCoords.findIndex(coord => coord.x === lastVisitedCoord.x && coord.y === lastVisitedCoord.y);
        if (lastCoordIndex === 0 && this.currentFlightPath) {
            const flightPath = { ...this.currentFlightPath };
            this.currentFlightPath = flightPath;
            this.flightPathCoords = generateFlightPathCoordinates(this.currentLocation, flightPath, this.getLocationIdMap(), this.getBorderIdMap(), this.currentFlightSet.imageMaxX, this.currentFlightSet.imageMaxY);
            this.remainingEta = eta;
            this.totalEta = eta;
        }
        else if (this.currentFlightPath) {
            // Change the current flight path to remove any secondary route options before the index of the lastCoordIndex
            const newFlightPath = { ...this.currentFlightPath };
            newFlightPath.secondaryRouteOptions = newFlightPath.secondaryRouteOptions?.filter((_, index) => index > lastCoordIndex);
            this.currentFlightPath = newFlightPath;
            this.flightPathCoords = generateFlightPathCoordinates(this.currentLocation, newFlightPath, this.getLocationIdMap(), this.getBorderIdMap(), this.currentFlightSet.imageMaxX, this.currentFlightSet.imageMaxY);
            this.remainingEta = eta;
            this.totalEta = eta;
        }
    }
    handleEngineFlux() {
        if (this.engineStatus === EngineStatus.FLUX) {
            if (this.currentFlightPath && this.currentFlightPath.speedOption.requiresMaxEngines) {
                this.engineStatus = EngineStatus.FULL_POWER;
            }
            else {
                this.engineStatus = EngineStatus.ENGAGED;
            }
        } else {
            this.engineStatus = EngineStatus.FLUX;
        }
    }
    handleSetCoolantLevel(level: number) {
        this.coolantLevel = level;
        this.coolant = level / 100;
    }
    handleSetHeatLevel(level: number) {
        this.heatLevel = level;
        this.heat = level;
    }
    handleUpdateCurrentFlightPath(flightPath: NavigationRoute) {
        this.currentFlightPath = flightPath;
    }
    handleOverrideLocation(location: BasicCoordinate, currentLocationUrl?: string, currentLocationName?: string) {
        this.currentLocation = location;
        this.currentFlightPath = undefined;
        this.currentLocationUrl = currentLocationUrl;
        this.currentLocationName = currentLocationName;
        this.engineStatus = EngineStatus.STOPPED;
    }

    handleAddAssignment(probeId: string, poiId: string) {
        if (this.currentFlightSet) {
            const newProbeAssignments = { ...this.probeAssignments };
            if (!newProbeAssignments[this.currentFlightSet.id]) {
                newProbeAssignments[this.currentFlightSet.id] = [];
            }
            const POI = this.currentFlightSet?.pointsOfInterest.find(poi => poi.id === poiId);
            const probe = this.getAvailableProbes().find(probe => probe.id === probeId);
            if (POI && probe) {
                const flightPathCoords = [getProbeCurrentLocation(this.currentLocation, probe, newProbeAssignments[this.currentFlightSet.id]), { ...POI.location }];
                const totalFlightTime = calculateTotalTime(flightPathCoords.map((each) => { return { ...each, speed: 1, color: 'white' } }), (this.currentFlightSet.pixelsPerSecond / 2));
                const allPreviousAssignments = newProbeAssignments[this.currentFlightSet.id].filter((each) => each.probeId === probeId);
                const allOtherAssignments = newProbeAssignments[this.currentFlightSet.id].filter((each) => each.probeId !== probeId);
                newProbeAssignments[this.currentFlightSet.id] = allOtherAssignments;
                const dataArray = allPreviousAssignments[0] ? [...allPreviousAssignments[0].data] : [];
                dataArray.push("Probe has been assigned to " + POI.name);
                newProbeAssignments[this.currentFlightSet.id].push({
                    probeId,
                    currentEta: totalFlightTime,
                    totalEta: totalFlightTime,
                    currentLocation: this.currentLocation,
                    flightPathCoords,
                    remainingFuelCellCount: countProbeFuelCells(probe, allPreviousAssignments[0]),
                    completed: false,
                    data: dataArray,
                    hasBeenViewed: false,
                    targetLocationName: POI.name
                });
            }
            this.probeAssignments = newProbeAssignments;
        }
    }
    getLocationIdMap() {
        return generateLocationIdMap(this.currentFlightSet ? this.currentFlightSet.pointsOfInterest : [])
    }
    getBorderIdMap() {
        return generateBorderIdMap(this.currentFlightSet ? this.currentFlightSet.borders : []);
    }
    getAvailableProbes() {
        const usedProbes: Record<string, boolean> = {};
        const flightSetIds = Object.keys(this.probeAssignments);
        for (let i = 0; i < flightSetIds.length; i++) {
            if (flightSetIds[i] !== this.currentFlightSet?.id) {
                const flightSetProbeAssignments = this.probeAssignments[flightSetIds[i]];
                for (let j = 0; j < flightSetProbeAssignments.length; j++) {
                    usedProbes[flightSetProbeAssignments[j].probeId] = true;
                }
            }

        }
        return this.probes.filter(probe => !usedProbes[probe.id])
            .filter(probe => !probe.equipment.some(equipment => equipment.id === 'probe-network-package'))
            .filter((probe) => !(Number(probe.name) < 9));
    }

    handleEngageFlightPath(flightPath: NavigationRoute) {
        this.currentFlightPath = flightPath;
        this.engineStatus = EngineStatus.STARTUP;
        this.startingStartupTime = generateCurrentUnixTimestamp();
        this.showEta = false;
    }
    handleSaveFlightPath(flightPath: NamedNavigationRoute) {
        const newFlightPaths = [...this.flightPaths];
        newFlightPaths.push(flightPath);
        this.flightPaths = newFlightPaths;
    }
    resyncProbes() {
        const probes = App.systems.find(sys => sys.simulatorId === this.simulatorId && sys.class === 'Probes')?.probes || [];
        this.probes = probes;
        // Now make sure all probes still exist in the probe assignments
        const newProbeAssignments = { ...this.probeAssignments };
        const flightSetIds = Object.keys(newProbeAssignments);
        for (let i = 0; i < flightSetIds.length; i++) {
            const flightSetProbeAssignments = newProbeAssignments[flightSetIds[i]];
            newProbeAssignments[flightSetIds[i]] = flightSetProbeAssignments.filter((each) => probes.find(probe => probe.id === each.probeId));
        }
        this.probeAssignments = newProbeAssignments;
    }
    overrideProbeAssignments(probeAssignments: Record<string, ProbeAssignment[]>) {
        this.probeAssignments = probeAssignments;
    }
}

const generateBorderIdMap = (borders: MapBorder[]) => {
    const borderMap: Record<string, MapBorder> = {};
    borders.forEach((each) => {
        borderMap[each.id] = each
    });
    return borderMap;
}

const generateLocationIdMap = (pointsOfInterest: PointOfInterest[]) => {
    const locationMap: Record<string, PointOfInterest> = {};
    pointsOfInterest.forEach((each) => {
        locationMap[each.id] = each
    });
    return locationMap;
}

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
