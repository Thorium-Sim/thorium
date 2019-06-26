export function generic({ simulatorId, key }) {
  if (simulatorId) return { simulatorId, key };
  return false;
}
