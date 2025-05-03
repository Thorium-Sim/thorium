import express from "express";
import path from "path";
import paths from "../helpers/paths";

const assetPath = __dirname;

export default function (server: express.Application) {
  if (process.env.NODE_ENV === "production") {
    server.use(express.static(assetPath));
    let assetDir = path.resolve(paths.userData + "/assets");
    server.use("/assets/", express.static(assetDir));

    server.get("*", function (req, response) {
      response.sendFile(`${assetPath}/index.html`, function (err) {
        if (err) {

          response
            .status(500)
            .end("Error loading client. Please refresh your browser." + err);
          return;
        }
        response.end();
      });
    });
  }
  return server;
}
