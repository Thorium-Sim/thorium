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
  updateSensorContactInfrared(param) {
    this.handleEvent(param, 'updateSensorContactInfrared', 'updatedSensorContactInfrared');
  }
  updateSensorContactIcon(param) {
    this.handleEvent(param, 'updateSensorContactIcon', 'updatedSensorContactIcon');
  }
  updateSensorContactName(param) {
    this.handleEvent(param, 'updateSensorContactName', 'updatedSensorContactName');
  }
  updateSensorContactPicture(param) {
    this.handleEvent(param, 'updateSensorContactPicture', 'updatedSensorContactPicture');
  }
};
