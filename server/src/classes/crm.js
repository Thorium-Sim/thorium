import { System } from "./generic";
import * as THREE from "three";
import uuid from "uuid";
class CrmFighter {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId;
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
    this.phaserTarget = params.phaserTarget || null;
    this.phaserStrength = 0.03; // Hit per tick
    this.torpedoCount = params.torpedoCount || 6;
    this.torpedoLoaded = params.torpedoLoaded || false;
    this.destroyed = params.destroyed || false;
    this.docked = params.docked || true;
    this.position =
      params.position || params.type === "fighter"
        ? { x: 0, y: 0, z: 0 }
        : {
            x: Math.random() * 2000 - 1000,
            y: Math.random() * 2000 - 1000,
            z: Math.random() * 2000 - 1000
          };
    this.velocity = params.velocity || {
      x: 0,
      y: 0,
      z: 0
    };
    this.acceleration = {
      x: 0,
      y: 0,
      z: 0
    };
    this.maxPosition = 1000;
    this.maxVelocity = this.clientId ? 2.5 : 1;
    this.maxAcceleration = 0.1;
    this.interval = 0;
  }

  setPhaserCharge(phaser) {
    this.phaserLevel = Math.min(1, Math.max(0, phaser));
  }
  setPosition({ x, y, z }) {
    this.position = {
      x: Math.min(this.maxPosition, Math.max(-1 * this.maxPosition, x)),
      y: Math.min(this.maxPosition, Math.max(-1 * this.maxPosition, y)),
      z: Math.min(this.maxPosition, Math.max(-1 * this.maxPosition, z))
    };
  }
  setVelocity({ x, y, z }) {
    this.velocity = {
      x: Math.min(this.maxVelocity, Math.max(-1 * this.maxVelocity, x)),
      y: Math.min(this.maxVelocity, Math.max(-1 * this.maxVelocity, y)),
      z: Math.min(this.maxVelocity, Math.max(-1 * this.maxVelocity, z))
    };
  }
  setAcceleration({ x, y, z }) {
    this.acceleration = {
      x: Math.min(this.maxAcceleration, Math.max(-1 * this.maxAcceleration, x)),
      y: Math.min(this.maxAcceleration, Math.max(-1 * this.maxAcceleration, y)),
      z: Math.min(this.maxAcceleration, Math.max(-1 * this.maxAcceleration, z))
    };
  }
  setShield(shield) {
    this.shieldRaised = shield;
  }
  loadTorpedo() {
    this.torpedoLoaded = true;
  }
  fireTorpedo() {
    this.torpedoLoaded = false;
    this.torpedoCount--;
  }
  setPhaserTarget(target) {
    this.phaserTarget = target;
  }
  hit(damage) {
    if (this.shield && this.shieldRaised) {
      this.shield = this.shield - damage;
      if (this.shield < 0) {
        damage = this.shield * -1;
        this.shield = 0;
        this.shieldRaised = false;
      } else {
        return;
      }
    }
    this.hull = this.hull - damage;
    if (this.hull < 0) {
      this.destroyed = true;
    }
  }
}

class CrmTorpedo {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.fighterId = params.fighterId;
    this.position = params.position || { x: 0, y: 0, z: 0 };
    this.velocity = params.velocity || { x: 0, y: 0, z: 0 };
    // Include the starting position so the torpedo has limited range
    this.startingPosition = params.startingPosition || { x: 0, y: 0, z: 0 };
    this.destroyed = params.destroyed || false;

    // Random damage value that this torpedo will inflict
    this.strength = params.strength || Math.round(Math.random() * 0.5) + 0.5;
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
    this.fighterImage = params.fighterImage || "/Docking Images/Default.png";

    this.fighters = [];
    if (params.fighters && params.fighters.length > 0) {
      params.fighters.forEach(f =>
        this.fighters.push(
          new CrmFighter({
            ...f,
            type: "fighter",
            simulatorId: this.simulatorId
          })
        )
      );
    }
    this.enemies = [];
    if (params.enemies && params.enemies.length > 0) {
      params.enemies.forEach(f =>
        this.enemies.push(
          new CrmFighter({ ...f, simulatorId: this.simulatorId })
        )
      );
    }

    this.torpedos = [];

    if (params.torpedos && params.torpedos.length > 0) {
      params.torpedos.forEach(t =>
        this.torpedos.push(new CrmTorpedo({ ...t }))
      );
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
    this.enemies.push(
      new CrmFighter({ ...enemy, simulatorId: this.simulatorId })
    );
  }
  addFighter(f = {}) {
    const fighter = new CrmFighter({
      ...f,
      type: "fighter",
      simulatorId: this.simulatorId
    });
    this.fighters.push(fighter);
    return fighter;
  }
  destroyTorpedo(torpedoId) {
    const torpedo = this.torpedos.find(t => t.id === torpedoId);
    torpedo.destroyed = true;
    setTimeout(() => {
      this.torpedos = this.torpedos.filter(t => t.id !== torpedoId);
    }, 1000);
  }
  fireTorpedo(fighterId, targetId) {
    const torpedoSpeed = 3;
    // Get the fighter
    const allFighters = this.enemies.concat(this.fighters);
    const fighter = allFighters.find(
      f => f.id === fighterId || f.clientId === fighterId
    );
    const target = allFighters.find(
      f => f.id === targetId || f.clientId === targetId
    );
    const fighterPosition = new THREE.Vector3(
      ...Object.values(fighter.position)
    );
    // fighter.fireTorpedo();
    const targetPosition = new THREE.Vector3(...Object.values(target.position));
    const velocity = targetPosition
      .sub(fighterPosition)
      .normalize()
      .multiplyScalar(torpedoSpeed);
    const torpedo = new CrmTorpedo({
      fighterId: fighter.id,
      position: fighter.position,
      startingPosition: fighter.position,
      velocity
    });
    this.torpedos.push(torpedo);
  }
}
