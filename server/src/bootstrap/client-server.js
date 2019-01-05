const express = require("express");
const server = express();
const path = require("path");
const paths = require("../helpers/paths");
const ipaddress = require("../helpers/ipaddress");

const assetPath = path.dirname(process.argv[1]);
const openBrowser = require("react-dev-utils/openBrowser");

export default function(port = 3000) {
  if (process.env.NODE_ENV === "production") {
    server.use(express.static(assetPath));
    let assetDir = path.resolve(paths.userData + "/assets");
    server.use("/assets/", express.static(assetDir));

    server.get("*", function(request, response) {
      response.sendFile(`${assetPath}/index.html`, function(err) {
        if (err) {
          response
            .status(500)
            .end("Error loading client. Please refresh your browser.");
          return;
        }
        response.end();
      });
    });

    server.listen(port, () => {
      openBrowser(`http://${ipaddress.default}:${port}`);
    });
  }
}
