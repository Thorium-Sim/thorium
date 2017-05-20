import { System } from './generic';
import uuid from 'uuid';
//TODO: Also make it so you can do sensors targeting
//As well as quadrant targeting
export default class Targeting extends System {
  constructor(params) {
    super(params);
    this.class = 'Targeting';
    this.type = 'Targeting';
    this.name = params.name || 'Targeting';
    this.contacts = [];
    this.classes = [];
    this.quadrants = false;
    const contacts = params.contacts || [];
    const classes = params.classes || [];
    contacts.forEach(c => this.contacts.push(new Target(c)));
    classes.forEach(c => this.classes.push(new TargetClass(c)));
  }
  createTarget(targetClass){
    this.contacts.push(new Target({class:targetClass}, this.id));
  }
  targetTarget(targetId){
    this.contacts.find(c => c.id === targetId).target();
  }
  untargetTarget(targetId){
    this.contacts.find(c => c.id === targetId).untarget();
  }
  targetSystem(targetId, system){
    this.contacts.find(c => c.id === targetId).updateSystem(system);
  }
  removeTarget(id){
    this.contacts = this.contacts.filter(c => c.id !== id);
  }
  setTargetClassCount(classId, count){
    const classContacts = this.contacts.filter(c => c.class === classId);
    if (classContacts.length === count) return;
    if (count < 0) return;
    if (count === 0){
      classContacts.forEach(c => this.removeTarget(c.id));
      return;
    }
    if (classContacts.length < count){
      //Add some more
      for(let i = count - classContacts.length; i > 0; i--){
        this.createTarget(classId);
      }
    } else {
      //Remove some
      for(let i = classContacts.length - count; i > 0; i--){
        this.removeTarget(this.contacts[i].id);
      }
    }
  }
  addTargetClass(classInput){
    this.classes.push(new TargetClass(classInput, this.id));
  }
  removeTargetClass(classId){
    this.classes = this.classes.filter(c => c.id !== classId);
    //Remove the targets too
    this.contacts = this.contacts.filter(c => c.class !== classId);
  }
  updateTargetClass(classInput){
    this.classes.find(c => c.id === classInput.id).update(classInput);
  }
}

class TargetClass {
  constructor(params, systemId){
    this.id = params.id || uuid.v4();
    this.systemId = systemId || params.systemId || '';
    this.name = params.name || 'Target';
    this.size = params.size || 1;
    this.icon = params.icon || 'Generic';
    this.picture = params.picture || 'Generic';
    this.speed = params.speed || 1;
    this.quadrant = params.quadrant || 1;
  }
  update({name, size, system, icon, picture, speed, quadrant, count}){
    if (name) this.name = name;
    if (size) this.size = size;
    if (system) this.system = system;
    if (icon) this.icon = icon;
    if (picture) this.picture = picture;
    if (speed) this.speed = speed;
    if (quadrant) this.quadrant = quadrant;
  }
}

class Target {
  constructor(params, systemId){
    this.id = params.id || uuid.v4();
    this.systemId = systemId || '';
    this.targeted = params.targeted || false;
    this.system = params.system || 'General';
    this.class = params.class || '';
  }
  target(){
    this.targeted = true;
  }
  untarget(){
    this.targeted = false;
  }
  updateSystem(sys){
    this.system = sys;
  }
}