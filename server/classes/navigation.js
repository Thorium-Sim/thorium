import { System } from './generic';

export default class Navigation extends System {
  constructor(params) {
    super(params);
    this.class = 'Navigation';
    this.type = 'Navigation';
    this.name = params.name || 'Navigation';
    this.calculate = params.calculate || true; //Whether the course is calculated or give from Sensors
    this.currentCourse = params.currentCourse || {
      x: null,
      y: null,
      z: null
    }
    this.calculatedCourse = params.calculatedCourse || {
      x: null,
      y: null,
      z: null
    }
    this.destination = params.destination || null;
    this.scanning = params.scanning || false;
  }
  calculateCourse(destination) {
    this.destination = destination;
    this.scanning = true;
    this.calculatedCourse = {
      x: null,
      y: null,
      z: null
    }
  }
  cancelCalculation(){
    this.scanning = false;
    this.calculatedCourse = {
      x: null,
      y: null,
      z: null
    }
  }
  courseResponse(x, y, z) {
    this.calculatedCourse = {
      x,
      y,
      z
    }
  }
  courseEntry(x, y, z) {
    this.currentCourse = {
      x,
      y,
      z
    }
  }
}