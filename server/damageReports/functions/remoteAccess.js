import { randomCode } from "../constants";
export default (
  { code = randomCode(), backup = randomCode() },
  { stations }
) => {
  const station = stations.find(s => s.widgets.indexOf("remote") > -1);
  const officer = station ? station.name : "Remote Access";
  return `Ask the ${officer} officer to send the following remote access code: ${code}.
    
If the code is rejected, have them send a backup remote access code: ${backup}`;
};
