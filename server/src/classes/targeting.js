import { System } from "./generic";
import uuid from "uuid";

class TargetClass {
  constructor(params, systemId) {
    this.id = params.id || uuid.v4();
    this.systemId = systemId || params.systemId || "";
    this.name = params.name || "Target";
    this.size = params.size || 1;
    this.icon = params.icon || "/Sensor Contacts/Icons/Default.svg";
    this.picture = params.picture || "/Sensor Contacts/Pictures/Default.png";
    this.speed = params.speed || 1;
    this.moving = params.moving || true;
    this.quadrant = params.quadrant || 1;
  }
  update({
    name,
    size,
    system,
    icon,
    picture,
    speed,
    quadrant,
    moving,
    count
  }) {
    if (name) this.name = name;
    if (size) this.size = size;
    if (system) this.system = system;
    if (icon) this.icon = icon;
    if (picture) this.picture = picture;
    if (speed) this.speed = speed;
    if (moving || moving === false) this.moving = moving;
    if (quadrant) this.quadrant = quadrant;
  }
}

class Target {
  constructor(params, systemId) {
    this.id = params.id || uuid.v4();
    this.systemId = systemId || "";
    this.targeted = params.targeted || false;
    this.system = params.system || "General";
    this.class = params.class || "";
    this.destroyed = params.destroyed || false;
  }
  target() {
    this.targeted = true;
  }
  untarget() {
    this.targeted = false;
  }
  updateSystem(sys) {
    this.system = sys;
  }
  destroy() {
    this.destroyed = true;
  }
}

export default class Targeting extends System {
  constructor(params) {
    super(params);
    this.class = "Targeting";
    this.type = "Targeting";
    this.name = params.name || "Targeting";
    this.contacts = [];
    this.classes = [];
    this.quadrants = false;
    const contacts = params.contacts || [];
    const classes = params.classes || [];
    contacts.forEach(c => this.contacts.push(new Target(c, this.id)));
    classes.forEach(c => this.classes.push(new TargetClass(c, this.id)));

    // Sensor-grid based targeting
    this.coordinateTargeting = params.coordinates || false;
    this.targetedSensorContact = params.targetedSensorContact || null;
    this.calculatedTarget = params.calculatedTarget || null;
    this.enteredTarget = params.enteredTarget || null;
  }
  trainingMode() {
    const id = uuid.v4();
    this.addTargetClass({
      id,
      name: "Target",
      icon: "/Sensor Contacts/Icons/N.svg",
      picture: "/Sensor Contacts/Pictures/Alotec Battleship.png"
    });
    this.setTargetClassCount(id, 2);
  }
  createTarget(targetClass) {
    this.contacts.push(new Target({ class: targetClass }, this.id));
  }
  targetTarget(targetId) {
    this.contacts.find(c => c.id === targetId).target();
  }
  untargetTarget(targetId) {
    const contact = this.contacts.find(c => c.id === targetId);
    if (contact) contact.untarget();
    this.enteredTarget = null;
  }
  targetSystem(targetId, system) {
    this.contacts.find(c => c.id === targetId).updateSystem(system);
  }
  removeTarget(id) {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
  destroyTarget(id) {
    this.contacts.find(c => c.id === id).destroy();
    this.untargetTarget(id);
    setTimeout(() => {
      this.removeTarget(id);
    }, 500);
  }
  setTargetClassCount(classId, count) {
    const classContacts = this.contacts.filter(c => c.class === classId);
    if (classContacts.length === count) return;
    if (count < 0) return;
    if (count === 0) {
      classContacts.forEach(c => this.removeTarget(c.id));
      return;
    }
    if (classContacts.length < count) {
      //Add some more
      for (let i = count - classContacts.length; i > 0; i--) {
        this.createTarget(classId);
      }
    } else {
      //Remove some
      for (let i = classContacts.length - count; i > 0; i--) {
        this.removeTarget(this.contacts[i].id);
      }
    }
  }
  addTargetClass(classInput) {
    // no duplicate classes
    if (!classInput.id || !this.classes.find(c => c.id === classInput.id)) {
      this.classes.push(new TargetClass(classInput, this.id));
    }
  }
  removeTargetClass(classId) {
    this.classes = this.classes.filter(c => c.id !== classId);
    //Remove the targets too
    this.contacts = this.contacts.filter(c => c.class !== classId);
  }
  updateTargetClass(classInput) {
    this.classes.find(c => c.id === classInput.id).update(classInput);
  }
  setCalculatedTarget(coordinates, contactId) {
    this.targetedSensorContact = contactId;
    this.calculatedTarget = {};
    this.calculatedTarget.x = (
      Math.round(coordinates.x * 100000) / 100
    ).toString();
    this.calculatedTarget.y = (
      Math.round(coordinates.y * 100000) / 100
    ).toString();
    this.calculatedTarget.z = (
      Math.round(coordinates.z * 100000) / 100
    ).toString();
  }
  setEnteredTarget(coordinates) {
    this.enteredTarget = coordinates;
  }
  setCoordinateTargeting(which) {
    this.coordinateTargeting = which;
  }
  break(report, destroyed, which) {
    this.contacts.forEach(t => t.untarget());
    super.break(report, destroyed, which);
  }
  setPower(powerLevel) {
    if (
      this.power.powerLevels.length &&
      powerLevel < this.power.powerLevels[0]
    ) {
      this.contacts.forEach(t => t.untarget());
    }
    super.setPower(powerLevel);
  }
}
