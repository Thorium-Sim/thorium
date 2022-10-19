import RemoteAccess from "./remoteAccess";

// A separate object for vestigial parts of the ship
export default class Ship {
  clamps: boolean;
  ramps: boolean;
  airlock: boolean;
  legs: boolean;
  bridgeCrew: number;
  extraPeople: number;
  radiation: number;
  speed: number;
  selfDestructTime: number | null;
  selfDestructCode: string | null;
  selfDestructAuto: boolean;
  remoteAccessCodes: RemoteAccess[];
  extraSystems: [];
  inventoryLogs: {
    timestamp: Date;
    log: string;
  }[];
  constructor(params: Partial<Ship> = {}, newlyCreated: boolean = false) {
    this.clamps = params.clamps || false; // Detached
    this.ramps = params.ramps || false; // Retracted
    this.airlock = params.airlock || false; // Closed
    this.legs = params.legs || false; //Retracted
    this.bridgeCrew = params.bridgeCrew || 14;
    this.extraPeople = params.extraPeople || 0;
    this.radiation = params.radiation || 0.1;
    this.speed = params.speed || 0;
    this.selfDestructTime = params.selfDestructTime || null;
    this.selfDestructCode = params.selfDestructCode || null;
    this.selfDestructAuto = params.selfDestructAuto || false; // Automatically black out stations when self destructed
    this.remoteAccessCodes = [];
    this.extraSystems = [];
    const codes = params.remoteAccessCodes || [];
    codes.forEach(c => this.remoteAccessCodes.push(new RemoteAccess(c)));

    // Inventory Logs
    this.inventoryLogs = newlyCreated
      ? []
      : params.inventoryLogs
      ? params.inventoryLogs.concat()
      : [];
  }
}
