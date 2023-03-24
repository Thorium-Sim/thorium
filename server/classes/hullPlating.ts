import { System } from "./generic";


export default class HullPlating extends System {
    engaged: boolean
    mode: string
    constructor(params: any = {}) {
        super(params);
        this.class = "HullPlating"
        this.type = "HullPlating"
        this.wing = params.wing || "left";
        this.name = params.name || "Hull Plating";
        this.displayName = params.displayName || "Hull Plating"
        this.engaged = false
        this.mode = 'kinetic'
    }
    get stealthFactor() {
        return 0;
    }

    setEngaged(engaged: boolean) {
        this.engaged = engaged
    }

    setMode(mode: string) {
        this.mode = mode;
    }

}