// Migrations that should happen after App is instantiated
import App from "../app";
import fs from "fs";
import paths from "../helpers/paths";
import path from "path";

let assetDir = path.resolve("./assets/");

if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData + "/assets";
}

export default () => {
  return new Promise(resolve => {
    if (!fs.existsSync(`${assetDir}/Simulator`)) {
      console.log("Migrating simulator assets...");
      // Migrate all of the simulator assets from being referential to being on the simulator object itself
      const regexPath = /[^\\]*\.(\w+)$/;

      fs.mkdirSync(`${assetDir}/Simulator`);
      App.simulators.forEach(sim => {
        const assetPaths = {
          mesh: ["/3D/Mesh/Simulator", `/Simulator/${sim.name}/mesh`],
          texture: ["/3D/Texture/Simulator", `/Simulator/${sim.name}/texture`],
          side: ["/Ship Views/Right", `/Simulator/${sim.name}/side`],
          top: ["/Ship Views/Top", `/Simulator/${sim.name}/top`],
          logo: ["/Misc/Login Logo", `/Simulator/${sim.name}/logo`]
        };
        // Create the simulator folder
        if (!fs.existsSync(`${assetDir}/Simulator/${sim.name}`)) {
          fs.mkdirSync(`${assetDir}/Simulator/${sim.name}`);
        }

        // Look for assets with the simulator's ID
        Object.keys(assetPaths).forEach(s => {
          const [path, newPath] = assetPaths[s];
          const assetContainer = App.assetContainers.find(
            a => a.fullPath === path
          );
          const assetObject = App.assetObjects.find(
            a => a.simulatorId === sim.id && a.containerId === assetContainer.id
          );
          // Move it to the new location
          if (assetObject) {
            const assetLocation = `${assetDir}${assetObject.url.replace(
              "/assets",
              ""
            )}`;
            if (fs.existsSync(assetLocation)) {
              const pathParts = assetLocation.match(regexPath);

              fs.createReadStream(assetLocation).pipe(
                fs.createWriteStream(`${assetDir}${newPath}.${pathParts[1]}`)
              );
              return;
            }
          }
          // Move in the default objects

          //const asset = fs.existsSync(`${assetDir}${path}/${s.id}.png`)
        });
      });
    }
  });
};
