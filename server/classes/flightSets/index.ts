export type PointOfInterest = {
    id: string;
    name: string;
    location: {
        x: number;
        y: number;
    }
    isVisible: boolean;
    isFogOfWar: boolean;
    speedIndex: number;
    riskIndex: number;
    type: PointOfInterestType;
    information: PointOfInterestInformation;
    hazards: NavigationHazard[];
    iconUrl: string
    fullImageUrl: string;
    transitOptions?: SecondaryStopTransitOption[];
    showName?: boolean;
}


export type SecondaryStopTransitOption = {
    name: string;
    timeModifier: number;
    riskModifier: number;
    iconUrl: string;
}

export type PointOfInterestInformation = {
    basicInformation: string;
    hasBasicInformation: boolean;
    detailedInformation: string;
    hasDetailedInformation: boolean;
    secretInformation: string;
    hasSecretInformation: boolean;
}

export type MapBorder = {
    name: string;
    id: string;
    location: MapBorderLocation;
    iconUrl: string;
    riskIndex: number;
}

export type MapBorderSide = 'top' | 'right' | 'bottom' | 'left' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type MapBorderLocation = {
    side: MapBorderSide;
}

export type PointOfInterestObject = {
    category: string
    imageUri: string;
}

export type PointOfInterestType = PointOfInterestObject



export type NavigationHazardNavOptions = {
    action: string;
    speedModifier: number;
    riskModifier: number;
    imgUrl: string;
    isArrivalOnly: boolean;
}

export type NavigationHazard = {
    name: string;
    description: string;
    navOptions: NavigationHazardNavOptions[];
    imgUrl: string;
}

export type NavigationExitOptions = {
    id: string;
    name: string;
    riskModifier: number;
    imgUrl: string
}

export type NavigationStartOptions = {
    id: string;
    name: string;
    riskModifier: number;
    imgUrl: string;
    secondsForStartup: number;
}

export type NavigationSpeedOptions = {
    id: string;
    name: string;
    speedModifier: number;
    riskModifier: number;
    requiresMaxEngines: boolean;
    imgUrl: string
}

export type SecondaryNavigationRouteOption = {
    targetLocationId: string;
}

export type NavigationRoute = {
    targetLocationId: string;
    hazardChoiceMap: { [poiId: string]: string };
    secondaryRouteOptions: SecondaryNavigationRouteOption[];
    isBorder: boolean;
} & NavigationFlightPattern;

export type NavigationFlightPattern = {
    startOption: NavigationStartOptions;
    speedOption: NavigationSpeedOptions;
    exitOption: NavigationExitOptions;
}

export type NamedNavigationRoute = {
    name: string;
    id: string;
} & NavigationRoute;


export type FlightSet = {
    backgroundImg: string;
    startOptions: NavigationStartOptions[];
    speedOptions: NavigationSpeedOptions[];
    exitOptions: NavigationExitOptions[];
    pointsOfInterest: PointOfInterest[];
    defaultStartingLocation: BasicCoordinate;
    id: string;
    name: string;
    borders: MapBorder[];
    imageMaxX: number;
    imageMaxY: number;
    pixelsPerSecond: number;
    label?: string
    probeLaunchRangeRadius: number;
}

export type BasicCoordinate = {
    x: number,
    y: number
}

export type ColoredCoordinate = {
    color: string
} & BasicCoordinate

export type IdCoordinate = {
    id: string
} & BasicCoordinate

export type NamedCoordinate = {
    name: string
} & BasicCoordinate

export type ShownCoordinate = {
    showName?: boolean
} & NamedCoordinate;

export type FullCoordinate = {
    speed: number

} & ColoredCoordinate


export type ProbeAssignment = {
    probeId: string;
    flightPathCoords: { x: number, y: number }[];
    data: string[]
    remainingFuelCellCount: number;
    hasBeenViewed: boolean;
    currentLocation: { x: number, y: number };
    targetLocationName: string;
    currentEta: number;
    totalEta: number;
    completed: boolean;
}

export type ProbeType = "class-i" | "class-ii" | "class-iii" | "defense" | "science";

export type Probe = {
    id: string;
    name: string;
    type: ProbeType;
    equipment: {
        id: string;
        count: number;
    }[]
}

export enum EngineStatus {
    FULL_POWER = "Full power",
    STARTUP = "Starting up",
    ENGAGED = "Engaged",
    FLUX = "Detecting fluctuations",
    STOPPED = "Disengaged"
}
