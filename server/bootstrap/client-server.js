const express = require("express");
const path = require("path");
const paths = require("../helpers/paths");

const assetPath = path.resolve(path.dirname(process.argv[1]), "..");

export default function(server, port = 3000) {
  if (process.env.NODE_ENV === "production") {
    server.use(express.static(assetPath));
    let assetDir = path.resolve(paths.userData + "/assets");
    server.use("/assets/", express.static(assetDir));

    server.get("*", function(request, response) {
      response.sendFile(`${assetPath}/index.html`, function(err) {
        if (err) {
          console.log(assetDir);
          console.log(assetPath);
          console.log(err);
          response
            .status(500)
            .end("Error loading client. Please refresh your browser.");
          return;
        }
        response.end();
      });
    });
  }
  return server;
}
