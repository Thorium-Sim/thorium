import App from "../app";

export function handleUpdateCurrentFlightPath({ id, route }) {
  const system = App.systems.find(s => s.id === id && s.class === 'AdvancedNavigationAndAstrometrics');
  if (!system) return {};
  const fs = system.currentFlightSet;
  let destinationName = "";
  if (route?.isBorder) {
    destinationName = fs?.borders?.find(b => b.id === route.targetLocationId)?.name || "";
  } else {
    destinationName = fs?.pointsOfInterest?.find(p => p.id === route.targetLocationId)?.name || "";
  }
  return {
    simulatorId: system.simulatorId,
    destinationName,
    isBorder: !!route?.isBorder,
    targetLocationId: route?.targetLocationId,
    speedName: route?.speedOption?.name,
  };
}

export function handleEmergencyStop({ id }) {
  const system = App.systems.find(s => s.id === id && s.class === 'AdvancedNavigationAndAstrometrics');
  if (!system) return {};
  return { simulatorId: system.simulatorId };
}

export function advancedNavArrival({ simulatorId, destinationName }) {
  return { simulatorId, destinationName };
}

export function advancedNavSpeedChange({ simulatorId, speedName }) {
  return { simulatorId, speedName };
}


