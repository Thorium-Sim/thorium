import { NavigationRoute } from "containers/FlightDirector/FlightSets/types";

export const DEFAULT_FLIGHT_PATH: NavigationRoute = {
    targetLocationId: '',
    //hazardChoiceMap: {},
    secondaryRouteOptions: [],
    startOption: {
        id: '',
        secondsForStartup: 0,
        name: '',
        imgUrl: "",
        riskModifier: 0
    },
    speedOption: {
        name: "",
        id: '',
        speedModifier: 1,
        riskModifier: 1,
        requiresMaxEngines: false,
        imgUrl: ""
    },
    exitOption: {
        name: '',
        id: '',
        imgUrl: "",
        riskModifier: 0
    },
    isBorder: false,
}