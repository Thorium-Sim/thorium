import { System } from "./generic";

export default class Navigation extends System {
  constructor(params = {}) {
    super(params);
    this.class = "Navigation";
    this.type = "Navigation";
    this.name = params.name || "Navigation";
    this.calculate = params.calculate || true; //Whether the course is calculated or give from Sensors
    this.currentCourse = params.currentCourse || {
      x: null,
      y: null,
      z: null
    };
    this.calculatedCourse = params.calculatedCourse || {
      x: null,
      y: null,
      z: null
    };
    this.destination = params.destination || null;
    this.destinations = params.destinations || [];
    this.scanning = params.scanning || false;
    this.presets = params.presets || [];
  }
  toggleCalculate(which) {
    this.calculate = which;
  }
  calculateCourse(destination) {
    this.destination = destination;
    this.scanning = true;
  }
  setDestinations(destinations) {
    this.destinations = destinations || [];
    this.scanning = false;
  }
  setDestination(destination) {
    this.destination = destination;
  }
  setScanning(scanning) {
    this.scanning = scanning;
  }
  cancelCalculation() {
    this.scanning = false;
  }
  courseResponse(x, y, z) {
    this.scanning = false;
    this.calculatedCourse = {
      x,
      y,
      z
    };
  }
  courseEntry(x, y, z) {
    this.currentCourse = {
      x,
      y,
      z
    };
  }
  setPresets(presets) {
    this.presets = presets || [];
  }
}
