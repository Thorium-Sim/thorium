import App from "../app";

export default function getDamageSystem(sys) {
  if (!sys) return null;
  return (
    App.systems.find(
      s =>
        s.id === sys ||
        (s.name && s.name.toLowerCase() === sys.toLowerCase()) ||
        (s.displayName && s.displayName.toLowerCase() === sys.toLowerCase())
    ) ||
    App.exocomps.find(s => s.id === sys) ||
    App.dockingPorts.find(s => s.id === sys)
  );
}
