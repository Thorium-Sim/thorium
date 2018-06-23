// Migrations that should happen after App is instantiated
import App from "../app";
import fs from "fs";
import paths from "../helpers/paths";
import path from "path";
import chalk from "chalk";
import { ncp } from "ncp";

let snapshotDir = "./snapshots/snapshot-dev.json";
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/snapshot.json";
}

let assetDir = path.resolve("./assets/");
if (process.env.NODE_ENV === "production") {
  assetDir = paths.userData + "/assets";
}

function getAssetObject(path, simulatorId = "default") {
  const assetContainer = App.assetContainers.find(a => a.fullPath === path);
  if (!assetContainer) return null;
  const assetObject = App.assetObjects.find(
    a => a.simulatorId === simulatorId && a.containerId === assetContainer.id
  );

  return assetObject && assetObject.url;
}

function walkSync(dir, filelist) {
  if (dir[dir.length - 1] !== "/") dir = dir.concat("/");
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + "/", filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
}

const regexPath = /[^\\]*\.(\w+)$/;

export default () => {
  return new Promise(resolve => {
    if (!fs.existsSync(`${assetDir}/Simulator`)) {
      console.log(chalk.cyan("Migrating assets to filesystem..."));
      return Promise.resolve()
        .then(() => {
          // Duplicate the Asset directory so peeps can revert if necessary
          console.log(
            chalk.cyan(
              `Copying asset directory to ${assetDir.replace(
                "/assets",
                "/assets-old"
              )} for backup...`
            )
          );
          return new Promise(resolve => {
            ncp(assetDir, assetDir.replace("/assets", "/assets-old"), function(
              err
            ) {
              if (err) {
                console.error("Error!", err);
              }
              ncp(
                snapshotDir,
                snapshotDir.replace(".json", "-pre-assets.json"),
                err => {
                  if (err) {
                    console.error("Error!", err);
                  }
                  console.log("Done!");
                  resolve();
                }
              );
            });
          });
        })

        .then(() => {
          // Migrate all of the simulator assets from being referential to being on the simulator object itself
          fs.mkdirSync(`${assetDir}/Simulator`);
          return Promise.all(
            App.simulators.map(sim => {
              console.log(
                chalk.cyan(`Migrating assets for ${sim.name} simulator...`)
              );

              const assetPaths = {
                mesh: [
                  "/3D/Mesh/Simulator",
                  `/Simulator/${sim.name}/mesh`,
                  "obj"
                ],
                texture: [
                  "/3D/Texture/Simulator",
                  `/Simulator/${sim.name}/texture`,
                  "png"
                ],
                side: [
                  "/Ship Views/Right",
                  `/Simulator/${sim.name}/side`,
                  "png"
                ],
                top: ["/Ship Views/Top", `/Simulator/${sim.name}/top`, "png"],
                logo: ["/Misc/Login Logo", `/Simulator/${sim.name}/logo`, "svg"]
              };
              // Create the simulator folder
              if (!fs.existsSync(`${assetDir}/Simulator/${sim.name}`)) {
                fs.mkdirSync(`${assetDir}/Simulator/${sim.name}`);
              }

              // Look for assets with the simulator's ID
              return Promise.all(
                Object.keys(assetPaths).map(s => {
                  return new Promise(resolve => {
                    const [oldPath, newPath, oldExt] = assetPaths[s];
                    const assetObject = getAssetObject(oldPath, sim.id);
                    // Move it to the new location
                    if (assetObject) {
                      const assetLocation = `${assetDir}${assetObject.replace(
                        "/assets",
                        ""
                      )}`;

                      if (fs.existsSync(assetLocation)) {
                        const pathParts = assetLocation.match(regexPath);
                        console.log(
                          "Moving",
                          `${assetDir}${newPath}.${pathParts[1]}`
                        );
                        return ncp(
                          assetLocation,
                          `${assetDir}${newPath}.${pathParts[1]}`,
                          err => {
                            if (err) {
                              console.error("Error!", err);
                            }
                            resolve();
                          }
                        );
                      }
                    }
                    // Move in the default objects
                    if (
                      fs.existsSync(`${assetDir}${oldPath}/default.${oldExt}`)
                    ) {
                      console.log("moving", `${assetDir}${newPath}.${oldExt}`);
                      return ncp(
                        `${assetDir}${oldPath}/default.${oldExt}`,
                        `${assetDir}${newPath}.${oldExt}`,
                        err => {
                          if (err) {
                            console.error("Error!", err);
                          }
                          resolve();
                        }
                      );
                    }
                    console.error(
                      chalk.red(
                        `Error transferring asset for simulator ${
                          sim.name
                        }: ${oldPath} -> ${newPath}`
                      )
                    );
                  });
                })
              );
            })
          );
        })
        .then(() => {
          console.log(chalk.cyan(`Migrating flight asset paths`));
          // Migrate all of the pictures and images currently stored in memory
          App.systems.forEach(sys => {
            if (sys.class === "Sensors") {
              // Sensor Contact Icons and Pictures
              sys.contacts.forEach(contact => {
                const iconObject = getAssetObject(contact.icon);
                if (iconObject) {
                  const [_, iconExt] = iconObject.match(regexPath);
                  contact.icon = contact.icon + "." + iconExt;
                }
                const pictureObject = getAssetObject(contact.picture);
                if (pictureObject) {
                  const [_, pictureExt] = pictureObject.match(regexPath);
                  contact.picture = contact.picture + "." + pictureExt;
                }
              });
              // Sensor Army Contacts Icons and Pictures
              sys.armyContacts.forEach(contact => {
                const iconObject = getAssetObject(contact.icon);
                if (iconObject) {
                  const [_, iconExt] = iconObject.match(regexPath);
                  contact.icon = contact.icon + "." + iconExt;
                }
                const pictureObject = getAssetObject(contact.picture);
                if (pictureObject) {
                  const [_, pictureExt] = pictureObject.match(regexPath);
                  contact.picture = contact.picture + "." + pictureExt;
                }
              });
            }
            // Short Range Comm Symbols
            if (sys.class === "ShortRangeComm") {
              sys.signals.forEach(signal => {
                const signalObject = getAssetObject(
                  `/Comm Images/${signal.image}`
                );
                if (signalObject) {
                  const [_, signalExt] = signalObject.match(regexPath);
                  signal.image = `/Comm Images/${signal.image}.${signalExt}`;
                }
              });
            }
            // Targeting class icon and pictures
            if (sys.class === "Targeting") {
              sys.classes.forEach(c => {
                const targetIcon = getAssetObject(
                  `/Sensor Contacts/Icons/${c.icon}`
                );
                if (targetIcon) {
                  const [_, iconExt] = targetIcon.match(regexPath);
                  c.icon = `/Sensor Contacts/Icons/${c.icon}.${iconExt}`;
                }
                const targetPicture = getAssetObject(
                  `/Sensor Contacts/Pictures/${c.picture}`
                );
                if (targetPicture) {
                  const [_, pictureExt] = targetPicture.match(regexPath);
                  c.picture = `/Sensor Contacts/Pictures/${
                    c.picture
                  }.${pictureExt}`;
                }
              });
            }
          });
          // Docking Port shuttle images
          App.dockingPorts.forEach(d => {
            const image = getAssetObject(d.image);
            if (image) {
              const [_, imageExt] = image.match(regexPath);
              d.image = `${d.image}.${imageExt}`;
            }
          });
          App.tacticalMaps.forEach(t => {
            t.layers.forEach(l => {
              // Tactical Map layer images and videos
              if (l.image) {
                const image = getAssetObject(l.image);
                if (image) {
                  const [_, imageExt] = image.match(regexPath);
                  l.image = `${l.image}.${imageExt}`;
                }
              }
              if (l.asset) {
                const image = getAssetObject(l.asset);
                if (image) {
                  const [_, imageExt] = image.match(regexPath);
                  l.asset = `${l.asset}.${imageExt}`;
                }
              }
              // Tactical Map Objects
              l.items.forEach(i => {
                const image = getAssetObject(i.icon);
                if (image) {
                  const [_, imageExt] = image.match(regexPath);
                  i.icon = `${i.icon}.${imageExt}`;
                }
              });
            });
          });
          // Library database images
          App.libraryDatabase.forEach(l => {
            const image = getAssetObject(l.image);
            if (image) {
              const [_, imageExt] = image.match(regexPath);
              l.image = `${l.image}.${imageExt}`;
            }
          });
        })
        .then(() => {
          // Migrate mission timeline steps
          console.log(chalk.cyan(`Migrating mission asset paths`));
          App.missions = App.missions.map(m => {
            const timeline = m.timeline.map(t => {
              const timelineItems = t.timelineItems.map(i => {
                try {
                  const args = JSON.parse(i.args);
                  // setArmyContacts
                  if (i.event === "setArmyContacts") {
                    args.armyContacts = args.armyContacts.map(contact => {
                      const iconObject = getAssetObject(contact.icon);
                      if (iconObject) {
                        const [_, iconExt] = iconObject.match(regexPath);
                        contact.icon = contact.icon + "." + iconExt;
                      }
                      const pictureObject = getAssetObject(contact.picture);
                      if (pictureObject) {
                        const [_, pictureExt] = pictureObject.match(regexPath);
                        contact.picture = contact.picture + "." + pictureExt;
                      }
                      return contact;
                    });
                  }
                  // playSound
                  if (i.event === "playSound" && args.sound) {
                    const object = getAssetObject(args.sound.asset);
                    if (object) {
                      const [_, ext] = object.match(regexPath);
                      args.sound.asset = args.sound.asset + "." + ext;
                    }
                  }
                  // addLibraryEntry
                  if (i.event === "addLibraryEntry" && args.entry) {
                    const object = getAssetObject(args.entry.image);
                    if (object) {
                      const [_, ext] = object.match(regexPath);
                      args.entry.image = args.entry.image + "." + ext;
                    }
                  }
                  // updateViewscreenComponent
                  if (i.event === "updateViewscreenComponent" && args.data) {
                    function updateData(data, key) {
                      const object = getAssetObject(data[key]);
                      if (object) {
                        const [_, ext] = object.match(regexPath);
                        data[key] = data[key] + "." + ext;
                      }
                      return data;
                    }
                    let data = JSON.parse(args.data);
                    // Faces
                    if (args.component === "Faces") {
                      data = updateData(data, "image");
                    }
                    // Planetary Scan
                    if (args.component === "PlanetaryScan") {
                      data = updateData(data, "planet");
                      data = updateData(data, "clouds");
                    }
                    // Ship Model
                    if (args.component === "ShipModel") {
                      data = updateData(data, "mesh");
                    }
                    // Ship View
                    if (args.component === "ShipView") {
                      data = updateData(data, "ship");
                    }
                    // Video
                    if (args.component === "Video") {
                      data = updateData(data, "asset");
                    }
                    args.data = JSON.stringify(data);
                  }
                  return { ...i, args: JSON.stringify(args) };
                } catch (e) {
                  console.error(chalk.red("Error parsing args."));
                  return i;
                }
              });
              return { ...t, timelineItems };
            });
            return { ...m, timeline };
          });
        })
        .then(() => {
          console.log(chalk.cyan(`Moving assets`));
          // Move all of the assets into a flat file structure
          // Use a fancy recursive function
          const assets = walkSync(assetDir);

          return Promise.all(
            assets.map(a => {
              if (a.includes(".DS_Store")) return Promise.resolve();
              if (!a.match(regexPath)) return Promise.resolve();
              if (a.includes("/Simulator/")) return Promise.resolve();

              const [path, ext] = a.match(regexPath);
              const pathList = path.split("/");
              const fileName =
                pathList.slice(0, pathList.length - 1).join("/") + "." + ext;
              return new Promise(resolve => {
                ncp(path, fileName, err => {
                  if (err) {
                    console.error("Error!", err);
                  }
                  console.log(chalk.cyan(`Moved ${fileName}`));
                  fs.unlinkSync(path);
                  const folderPath = path.split("/");
                  let folderContents = fs.readdirSync(
                    folderPath.slice(0, folderPath.length - 1).join("/")
                  );
                  if (folderContents.indexOf(".DS_Store") > -1)
                    fs.unlinkSync(
                      folderPath.slice(0, folderPath.length - 1).join("/") +
                        "/.DS_Store"
                    );

                  folderContents = fs.readdirSync(
                    folderPath.slice(0, folderPath.length - 1).join("/")
                  );
                  if (folderContents.length === 0) {
                    fs.rmdirSync(
                      folderPath.slice(0, folderPath.length - 1).join("/")
                    );
                  }
                  resolve();
                });
              });
            })
          );
        })
        .then(() => {
          // With no more need for the asset structure in memory as it is known,
          // we remove it
          App.assetContainers = [];
          App.assetFolders = [];
          App.assetObjects = [];
          App.snapshot();
        })
        .then(() => {
          console.log(
            Array(5)
              .fill("\n")
              .join("")
          );
          console.log(
            chalk.greenBright(
              "Success! Assets have been migrated to the file system."
            )
          );
        });
    }
  });
};
