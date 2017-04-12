import { System } from './generic';
import uuid from 'uuid';
export default class Targeting extends System {
 constructor(params) {
  super(params);
  this.class = 'Targeting';
  this.type = 'Targeting';
  this.name = params.name || 'Targeting';
  this.contacts = [];
  this.quadrants = false;
  const contacts = params.contacts || [];
  contacts.forEach(c => this.contacts.push(new Target(c)));
}
createTarget(target){
  this.contacts.push(new Target(target));
}
targetTarget(targetId){
  this.contacts.find(c => c.id === targetId).target();
}
untargetTarget(targetId){
  this.contacts.find(c => c.id === targetId).untarget();
}
targetSystem(targetId, system){
  this.contacts.find(c => c.id === targetId).untarget();
}
updateTarget(target){
  this.contacts.find(c => c.id === target.id).update(target);
}
removeTarget(id){
  this.contacts = this.contacts.filter(c => c.id !== id);
}
}

class Target {
  constructor(params){
    this.id = params.id || uuid.v4();
    this.name = params.name || 'Target';
    this.size = params.size || 1;
    this.targeted = params.targeted || false;
    this.system = params.system || 'General';
    this.icon = params.icon || 'Generic';
    this.picture = params.picture || 'Generic';
    this.speed = params.speed || 1;
    this.quadrant = params.quadrant || 1;
  }
  target(){
    this.targeted = true;
  }
  untarget(){
    this.targeted = false;
  }
  system(sys){
    this.system = sys;
  }
  update({name, size, targeted, system, icon, picture, speed, quadrant}){
    if (name) this.name = name;
    if (size) this.size = size;
    if (targeted) this.targeted = targeted;
    if (system) this.system = system;
    if (icon) this.icon = icon;
    if (picture) this.picture = picture;
    if (speed) this.speed = speed;
    if (quadrant) this.quadrant = quadrant;
  }
}