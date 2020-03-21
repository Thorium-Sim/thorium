export function generic({simulatorId, key}) {
  if (simulatorId) return {simulatorId, key};
  return false;
}
export function changeSimulatorAlertLevel({simulatorId, alertLevel}) {
  if (simulatorId) return {simulatorId, alertLevel};
  return false;
}
