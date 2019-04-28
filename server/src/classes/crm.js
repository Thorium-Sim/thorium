import { System } from "./generic";
import uuid from "uuid";
class CrmFighter {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.clientId = params.clientId || "";
    this.icon = params.icon || "/Sensor Contacts/Icons/Default.svg";
    this.size = params.size || 1;
    this.speed = params.speed || 1;
    this.strength = params.strength || 1;
    this.attacking = params.attacking || true;
    this.hull = params.hull || 1;
    this.shield = params.shield || 1;
    this.shieldRaised = params.shieldRaised || false;
    this.phaserLevel = params.phaserLevel || 0;
    this.torpedoCount = params.torpedoCount || 6;
    this.torpedoLoaded = params.torpedoLoaded || false;
    this.destroyed = params.destroyed || false;
    this.docked = params.docked || true;
    this.position = params.position || {
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 2000 - 1000
    };
    this.velocity = params.velocity || {
      x: 0,
      y: 0,
      z: 0
    };
    this.maxVelocity = 2;
  }
}

export default class Crm extends System {
  constructor(params) {
    super(params);
    this.class = "Crm";
    this.type = "Crm";
    this.name = params.name || "Crm";
    this.displayName = params.name || "CRM-114";

    this.password = params.password || "";
    this.activated = params.activated || false;
    this.fighters = [];
    if (params.fighters && params.fighters.length > 0) {
        params.fighters.forEach(f => this.fighters.push(new CrmFighter(f)))
    }
    this.enemies = [];
    if (params.enemies && params.enemies.length > 0) {
        params.enemies.forEach(f => this.enemies.push(new CrmFighter(f)))
    }
  }
  get fighterCount() {
      return this.fighters.length;
  }
  get enemyCount() {
      return this.enemies.length;
  }
  get fighterDestroyedCount() {
      return this.fighters.filter(f => f.destroyed).length;
  }
  get enemyDestroyedCount() {
      return this.enemies.filter(f => f.destroyed).length;
  }
  changePassword(newPassword) {
    this.password = newPassword;
  }
  setActivated(activated) {
    this.activated = activated;
  }
  break(report, destroyed, which) {
    this.activated = false;
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (this.power && this.power.powerLevels[0] > powerLevel) {
      this.activated = false;
    }
    super.setPower(powerLevel);
  }
  addEnemy(enemy = {}) {
    this.enemies.push(new CrmFighter(enemy));
  }
}
