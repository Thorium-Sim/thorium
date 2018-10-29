import docking from "./docking";
import engine from "./engine";
import exocomp from "./exocomp";
import internalComm from "./internalComm";
import jumpDrive from "./jumpDrive";
import longRangeComm from "./longRangeComm";
import message from "./message";
import shield from "./shield";
import sickbay from "./sickbay";
import generic from "./generic";
import computerCore from "./computerCore";
import coolant from "./coolant";
import power from "./power";
import teams from "./teams";

export default [
  ...docking,
  ...engine,
  ...exocomp,
  ...internalComm,
  ...jumpDrive,
  ...longRangeComm,
  ...message,
  ...shield,
  ...sickbay,
  ...generic,
  ...computerCore,
  ...coolant,
  ...power,
  ...teams
];
