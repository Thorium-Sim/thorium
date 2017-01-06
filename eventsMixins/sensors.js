export default (Base) => class extends Base {
  addSensorsArray(param) {
    this.handleEvent(param, 'addSensorsArray', 'addedSensorsArray');
  }
  removeSensorsArray(param) {
    this.handleEvent(param, 'removeSensorsArray', 'removedSensorsArray');
  }
  sensorScanRequest(param) {
    this.handleEvent(param, 'sensorScanRequest', 'sensorScanRequested');
  }
  sensorScanResult(param) {
    this.handleEvent(param, 'sensorScanResult', 'sensorScanResulted');
  }
  processedData(param) {
    this.handleEvent(param, 'processedData', 'processedDatad');
  }
  sensorScanCancel(param) {
    this.handleEvent(param, 'sensorScanCancel', 'sensorScanCanceled');
  }
  createSensorContact(param) {
    this.handleEvent(param, 'createSensorContact', 'createdSensorContact');
  }
  moveSensorContact(param) {
    this.handleEvent(param, 'moveSensorContact', 'movedSensorContact');
  }
  removeSensorContact(param) {
    this.handleEvent(param, 'removeSensorContact', 'removedSensorContact');
  }
  destroySensorContact(param) {
    this.handleEvent(param, 'destroyeSensorContact', 'destroyedSensorContact');
  }
  updateSensorContact(param) {
    this.handleEvent(param, 'updateSensorContact', 'updatedSensorContact');
  }
  createSensorArmyContact(param) {
    this.handleEvent(param, 'createSensorArmyContact', 'createdSensorArmyContact');
  }
  removeSensorArmyContact(param) {
    this.handleEvent(param, 'removeSensorArmyContact', 'removedSensorArmyContact');
  }
  updateSensorArmyContact(param) {
    this.handleEvent(param, 'updateSensorArmyContact', 'updatedSensorArmyContact');
  }
};
