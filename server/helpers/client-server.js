const express = require("express");
const server = express();
const path = require("path");
const paths = require("./paths");
const assetPath = path.dirname(process.argv[1]);
if (process.env.NODE_ENV === "production") {
  const port = process.env.PORT || 3000;

  server.use(express.static(assetPath));
  let assetDir = path.resolve(paths.userData + "/assets");
  server.use("/assets/", express.static(assetDir));

  server.get("*", function(request, response) {
    response.sendFile(`${assetPath}/index.html`);
  });

  server.listen(port);
  console.log("Client server started on port " + port);
}

export default server;
