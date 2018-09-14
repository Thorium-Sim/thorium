const express = require("express");
const server = express();
const path = require("path");
const paths = require("../helpers/paths");

const assetPath = path.dirname(__dirname);
console.log(process.env.NODE_ENV);
export default function(port = 3000) {
  if (process.env.NODE_ENV === "production") {
    server.use(express.static(assetPath));
    let assetDir = path.resolve(paths.userData + "/assets");
    server.use("/assets/", express.static(assetDir));

    server.get("*", function(request, response) {
      response.sendFile(`${assetPath}/index.html`, function(err) {
        if (err) {
          console.log("THIS IS AN ERROR!");
          console.log(err);
          response.status(500).end();
          return;
        }
        response.end();
      });
    });

    server.listen(port, () => {});
  }
}
