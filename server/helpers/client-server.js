const express = require("express");
const server = express();
const path = require("path");
const paths = require("./paths");
const ipaddress = require("./ipaddress");

const assetPath = path.dirname(process.argv[1]);
const openBrowser = require("react-dev-utils/openBrowser");
const CLIENT_PORT = 3000;

if (process.env.NODE_ENV === "production") {
  const port = CLIENT_PORT;

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

  server.listen(port, () => {
    openBrowser(`http://${ipaddress.default}:${CLIENT_PORT}`);
  });
}

export default server;
