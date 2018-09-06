import { randomCode } from "../constants";
export default (
  { code = randomCode(), backup = randomCode(), preamble = "" },
  { stations }
) => {
  const station = stations.find(s => s.widgets.indexOf("remote") > -1);
  const officer = station ? station.name : "Remote Access";
  return `${preamble} Ask the ${officer} officer to use the remote access widget to send the following remote access code: ${code}.
    
If the code is rejected, have them send a backup remote access code: ${backup}`;
};
