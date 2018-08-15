// First migration is to move the assets directory
import fs from "fs";
import paths from "../helpers/paths";
const ncp = require("ncp").ncp;

export default () => {
  return new Promise(resolve => {
    if (process.env.NODE_ENV === "production") {
      if (!fs.existsSync(paths.userData)) {
        console.log(`Migrating Thorium data to documents folder.
  
This is to help you more easily access Thorium assets and will be used for configuration in the future.
  
Standby...`);
        ncp(paths.oldData, paths.userData, function(err) {
          if (err) {
            console.error(err);
          }
          console.log("Done!");
          resolve();
        });
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
};
