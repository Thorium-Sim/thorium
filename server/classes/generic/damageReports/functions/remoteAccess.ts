import {randomCode} from "../constants";
import {DamageStepContext, DamageStepArgs} from "~classes/generic";
export default (
  {code = randomCode(), backup = randomCode(), preamble = ""}: DamageStepArgs,
  {stations}: DamageStepContext,
) => {
  const station = stations.find(s => s.widgets.indexOf("remote") > -1);
  const officer = station ? station.name : "Remote Access";
  return `${preamble} Ask the ${officer} officer to use the remote access widget to send the following remote access code: ${code}.
    
If the code is rejected, have them send a backup remote access code: ${backup}`;
};
