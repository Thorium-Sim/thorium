export default (Base) => class extends Base {
  // I know Setted isn't a word. Deal with it.
  createTransporter(param) {
    this.handleEvent(param, 'createTransporter', 'createdTransporter');
  }
  setTransportDestination(param) {
    this.handleEvent(param, 'setTransportDestination', 'settedTransportDestination');
  }
  setTransportTarget(param) {
    this.handleEvent(param, 'setTransportTarget', 'settedTransportTarget');
  }
  beginTransportScan(param) {
    this.handleEvent(param, 'beginTransportScan', 'beganTransportScan');
  }
  cancelTransportScan(param) {
    this.handleEvent(param, 'cancelTransportScan', 'canceledTransportScan');
  }
  clearTransportTargets(param) {
    this.handleEvent(param, 'clearTransportTargets', 'clearedTransportTargets');
  }
  setTransportCharge(param) {
    this.handleEvent(param, 'setTransportCharge', 'settedTransportCharge');
  }
  completeTransport(param) {
    this.handleEvent(param, 'completeTransport', 'completedTransport');
  }
  setTransporterTargets(param) {
    this.handleEvent(param, 'setTransporterTargets', 'settedTransporterTargets');
  }
};
