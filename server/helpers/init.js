console.log(`Starting Thorium...`);
const path = require("path");
const fs = require("fs");
const ncp = require("ncp").ncp;
const paths = require("./paths");
if (process.env.NODE_ENV === "production") {
  const assetFolder = paths.userData + "/assets";
  var assetPath = path.dirname(process.argv[1]);
  if (!fs.existsSync(assetFolder)) {
    ncp(assetPath + "/assets", assetFolder, function(err) {
      if (err) {
        throw new Error(err);
      }
      console.log(
        "Assets for Thorium have been installed in your application support folder."
      );
    });
  }
}
export function move(oldPath, newPath, callback) {
  var readStream = fs.createReadStream(oldPath);
  var writeStream = fs.createWriteStream(newPath);

  readStream.on("error", callback);
  writeStream.on("error", callback);

  readStream.on("close", function() {
    console.log("Done moving snapshot file.");
  });

  readStream.pipe(writeStream);
}
console.log(`








`);
