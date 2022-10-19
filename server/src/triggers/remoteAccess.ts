import App from "../app";

export function remoteAccessSendCode({simulatorId, code}) {
  console.log(simulatorId, code);
  return {simulatorId, code};
}

export function remoteAccessUpdateCode({
  simulatorId,
  codeId,
  state,
}: {
  simulatorId: string;
  codeId: string;
  state: "Denied" | "Accepted";
}) {
  const simulator = App.simulators.find(s => s.id === simulatorId);
  if (!simulator) throw new Error("Simulator not found");
  const code = simulator.ship.remoteAccessCodes.find(c => c.id === codeId);
  if (!code) throw new Error("Code not found");
  return {
    simulatorId,
    state: state === "Accepted" ? "true" : "false",
    code: code.code,
  };
}
