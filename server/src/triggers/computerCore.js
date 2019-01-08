import App from "../app";

export function removeComputerCoreUser({ id, userId }) {
  const sys = App.systems.find(s => s.id === id);
  const user = sys.users.find(u => u.id === userId);
  return sys
    ? { simulatorId: sys.simulatorId, hacker: user.hacker, level: user.level }
    : {};
}

export function restoreComputerCoreFile({ id, fileId, level, all }) {
  const sys = App.systems.find(s => s.id === id);
  const file = sys.files.find(c => c.id === fileId);
  return sys
    ? { simulatorId: sys.simulatorId, level: file ? file.level : level, all }
    : {};
}

export function deleteComputerCoreVirus({ id, virusId }) {
  const sys = App.systems.find(s => s.id === id);
  return sys ? { simulatorId: sys.simulatorId } : {};
}

export function restartComputerCoreTerminal({ id, terminalId }) {
  const sys = App.systems.find(s => s.id === id);
  return sys ? { simulatorId: sys.simulatorId } : {};
}
