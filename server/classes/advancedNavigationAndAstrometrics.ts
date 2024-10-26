import { BasicCoordinate, EngineStatus, FlightSet, FullCoordinate, MapBorder, NamedNavigationRoute, NavigationRoute, PointOfInterest, Probe, ProbeAssignment } from "./flightSets";
import { calculateTotalTime, countProbeFuelCells, generateCurrentUnixTimestamp, generateFlightPathCoordinates, getPositionAtTime, getProbeCurrentLocation } from "./flightSets/helpers";
import { System } from "./generic";

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
        this.probes = params.probes || [];
        this.probeAssignments = params.probeAssignments || {};
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
                this.remainingEta = this.remainingEta - 1;
                const currentLocation = getPositionAtTime(this.totalEta - this.remainingEta, this.flightPathCoords, this.totalEta);
                this.currentLocation = currentLocation;
                if (this.remainingEta <= 0) {
                    this.remainingEta = 0;
                    this.engineStatus = EngineStatus.STOPPED;
                    this.currentLocationUrl = this.currentFlightPath.isBorder ? this.getBorderIdMap()[this.currentFlightPath.targetLocationId].iconUrl : this.getLocationIdMap()[this.currentFlightPath.targetLocationId].iconUrl;
                    this.currentLocationName = this.currentFlightPath.isBorder ? this.getBorderIdMap()[this.currentFlightPath.targetLocationId].name : this.getLocationIdMap()[this.currentFlightPath.targetLocationId].name;
                    this.currentFlightPath = undefined;
                }
            }
        }

    }

    break(report: string, destroyed: boolean, which: string) {
        this.engineStatus = EngineStatus.STOPPED;
        super.break(report, destroyed, which);
    }

    updateFlightSet(flightSet: FlightSet) {
        const oldFlightPaths = [...this.flightPaths];
        const setMap = { ...this.flightSetPathMap };
        this.currentFlightSet && (setMap[this.currentFlightSet.id] = oldFlightPaths);
        const newFlightPaths = setMap[flightSet.id] || [];
        this.showEta = false;
        this.currentLocation = flightSet.defaultStartingLocation;
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
    }
    handleCoolantFlush() {
        if (this.heatLevel > this.coolantLevel) {
            const remainingHeat = this.heatLevel - this.coolantLevel;
            this.heatLevel = remainingHeat;
            this.coolantLevel = 0;
        }
        else {
            this.coolantLevel -= this.heatLevel;
            this.heatLevel = 0;
        }
    }
    handleEmergencyStop() {
        this.engineStatus = EngineStatus.STOPPED;
    }
    handleResumePath() {
        this.engineStatus = EngineStatus.ENGAGED;
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
