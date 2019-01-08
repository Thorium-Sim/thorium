import App from "../app";

export function damageSystem({ systemId, destroyed, which }) {
  const system = App.systems.find(s => s.id === systemId);
  if (system)
    return {
      simulatorId: system.simulatorId,
      type: system.type,
      name: system.name,
      destroyed,
      which
    };
  return {};
}

export function repairSystem({ systemId }) {
  const system = App.systems.find(s => s.id === systemId);
  if (system)
    return {
      simulatorId: system.simulatorId,
      type: system.type,
      name: system.name
    };
  return {};
}

// export function breakSystem({ simulatorId, type, name }) {
//   const systems = App.systems.filter(
//     s =>
//       s.simulatorId === simulatorId &&
//       s.type === type &&
//       (name ? s.name === name : true)
//   );
//   const sys = systems.find(s => s.damage.damaged === false);
//   if (!sys) return {};
//   return { simulatorId, type: sys.type, name: sys.name };
// }
// export function fixSystem({ simulatorId, type, name }) {
//   const systems = App.systems.filter(
//     s =>
//       s.simulatorId === simulatorId &&
//       s.type === type &&
//       (name ? s.name === name : true)
//   );
//   const sys = systems.find(s => s.damage.damaged === false);
//   if (!sys) return {};
//   return { simulatorId, type: sys.type, name: sys.name };
// }
